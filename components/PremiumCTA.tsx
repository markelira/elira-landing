import { Button } from "./ui/button";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function PremiumCTA() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const timer1 = setTimeout(() => {
      const interval = setInterval(() => {
        setCount1(prev => prev < 50 ? prev + 1 : 50);
      }, 40);
      return () => clearInterval(interval);
    }, 500);

    const timer2 = setTimeout(() => {
      const interval = setInterval(() => {
        setCount2(prev => prev < 100 ? prev + 2 : 100);
      }, 30);
      return () => clearInterval(interval);
    }, 800);

    const timer3 = setTimeout(() => {
      const interval = setInterval(() => {
        setCount3(prev => prev < 1000 ? prev + 20 : 1000);
      }, 20);
      return () => clearInterval(interval);
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isInView]);

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="text-center space-y-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsInView(true)}
        >
          {/* Main Heading */}
          <div className="space-y-6">
            <motion.h2 
              className="text-4xl lg:text-5xl text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Kezdd el ma a
              <span className="block">
                biztos növekedést
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Csatlakozz azokhoz a magyar vállalkozásokhoz, akik már nem próbálgatással, 
              hanem bizonyított módszerekkel építik fel a sikeres üzletüket.
            </motion.p>
          </div>
          
          {/* Animated Stats */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 py-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-3xl text-gray-900 mb-2">
                {count1}+
              </div>
              <div className="text-gray-700 text-sm">Bizonyított szakértő</div>
              <div className="text-gray-500 text-xs mt-1">Valós eredményekkel</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-3xl text-gray-900 mb-2">
                {count2}+
              </div>
              <div className="text-gray-700 text-sm">Gyakorlati stratégia</div>
              <div className="text-gray-500 text-xs mt-1">Azonnal alkalmazható</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-3xl text-gray-900 mb-2">
                {count3}+
              </div>
              <div className="text-gray-700 text-sm">Sikeres implementáció</div>
              <div className="text-gray-500 text-xs mt-1">Mért eredményekkel</div>
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="cta-primary"
            >
              Platform felfedezése
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="cta-secondary"
            >
              Kapcsolatfelvétel
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white" />
                ))}
              </div>
              <span className="text-gray-600 text-sm">2000+ elégedett ügyfél</span>
            </div>

            <div className="h-4 w-px bg-gray-300 hidden sm:block" />

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm">4.9/5 értékelés</span>
            </div>

            <div className="h-4 w-px bg-gray-300 hidden sm:block" />

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-600 text-sm">30 napos garancia</span>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="border-t border-gray-200 pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-2 text-sm">Kérdésed van? Írj nekünk:</p>
            <a 
              href="mailto:hello@elira.hu" 
              className="text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              hello@elira.hu
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}