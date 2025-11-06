import NavBar from "../components/NavBar"

export default function Login() {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans
                 bg-cover bg-center bg-no-repeat bg-fixed
                 bg-[url('../public/image/mapcar.jpg')]">
        
        <NavBar />

        <main className="flex justify-center items-center min-h-screen pt-20">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Login</h1>
                <form className="space-y-5">
                    <div>
                        <label for="name" className="block text-gray-700 font-medium mb-2">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Enter your name" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex flex-col space-y-3">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl shadow hover:bg-blue-700 transition"
                        >Login</button>
                        <button 
                            type="button"
                            className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-xl hover:bg-gray-300 transition"
                        >Continue as Guest</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
  );
}
