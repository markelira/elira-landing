'use client';

import React, { useState } from 'react';
import { ArrowRight, CreditCard, Lock } from 'lucide-react';

// Add CSS for floating animation
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

const ButtonTestPage: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-800 to-teal-700 relative overflow-hidden">
      {/* Background Elements - matching homepage */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <pattern id="sales-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#sales-grid)" />
          </svg>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Purchase Button
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Design System
            </span>
          </h1>
          <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            Designed with Apple's philosophy:<br />
            <em>"Simplicity is the ultimate sophistication."</em>
          </p>
        </div>

        {/* Steve Jobs' Philosophy */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20">
            <blockquote className="text-2xl font-light text-white italic mb-6">
              "The purchase button isn't about the button.<br />
              It's about removing every barrier between<br />
              the customer's desire and their decision."
            </blockquote>
            <cite className="text-white/70 font-medium">— Steve Jobs Design Philosophy</cite>
          </div>
        </div>

        {/* Button Variants */}
        <div className="space-y-24 max-w-5xl mx-auto">
          
          {/* Variant 1: The Classic */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 px-4 py-2 rounded-full mb-6">
              <span className="font-medium text-yellow-200">Classic Apple</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">The Classic</h3>
            <p className="text-lg text-white/80 font-light mb-12 max-w-2xl mx-auto">
              Pure Apple. No distractions. Just the essential action the customer needs to take.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-16 mb-12 border border-white/20">
              <button
                className="group bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-900 font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-xl active:scale-95 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/30"
                onMouseEnter={() => setActiveButton('classic')}
                onMouseLeave={() => setActiveButton(null)}
              >
                <span className="flex items-center justify-center">
                  Jelentkezés a masterclassra
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
              
              <div className="mt-8 text-sm text-white/70 font-light">
                Signature yellow-orange gradient. Unmistakably premium.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">Psychology</h4>
                <p className="text-sm text-white/70 font-light">Yellow-orange = energy, confidence, premium. The homepage gradient creates brand consistency.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">Clarity</h4>
                <p className="text-sm text-white/70 font-light">Dark text on bright background ensures maximum readability. Zero cognitive load.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">Trust</h4>
                <p className="text-sm text-white/70 font-light">Matches the homepage design language. Users feel consistent visual experience.</p>
              </div>
            </div>
          </div>

          {/* Variant 2: The Glass */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-teal-400/20 border border-teal-400/30 px-4 py-2 rounded-full mb-6">
              <span className="font-medium text-teal-200">Glass Morphism</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">The Glass</h3>
            <p className="text-lg text-white/80 font-light mb-12 max-w-2xl mx-auto">
              Modern glassmorphism. Premium feel without overwhelming the purchase decision.
            </p>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-16 mb-12 relative overflow-hidden border border-white/20">
              {/* Enhanced background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-teal-300 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-300 rounded-full filter blur-3xl"></div>
              </div>
              
              <button
                className="group relative bg-white/20 backdrop-blur-xl border border-white/40 text-white font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 hover:bg-white/30 hover:border-white/50 active:scale-95 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30"
                onMouseEnter={() => setActiveButton('glass')}
                onMouseLeave={() => setActiveButton(null)}
              >
                {/* Enhanced inner light */}
                <div className="absolute inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-60"></div>
                
                <span className="relative flex items-center justify-center">
                  Jelentkezés a masterclassra
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
              
              <div className="mt-8 text-sm text-white/70 font-light">
                Advanced glassmorphism that matches the site aesthetic.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">Modern</h4>
                <p className="text-sm text-white/70 font-light">Sophisticated glass effect that feels current and premium, matching the homepage aesthetic.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">Elegant</h4>
                <p className="text-sm text-white/70 font-light">Translucency creates depth without noise. Glass serves the function, not the design ego.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">Cohesive</h4>
                <p className="text-sm text-white/70 font-light">Uses the same glass treatment as homepage cards. Perfect visual consistency.</p>
              </div>
            </div>
          </div>

          {/* Variant 3: The Confident */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/30 px-4 py-2 rounded-full mb-6">
              <Lock className="w-4 h-4 text-emerald-200" />
              <span className="font-medium text-emerald-200">Security & Trust</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">The Confident</h3>
            <p className="text-lg text-white/80 font-light mb-12 max-w-2xl mx-auto">
              Bold teal accent. This button says "I know you want this. Take the leap."
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-16 mb-12 border border-white/20">
              <button
                className="group bg-teal-600 hover:bg-teal-700 text-white font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 active:scale-95 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/30"
                onMouseEnter={() => setActiveButton('confident')}
                onMouseLeave={() => setActiveButton(null)}
              >
                <span className="flex items-center justify-center">
                  <Lock className="w-5 h-5 mr-3" />
                  Biztosítsd a helyed - 49.990 Ft
                  <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
              
              <div className="mt-8 text-sm text-white/70 font-light">
                Urgency and security. Matches the site's teal accent colors.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">Urgency</h4>
                <p className="text-sm text-white/70 font-light">"Biztosítsd a helyed" creates scarcity. Limited masterclass seats trigger immediate action.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">Security</h4>
                <p className="text-sm text-white/70 font-light">Lock icon + teal color = trust. Users associate teal with the site's premium branding.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">Price Clarity</h4>
                <p className="text-sm text-white/70 font-light">Includes price directly in button. Eliminates surprise and builds trust in the purchase process.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Psychology Analysis */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Purchase Psychology</h2>
            <p className="text-xl text-white/80 font-light max-w-3xl mx-auto">
              Each button is designed to trigger different psychological responses.
              The right choice depends on your customer and context.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">The Classic</h3>
              <div className="space-y-3 text-sm text-white/70">
                <p><strong>When to use:</strong> Premium products, sophisticated audience, high-value purchases</p>
                <p><strong>Psychology:</strong> Energy, confidence, brand consistency with homepage</p>
                <p><strong>Converts best for:</strong> Users who respond to the signature yellow-orange energy</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">The Glass</h3>
              <div className="space-y-3 text-sm text-white/70">
                <p><strong>When to use:</strong> Modern products, design-conscious users, tech-forward brands</p>
                <p><strong>Psychology:</strong> Innovation, modernity, premium glassmorphism feel</p>
                <p><strong>Converts best for:</strong> Users attracted to sophisticated glass aesthetic</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">The Confident</h3>
              <div className="space-y-3 text-sm text-white/70">
                <p><strong>When to use:</strong> Limited offers, time-sensitive sales, security-conscious buyers</p>
                <p><strong>Psychology:</strong> Urgency, security, price transparency, immediate action</p>
                <p><strong>Converts best for:</strong> Users who need reassurance and respond to clear pricing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Context Example */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Applied to Your Masterclass</h3>
            <div className="text-center space-y-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">49.990 Ft</div>
              <div className="text-lg text-white/80 font-light">Vállalkozói vevőpszichológia masterclass</div>
              
              {/* Recommendation */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-8">
                <h4 className="font-semibold text-white mb-3">💡 Steve Jobs Would Choose:</h4>
                <p className="text-white/80 font-light mb-4">
                  <strong>"The Classic"</strong> - Because it perfectly matches your homepage aesthetic and creates 
                  consistent brand experience. The yellow-orange gradient builds immediate recognition and trust.
                </p>
                <div className="flex justify-center">
                  <button className="bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-900 font-semibold px-8 py-3 rounded-full text-base transition-all duration-300 hover:shadow-xl active:scale-95 shadow-lg">
                    <span className="flex items-center justify-center">
                      Jelentkezés a masterclassra - 49.990 Ft
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Button Info */}
        {activeButton && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-xl text-white px-6 py-3 rounded-full shadow-2xl">
            <span className="text-sm font-medium">
              {activeButton === 'classic' && '⚫ The Classic - Hover Active'}
              {activeButton === 'glass' && '✨ The Glass - Hover Active'}  
              {activeButton === 'confident' && '🔵 The Confident - Hover Active'}
            </span>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ButtonTestPage;