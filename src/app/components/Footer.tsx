import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Disc } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#020202] border-t border-[#75feed]/20 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(117,254,237,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-orbitron text-3xl font-bold tracking-wider text-white inline-block mb-4">
              <span className="text-[#75feed]">DYSTOPSY</span>
              <span className="text-[#fc029b]"> ELEMENT</span>
            </Link>
            <p className="text-gray-400 font-rajdhani max-w-md text-lg leading-relaxed mb-6">
              Association dédiée à la promotion de la musique électronique, de la culture psytrance, de l'art alternatif et de la création d'expériences immersives.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#75feed]/30 flex items-center justify-center text-[#75feed] hover:bg-[#75feed] hover:text-black transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#fc029b]/30 flex items-center justify-center text-[#fc029b] hover:bg-[#fc029b] hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#75feed]/30 flex items-center justify-center text-[#75feed] hover:bg-[#75feed] hover:text-black transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#fc029b]/30 flex items-center justify-center text-[#fc029b] hover:bg-[#fc029b] hover:text-black transition-all">
                <Disc className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-orbitron text-[#75feed] text-xl mb-4 font-bold">NAVIGATION</h3>
            <ul className="space-y-2 font-rajdhani text-lg">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Le Festival</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Décoration & Arts</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Boutique</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-orbitron text-[#fc029b] text-xl mb-4 font-bold">CONTACT</h3>
            <ul className="space-y-2 font-rajdhani text-lg text-gray-400">
              <li>contact@dystopsyelement.fr</li>
              <li>+33 6 00 00 00 00</li>
              <li>Underground City, Sector 7</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center flex flex-col items-center">
          <p className="text-gray-500 font-rajdhani text-sm">
            &copy; {new Date().getFullYear()} Dystopsy Element. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}