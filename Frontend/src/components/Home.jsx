import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import interiorBg from "../assets/interior.avif";
import Sponsors from "../components/PresentingSponser";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [blurEnabled, setBlurEnabled] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    const toastShown = sessionStorage.getItem("toastShown");

    if (!user && !toastShown) {
      // ⏳ Wait 1 minute before locking/blur
      const timer = setTimeout(() => {
        setBlurEnabled(true);
        document.body.classList.add("overflow-hidden");

        toast.custom((t) => (
          <div
            className={`bg-white border border-purple-300 shadow-xl rounded-lg px-4 py-3 max-w-sm text-purple-800 text-sm ${
              t.visible ? "animate-enter" : "animate-leave"
            }`}
          >
            <div className="font-semibold mb-2">🔒 Limited Access</div>
            <p className="mb-3">
              Please <span className="font-medium">register</span> or{" "}
              <span className="font-medium">log in</span> to explore more and contact sellers.
            </p>
            <div className="flex gap-3 justify-end">
              <Link
                to="/login"
                className="text-purple-700 border border-purple-500 px-3 py-1 rounded hover:bg-purple-100"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                Register
              </Link>
            </div>
          </div>
        ), {
          duration: 10000,
        });

        sessionStorage.setItem("toastShown", "true");
      }, 60000); // 60 seconds

      return () => clearTimeout(timer);
    } else {
      // ✅ User is logged in → remove scroll block + blur
      setBlurEnabled(false);
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [user]);

  return (
    <div className={`${blurEnabled ? "filter blur-sm pointer-events-none" : ""}`}>
      {/* Hero Section */}
      <div
        className="w-full h-[calc(100vh-5rem)] bg-cover bg-center bg-no-repeat flex justify-center items-center"
        style={{ backgroundImage: `url(${interiorBg})` }}
      >
        <div className="flex justify-center gap-20 text-purple-900 text-lg font-semibold">
          <button className="hover:text-purple-700 transition">Apartments</button>
          <button className="hover:text-purple-700 transition">Villas</button>
          <button className="hover:text-purple-700 transition">Plots</button>
        </div>
      </div>

      {/* Greeting */}
      {user && (
        <div className="text-center text-xl font-medium mt-6 text-purple-800">
          Welcome, {user.name}!
        </div>
      )}

      {/* Sponsors Section */}
      <Sponsors />
    </div>
  );
};

export default HomePage;
