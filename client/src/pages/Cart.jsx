import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQty,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0)
    return <h2 className="p-6">Cart is empty</h2>;

  return (
    <div className="p-6">

      {items.map((item) => (
        <div
          key={item._id}
          className="flex gap-4 mb-4 border p-4"
        >
          <img
            src={item.images?.[0]}
            className="h-20 w-20 object-cover"
          />

          <div className="flex-1">
            <h3>{item.name}</h3>
            <p>${item.price}</p>

            <input
              type="number"
              value={item.quantity}
              min="1"
              className="border w-16"
              onChange={(e) =>
                dispatch(
                  updateQty({
                    id: item._id,
                    qty: Number(e.target.value),
                  })
                )
              }
            />
          </div>

          <button
            onClick={() =>
              dispatch(removeFromCart(item._id))
            }
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Checkout Button */}
      <div className="mt-6 text-right">
        <Link
          to="/checkout"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Checkout
        </Link>
      </div>

    </div>
  );
}
