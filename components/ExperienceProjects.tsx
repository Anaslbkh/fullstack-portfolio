// components/ExperienceProjects.jsx
'use client';

import experienceData from '../data/experience.json';

interface Project {
  name: string;
  description: string;
  technologies: string[];
}

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  icon: string;
  iconBgColor: string;
  responsibilities: string[];
  technologies: string[];
}

interface CurrentProjects {
  id: string;
  title: string;
  period: string;
  icon: string;
  iconBgColor: string;
  projects: Project[];
  summary: string;
}

interface ExperienceData {
  experiences: Experience[];
  currentProjects: CurrentProjects;
}

export default function ExperienceProjects() {
  const { experiences, currentProjects } = experienceData as ExperienceData;

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-10 text-center">🚀 My Journey So Far</h2>

      <div className="relative border-l border-gray-300">
        {/* Experiences */}
        {experiences.map((experience) => (
          <div key={experience.id} className="mb-10 ml-6">
            <span className={`absolute -left-3 flex items-center justify-center w-6 h-6 ${experience.iconBgColor} rounded-full ring-8 ring-gray-100`}>
              {experience.icon}
            </span>
            <h3 className="text-2xl font-semibold">
              {experience.role} – {experience.company} 
              {experience.location && <span> ({experience.location})</span>}
            </h3>
            <p className="text-gray-600 text-sm">{experience.period}</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-lg text-white">
              {experience.responsibilities.map((responsibility, index) => (
                <li key={index} className="text-white">
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Current Projects */}
        <div className="mb-10 ml-6">
          <span className={`absolute -left-3 flex items-center justify-center w-6 h-6 ${currentProjects.iconBgColor} rounded-full ring-8 ring-gray-100`}>
            {currentProjects.icon}
          </span>
          <h3 className="text-2xl font-semibold">{currentProjects.title}</h3>
          <p className="text-gray-600 text-sm">{currentProjects.period}</p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-lg text-white">
            {currentProjects.projects.map((project, index) => (
              <li key={index}>
                <strong>{project.name}</strong> – Built with{' '}
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex}>
                    <strong>{tech}</strong>
                    {techIndex < project.technologies.length - 1 ? ', ' : '. '}
                  </span>
                ))}
                {project.description}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base text-gray-300">
            {currentProjects.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
