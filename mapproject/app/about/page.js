import NavBar from "../components/NavBar"

export default function About() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed bg-[url('../public/image/mapdesk.jpg')] flex flex-col items-center">

      <NavBar />

      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl mt-60 p-8 max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold mt-10">Welcome to World Explorer 🌍</h1>
        <p className="text-lg">
          Think you know the world? World Explorer drops you into a random location on the planet using Google Maps. 
        </p>
        <p className="mt-2 text-lg">Explore your surroundings, look for clues, and find the historical landmark you are near!</p>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">How to Play:</h2>
          <ul className="list-disc list-inside mt-2 mx-auto max-w-sm text-left">
            <li>You start at a random location in the world.</li>
            <li>Look around for signs, architecture, language, or terrain.</li>
            <li>Click the arrows or places on the screen to 'walk around'</li>
            <li>Get to the final destination, and you're done!</li>
          </ul>
        </div>
        <p className="mt-6 text-md italic">Ready to test your geography skills? Let the journey begin!</p>
      </div>
    </div>
  );
}