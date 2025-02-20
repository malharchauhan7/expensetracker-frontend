import { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaCog,
  FaBars,
  FaSignOutAlt,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { icon: <FaUser />, text: "Profile", path: "profile" },
    { icon: <FaTachometerAlt />, text: "Dashboard", path: "dashboard" },
    { icon: <GrTransaction />, text: "Transactions", path: "transactions" },
    { icon: <FaCog />, text: "Settings", path: "settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-white/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-screen bg-white
          ${isOpen ? "w-64" : "w-16"}
          transition-all duration-300 ease-in-out
          z-50 flex flex-col
          shadow-lg 
        `}
      >
        <div className="flex items-center p-4 ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black text-xl hover:bg-gray-800 hover:text-white p-2 rounded-lg  mr-2 cursor-pointer"
            aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <FaBars />
          </button>
        </div>

        <nav className="mt-4 flex-1">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center p-3 rounded-lg mx-2 cursor-pointer
                    
                    ${
                      location.pathname.includes(item.path)
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-800 hover:text-white"
                    }
                  `}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <div className="min-w-[24px] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span
                    className={`
                      ml-3 whitespace-nowrap
                      transition-all duration-300
                      ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}
                    `}
                  >
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-center py-4 border-b border-gray-100">
          <div
            className={`flex items-center space-x-3 ${
              !isOpen && "justify-center"
            }`}
          >
            <div className="flex-shrink-0 ml-2">
              <FaWallet className="w-8 h-8 text-blue-600" />
            </div>
            <div
              className={`flex flex-col transition-all duration-300 ${
                isOpen
                  ? "opacity-100 w-auto "
                  : "opacity-0 w-0 overflow-hidden "
              }`}
            >
              <span className="text-xl font-bold text-gray-800">Expense</span>
              <span className="text-md font-medium text-blue-600">Mate</span>
            </div>
          </div>
        </div>

        <div className="p-3">
          <button
            className="flex items-center p-3 hover:bg-red-600 rounded-lg hover:text-white w-full cursor-pointer"
            aria-label="Logout"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <div className="min-w-[24px] flex items-center justify-center">
              <FaSignOutAlt />
            </div>
            <span
              className={`
                ml-3 whitespace-nowrap
                
                ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div
        className={`
          min-h-screen
          ${isMobile ? "pt-0" : "pt-16 " + (isOpen ? "ml-64" : "ml-16")}
          transition-all duration-300 ease-in-out
          bg-gray-50
        `}
      >
        {/* Show Navbar only on desktop */}
        {!isMobile && <Navbar />}

        {/* Dashboard content */}
        <div className={`p-4 ${isMobile ? "mt-16 ml-10" : ""}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
