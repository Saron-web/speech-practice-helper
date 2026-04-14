"use client";

import { useAuth } from "../context/AuthContext";
import { redirect } from "next/navigation";

export default function ProtectedPage() {
  const { user } = useAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Protected Page</h1>
      <p>You are logged in.</p>
    </div>
  );
}