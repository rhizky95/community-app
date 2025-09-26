import useSWR from "swr";
import api from "../../utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken, getUserRole } from "../../utils/auth";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function AdminDashboard() {
  const router = useRouter();

  // Proteksi: hanya admin boleh buka
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    if (getUserRole() !== "admin") {
      router.push("/posts");
    }
  }, [router]);

  const { data, error } = useSWR("/admin/analytics", fetcher);

  if (error) return <div className="text-red-600 text-center mt-10">⚠️ Tidak bisa memuat data (unauthorized)</div>;
  if (!data) return <div className="text-center mt-10">Loading analytics...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">📊 Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Users"
            value={data.users}
            color="bg-blue-500"
            icon="👥"
          />
          <StatCard
            title="Total Posts"
            value={data.posts}
            color="bg-green-500"
            icon="📝"
          />
          <StatCard
            title="Total Comments"
            value={data.comments}
            color="bg-yellow-500"
            icon="💬"
          />
          <StatCard
            title="Post Likes"
            value={data.postLikes}
            color="bg-purple-500"
            icon="👍"
          />
          <StatCard
            title="Comment Likes"
            value={data.commentLikes}
            color="bg-pink-500"
            icon="❤️"
          />
        </div>

        {/* Tambah Section Kedepan → misalnya moderasi daftar posts */}
        <div className="mt-12 bg-white shadow rounded p-6">
          <h2 className="text-xl font-bold mb-4">Moderasi Konten</h2>
          <p className="text-gray-600">
            (Fitur opsional: di sini nanti bisa ditampilkan list post & comment
            dengan opsi Hapus / Approve untuk admin.)
          </p>
        </div>
      </div>
    </div>
  );
}

// Komponen Statistik
function StatCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: string;
}) {
  return (
    <div className={`rounded-lg shadow p-6 flex items-center ${color} text-white`}>
      <div className="text-4xl mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}