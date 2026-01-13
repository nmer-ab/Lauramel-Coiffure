import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-secondary-foreground py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl mb-2">
              Lauramel <span className="text-terracotta">Coiffure</span>
            </h3>
            <p className="text-warm-gray text-sm">Centre Commercial Leclerc Enval</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-warm-gray/30 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-warm-gray/30 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-warm-gray text-sm text-center md:text-right">
            © {new Date().getFullYear()} Lauramel Coiffure. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
