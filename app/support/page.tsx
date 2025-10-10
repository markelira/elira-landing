'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PremiumHeader } from '@/components/PremiumHeader';
import { PremiumFooter } from '@/components/PremiumFooter';
import {
  MessageSquare,
  Mail,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Általános',
    question: 'Hogyan férhet hozzá egy megvásárolt programhoz?',
    answer: 'A vásárlás után azonnal email-ben megkapja a bejelentkezési adatokat. A programokhoz a dashboard-on keresztül férhet hozzá, ahol minden megvásárolt tartalma megtalálható.'
  },
  {
    category: 'Általános',
    question: 'Mennyi ideig érhető el a tartalom?',
    answer: 'Korlátlan időtartamú hozzáférést biztosítunk. Ez azt jelenti, hogy egyszeri vásárlással tartósan hozzáférhet a programhoz, beleértve az összes jövőbeli frissítést is.'
  },
  {
    category: 'Fizetés',
    question: 'Milyen fizetési módokat fogadunk el?',
    answer: 'Bankkártyát (Visa, Mastercard), Apple Pay-t és Google Pay-t fogadunk el. A fizetés biztonságos Stripe rendszeren keresztül történik.'
  },
  {
    category: 'Fizetés',
    question: 'Automatikusan kiállításra kerül számla?',
    answer: 'Igen, minden vásárlásról automatikusan elektronikus számlát állítunk ki, amelyet email-ben küldünk el.'
  },
  {
    category: 'Fizetés',
    question: 'Elérhető pénzvisszafizetési garancia?',
    answer: 'Igen, 30 napos pénzvisszafizetési garanciát vállalunk. Ha nem felel meg az elvárásainak, visszatérítjük a teljes vételárat.'
  },
  {
    category: 'Technikai',
    question: 'Milyen eszközökön érhető el a tartalom?',
    answer: 'A tartalom bármilyen eszközön elérhető: számítógépen, tableten és mobilon egyaránt. Csak internetkapcsolat szükséges.'
  },
  {
    category: 'Technikai',
    question: 'Letölthetők a videók offline megtekintésre?',
    answer: 'A videók streaming formátumban érhetők el, közvetlen letöltés nem lehetséges. Azonban a programokhoz tartozó anyagok (PDF-ek, sablonok) letölthetők.'
  },
  {
    category: 'Programok',
    question: 'Kinek ajánlott a mikrokurzus?',
    answer: 'Vállalkozóknak, alapítóknak és szakembereknek, akik azonnal alkalmazható megoldásokat keresnek konkrét üzleti kihívásokra.'
  },
  {
    category: 'Programok',
    question: 'Szükséges előzetes szakmai tapasztalat?',
    answer: 'Nem szükséges előzetes szakmai tapasztalat. A programok az alapoktól építkeznek, és strukturált módon vezetik végig a résztvevőket.'
  }
];

export default function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Összes');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const categories = ['Összes', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  const filteredFAQs = selectedCategory === 'Összes' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Az üzenet sikeresen elküldve. Csapatunk hamarosan válaszol.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] overflow-hidden -mt-20 pt-20 flex items-center"
        style={{
          background: 'linear-gradient(to bottom, #16222F 0%, #466C95 100%)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-white">
                Támogatás
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Professzionális támogatás minden lépésben. Válaszokat adunk kérdéseire, segítünk a megoldások megtalálásában.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email kapcsolat</h3>
              <p className="text-gray-600 text-sm mb-4">Részletes kérdések és dokumentáció</p>
              <a href="mailto:info@elira.hu" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                info@elira.hu
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Azonnali üzenetváltás</h3>
              <p className="text-gray-600 text-sm mb-4">Technikai támogatás és tanácsadás</p>
              <button className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                Kapcsolatfelvétel
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Válaszidő</h3>
              <p className="text-gray-600 text-sm mb-4">Szakmai támogatás munkaidőben</p>
              <span className="text-purple-600 font-semibold">H-P: 9:00 - 17:00</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Gyakran Ismételt Kérdések
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Gyors válaszok a leggyakoribb kérdésekre
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.question}</span>
                  </div>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-2">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-8">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 tracking-tight">
                Kérdése van?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Vegye fel velünk a kapcsolatot és csapatunk hamarosan válaszol
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm">
                    Név *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="Teljes név"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="email@ceg.hu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">
                  Tárgy *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="Miben segíthetünk"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">
                  Üzenet *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-gray-900"
                  placeholder="Részletes leírás..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 sm:py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Üzenet küldése
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}