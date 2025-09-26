import { useState } from "react";
import api from "../utils/api";
import { saveToken } from "../utils/auth";

export default function RegisterAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    const res = await api.post("/auth/register-admin", { email, password });
    saveToken(res.data.access_token);
    alert("Registered as Admin!");
    window.location.href = "/admin";
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Register Admin</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={register}>Register Admin</button>
    </div>
  );
}