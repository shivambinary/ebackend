import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { single, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!single) return null;

  return (
    <div className="p-8 grid grid-cols-2 gap-8">
      <img
        src={single.images?.[0]}
        className="w-full h-96 object-cover rounded"
      />

      <div>
        <h1 className="text-3xl font-bold mb-4">
          {single.name}
        </h1>

        <p className="text-xl text-green-600 mb-2">
          ${single.price}
        </p>

        <p className="mb-4 text-gray-700">
          {single.description}
        </p>

        <button
          onClick={() => dispatch(addToCart(single))}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add To Cart
        </button>

      </div>
    </div>
  );
}
