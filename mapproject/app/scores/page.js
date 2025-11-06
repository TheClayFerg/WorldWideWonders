import NavBar from "../components/NavBar"

export default function Scores() {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans
                bg-cover bg-center bg-no-repeat bg-fixed
                bg-[url('../public/image/mapdesk.jpg')]">
        
        <NavBar />

        <main className="pt-24 flex justify-center items-center min-h-screen">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Scores</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Score</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-3">@</td>
                                <td className="px-6 py-3">!</td>
                                <td className="px-6 py-3">#</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-3">@2</td>
                                <td className="px-6 py-3">!2</td>
                                <td className="px-6 py-3">#2</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-3">@3</td>
                                <td className="px-6 py-3">!3</td>
                                <td className="px-6 py-3">#3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
  );
}
    