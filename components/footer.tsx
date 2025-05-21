import Link from "next/link";
import {
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-accent to-accent/50 dark:from-gray-800 dark:to-gray-900 py-12 mt-12 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">
              Dunamis Faith Hub
            </h3>
            <p className="text-muted-foreground dark:text-gray-400 mb-4">
              Providing easy access to Christian content, including sermons,
              worship materials, books, and movies.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M12.07 2c.15 2.295 1.753 4.168 4.12 4.43v2.16c-.79.084-1.562-.032-2.3-.312v6.265c0 3.26-2.755 5.517-5.878 4.674-1.92-.525-3.354-2.243-3.472-4.253-.135-2.35 1.477-4.36 3.704-4.716.53-.09 1.05-.107 1.564-.066v2.13c-.385-.047-.764-.005-1.13.14-.74.3-1.242 1.032-1.22 1.832.027.947.747 1.74 1.693 1.84 1.147.124 2.126-.78 2.126-1.903V2h1.793z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div> */}

          <div>
            <h3 className="text-xl font-bold mb-4 dark:text-gray-100">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-primary mt-0.5" />
                <span className="text-muted-foreground dark:text-gray-400">
                  123 Faith Street, Lagos
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <span className="text-muted-foreground dark:text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <a
                  href="mailto:contact@dunamisfaithhub.com"
                  className="text-muted-foreground hover:text-primary dark:text-gray-400 dark:hover:text-primary hover:underline"
                >
                  contact@dunamisfaithhub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border dark:border-gray-700 mt-8 pt-8 text-center text-muted-foreground dark:text-gray-400">
          <p>
            &copy; {currentYear} Dunamis Faith Resource Hub. All rights
            reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <Link href="#" className="hover:text-primary dark:hover:text-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary dark:hover:text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary dark:hover:text-primary hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
