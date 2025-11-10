"use client";
import { useEffect, useState, useRef, useCallback } from "react";

import NavBar from "./components/NavBar";
import WinModal from "./components/winModal";

import "./globals.css";

/* -------------------------
   React Stopwatch (Hook)
--------------------------*/
function useStopwatch() {
  const [timeMs, setTimeMs] = useState(0);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTimeMs((t) => t + 100);
    }, 100);
  }, []);

  const stop = useCallback(() => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setTimeMs(0);
  }, []);

  // safety: clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return { timeMs, start, stop, reset };
}

// starting locations
var places = [
  [{ lat: 48.85175190901051, lng: 2.2897615145195256 }, { location: "The Eiffel Tower" }],
  [{ lat: 41.88916503732436, lng: 12.495807327200632 }, { location: "The Colosseum" }],
  [{ lat: -33.86332015348142, lng: 151.21184432020186 }, { location: "The Sydney Opera House" }],
  [{ lat: 43.72241521483225, lng: 10.392064933294535 }, { location: "The Leaning Tower of pisa" }],
  [{ lat: 51.499478209752645, lng: -0.13307989206634516 }, { location: "Big Ben" }],
  [{ lat: 37.83746295614792, lng: -122.47941782521923 }, { location: "The Golden Gate Bridge" }],
  [{ lat: 48.806942340957846, lng: 2.133223974191376 }, { location: "The Palace of Versailles" }],
  [{ lat: 20.694297159826963, lng: -88.58618645865695 }, { location: "Chichen Itza" }],
];

// ending locations
var destination = [
  [{ lat: 48.857597232823224, lng: 2.294088407744251 }, { location: "The Eiffel Tower" }],
  [{ lat: 41.89032514126806, lng: 12.491846048954196 }, { location: "The Colosseum" }],
  [{ lat: -33.856162361001275, lng: 151.21555560657174 }, { location: "The Sydney Opera House" }],
  [{ lat: 43.722962919466866, lng: 10.396104195604407 }, { location: "The Leaning Tower of pisa" }],
  [{ lat: 51.50096740041798, lng: -0.1241623357433608 }, { location: "Big Ben" }],
  [{ lat: 37.83233390159084, lng: -122.47332804550392 }, { location: "The Golden Gate Bridge" }],
  [{ lat: 48.80368473709394, lng: 2.124536265468451 }, { location: "The Palace of Versailles" }],
  [{ lat: 20.68303868723637, lng: -88.57213387301465 }, { location: "Chichen Itza" }],
];

let currentPlace = places[Math.floor(Math.random() * places.length)];
let coordinates = currentPlace[0];
let place = currentPlace[1].location;
let oldDifDist = 1;

export default function Initialize() {
  const { timeMs, start, stop, reset } = useStopwatch();
  const [heatLabel, setHeatLabel] = useState("Hot or Cold");
  const [heatClass, setHeatClass] = useState("");

  // Local helpers that can call React stopwatch safely
  function hotOrCold(newer) {
    if (newer > oldDifDist) {
      setHeatLabel("Colder...");
      setHeatClass("text-blue-500");
    } else if (oldDifDist > newer) {
      setHeatLabel("Warmer...");
      setHeatClass("text-red-500");
    }
  }

  function testLocation(lat, lng) {
    // get the difference in latitude
    let latDist = Math.abs(destination[places.indexOf(currentPlace)][0].lat - lat);
    // get the difference in longitude
    let lngDist = Math.abs(destination[places.indexOf(currentPlace)][0].lng - lng);
    // get the total difference in distance for comparison later
    let difDist = latDist + lngDist;

    // check if user is within .001 distance from destination
    if (difDist < 0.001) {
      stop(); // stop React stopwatch
      window.openModal(); // show your existing modal
    }

    hotOrCold(difDist);
    oldDifDist = difDist;
  }

  useEffect(() => {
    function initPanorama() {
      if (!window.google || !window.google.maps) {
        // Wait for Google Maps API to load
        setTimeout(initPanorama, 300);
        return;
      }

      const panorama = new window.google.maps.StreetViewPanorama(
        document.getElementById("street-view"),
        {
          position: coordinates,
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
        }
      );

      window._panorama = panorama;

      // React stopwatch replaces old calls
      reset();
      start();

      panorama.addListener("position_changed", () => {
        const pos = panorama.getPosition();
        testLocation(pos.lat(), pos.lng());
      });
    }

    // dynamically load the Google Maps script
    if (!document.querySelector("#google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBXu9uxRvpLthoY9qxONXv9_yXDoB9cklU&v=weekly";
      script.async = true;
      script.defer = true;
      script.onload = initPanorama;
      document.head.appendChild(script);
    } else {
      initPanorama();
    }

    return () => {
      if (window._panorama) delete window._panorama;
      stop(); // React stopwatch cleanup
    };
  }, [reset, start, stop]);

  function moveToIndex(idx) {
    if (idx < 0 || idx >= places.length) return;
    currentPlace = places[idx];
    coordinates = currentPlace[0];
    place = currentPlace[1].location;

    if (window._panorama && typeof window._panorama.setPosition === "function") {
      window._panorama.setPosition(coordinates);
      setHeatLabel("Hot or Cold");
      setHeatClass("");
      oldDifDist = 1;
      // keep stopwatch behavior consistent with previous code
      reset();
      start();
      console.log("Moved to:", place);
    }
  }

  function handleSelectChange(e) {
    const name = e.target.value;
    const newIdx = places.findIndex((p) => p[1].location === name);
    reset();
    start();
    setHeatLabel("Hot or Cold");
    setHeatClass("");
    oldDifDist = 1;
    if (newIdx >= 0) moveToIndex(newIdx);
  }

  function pickRandom() {
    const randomIdx = Math.floor(Math.random() * places.length);
    moveToIndex(randomIdx);
    const sel = document.getElementById("place-select");
    reset();
    start();
    setHeatLabel("Hot or Cold");
    setHeatClass("");
    oldDifDist = 1;
    if (sel) sel.value = places[randomIdx][1].location;
  }

  async function getHint() {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: place }),
      });
      const data = await res.json();
      alert("Hint: " + data.reply);
    } catch (err) {
      console.error("Failed to get hint:", err);
      alert("Sorry, hint bot isn't responding!");
    }
  }

  return (
    <div className="bg-gray-100 text-gray-900 front-sans">
      <NavBar />
      <WinModal
        name={"John Doe"}
        time={Number((timeMs / 1000).toFixed(1))} // pass live stopwatch time to modal
        location={place}
      />

      <h3 className={`pt-30 flex justify-center text-xl font-bold ${heatClass}`}>{heatLabel}</h3>

      <main className="pt-5 flex flex-col items-center min-h-screen">
        {/* dropdown + random button */}
        <div className="mb-4 flex gap-3 items-center">
          <select
            id="place-select"
            className="border border-gray-300 rounded-lg p-2"
            defaultValue={place}
            onChange={handleSelectChange}
          >
            {places.map((p, i) => (
              <option key={i} value={p[1].location}>
                {p[1].location}
              </option>
            ))}
          </select>

          <button className="px-3 py-2 border rounded bg-white" onClick={pickRandom}>
            Random
          </button>

          <button
            className="px-3 py-2 border rounded bg-yellow-300 hover:bg-yellow-400"
            onClick={getHint}
          >
            AI Tip 🤔
          </button>

          <div className="flex items-center gap-2 ml-4">
            <span className="font-mono">Time:</span>
            <span className="font-mono tabular-nums">{(timeMs / 1000).toFixed(1)}s</span>
          </div>
        </div>

        <div
          id="street-view"
          className="w-[90%] h-[70vh] bg-gray-300 rounded-2xl shadow-inner flex justify-center items-center text-gray-600"
        />
      </main>
    </div>
  );
}
