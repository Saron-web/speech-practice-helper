"use client";

import { useAuth } from "./context/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { user, logout } = useAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome</h1>
      <p>{user.email}</p>
      <button
        onClick={logout}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: 6,
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}
