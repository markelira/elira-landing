import React from 'react';
import { Metadata } from 'next';
import { MarketingSebesztProvider } from '@/contexts/MarketingSebesztContext';
import { CheckCircle, Calendar, Mail, Phone, ArrowLeft, Clock, Users, Star } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Köszönjük a regisztrációt - Marketing Sebészet | Elira',
  description: 'Sikeresen lefoglaltad az ingyenes Marketing Sebészet konzultációdat. Itt találod a következő lépéseket.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function KoszonjukMarketingSebesztPage() {
  return (
    <MarketingSebesztProvider>
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
        {/* Conversion tracking script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ThankYouPage",
              "name": "Marketing Sebészet - Köszönjük",
              "description": "Sikeres időpontfoglalás megerősítő oldal"
            })
          }}
        />

        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Vissza a főoldalra</span>
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Köszönjük a regisztrációdat!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Sikeresen lefoglaltad az ingyenes Marketing Sebészet konzultációdat. 
              Most már csak néhány lépés választ el az első vevőkről!
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Mi történik most?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4">
                  <Mail className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">1. Email megerősítés</h3>
                <p className="text-sm text-gray-600">
                  Pár percen belül kapsz egy megerősítő emailt az időpontod részleteivel és a Zoom linkkel.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">2. Naptár esemény</h3>
                <p className="text-sm text-gray-600">
                  Automatikusan hozzáadtuk az eseményt a naptáradhoz, emlékeztető értesítéssel együtt.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">3. Konzultáció</h3>
                <p className="text-sm text-gray-600">
                  30 perces személyre szabott beszélgetés az üzleted növekedéséről és konkrét megoldásokról.
                </p>
              </div>
            </div>
          </div>

          {/* Preparation Tips */}
          <div className="bg-teal-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Hogyan készülj fel a konzultációra?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Gondold át a legnagyobb kihívásaidat</p>
                  <p className="text-sm text-gray-600">
                    Mik azok a marketing vagy értékesítési problémák, amik a leginkább visszatartanak?
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Készítsd elő a céljaidat</p>
                  <p className="text-sm text-gray-600">
                    Hány új vevőt szeretnél havonta? Milyen bevételi célod van?
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Teszteld a Zoom kapcsolatot</p>
                  <p className="text-sm text-gray-600">
                    Győződj meg róla, hogy működik a kamerád és mikrofonod a zavartalan konzultációhoz.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Biztosítsd a csendes környezetet</p>
                  <p className="text-sm text-gray-600">
                    30 perc alatt sokat tudunk elérni, ha nem zavarja meg minket semmi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Mit várj a konzultációtól?
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Üzleti helyzet felmérése</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Megismerjük a vállalkozásod, célközönséged és aktuális kihívásaidat
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-teal-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Lehetőségek azonosítása</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Feltárjuk a legnagyobb növekedési lehetőségeket és a rejtett akadályokat
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Konkrét megoldások</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      3 azonnali változtatást mutatok, amiket még ma megtehetsz több vevőért
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Akcióterv</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Személyre szabott következő lépések a Te iparágadhoz és helyzetedhez
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-8 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-4">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
              </div>
              
              <blockquote className="text-lg text-gray-800 italic mb-4">
                "Zoli 30 perc alatt többet segített, mint bármilyen marketing könyv vagy kurzus. 
                A konzultáció után azonnal alkalmaztam a tanácsait, és már az első héten 
                3 új ügyféllel bővült a portfolióm!"
              </blockquote>
              
              <cite className="text-sm text-gray-600">
                - Szabó Andrea, webshop tulajdonos
              </cite>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Kérdésed van?
            </h3>
            
            <p className="text-gray-600 mb-6">
              Ha bármilyen kérdésed van a konzultációval kapcsolatban, vagy módosítanod kell 
              az időpontodat, keress minket bizalommal:
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <Mail className="w-5 h-5 text-teal-500" />
                <a href="mailto:support@elira.hu" className="hover:text-teal-600 transition-colors">
                  support@elira.hu
                </a>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <Phone className="w-5 h-5 text-teal-500" />
                <a href="tel:+36301234567" className="hover:text-teal-600 transition-colors">
                  +36 30 123 4567
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Válaszidő: 2 órán belül (munkaidőben)</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MarketingSebesztProvider>
  );
}