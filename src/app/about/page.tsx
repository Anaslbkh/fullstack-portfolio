import AboutMe from "../../../components/AboutMe"
import ExperienceProjects from "../../../components/ExperienceProjects"
import Projects from "../../../components/Projects"
import ChatAI from "../../../components/ChatAI"
import '../globals.css';

export default function About(){
    return(
        <div className="container mx-auto md:px-10 animated-background">
            <div className="about_me_section flex flex-col md:flex-row">
          <div className="w-full md:w-8/12 pr-4">
            <AboutMe />
            <ExperienceProjects />
          </div>
          <div className="chat-ai-section w-full md:w-4/12 mt-8 px-4">
            <ChatAI />
          </div>
        </div>
        <Projects />
        </div>
    )
}