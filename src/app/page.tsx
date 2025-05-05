"use client";
import './globals.css';
import Hero from './components/Hero';
import ChatAI from './components/ChatAI';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

export default function Home() {
  return (
    <div>
    <div className="lg:container mx-auto md:px-4 lg:px-10 h-full lg:h-auto animated-background ">
      <div className="wrapper">
       <Hero/> 
       <div className='flex justify-evenly flex-col md:flex-row relative z-20 px-4.5 md:pt-4'>
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 group lg:min-w-2/3 md:pr-2.5">
          <span className="inline-block transition-all duration-300 group-hover:scale-105 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-pink-500">
            Get to know Me better with my custom AI chatbot. or go to{' '}
            <Link 
              href='/about' 
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 border-b border-blue-400 hover:border-blue-500"
            >
              about
              <HiArrowRight className="inline-block w-4 h-4" />
            </Link>{' '}
            me
          </span>
        </h1>
        <ChatAI/>
      </div>
      </div>
    </div>
  </div>
  );
}