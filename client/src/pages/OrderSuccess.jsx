import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>

      <p className="mb-6">
        Your order has been placed successfully.
      </p>

      <div className="space-x-4">
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Home
        </Link>

        <Link
          to="/my-orders"
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}
