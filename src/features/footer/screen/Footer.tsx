import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#141414] to-[#0A0A0A] text-gray-400 font-sans text-xs md:text-sm relative overflow-hidden border-t border-zinc-800/50">
      
      {/* Decorative Top Accent Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#52C5C3] to-transparent opacity-60"></div>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 relative z-10">
        
        {/* Column 1: Brand & Contact Info */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <h3 className="text-white font-bold text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-[#52C5C3] bg-clip-text text-transparent">
              Shyam Industries
            </h3>
            <div className="h-[2px] w-12 bg-[#52C5C3] rounded-full mt-1"></div>
          </div>
          
          {/* Address with Icons */}
          <div className="space-y-3 pt-2 text-zinc-400">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#52C5C3] shrink-0 mt-1" size={14} />
              <p className="leading-relaxed">
                Baba Pal, Opposite Nagar Palika Parishad<br />
                Station Road, Orai, Jalaun<br />
                Uttar Pradesh, India - 285001
              </p>
            </div>
            
            <div className="flex items-center gap-3 pt-1">
              <FaEnvelope className="text-[#52C5C3] shrink-0" size={13} />
              <a href="mailto:shyamindustriesorai@gmail.com" className="hover:text-white transition-colors truncate hover:underline">
                shyamindustriesorai@gmail.com
              </a>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <FaPhoneAlt className="text-[#52C5C3] shrink-0 mt-0.5" size={13} />
              <p className="leading-none text-zinc-400">
                +91 9415064551 <span className="text-zinc-600">/</span> 9519588882
              </p>
            </div>
          </div>

          {/* Premium Circular Social Icon Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#52C5C3] hover:shadow-[0_0_10px_rgba(82,197,195,0.3)] transition-all duration-300">
              <FaFacebook size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#52C5C3] hover:shadow-[0_0_10px_rgba(82,197,195,0.3)] transition-all duration-300">
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        {/* Column 2: Exploration Links */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1(`">
            <h3 className="text-white font-semibold text-sm md:text-base tracking-wider uppercase">
              Services
            </h3>
            <div className="h-[2px] w-8 bg-[#52C5C3] rounded-full mt-1"></div>
          </div>
          
          <ul className="space-y-2.5 text-zinc-400 pt-2">
            <li>
              <Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                Home Matrix
              </Link>
            </li>
            <li>
              <Link to="/new-project" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                New Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                Get In Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Business Overview Paragraph */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <h3 className="text-white font-semibold text-sm md:text-base tracking-wider uppercase">
              About Us
            </h3>
            <div className="h-[2px] w-8 bg-[#52C5C3] rounded-full mt-1"></div>
          </div>
          <p className="leading-relaxed text-zinc-400 text-justify pt-2 pr-2">
            Currently, Shyam Industries focuses on manufacturing high-grade agricultural machinery alongside engineered equipment and tools. Explore our digital product section to review specifications.
          </p>
        </div>

        {/* Column 4: Glass-morphic Newsletter Panel */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <h3 className="text-white font-semibold text-sm md:text-base tracking-wider uppercase">
              Newsletter
            </h3>
            <div className="h-[2px] w-8 bg-[#52C5C3] rounded-full mt-1"></div>
          </div>
          <p className="text-zinc-400 leading-relaxed pt-2">
            Subscribe to secure technical catalogs, product releases, and updates.
          </p>
          
          {/* Enhanced Action Input Field */}
          <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center mt-2 w-full">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-zinc-900/90 text-zinc-200 pl-4 pr-12 py-3 rounded-xl text-xs outline-none border border-zinc-800/80 focus:border-[#52C5C3] focus:ring-1 focus:ring-[#52C5C3]/30 transition-all duration-300 placeholder-zinc-500 shadow-inner"
              required
            />
            <button 
              type="submit" 
              className="absolute right-1.5 p-2 rounded-lg bg-[#52C5C3] text-zinc-950 hover:bg-[#45b4b2] hover:shadow-[0_0_12px_rgba(82,197,195,0.4)] transition-all duration-300 flex items-center justify-center shrink-0"
              aria-label="Submit newsletter"
            >
              <FaPaperPlane size={11} />
            </button>
          </form>
        </div>

      </div>

      {/* Sub-Footer Base Banner */}
      <div className="w-full border-t border-zinc-900 bg-[#0A0A0A] py-6 text-center text-[11px] md:text-xs text-zinc-500 tracking-wide relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; {new Date().getFullYear()} Shyam Industries. All rights reserved.</p>
          <p className="text-zinc-600 text-[10px]">Designed with excellence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
