"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface PracticeSession {
  id: string;
  word: string;
  spoken?: string;
  correct?: boolean;
  createdAt?: any;
}

export default function ProgressSummaryPage() {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [accuracy, setAccuracy] = useState(0);
  const [wordCounts, setWordCounts] = useState<any>({});

  useEffect(() => {
    const q = query(
      collection(db, "practiceSessions"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: PracticeSession[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PracticeSession, "id">)
      }));

      setSessions(data);

      const total = data.length;
      const correct = data.filter((s) => s.correct === true).length;
      setAccuracy(total > 0 ? Math.round((correct / total) * 100) : 0);

      const counts: any = {};
      data.forEach((s) => {
        if (!counts[s.word]) counts[s.word] = 0;
        counts[s.word]++;
      });
      setWordCounts(counts);
    });

    return () => unsubscribe();
  }, []);

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
          fontSize: 40,
          color: "white",
          textShadow: "3px 3px 6px rgba(0,0,0,0.25)"
        }}
      >
        📈 Progress Summary
      </h1>

      {/* Stats Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 450,
          background: "rgba(255,255,255,0.35)",
          padding: 25,
          borderRadius: 35,
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)",
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}
      >
        <span>📊 Total Attempts: {sessions.length}</span>
        <span>🎯 Accuracy: {accuracy}%</span>
      </div>

      {/* Most Practiced Words */}
      <div
        style={{
          width: "100%",
          maxWidth: 450,
          background: "rgba(255,255,255,0.35)",
          padding: 25,
          borderRadius: 35,
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)",
          color: "white",
          fontSize: 22,
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}
      >
        <span style={{ fontSize: 26 }}>📝 Most Practiced Words</span>

        {Object.keys(wordCounts).map((word) => (
          <span key={word}>
            {word}: {wordCounts[word]} times
          </span>
        ))}

        {Object.keys(wordCounts).length === 0 && <span>No practice yet</span>}
      </div>

      {/* Back to Dashboard */}
      <a
        href="/dashboard"
        style={{
          marginTop: 10,
          fontSize: 22,
          color: "white",
          textDecoration: "underline"
        }}
      >
        ⬅ Back to Dashboard
      </a>
    </div>
  );
}