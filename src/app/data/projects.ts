interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubLink: string;
  liveLink: string;
  features: string[];
}

interface ProjectsData {
  projects: Project[];
  workingOn: Project[];
}

export const projectsData: ProjectsData = {
  projects: [
    {
      title: "Tahaqaaq",
      description:
        "An AI-powered mobile app for Hadith authenticity verification with OCR, NLP for Arabic, speech-to-text, Firebase authentication, and subscription monetization via RevenueCat.",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "Flask/FastAPI",
        "Google Cloud Platform",
        "Firebase",
        "RevenueCat",
        "AI/NLP",
      ],
      image: "/tahaqaaq.png",
      githubLink: "github.com/Anaslbkh/tahaqaaq",
      liveLink: "tahaqaaq.com",
      features: [
        "AI-powered Hadith authenticity verification",
        "OCR and NLP for Arabic text analysis",
        "Voice search with speech-to-text",
        "Multi-language support with RTL handling",
      ],
    },
    {
      title: "TaskTastic Kids",
      description:
        "A gamified productivity app for children featuring daily quests, progress tracking, and AI-generated magical hero rewards.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "firebase",
        "Gemini API",
      ],
      image: "/TaskTastic Kids.png",
      githubLink: "https://github.com/Anaslbkh/tasktastic-kids",
      liveLink: "tasktastic-kids.vercel.app/",
      features: [
        "Interactive daily quests and progress tracking",
        "AI-generated magical hero rewards",
        "Modern, responsive UI built with Tailwind",
        "Kid-friendly design and usability focus",
      ],
    },

    {
      title: "Vaccination Tracker",
      description:
        "A Vue.js application designed to track vaccination records and schedules.",
      technologies: ["Vue.js", "JavaScript", "HTML", "CSS"],
      image: "/vaccineTracker.png",
      githubLink: "https://github.com/Anaslbkh/vaccination-tracker",
      liveLink: "",
      features: [
        "Track vaccination records and schedules",
        "Responsive design for mobile and desktop",
        "Data visualization for vaccination stats",
      ],
    },
    {
      title: "Let's Travel",
      description:
        "A static travel website showcasing various destinations and travel packages.",
      technologies: ["HTML", "CSS", "JavaScript"],
      image: "/letstravel.png",
      githubLink: "https://github.com/Anaslbkh/lets-travel",
      liveLink: "",
      features: [
        "Attractive travel layouts and galleries",
        "Responsive design across devices",
        "Interactive elements for engagement",
      ],
    },
    {
      title: "Nous Chat",
      description:
        "A real-time chat application built using Vue.js and Firebase.",
      technologies: ["Vue.js", "Firebase", "JavaScript", "HTML", "CSS"],
      image: "/nous-chat.png",
      githubLink: "https://github.com/Anaslbkh/nous-chat",
      liveLink: "",
      features: [
        "Real-time messaging with Firebase",
        "Authentication and multi-user chat rooms",
        "Responsive and clean UI",
      ],
    },
    {
      title: "Weather by City and Location",
      description:
        "A weather application that provides current weather information based on city or user's location.",
      technologies: ["JavaScript", "HTML", "CSS", "OpenWeatherMap API"],
      image: "/app-weather.png",
      githubLink: "https://github.com/Anaslbkh/weather-by-city-and-location",
      liveLink: "",
      features: [
        "Fetches weather data via OpenWeatherMap API",
        "Search by city or geolocation",
        "Displays temperature, humidity, and conditions",
      ],
    },
    {
      title: "Movie App with Vue.js",
      description:
        "A movie browsing application built with Vue.js, allowing users to search and view movie details.",
      technologies: [
        "Vue.js",
        "JavaScript",
        "HTML",
        "CSS",
        "The Movie Database API",
      ],
      image: "/movie-app.png",
      githubLink: "https://github.com/Anaslbkh/movie-app-vuejs",
      liveLink: "",
      features: [
        "Search functionality for movies",
        "Displays movie details and posters",
        "Responsive design across devices",
      ],
    },
  ],
  workingOn: [
    {
      title: "Retro",
      description:
        "A modern web app leveraging Gemini Nano and Banana API for AI workflows. Built with scalable state management and query handling for real-time data.",
      technologies: [
        "Next.js",
        "Gemini Nano Banana API",
        "Zustand",
        "TanStack Query",
        "Tailwind CSS",
      ],
      image: "/retro.png",
      githubLink: "github.com/Anaslbkh/retro",
      liveLink: "retro-anaslbkh.vercel.app",
      features: [
        "AI workflows powered by Gemini Nano and Banana API",
        "State management with Zustand",
        "Data fetching with TanStack Query",
        "Modern Tailwind UI",
      ],
    },
    {
      title: "Tahaqaaq KSA",
      description:
        "A localized version of Tahaqaaq for the Saudi Arabian News. Same stack as Tahaqaaq, with extra localization, scalability, and cultural adaptations.",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "Flask/FastAPI",
        "Google Cloud Platform",
        "Firebase",
        "RevenueCat",
        "AI/NLP",
      ],
      image: "/tahaqaaq-ksa.png",
      githubLink: "github.com/Anaslbkh/tahaqaaq-ksa",
      liveLink: "ksa.tahaqaaq.com",
      features: [
        "Localized version of Tahaqaaq for Saudi users",
        "Same AI/NLP-based Hadith verification system",
        "Full RTL and Arabic support",
        "Cloud deployment with GCP for scalability",
      ],
    },
    {
      title: "Bayān – Arabic Prompt Booster",
      description:
        "A Next.js app that helps Arabic speakers get richer ChatGPT answers by optimizing their questions into powerful English prompts, then returning high-quality Arabic responses.",
      technologies: ["Next.js", "React", "Tailwind CSS", "OpenAI API"],
      image: "/bayan.jpeg",
      githubLink: "https://github.com/Anaslbkh/bayan",
      liveLink: "",
      features: [
        "Arabic-to-English prompt optimization",
        "Returns fluent Arabic answers with GPT",
        "Clean responsive UI with error handling",
        "Designed for non-English speakers",
      ],
    },
    {
      title: "ChartMind – Ask & Visualize",
      description:
        "A Nuxt 3 web app that turns natural language questions into AI-generated charts using GPT and Chart.js.",
      technologies: [
        "Nuxt.js 3",
        "Vue",
        "Chart.js",
        "OpenAI API",
        "Tailwind CSS",
      ],
      image: "/chartMind.jpeg",
      githubLink: "https://github.com/Anaslbkh/chartmind",
      liveLink: "",
      features: [
        "Transforms questions into structured chart data",
        "Supports bar, pie, line, donut, radar charts",
        "AI-powered data parsing with GPT",
        "Responsive UI with Tailwind CSS",
      ],
    },
  ],
};
