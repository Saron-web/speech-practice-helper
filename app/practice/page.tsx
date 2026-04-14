"use client";

import { useState, useRef, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function PracticePage() {
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const recognitionRef = useRef<any>(null);

  const [bearExpression, setBearExpression] = useState("🧸");
  const [isWiggling, setIsWiggling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWiggling(true);
      setTimeout(() => setIsWiggling(false), 600);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sounds = {
    start: typeof Audio !== "undefined" ? new Audio("/sounds/ding.mp3") : null,
    stop: typeof Audio !== "undefined" ? new Audio("/sounds/pop.mp3") : null,
    correct: typeof Audio !== "undefined" ? new Audio("/sounds/tada.mp3") : null,
    wrong: typeof Audio !== "undefined" ? new Audio("/sounds/boop.mp3") : null,
  };

  const categories = [
    "All",
    "Animals",
    "Food",
    "Nature",
    "Family",
    "Basic Words",
    "Feelings",
    "Toys",
    "Actions",
    "Daily Routine",
    "Places"
  ];

  const words = [
    { word: "Cat", emoji: "🐱", category: "Animals" },
    { word: "Dog", emoji: "🐶", category: "Animals" },
    { word: "Fish", emoji: "🐟", category: "Animals" },
    { word: "Bird", emoji: "🐦", category: "Animals" },
    { word: "Cow", emoji: "🐄", category: "Animals" },
    { word: "Lion", emoji: "🦁", category: "Animals" },
    { word: "Monkey", emoji: "🐒", category: "Animals" },
    { word: "Rabbit", emoji: "🐰", category: "Animals" },
    { word: "Frog", emoji: "🐸", category: "Animals" },

    { word: "Apple", emoji: "🍎", category: "Food" },
    { word: "Banana", emoji: "🍌", category: "Food" },
    { word: "Milk", emoji: "🥛", category: "Food" },
    { word: "Bread", emoji: "🍞", category: "Food" },
    { word: "Cookie", emoji: "🍪", category: "Food" },
    { word: "Egg", emoji: "🥚", category: "Food" },
    { word: "Cheese", emoji: "🧀", category: "Food" },
    { word: "Carrot", emoji: "🥕", category: "Food" },

    { word: "Sun", emoji: "☀️", category: "Nature" },
    { word: "Tree", emoji: "🌳", category: "Nature" },
    { word: "Flower", emoji: "🌸", category: "Nature" },
    { word: "Rain", emoji: "🌧️", category: "Nature" },
    { word: "Cloud", emoji: "☁️", category: "Nature" },
    { word: "Star", emoji: "⭐", category: "Nature" },
    { word: "Leaf", emoji: "🍃", category: "Nature" },
    { word: "Fire", emoji: "🔥", category: "Nature" },

    { word: "Mama", emoji: "👩", category: "Family" },
    { word: "Baba", emoji: "👨", category: "Family" },
    { word: "Baby", emoji: "👶", category: "Family" },
    { word: "Sister", emoji: "👧", category: "Family" },
    { word: "Brother", emoji: "👦", category: "Family" },
    { word: "Grandma", emoji: "👵", category: "Family" },
    { word: "Grandpa", emoji: "👴", category: "Family" },

    { word: "Yes", emoji: "👍", category: "Basic Words" },
    { word: "No", emoji: "🙅", category: "Basic Words" },
    { word: "Stop", emoji: "✋", category: "Basic Words" },
    { word: "Go", emoji: "🟢", category: "Basic Words" },
    { word: "Help", emoji: "🆘", category: "Basic Words" },
    { word: "More", emoji: "➕", category: "Basic Words" },
    { word: "All Done", emoji: "✔️", category: "Basic Words" },

    { word: "Happy", emoji: "😀", category: "Feelings" },
    { word: "Sad", emoji: "😢", category: "Feelings" },
    { word: "Angry", emoji: "😡", category: "Feelings" },
    { word: "Scared", emoji: "😨", category: "Feelings" },
    { word: "Tired", emoji: "😴", category: "Feelings" },
    { word: "Love", emoji: "❤️", category: "Feelings" },

    { word: "Ball", emoji: "⚽", category: "Toys" },
    { word: "Teddy", emoji: "🧸", category: "Toys" },
    { word: "Car", emoji: "🚗", category: "Toys" },
    { word: "Blocks", emoji: "🧱", category: "Toys" },
    { word: "Doll", emoji: "🪆", category: "Toys" },
    { word: "Kite", emoji: "🪁", category: "Toys" },

    { word: "Eat", emoji: "🍽️", category: "Actions" },
    { word: "Sleep", emoji: "🛏️", category: "Actions" },
    { word: "Run", emoji: "🏃", category: "Actions" },
    { word: "Jump", emoji: "🤸", category: "Actions" },
    { word: "Clap", emoji: "👏", category: "Actions" },
    { word: "Wave", emoji: "👋", category: "Actions" },
    { word: "Drink", emoji: "🥤", category: "Actions" },

    { word: "Bath", emoji: "🛁", category: "Daily Routine" },
    { word: "Brush Teeth", emoji: "🪥", category: "Daily Routine" },
    { word: "Bed", emoji: "🛏️", category: "Daily Routine" },
    { word: "Shoes", emoji: "👟", category: "Daily Routine" },
    { word: "Coat", emoji: "🧥", category: "Daily Routine" },
    { word: "Wash Hands", emoji: "🧼", category: "Daily Routine" },

    { word: "Home", emoji: "🏠", category: "Places" },
    { word: "School", emoji: "🏫", category: "Places" },
    { word: "Park", emoji: "🌳", category: "Places" },
    { word: "Store", emoji: "🏪", category: "Places" },
    { word: "Playground", emoji: "🛝", category: "Places" }
  ];

  const filteredWords =
    selectedCategory === "All"
      ? words
      : words.filter((w) => w.category === selectedCategory);

  const currentWord = filteredWords[index % filteredWords.length];

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
    setHeard("");

    setBearExpression("🧸");
    sounds.start?.play();

    recognition.start();

    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript;
      setHeard(spoken);
      saveSession(spoken);
    };

    recognition.onend = () => {
      setListening(false);
      sounds.stop?.play();
    };
  };

  const saveSession = async (spokenWord: string) => {
    const correct =
      spokenWord.toLowerCase() === currentWord.word.toLowerCase();

    if (correct) {
      setBearExpression("😃🧸");
      sounds.correct?.play();
    } else {
      setBearExpression("😕🧸");
      sounds.wrong?.play();
    }

    await addDoc(collection(db, "practiceSessions"), {
      word: currentWord.word,
      spoken: spokenWord,
      correct: correct,
      createdAt: serverTimestamp()
    });

    setTimeout(() => {
      setBearExpression("🧸");
      setIndex((prev) => prev + 1);
    }, 1500);
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
        background: "linear-gradient(135deg, #FFB6D5, #C9A7FF, #AEE6FF)"
      }}
    >
      <h1
        style={{
          fontSize: 42,
          color: "white",
          textShadow: "3px 3px 6px rgba(0,0,0,0.25)"
        }}
      ></h1>

      {/* Category Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
          maxWidth: 500
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setIndex(0);
            }}
            style={{
              padding: "12px 20px",
              borderRadius: 30,
              border: "none",
              cursor: "pointer",
              background:
                selectedCategory === cat ? "#FF9CEE" : "rgba(255,255,255,0.5)",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
              transition: "0.2s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Word Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.4)",
          padding: 30,
          borderRadius: 40,
          width: 300,
          textAlign: "center",
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)"
        }}
      >
        <div style={{ fontSize: 100 }}>{currentWord.emoji}</div>
        <div
          style={{
            fontSize: 50,
            marginTop: 10,
            color: "#ffffff",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.25)"
          }}
        >
          {currentWord.word}
        </div>
      </div>

      {/* Microphone Button */}
      <button
        onClick={startListening}
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: listening ? "#FFD966" : "#FF9CEE",
          color: "white",
          fontSize: 70,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
          transition: "transform 0.15s, background 0.3s",
          transform: listening ? "scale(1.05)" : "scale(1)"
        }}
      >
        🎤
      </button>

      <div style={{ fontSize: 24, color: "white" }}>
        {listening ? "Listening..." : "Tap the button to speak!"}
      </div>

      {/* ⭐ SKIP BUTTON ADDED HERE ⭐ */}
      <button
        onClick={() => setIndex((prev) => prev + 1)}
        style={{
          marginTop: 10,
          padding: "12px 20px",
          borderRadius: 20,
          background: "#FF6F91",
          color: "white",
          fontSize: 20,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 12px rgba(0,0,0,0.25)"
        }}
      >
        Skip — Too Hard
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
          I heard: <b>{heard}</b>
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

      {/* 🧸 Teddy Bear Helper */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          fontSize: 60,
          userSelect: "none",
          animation: isWiggling ? "wiggle 0.6s ease" : "none"
        }}
      >
        {bearExpression}
      </div>

      {/* Wiggle Animation */}
      <style>
        {`
          @keyframes wiggle {
            0% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            50% { transform: translateX(4px); }
            75% { transform: translateX(-4px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}