"use client";
import { useState } from "react";
import Link from 'next/link';

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-gray-800">
            <div className="container mx-auto">
        <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-800 text-white">
            <div className="flex items-center justify-between w-full md:w-auto md:mb-0">
                <div className="text-lg font-bold flex-shrink-0 cursor-pointer">
                    <span className="group relative">
                        <span className="transition-transform duration-300 group-hover:text-blue-100 ">AL</span>
                        <span 
                            className="ml-1 text-pink-500 transition-colors duration-500 group-hover:text-blue-400"
                        >
                            .
                        </span>
                    </span>
                </div>
                <button 
                    className="md:hidden text-white focus:outline-none text-xl" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>
            </div>
            <ul className={`flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 md:flex transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen h-screen opacity-100 mt-4" : "max-h-0 opacity-0 md:opacity-100"}`}>
                <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
                <li><a href="#about" className="hover:text-gray-400">Experience</a></li>
                <li><a href="#services" className="hover:text-gray-400">ME</a></li>
                <li><a href="#services" className="hover:text-gray-400">Projects</a></li>
                <li><a href="#services" className="hover:text-gray-400">Vibe coding</a></li>
                <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
            </ul>
        </nav>
        </div>
        </div>
    );
}