'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock, 
  HelpCircle,
  Book,
  CreditCard,
  Shield,
  Users,
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
    question: 'Hogyan férek hozzá a megvásárolt kurzushoz?',
    answer: 'A vásárlás után azonnal email-ben megkapod a bejelentkezési adatokat. A kurzushoz a dashboard-on keresztül férsz hozzá, ahol minden megvásárolt kurzusod megtalálható.'
  },
  {
    category: 'Általános',
    question: 'Mennyi ideig férek hozzá a kurzushoz?',
    answer: 'Lifetime hozzáférést biztosítunk! Ez azt jelenti, hogy egyszer fizetsz, és örökre hozzáférsz a kurzushoz, beleértve az összes jövőbeli frissítést is.'
  },
  {
    category: 'Fizetés',
    question: 'Milyen fizetési módokat fogadtok el?',
    answer: 'Bankkártyát (Visa, Mastercard), Apple Pay-t és Google Pay-t fogadunk el. A fizetés biztonságos Stripe rendszeren keresztül történik.'
  },
  {
    category: 'Fizetés',
    question: 'Kapok számlát a vásárlásról?',
    answer: 'Igen, minden vásárlásról automatikusan állítunk ki elektronikus számlát, amit email-ben küldünk el.'
  },
  {
    category: 'Fizetés',
    question: 'Van pénzvisszafizetési garancia?',
    answer: 'Igen, 30 napos pénzvisszafizetési garanciát vállalunk. Ha nem vagy elégedett a kurzussal, visszatérítjük a teljes vételárat.'
  },
  {
    category: 'Technikai',
    question: 'Milyen eszközön nézhetem a kurzust?',
    answer: 'A kurzus bármilyen eszközön nézhető: számítógépen, tableten és mobilon is. Csak internetkapcsolat szükséges.'
  },
  {
    category: 'Technikai',
    question: 'Le tudom tölteni a videókat?',
    answer: 'A videók streaming formátumban érhetők el, közvetlen letöltés nem lehetséges. Azonban a kurzushoz tartozó anyagok (PDF-ek, sablonok) letölthetők.'
  },
  {
    category: 'Kurzus',
    question: 'Kinek ajánlott az AI Copywriting kurzus?',
    answer: 'Vállalkozóknak, marketingeseknek, freelancereknek és mindenkinek, aki szeretné megtanulni az AI-alapú szövegírás titkait.'
  },
  {
    category: 'Kurzus',
    question: 'Szükséges előzetes tudás?',
    answer: 'Nem szükséges előzetes tudás! A kurzus az alapoktól indul, és lépésről lépésre vezet végig a folyamaton.'
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
    alert('Üzeneted elküldtük! Hamarosan válaszolunk.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-cyan-600 opacity-90" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ügyfélszolgálat
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Segítünk minden kérdésedben! Válassz az alábbi lehetőségek közül.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Mail className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Írj nekünk bármikor</p>
            <a href="mailto:info@elira.hu" className="text-teal-600 font-semibold hover:underline">
              info@elira.hu
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-cyan-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Azonnali segítség</p>
            <button className="text-cyan-600 font-semibold hover:underline">
              Chat indítása
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Válaszidő</h3>
            <p className="text-gray-600 mb-4">Általában 24 órán belül</p>
            <span className="text-purple-600 font-semibold">H-P: 9:00 - 17:00</span>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gyakran Ismételt Kérdések
            </h2>
            <p className="text-xl text-gray-600">
              A leggyakoribb kérdések és válaszok egy helyen
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 pl-8">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Nem találtad a választ? Írj nekünk!
          </h2>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Név *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Teljes neved"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tárgy *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Miben segíthetünk?"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Üzenet *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                placeholder="Írd le részletesen a kérdésed vagy problémád..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Üzenet küldése
            </button>
          </form>
        </motion.div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              További segítség
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-200"
            >
              <Book className="w-12 h-12 text-teal-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Útmutatók</h3>
              <p className="text-sm text-gray-600">Részletes leírások</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-200"
            >
              <CreditCard className="w-12 h-12 text-cyan-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Számlázás</h3>
              <p className="text-sm text-gray-600">Fizetési információk</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-200"
            >
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Biztonság</h3>
              <p className="text-sm text-gray-600">Adatvédelem</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-200"
            >
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Közösség</h3>
              <p className="text-sm text-gray-600">Discord csoportunk</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}