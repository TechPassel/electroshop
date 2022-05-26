import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { verifyOrderItems, verifyCouponDiscount, verifyShippingCharges, verifyTaxAmount, verifyTotalAmount } from '../utils/orderUtil.js'

const addOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        couponId,
        couponDiscount,
        totalMrp,
        mrpDiscount,
        shippingCharge,
        taxAmount,
        finalAmount
    } = req.body;

    const userId = req.user._id;
    //Verifying all details before placing order, so that anyone can't trick with us.
    try {
        await verifyOrderItems(orderItems, totalMrp, mrpDiscount);
        if (couponId) await verifyCouponDiscount(couponId, totalMrp, userId, couponDiscount);
        verifyShippingCharges(shippingCharge, totalMrp, mrpDiscount, couponDiscount);
        verifyTaxAmount(taxAmount, totalMrp, mrpDiscount, couponDiscount);
        verifyTotalAmount(finalAmount, totalMrp, shippingCharge, taxAmount, mrpDiscount, couponDiscount);
    } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error(error);
    }
    const order = await Order.create({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        taxAmount,
        shippingCharge,
        totalMrp,
        coupon: couponId,
        couponDiscount
    });

    return res.json(order);

})

export {
    addOrder
}