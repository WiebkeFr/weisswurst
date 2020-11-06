
export const setOrderItems = (OrderItems) => {
    localStorage.setItem("OrderItems", JSON.stringify(OrderItems));
}

export const getOrderItems = () => {
    return JSON.parse(localStorage.getItem("OrderItems"));
}

export const setDeliverer = (deliverer) => {
    localStorage.setItem("Deliverer", deliverer)
}

export const getDeliverer = () => {
    return localStorage.getItem("Deliverer");
}

export const removeDeliverer = () => {
    localStorage.removeItem("Deliverer")
}

