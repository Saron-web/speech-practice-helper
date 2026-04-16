"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        background: "linear-gradient(135deg, #FFD700, #FF8C00, #FF69B4, #87CEFA)"
      }}
    >
      <h1
        style={{
          fontSize: 40,
          color: "white",
          textShadow: "3px 3px 6px rgba(0,0,0,0.25)"
        }}
      >
        Welcome, {user?.email}
      </h1>

      {/* Practice Button */}
      <a
        href="/practice"
        style={{
          width: 300,
          padding: 20,
          textAlign: "center",
          background: "rgba(255,255,255,0.4)",
          borderRadius: 20,
          color: "white",
          fontSize: 26,
          textDecoration: "none",
          boxShadow: "0 6px 12px rgba(0,0,0,0.25)"
        }}
      >
        🎤 Start Practice
      </a>

      {/* History Button */}
      <a
        href="/history"
        style={{
          width: 300,
          padding: 20,
          textAlign: "center",
          background: "rgba(255,255,255,0.4)",
          borderRadius: 20,
          color: "white",
          fontSize: 26,
          textDecoration: "none",
          boxShadow: "0 6px 12px rgba(0,0,0,0.25)"
        }}
      >
        📜 View History
      </a>

      {/* Protected Page */}
      <a
        href="/protected"
        style={{
          width: 300,
          padding: 20,
          textAlign: "center",
          background: "rgba(255,255,255,0.4)",
          borderRadius: 20,
          color: "white",
          fontSize: 26,
          textDecoration: "none",
          boxShadow: "0 6px 12px rgba(0,0,0,0.25)"
        }}
      >
        🔒 Protected Page
      </a>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: 20,
          width: 300,
          padding: 18,
          borderRadius: 20,
          background: "rgba(255,0,0,0.6)",
          color: "white",
          fontSize: 24,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 12px rgba(0,0,0,0.25)"
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}