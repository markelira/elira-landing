'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Video, ChevronLeft, ChevronRight, Trophy, Heart, Scissors, Bot } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'webinar' | 'meeting';
  date: Date;
  time: string;
  duration: string;
  description?: string;
  theme?: {
    color: string;
    bgColor: string;
    icon: React.ComponentType<any>;
    gradientFrom: string;
    gradientTo: string;
  };
}

const CalendarSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 6)); // October 6, 2025
  
  // Masterclass events with exact dates and times
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: '7 napos győzelem protokoll',
      type: 'webinar',
      date: new Date(2025, 9, 6), // October 6
      time: '16:30',
      duration: '1 óra',
      description: 'A masterclass tartalmát 7 nap alatt működő rendszerré alakítjuk',
      theme: {
        color: 'text-amber-600',
        bgColor: 'bg-amber-100',
        icon: Trophy,
        gradientFrom: 'from-amber-500',
        gradientTo: 'to-yellow-500'
      }
    },
    {
      id: '2',
      title: 'Érzelmi értékesítés mesterfolyamat - webinár',
      type: 'webinar',
      date: new Date(2025, 9, 14), // October 14
      time: '17:00',
      duration: '1 óra',
      description: 'A 7 pszichológiai trigger, ami minden vásárlási döntést irányít - és hogyan használd őket.',
      theme: {
        color: 'text-rose-600',
        bgColor: 'bg-rose-100',
        icon: Heart,
        gradientFrom: 'from-rose-500',
        gradientTo: 'to-pink-500'
      }
    },
    {
      id: '3',
      title: 'Élő copy boncolás webinár',
      type: 'webinar',
      date: new Date(2025, 9, 20), // October 20
      time: '16:30',
      duration: '1 óra',
      description: 'A Ti marketing anyagaitokat elemezzük élőben és megmutatjuk, mit kell megváltoztatni több vevőért',
      theme: {
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        icon: Scissors,
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-500'
      }
    },
    {
      id: '4',
      title: 'AI szöveg humanizáló webinár',
      type: 'webinar',
      date: new Date(2025, 9, 21), // October 21
      time: '17:00',
      duration: '1 óra',
      description: 'Lépésről lépésre megmutatjuk, hogyan tedd hitelesé és eladhatóvá az AI által generált szövegeket',
      theme: {
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100',
        icon: Bot,
        gradientFrom: 'from-emerald-500',
        gradientTo: 'to-teal-500'
      }
    }
  ];

  const startDate = new Date(2025, 9, 6); // October 6
  const endDate = new Date(2025, 9, 31); // October 31

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateInRange = (date: Date) => {
    return date >= startDate && date <= endDate;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-11"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isInRange = isDateInRange(date);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <motion.div
          key={day}
          whileHover={isInRange ? { scale: 1.02 } : {}}
          whileTap={isInRange ? { scale: 0.98 } : {}}
          className={`
            h-11 w-11 sm:h-11 sm:w-auto min-h-[44px] min-w-[44px] flex flex-col items-center justify-center rounded-full cursor-pointer relative backdrop-blur-xl
            transition-all duration-200 ease-out
            ${isInRange 
              ? `bg-white/80 border border-gray-200/60 hover:bg-white/90 hover:border-gray-300/80 hover:shadow-md shadow-sm
                 active:bg-gray-50/90` 
              : 'bg-gray-100/50 text-gray-400/70 cursor-not-allowed border border-transparent'
            }
            ${isToday && isInRange ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25' : ''}
            ${dayEvents.length > 0 && !isToday && isInRange ? `bg-gradient-to-br ${dayEvents[0].theme?.gradientFrom || 'from-blue-500'} ${dayEvents[0].theme?.gradientTo || 'to-blue-600'} border-current text-white shadow-lg shadow-current/30 hover:shadow-lg` : ''}
          `}
        >
          <span className={`text-sm font-medium transition-colors duration-200 ${
            isToday && isInRange 
              ? 'text-white' 
              : dayEvents.length > 0 && isInRange
                ? 'text-white font-semibold'
              : isInRange 
                ? 'text-gray-900' 
                : 'text-gray-400/70'
          }`}>
            {day}
          </span>
          
          {/* Today indicator for events */}
          {dayEvents.length > 0 && isToday && (
            <div className="flex gap-1 absolute bottom-1">
              {dayEvents.slice(0, 3).map((event, index) => (
                <div
                  key={event.id}
                  className="w-1 h-1 rounded-full bg-white/80"
                />
              ))}
            </div>
          )}
          
          {/* Event indicator for highlighted dates */}
          {dayEvents.length > 0 && !isToday && (
            <div className="flex gap-1 absolute bottom-1">
              {dayEvents.slice(0, 3).map((event, index) => (
                <div
                  key={event.id}
                  className="w-1 h-1 rounded-full bg-white/90"
                />
              ))}
            </div>
          )}
        </motion.div>
      );
    }

    return days;
  };

  const monthNames = [
    'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
  ];

  const dayNames = ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'];

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 px-4 py-2 rounded-full shadow-sm mb-6 hover:shadow-md transition-all duration-300">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span className="font-medium text-gray-900">Masterclass naptár</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Mikor találkozunk?
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pontosan látod, mikor lesznek a webinárok. 
              Minden dátum előre rögzített, így tervezheted az idődet.
            </p>
            
            {/* Notice card for 1:1 meetings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-6 max-w-2xl mx-auto"
            >
              <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 mb-2">
                      1:1 Meeting időpontok
                    </h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      A személyes konzultációk időpontjai <span className="font-medium text-orange-700">rugalmasan egyeztethetők</span>. 
                      A jelentkezés után azonnal felvesszük veled a kapcsolatot, hogy megbeszéljük a számodra megfelelő időpontokat.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile-first layout: Events first, then calendar */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Calendar - Hidden on mobile, shows on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="hidden lg:block lg:col-span-2 order-2 lg:order-1"
            >
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white/60 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
                
                {/* Calendar Header */}
                <div className="bg-white/40 backdrop-blur-xl p-6 border-b border-white/30">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                      className="p-3 min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-white/60 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={currentDate.getMonth() === 9} // October
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    
                    <h3 className="text-xl font-semibold text-gray-900">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    
                    <button
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                      className="p-3 min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-white/60 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={currentDate.getMonth() === 9} // Only October for now
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="p-8">
                  {/* Day names */}
                  <div className="grid grid-cols-7 gap-3 mb-6">
                    {dayNames.map((day) => (
                      <div key={day} className="h-10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-500 tracking-wide">{day}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-3">
                    {renderCalendarDays()}
                  </div>
                </div>
                
                {/* Legend */}
                <div className="bg-white/30 backdrop-blur-xl p-6 border-t border-white/40">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-md"></div>
                      <span className="text-gray-700 font-medium">Győzelem protokoll</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-md"></div>
                      <span className="text-gray-700 font-medium">Érzelmi értékesítés</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-md"></div>
                      <span className="text-gray-700 font-medium">Copy boncolás</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-md"></div>
                      <span className="text-gray-700 font-medium">AI humanizáló</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile-only: Compact Date Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:hidden order-1 mb-6"
            >
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/60 shadow-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Webinár dátumok - Október 2025</h4>
                <div className="flex justify-center gap-2 flex-wrap">
                  {events.map((event, index) => (
                    <div key={event.id} className="text-center">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md bg-gradient-to-br ${event.theme?.gradientFrom || 'from-blue-500'} ${event.theme?.gradientTo || 'to-blue-600'}`}>
                        {event.date.getDate()}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{event.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Event List - Priority on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-2 lg:order-2"
            >
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white/60 p-6 sm:p-8 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <span className="lg:hidden">Webinár programok</span>
                  <span className="hidden lg:inline">Következő események</span>
                </h4>
                
                <div className="space-y-4">
                  {events
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 5)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="p-5 bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl hover:bg-white/70 hover:border-white/80 hover:shadow-lg transition-all duration-300 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md transition-all duration-300 bg-gradient-to-br ${event.theme?.gradientFrom || 'from-blue-500'} ${event.theme?.gradientTo || 'to-blue-600'} text-white`}>
                            {event.theme?.icon ? (
                              <event.theme.icon className="w-5 h-5" />
                            ) : (
                              <Video className="w-5 h-5" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-gray-900 mb-1">
                              {event.title}
                            </h5>
                            {event.description && (
                              <p className="text-sm text-gray-600 mb-2">
                                {event.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>
                                {event.date.toLocaleDateString('hu-HU', { 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </span>
                              <span>{event.time}</span>
                              <span>{event.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                
                {events.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Események hamarosan...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Purchase CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <PurchaseButton 
              courseId="ai-copywriting-course"
              className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;