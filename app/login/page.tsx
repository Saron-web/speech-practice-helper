"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const router = useRouter();
  const auth = getAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      // Login with ANY email + ANY password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Load username from Firestore
      const snap = await getDoc(doc(db, "users", user.uid));

      if (!snap.exists()) {
        setError("Username not found in database.");
        return;
      }

      const savedUsername = snap.data().username;

      // Check if username matches
      if (savedUsername !== username) {
        setError("Incorrect username.");
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #b6e63c, #FFD700, #87CEFA)"
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "rgba(255,255,255,0.4)",
          padding: 40,
          borderRadius: 20,
          width: 350,
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)"
        }}
      >
        <h2 style={{ textAlign: "center", color: "black", marginBottom: 20 }}>
          Login
        </h2>

        <label style={{ color: "black", fontSize: 18 }}>Username</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            marginBottom: 15
          }}
        />

        <label style={{ color: "black", fontSize: 18 }}>Email</label>
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

        <label style={{ color: "black", fontSize: 18 }}>Password</label>
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
          <p style={{ color: "red", marginBottom: 10, fontSize: 14 }}>{error}</p>
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
            boxShadow: "0 6px 12px rgba(0,0,0,0.25)"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}