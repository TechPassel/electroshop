import mongoose from 'mongoose';
import { discountTypes } from '../utils/enumUtil.js';

const discTypes = Object.values(discountTypes);

const couponSchema = mongoose.Schema(
    {
        code: {
            type: String,
            unique: true,
            required: true
        },
        issueOnCondition: {
            type: String
        },
        //This field will be used in case like we want to create a coupon that should be automatically
        //issued to every new user. or to all users who purchased item worth rupee 20000 from our site etc. 
        applicableOnAmountAbove: {
            type: Number,
            required: true,
            default: 0.0
        },
        isApplicableForAll: {
            type: Boolean,
            required: true,
            default: false
        },
        totalAllowedUses: {
            type: Number,
            default: 1
        },
        discount: {
            type: Number,
            required: true,
            default: 0
        },
        discountType: {
            type: String,
            enum: discTypes,
            required: true
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User',
            }
        ],
        expiryOn: {
            type: Date,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
