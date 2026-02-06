  import { Link } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { logout } from "../../features/auth/authSlice";
  // const { user } = useSelector((state) => state.auth);


  export default function Navbar() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    {user?.role === "admin" && (
  <>
    <Link to="/admin">Dashboard</Link>
    <Link to="/admin/products">Products</Link>
    <Link to="/admin/orders">Orders</Link>
  </>
)}


    return (
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          MyShop
        </Link>
        <Link to="/my-orders">My Orders</Link>


        <div className="space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <Link to="/cart">Cart</Link>

              <button
                onClick={() => dispatch(logout())}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    );
  }
