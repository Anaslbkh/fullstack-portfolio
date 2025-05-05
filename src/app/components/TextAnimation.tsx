'use client';

import { useEffect, useRef } from 'react';
import styles from './TextAnimation.module.css';

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

export default function TextScramble({ phrases }: { phrases: string[] }) {
  const textRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<{
    setText: (newText: string) => Promise<void>;
    frameRequest?: number;
  } | null>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    if (!textRef.current) return;

    class TextScramble {
      el: HTMLElement;
      chars: string;
      queue: QueueItem[];
      frame: number;
      resolve?: () => void;
      frameRequest?: number;

      constructor(el: HTMLElement) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.queue = [];
        this.frame = 0;
        this.update = this.update.bind(this);
      }

      setText(newText: string): Promise<void> {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise<void>((resolve) => (this.resolve = resolve));
        
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || '';
          const to = newText[i] || '';
          const start = Math.floor(Math.random() * 60);
          const end = start + Math.floor(Math.random() * 60);
          this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest!);
        this.frame = 0;
        this.update();
        return promise;
      }

      update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.50) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            output += `<span class="${styles.dud}">${char}</span>`;
          } else {
            output += from;
          }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
          this.resolve?.();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }

      randomChar(): string {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }

    fxRef.current = new TextScramble(textRef.current);

    const next = () => {
      fxRef.current?.setText(phrases[counterRef.current]).then(() => {
        setTimeout(next, 1000);
      });
      counterRef.current = (counterRef.current + 1) % phrases.length;
    };

    next();

    return () => {
      if (fxRef.current?.frameRequest) {
        cancelAnimationFrame(fxRef.current.frameRequest);
      }
    };
  }, [phrases]);

  return (
    <div className={styles.container}>
      <div ref={textRef} className={styles.text}></div>
    </div>
  );
}