import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex bg-white shadow-sm my-5 mx-10 md:mx-30 rounded-xl">
      <div className="mx-auto px-4 py-3">
        <Link to="/" className="text-xl font-bold text-black">
          WarungKu
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;