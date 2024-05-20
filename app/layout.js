import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My Blog",
  description: "A simple blog built with Next.js 14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="bg-blue-500 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link href="/">My Blog</Link>
            </h1>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/posts/new">Create Post</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto flex-grow p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto text-center">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
