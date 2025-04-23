// components/AboutMe.jsx
export default function AboutMe() {
    return (
      <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
        <h2 className="text-4xl font-bold mb-6 text-center">👋 About Me</h2>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Hey, I’m <strong>Anass Lebkhaiti</strong> — a frontend developer based in{' '}
            <strong>El Jadida, Morocco</strong>, crafting sleek, scalable web experiences
            with <strong>Next.js</strong>, <strong>Nuxt.js</strong>, and <strong>React</strong>.
          </p>
  
          <p>
            I’m not just someone who builds UI. I <strong>ship something every single day</strong> —
            from experiments and prototypes to real features in real projects. It’s my way of staying
            sharp, learning fast, and delivering value with every line of code.
          </p>
  
          <p>
            Over the past few years, I’ve worked remotely for international teams (like{' '}
            <strong>Parkos B.V.</strong>), building production-grade apps using{' '}
            <strong>Vue.js</strong>, <strong>Nuxt 3</strong>, and increasingly,{' '}
            <strong>Next.js</strong> — where I now focus deeply.
          </p>
  
          <ul className="list-disc pl-6 space-y-1">
            <li>⚡️ Fast, SEO-friendly pages with <strong>Next.js App Router</strong></li>
            <li>🔁 State management using <strong>Context API</strong>, <strong>Zustand</strong>, and hooks</li>
            <li>🧩 Modular, reusable components with <strong>TypeScript</strong> and <strong>Tailwind CSS</strong></li>
            <li>🚀 Optimized performance via dynamic imports, image optimization, and SSR</li>
            <li>🧪 A/B testing, measuring, and iterating</li>
          </ul>
  
          <p>
            Right now, I’m working on <strong>three new web apps</strong> you’ll hear about soon — each
            built with a different stack (Next.js, Nuxt 3, and React) to push boundaries and learn by doing.
          </p>
  
          <p>
            If you’re into clean code, fast shipping, and good vibes, we’ll probably get along. 😉
          </p>
        </div>
      </section>
    );
  }
  