export default function Nav() {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="text-lg font-bold flex-1/2"><span>AL</span><span>.</span></div>
        <ul className="flex center flex-1/2">
            <li><a href="#home" className="hover:text-gray-400">Home</a></li>
            <li><a href="#about" className="hover:text-gray-400">About</a></li>
            <li><a href="#services" className="hover:text-gray-400">Services</a></li>
            <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
        </ul>
        </nav>
    );
}