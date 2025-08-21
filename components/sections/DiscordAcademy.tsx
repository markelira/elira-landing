'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Hash, Headphones, Trophy, Calendar, Users, Zap, BookOpen, Coffee, Gamepad2 } from 'lucide-react';
import { useCommunityMetrics } from '@/hooks/useFirestore';
import dynamic from 'next/dynamic';

// Lazy load the widget to improve performance
const DiscordWidgetBot = dynamic(
  () => import('@/components/DiscordWidgetBot'),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-gray-100 rounded-xl h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Discord betöltése...</p>
        </div>
      </div>
    )
  }
);

const DiscordAcademy: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState(0);
  const { totalMembers } = useCommunityMetrics();

  const channels = [
    {
      emoji: "💬",
      name: "general-chat",
      description: "Ismerkedj a közösséggel",
      icon: MessageSquare,
      color: "blue"
    },
    {
      emoji: "❓",
      name: "gyors-kerdesek",
      description: "5 percen belül válasz",
      icon: Hash,
      color: "green"
    },
    {
      emoji: "💼",
      name: "karrier-tanácsok",
      description: "CV review, interview prep",
      icon: Trophy,
      color: "purple"
    },
    {
      emoji: "🔥",
      name: "napi-challenge",
      description: "Skill-building kihívások",
      icon: Zap,
      color: "orange"
    },
    {
      emoji: "🎓",
      name: "oktato-office-hours",
      description: "Heti 2x élő konzultáció",
      icon: Headphones,
      color: "indigo"
    }
  ];

  const weeklyEvents = [
    {
      day: "Hétfő",
      title: "Marketing Breakdown Session",
      time: "19:00",
      description: "Sikeres kampányok elemzése",
      icon: BookOpen
    },
    {
      day: "Szerda", 
      title: "Tech Tutorial Live",
      time: "20:00",
      description: "Új eszközök és tippek",
      icon: Gamepad2
    },
    {
      day: "Péntek",
      title: "Networking Mixer",
      time: "18:30",
      description: "Ismerkedés és tapasztalatcsere",
      icon: Coffee
    }
  ];


  return (
    <section id="discord" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Discord <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Akadémia</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ahol a Kérdéseid Válaszokat Kapnak és a Tanulás Sosem Áll Meg
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-700 font-medium">Élő Közösség</span>
            </div>
            <div className="text-gray-600">
              <span className="font-bold text-purple-600">{totalMembers || 127}+</span> aktív tag
            </div>
          </div>
        </div>

        {/* Live Discord Embed */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-4 lg:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                💬 Csatlakozz a beszélgetéshez!
              </h3>
              <a 
                href="https://discord.gg/qrdENUbW"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                Nyisd meg Discord-ban →
              </a>
            </div>
            
            {/* WidgetBot Embed */}
            <DiscordWidgetBot 
              height="500"
              className="rounded-lg overflow-hidden"
            />
            
            <div className="mt-4 text-center text-sm text-gray-600">
              👆 Chatelj közvetlenül a weboldalról vagy 
              <a 
                href="https://discord.gg/qrdENUbW"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline mx-1"
              >
                csatlakozz a teljes Discord szerverhez
              </a>
              minden funkcióért!
            </div>
          </div>
        </div>

        {/* Weekly Events */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">📅 Heti Események</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {weeklyEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <event.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{event.day}</div>
                    <div className="text-sm text-purple-600">{event.time}</div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{event.title}</h4>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            <span>🎁 Első 50 tag VIP role-t kap</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Kezdd El Ma az Utazást!
          </h3>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Csatlakozz {totalMembers || 127}+ motivált magyarhoz és építsd velünk a jövődet
          </p>
          
          <motion.a
            href="https://discord.gg/qrdENUbW"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Csatlakozom a Discord-hoz</span>
          </motion.a>
          
          <div className="mt-4 text-xs text-gray-500">
            Ingyenes • Bármikor kiléphetsz • Nincs spam
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscordAcademy;