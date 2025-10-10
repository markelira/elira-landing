'use client';

import { motion } from "motion/react";

export function PremiumFooter() {
  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        background: 'linear-gradient(to bottom, #16222F 0%, #1a2836 100%)',
        borderTopColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-center md:text-left"
        >
          {/* Left: Branding & Copyright */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-lg font-semibold text-white">Elira</span>
              <span className="text-white/50 text-xs">For Business</span>
            </div>
            <p className="text-white/60 text-xs">
              © 2025 Elira Minden jog fenntartva.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex items-center space-x-6 text-xs">
            <a href="/privacy" className="text-white/70 hover:text-white transition-colors duration-200">
              Adatvédelem
            </a>
            <a href="/terms" className="text-white/70 hover:text-white transition-colors duration-200">
              ÁSZF
            </a>
            <a href="/support" className="text-white/70 hover:text-white transition-colors duration-200">
              Támogatás
            </a>
          </div>

          {/* Right: Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/70 text-xs"></span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
