/**
 * Marketing Sebészet Lead Magnet Integration Examples
 * 
 * This file demonstrates how to integrate the Marketing Sebészet consultation
 * system into your existing Elira application.
 */

import React from 'react';
import { MarketingSebesztProvider } from '@/contexts/MarketingSebesztContext';
import MarketingSebeszet from '@/components/lead-magnet/MarketingSebeszet';
import MarketingSebesztCTA from '@/components/lead-magnet/MarketingSebesztCTA';
import MarketingSebesztSection from '@/components/lead-magnet/MarketingSebesztSection';
import { MarketingSebesztModalTrigger } from '@/components/lead-magnet/MarketingSebesztModal';

// Example 1: Simple CTA Button Integration
export function SimpleIntegrationExample() {
  return (
    <MarketingSebesztProvider>
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Szeretnél több vevőt?</h2>
        <p className="text-gray-600 mb-6">
          Foglald le az ingyenes 30 perces Marketing Sebészet konzultációdat!
        </p>
        
        <MarketingSebesztCTA
          variant="primary"
          size="lg"
          showUrgency={true}
          showBenefits={true}
          source="homepage_cta"
          campaign="main_page_conversion"
        />
      </div>
    </MarketingSebesztProvider>
  );
}

// Example 2: Full Landing Page Section
export function LandingPageSection() {
  return (
    <MarketingSebesztProvider>
      <MarketingSebesztSection
        layout="hero"
        backgroundColor="gradient"
        containerMaxWidth="xl"
        showTestimonial={true}
        showStats={true}
        showGuarantee={true}
        sectionId="marketing-sebeszet-hero"
      />
    </MarketingSebesztProvider>
  );
}

// Example 3: Sidebar Integration
export function SidebarIntegration() {
  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3">
        <h1>Marketing Blog Post Content</h1>
        <p>Your main content goes here...</p>
      </div>

      {/* Sidebar with Lead Magnet */}
      <div className="lg:col-span-1">
        <MarketingSebesztProvider>
          <div className="sticky top-8">
            <MarketingSebesztSection
              layout="sidebar"
              backgroundColor="white"
              showTestimonial={false}
              showStats={false}
              containerMaxWidth="sm"
            />
          </div>
        </MarketingSebesztProvider>
      </div>
    </div>
  );
}

// Example 4: Modal Popup Integration
export function ModalIntegration() {
  return (
    <MarketingSebesztProvider>
      <div className="space-y-4">
        <h2>Marketing tanácsok a blogon</h2>
        <p>Olvasd el a legújabb marketing tippeket...</p>

        {/* Manual trigger button */}
        <MarketingSebesztModalTrigger
          modalProps={{
            size: 'lg',
            modalSource: 'blog_content',
            showCloseButton: true
          }}
        >
          <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600">
            Ingyenes konzultáció
          </button>
        </MarketingSebesztModalTrigger>

        {/* Auto-trigger on scroll */}
        <MarketingSebesztModalTrigger
          modalProps={{
            showOnScroll: 75, // Show after 75% scroll
            size: 'md',
            modalSource: 'scroll_trigger'
          }}
        >
          <div /> {/* Empty trigger - modal will show automatically */}
        </MarketingSebesztModalTrigger>
      </div>
    </MarketingSebesztProvider>
  );
}

// Example 5: Custom Form Integration with Hooks
import { useMarketingSebesztContext } from '@/contexts/MarketingSebesztContext';

function CustomFormExample() {
  const {
    state,
    updateFormData,
    submitForm,
    trackEvent
  } = useMarketingSebesztContext();

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track custom event
    trackEvent('custom_form_submit', {
      location: 'custom_integration',
      form_type: 'embedded'
    });

    // Submit the form
    const success = await submitForm();
    if (success) {
      // Custom success handling
      console.log('Consultation request submitted:', state.leadId);
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 to-green-500 p-8 rounded-xl text-white">
      <h3 className="text-2xl font-bold mb-4">Egyedi Form Design</h3>
      <p className="mb-6">Teljesen testreszabható form a saját designoddal.</p>

      <form onSubmit={handleCustomSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Neved"
            value={state.formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className="px-4 py-3 rounded-lg text-gray-900"
          />
          <input
            type="email"
            placeholder="Email címed"
            value={state.formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="px-4 py-3 rounded-lg text-gray-900"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="tel"
            placeholder="Telefonszámod"
            value={state.formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="px-4 py-3 rounded-lg text-gray-900"
          />
          <select
            value={state.formData.occupation}
            onChange={(e) => updateFormData('occupation', e.target.value)}
            className="px-4 py-3 rounded-lg text-gray-900"
          >
            <option value="">Foglalkozásod</option>
            <option value="cegvezetes">Cégvezetés</option>
            <option value="marketing">Marketing</option>
            <option value="ertekesites">Értékesítés</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={state.isLoading}
          className="w-full bg-white text-teal-600 font-bold py-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {state.isLoading ? 'Küldés...' : 'Ingyenes konzultáció foglalása'}
        </button>
      </form>

      {state.errors.submit && (
        <p className="text-red-200 text-sm mt-2">{state.errors.submit}</p>
      )}
    </div>
  );
}

export function CustomIntegrationExample() {
  return (
    <MarketingSebesztProvider>
      <CustomFormExample />
    </MarketingSebesztProvider>
  );
}

// Example 6: Multiple CTA Variants A/B Testing
export function ABTestingExample() {
  const variants = ['primary', 'secondary', 'minimal'] as const;
  const randomVariant = variants[Math.floor(Math.random() * variants.length)];

  return (
    <MarketingSebesztProvider>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">A/B Testing Példa</h2>
        
        <MarketingSebesztCTA
          variant={randomVariant}
          size="lg"
          text={
            randomVariant === 'primary' ? 'Igen, kérem az ingyenes konzultációt!' :
            randomVariant === 'secondary' ? 'Marketing Sebészet igénylés' :
            'Ingyenes konzultáció'
          }
          source={`ab_test_variant_${randomVariant}`}
          campaign="cta_testing"
        />
        
        <p className="text-sm text-gray-500 mt-4">
          Jelenleg aktív variant: {randomVariant}
        </p>
      </div>
    </MarketingSebesztProvider>
  );
}

// Example 7: Admin Dashboard Integration
export function AdminDashboardExample() {
  return (
    <div>
      {/* This would be placed in your admin layout */}
      <h1>Admin Dashboard</h1>
      
      {/* Navigation could include: */}
      <nav>
        <a href="/admin/marketing-sebeszet-leads">
          Marketing Sebészet Konzultációk
        </a>
      </nav>

      {/* The dashboard page is available at: */}
      {/* /admin/marketing-sebeszet-leads */}
    </div>
  );
}

/**
 * Firebase Collections Created:
 * 
 * 1. consultations - Main collection for consultation requests
 *    Fields: name, email, phone, occupation, status, createdAt, updatedAt, etc.
 * 
 * 2. marketing_sebeszet_analytics - Analytics events
 *    Fields: event_type, data, metadata, timestamp
 * 
 * 3. marketing_sebeszet_daily_metrics - Aggregated daily stats
 *    Fields: date, consultations_requested, consultations_booked, page_views
 */

/**
 * Available API Endpoints:
 * 
 * POST /api/analytics/track - Custom analytics tracking
 * 
 * The leadCaptureService automatically handles:
 * - Saving consultations to Firebase
 * - Sending notifications
 * - Analytics tracking
 * - CSV exports
 * - Status management
 */

/**
 * Integration Checklist:
 * 
 * 1. ✅ Add MarketingSebesztProvider to your app
 * 2. ✅ Choose integration method (CTA, Section, Modal, Custom)
 * 3. ✅ Configure Firebase (consultations collection will be auto-created)
 * 4. ✅ Set up admin access at /admin/marketing-sebeszet-leads
 * 5. ✅ Configure analytics (Google Analytics, Facebook Pixel)
 * 6. ✅ Test the complete flow: Form → Booking → Thank You
 * 7. ✅ Set up notifications (email/Slack) for new consultations
 */