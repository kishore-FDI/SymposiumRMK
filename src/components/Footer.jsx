import {FaYoutube, FaWhatsapp, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { href: "https://whatsapp.com", icon: <FaWhatsapp className="size-5" /> },
  { href: "https://youtube.com", icon: <FaYoutube className="size-5"/> },
  { href: "https://Instagram.com", icon: <FaInstagram className="size-5"/> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-medium md:text-left">
          © R.M.K. 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4 pr-10 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#rules"
          className="text-center text-sm font-medium hover:underline md:text-right"
        >
          Rules and Regulation
        </a>
      </div>
    </footer>
  );
};

export default Footer;
