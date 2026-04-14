"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { redirect } from "next/navigation";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

export default function HistoryPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);

  if (!user) {
    redirect("/login");
  }

  useEffect(() => {
    const q = query(
      collection(db, "practiceSessions"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setSessions(data);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
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
          fontSize: 40,
          color: "white",
          textShadow: "3px 3px 6px rgba(0,0,0,0.25)"
        }}
      >
        Practice History
      </h1>

      <div
        style={{
          width: "100%",
          maxWidth: 450,
          display: "flex",
          flexDirection: "column",
          gap: 25
        }}
      >
        {sessions.length === 0 && (
          <div
            style={{
              background: "rgba(255,255,255,0.3)",
              padding: 25,
              borderRadius: 35,
              textAlign: "center",
              fontSize: 26,
              color: "white",
              boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
              backdropFilter: "blur(6px)"
            }}
          >
            No history yet
          </div>
        )}

        {sessions.map((s) => (
          <div
            key={s.id}
            style={{
              background: "rgba(255,255,255,0.35)",
              padding: 25,
              borderRadius: 35,
              boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
              backdropFilter: "blur(6px)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 24,
              color: "#ffffff",
              fontWeight: "bold"
            }}
          >
            <span>{s.word}</span>
            <span style={{ fontSize: 18, opacity: 0.9 }}>
              {formatDate(s.createdAt)}
            </span>
          </div>
        ))}
      </div>

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