import axios from "axios";

const TOKEN_KEY = "ab-admin-token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY));

const client = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/admin` });
client.interceptors.request.use((cfg) => {
  const t = getToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export const formatApiError = (err, fallback = "Something went wrong. Please try again.") => {
  const d = err?.response?.data?.detail;
  if (!d) return err?.message || fallback;
  if (typeof d === "string") return d;
  if (Array.isArray(d)) return d.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  return d?.msg || String(d);
};

export const adminApi = {
  login: (password) => client.post("/login", { password }).then((r) => r.data),
  me: () => client.get("/me").then((r) => r.data),
  list: () => client.get("/enquiries").then((r) => r.data),
  update: (id, patch) => client.patch(`/enquiries/${id}`, patch).then((r) => r.data),
  remove: (id) => client.delete(`/enquiries/${id}`),
};
