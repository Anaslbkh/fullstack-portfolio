// components/ExperienceProjects.jsx
export default function ExperienceProjects() {
    return (
      <section className="max-w-5xl mx-auto px-4 py-16 text-gray-900">
        <h2 className="text-4xl font-bold mb-10 text-center">🚀 My Journey So Far</h2>
  
        <div className="space-y-12">
  
          {/* Experience: Parkos */}
          <div>
            <h3 className="text-2xl font-semibold">🧑‍💻 Front-End Developer – Parkos B.V. (Remote)</h3>
            <p className="text-gray-600 text-sm">Sep 2021 – Nov 2024</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-lg">
              <li>Built and maintained dynamic, user-focused web apps using <strong>Vue.js</strong>, <strong>Nuxt.js</strong>, and later <strong>React.js</strong> and <strong>Next.js</strong>.</li>
              <li>Specialized in <strong>A/B testing</strong>, rapid frontend iteration, and performance optimization.</li>
              <li>Worked on SEO, SSR, and scalable architecture using <strong>Next.js App Router</strong>.</li>
              <li>Integrated APIs with <strong>Node.js</strong>, <strong>Express</strong>, <strong>Firebase</strong>, and <strong>Supabase</strong>.</li>
              <li>Collaborated with product, design, and backend teams in Agile sprints using GitLab and GitHub.</li>
            </ul>
          </div>
  
          {/* Internship */}
          <div>
            <h3 className="text-2xl font-semibold">🎓 Web Development Intern – OCP S.A.</h3>
            <p className="text-gray-600 text-sm">2020</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-lg">
              <li>Supported in development and refactoring of internal tools and systems.</li>
              <li>Learned real-world software development practices with Git, HTML/CSS, JavaScript.</li>
            </ul>
          </div>
  
          {/* Projects (In Development) */}
          <div>
            <h3 className="text-2xl font-semibold">🛠️ Current Projects</h3>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-lg">
              <li>
                <strong>Project Alpha</strong> – Built with <strong>Next.js</strong>, <strong>TypeScript</strong>, <strong>Supabase</strong>. A social-style feed app with auth and real-time updates.
              </li>
              <li>
                <strong>Project Beta</strong> – Using <strong>Nuxt 3</strong> + <strong>Firebase</strong> to build a modern PWA for event booking with offline-first features.
              </li>
              <li>
                <strong>Project Gamma</strong> – A customizable analytics dashboard powered by <strong>React</strong>, <strong>Next.js</strong>, and <strong>Zustand</strong>.
              </li>
            </ul>
            <p className="mt-4 text-base text-gray-700">
              These apps are focused on learning by doing — exploring performance, UX, API design, and building reusable components across modern stacks.
            </p>
          </div>
        </div>
      </section>
    );
  }
  