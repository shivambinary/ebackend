import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../features/admin/adminSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!stats) return null;

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <div className="border p-4">Users: {stats.users}</div>
      <div className="border p-4">Products: {stats.products}</div>
      <div className="border p-4">Orders: {stats.totalOrders}</div>
      <div className="border p-4">Paid Orders: {stats.paidOrders}</div>
      <div className="border p-4">Pending Orders: {stats.pendingOrders}</div>
      <div className="border p-4">Revenue: ${stats.revenue}</div>
    </div>
  );
}
