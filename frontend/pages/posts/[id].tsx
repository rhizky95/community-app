import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import api from "../../utils/api";

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: post, mutate: mutatePost } = useSWR(id ? `/posts/${id}` : null, fetcher);
  const { data: comments, mutate: mutateComments } = useSWR(id ? `/comments/${id}` : null, fetcher);

  const [newComment, setNewComment] = useState("");

  async function toggleLikePost() {
    await api.post(`/likes/post/${id}`);
    mutatePost();
  }

  async function addComment() {
    if (!newComment.trim()) return;
    await api.post(`/comments/${id}`, { content: newComment });
    setNewComment("");
    mutateComments();
  }

  if (!post) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Post */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <p className="text-sm text-gray-500 mb-4">By {post.user?.email}</p>
        <button
          type="button"
          onClick={toggleLikePost}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          👍 {post.likeCount || 0}
        </button>
      </div>

      {/* Form komentar */}
      <div className="bg-gray-100 rounded p-4 mb-6">
        <textarea
          className="w-full border rounded p-2 mb-3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Tulis komentar..."
        />
        <button
          type="button"
          onClick={addComment}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
        >
          💬 Tambah Komentar
        </button>
      </div>

      {/* List Komentar */}
      <h2 className="text-xl font-semibold mb-3">Comments</h2>
      <div className="space-y-3">
        {comments?.map((c: any) => (
          <CommentItem key={c.id} comment={c} refresh={mutateComments}/>
        ))}
      </div>
    </div>
  );
}

function CommentItem({ comment, refresh }: any) {
  async function toggleLikeComment() {
    await api.post(`/likes/comment/${comment.id}`);
    refresh();
  }

  return (
    <div className="bg-white shadow rounded p-3 flex justify-between items-center">
      <div>
        <p className="text-gray-800">{comment.content}</p>
        <p className="text-xs text-gray-500">By {comment.user.email}</p>
      </div>
      <button
        type="button"
        onClick={toggleLikeComment}
        className="px-2 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 cursor-pointer"
      >
        👍 {comment.likeCount || 0}
      </button>
    </div>
  );
}