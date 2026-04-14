"use client";

import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function PracticePage() {
  const [index, setIndex] = useState(0);

  const words = ["Apple", "Ball", "Cat", "Dog", "Fish", "Sun", "Tree"];

  const saveAndNext = async () => {
    await addDoc(collection(db, "practiceSessions"), {
      word: words[index],
      createdAt: serverTimestamp()
    });

    setIndex((index + 1) % words.length);
  };

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
          fontSize: 40,
          color: "white",
          textShadow: "3px 3px 6px rgba(0,0,0,0.25)"
        }}
      >
        Practice Word
      </h1>

      <div
        style={{
          fontSize: 60,
          color: "#ffffff",
          padding: "30px 60px",
          borderRadius: 40,
          background: "rgba(255,255,255,0.25)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)",
          fontWeight: "bold"
        }}
      >
        {words[index]}
      </div>

      <button
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "#FF6F61",
          color: "white",
          fontSize: 80,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
          transition: "transform 0.15s"
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        🎤
      </button>

      <button
        onClick={saveAndNext}
        style={{
          padding: "20px 50px",
          fontSize: 28,
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
        Next Word ➜
      </button>

      <a
        href="/dashboard"
        style={{
          marginTop: 10,
          fontSize: 22,
          color: "white",
          textDecoration: "underline"
        }}
      >
        Back to Dashboard
      </a>
    </div>
  );
}