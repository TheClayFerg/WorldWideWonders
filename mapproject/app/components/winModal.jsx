"use client";
import React from "react";

export default function WinModal({ isOpen, onClose, name, score, time }) {
  // Only render modal if isOpen is true
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center relative animate-fadeIn">
        <div className="mx-auto mb-4 w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          Success!
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Great job, You win!
        </p>

        <button
          onClick={onClose}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
