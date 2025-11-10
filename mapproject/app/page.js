"use client";
import { useEffect } from "react";

import NavBar from "./components/NavBar"

import './globals.css'

// starting locations
var places = [
  [{ lat: 48.85175190901051,   lng: 2.2897615145195256 },  {location: 'Eiffel Tower'}],
  [{ lat: 41.88916503732436,   lng: 12.495807327200632},   {location: 'The Colosseum'}],
  [{ lat: -33.86332015348142,  lng: 151.21184432020186 },  {location: 'Sydney Opera House'}],
  [{ lat: 43.72241521483225,   lng: 10.392064933294535},   {location: 'Leaning Tower of pisa'}],
  [{ lat: 51.499478209752645,  lng: -0.13307989206634516}, {location: 'Big Ben'}],
  [{ lat: 37.83746295614792,   lng: -122.47941782521923},  {location: 'Golden Gate Bridge'}],
  [{ lat: 48.806942340957846,  lng: 2.133223974191376},    {location: 'Palace of Versailles'}],
  [{ lat: 35.36787231223111,   lng: 138.8610499351484},    {location: 'Mount Fuji'}],
  [{ lat: 20.694297159826963,  lng: -88.58618645865695},   {location: 'Chichen Itza'}]
 
]

// ending locations
var destination = [
  [{ lat: 48.857597232823224,  lng: 2.294088407744251 },  {location: 'Eiffel Tower'}],
  [{ lat: 41.89032514126806,   lng: 12.491846048954196 }, {location: 'The Colosseum'}],
  [{ lat: -33.856162361001275, lng: 151.21555560657174 }, {location: 'Sydney Opera House'}],
  [{ lat: 43.722962919466866,  lng: 10.396104195604407},  {location: 'Leaning Tower of pisa'}],
  [{ lat: 51.50096740041798,   lng: -0.1241623357433608}, {location: 'Big Ben'}],
  [{ lat: 37.8276502293566,    lng: -122.48178307959817}, {location: 'Golden Gate Bridge'}],
  [{ lat: 48.80368473709394,   lng: 2.124536265468451},   {location: 'Palace of Versailles'}],
  [{ lat: 35.36454630360458,   lng: 138.73307837316136},  {location: 'Mount Fuji'}],
  [{ lat: 20.68303868723637,   lng: -88.57213387301465},  {location: 'Chichen Itza'}]
]

let currentPlace = places[Math.floor(Math.random() * places.length)];
let coordinates = currentPlace[0]
let place = currentPlace[1].location

let oldDifDist = 1

export default function initialize() {
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
        
        panorama.addListener("position_changed", () => {
          TestLocation(panorama.getPosition().lat(), panorama.getPosition().lng());
        })

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

                <h3 id="hot-or-cold" className="pt-30 flex justify-center text-xl font-bold">Hot or Cold</h3>

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

                        <button
                            className="px-3 py-2 border rounded bg-white"
                            onClick={pickRandom}
                        >
                            Random
                        </button>
                    </div>

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

function TestLocation(lat, lng) {
  // get the difference in latitude
  let latDist = Math.abs(destination[places.indexOf(currentPlace)][0].lat - lat)
  // get the difference in longitude
  let lngDist = Math.abs(destination[places.indexOf(currentPlace)][0].lng - lng)
  let difDist = latDist + lngDist
  
  /*
  console.log(
    "\nlat distance: " + latDist + 
    "\nlng distance: " + lngDist + 
    "\ndifference: " + difDist
  )
  */

  if ( difDist < 0.001 ) {
    // needs replaced with Jenna's modal
    // also end game timer
    alert("You won!!!")
  } 

  HotOrCold(difDist);

  oldDifDist = difDist
}

// display
function HotOrCold(newer) {
  // change a header tag to "hotter" or "colder" as the player moves
  const hintBox = document.getElementById("hot-or-cold")
  if (newer > oldDifDist) {
    hintBox.innerText = "Colder..."
    hintBox.className = "pt-30 flex justify-center text-xl font-bold text-blue-500"
  } else if (oldDifDist > newer) {
    hintBox.innerText = "Warmer..."
    hintBox.className = "pt-30 flex justify-center text-xl font-bold text-red-500"
  }
}
