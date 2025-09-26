import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar kiri */}
      <aside className="w-48 bg-white shadow-md hidden lg:block">
        <div className="p-4 font-bold">📑 Menu</div>
        <nav className="flex flex-col space-y-2 p-4 text-gray-700">
          <a href="/posts" className="hover:text-blue-600">🏠 Posts</a>
          <a href="/posts/new" className="hover:text-blue-600">➕ New Post</a>
          <a href="/admin" className="hover:text-blue-600">📊 Admin</a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <Component {...pageProps} />
        </main>
      </div>

      {/* Right Sidebar */}
      <aside className="hidden xl:block w-60 bg-white border-l shadow-sm">
        <div className="p-4 font-bold">⚡ Quick Info</div>
        <ul className="space-y-2 p-4 text-sm text-gray-600">
          <li>👥 Total Users</li>
          <li>📝 Posts terbaru</li>
          <li>💬 Comments</li>
        </ul>
      </aside>
    </div>
  );
}

export default MyApp;