import { useEffect, useState, type FC } from "react";

const buttonStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "10px",
  transition: "transform 0.3s ease",
};

const iconWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "50px",
  height: "50px",
};

const baseIconStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transition: "opacity 0.4s ease, transform 0.5s ease",
};
const getIconStyle = (
  darkMode: boolean,
  type: "sun" | "moon"
): React.CSSProperties => {
  const commonStyle = {
    ...baseIconStyle,
    opacity: type === "sun" ? (darkMode ? 1 : 0) : darkMode ? 0 : 1,
    transform:
      type === "sun"
        ? darkMode
          ? "scale(1) rotate(0deg)"
          : "scale(0.5) rotate(-90deg)"
        : darkMode
        ? "scale(0.5) rotate(90deg)"
        : "scale(1) rotate(0deg)",
    fill: type === "sun" ? "#f1c40f" : "#9999",
    stroke: type === "sun" ? "#f1c40f" : undefined,
  };
  return commonStyle;
};

// Alternância de tema
const Tema: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Atualizar localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.style.transition =
      "background-color 0.4s ease, color 0.4s ease";
    document.body.style.backgroundColor = darkMode ? "#1a1a1a" : "#ffffff";
    document.body.style.color = darkMode ? "#f1f1f1" : "#1a1a1a";
  }, [darkMode]);

  return (
    <button
      type="button"
      title="Alternar tema"
      aria-label="Alternar tema"
      onClick={toggleDarkMode}
      style={buttonStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={iconWrapperStyle}>
        {/* Lua */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={getIconStyle(darkMode, "moon")}
        >
          <path
            d="M21 12.79A9 9 0 1 1 13.2 2.5 
               6.5 6.5 0 0 0 21 12.79z"
            fill="#9999"
          />
        </svg>

        {/* Sol */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={getIconStyle(darkMode, "sun")}
        >
          <g stroke="#f1c40f" strokeWidth="2" fill="none" strokeLinecap="round">
            <circle cx="12" cy="12" r="5" fill="#f1c40f" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </div>
    </button>
  );
};

export default Tema;
