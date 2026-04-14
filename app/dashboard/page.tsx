"use client";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 50,
        background: "linear-gradient(135deg, #FFB6C1, #FFD700, #87CEFA)"
      }}
    >
      <h1
        style={{
          fontSize: 42,
          color: "white",
          textShadow: "3px 3px 6px rgba(0,0,0,0.25)"
        }}
      >
        Welcome, {user?.email || "Guest"}
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          width: "100%",
          maxWidth: 400
        }}
      >
        <a
          href="/practice"
          style={{
            background: "rgba(255,255,255,0.35)",
            padding: 25,
            borderRadius: 35,
            textAlign: "center",
            fontSize: 28,
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
            backdropFilter: "blur(6px)",
            transition: "transform 0.15s"
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          🎤 Start Practice
        </a>

        <a
          href="/history"
          style={{
            background: "rgba(255,255,255,0.35)",
            padding: 25,
            borderRadius: 35,
            textAlign: "center",
            fontSize: 28,
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
            backdropFilter: "blur(6px)",
            transition: "transform 0.15s"
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ⭐ View History
        </a>
      </div>

      <button
        onClick={logout}
        style={{
          marginTop: 20,
          padding: "15px 40px",
          fontSize: 22,
          background: "#6A5ACD",
          color: "white",
          borderRadius: 30,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
          transition: "transform 0.15s"
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Logout
      </button>
    </div>
  );
}