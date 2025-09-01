'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp, Clock, DollarSign } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      message: "Cégvezetőként eddig is használtam AI-t, de a kurzus új szintre emelte a hatékonyságot, főleg az AI hírlevelek készítésében. Nemcsak sablonokat kaptam, hanem egy szemléletet is, amivel gyorsabban és eredményesebben tudunk kommunikálni az ügyfelekkel. Számomra ez egyértelműen befektetés, ami már most megtérült.",
      name: "Dienes Martin",
      position: "Ügyvezető",
      company: "Dma ponthu Kft.",
      rating: 5,
      avatar: "/dienes-martin1.png"
    },
    {
      id: 2,
      message: "Napi szinten használom az AI-t a munkámban, viszont éreztem, hogy több van ebben és tudnám hatékonyabban is használni. Konkrét prompt íráshoz kerestem sablonokat, akkor találtam rá a kurzusra. Így hát ha kész prompt sablonok mellett még tanulhatok is a jövőről, miért is ne, megvettem. Abszolút nem bántam meg, életem egyik leghasznosabb kurzusa volt, amivel úgy érzem egy magasabb szintre emelhetem a munkám.",
      name: "Kecskeméti Ádám",
      position: "Projekt menedzser",
      company: "",
      rating: 5,
      avatar: "/IMG_1452 1.png"
    }
  ];

  const results = [
    {
      icon: TrendingUp,
      value: "73%",
      label: "átlag konverzió növekedés",
      color: "text-green-600"
    },
    {
      icon: Clock,
      value: "80%", 
      label: "időmegtakarítás szövegírásnál",
      color: "text-blue-600"
    },
    {
      icon: DollarSign,
      value: "2.4x",
      label: "ROAS javulás kampányoknál", 
      color: "text-purple-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="testimonials" className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/20 mb-8">
              <TrendingUp className="w-6 h-6" />
              <span className="font-bold text-lg">📈 EREDMÉNYEK ÉS VISSZAJELZÉSEK</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Mit mondanak, akik már <span className="text-teal-400">használják:</span>
            </h2>
          </motion.div>

          {/* Testimonials Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mb-16"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 relative overflow-hidden">
              
              {/* Navigation Buttons */}
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Testimonial Content */}
              <div className="px-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-teal-400 mx-auto mb-6" />
                    
                    {/* Testimonial Message */}
                    <blockquote className="text-xs md:text-sm font-medium text-white mb-8 leading-relaxed max-w-xl mx-auto">
                      "{testimonials[currentIndex].message}"
                    </blockquote>
                    
                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Author Info */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-white/20">
                        <img 
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="text-white font-bold text-lg">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-teal-300 font-medium">
                          {testimonials[currentIndex].position}
                        </div>
                        {testimonials[currentIndex].company && (
                          <div className="text-teal-200 text-sm">
                            {testimonials[currentIndex].company}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex 
                        ? 'bg-teal-400 scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfRJ-hWzGa1qxZ7luJr_en2Pk1_O4SrKaCyliiShfSHEg87VA/viewform?usp=sharing&ouid=113299212479349141514"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl hover:bg-white/15 text-white border-2 border-white/30 hover:border-white/50 px-6 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <span className="text-xl">🎁</span>
                <span>ELŐSZÖR AZ INGYENES VIDEÓT KÉREM</span>
              </motion.a>
              
              <PurchaseButton 
                courseId="ai-copywriting-course"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;