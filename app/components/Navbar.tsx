import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex text-black sticky w-full top-0 z-50 justify-between py-3 h-20 items-center bg-gray-300/70 backdrop-blur-md p-4">
      <div>
        <Link href={"/"}>
          <h1 className=" text-3xl font-serif font-extrabold">MY TODO</h1>
        </Link>
      </div>

      <div className="flex gap-4 text-black  flex-wrap text-lg font-semibold">
        <Link
          className="hover:border-b-2 focus:text-gray-800 focus:border-gray-900 focus:border-b-2 border-black"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="hover:border-b-2 focus:text-gray-900 focus:border-gray-900 focus:border-b-2 border-black"
          href={"/about"}
        >
          About
        </Link>
        <Link
          className="hover:border-b-2 focus:text-gray-900 focus:border-gray-900 focus:border-b-2 border-black"
          href={"/contact"}
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
