import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-10">
          <h2 className="font-heading text-2xl font-bold mb-2">Zorig Online</h2>
          <p className="text-white/70 text-center max-w-md">
            Bringing authentic Bhutanese craftsmanship directly from artisans to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-[#D4A017] mr-3 mt-0.5" />
                <span className="text-white/70">
                  info@zorigonline.com
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-[#D4A017] mr-3 mt-0.5" />
                <span className="text-white/70">
                  +975 2 333 444
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#D4A017] mr-3 mt-0.5" />
                <span className="text-white/70">
                  Norzin Lam, Thimphu<br />
                  Kingdom of Bhutan
                </span>
              </li>
            </ul>
          </div>

          {/* Follow Us & Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Connect With Us</h3>
            <div className="flex space-x-4 mb-8">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A017]/20 transition-colors">
                  <Instagram className="h-5 w-5" />
                </div>
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A017]/20 transition-colors">
                  <Facebook className="h-5 w-5" />
                </div>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A017]/20 transition-colors">
                  <Twitter className="h-5 w-5" />
                </div>
              </Link>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-3">Secure Payment Methods</h4>
              <div className="flex space-x-2">
                <div className="h-8 w-12 bg-white rounded opacity-70 hover:opacity-100 transition-opacity"></div>
                <div className="h-8 w-12 bg-white rounded opacity-70 hover:opacity-100 transition-opacity"></div>
                <div className="h-8 w-12 bg-white rounded opacity-70 hover:opacity-100 transition-opacity"></div>
                <div className="h-8 w-12 bg-white rounded opacity-70 hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-white/60 text-center">
            © 2025 Zorig Online. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;