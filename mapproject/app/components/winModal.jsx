"use client";
import React from "react";

import { useState, useEffect } from "react";

export default function WinModal({ name, time, location }) {

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.openModal = () => setShowModal(true);
  }, []);

  if (!showModal) return (null);

  // Only render modal if isOpen is true
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center relative animate-fadeIn">
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

        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Congratulations {name}!
        </h2>

        <p className="text-gray-600 mb-6">
          Great job, You found your way to {location}!
        </p>

        <button
          onClick={() => setShowModal(false)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
