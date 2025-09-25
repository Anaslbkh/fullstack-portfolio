'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import styles from './Projects.module.css';
import { projectsData } from '../data/projects';
import ProjectModal from './ProjectModal';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubLink: string;
  liveLink: string;
  features: string[];
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects, workingOn } = projectsData as { projects: Project[], workingOn: Project[] };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Working On Section */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          Projects in Development
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {workingOn.map((project: Project, index: number) => (
            <motion.div
              key={`working-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${styles.projectCard}`}
            >
              <div className="relative cursor-pointer group z-10">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 h-[103%] bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <span 
                      key={techIndex}
                      className={`px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm ${styles.techTag}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Show More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Existing Projects Section */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          My Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project, index: number) => (
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
                <div className="absolute inset-0 h-[103%] bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <span 
                      key={techIndex}
                      className={`px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm ${styles.techTag}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedProject(project)}
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
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects; 