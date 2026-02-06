import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  removeProduct,
} from "../../features/admin/adminSlice";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Products</h2>

      {products.map((p) => (
        <div
          key={p._id}
          className="flex justify-between border p-3 mb-2"
        >
          <span>{p.name}</span>
          <button
            onClick={() => dispatch(removeProduct(p._id))}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
