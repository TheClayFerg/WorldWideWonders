import NavBar from "../components/NavBar"

export default function Login() {
  return (
    <div class="bg-gray-100 text-gray-900 font-sans
                bg-[url('../public/image/background.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
        
        <NavBar />

        <main class="pt-24 flex justify-center items-center min-h-screen">
            <div class="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8">
                <h1 class="text-2xl font-bold text-center text-blue-700 mb-6">Scores</h1>
                <div class="overflow-x-auto">
                    <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead class="bg-blue-600 text-white">
                            <tr>
                                <th class="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold">Date</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold">Score</th>
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-6 py-3">@</td>
                                <td class="px-6 py-3">!</td>
                                <td class="px-6 py-3">#</td>
                            </tr>
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-6 py-3">@2</td>
                                <td class="px-6 py-3">!2</td>
                                <td class="px-6 py-3">#2</td>
                            </tr>
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-6 py-3">@3</td>
                                <td class="px-6 py-3">!3</td>
                                <td class="px-6 py-3">#3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
  );
}
