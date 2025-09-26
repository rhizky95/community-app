import { jwtDecode } from "jwt-decode";

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export function getUserRole(): string | null {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.role || null;
  } catch {
    return null;
  }
}