"use client"
import { useState } from "react";
import { useRouter } from "next/navigation"
import NavBar from "../components/NavBar"

export default function Login() {

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
        });
        const data = await response.json();

        if (response.ok) {
            setMessage("yes" + data.message);
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/"); // go to map page after login
        } else {
            setMessage("no" + data.message);
        }
        } catch (error) {
            console.error("Login failed:", error);
            setMessage("Error connecting to server");
        }
    };
    const handleGuest = () => {
        const guestUser = { username: "Guest", score: 0 };
        localStorage.setItem("user", JSON.stringify(guestUser));
        router.push("/");
    };

    return (
        <div className="bg-gray-100 text-gray-900 font-sans
                    bg-cover bg-center bg-no-repeat bg-fixed">
            
            <NavBar />

            <main className="flex justify-center items-center min-h-screen pt-20">
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Login</h1>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label for="name" className="block text-gray-700 font-medium mb-2">Name:</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="Enter your name" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-3">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl shadow hover:bg-blue-700 transition"
                            >Login</button>
                            <button 
                                type="button"
                                onClick={handleGuest}
                                className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-xl hover:bg-gray-300 transition"
                            >Continue as Guest</button>
                        </div>
                        {message && (
                            <p className="text-center mt-4 text-gray-700 font-medium">
                            {message}
                            </p>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
}
