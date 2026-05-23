"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1e1b4b",
          color: "#fff",
          border: "1px solid rgba(6, 182, 212, 0.3)",
          borderRadius: "16px",
          padding: "12px 20px",
        },
        success: {
          iconTheme: {
            primary: "#06b6d4",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}