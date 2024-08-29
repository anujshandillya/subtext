import Link from "next/link";
import * as React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand */}
          <div className="text-2xl font-bold">SubText</div>

          {/* Navigation Links */}
          <ul className="">
            <li>
              <Link href="/" className="hover:text-green-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-green-300">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-300">
                Contact
              </Link>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="">
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-6 text-gray-500">
          &copy; 2024 SubText. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
