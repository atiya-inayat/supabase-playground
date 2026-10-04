// const SideBar = () => {
//   return (
//     <div className="flex flex-col justify-between  h-screen p-4 bg-white text-white">
//       <div className="flex  items-center justify-between mb-4">
//         <h1 className="text-lg font-bold text-purple-700">✦ Taskly</h1>
//         <button className="text-gray-500 hover:text-purple-700">←</button>
//       </div>
//       <hr className="border-gray-200 " />

//       <div>
//         <h1 className="text-gray-400">Menu</h1>
//         <div className="flex  items-center justify-between gap-2 p-2 my-3 list-none bg-white text-sm border border-gray-200 rounded-md text-gray-500">
//           <button className="focus:text-purple-700 flex justify-between items-center gap-2">
//             <span>⊞</span> Dasboard
//           </button>

//           <span>5</span>
//         </div>

//         <div className="flex items-center justify-between text-gray-500 gap-2 p-2 my-3 list-none bg-white border border-gray-200 text-sm rounded-md ">
//           <button className="focus:text-purple-700 flex justify-between items-center gap-2">
//             <span>⊞</span> Completed
//           </button>

//           <span>2</span>
//         </div>

//         <div className="flex items-center justify-between gap-2 p-2 my-3 list-none bg-white border border-gray-200 text-sm rounded-md text-black">
//           <button className="focus:text-purple-700 text-gray-500 flex justify-between items-center gap-2">
//             <span>⚙</span> Settings
//           </button>
//         </div>
//       </div>

//       <hr className="border-gray-200 " />
//       {/* footer */}
//       <div className="flex items-center flex-col justify-between gap-2 p-2 my-3  bg-white border-2 border-gray-100 text-sm rounded-md text-black">
//         <div className="flex items-center gap-2">
//           <div className="border rounded-full text-white  px-2 py-2 bg-purple-700">
//             PP
//           </div>
//           <div className="flex flex-col ">
//             <h2 className="font-bold ">Name</h2>
//             <p className="text-gray-500 text-sm">email@example.com</p>
//           </div>
//         </div>

//         <div className="flex items-center w-full justify-center  p-2 my-3  bg-white border-2 border-gray-200 text-sm rounded-md text-black">
//           <button className="focus:text-purple-700   text-purple-700 flex justify-between items-center gap-2">
//             Sign out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;

const SideBar = () => {
  return (
    <div className="flex flex-col h-screen p-4 bg-white">
      {/* Top */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-purple-700">✦ Taskly</h1>

          <button className="text-gray-500 hover:text-purple-700">←</button>
        </div>

        <hr className="border-gray-200" />

        {/* Menu */}
        <div className="mt-6">
          <h1 className="text-gray-400">Menu</h1>

          <div className="flex items-center justify-between gap-2 p-2 my-3 bg-white text-sm border border-gray-200 rounded-md text-gray-500">
            <button className="flex items-center gap-2 focus:text-purple-700">
              <span>⊞</span>
              Dashboard
            </button>

            <span>5</span>
          </div>

          <div className="flex items-center justify-between gap-2 p-2 my-3 bg-white border border-gray-200 text-sm rounded-md text-gray-500">
            <button className="flex items-center gap-2 focus:text-purple-700">
              <span>⊞</span>
              Completed
            </button>

            <span>2</span>
          </div>

          <div className="flex items-center justify-between gap-2 p-2 my-3 bg-white border border-gray-200 text-sm rounded-md text-gray-500">
            <button className="flex items-center gap-2 focus:text-purple-700">
              <span>⚙</span>
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

            <div className="flex flex-col">
              <h2 className="font-bold">Name</h2>
              <p className="text-gray-500 text-sm">email@example.com</p>
            </div>
          </div>

          <div className="flex items-center justify-center w-full p-2 bg-white border-2 border-gray-200 rounded-md">
            <button className="text-purple-700">Sign out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
