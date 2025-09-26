import { useState, useEffect } from "react";
import { getToken, getUserRole, logout } from "../utils/auth";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const t = getToken();
    setToken(t);
    if (t) setRole(getUserRole());
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            🌐 CommunityApp
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {token ? (
              <>
                <a href="/posts" className="text-gray-700 hover:text-blue-600">
                  🏠 Posts
                </a>
                <a href="/posts/new" className="text-gray-700 hover:text-blue-600">
                  ➕ New Post
                </a>
                {role === "admin" && (
                  <a href="/admin" className="text-gray-700 hover:text-blue-600">
                    📊 Admin
                  </a>
                )}
                <button
                  onClick={logout}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-gray-700 hover:text-blue-600">
                  🔑 Login
                </a>
                <a href="/register" className="text-gray-700 hover:text-blue-600">
                  📝 Register
                </a>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {/* Menu Icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-3 shadow">
          <div className="flex flex-col space-y-2">
            {token ? (
              <>
                <a href="/posts" className="text-gray-700 hover:text-blue-600">
                  🏠 Posts
                </a>
                <a href="/posts/new" className="text-gray-700 hover:text-blue-600">
                  ➕ New Post
                </a>
                {role === "admin" && (
                  <a href="/admin" className="text-gray-700 hover:text-blue-600">
                    📊 Admin
                  </a>
                )}
                <button
                  onClick={logout}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-gray-700 hover:text-blue-600">
                  🔑 Login
                </a>
                <a href="/register" className="text-gray-700 hover:text-blue-600">
                  📝 Register
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}