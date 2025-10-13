'use client';

import { motion } from 'motion/react';
import { SearchBar } from './SearchBar';
import { BookOpen, TrendingUp, Lightbulb, Sparkles } from 'lucide-react';

interface BlogHeroProps {
  title: string;
  subtitle: string;
  showSearch?: boolean;
}

export function BlogHero({ title, subtitle, showSearch = true }: BlogHeroProps) {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #16222F 0%, #2a3f5f 50%, #466C95 100%)'
      }}
    >
      {/* Enhanced gradient overlay with multiple layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-40" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(70, 108, 149, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        }} />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(70, 108, 149, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Enhanced Floating Badges with better animations */}
      <motion.div
        className="absolute top-24 left-12 hidden lg:flex px-5 py-3 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1.5px solid rgba(255, 255, 255, 0.3)',
          boxShadow: `0 12px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)`
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: [0, -12, 0],
          rotate: [0, 2, 0, -2, 0]
        }}
        transition={{
          opacity: { duration: 0.6 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm">Magyar KKV-k</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-36 right-20 hidden lg:flex px-5 py-3 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(167, 139, 250, 0.25))',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1.5px solid rgba(167, 139, 250, 0.4)',
          boxShadow: `0 12px 32px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)`
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: [0, 12, 0],
          rotate: [0, -2, 0, 2, 0]
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.2 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-purple-400/30 rounded-lg">
            <TrendingUp className="w-4 h-4 text-purple-100" />
          </div>
          <span className="text-white font-semibold text-sm">Növekedés</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-24 hidden lg:flex px-5 py-3 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(96, 165, 250, 0.25))',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1.5px solid rgba(96, 165, 250, 0.4)',
          boxShadow: `0 12px 32px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)`
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: [-5, 5, -5],
          y: [0, -8, 0]
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.4 },
          x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-blue-400/30 rounded-lg">
            <Lightbulb className="w-4 h-4 text-blue-100" />
          </div>
          <span className="text-white font-semibold text-sm">Stratégia</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-12 hidden xl:flex px-5 py-3 rounded-2xl"
        style={{
          background: 'rgba(34, 197, 94, 0.25)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1.5px solid rgba(74, 222, 128, 0.4)',
          boxShadow: `0 12px 32px rgba(34, 197, 94, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)`
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: [0, -10, 0],
          rotate: [0, 3, 0]
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6 },
          x: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 },
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-green-400/30 rounded-lg">
            <Sparkles className="w-4 h-4 text-green-100" />
          </div>
          <span className="text-white font-semibold text-sm">AI Insights</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <motion.div
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-2.5 h-2.5 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-white font-semibold text-sm tracking-wide">Friss tartalmak hetente</span>
            </motion.div>
          </motion.div>

          {/* Enhanced Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            style={{
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            {title}
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}
          >
            {subtitle}
          </motion.p>

          {/* Enhanced Stats with glass cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-6 sm:pt-8"
          >
            <motion.div
              className="text-center px-4 sm:px-8 py-4 sm:py-5 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className="text-3xl sm:text-4xl font-bold text-white mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 200 }}
              >
                10+
              </motion.div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Cikk</div>
            </motion.div>

            <div className="w-px h-10 sm:h-14 bg-white/20"></div>

            <motion.div
              className="text-center px-4 sm:px-8 py-4 sm:py-5 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className="text-3xl sm:text-4xl font-bold text-white mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
              >
                2
              </motion.div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Kategória</div>
            </motion.div>

            <div className="w-px h-10 sm:h-14 bg-white/20"></div>

            <motion.div
              className="text-center px-4 sm:px-8 py-4 sm:py-5 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className="text-3xl sm:text-4xl font-bold text-white mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9, type: "spring", stiffness: 200 }}
              >
                Új
              </motion.div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Hetente</div>
            </motion.div>
          </motion.div>

          {/* Search Bar */}
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-8"
            >
              <SearchBar />
            </motion.div>
          )}
        </motion.div>
      </div>

    </section>
  );
}
