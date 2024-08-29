import Link from "next/link";

export default function NavBar() {
  return (
    <>
    <div className="w-full bg-gray-800 text-white mx-auto h-16 px-8 flex justify-between items-center">
        <Link className="text-2xl font-bold" href="/">SubText</Link>
        <nav className="flex gap-6">
            <Link className="hover:text-green-300" href="/">Home</Link>
            <Link className="hover:text-green-300" href="/pricing">Pricing</Link>
            <Link className="hover:text-green-300" href="/contact">Contact</Link>
        </nav>
    </div>
    </>
  )
}
