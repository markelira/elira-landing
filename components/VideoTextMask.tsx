'use client';

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

export function VideoTextMask() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Define text segments with proper line breaks
  const textLines = [
    ["Stratégiáink", "adatokra épülnek."],
    ["Módszereink", "bizonyítottak."],
    ["Eredményeink", "mérhetőek."],
    ["Növekedésed", "garantált."]
  ];

  // Flatten for tracking
  const allSegments = textLines.flat();
  
  // Calculate which segment should be active based on scroll
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, allSegments.length - 1]);
  const [currentActive, setCurrentActive] = useState(0);

  useEffect(() => {
    const unsubscribe = activeIndex.on("change", (latest) => {
      setCurrentActive(Math.round(latest));
    });
    return unsubscribe;
  }, [activeIndex]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[200vh] bg-gray-50 py-32 overflow-hidden"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center space-y-8">
            {/* Section Title */}
            <motion.p 
              className="text-sm font-medium text-gray-500 uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ez tesz minket különlegessé
            </motion.p>

            {/* Main Text with Video Mask Effect */}
            <div className="relative">
              {/* Video Background - Hidden but used for masking */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0"
                aria-hidden="true"
              >
                <video
                  id="maskVideo"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/u9627734718_straight_on_eye_level_frame_of_a_90s_computer_set_6d598f5c-3c75-4361-a3aa-abd99a4153f2_1.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Text Lines */}
              <h2 className="text-6xl lg:text-8xl font-bold leading-[1.1]">
                {textLines.map((line, lineIndex) => (
                  <div key={lineIndex} className="mb-4">
                    {line.map((segment, segmentIndex) => {
                      const globalIndex = lineIndex * 2 + segmentIndex;
                      const isActive = currentActive === globalIndex;
                      
                      return (
                        <motion.span
                          key={`${lineIndex}-${segmentIndex}`}
                          className={`inline-block ${segmentIndex > 0 ? 'ml-3' : ''}`}
                          animate={{
                            scale: isActive ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                          style={{
                            position: 'relative',
                            color: isActive ? 'transparent' : '#d1d5db',
                            textShadow: !isActive ? 'inset 0 2px 8px rgba(0,0,0,0.06)' : 'none',
                            background: isActive 
                              ? `linear-gradient(90deg, 
                                  #16222F 0%, 
                                  #8b5cf6 25%, 
                                  #ec4899 50%, 
                                  #f59e0b 75%, 
                                  #10b981 100%)`
                              : 'none',
                            backgroundSize: isActive ? '200% 200%' : 'auto',
                            backgroundPosition: isActive ? '0% 50%' : 'center',
                            WebkitBackgroundClip: isActive ? 'text' : 'unset',
                            backgroundClip: isActive ? 'text' : 'unset',
                            WebkitTextFillColor: isActive ? 'transparent' : 'unset',
                            animation: isActive ? 'gradientShift 3s ease infinite' : 'none',
                            transition: 'all 0.6s ease',
                            filter: isActive ? 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))' : 'none',
                          }}
                        >
                          {segment}
                        </motion.span>
                      );
                    })}
                  </div>
                ))}
              </h2>
            </div>

            {/* Supporting Text */}
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Minden állításunk mögött valós adatok és mérhető eredmények állnak.
              Görgess végig, hogy lásd, miért választanak minket a legjobb cégek.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Add gradient animation keyframes */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes videoPlay {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
      `}</style>

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed bottom-10 right-10 w-16 h-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#e5e7eb"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray={176}
            strokeDashoffset={176}
            style={{
              strokeDashoffset: useTransform(scrollYProgress, [0, 1], [176, 0]),
              strokeLinecap: 'round'
            }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-600">
            {currentActive + 1}/{allSegments.length}
          </span>
        </div>
      </motion.div>
    </section>
  );
}