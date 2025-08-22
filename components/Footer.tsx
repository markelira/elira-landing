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
  FileText,
  MessageSquare,
  Sparkles,
  Building2,
  Globe,
  Award,
  Download
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSocialProof } from '@/hooks/useFirestore';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { totalDownloads } = useSocialProof();

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700" />
      
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Brand & Mission - Wider column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Logo & Tagline */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white 
                                   rounded-xl flex items-center justify-center shadow-lg
                                   shadow-teal-500/20 p-2">
                      <Image
                        src="/eliraicon.png"
                        alt="Elira Logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 
                                   rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 
                                  bg-clip-text text-transparent">
                      Elira
                    </h2>
                    <p className="text-xs text-teal-400 font-medium tracking-wider uppercase">
                      Education
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-400 leading-relaxed text-sm">
                  Tanulj ingyen, alkalmazd holnap
                </p>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-teal-400" />
                  <span className="text-gray-300">{totalDownloads || 0} letöltés</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <span>Tartalmak</span>
              </h3>
              
              <nav className="space-y-3">
                <Link 
                  href="/#lead-magnets"
                  className="flex items-center space-x-2 text-gray-400 hover:text-teal-400 
                           transition-all duration-200 group text-sm"
                >
                  <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Ingyenes anyagok</span>
                </Link>
                <Link 
                  href="/#discord"
                  className="flex items-center space-x-2 text-gray-400 hover:text-teal-400 
                           transition-all duration-200 group text-sm"
                >
                  <MessageSquare className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Discord közösség</span>
                </Link>
              </nav>
            </motion.div>

            {/* Legal & Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-teal-400" />
                <span>Jogi & Támogatás</span>
              </h3>
              
              <nav className="space-y-3">
                <Link 
                  href="/privacy"
                  className="flex items-center space-x-2 text-gray-400 hover:text-teal-400 
                           transition-all duration-200 group text-sm"
                >
                  <Lock className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Adatvédelem</span>
                </Link>
                <Link 
                  href="/terms"
                  className="flex items-center space-x-2 text-gray-400 hover:text-teal-400 
                           transition-all duration-200 group text-sm"
                >
                  <FileText className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>ÁSZF</span>
                </Link>
              </nav>
            </motion.div>

            {/* Contact & Business Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold flex items-center space-x-2 mb-4">
                <Building2 className="w-5 h-5 text-teal-400" />
                <span>Elérhetőség</span>
              </h3>
              
              <div className="space-y-3">
                <a 
                  href="mailto:info@elira.hu" 
                  className="flex items-start space-x-3 text-gray-400 hover:text-teal-400 
                           transition-colors group text-sm"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">info@elira.hu</p>
                    <p className="text-xs text-gray-500">Általános megkeresések</p>
                  </div>
                </a>
                
                
                <div className="flex items-start space-x-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Miskolc</p>
                    <p className="text-xs text-gray-500">3525, Magyarország</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-gray-400 text-sm">
                  <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">elira.hu</p>
                    <p className="text-xs text-gray-500">Hivatalos weboldal</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust & Compliance Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center 
                              justify-center">
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">SSL védett</p>
                  <p className="text-xs text-gray-500">256-bit titkosítás</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-8 h-8 bg-teal-700/10 rounded-lg flex items-center 
                              justify-center">
                  <Lock className="w-4 h-4 text-teal-700" />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">GDPR</p>
                  <p className="text-xs text-gray-500">Megfelelő</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center 
                              justify-center">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Gyakorlatban</p>
                  <p className="text-xs text-gray-500">azonnal alkalmazható</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center 
                              justify-center">
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Minősített</p>
                  <p className="text-xs text-gray-500">Tartalom</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/50 backdrop-blur-sm border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          >
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © {currentYear} Elira Education. Minden jog fenntartva.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Görgei Márk Egon EV. • Adószám: 90426221-1-25
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;