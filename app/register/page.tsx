"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await register(email, password);
      router.push("/login");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in instead.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FFD700, #FF8C00, #FF69B4, #87CEFA)"
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          background: "rgba(255,255,255,0.4)",
          padding: 40,
          borderRadius: 20,
          width: 350,
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#222", marginBottom: 20 }}>
          Create Account
        </h2>

        <label style={{ color: "#222", fontSize: 18 }}>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            marginBottom: 15
          }}
        />

        <label style={{ color: "#222", fontSize: 18 }}>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            marginBottom: 20
          }}
        />

        {error && (
          <p style={{ color: "red", marginBottom: 10, fontSize: 14 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 10,
            background: "#6A5ACD",
            color: "white",
            fontSize: 20,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
            marginBottom: 10
          }}
        >
          Register
        </button>

        <p style={{ textAlign: "center", color: "#222", marginBottom: 10 }}>
          Already registered?
        </p>

        <button
          type="button"
          onClick={() => router.push("/login")}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            background: "transparent",
            color: "#222",
            fontSize: 16,
            border: "none",
            cursor: "pointer",
            textDecoration: "underline"
          }}
        >
          Login here
        </button>
      </form>
    </div>
  );
}