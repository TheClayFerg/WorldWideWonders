"use client";
import { useEffect } from "react";

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
      <div id="street-view" style={{ height: "400px"}} />
      <div id="distance-display"></div>
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXu9uxRvpLthoY9qxONXv9_yXDoB9cklU&callback=initialize&v=weekly"
        defer
      ></script>
    </div>
  )
}