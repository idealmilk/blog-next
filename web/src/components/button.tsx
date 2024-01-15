import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Making the type prop optional
};

export default function Button({ children, type = "button" }: ButtonProps) {
  return (
    <button
      type={type} // Passing the type prop to the button element
      className="inline-flex border rounded-md px-12 py-1 text-sm text-blue-500 bg-white"
    >
      {children}
    </button>
  );
}
