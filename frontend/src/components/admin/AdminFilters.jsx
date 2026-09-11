import { Search, Mail, MailOpen, Star } from "lucide-react";

const TABS = [
  { key: "all", label: "All enquiries", icon: Mail },
  { key: "unread", label: "Unread", icon: MailOpen },
  { key: "starred", label: "Starred", icon: Star },
];

export function AdminFilters({ filter, setFilter, counts, query, setQuery }) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-8 self-start" data-testid="admin-filters">
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 soft" />
        <input
          data-testid="admin-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, message"
          className="w-full glass rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-aqua transition-colors placeholder:text-muted-foreground bg-transparent"
        />
      </div>
      <nav className="glass rounded-2xl p-2 flex lg:flex-col gap-1">
        {TABS.map((t) => {
          const active = filter === t.key;
          return (
            <button
              key={t.key}
              data-testid={`admin-filter-${t.key}`}
              onClick={() => setFilter(t.key)}
              className={`flex-1 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                active ? "bg-royal text-white shadow-lg shadow-royal/30" : "soft hover:text-foreground hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <t.icon size={15} /> {t.label}
              </span>
              <span className={`text-xs font-heading tabular-nums ${active ? "text-white/80" : ""}`} data-testid={`admin-count-${t.key}`}>
                {counts[t.key]}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
