"use client";

import React from 'react';

const MarketingSebeszet: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-0">
      {/* Calendar Section - Mobile First */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 p-4 sm:p-5 sticky top-4 sm:top-8">
        {/* Calendar Header */}
        <div className="text-center mb-4 sm:mb-5">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            Foglald le a díjmentes tanácsadásod
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm px-2 sm:px-0">
            Válassz időpontot és mutasd meg a weboldalad - együtt megnöveljük a konverziót!
          </p>
        </div>

        {/* Calendar Embed - Mobile Responsive */}
        <div className="relative bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden">
          <iframe 
            src="https://app.minup.io/embed/elira/service/49277?canStartPayment=true" 
            className="w-full h-[400px] sm:h-[520px] border-0"
            title="Minup Calendar - Marketing Sebészet Consultation"
          />
          <script 
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                window.addEventListener("message", (event) => { 
                  if (event.origin !== "https://app.minup.io") return; 
                  const data = event.data; 
                  if (data.type === "redirect_to_payment") { 
                    window.location.href = data.url; 
                  } 
                });
              `
            }}
          />
        </div>

        {/* Help Text - Mobile First */}
        <div className="mt-3 sm:mt-4 text-center space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm text-gray-500 px-2 sm:px-0">
            🔥 Előkészítés: küldd el a weboldal URL-ed és főbb konkurenseidet
          </p>
          <p className="text-xs text-gray-400">
            A foglalás után részletes instrukciókat kapsz emailben
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketingSebeszet;