"use client";

import { useAuth } from "../context/AuthContext";

export default function ProtectedPage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: 40 }}>
      <h1>Protected Page</h1>
      <p>You are logged in as: {user?.email || "Guest"}</p>
    </div>
  );
}