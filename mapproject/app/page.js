"use client";
import { useEffect } from "react";

import NavBar from "./components/NavBar"

import './globals.css'


var places = [
  [{ lat: 48.85175190901051,  lng: 2.2897615145195256 },  {location: 'Eiffel Tower Hotel'}],
  [{ lat: 41.88916503732436,   lng: 12.495807327200632 }, {location: 'The Colosseum Hotel'}],
  [{ lat: -33.86332015348142, lng: 151.21184432020186 }, {location: 'Sydney Opera House Hotel'}],
  [{ lat: 43.72241521483225,   lng: 10.392064933294535 }, {location: 'Leaning Tower of pisa Hotel'}],
  [{ lat: 51.499478209752645,  lng: -0.13307989206634516 },  {location: 'Big Ben Hotel'}],
  [{ lat: 37.83746295614792,   lng: -122.47941782521923 }, {location: 'Golden Gate Bridge Hotel'}],
  [{ lat: 48.806942340957846,  lng: 2.133223974191376 }, {location: 'Palace of Versailles Hotel'}],
  [{ lat: 20.694297159826963,  lng: -88.58618645865695 }, {location: 'Chichen Itza Hotel'}]
 
]

var destination = [
  [{ lat: 48.857597232823224,  lng: 2.294088407744251 },  {location: 'Eiffel Tower'}],
  [{ lat: 41.89032514126806,   lng: 12.491846048954196 }, {location: 'The Colosseum'}],
  [{ lat: -33.856162361001275, lng: 151.21555560657174 }, {location: 'Sydney Opera House'}],
  [{ lat: 43.722962919466866,  lng: 10.396104195604407 }, {location: 'Leaning Tower of pisa'}],
  [{ lat: 51.50096740041798,   lng: -0.1241623357433608 },  {location: 'Big Ben'}],
  [{ lat: 37.83233390159084,    lng: -122.47332804550392 }, {location: 'Golden Gate Bridge'}],
  [{ lat: 48.80368473709394,   lng: 2.124536265468451 }, {location: 'Palace of Versailles'}],
  [{ lat: 20.68303868723637,   lng: -88.57213387301465 }, {location: 'Chichen Itza'}]
]
let currentPlace = places[Math.floor(Math.random() * places.length)]; 
let coordinates = currentPlace[0]
let place = currentPlace[1].location

export default function initialize() {
  useEffect(() => {
    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById("street-view"),
      {
        position: coordinates,
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
      },
    )
    console.log(coordinates)
  });

  let reconfigure = () => {
        let currentPlace = places[Math.floor(Math.random() * places.length)];
        coordinates = currentPlace[0]
        country = currentPlace[1].country

        initialize()
      }

  function TrackingPlayer() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(pos => {
      let player = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      let target = currentPlace.coords;

      let distance = getDistanceInMeters(player, target);

      document.getElementById("distance-display").innerText =
        `Distance to target: ${distance.toFixed(1)} meters`;

      if (distance < 50) { 
        alert(`You found the final location: ${currentPlace.name}!`);
      }
    });
  }
}

  


  return (
    <div>
      <div className="bg-gray-100 text-gray-900 front-sans">
        
        <NavBar />

        <main className="pt-20 flex justify-center items-center min-h-screen">
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
