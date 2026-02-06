import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../features/orders/orderSlice";

export default function MyOrders() {
  const dispatch = useDispatch();
  const { myOrders, loading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">My Orders</h2>

      {myOrders.map((order) => (
        <div
          key={order._id}
          className="border p-4 mb-4"
        >
          <p>Order ID: {order._id}</p>
          <p>Status: {order.orderStatus}</p>
          <p>Payment: {order.paymentStatus}</p>
          <p>
            Total: $
            {order.items.reduce(
              (acc, i) => acc + i.price * i.quantity,
              0
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
