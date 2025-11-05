import NavBar from "../components/NavBar"

export default function About() {
  return (
    <div className="p-8 text-center">

      <NavBar />

      <h1 className="text-3xl font-bold">Welcome to World Explorer 🌍</h1>
      <p className="mt-4">Choose a destination to explore in Street View.</p>
    </div>
  );
}