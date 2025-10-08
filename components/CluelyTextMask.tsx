'use client';

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

export function CluelyTextMask() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Text content matching Cluely's exact layout
  const textLines = [
    { text: "Adatelemzés.", words: ["Adatelemzés."] },
    { text: "Stratégiaalkotás.", words: ["Stratégiaalkotás."] },
    { text: "Üzletfejlesztés.", words: ["Üzletfejlesztés."] },
    { text: "Tréningek.", words: ["Tréningek."] },
    { text: "Igazán minden.", words: ["Igazán", "minden."] }
  ];

  // Calculate which line should be active based on scroll
  const activeLineIndex = useTransform(scrollYProgress, [0, 1], [0, textLines.length - 1]);
  const [currentActiveLine, setCurrentActiveLine] = useState(1); // Start with "Stratégiaalkotás" active

  useEffect(() => {
    const unsubscribe = activeLineIndex.on("change", (latest) => {
      setCurrentActiveLine(Math.round(latest));
    });
    return unsubscribe;
  }, [activeLineIndex]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[150vh] bg-gray-100 overflow-hidden"
    >
      {/* Video Background - Hidden but playing */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        style={{ zIndex: 1 }}
      >
        <source src="/u9627734718_straight_on_eye_level_frame_of_a_90s_computer_set_6d598f5c-3c75-4361-a3aa-abd99a4153f2_1.mp4" type="video/mp4" />
      </video>

      <div className="sticky top-0 h-screen flex flex-col justify-center relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Title - Exact Cluely positioning */}
          <motion.h2 
            className="text-black text-xl font-normal mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Itt az idő a változásra
          </motion.h2>

          {/* Main Text Lines - Exact Cluely layout */}
          <div className="space-y-0">
            {textLines.map((line, index) => {
              const isActive = currentActiveLine === index;
              
              return (
                <div key={index} className="relative leading-[0.85]">
                  {/* Background video for this line when active */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 z-0"
                      style={{
                        clipPath: 'text',
                        WebkitClipPath: 'text',
                      }}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src="/u9627734718_straight_on_eye_level_frame_of_a_90s_computer_set_6d598f5c-3c75-4361-a3aa-abd99a4153f2_1.mp4" type="video/mp4" />
                      </video>
                    </div>
                  )}

                  {/* Text with video mask effect */}
                  <h3 
                    className="text-8xl lg:text-9xl xl:text-[12rem] font-black leading-[0.85] tracking-tighter relative z-10"
                    style={{
                      color: isActive ? 'transparent' : 'rgba(0,0,0,0.08)',
                      background: isActive ? 'url(/u9627734718_straight_on_eye_level_frame_of_a_90s_computer_set_6d598f5c-3c75-4361-a3aa-abd99a4153f2_1.mp4)' : 'none',
                      backgroundSize: isActive ? 'cover' : 'auto',
                      backgroundPosition: isActive ? 'center' : 'initial',
                      WebkitBackgroundClip: isActive ? 'text' : 'unset',
                      backgroundClip: isActive ? 'text' : 'unset',
                      WebkitTextFillColor: isActive ? 'transparent' : 'rgba(0,0,0,0.08)',
                      transition: 'all 0.6s ease',
                      textShadow: !isActive ? 'inset 0 2px 4px rgba(0,0,0,0.02)' : 'none',
                    }}
                  >
                    {line.words.map((word, wordIndex) => (
                      <span key={wordIndex} className={wordIndex > 0 ? 'ml-4' : ''}>
                        {word}
                      </span>
                    ))}
                  </h3>

                  {/* Alternative approach using CSS mask */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        background: `url('/u9627734718_straight_on_eye_level_frame_of_a_90s_computer_set_6d598f5c-3c75-4361-a3aa-abd99a4153f2_1.mp4')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        WebkitMask: `linear-gradient(black, black)`,
                        mask: `linear-gradient(black, black)`,
                        WebkitMaskComposite: 'source-in',
                        maskComposite: 'intersect',
                      }}
                    >
                      <h3 
                        className="text-8xl lg:text-9xl xl:text-[12rem] font-black leading-[0.85] tracking-tighter opacity-0"
                        style={{
                          WebkitMask: 'linear-gradient(black, black)',
                          mask: 'linear-gradient(black, black)',
                        }}
                      >
                        {line.words.map((word, wordIndex) => (
                          <span key={wordIndex} className={wordIndex > 0 ? 'ml-4' : ''}>
                            {word}
                          </span>
                        ))}
                      </h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button - Exact Cluely positioning */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue hover:bg-blue-light text-white text-sm rounded-lg font-medium transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Próbáld ki most
            </button>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for video text mask */}
      <style jsx global>{`
        .video-text-mask {
          background: url('/u9627734718_straight_on_eye_level_frame_of_a_90s_computer_set_6d598f5c-3c75-4361-a3aa-abd99a4153f2_1.mp4');
          background-size: cover;
          background-position: center;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
      `}</style>
    </section>
  );
}