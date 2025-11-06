"use client";
import { useEffect } from "react";

import NavBar from "./components/NavBar"

import './globals.css'


var places = [
  // starting locations
  [{ lat: 48.85175190901051,  lng: 2.2897615145195256 },  {location: 'Eiffel Tower Hotel'}],
  [{ lat: 41.88916503732436,   lng: 12.495807327200632}, {location: 'The Colosseum Hotel'}],
  [{ lat: -33.86332015348142, lng: 151.21184432020186 }, {location: 'Sydney Opera House Hotel'}],
  [{ lat: 43.72241521483225,   lng: 10.392064933294535}, {location: 'Leaning Tower of pisa Hotel'}],
  [{ lat: 51.499478209752645,  lng: -0.13307989206634516},  {location: 'Big Ben Hotel'}],
  [{ lat: 37.83746295614792,   lng: -122.47941782521923}, {location: 'Golden Gate Bridge Hotel'}],
  [{ lat: 48.806942340957846,  lng: 2.133223974191376}, {location: 'Palace of Versailles Hotel'}],
  [{ lat: 35.36787231223111,   lng: 138.8610499351484}, {location: 'Mount Fuj Hotel'}],
  [{ lat: 20.694297159826963,  lng: -88.58618645865695}, {location: 'Chichen Itza Hotel'}]
 
]

var destination = [
  // ending locations
  [{ lat: 48.857597232823224,  lng: 2.294088407744251 },  {location: 'Eiffel Tower'}],
  [{ lat: 41.89032514126806,   lng: 12.491846048954196 }, {location: 'The Colosseum'}],
  [{ lat: -33.856162361001275, lng: 151.21555560657174 }, {location: 'Sydney Opera House'}],
  [{ lat: 43.722962919466866,  lng: 10.396104195604407}, {location: 'Leaning Tower of pisa'}],
  [{ lat: 51.50096740041798,   lng: -0.1241623357433608},  {location: 'Big Ben'}],
  [{ lat: 37.8276502293566,    lng: -122.48178307959817}, {location: 'Golden Gate Bridge'}],
  [{ lat: 48.80368473709394,   lng: 2.124536265468451}, {location: 'Palace of Versailles'}],
  [{ lat: 35.36454630360458,   lng: 138.73307837316136}, {location: 'Mount Fuj'}],
  [{ lat: 20.68303868723637,   lng: -88.57213387301465}, {location: 'Chichen Itza'}]
]

let round = Math.floor(Math.random() * places.length)
let currentPlace = places[0]; // get a random starting location
let coordinates = currentPlace[0] // get the coordinates for that place
let place = currentPlace[1].location // get the name for that place

export default function initialize() {
  // google API imported code:
  useEffect(() => {
    // place the user
    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById("street-view"),
      {
        position: coordinates,
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
      },
    )

    panorama.addListener("position_changed", () => {
      TestLocation(panorama.getPosition().lat(), panorama.getPosition().lng());
    })
    
    console.log("coordinates: " + coordinates.lat + ", " + coordinates.lng)
  });

  // reset the game with new data???????????????????????????
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

function TestLocation(lat, lng) {
  // compare current coord with final and return 
  //    if user hot or cold?
  //    current distance from end?
  //    if user is done
  let latDist = Math.abs(destination[0][0].lat - lat)
  let lngDist = Math.abs(destination[0][0].lng - lng)
  let difDist = latDist + lngDist
  
  console.log(
    "\nlat distance: " + latDist + 
    "\nlng distance: " + lngDist + 
    "\ndifference: " + difDist
  )

  if ( difDist < 0.001 ) {
    console.log("You won!!!")
  } else {
    console.log("keep going...")
  }

  HotOrCold(difDist)

  let oldDifDist = difDist
}

function HotOrCold() {
  
}