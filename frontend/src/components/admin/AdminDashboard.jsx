import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { adminApi, setToken, formatApiError } from "@/lib/adminApi";
import { AdminHeader } from "./AdminHeader";
import { AdminFilters } from "./AdminFilters";
import { EnquiryList } from "./EnquiryList";

export function AdminDashboard({ onLogout, theme, onToggleTheme }) {
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const handleAuthError = (err) => {
    if (err?.response?.status === 401) {
      setToken(null);
      onLogout();
      return true;
    }
    return false;
  };

  const load = () =>
    adminApi
      .list()
      .then(setItems)
      .catch((err) => {
        if (!handleAuthError(err)) toast.error(formatApiError(err, "Could not load enquiries."));
        setItems([]);
      });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = async (id, patch) => {
    try {
      const doc = await adminApi.update(id, patch);
      setItems((list) => list.map((m) => (m.id === id ? doc : m)));
    } catch (err) {
      if (!handleAuthError(err)) toast.error(formatApiError(err, "Update failed."));
    }
  };

  const remove = async (id) => {
    try {
      await adminApi.remove(id);
      setItems((list) => list.filter((m) => m.id !== id));
      toast.success("Enquiry deleted.");
    } catch (err) {
      if (!handleAuthError(err)) toast.error(formatApiError(err, "Delete failed."));
    }
  };

  const counts = useMemo(() => {
    const all = items || [];
    return { all: all.length, unread: all.filter((m) => !m.read).length, starred: all.filter((m) => m.starred).length };
  }, [items]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (items || []).filter((m) => {
      if (filter === "unread" && m.read) return false;
      if (filter === "starred" && !m.starred) return false;
      if (!q) return true;
      return [m.name, m.email, m.message].some((v) => v.toLowerCase().includes(q));
    });
  }, [items, filter, query]);

  return (
    <div className="relative min-h-screen" data-testid="admin-dashboard">
      <div className="orb w-[520px] h-[520px] bg-royal/30 -top-56 right-0" />
      <AdminHeader unread={counts.unread} onRefresh={load} onLogout={onLogout} theme={theme} onToggleTheme={onToggleTheme} />
      <div className="relative max-w-6xl mx-auto px-6 pb-24 grid lg:grid-cols-[260px_1fr] gap-8">
        <AdminFilters filter={filter} setFilter={setFilter} counts={counts} query={query} setQuery={setQuery} />
        <EnquiryList items={visible} loading={items === null} onUpdate={update} onDelete={remove} />
      </div>
    </div>
  );
}
