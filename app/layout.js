import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My Blog",
  description: "A simple blog built with Next.js 14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white shadow-md">
          <nav className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-3xl font-bold">
              <Link href="/" passHref>
                <span className="hover:text-blue-200 transition-colors duration-200 cursor-pointer">
                  My Blog
                </span>
              </Link>
            </h1>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/posts/new"
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  Create Post
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto flex-grow p-6 bg-white shadow-lg rounded-md mt-6">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-4 mt-6">
          <div className="container mx-auto text-center">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
