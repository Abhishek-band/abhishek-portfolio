import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, Linkedin, MapPin, Send, Loader2 } from "lucide-react";
import { Reveal, SectionHead, Magnetic } from "./bits";
import { profile } from "../../data/portfolio";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent — I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Could not send your message. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  const rows = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
    { icon: Linkedin, label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin },
    { icon: MapPin, label: "Location", value: profile.location, href: null },
  ];

  return (
    <section id="contact" data-testid="contact-section" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHead index="07" eyebrow="Contact" title="Let's build growth together" />
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
        <Reveal className="flex flex-col gap-4">
          {rows.map((r) => {
            const Inner = (
              <>
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-royal to-royalbright flex items-center justify-center shrink-0 shadow-lg shadow-royal/30">
                  <r.icon size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.25em] soft mb-1">{r.label}</p>
                  <p className="text-sm font-medium truncate">{r.value}</p>
                </div>
              </>
            );
            return r.href ? (
              <a
                key={r.label}
                data-testid={`contact-info-${r.label.toLowerCase()}`}
                href={r.href}
                target={r.label === "LinkedIn" ? "_blank" : undefined}
                rel={r.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-aqua/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                {Inner}
              </a>
            ) : (
              <div key={r.label} data-testid={`contact-info-${r.label.toLowerCase()}`} className="glass rounded-2xl p-5 flex items-center gap-4">
                {Inner}
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="glass rounded-3xl p-7 sm:p-9 flex flex-col gap-5" data-testid="contact-form">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-xs uppercase tracking-[0.25em] soft">Name</label>
                <input
                  id="contact-name"
                  data-testid="contact-name-input"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Your name"
                  className="bg-transparent border border-input rounded-xl px-4 py-3 text-sm outline-none focus:border-aqua transition-colors placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.25em] soft">Email</label>
                <input
                  id="contact-email"
                  data-testid="contact-email-input"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@company.com"
                  className="bg-transparent border border-input rounded-xl px-4 py-3 text-sm outline-none focus:border-aqua transition-colors placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-xs uppercase tracking-[0.25em] soft">Message</label>
              <textarea
                id="contact-message"
                data-testid="contact-message-input"
                required
                minLength={10}
                rows={5}
                value={form.message}
                onChange={set("message")}
                placeholder="Tell me about the role, project or idea..."
                className="bg-transparent border border-input rounded-xl px-4 py-3 text-sm outline-none focus:border-aqua transition-colors resize-none placeholder:text-muted-foreground"
              />
            </div>
            <Magnetic className="self-start">
              <button
                type="submit"
                data-testid="contact-submit-button"
                disabled={sending}
                className="btn-primary rounded-full px-8 py-4 text-sm flex items-center gap-2 disabled:opacity-60"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
