import { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full h-16 fixed top-0 right-0 z-40 md:pl-16 transition-all duration-300
      ${isScrolled ? "bg-white/10 backdrop-blur-sm " : "bg-white"}
    `}
    >
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="flex items-center h-16 px-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="ml-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <FaTimes className="text-gray-600 text-xl" />
              </button>
            </div>
          </div>
        )}

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl relative items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <FaSearch className="text-gray-600 text-xl" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FaBell className="text-gray-600 text-xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
