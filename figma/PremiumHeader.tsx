import { Button } from "./ui/button";
import { motion } from "motion/react";

export function PremiumHeader() {
  return (
    <header className="relative z-50 w-full bg-transparent">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-full"></div>
          </div>
          <span className="text-xl font-medium text-gray-900">
            Elira
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
            Díjmentes audit
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
            Cégeknek
          </a>
          <div className="relative flex items-center space-x-1">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
              Masterclass
            </a>
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </nav>
        
        <Button 
          size="sm" 
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Bejelentkezés
        </Button>
      </div>
    </header>
  );
}