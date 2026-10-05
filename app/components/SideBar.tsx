import Logout from "./Logout";

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`flex flex-col  h-screen p-4 bg-white ${sidebarOpen ? "w-64 " : "w-16 items-center"}  transition-all duration-300 ease-in `}
    >
      {/* Top */}
      <div>
        {/* Logo */}
        <div className="flex items-center  justify-between mb-4 ">
          <h1
            className={`text-lg font-bold text-purple-700 ${sidebarOpen ? "block" : "hidden"}`}
          >
            ✦ Taskly
          </h1>
          <button
            className="text-gray-500 hover:text-purple-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ←
          </button>
        </div>

        <hr className="border-gray-200" />

        {/* Menu */}
        <div className="mt-6">
          <h1 className={`text-gray-400 ${sidebarOpen ? "block" : "hidden"}`}>
            Menu
          </h1>

          <div className="flex items-center justify-between gap-2 p-2 my-3 bg-white text-sm border border-gray-200 rounded-md text-gray-500">
            <button className="focus:text-purple-700">⊞</button>
            <button
              className={`flex items-center gap-2 focus:text-purple-700 ${sidebarOpen ? "block" : "hidden"}`}
            >
              Dashboard
            </button>

            <span className={`${sidebarOpen ? "block" : "hidden"}`}>5</span>
          </div>

          <div className="flex items-center justify-between gap-2 p-2 my-3 bg-white border border-gray-200 text-sm rounded-md text-gray-500">
            <span className="focus:text-purple-700">✓</span>
            <button
              className={`flex items-center gap-2 focus:text-purple-700 ${sidebarOpen ? "block" : "hidden"}`}
            >
              Completed
            </button>

            <span className={`${sidebarOpen ? "block" : "hidden"}`}>2</span>
          </div>

          <div className="flex items-center justify-between gap-2 p-2 my-3 bg-white border border-gray-200 text-sm rounded-md text-gray-500">
            <span>⚙</span>
            <button
              className={`flex items-center gap-2 focus:text-purple-700 ${sidebarOpen ? "block" : "hidden"}`}
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto">
        <hr className="border-gray-200 mb-4" />

        <div className="flex flex-col gap-3 p-2 bg-white border-2 border-gray-100 text-sm rounded-md">
          <div className="flex items-center gap-2">
            <div className="border rounded-full text-white px-2 py-2 bg-purple-700">
              PP
            </div>

            <div
              className={`flex flex-col ${sidebarOpen ? "block" : "hidden"}`}
            >
              <h2 className="font-bold">Name</h2>
              <p className="text-gray-500 text-sm">email@example.com</p>
            </div>
          </div>

          <div
            className={`flex items-center justify-center w-full p-2 bg-white border-2 border-gray-200 rounded-md ${sidebarOpen ? "block" : "hidden"}`}
          >
            <span className="text-gray-500 cursor-pointer">
              <Logout />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
