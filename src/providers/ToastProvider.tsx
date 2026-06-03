"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
// css
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  const [theme, setTheme] = useState<"light" | "dark">(
    "light"
  );

  useEffect(() => {
    const updateTheme = () => {
      setTheme(
        document.documentElement.classList.contains(
          "dark"
        )
          ? "dark"
          : "light"
      );
    };

    updateTheme();

    const observer = new MutationObserver(
      updateTheme
    );

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    return () => observer.disconnect();
  }, []);

  return (
    <ToastContainer
      toastStyle={{
        zIndex: 2147483647,
      }}
      style={{
        zIndex: 2147483647,
      }}
      key={theme}
      theme={theme}
      position="top-right"
      autoClose={3000}
      pauseOnHover
      closeOnClick
      draggable
      newestOnTop
      hideProgressBar={false}
    />
  );
}