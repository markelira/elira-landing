'use client';

import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { MobileNavbar } from "./MobileNavbar";

export function PremiumHeader() {
  const { user } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div
          className="relative"
          style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)'
          }}
        >
          <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/navbar-icon.png"
                alt="Elira Logo"
                className="w-7 h-7 object-contain"
              />
              <span className="text-xl font-bold text-gray-900">
                Elira
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dijmentes-audit" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
                Díjmentes audit
              </Link>
              <Link href="/masterclass" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
                Masterclass
              </Link>
              <Link href="/rolunk" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
                Rólunk
              </Link>
            </nav>
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center gap-2">
            <Link href={user ? "/dashboard" : "/auth"}>
              <Button
                size="sm"
                className={
                  user
                    ? "bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg"
                    : "bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                }
              >
                {user ? "Irányítópult" : "Bejelentkezés"}
              </Button>
            </Link>
          </div>
        </div>

        </div>
      </header>

      {/* Mobile Navbar - Only visible on mobile */}
      <MobileNavbar />
    </>
  );
}