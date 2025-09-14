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
  Download,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSocialProof } from '@/hooks/useFirestore';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { totalDownloads } = useSocialProof();

  return (
    <footer className="bg-gradient-to-br from-slate-50/60 to-stone-50/60 border-t-2 border-amber-200/50" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Academic Top Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
      
      {/* Academic Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Academic Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-sm flex items-center justify-center shadow-sm">
                <Image
                  src="/eliraicon.png"
                  alt="Elira Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-light text-slate-900 mb-1">Elira</h2>
                <p className="text-xs text-amber-700 font-medium tracking-widest uppercase">Education</p>
              </div>
            </div>
            <p className="text-slate-700 font-light italic">
              Tanulj ingyen, alkalmazd holnap
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Academic Navigation Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm"
            >
              <h3 className="text-lg font-serif font-medium text-slate-900 mb-4 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Tartalmak</span>
              </h3>
              <div className="h-px bg-gradient-to-r from-amber-600/30 to-transparent mb-4"></div>
              
              <nav className="space-y-3">
                <Link 
                  href="/#lead-magnets"
                  className="block text-slate-700 hover:text-amber-700 transition-colors duration-200 text-sm font-light leading-relaxed"
                >
                  Ingyenes anyagok
                </Link>
                <Link 
                  href="/#discord"
                  className="block text-slate-700 hover:text-amber-700 transition-colors duration-200 text-sm font-light leading-relaxed"
                >
                  Discord közösség
                </Link>
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm"
            >
              <h3 className="text-lg font-serif font-medium text-slate-900 mb-4 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-amber-700" />
                <span>Jogi & Támogatás</span>
              </h3>
              <div className="h-px bg-gradient-to-r from-amber-600/30 to-transparent mb-4"></div>
              
              <nav className="space-y-3">
                <Link 
                  href="/support"
                  className="block text-slate-700 hover:text-amber-700 transition-colors duration-200 text-sm font-light leading-relaxed"
                >
                  Ügyfélszolgálat
                </Link>
                <Link 
                  href="/privacy"
                  className="block text-slate-700 hover:text-amber-700 transition-colors duration-200 text-sm font-light leading-relaxed"
                >
                  Adatvédelem
                </Link>
                <Link 
                  href="/terms"
                  className="block text-slate-700 hover:text-amber-700 transition-colors duration-200 text-sm font-light leading-relaxed"
                >
                  ÁSZF
                </Link>
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm"
            >
              <h3 className="text-lg font-serif font-medium text-slate-900 mb-4 flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-amber-700" />
                <span>Elérhetőség</span>
              </h3>
              <div className="h-px bg-gradient-to-r from-amber-600/30 to-transparent mb-4"></div>
              
              <div className="space-y-4">
                <a 
                  href="mailto:info@elira.hu" 
                  className="flex items-start space-x-3 text-slate-700 hover:text-amber-700 transition-colors group text-sm"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">info@elira.hu</p>
                    <p className="text-xs text-slate-600 font-light">Általános megkeresések</p>
                  </div>
                </a>
                
                <div className="flex items-start space-x-3 text-slate-700 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Miskolc</p>
                    <p className="text-xs text-slate-600 font-light">3525, Magyarország</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-700 text-sm">
                  <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">elira.hu</p>
                    <p className="text-xs text-slate-600 font-light">Hivatalos weboldal</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm"
            >
              <h3 className="text-lg font-serif font-medium text-slate-900 mb-4 flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-700" />
                <span>Statisztikák</span>
              </h3>
              <div className="h-px bg-gradient-to-r from-amber-600/30 to-transparent mb-4"></div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-amber-600" />
                  <span className="text-slate-700 font-light text-sm">{totalDownloads || 0} letöltés</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  <span className="text-slate-700 font-light text-sm">Gyakorlati oktatás</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Academic Trust & Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 pt-8"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-8"></div>
            
            <div className="bg-gradient-to-br from-amber-50/60 to-stone-50/60 rounded border-2 border-amber-300/30 p-8 shadow-md">
              <h3 className="text-center text-lg font-serif font-light text-slate-900 mb-6">
                Biztonság és megfelelőség
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-6"></div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-4 shadow-sm text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-sm flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-4 h-4 text-green-700" />
                  </div>
                  <p className="text-slate-900 font-medium text-sm">SSL védett</p>
                  <p className="text-xs text-slate-600 font-light">256-bit titkosítás</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-4 shadow-sm text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-sm flex items-center justify-center mx-auto mb-2">
                    <Lock className="w-4 h-4 text-blue-700" />
                  </div>
                  <p className="text-slate-900 font-medium text-sm">GDPR</p>
                  <p className="text-xs text-slate-600 font-light">Megfelelő</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-4 shadow-sm text-center">
                  <div className="w-8 h-8 bg-amber-100 rounded-sm flex items-center justify-center mx-auto mb-2">
                    <GraduationCap className="w-4 h-4 text-amber-700" />
                  </div>
                  <p className="text-slate-900 font-medium text-sm">Gyakorlatban</p>
                  <p className="text-xs text-slate-600 font-light">alkalmazható</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-4 shadow-sm text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-sm flex items-center justify-center mx-auto mb-2">
                    <Award className="w-4 h-4 text-purple-700" />
                  </div>
                  <p className="text-slate-900 font-medium text-sm">Minősített</p>
                  <p className="text-xs text-slate-600 font-light">Tartalom</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Academic Bottom Bar */}
      <div className="bg-gradient-to-br from-stone-100/80 to-amber-50/60 border-t-2 border-amber-300/50">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
          >
            {/* Academic Copyright */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <div className="w-6 h-6 bg-white/60 border border-slate-200/50 rounded-sm flex items-center justify-center">
                  <Heart className="w-3 h-3 text-amber-700" />
                </div>
                <p className="text-sm text-slate-800 font-light">
                  © {currentYear} Elira Education. Minden jog fenntartva.
                </p>
              </div>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Görgei Márk Egon EV. • Adószám: 90426221-1-25 • Miskolc, Magyarország
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-1 mt-2">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <p className="text-xs text-amber-700 font-light italic">
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