import api from '../../app/api';


export const createOrderAPI = (items) => {
    return api.post("/orders", { items });
};

export const createPaymentAPI = ( orderId ) => {
    return api.post(`/payments/${orderId}`);
};
export const fetchMyOrdersAPI = () => {
  return api.get("/orders/my-orders");
};