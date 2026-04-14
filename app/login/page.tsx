"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    router.push("/dashboard"); // ANY email + password works
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
        Welcome to Speech Practice Helper 👋
      </h1>

      <form
        onSubmit={handleLogin}
        style={{
          background: "rgba(255,255,255,0.35)",
          padding: 30,
          borderRadius: 35,
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)",
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 20
        }}
      >
        <input
          type="email"
          placeholder="Email (anything works)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: 18,
            borderRadius: 25,
            border: "none",
            fontSize: 20
          }}
        />

        <input
          type="password"
          placeholder="Password (anything works)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: 18,
            borderRadius: 25,
            border: "none",
            fontSize: 20
          }}
        />

        <button
          type="submit"
          style={{
            padding: "18px 40px",
            fontSize: 24,
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
          Login
        </button>
      </form>

      <a
        href="/register"
        style={{
          fontSize: 22,
          color: "white",
          textDecoration: "underline"
        }}
      >
        Create an account
      </a>
    </div>
  );
}