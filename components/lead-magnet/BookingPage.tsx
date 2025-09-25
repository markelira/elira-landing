"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, CheckCircle, Info, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BookingPageProps {
  leadId?: string;
  leadName?: string;
}

const BookingPage: React.FC<BookingPageProps> = ({ leadId, leadName }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Handle messages from Minup iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://app.minup.io") return;
      
      const data = event.data;
      
      // Handle redirect to payment if needed
      if (data.type === "redirect_to_payment") {
        window.location.href = data.url;
      }
      
      // Handle booking completion
      if (data.type === "booking_completed") {
        // Update lead status in Firebase
        if (leadId) {
          updateLeadStatus(leadId, 'booked');
        }
        // Redirect to thank you page
        setTimeout(() => {
          router.push('/koszonjuk-marketing-sebeszet');
        }, 2000);
      }
    };

    window.addEventListener("message", handleMessage);
    
    // Set iframe loaded state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(timer);
    };
  }, [leadId, router]);

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      // This will be implemented with the Firebase service
      const { leadCaptureService } = await import('@/lib/services/leadCaptureService');
      await leadCaptureService.updateLeadStatus(leadId, status as any);
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Vissza a főoldalra</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Biztonságos kapcsolat</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <div className="text-center">
            <Calendar className="w-16 h-16 text-teal-500 mx-auto mb-4" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {leadName ? `Üdv, ${leadName}!` : 'Üdvözöllek!'}
            </h1>
            <h2 className="text-xl lg:text-2xl text-teal-600 mb-4">
              Válassz egy időpontot az ingyenes Marketing Sebészet konzultációhoz!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A konzultáció online zajlik, Zoom-on keresztül. Kérlek, válassz egy számodra megfelelő időpontot, 
              és 30 percben átbeszéljük, hogyan tudod azonnal növelni a vevőid számát.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500"
            >
              <Clock className="w-10 h-10 text-teal-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">30 perces konzultáció</h3>
              <p className="text-sm text-gray-600">
                Intenzív, értékdús beszélgetés a Te üzleti kihívásaidról és megoldásokról
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500"
            >
              <CheckCircle className="w-10 h-10 text-green-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">100% ingyenes</h3>
              <p className="text-sm text-gray-600">
                Nincs rejtett költség, nincs kötelező vásárlás - tiszta érték neked
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500"
            >
              <Users className="w-10 h-10 text-blue-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Személyre szabott</h3>
              <p className="text-sm text-gray-600">
                A Te iparágadhoz és célközönségedhez igazított tanácsok és stratégia
              </p>
            </motion.div>
          </div>

          {/* Calendar Embed Container */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {isLoading && (
              <div className="flex items-center justify-center h-[600px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Naptár betöltése...</p>
                </div>
              </div>
            )}
            
            <div className={`${isLoading ? 'hidden' : ''} relative`}>
              {/* Desktop View */}
              <div className="hidden lg:block">
                <iframe 
                  ref={iframeRef}
                  src="https://app.minup.io/embed/elira?canStartPayment=true" 
                  style={{ width: '100%', height: '600px' }}
                  frameBorder="0"
                  title="Marketing Sebészet időpontfoglalás"
                  className="w-full"
                />
              </div>
              
              {/* Mobile View */}
              <div className="lg:hidden">
                <iframe 
                  src="https://app.minup.io/embed/elira?canStartPayment=true" 
                  style={{ width: '100%', height: '700px' }}
                  frameBorder="0"
                  title="Marketing Sebészet időpontfoglalás"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* What to Expect Section */}
          <div className="bg-teal-50 rounded-2xl p-8 mt-12">
            <div className="flex items-start space-x-3 mb-6">
              <Info className="w-6 h-6 text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Mi fog történni a konzultáción?
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold text-teal-600 mr-2">1.</span>
                    <span>
                      <strong>Üzleti diagnózis (10 perc):</strong> Megismerjük a vállalkozásod, 
                      a célközönséged és a legnagyobb kihívásaidat
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-teal-600 mr-2">2.</span>
                    <span>
                      <strong>Lehetőség feltárás (10 perc):</strong> Azonosítjuk a legnagyobb 
                      növekedési lehetőségeket és a rejtett akadályokat
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-teal-600 mr-2">3.</span>
                    <span>
                      <strong>Azonnali akciótervek (10 perc):</strong> Konkrét, azonnal 
                      alkalmazható stratégiákat adok, amit már holnap elkezdhetsz
                    </span>
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 mt-6">
              <p className="text-gray-700 italic">
                "Ez a 30 perc megváltoztatta, ahogy a marketingre gondolok. Zoli konkrét, 
                praktikus tanácsokat adott, amiket azonnal tudtam alkalmazni. Már az első 
                héten láttam az eredményeket!"
              </p>
              <p className="text-sm text-gray-600 mt-3">
                - Németh Andrea, e-commerce vállalkozó
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Gyakran feltett kérdések
            </h3>
            
            <details className="bg-white rounded-xl shadow-md p-6 cursor-pointer group">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Tényleg ingyenes a konzultáció?
                <span className="text-teal-500 group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-gray-600 mt-3">
                Igen, a 30 perces Marketing Sebészet konzultáció 100%-ban ingyenes. 
                Nincs rejtett költség, nem kell bankkártyát megadnod, és nem kötelező 
                semmit vásárolnod. Ez az én ajándékom neked, hogy megmutassam, milyen 
                értéket tudok nyújtani.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-md p-6 cursor-pointer group">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Mit kell előkészítenem a konzultációra?
                <span className="text-teal-500 group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-gray-600 mt-3">
                Nem kell semmi különöset előkészítened. Hasznos, ha átgondolod a legnagyobb 
                marketing kihívásaidat és célaidat, de a konzultáció során végigvezetlek 
                mindenen. Csak egy működő internet kapcsolat és 30 perc szabad időd kell.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-md p-6 cursor-pointer group">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Mi történik a konzultáció után?
                <span className="text-teal-500 group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-gray-600 mt-3">
                A konzultáció végén konkrét, azonnal alkalmazható tanácsokkal távozol. 
                Ha úgy érzed, hogy további segítségre van szükséged, beszélhetünk a 
                lehetőségekről, de ez teljesen opcionális. A cél az, hogy már a 30 
                perces beszélgetésből is értéket kapj.
              </p>
            </details>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-12 p-8 bg-gray-50 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Kérdésed van?
            </h3>
            <p className="text-gray-600 mb-4">
              Ha bármilyen kérdésed vagy problémád van az időpontfoglalással kapcsolatban, 
              írj nekünk:
            </p>
            <a 
              href="mailto:support@elira.hu" 
              className="text-teal-600 font-semibold hover:underline"
            >
              support@elira.hu
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BookingPage;