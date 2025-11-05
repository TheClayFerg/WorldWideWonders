export default function About() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">Welcome to World Explorer 🌍</h1>
      <p className="text-lg">
        Think you know the world? **GoGuesser** drops you into a random location 
        on the planet using **Google Street View**. 
      </p>
      <p className="mt-2 text-lg">
        Explore your surroundings, look for clues, and when you're ready, 
        **pin your guess** on the map! 
      </p>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">How to Play:</h2>
        <ul className="list-disc list-inside mt-2 mx-auto max-w-sm text-left">
          <li>You start at a **random, unknown location** in the world.</li>
          <li>**Look around** for signs, architecture, language, or terrain.</li>
          <li>When you feel confident, click the **'Guess' button** and place a marker on the map.</li>
          <li>The **closer** your guess is, the **higher your score!**</li>
        </ul>
      </div>
      <p className="mt-6 text-md italic">
        Ready to test your geography skills? Let the journey begin!
      </p>
    </div>
  );
}