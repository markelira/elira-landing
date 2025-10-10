'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Mail,
  MapPin,
  GraduationCap,
  BookOpen,
  Shield,
  Lock,
  Globe,
  Award,
  Download,
  Building2,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSocialProof } from '@/hooks/useFirestore';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { totalDownloads } = useSocialProof();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #16222F 0%, #1a2836 50%, #16222F 100%)'
      }}
    >
      {/* Decorative top border */}
      <div
        className="h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)'
        }}
      />

      {/* Main Content */}
      <div className="py-16 lg:py-20 relative">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <Image
                  src="/eliraicon.png"
                  alt="Elira Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-white mb-1">Elira</h2>
                <p className="text-xs text-white/70 font-medium tracking-wider uppercase">Education</p>
              </div>
            </div>
            <p className="text-white/80 text-lg">
              Tanulj ingyen, alkalmazd holnap
            </p>
          </motion.div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">

            {/* Tartalmak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-xl p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <span>Tartalmak</span>
              </h3>
              <div
                className="h-px mb-4"
                style={{
                  background: 'linear-gradient(to right, rgba(20, 184, 166, 0.3), transparent)'
                }}
              />

              <nav className="space-y-3">
                <Link
                  href="/#lead-magnets"
                  className="block text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  Ingyenes anyagok
                </Link>
                <Link
                  href="/#discord"
                  className="block text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  Discord közösség
                </Link>
              </nav>
            </motion.div>

            {/* Jogi & Támogatás */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-teal-400" />
                <span>Jogi & Támogatás</span>
              </h3>
              <div
                className="h-px mb-4"
                style={{
                  background: 'linear-gradient(to right, rgba(20, 184, 166, 0.3), transparent)'
                }}
              />

              <nav className="space-y-3">
                <Link
                  href="/support"
                  className="block text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  Ügyfélszolgálat
                </Link>
                <Link
                  href="/privacy"
                  className="block text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  Adatvédelem
                </Link>
                <Link
                  href="/terms"
                  className="block text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  ÁSZF
                </Link>
              </nav>
            </motion.div>

            {/* Elérhetőség */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-xl p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-teal-400" />
                <span>Elérhetőség</span>
              </h3>
              <div
                className="h-px mb-4"
                style={{
                  background: 'linear-gradient(to right, rgba(20, 184, 166, 0.3), transparent)'
                }}
              />

              <div className="space-y-4">
                <a
                  href="mailto:info@elira.hu"
                  className="flex items-start space-x-3 text-white/70 hover:text-white transition-colors group text-sm"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">info@elira.hu</p>
                    <p className="text-xs text-white/50">Általános megkeresések</p>
                  </div>
                </a>

                <div className="flex items-start space-x-3 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Miskolc</p>
                    <p className="text-xs text-white/50">3525, Magyarország</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-white/70 text-sm">
                  <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">elira.hu</p>
                    <p className="text-xs text-white/50">Hivatalos weboldal</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Statisztikák */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-xl p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-teal-400" />
                <span>Statisztikák</span>
              </h3>
              <div
                className="h-px mb-4"
                style={{
                  background: 'linear-gradient(to right, rgba(20, 184, 166, 0.3), transparent)'
                }}
              />

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-teal-400" />
                  <span className="text-white/80 text-sm">{totalDownloads || 0} letöltés</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-teal-400" />
                  <span className="text-white/80 text-sm">Gyakorlati oktatás</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust & Compliance Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              <h3 className="text-center text-lg font-semibold text-white mb-6">
                Biztonság és megfelelőség
              </h3>
              <div
                className="h-px mb-8 mx-auto max-w-xs"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(20, 184, 166, 0.3), transparent)'
                }}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: 'rgba(34, 197, 94, 0.2)',
                      border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">SSL védett</p>
                  <p className="text-xs text-white/60">256-bit titkosítás</p>
                </div>

                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: 'rgba(59, 130, 246, 0.2)',
                      border: '1px solid rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">GDPR</p>
                  <p className="text-xs text-white/60">Megfelelő</p>
                </div>

                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: 'rgba(20, 184, 166, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(20, 184, 166, 0.2)',
                    boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: 'rgba(20, 184, 166, 0.2)',
                      border: '1px solid rgba(20, 184, 166, 0.3)'
                    }}
                  >
                    <GraduationCap className="w-5 h-5 text-teal-400" />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">Gyakorlatban</p>
                  <p className="text-xs text-white/60">alkalmazható</p>
                </div>

                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: 'rgba(168, 85, 247, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    boxShadow: '0 4px 12px rgba(168, 85, 247, 0.1)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: 'rgba(168, 85, 247, 0.2)',
                      border: '1px solid rgba(168, 85, 247, 0.3)'
                    }}
                  >
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">Minősített</p>
                  <p className="text-xs text-white/60">Tartalom</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="relative border-t"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderTopColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          >
            {/* Copyright */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Heart className="w-3 h-3 text-teal-400" />
                </div>
                <p className="text-sm text-white/80">
                  © {currentYear} Elira Education. Minden jog fenntartva.
                </p>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Görgei Márk Egon EV. • Adószám: 90426221-1-25 • Miskolc, Magyarország
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-1 mt-2">
                <Sparkles className="w-3 h-3 text-teal-400" />
                <p className="text-xs text-white/70 italic">
                  Scientia potentia est
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
