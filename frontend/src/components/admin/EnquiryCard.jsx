import { useState } from "react";
import { Star, Mail, MailOpen, Reply, Trash2, X, Check } from "lucide-react";

const timeAgo = (iso) => {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 7 * 86400) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};

const fullDate = (iso) =>
  new Date(iso).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export function EnquiryCard({ item, onUpdate, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const initials = item.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
  const replyHref = `mailto:${item.email}?subject=${encodeURIComponent(`Re: your message — Abhishek Gopal Band`)}&body=${encodeURIComponent(`Hi ${item.name.split(" ")[0]},\n\nThanks for reaching out.\n\n\n---\nYou wrote:\n${item.message}`)}`;
  const action =
    "w-9 h-9 rounded-full flex items-center justify-center soft hover:text-aqua hover:bg-white/5 transition-colors";

  return (
    <article
      data-testid={`enquiry-card-${item.id}`}
      className={`glass rounded-2xl p-5 sm:p-6 transition-colors ${item.read ? "" : "border-aqua/40"}`}
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-royal to-royalbright flex items-center justify-center font-heading text-sm font-bold text-white shadow-lg shadow-royal/30">
            {initials}
          </div>
          {!item.read && <span data-testid="enquiry-unread-dot" className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-aqua ring-2 ring-background" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className={`font-heading text-base truncate ${item.read ? "font-medium" : "font-bold"}`} data-testid="enquiry-name">{item.name}</h3>
            <a href={`mailto:${item.email}`} className="text-sm text-aqua hover:underline truncate" data-testid="enquiry-email">{item.email}</a>
            <time dateTime={item.created_at} title={fullDate(item.created_at)} className="soft text-xs ml-auto" data-testid="enquiry-time">
              {timeAgo(item.created_at)}
            </time>
          </div>
          <p className="text-sm leading-relaxed mt-3 whitespace-pre-wrap break-words" data-testid="enquiry-message">{item.message}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-5 pt-4 border-t border-border">
        <button
          data-testid="enquiry-toggle-read"
          onClick={() => onUpdate(item.id, { read: !item.read })}
          title={item.read ? "Mark as unread" : "Mark as read"}
          className={action}
        >
          {item.read ? <Mail size={16} /> : <MailOpen size={16} />}
        </button>
        <button
          data-testid="enquiry-toggle-star"
          onClick={() => onUpdate(item.id, { starred: !item.starred })}
          title={item.starred ? "Remove star" : "Star"}
          className={`${action} ${item.starred ? "text-amber-400 hover:text-amber-300" : ""}`}
        >
          <Star size={16} fill={item.starred ? "currentColor" : "none"} />
        </button>
        <a
          data-testid="enquiry-reply"
          href={replyHref}
          onClick={() => !item.read && onUpdate(item.id, { read: true })}
          className="ml-1 rounded-full px-4 py-2 text-xs font-heading font-semibold flex items-center gap-1.5 bg-royal/15 text-aqua hover:bg-royal/30 transition-colors"
        >
          <Reply size={14} /> Reply via email
        </a>
        <div className="ml-auto flex items-center gap-1">
          {confirming ? (
            <>
              <span className="soft text-xs mr-1">Delete?</span>
              <button data-testid="enquiry-delete-confirm" onClick={() => onDelete(item.id)} className={`${action} text-red-400 hover:text-red-300`} title="Confirm delete">
                <Check size={16} />
              </button>
              <button data-testid="enquiry-delete-cancel" onClick={() => setConfirming(false)} className={action} title="Cancel">
                <X size={16} />
              </button>
            </>
          ) : (
            <button data-testid="enquiry-delete" onClick={() => setConfirming(true)} className={`${action} hover:text-red-400`} title="Delete">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
