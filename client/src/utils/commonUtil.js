export const formatAsCurrency = (price) => {
    let currencyIndianLocale = Intl.NumberFormat('en-IN');
    return currencyIndianLocale.format(price);
}

export const getDiscountedPrice = (product) => {
    let discount = product.discountType === '₹' ? product.discount : Math.round(product.price * (product.discount / 100));
    return product.price - discount;
}

export const capitalizeFirstLetter = (text) => {
    let keys = text.split("", 2);
    return keys[0].toUpperCase()+keys[1];
}