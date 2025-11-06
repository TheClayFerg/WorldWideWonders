"use client";
import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import WinModal from "./components/winModal";
import './globals.css';






var places = [
  [{ lat: 48.858331276895534,  lng: 2.294497393252732 },  {location: 'Eiffel Tower'}],
  [{ lat: 40.431928116361476,  lng: 116.57036953558242 }, {location: 'Great Wall of China'}],
  [{ lat: 27.175140027735488,  lng: 78.04211537791211 },  {location: 'Taj Mahal'}],
  [{ lat: 41.89021419341014,   lng: 12.492214806747267 }, {location: 'The Colosseum'}],
  [{ lat: 40.689253467605596,  lng: -74.04450576441756 }, {location: 'Statue of Liberty'}],
  [{ lat: -33.856744306896545, lng: 151.21529133558244 }, {location: 'Sydney Opera House'}],
  [{ lat: 43.72294036955999,   lng: 10.396570177912112 }, {location: 'Leaning Tower of Pisa'}],
  [{ lat: 37.81991513757875,   lng: -122.47857589325272}, {location: 'Golden Gate Bridge'}],
]
       
let currentPlace = places[Math.floor(Math.random() * (places.length))]  
currentPlace = places[2]
let coordinates = currentPlace[0]
let place = currentPlace[1].location

export default function initialize() {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const player = {
      name: "TestUser",
      score: 0,
      time: 0,
    };

    useEffect(() => {
        // create panorama and store it on window so dropdown/random can control it later
        let panorama = new google.maps.StreetViewPanorama(
            document.getElementById("street-view"),
            {
                position: coordinates,
                pov: { heading: 165, pitch: 0 },
                zoom: 1,
            },
        );
        window._panorama = panorama;

        console.log("StreetView initial coords:", coordinates, "place:", place);
        
        return () => {
            try {
                if (window._panorama) {
                    delete window._panorama;
                }
            } catch (e) {  }
        };
    }, []); 


    function moveToIndex(idx) {
        if (idx < 0 || idx >= places.length) return;
        currentPlace = places[idx];
        coordinates = currentPlace[0];
        place = currentPlace[1].location;
        
        if (window._panorama && typeof window._panorama.setPosition === "function") {
            window._panorama.setPosition(coordinates);
            console.log("Panorama moved to:", place, coordinates);
        } else {
            // console log for debug
            console.log("Panorama not ready yet; coordinates set to:", place);
        }
    }

    function handleSelectChange(e) {
        const name = e.target.value;
        const newIdx = places.findIndex(p => p[1].location === name);
        if (newIdx >= 0) moveToIndex(newIdx);
    }

    function pickRandom() {
        const randomIdx = Math.floor(Math.random() * places.length);
        moveToIndex(randomIdx);
        // also try to update the select's shown value by setting its value directly (keeps UI in sync)
        const sel = document.getElementById("place-select");
        if (sel) sel.value = places[randomIdx][1].location;
    }

    return (
        <div>
            <div className="bg-gray-100 text-gray-900 front-sans">

                <NavBar />

                <main className="pt-20 flex flex-col items-center min-h-screen">
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

                        <button
                            className="px-3 py-2 border rounded bg-white"
                            onClick={pickRandom}
                        >
                            Random
                        </button>
                    </div>

                    <WinModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      name={player.name}
                      score={player.score}
                      time={player.time}
                    />


                    <div id="street-view" className="w-[90%] h-[70vh] bg-gray-300 rounded-2xl shadow-inner flex justify-center items-center text-gray-600" />
                </main>
            </div>

            <div id="distance-display"></div>

            <script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXu9uxRvpLthoY9qxONXv9_yXDoB9cklU&callback=initialize&v=weekly"
                defer
            ></script>
        </div>
    )
}