import { AnimatePresence, motion } from "framer-motion";
import { Inbox } from "lucide-react";
import { EnquiryCard } from "./EnquiryCard";

export function EnquiryList({ items, loading, onUpdate, onDelete }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4" data-testid="admin-list-loading">
        {[0, 1, 2].map((i) => (
          <div key={i} className="glass rounded-2xl h-36 animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="glass rounded-3xl p-14 flex flex-col items-center text-center gap-4" data-testid="admin-empty-state">
        <div className="w-14 h-14 rounded-2xl bg-royal/20 flex items-center justify-center text-aqua">
          <Inbox size={24} />
        </div>
        <h2 className="font-heading text-lg font-semibold">No enquiries here</h2>
        <p className="soft text-sm max-w-xs">Messages sent through the portfolio contact form will appear in this inbox.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4" data-testid="admin-enquiry-list">
      <AnimatePresence initial={false}>
        {items.map((m, i) => (
          <motion.div
            key={m.id}
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i * 0.04, 0.3) } }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
          >
            <EnquiryCard item={m} onUpdate={onUpdate} onDelete={onDelete} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
