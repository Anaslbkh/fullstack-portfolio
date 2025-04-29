'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import styles from './Projects.module.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubLink: string;
  liveLink: string;
  features: string[];
}

const projects: Project[] = [
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with Next.js and TypeScript",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      githubLink: "https://github.com/yourusername/portfolio",
      liveLink: "https://yourportfolio.com",
      features: [
        "Responsive design",
        "Dark/Light mode",
        "Smooth animations",
        "Interactive UI elements"
      ]
    },
    {
      title: "Task Manager App",
      description: "A task management tool for organizing to-do lists and tracking progress.",
      technologies: ["React", "TypeScript", "Redux", "Material UI"],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1350&q=80",
      githubLink: "https://github.com/yourusername/task-manager",
      liveLink: "https://tasky-app-demo.netlify.app",
      features: [
        "Drag-and-drop task cards",
        "Due date reminders",
        "Dark mode",
        "Search and filter tasks"
      ]
    },
    {
      title: "E-commerce Dashboard",
      description: "A data-rich admin dashboard for managing e-commerce analytics and inventory.",
      technologies: ["Vue.js", "TypeScript", "Chart.js", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      githubLink: "https://github.com/yourusername/ecommerce-dashboard",
      liveLink: "https://ecom-dashboard.netlify.app",
      features: [
        "Interactive charts",
        "Product management",
        "Sales insights",
        "Responsive layout"
      ]
    },
    {
      title: "Weather Forecast App",
      description: "A sleek weather app providing real-time weather updates and 7-day forecasts.",
      technologies: ["Next.js", "Tailwind CSS", "OpenWeather API"],
      image: "https://images.unsplash.com/photo-1501973801540-537f08ccae7e?auto=format&fit=crop&w=1350&q=80",
      githubLink: "https://github.com/yourusername/weather-app",
      liveLink: "https://weatherly-demo.netlify.app",
      features: [
        "Live weather data",
        "Location-based search",
        "Animated icons",
        "Responsive design"
      ]
    },
    {
      title: "Chat App Clone",
      description: "A real-time chat application inspired by Slack, built with Firebase.",
      technologies: ["React", "Firebase", "Styled Components", "React Router"],
      image: "https://plus.unsplash.com/premium_photo-1661762531725-8b08899c9634?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      githubLink: "https://github.com/yourusername/chat-app",
      liveLink: "https://chatty-app-demo.netlify.app",
      features: [
        "Real-time messaging",
        "Channel support",
        "User authentication",
        "Responsive UI"
      ]
    }
  ];
  

const Projects = () => {
  const [showModal, setShowModal] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          My Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${styles.projectCard}`}
            >
              <div className="relative cursor-pointer group z-10">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <FaExternalLinkAlt size={24} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm ${styles.techTag}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => setShowModal(index)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Show More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {showModal !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(null)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
              >
                <FaTimes size={24} />
              </button>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <Image
                    src={projects[showModal].image}
                    alt={projects[showModal].title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                    {projects[showModal].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {projects[showModal].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projects[showModal].technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={projects[showModal].githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href={projects[showModal].liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <FaExternalLinkAlt size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects; 