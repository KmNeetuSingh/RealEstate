import { useEffect, useState } from "react";
import interiorBg from "../assets/interior.avif";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token).then((data) => {
        if (data?.user) setUser(data.user);
      });
    }
  }, []);

  return (
    <div> {/* navbar space */}
      <div
        className="w-full h-[calc(100vh-5rem)] bg-cover bg-center bg-no-repeat flex justify-center items-center"
        style={{ backgroundImage: `url(${interiorBg})` }}
      >
        <div className="flex justify-center gap-90 text-purple-900 font-semibold">
          <button className="hover:text-purple-900 transition">Apartments</button>
          <button className="hover:text-purple-900 transition">Villas</button>
          <button className="hover:text-purple-900 transition">Plots</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
