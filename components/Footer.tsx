'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, MapPin } from 'lucide-react';
import { content } from '@/lib/content/hu';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 
                             rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold">Elira</span>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Gyakorlati tudás egyetemi oktatóktól. A tudás demokratizálásáért dolgozunk, 
              hogy mindenki számára elérhető legyen a minőségi oktatás.
            </p>
            
            <div className="flex items-center text-gray-400">
              <Heart className="w-4 h-4 mr-2 text-red-400" />
              <span className="text-sm">Készítve szeretettel Magyarországon</span>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">Kapcsolat</h3>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3" />
                <a 
                  href="mailto:hello@elira.hu" 
                  className="hover:text-teal-400 transition-colors"
                >
                  hello@elira.hu
                </a>
              </div>
              
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3" />
                <span>Miskolc, Magyarország</span>
              </div>
            </div>

            {/* University Partnership */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400">
                🎓 Miskolci Egyetem partnere
              </p>
            </div>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">Jogi információk</h3>
            
            <div className="space-y-3">
              {content.footer.links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-teal-400 
                           transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-gray-800 space-y-2">
              <div className="flex items-center text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                <span>SSL titkosítás</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                <span>GDPR megfelelő</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Elira. Minden jog fenntartva.
            {" "}
            <span className="text-gray-600">•</span>
            {" "}
            <span className="text-teal-400">
              A tudás mindenkié.
            </span>
          </p>
          
          {/* Made with love indicator */}
          <div className="flex items-center justify-center mt-4 space-x-2 text-gray-500 text-xs">
            <span>Készítve</span>
            <Heart className="w-3 h-3 text-red-400 animate-pulse" />
            <span>és</span>
            <span className="text-teal-400">AI</span>
            <span>segítségével</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;