import Link from "next/link";
import * as React from "react";
import { ArrowBigDown, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand */}
          <div className="text-3xl font-bold">SubText</div>

          {/* Navigation Links */}
          <ul className="flex gap-10">
            <li>
              <Link href="/" className="hover:text-[#b169ff]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-[#b169ff] hover:cursor-pointer">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#b169ff]">
                Contact
              </Link>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className=" flex gap-4">
            <Link href="#" className="hover:text-gray-400 hover:cursor-pointer">
              <FacebookIcon />
            </Link>
            <Link href="#" className="hover:text-gray-400 hover:cursor-pointer">
              <TwitterIcon />
            </Link>
            <Link href="#" className="hover:text-gray-400 hover:cursor-pointer">
              <InstagramIcon />
            </Link>
            <Link href="#" className="hover:text-gray-400 hover:cursor-pointer">
              <LinkedinIcon />
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
