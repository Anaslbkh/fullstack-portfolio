import { FaGithub, FaGitlab, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white text-center p-4">
            <p className="mb-2">Created with ❤️ by Anass Lebkhaiti © {currentYear}</p>
            <div className="flex justify-center space-x-4">
                <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    <FaGithub size={24} />
                </a>
                <a href="https://gitlab.com/your-gitlab-username" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    <FaGitlab size={24} />
                </a>
                <a href="https://linkedin.com/in/your-linkedin-username" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    <FaLinkedin size={24} />
                </a>
                <a href="https://x.com/your-twitter-username" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    <FaTwitter size={24} />
                </a>
            </div>
        </footer>
    );
}