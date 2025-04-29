"use client";
import './globals.css';
import HeroAnimation from '../../components/TextAnimation';
import ChatAI from '../../components/ChatAI';
import AboutMe from '../../components/AboutMe';
import ExperienceProjects from '../../components/ExperienceProjects';
import Projects from '../../components/Projects';
import ContactForm from '../../components/ContactForm';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SiVuedotjs, SiReact, SiJavascript } from 'react-icons/si';

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
    <div>
    <div className="container mx-auto md:px-10 animated-background">
      <div className="wrapper ">
        <section className="hero w-full h-[560px] relative flex justify-center items-start md:items-center pt-11 md:pt-0 overflow-hidden">
          <div className="text-center max-w-full flex md:flex-row flex-col justify-between">
            <div className="framework-icons pb-2.5 w-10/12 md:w-1/2">
              <SiVuedotjs className="vue-icon" />
              <SiReact className="react-icon" />
              <SiJavascript className="js-icon" />
            </div>
            <div
              className="text-content w-screen md:w-4/5 relative"
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
            >
             
              <h1 data-text="Hi, I&apos;m Anass">Hi, I&apos;m Anass</h1>
              <h2 className="flex justify-center align-baseline flex-wrap text-2xl md:text-3xl">
                I&apos;m a{" "}
                <span className="dynamic-text pl-2.5">
                  <span
                    className="text-wrapper transition-all duration-1000 ease-in-out"
                  >
                    {texts[currentTextIndex]}
                  </span>
                </span>
              </h2>
              <p className='mb-6'>Crafting clean, responsive, and performant web applications.</p>
              <a href="#contact" className="cta-button">
                Get in Touch
              </a>
            </div>
            <div className="image-content w-screen md:w-1/5 relative order-first md:order-last">
              <div className="image-wrapper custom-shape rounded-full overflow-hidden border-4 border-gray-300 shadow-lg mx-auto">
                <Image
                  src="/IMG_2060_1_-removebg-preview.png"
                  alt="Anass"
                  className="object-cover object-center w-full h-full"
                  width={500}
                  height={500}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <div className="hero-animation hidden">
          <HeroAnimation phrases={phrases} />
        </div>
        <div className="about_me_section flex flex-col md:flex-row">
          <div className="w-full md:w-8/12 pr-4">
            <AboutMe />
            <ExperienceProjects />
          </div>
          <div className="chat-ai-section w-full md:w-4/12 mt-8">
            <ChatAI />
          </div>
        </div>
        <Projects />
      </div>
      
    </div>
  <div>
    <ContactForm />
  </div>
  </div>
  );
}