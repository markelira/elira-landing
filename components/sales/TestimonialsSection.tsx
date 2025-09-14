'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp, Clock, DollarSign } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';
import VideoSelectionModal from '@/components/modals/VideoSelectionModal';

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      message: "Cégvezetőként eddig is használtam AI-t, de a kurzus új szintre emelte a hatékonyságot, főleg az AI posztok és blogok készítésében. Nemcsak sablonokat kaptam, hanem egy szemléletet is, amivel gyorsabban és eredményesebben tudunk kommunikálni az ügyfelekkel. Számomra ez egyértelműen befektetés, ami már most megtérült.",
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
    },
    {
      id: 3,
      message: "A modul összességében egy modern, értékközpontú és inspiráló tanulási élményt kínál, amely valóban hozzájárul a digitális kompetenciák fejlesztéséhez. A tananyag kimagaslóan gyakorlatorientált, hiszen minden modulban konkrét, azonnal alkalmazható jó gyakorlatok jelennek meg. A videós tartalmak jól strukturáltak, valós példákkal mutatják be a digitális marketing kulcsterületeit. A tananyag felhasználóbarát felépítése és vizuálisan támogatott bemutatása segíti a gyors megértést.",
      name: "Dr. Hajdú Noémi",
      position: "rektorhelyettesi referens, egyetemi docens",
      company: "Miskolci Egyetem, Marketing és Turizmus Intézet",
      rating: 5,
      avatar: "/hajdu-noemi.jpeg"
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
    <section id="testimonials" className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Floating testimonial bubbles animation */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-teal-100 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-100 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 rounded-full border border-teal-200 shadow-sm mb-6 hover:shadow-md transition-all duration-300">
              <TrendingUp className="w-5 h-5 text-teal-600 animate-pulse" />
              <span className="font-medium text-gray-900">Eredmények és visszajelzések</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Mit mondanak, akik már használják:
            </h2>
          </motion.div>

          {/* Testimonials Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mb-12"
          >
            <div className="bg-gradient-to-br from-white via-gray-50/50 to-white rounded-xl border border-gray-200 p-8 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Decorative quote pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <Quote className="w-full h-full text-gray-900" />
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-lg rounded-full p-2 transition-all duration-200 group"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-lg rounded-full p-2 transition-all duration-200 group"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              {/* Testimonial Content */}
              <div className="px-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                  >
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    
                    {/* Testimonial Message */}
                    <blockquote className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                      "{testimonials[currentIndex].message}"
                    </blockquote>
                    
                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Author Info */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                        <img 
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="text-gray-900 font-semibold">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-gray-600 font-medium text-sm">
                          {testimonials[currentIndex].position}
                        </div>
                        {testimonials[currentIndex].company && (
                          <div className="text-gray-500 text-xs">
                            {testimonials[currentIndex].company}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex 
                        ? 'bg-gray-600' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>🎁</span>
                <span>Válassz egyet az 5 modulból ingyen</span>
              </motion.button>
              
              <PurchaseButton 
                courseId="ai-copywriting-course"
              />
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Video Selection Modal */}
      <VideoSelectionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default TestimonialsSection;