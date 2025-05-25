import { FaGithub, FaGitlab, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white text-center p-4 mt-5">
            <p className="mb-10">Created with ❤️ by Anass Lebkhaiti © {currentYear}</p>
            <div className="flex justify-center space-x-4">
                <a
                    href="https://github.com/Anaslbkh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                >
                    <FaGithub size={24} />
                </a>
                <a
                    href="https://gitlab.com/anass-lebkhaiti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                >
                    <FaGitlab size={24} />
                </a>
                <a
                    href="https://linkedin.com/in/anass-lebkhaiti-2446b5170"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                >
                    <FaLinkedin size={24} />
                </a>
                <a
                    href="https://x.com/AnassLebkhaiti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                >
                    <FaTwitter size={24} />
                </a>
            </div>
        </footer>
    );
}
