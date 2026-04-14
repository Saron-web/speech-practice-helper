"use client";

import { useState, useRef } from "react";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function PracticePage() {
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const recognitionRef = useRef<any>(null);

  const words = ["Apple", "Ball", "Cat","Boy","Girl", "Mama","Dada", "Sorry", "Stop", "Dog", "Yes", "Fish", "Sun", "Tree"];

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported on this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;
    setListening(true);

    recognition.start();

    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript;
      setHeard(spoken);

      saveSession(spoken);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const saveSession = async (spokenWord: string) => {
    await addDoc(collection(db, "practiceSessions"), {
      word: words[index],
      spoken: spokenWord,
      correct: spokenWord.toLowerCase() === words[index].toLowerCase(),
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
        onClick={startListening}
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: listening ? "#FF3B30" : "#FF6F61",
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

      {heard && (
        <div
          style={{
            fontSize: 26,
            color: "white",
            background: "rgba(0,0,0,0.3)",
            padding: 15,
            borderRadius: 20
          }}
        >
          You said: <b>{heard}</b>
        </div>
      )}

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