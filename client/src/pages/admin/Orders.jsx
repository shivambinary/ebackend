import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  changeOrderStatus,
} from "../../features/admin/adminSlice";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Orders</h2>

      {orders.map((o) => (
        <div
          key={o._id}
          className="border p-3 mb-3"
        >
          <p>ID: {o._id}</p>
          <p>Status: {o.orderStatus}</p>
          <p>Payment: {o.paymentStatus}</p>

          <select
            value={o.orderStatus}
            onChange={(e) =>
              dispatch(
                changeOrderStatus({
                  id: o._id,
                  status: e.target.value,
                })
              )
            }
          >
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
}
