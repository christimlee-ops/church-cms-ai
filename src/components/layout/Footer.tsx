import Link from "next/link";
import { FiFacebook, FiVideo, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "What We Believe", href: "/what-we-believe" },
  { name: "Worship", href: "/sermons" },
  { name: "Education", href: "/education" },
  { name: "Events", href: "/events" },
  { name: "Plan Your Visit", href: "/visit" },
];

const connectLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "Bible Study", href: "/education" },
  { name: "Sunday School", href: "/education" },
  { name: "Little Lions Preschool", href: "/education" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300" role="contentinfo">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />

      <div className="container-wide mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Church Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-navy-900 font-heading font-bold text-lg">SM</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white">
                  St. Mark
                </span>
                <span className="block text-xs text-gold-400 -mt-0.5 tracking-wider uppercase">
                  Lutheran Church
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-3 text-gold-400 font-medium italic">
              &ldquo;Saved by the Cross. Standing on the Word. Serving to the glory of God.&rdquo;
            </p>
            <p className="text-sm leading-relaxed mb-5 text-gray-400">
              A Wisconsin Evangelical Lutheran Synod (WELS) congregation in Salina, Kansas since 1974.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/stmarksalina/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-800 hover:bg-gold-500 hover:text-navy-900 rounded-full flex items-center justify-center transition-colors"
                aria-label="St. Mark on Facebook"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://vimeo.com/user157825759"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-800 hover:bg-gold-500 hover:text-navy-900 rounded-full flex items-center justify-center transition-colors"
                aria-label="St. Mark on Vimeo"
              >
                <FiVideo className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold-400 font-heading font-semibold text-base mb-5 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-gold-400 font-heading font-semibold text-base mb-5 uppercase tracking-wider">
              Learn &amp; Connect
            </h3>
            <ul className="space-y-2.5">
              {connectLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gold-400 font-heading font-semibold text-base mb-5 uppercase tracking-wider">
              Visit Us
            </h3>
            <address className="not-italic">
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <FiMapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-500" />
                  <span className="text-gray-400">2349 S. Ohio St.<br />Salina, KS 67401</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <FiPhone className="w-4 h-4 shrink-0 text-gold-500" />
                  <a href="tel:+17858257455" className="text-gray-400 hover:text-gold-400 transition-colors">
                    (785) 825-7455
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <FiMail className="w-4 h-4 shrink-0 text-gold-500" />
                  <a href="mailto:stmarksalina@gmail.com" className="text-gray-400 hover:text-gold-400 transition-colors">
                    stmarksalina@gmail.com
                  </a>
                </li>
              </ul>
            </address>
            <div className="mt-6 bg-navy-800 rounded-lg p-4">
              <h4 className="text-white font-semibold text-sm mb-2">Service Times</h4>
              <p className="text-sm text-gray-400">Sunday Worship: 9:00 AM</p>
              <p className="text-sm text-gray-400">Bible Study &amp; Sunday School: 10:15 AM</p>
              <p className="text-sm text-gray-400">Wednesday Classes: 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="container-wide mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} St. Mark Evangelical Lutheran Church, Salina, KS. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/admin/login" className="hover:text-gold-400 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
