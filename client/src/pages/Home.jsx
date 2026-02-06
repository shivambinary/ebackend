import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { Link } from "react-router-dom";

export default function Home() {
  console.log("HOME COMPONENT LOADED");

  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    console.log("DISPATCHING FETCH PRODUCTS");
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      {list.map((product) => (
        <Link 
          key={product._id}
          to={`/products/${product._id}`}
        >
          <div className="border p-4 rounded shadow hover:shadow-lg transition">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-40 w-full object-cover mb-2"
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
