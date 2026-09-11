import { Link } from "react-router-dom";
import { Inbox, RefreshCw, LogOut, Sun, Moon, ArrowLeft } from "lucide-react";

export function AdminHeader({ unread, onRefresh, onLogout, theme, onToggleTheme }) {
  const iconBtn =
    "w-10 h-10 rounded-full glass flex items-center justify-center soft hover:text-aqua hover:border-aqua/50 transition-colors";
  return (
    <header className="relative max-w-6xl mx-auto px-6 pt-10 pb-10 flex flex-wrap items-end justify-between gap-6" data-testid="admin-header">
      <div>
        <Link to="/" data-testid="admin-back-home" className="soft text-xs flex items-center gap-1.5 hover:text-aqua transition-colors mb-5">
          <ArrowLeft size={12} /> Back to portfolio
        </Link>
        <p className="text-xs uppercase tracking-[0.35em] text-aqua font-semibold mb-3 flex items-center gap-2">
          <Inbox size={14} /> Private inbox
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Enquiries</h1>
        <p className="soft text-sm mt-3" data-testid="admin-unread-summary">
          {unread === 0 ? "You're all caught up." : `${unread} unread ${unread === 1 ? "message" : "messages"} waiting.`}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button data-testid="admin-refresh-button" onClick={onRefresh} aria-label="Refresh" className={iconBtn}>
          <RefreshCw size={16} />
        </button>
        <button data-testid="admin-theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme" className={iconBtn}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          data-testid="admin-logout-button"
          onClick={onLogout}
          className="btn-ghost glass rounded-full px-5 py-2.5 text-sm flex items-center gap-2"
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </header>
  );
}
