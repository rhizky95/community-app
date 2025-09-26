import { useEffect } from "react";
import { useRouter } from "next/router";
import { getUserRole, getToken } from "../utils/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");  // kalau belum login
      return;
    }

    const role = getUserRole();

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/posts");
    }
  }, [router]);

  return <p style={{ padding: 20 }}>Redirecting...</p>;
}