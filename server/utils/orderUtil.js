import Coupon from "../models/couponModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

const checkItemAvailablity = (item) =>
    new Promise(async (resolve, reject) => {
        let itemQty = await Product.findById(item.product).select({ "_id": 0, "countInStock": 1 });
        if (itemQty.countInStock < item.qty) {
            const errorMsg = itemQty.countInStock == 0 ? `Sorry but ${item.name} is sold out now.`
                : `Sorry but only ${itemQty.countInStock} pieces of ${item.name} is available in our stock now.`
            reject(errorMsg);
        } else {
            resolve()
        }
    });

export const verifyOrderItems = async (orderItems, totalMrp, mrpDiscount) => {
    let totalItemsMrp = 0;
    let itemsMrpDiscount = 0;
    try {
        let promises = orderItems.map(async item => {
            await checkItemAvailablity(item);
            totalItemsMrp += item.price * item.qty
            itemsMrpDiscount += item.discountType == "%" ? item.price * item.qty * item.discount / 100 : item.discount * item.qty;
        });
        await Promise.all(promises);
    } catch (err) {
        throw new Error(err);
    }
    if (totalMrp < Math.floor(totalItemsMrp) || totalMrp > Math.ceil(totalItemsMrp)) {
        throw new Error("Found error in MRP calculation.")
    };
    if (mrpDiscount < Math.floor(itemsMrpDiscount) || mrpDiscount > Math.ceil(itemsMrpDiscount)) throw new Error("Found error in MRP discount calculation.");
}

export const verifyCouponDiscount = async (couponId, totalMrp, userId, discountValue) => {
    let discount = 0;
    const coupon = await Coupon.findById(couponId);
    if (coupon == null) {
        throw new Error("Invalid coupon.");
    }

    if (coupon.applicableOnAmountAbove > totalMrp) {
        throw new Error(`This coupon can be applied on orders worth ${coupon.applicableOnAmountAbove} or above only.`);
    }

    if (new Date(coupon.expiryOn) < new Date()) {
        throw new Error(`Coupon is expired on ${coupon.expiryOn}.`)
    }

    if (!coupon.isApplicableForAll && !coupon.users.include(userId)) {
        throw new Error('Coupon is not valid for you.');
    }

    const couponUses = await Order.countDocuments({ coupon: couponId });
    if (couponUses >= coupon.totalAllowedUses) {
        throw new Error('You have already used the coupon allowed number of times.');
    }

    discount = coupon.discountType == "%" ? totalMrp * coupon.discount / 100 : coupon.discount;
    if (discount != discountValue) throw new Error("Found error in coupon discount calculation.");
}

export const verifyShippingCharges = (shippingCharge, totalMrp, mrpDiscount, couponDiscount) => {
    const calcuatedShippingCharge = Math.ceil(totalMrp - (mrpDiscount + couponDiscount)) >= 2000 ? 0 : 100;
    if (shippingCharge !== calcuatedShippingCharge) {
        throw new Error("Found error in shipping charges calculation.");
    }
}

export const verifyTaxAmount = (taxAmount, totalMrp, mrpDiscount, couponDiscount) => {
    const calculatedtaxAmount = (totalMrp - (mrpDiscount + couponDiscount)) * .05;
    if (taxAmount < Math.floor(calculatedtaxAmount) || taxAmount > Math.ceil(calculatedtaxAmount)) {
        throw new Error("Found error in tax amount calculation.");
    }
}

export const verifyTotalAmount = (finalAmount, totalMrp, shippingCharge, taxAmount, mrpDiscount, couponDiscount) => {
    const calculatedFinalAmount = (totalMrp + taxAmount + shippingCharge) - (mrpDiscount + couponDiscount);
    if (finalAmount < Math.floor(calculatedFinalAmount) || finalAmount > Math.ceil(calculatedFinalAmount)) {
        throw new Error("Found error in final amount calculation.");
    }
}