"use client";
import { useState } from "react";
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-gray-800">
            <div className="container mx-auto">
        <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-800 text-white">
            <div className="flex items-center justify-between w-full md:w-auto md:mb-0">
                <div className="text-lg font-bold flex-shrink-0 cursor-pointer">
                    <Link href="/" className="group relative">
                        <span className="transition-transform duration-300 group-hover:text-blue-100">AL</span>
                        <span className="ml-1 text-pink-500 transition-colors duration-500 group-hover:text-blue-400">.</span>
                    </Link>
                </div>
                <button 
                    className="md:hidden text-white focus:outline-none text-xl transition-transform duration-300 hover:scale-110" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? (
                        <HiX className="w-6 h-6" />
                    ) : (
                        <HiMenu className="w-6 h-6" />
                    )}
                </button>
            </div>
            <ul className={`flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 md:flex transition-all duration-300 ease-in-out lg:min-w-1/2 lg:justify-center ${isMenuOpen ? "max-h-screen h-screen opacity-100 mt-4" : "max-h-0 opacity-0 md:opacity-100"}`}>
                                <li className="text-2xl py-2.5 lg:text-xl">
                                    <Link 
                                        href="/about" 
                                        className="hover:text-gray-400"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        About
                                    </Link>
                                </li>
                                <li className="text-2xl py-2.5 lg:text-xl">
                                    <Link 
                                        href="/contact" 
                                        className="hover:text-gray-400"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Contact
                                    </Link>
                                </li>
            </ul>
        </nav>
        </div>
        </div>
    );
}