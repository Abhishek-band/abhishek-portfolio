import { useState, useCallback } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Portfolio from "@/pages/Portfolio";
import Admin from "@/pages/Admin";

function App() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("ab-theme", next);
      return next;
    });
  }, []);

  return (
    <div className="font-body bg-background text-foreground min-h-screen" data-testid="portfolio-root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio theme={theme} onToggleTheme={toggleTheme} />} />
          <Route path="/admin" element={<Admin theme={theme} onToggleTheme={toggleTheme} />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme={theme} position="bottom-right" richColors />
    </div>
  );
}

export default App;
