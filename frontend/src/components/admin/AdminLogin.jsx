import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock, ArrowRight, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { adminApi, setToken, formatApiError } from "@/lib/adminApi";

export function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { token } = await adminApi.login(password);
      setToken(token);
      onSuccess();
    } catch (err) {
      setError(formatApiError(err, "Could not sign in."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden" data-testid="admin-login-page">
      <div className="orb w-[480px] h-[480px] bg-royal/40 -top-40 -left-32" />
      <div className="orb w-[380px] h-[380px] bg-aqua/25 bottom-0 right-0" />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative rounded-3xl p-8 sm:p-10 w-full max-w-md flex flex-col gap-6"
        data-testid="admin-login-form"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-royal to-royalbright flex items-center justify-center shadow-lg shadow-royal/30">
          <Lock size={20} className="text-white" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-aqua font-semibold mb-2">Private</p>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">Enquiries Dashboard</h1>
          <p className="soft text-sm mt-2">Sign in to read and manage messages from recruiters.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="admin-password" className="text-xs uppercase tracking-[0.25em] soft">Password</label>
          <div className="relative">
            <input
              id="admin-password"
              data-testid="admin-password-input"
              type={show ? "text" : "password"}
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-transparent border border-input rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:border-aqua transition-colors placeholder:text-muted-foreground"
            />
            <button
              type="button"
              data-testid="admin-password-toggle"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 soft hover:text-aqua transition-colors"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        {error && (
          <p role="alert" data-testid="admin-login-error" className="text-sm text-red-400 -mt-2">
            {error}
          </p>
        )}
        <button
          type="submit"
          data-testid="admin-login-submit"
          disabled={busy}
          className="btn-primary rounded-full px-8 py-4 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
          {busy ? "Signing in..." : "Sign in"}
        </button>
        <Link to="/" data-testid="admin-back-home" className="soft text-xs flex items-center gap-1.5 hover:text-aqua transition-colors self-start">
          <ArrowLeft size={12} /> Back to portfolio
        </Link>
      </motion.form>
    </div>
  );
}
