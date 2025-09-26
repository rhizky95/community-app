import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { getToken } from "../../utils/auth";

export default function NewPost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  // Proteksi: kalau belum login → redirect ke login
  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
    }
  }, [router]);

  async function submitPost() {
    try {
      await api.post("/posts", {
        title,
        content,
        tags: tags.split(",").map(tag => tag.trim()), // array tag
      });
      alert("✅ Post berhasil dibuat!");
      router.push("/posts");
    } catch (err) {
      alert("❌ Gagal buat post. Pastikan sudah login.");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">➕ New Post</h1>

        {/* INPUT TITLE */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul
          </label>
          <input
            type="text"
            placeholder="Masukkan judul post..."
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* INPUT CONTENT */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Konten
          </label>
          <textarea
            placeholder="Tulis konten di sini..."
            className="w-full border rounded p-3 h-40 resize-none focus:outline-none focus:ring focus:ring-blue-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* INPUT TAGS */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (pisahkan dengan koma)
          </label>
          <input
            type="text"
            placeholder="contoh: nestjs, backend, tutorial"
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Tips: tulis tags dipisahkan dengan koma, contoh: <em>nestjs, tailwind, fullstack</em>
          </p>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => router.push("/posts")}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            ❌ Batal
          </button>
          <button
            type="button"
            onClick={submitPost}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ✅ Simpan
          </button>
        </div>
      </div>
    </div>
  );
}