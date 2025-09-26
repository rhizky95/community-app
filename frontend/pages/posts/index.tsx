import useSWR from "swr";
import api from "../../utils/api";
import Link from "next/link";

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function Posts() {
  const { data: posts, error } = useSWR("/posts", fetcher);

  if (error) return <div className="text-center text-red-500 mt-10">⚠️ Error loading posts</div>;
  if (!posts) return <div className="text-center text-gray-500 mt-10">Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📌 All Posts</h1>
          <a
            href="/posts/new"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ➕ New Post
          </a>
        </div>

        {/* Grid Card Posts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p: any) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-lg p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {p.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {p.content}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3">
                <Link href={`/posts/${p.id}`} className="text-blue-600 hover:underline text-sm font-medium">
                  👉 Read More
                </Link>
                <span 
                  className="inline-flex items-center text-gray-500 text-sm cursor-pointer"
                >
                  👍 {p.likeCount || 0}
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-2">By {p.user?.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}