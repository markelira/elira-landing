'use client';

import React, { useState } from 'react';
import { MessageSquare, Hash, Headphones, Trophy, Zap, ExternalLink } from 'lucide-react';
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


  return (
    <section id="discord" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Csatlakozz <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Discord közösségünkhöz</span>
          </h2>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-700 font-medium">Élő Közösség</span>
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
                href="https://discord.gg/mcUyZXGERT"
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
                href="https://discord.gg/mcUyZXGERT"
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

        {/* Discord CTA Button */}
        <div className="text-center mt-12">
          <a
            href="https://discord.gg/mcUyZXGERT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Csatlakozz a Discord Közösséghez</span>
            <ExternalLink className="w-5 h-5" />
          </a>
          <p className="text-sm text-gray-500 mt-3">
            Ingyenes • Networking • Azonnali hozzáférés
          </p>
        </div>

      </div>
    </section>
  );
};

export default DiscordAcademy;