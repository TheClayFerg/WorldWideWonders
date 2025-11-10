import React from 'react'

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
            <div className="flex space-x-6">
                <a href="/" className="text-slate-700 font-bold hover:text-blue-400 transition">Map</a>
                <a href="/login" className="text-slate-700 font-bold hover:text-blue-400 transition">Login</a>
                <a href="/scores" className="text-slate-700 font-bold hover:text-blue-400 transition">Scores</a>
            </div>

            <div className="text-4xl font-extrabold tracking-wide">World Explorer</div>
        </div>
    </nav>
  );
}
