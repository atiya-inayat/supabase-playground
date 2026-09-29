import Link from "next/link";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full h-20 p-4 py-3 text-black bg-gray-300/70 backdrop-blur-md">
      <div>
        <Link href={"/"}>
          <h1 className="font-serif text-3xl font-extrabold ">MY TODO</h1>
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 text-lg font-semibold text-black">
        <Link
          className="border-black hover:border-b-2 focus:text-gray-800 focus:border-gray-900 focus:border-b-2"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="border-black hover:border-b-2 focus:text-gray-900 focus:border-gray-900 focus:border-b-2"
          href={"/about"}
        >
          About
        </Link>
        <Link
          className="border-black hover:border-b-2 focus:text-gray-900 focus:border-gray-900 focus:border-b-2"
          href={"/contact"}
        >
          Contact
        </Link>
        <Logout />
      </div>
    </div>
  );
};

export default Navbar;
