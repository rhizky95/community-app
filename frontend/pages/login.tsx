import { useState } from "react";
import api from "../utils/api";
import { saveToken } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await api.post("/auth/login", { email, password });
      saveToken(res.data.access_token);
      window.location.href = "/posts";
    } catch (err) {
      alert("Login gagal, cek email/password!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-5 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}