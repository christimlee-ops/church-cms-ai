import Link from "next/link";
import { FiFacebook, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "What We Believe", href: "/what-we-believe" },
  { name: "Worship", href: "/sermons" },
  { name: "Ministries", href: "/education" },
  { name: "Events", href: "/events" },
  { name: "Plan Your Visit", href: "/visit" },
];

const connectLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "Sunday School", href: "/education/sunday-school" },
  { name: "Confirmation", href: "/education/confirmation" },
  { name: "Mornings with Mommy", href: "/education/mornings-with-mommy" },
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
                <span className="text-navy-900 font-heading font-bold text-lg">CLC</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white">
                  Calvary
                </span>
                <span className="block text-xs text-gold-400 -mt-0.5 tracking-wider uppercase">
                  Lutheran Church
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-3 text-gold-400 font-medium italic">
              &ldquo;Grow in the grace and knowledge of our Lord and Savior Jesus Christ.&rdquo;
            </p>
            <p className="text-sm leading-relaxed mb-5 text-gray-400">
              A Wisconsin Evangelical Lutheran Synod (WELS) congregation in Chandler, Arizona since 1977.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/CalvaryLutheranChurchChandler/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-800 hover:bg-gold-500 hover:text-navy-900 rounded-full flex items-center justify-center transition-colors"
                aria-label="Calvary on Facebook"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/clcchandler/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-800 hover:bg-gold-500 hover:text-navy-900 rounded-full flex items-center justify-center transition-colors"
                aria-label="Calvary on Instagram"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@clc.chandler"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-navy-800 hover:bg-gold-500 hover:text-navy-900 rounded-full flex items-center justify-center transition-colors"
                aria-label="Calvary on YouTube"
              >
                <FiYoutube className="w-4 h-4" />
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
                  <span className="text-gray-400">1270 N Dobson Rd<br />Chandler, AZ 85224</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <FiPhone className="w-4 h-4 shrink-0 text-gold-500" />
                  <a href="tel:+14809639397" className="text-gray-400 hover:text-gold-400 transition-colors">
                    (480) 963-9397
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <FiMail className="w-4 h-4 shrink-0 text-gold-500" />
                  <a href="mailto:pastor@calvarychandler.net" className="text-gray-400 hover:text-gold-400 transition-colors">
                    pastor@calvarychandler.net
                  </a>
                </li>
              </ul>
            </address>
            <div className="mt-6 bg-navy-800 rounded-lg p-4">
              <h4 className="text-white font-semibold text-sm mb-2">Service Times</h4>
              <p className="text-sm text-gray-400">Saturday Worship: 6:00 PM</p>
              <p className="text-sm text-gray-400">Sunday Worship: 9:00 AM</p>
              <p className="text-sm text-gray-400">Bible Study &amp; Sunday School: 10:30 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="container-wide mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Calvary Lutheran Church, Chandler, AZ. All rights reserved.
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
