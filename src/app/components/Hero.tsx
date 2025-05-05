"use client";
import '@/app/globals.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SiVuedotjs, SiReact, SiJavascript } from 'react-icons/si';
import Link from 'next/link';

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Frontend Developer", "Problem Solver", "Creative Thinker","Vibe coder", "Lifelong Learner", "Pixel Perfectionist"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [texts.length]);

    return(
        <section className="hero w-full h-full lg:h-[450px] relative flex justify-center items-start md:items-center pt-11 md:pt-12 pb-12 md:pb-0 overflow-hidden">
          <div className="text-center max-w-full h-full flex md:flex-row flex-col justify-start lg:justify-between">
            <div className="framework-icons pb-2.5 w-11/12 md:w-1/2">
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
              <Link href="/contact" className="cta-button relative z-50 cursor-pointer">
                Get in Touch
              </Link>
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
    )
}