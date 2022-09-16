//For Add Item from Cart
export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product,
    }
}

//For Delete Item from Cart
export const deleteCart = (product) => {
    return {
        type: "DELETEITEM",
        payload: product,
    }
}