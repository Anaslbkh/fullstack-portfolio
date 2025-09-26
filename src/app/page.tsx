"use client";
import './globals.css';
import Hero from './components/Hero';
import ChatAI from './components/ChatAI';

export default function Home() {
  return (
    <div>
    <div className="lg:container mx-auto md:px-4 lg:px-10 h-full lg:h-auto animated-background ">
      <div className="wrapper">
       <Hero/> 
       <div className='flex justify-evenly flex-col md:flex-row relative z-20 px-4.5 md:pt-4'>
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 group lg:min-w-2/3 md:pr-2.5">
          <span className="inline-block transition-all duration-300 group-hover:scale-105 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-pink-500">
            Want to know me better? Chat with my AI assistant — your interactive guide to my skills, projects, and experience.
          </span>
        </h1>
        <ChatAI/>
      </div>
      </div>
    </div>
  </div>
  );
}