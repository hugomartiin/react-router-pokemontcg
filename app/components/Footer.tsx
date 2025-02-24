import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 px-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-800">
            <div className="text-left">
                <h3 className="font-bold text-lg">Contact</h3>
                <div className="mt-2 flex flex-col gap-1">
                    <a href="https://github.com/AitorBarrera" className="flex items-center gap-2 text-gray-300 hover:text-white">
                        <FaGithub /> AitorBarrera
                    </a>
                    <a href="https://github.com/hugomartiin" className="flex items-center gap-2 text-gray-300 hover:text-white">
                        <FaGithub /> hugomartiin
                    </a>
                </div>
            </div>

            <div className="text-center text-xl font-bold">
                © HUGO AND AITOR
            </div>

            <div className="text-right">
                <h3 className="font-bold text-lg">Developed with</h3>
                <div className="mt-2">
                    <p className="text-gray-300">React Router</p>
                    <p className="text-gray-300">TypeScript</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
