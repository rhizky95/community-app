import { useState } from "react";
import api from "../utils/api";
import { saveToken } from "../utils/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      const res = await api.post("/auth/register", { email, password });
      saveToken(res.data.access_token);
      window.location.href = "/posts";
    } catch (err) {
      alert("Register gagal! Email mungkin sudah digunakan.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-5 border rounded focus:outline-none focus:ring focus:ring-green-300"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Sudah punya akun?{" "}
          <a href="/login" className="text-green-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}