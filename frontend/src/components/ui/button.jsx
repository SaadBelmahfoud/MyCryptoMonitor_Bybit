//--- File: frontend/src/components/ui/button.jsx ---
import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-primary text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
