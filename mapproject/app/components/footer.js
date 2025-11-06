import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} World Explorer. All rights reserved.</p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <Link href="/about" className="hover:text-gray-400">About</Link>
                    <Link href="/" className="hover:text-gray-400">Nothing</Link>
                    <Link href="/" className="hover:text-gray-400">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}
