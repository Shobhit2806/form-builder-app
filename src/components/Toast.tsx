import { useState, useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number; // Duration in milliseconds
};

const Toast = ({ message, type = "info", duration = 3000 }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-md text-white transition-opacity duration-300 ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
