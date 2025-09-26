"use client";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md hover:bg-amana-green/20 transition"
      title="Toggle Theme"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;