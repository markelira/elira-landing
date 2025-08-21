'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Crown, Users, Clock, CheckCircle, XCircle, Mic, Calendar, Target } from 'lucide-react';
import { useUrgencyIndicators } from '@/hooks/useFirestore';

const WhatsAppVIP: React.FC = () => {
  const { vipSlotsLeft } = useUrgencyIndicators();

  const qualifiers = [
    {
      icon: CheckCircle,
      text: "Ha komolyan gondolod a fejlődést",
      type: "yes"
    },
    {
      icon: CheckCircle,
      text: "Ha napi 15 percet tudsz tanulásra szánni",
      type: "yes"
    },
    {
      icon: CheckCircle,
      text: "Ha szeretsz másokkal együtt növekedni",
      type: "yes"
    },
    {
      icon: XCircle,
      text: "Ha csak lurkolni akarsz",
      type: "no"
    },
    {
      icon: XCircle,
      text: "Ha nem vagy nyitott az új ötletekre",
      type: "no"
    }
  ];

  const exclusivePerks = [
    {
      icon: Clock,
      title: "Napi Motiváció & Actionable Tippek",
      description: "Minden reggel 7:00-kor friss tartalom",
      time: "📅 Minden nap"
    },
    {
      icon: Target,
      title: "Accountability Partner Program",
      description: "Találj valakit aki számon kér téged",
      time: "🤝 Heti párosítás"
    },
    {
      icon: Mic,
      title: "Voice Note Mentoring",
      description: "Oktatók személyes hangüzenetei",
      time: "🎙️ Heti 2-3x"
    },
    {
      icon: Crown,
      title: "VIP-Only Webinars",
      description: "Exkluzív online előadások",
      time: "📺 Havonta 2x"
    }
  ];

  // Using real VIP slots data from Firebase

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/whatsapp-pattern.svg')] opacity-5" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header with Hook */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <Crown className="w-4 h-4" />
            <span>FIGYELEM: Ez NEM Mindenkinek Való!</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            WhatsApp <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">VIP Belső Kör</span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Maximum 150 Fő. Ha Betelik, Várólistára Kerülsz.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Qualification Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                🔍 Ez Rád Illik?
              </h3>
              
              <div className="space-y-4">
                {qualifiers.map((qualifier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      qualifier.type === 'yes' 
                        ? 'bg-green-50 border-l-4 border-green-500' 
                        : 'bg-red-50 border-l-4 border-red-500'
                    }`}
                  >
                    <qualifier.icon className={`w-5 h-5 ${
                      qualifier.type === 'yes' ? 'text-green-600' : 'text-red-600'
                    }`} />
                    <span className={`font-medium ${
                      qualifier.type === 'yes' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {qualifier.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-8 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-200"
              >
                <div className="text-center">
                  <div className="font-bold text-green-800 mb-2">
                    Ha 3+ zöld pipára igent mondtál:
                  </div>
                  <div className="text-lg font-black text-green-900">
                    TE VAGY A MI EMBERÜNK! 🎯
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Scarcity Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">Jelenlegi Státusz</span>
                </div>
                <div className="text-sm text-gray-500">
                  Utolsó frissítés: most
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Összes hely:</span>
                  <span className="font-bold">150</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Foglalt:</span>
                  <span className="font-bold text-green-600">{150 - vipSlotsLeft}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Maradt:</span>
                  <span className="font-bold text-red-600">{vipSlotsLeft}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: `${(vipSlotsLeft / 150) * 100}%` }}
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                  />
                </div>
                
                <div className="text-xs text-center text-gray-500 mt-2">
                  {vipSlotsLeft < 30 && "⚠️ Kritikus szint! Hamarosan betelik!"}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Exclusive Perks & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                👑 VIP Exkluzív Előnyök
              </h3>
              
              <div className="space-y-5">
                {exclusivePerks.map((perk, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
                  >
                    <div className="flex-shrink-0 p-2 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors">
                      <perk.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{perk.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{perk.description}</p>
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                        {perk.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Main CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <motion.a
                  href="https://chat.whatsapp.com/KvMY8eiJ3iZIs1EgfskUQb"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-black py-4 px-6 rounded-xl text-center text-lg shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 hover:opacity-100 transition-opacity duration-200" />
                  <span className="relative flex items-center justify-center space-x-2">
                    <MessageCircle className="w-6 h-6" />
                    <span>Igen, Bent Akarok Lenni! 💪</span>
                  </span>
                </motion.a>
                
                <div className="text-center mt-4 text-sm text-gray-600">
                  <span>✨ 2 kattintás és bent vagy</span>
                  <br />
                  <span className="text-xs">Bármikor kiléphetsz, nincs kötelezettség</span>
                </div>
              </motion.div>
            </div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="font-bold text-gray-900 mb-4 text-center">🛡️ Miért Biztonságos?</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-600 font-semibold">✅ Moderált</div>
                  <div className="text-gray-600">és biztonságos</div>
                </div>
                <div className="text-center">
                  <div className="text-green-600 font-semibold">✅ Nincs spam</div>
                  <div className="text-gray-600">csak érték</div>
                </div>
                <div className="text-center">
                  <div className="text-green-600 font-semibold">✅ GDPR</div>
                  <div className="text-gray-600">compliant</div>
                </div>
                <div className="text-center">
                  <div className="text-green-600 font-semibold">✅ Kiléphetsz</div>
                  <div className="text-gray-600">bármikor</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppVIP;