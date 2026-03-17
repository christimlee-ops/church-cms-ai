"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const navigation = [
  { name: "Welcome", href: "/" },
  {
    name: "About Us",
    href: "/about",
    children: [
      { name: "Our Congregation", href: "/about" },
      { name: "What We Believe", href: "/about/what-we-believe" },
      { name: "Our Staff", href: "/about/staff" },
    ],
  },
  {
    name: "Ministries",
    href: "/education",
    children: [
      { name: "Bible Classes", href: "/education/bible-classes" },
      { name: "Sunday School", href: "/education/sunday-school" },
      { name: "Confirmation", href: "/education/confirmation" },
      { name: "Mornings with Mommy", href: "/education/mornings-with-mommy" },
      { name: "Adult Instruction", href: "/education/adult-instruction" },
      { name: "Columbarium", href: "/education/columbarium" },
    ],
  },
  { name: "Worship", href: "/sermons" },
  { name: "Events", href: "/events" },
  { name: "Blog", href: "/blog" },
  { name: "Connect", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-navy-500 sticky top-0 z-50 shadow-lg" role="banner">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />

      <div className="container-wide mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Calvary Lutheran Church — Home">
            <Image
              src="/images/calvary-lutheren-chruch-white-logo.png"
              alt="Calvary Lutheran Church"
              width={220}
              height={64}
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 text-navy-100 hover:text-gold-400 font-medium text-base transition-colors rounded-lg hover:bg-white/10 inline-flex items-center gap-1"
                >
                  {item.name}
                  {item.children && <FiChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-secondary-600 hover:text-navy-500 hover:bg-church-light transition-colors text-sm"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/members/login" className="text-base text-navy-100 hover:text-gold-400 font-medium transition-colors">
              Members Login
            </Link>
            <Link href="/visit" className="btn-primary text-sm">
              Plan Your Visit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-gold-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-navy-400/30 py-4 pb-6" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-navy-100 hover:text-gold-400 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className="block px-8 py-2 text-navy-200 hover:text-gold-400 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            ))}
            <div className="px-4 pt-4 space-y-3">
              <Link
                href="/members/login"
                className="block text-sm text-navy-100 hover:text-gold-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Members Login
              </Link>
              <Link
                href="/visit"
                className="btn-primary text-sm w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Plan Your Visit
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
