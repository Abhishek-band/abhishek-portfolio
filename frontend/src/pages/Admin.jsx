import { useEffect, useState } from "react";
import { adminApi, getToken, setToken } from "@/lib/adminApi";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function Admin({ theme, onToggleTheme }) {
  const [authed, setAuthed] = useState(null);

  useEffect(() => {
    document.title = "Enquiries — Abhishek Gopal Band";
    if (!getToken()) return setAuthed(false);
    adminApi
      .me()
      .then(() => setAuthed(true))
      .catch(() => {
        setToken(null);
        setAuthed(false);
      });
  }, []);

  const logout = () => {
    setToken(null);
    setAuthed(false);
  };

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="admin-loading">
        <div className="w-10 h-10 rounded-full border-2 border-aqua/30 border-t-aqua animate-spin" />
      </div>
    );
  }

  return authed ? (
    <AdminDashboard onLogout={logout} theme={theme} onToggleTheme={onToggleTheme} />
  ) : (
    <AdminLogin onSuccess={() => setAuthed(true)} />
  );
}
