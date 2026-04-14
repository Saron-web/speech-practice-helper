"use client";

export default function SplashPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        background: "linear-gradient(135deg, #FFB6C1, #FFD700, #87CEFA)"
      }}
    >
      <div
        style={{
          fontSize: 90,
          textShadow: "3px 3px 6px rgba(0,0,0,0.25)"
        }}
      >
        🌈
      </div>

      <h1
        style={{
          fontSize: 48,
          color: "white",
          textAlign: "center",
          textShadow: "3px 3px 6px rgba(0,0,0,0.25)"
        }}
      >
        Speech Practice Helper
      </h1>

      <p
        style={{
          fontSize: 24,
          color: "white",
          opacity: 0.9,
          textAlign: "center",
          maxWidth: 300
        }}
      >
        A fun way for kids to practice words every day!
      </p>

      <a
        href="/login"
        style={{
          padding: "20px 50px",
          fontSize: 28,
          background: "#6A5ACD",
          color: "white",
          borderRadius: 40,
          textDecoration: "none",
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          transition: "transform 0.15s"
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Start ➜
      </a>
    </div>
  );
}