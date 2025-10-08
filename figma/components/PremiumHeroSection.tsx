import { Button } from "./ui/button";
import { motion } from "motion/react";
import { useState } from "react";

export function PremiumHeroSection() {
  const [question, setQuestion] = useState("Why would I even use Cluely?");
  
  const suggestions = [
    "When's the last time you froze in a meeting?",
    '"What do you think about..." responses',
    "Confident answers to unexpected questions",
    "Never be caught off guard again"
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50/30 via-gray-100/20 to-gray-50/20 overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-white/40 rounded-3xl backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-white/40 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-32 right-10 w-40 h-24 bg-white/40 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div className="text-center">
            <div className="w-8 h-8 bg-pink-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-xs font-medium text-gray-600">Smart AI</div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main heading */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl lg:text-7xl font-medium text-gray-900 leading-tight">
              Ahol adatokból stratégia,
              <br />
              <span className="text-gray-700">stratégiából növekedés lesz.</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Összekötjük a bizonyított eredményekkel rendelkező szakértőket azokkal a
              <br />
              cégvezetőkkel és csapatokkal, akik nem próbálgatni akarnak, hanem működő rendszereket építeni.
              <br />
              Mert a stratégia nem luxus - alapkövetelmény.
            </p>
          </motion.div>
          
          {/* Download buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="bg-blue hover:bg-blue-light text-white px-8 py-3 rounded-xl flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Díjmentes audit</span>
            </Button>
            
            <Button 
              size="lg" 
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3.449L.71 2.966l6.44 3.743v2.532L.71 12.984.001 12.5v-9.05zm8.025 4.547v2.532L24 .256 22.88 0 8.025 8z"/>
                <path d="M8.025 13.491v2.532L22.88 24 24 23.744 8.025 13.49z"/>
              </svg>
              <span>Masterclass</span>
            </Button>
          </motion.div>
          
          {/* Question interface */}
          <motion.div 
            className="max-w-2xl mx-auto mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-gray-500 font-medium">Question:</span>
                <span className="text-gray-400 italic">"{question}"</span>
              </div>
              
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-700">{suggestion}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}