import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-10">
          <h2 className="font-heading text-2xl font-bold mb-2">Bhutan Art</h2>
          <p className="text-white/70 text-center max-w-md">
            Bringing authentic Bhutanese craftsmanship directly from artisans to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-[#D4A017] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-[#D4A017] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/70 hover:text-[#D4A017] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="text-white/70 hover:text-[#D4A017] transition-colors">
                  Artisans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-[#D4A017] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/textiles" className="text-white/70 hover:text-[#D4A017] transition-colors">
                  Textiles
                </Link>
              </li>
              <li>
                <Link href="/products/paintings" className="text-white/70 hover:text-[#D4A017] transition-colors">
                  Paintings
                </Link>
              </li>
              <li>
                <Link href="/products/ceremonial" className="text-white/70 hover:text-[#D4A017] transition-colors">
                  Ceremonial Items
                </Link>
              </li>
              <li>
                <Link href="/products/home-decor" className="text-white/70 hover:text-[#D4A017] transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link href="/products/gifts" className="text-white/70 hover:text-[#D4A017] transition-colors">
                  Gifts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-[#D4A017] mr-3 mt-0.5" />
                <span className="text-white/70">
                  info@bhutanart.com
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

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Follow Us</h3>
            <div className="flex space-x-4">
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
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Payment Methods</h4>
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/60 mb-4 md:mb-0">
              © 2025 Bhutan Art. All Rights Reserved.
            </p>
            <div className="flex space-x-4 text-sm text-white/60">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/shipping-policy" className="hover:text-white transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;