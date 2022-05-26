import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearOrder } from '../actions/orderActions';

const OrderConfirmation = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearOrder());
    }, [dispatch]);
    return (
        <div>OrderConfirmation</div>
    )
}

export default OrderConfirmation