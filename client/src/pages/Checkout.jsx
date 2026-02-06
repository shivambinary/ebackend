import { useDispatch, useSelector } from "react-redux";
import { createOrder, payOrder } from "../features/orders/orderSlice";
import { clearCart } from "../features/cart/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

const checkoutHandler = async () => {
  const formattedItems = items.map((i) => ({
    product: i._id,
    quantity: i.quantity,
    price: i.price,
  }));

  const result = await dispatch(createOrder(formattedItems));

  if (result.meta.requestStatus === "fulfilled") {
    dispatch(payOrder(result.payload.data._id));
  }
};

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Checkout</h2>

      <button
        onClick={checkoutHandler}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
