"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { MarketingSebesztProvider } from '@/contexts/MarketingSebesztContext';
import MarketingSebesztCTA from './MarketingSebesztCTA';
import MarketingSebesztSection from './MarketingSebesztSection';
import { MarketingSebesztModalTrigger } from './MarketingSebesztModal';

// Component to showcase integration examples
const IntegrationExamples: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simple' | 'section' | 'modal' | 'custom'>('simple');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const examples = {
    simple: {
      title: 'Egyszerű CTA Gomb',
      description: 'Helyezd el bárhova az oldalon egyetlen sor kóddal.',
      code: `import MarketingSebesztCTA from '@/components/lead-magnet/MarketingSebesztCTA';

export default function MyPage() {
  return (
    <div>
      <MarketingSebesztCTA
        variant="primary"
        size="lg"
        showUrgency={true}
        source="homepage_hero"
      />
    </div>
  );
}`,
      component: (
        <MarketingSebesztProvider>
          <MarketingSebesztCTA
            variant="primary"
            size="lg"
            showUrgency={true}
            source="integration_demo"
          />
        </MarketingSebesztProvider>
      )
    },
    section: {
      title: 'Teljes Szekció',
      description: 'Komplett landing section beépített formmal.',
      code: `import MarketingSebesztSection from '@/components/lead-magnet/MarketingSebesztSection';
import { MarketingSebesztProvider } from '@/contexts/MarketingSebesztContext';

export default function LandingPage() {
  return (
    <MarketingSebesztProvider>
      <MarketingSebesztSection
        layout="inline"
        showTestimonial={true}
        showStats={true}
        backgroundColor="teal"
      />
    </MarketingSebesztProvider>
  );
}`,
      component: (
        <MarketingSebesztProvider>
          <div className="max-w-2xl">
            <MarketingSebesztSection
              layout="sidebar"
              showTestimonial={false}
              showStats={false}
              backgroundColor="white"
              containerMaxWidth="sm"
            />
          </div>
        </MarketingSebesztProvider>
      )
    },
    modal: {
      title: 'Modal Popup',
      description: 'Automatikus popup exit intent vagy scroll alapján.',
      code: `import { MarketingSebesztModalTrigger } from '@/components/lead-magnet/MarketingSebesztModal';
import { MarketingSebesztProvider } from '@/contexts/MarketingSebesztContext';

export default function MyPage() {
  return (
    <MarketingSebesztProvider>
      <MarketingSebesztModalTrigger
        modalProps={{
          showOnScroll: 70, // 70%-os scroll után
          showOnExit: true,
          size: 'lg'
        }}
      >
        <button className="bg-teal-500 text-white px-6 py-3 rounded-lg">
          Ingyenes Konzultáció
        </button>
      </MarketingSebesztModalTrigger>
    </MarketingSebesztProvider>
  );
}`,
      component: (
        <MarketingSebesztProvider>
          <MarketingSebesztModalTrigger
            modalProps={{
              size: 'md',
              modalSource: 'integration_demo'
            }}
          >
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Modal megnyitása</span>
            </button>
          </MarketingSebesztModalTrigger>
        </MarketingSebesztProvider>
      )
    },
    custom: {
      title: 'Custom Integráció',
      description: 'Saját design teljes kontrollal.',
      code: `import { useMarketingSebesztContext } from '@/contexts/MarketingSebesztContext';
import { MarketingSebesztProvider } from '@/contexts/MarketingSebesztContext';

function CustomLeadCapture() {
  const { 
    state, 
    updateFormData, 
    submitForm, 
    trackEvent 
  } = useMarketingSebesztContext();

  const handleCustomSubmit = async () => {
    trackEvent('custom_cta_clicked', { location: 'custom_component' });
    const success = await submitForm();
    if (success) {
      // Custom success handling
      console.log('Lead captured!', state.leadId);
    }
  };

  return (
    <div className="custom-lead-form">
      {/* Saját form design */}
      <input 
        value={state.formData.name}
        onChange={(e) => updateFormData('name', e.target.value)}
        placeholder="Neved"
      />
      <button onClick={handleCustomSubmit}>
        {state.isLoading ? 'Küldés...' : 'Küldés'}
      </button>
    </div>
  );
}

export default function MyPage() {
  return (
    <MarketingSebesztProvider>
      <CustomLeadCapture />
    </MarketingSebesztProvider>
  );
}`,
      component: (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Saját Design</h3>
          <p className="mb-4">A hook-ok segítségével teljes kontroll a design felett.</p>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Custom input..."
              className="px-3 py-2 rounded text-gray-900 flex-1"
            />
            <button className="bg-white text-purple-600 px-4 py-2 rounded font-semibold">
              Custom Button
            </button>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Marketing Sebészet - Integráció Példák
        </h1>
        <p className="text-gray-600 text-lg">
          Néhány perc alatt beintegrálható lead magnet rendszer
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center space-x-1 mb-8 bg-gray-100 p-2 rounded-lg">
        {Object.entries(examples).map(([key, example]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === key
                ? 'bg-teal-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {Object.entries(examples).map(([key, example]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: activeTab === key ? 1 : 0, 
              y: activeTab === key ? 0 : 20,
              display: activeTab === key ? 'block' : 'none'
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Code Side */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {example.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {example.description}
                  </p>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">TypeScript</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(example.code, key)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white text-sm"
                    >
                      {copiedCode === key ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Másolva!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Másolás</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </div>

                {/* Installation Instructions */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Telepítés:</h4>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Másold be a komponenseket a projektedbe</li>
                    <li>2. Állítsd be a Firebase konfigurációt</li>
                    <li>3. Add hozzá a Provider-t az app szintjén</li>
                    <li>4. Használd bárhol az alkalmazásban!</li>
                  </ol>
                </div>
              </div>

              {/* Preview Side */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Élő Előnézet
                </h3>
                
                <div className="bg-gray-50 p-6 rounded-lg border">
                  {example.component}
                </div>

                {/* Features List */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Funkciók:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>✓ Firebase integráció</li>
                    <li>✓ Analytics tracking</li>
                    <li>✓ Responsive design</li>
                    <li>✓ Form validáció</li>
                    <li>✓ Loading állapotok</li>
                    <li>✓ Testreszabható</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-16 bg-gradient-to-r from-teal-50 to-green-50 p-8 rounded-2xl">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            További Dokumentáció
          </h3>
          <p className="text-gray-600 mb-6">
            Részletes leírás, API referencia és további példák.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/docs/marketing-sebeszet"
              className="inline-flex items-center space-x-2 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Dokumentáció</span>
            </a>
            
            <a
              href="/admin/marketing-sebeszet-leads"
              className="inline-flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <span>Admin Dashboard</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationExamples;