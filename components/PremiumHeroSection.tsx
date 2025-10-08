import { Button } from "./ui/button";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function PremiumHeroSection() {
  const questions = [
    "Szakértőink mind mért eredményekkel rendelkeznek abban, amit oktatnak.",
    "Nem általános best practice-eket tanítunk, hanem konkrét, magyar piacon tesztelt és validált módszereket.",
    "A masterclassok tartalmazzák a teljes implementációs keretrendszert",
    "A hagyományos tanácsadói szolgáltatások töredékéért érhető el senior szintű tudás, strukturált formában, skálázhatóan."
  ];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  const typingSpeed = isDeleting ? 30 : 50;
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentQuestion.length) {
          setDisplayedText(currentQuestion.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedText(currentQuestion.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentQuestion, currentQuestionIndex, typingSpeed, questions.length]);

  return (
    <section className="relative min-h-screen overflow-hidden -mt-20 pt-20 bg-gradient-to-b from-blue-50/30 via-white to-white">
      {/* Dynamic geometric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-transparent" />

        {/* Animated geometric elements - more subtle and professional */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-32 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-purple-100/30 to-pink-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '3s' }} />
        <div className="absolute bottom-32 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-indigo-100/30 to-blue-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '5s' }} />

        {/* Professional grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(71, 85, 105, 0.12) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(71, 85, 105, 0.12) 1px, transparent 1px)
               `,
               backgroundSize: '80px 80px'
             }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 pt-24 pb-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12 min-h-[70vh] flex flex-col justify-center">

          {/* Centered Content */}
          <div className="space-y-10">
            {/* Corporate Badge - Centered */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
                   style={{
                     background: 'rgba(255, 255, 255, 0.8)',
                     backdropFilter: 'blur(20px) saturate(150%)',
                     WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                     border: '1px solid rgba(99, 102, 241, 0.15)',
                     boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                   }}>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">Startupoktól Nagyvállalatokig</span>
                </div>
                <div className="h-4 w-px bg-gray-300/40"></div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-0.5 bg-gray-300/40"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                    <div className="w-3 h-0.5 bg-gray-300/40"></div>
                    <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                  </div>
                  <span className="text-xs text-gray-700 ml-2">Minden méretben</span>
                </div>
              </div>
            </motion.div>

            {/* Main Headlines - Centered */}
            <motion.div
              className="space-y-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-gray-900">
                Ahol adatokból stratégia,
                <br />
                <span className="text-gray-900">stratégiából növekedés lesz.</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Összekötjük a bizonyított eredményekkel rendelkező szakértőket azokkal a cégvezetőkkel és csapatokkal, akik nem próbálgatni akarnak, hanem működő rendszerek mentén fejlődni.
              </p>
            </motion.div>

            {/* Action Buttons - Centered */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="cta-primary shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Próbáld ki ingyen</span>
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="bg-white/80 backdrop-blur-sm text-gray-900 border border-gray-300 hover:bg-white hover:border-gray-400 transition-all shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Masterclassok felfedezése</span>
              </Button>
            </motion.div>
          </div>

          {/* Question Card - Centered Below with Fixed Width - 40% Smaller */}
          <div className="w-full max-w-2xl mx-auto">

            {/* Question interface with typewriter effect - Cluely Style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
            <div className="rounded-[20px] px-6 py-7 text-left relative overflow-hidden bg-white/90 backdrop-blur-xl border border-gray-200/50"
                 style={{
                   boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.05)'
                 }}>

              {/* Question header with sparkle - Left aligned, gray text */}
              <div className="flex items-start gap-2 mb-5">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a1.5 1.5 0 00-1.006-1.006L15.75 7.5l1.035-.259a1.5 1.5 0 001.006-1.006L18 5.25l.259 1.035a1.5 1.5 0 001.006 1.006L20.25 7.5l-1.035.259a1.5 1.5 0 00-1.006 1.006zM16.894 17.801L16.5 19.5l-.394-1.699a1.5 1.5 0 00-1.215-1.215L13.5 16.5l1.699-.394a1.5 1.5 0 001.215-1.215L16.5 13.5l.394 1.699a1.5 1.5 0 001.215 1.215l1.391.085-1.699.395a1.5 1.5 0 00-1.215 1.215z" />
                </svg>
                <div className="flex-1">
                  <span className="text-sm text-gray-500 font-normal">Kérdés: </span>
                  <span className="text-sm text-gray-500 font-normal italic">"Miért használnám az Elira-t?"</span>
                </div>
              </div>

              {/* Main question - Bold, larger text */}
              <div className="mb-4">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 leading-snug">
                  Három fő oka van, hogy az Elira platformot választják:
                </h2>
              </div>

              {/* Typewriter effect area with fixed height */}
              <div className="flex items-start gap-2 mb-6 h-[50px]">
                <span className="text-base mt-0.5 text-gray-900 flex-shrink-0">•</span>
                <div className="flex-1">
                  <span className="text-base text-gray-900 leading-relaxed">
                    "{displayedText}
                    <span className="inline-block w-0.5 h-4 ml-1 animate-pulse bg-gray-900" />
                  </span>
                </div>
              </div>

              {/* Suggestion text - Bold, left aligned */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-900">
                  Javaslat: Görgess lejjebb, hogy lásd az Elira működését.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trust Section - Centered */}
          <motion.div
            className="mt-16 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-sm text-gray-600 mb-8 font-medium text-center">
              Megbíznak bennünk
            </p>

            {/* Static Testimonials - Centered */}
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
              {/* Dienes Martin - DMA */}
              <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <img
                  src="/cropped-dma-favicon-logo.png"
                  alt="DMA Logo"
                  className="h-8 w-20 object-contain"
                />
                <div className="text-center">
                  <div className="text-gray-900 font-medium text-sm">Dienes Martin</div>
                  <div className="text-gray-600 text-xs">Ügyvezető</div>
                </div>
              </div>

              {/* Dr. Hajdú Noémi - Miskolci Egyetem */}
              <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <img
                  src="/ME_Logo-2 (1).png"
                  alt="Miskolci Egyetem Logo"
                  className="h-8 w-20 object-contain"
                />
                <div className="text-center">
                  <div className="text-gray-900 font-medium text-sm">Dr. Hajdú Noémi</div>
                  <div className="text-gray-600 text-xs">Rektorhelyettesi referens</div>
                </div>
              </div>

              {/* Kecskeméti Ádám */}
              <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">KÁ</span>
                </div>
                <div className="text-center">
                  <div className="text-gray-900 font-medium text-sm">Kecskeméti Ádám</div>
                  <div className="text-gray-600 text-xs">Projekt menedzser</div>
                </div>
              </div>
            </div>
          </motion.div>
          </div>

        </div>
      </div>


      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(-8px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(5px); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </section>
  );
}