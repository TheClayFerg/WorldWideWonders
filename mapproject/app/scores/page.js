"use client";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

export default function Scores() {
  const [groupedScores, setGroupedScores] = useState({});

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch("http://localhost:5000/api/scores");
        if (!res.ok) throw new Error("Failed to fetch scores");
        const data = await res.json();

        // ✅ Group scores by lowercase `location`
        const grouped = data.reduce((acc, score) => {
          const location = score.location || "unknown";
          if (!acc[location]) acc[location] = [];
          acc[location].push(score);
          return acc;
        }, {});

        setGroupedScores(grouped);
      } catch (err) {
        console.error(err);
      }
    }

    fetchScores();
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900 font-sans bg-cover bg-center bg-no-repeat bg-fixed">
      <NavBar />

      <main className="pt-24 flex flex-col items-center min-h-screen space-y-8 pb-12 w-full">
        <h1 className="text-3xl font-bold text-blue-700">🏆 Scores by Location</h1>

        {Object.keys(groupedScores).length === 0 ? (
          <div className="text-gray-600 bg-white p-8 rounded-2xl shadow">
            No scores yet.
          </div>
        ) : (
          Object.entries(groupedScores).map(([location, scores]) => (
            <section
              key={location}
              className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6"
            >
              <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
                {location}
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">player</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {scores.map((row) => (
                      <tr
                        key={row.id ?? `${location}-${row.player}-${row.time}`}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-3">{row.playerName}</td>
                        <td className="px-6 py-3">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}