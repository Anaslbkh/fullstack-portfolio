"use client";
import './globals.css';
import HeroAnimation from '../../components/TextAnimation';
import Nav from '../../components/Nav';
import ChatAI from '../../components/ChatAI';
import AboutMe from '../../components/AboutMe';
import ExperienceProjects from '../../components/ExperienceProjects';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Frontend Developer", "Problem Solver", "Creative Thinker","Vibe coder", "Lifelong Learner", "Pixel Perfectionist"];
  const phrases = [
    'Hi,',
    "I'm Anass",
    'Front-end developer',
    'Vue.js - React.js',
    'Worked on great things',
    'and Working on cooler things',
    'Make code great again'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="wrapper">
        <Nav />
        <section className="hero w-full">
          <div className="text-center max-w-full flex justify-between">
            <div
              className="text-content w-4/5 relative"
              style={{
                backgroundImage: "url('/react-vue-background.png')", // Single background image
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <h1 data-text="Hi, I'm Anass">Hi, I'm Anass</h1>
              <h2 className="flex justify-center align-baseline">
                I'm a{" "}
                <span className="dynamic-text pl-2.5">
                  <span
                    className="text-wrapper transition-all duration-1000 ease-in-out"
                  >
                    {texts[currentTextIndex]}
                  </span>
                </span>
              </h2>
              <p>Crafting clean, responsive, and performant web applications.</p>
              <a href="#contact" className="cta-button">
                Get in Touch
              </a>
            </div>
            <div className="image-content w-1/5 relative">
              <div className="image-wrapper custom-shape rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
                <img
                  src="/IMG_2060_1_-removebg-preview.png"
                  alt="Anass"
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
        <div className="hero-animation">
          <HeroAnimation phrases={phrases} />
        </div>
        <div>
          <AboutMe />
          <ExperienceProjects />
          <div className="chat-ai-section mt-8">
            <ChatAI />  
          </div>
        </div>
      </div>
    </div>
  );
}