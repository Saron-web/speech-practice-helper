"use client";

import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      // Create a random user ID
      const uid = crypto.randomUUID();

      // Save username to Firestore
      await setDoc(doc(db, "users", uid), {
        username: username,
        createdAt: new Date(),
      });

      // Save username locally so the app knows who is logged in
      localStorage.setItem("username", username);
      localStorage.setItem("uid", uid);

      router.push("/dashboard");
    } catch (err: any) {
      setError("Something went wrong.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #b6e63c, #FFD700, #87CEFA)",
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
          backdropFilter: "blur(6px)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "white", marginBottom: 20 }}>
          Create Username
        </h2>

        <label style={{ color: "white", fontSize: 18 }}>Username</label>
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
            marginBottom: 20,
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
            boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}