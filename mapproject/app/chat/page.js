"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";

export default function ChatPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Check login status
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (!savedUser) {
            router.push("/login"); // redirect if not logged in
        } else {
            setUser(savedUser);
        }
    }, [router]);

    // 🚀 Send message to AI
    async function sendMessage(e) {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = { role: "user", content: input };
        setMessages([...messages, newMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ location: input }), // using same route as before
            });

            const data = await res.json();

            const botMessage = { role: "assistant", content: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error("Chat failed:", err);
        } finally {
            setLoading(false);
        }
    }

    if (!user) return null; // wait until we know login state

    return (
        <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
            <NavBar />
            <main className="flex flex-col items-center pt-24 flex-1 w-full">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 flex flex-col h-[70vh]">
                    <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
                        GeoGuessr Hint Chat 💬
                    </h1>

                    <div className="flex-1 overflow-y-auto border rounded-lg p-3 mb-3 bg-gray-50">
                        {messages.length === 0 && (
                            <p className="text-gray-500 italic text-center mt-4">
                                Ask me for a hint about any place!
                            </p>
                        )}
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`my-2 p-2 rounded-lg ${
                                    m.role === "user"
                                        ? "bg-blue-100 self-end text-right"
                                        : "bg-gray-200 self-start"
                                }`}
                            >
                                <p className="text-sm">{m.content}</p>
                            </div>
                        ))}
                        {loading && (
                            <p className="text-gray-400 italic text-center">Thinking...</p>
                        )}
                    </div>

                    <form onSubmit={sendMessage} className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ask for a geography hint..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
