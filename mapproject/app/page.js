"use client";
import { useEffect } from "react";

var places = [
  [{ lat: 48.857597232823224,  lng: 2.294088407744251 },  {location: 'Eiffel Tower'}],
  [{ lat: 27.17849238917848,   lng: 78.04216550072019 },  {location: 'Taj Mahal'}],
  [{ lat: 41.89032514126806,   lng: 12.491846048954196 }, {location: 'The Colosseum'}],
  [{ lat: 40.68961188209687,   lng: -74.03961590742139 }, {location: 'Statue of Liberty'}],
  [{ lat: -33.856162361001275, lng: 151.21555560657174 }, {location: 'Sydney Opera House'}],
  [{ lat: -22.951914723334223, lng: -43.210407416928525 }, {location: 'Christ the Redeemer'}],
  [{ lat: 43.722962919466866,  lng: 10.396104195604407}, {location: 'Leaning Tower of pisa'}],
  [{ lat: 51.50096740041798,   lng: -0.1241623357433608}, {location: 'Big Ben'}],
  [{ lat: 37.8276502293566,    lng: -122.48178307959817}, {location: 'Golden Gate Bridge'}],
  [{ lat: 30.337785999216255,  lng: 35.430390469199544},  {location: 'Petra'}],
  [{ lat: 51.17917496531204,   lng: -1.8264100670974994}, {location: 'Stonehenge'}],
  [{ lat: 48.80368473709394,   lng: 2.124536265468451}, {location: 'Palace of Versailles'}],
  [{ lat: 35.36454630360458,   lng: 138.73307837316136}, {location: 'Mount Fuj'}],
  [{ lat: 20.68303868723637,   lng: -88.57213387301465}, {location: 'Chichen Itza'}]
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