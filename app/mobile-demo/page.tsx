'use client';

import React, { useState } from 'react';
import {
  TouchTarget,
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveFlex,
  MobileButton,
  MobileIconButton,
  MobileButtonGroup,
  MobileInput,
  MobileTextarea,
  MobileSelect,
  useMobileDevice,
  useSwipeGesture,
  useSwipeToClose,
} from '@/components/mobile';
import { 
  Home, 
  Settings, 
  User, 
  Search,
  Menu,
  ChevronRight,
  Download,
  Share,
  Heart,
  Bell,
} from 'lucide-react';

export default function MobileDemo() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    message: '',
    country: '',
  });
  const [showModal, setShowModal] = useState(false);
  const deviceInfo = useMobileDevice();
  
  // Demo swipe handlers
  const [swipeDirection, setSwipeDirection] = useState<string>('');
  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => setSwipeDirection('Left'),
    onSwipeRight: () => setSwipeDirection('Right'),
    onSwipeUp: () => setSwipeDirection('Up'),
    onSwipeDown: () => setSwipeDirection('Down'),
  });

  return (
    <ResponsiveContainer maxWidth="2xl" padding="md">
      <div className="py-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Mobile-First Component Library
          </h1>
          <p className="text-gray-600">
            Touch-optimized components with enforced accessibility standards
          </p>
        </div>

        {/* Device Info */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Device Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Device Type:</span>
              <span className="ml-2 font-medium">
                {deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablet' : 'Desktop'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Touch Device:</span>
              <span className="ml-2 font-medium">
                {deviceInfo.isTouchDevice ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Viewport:</span>
              <span className="ml-2 font-medium">
                {deviceInfo.viewportWidth} x {deviceInfo.viewportHeight}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Orientation:</span>
              <span className="ml-2 font-medium">
                {deviceInfo.isPortrait ? 'Portrait' : 'Landscape'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">OS:</span>
              <span className="ml-2 font-medium">
                {deviceInfo.isIOS ? 'iOS' : deviceInfo.isAndroid ? 'Android' : 'Other'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Has Notch:</span>
              <span className="ml-2 font-medium">
                {deviceInfo.hasNotch ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Touch Targets Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Touch Targets</h2>
          <p className="text-gray-600">
            All interactive elements enforce minimum 44px touch targets (iOS standard)
          </p>
          <div className="flex flex-wrap gap-4">
            <TouchTarget debug>
              <button className="px-3 py-1 text-sm bg-blue text-white rounded">
                Small Button
              </button>
            </TouchTarget>
            <TouchTarget debug minSize={48}>
              <button className="p-2 bg-green-500 text-white rounded">
                Icon
              </button>
            </TouchTarget>
            <TouchTarget debug minSize={52}>
              <a href="#" className="text-blue underline">
                Link Text
              </a>
            </TouchTarget>
          </div>
        </section>

        {/* Buttons Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Mobile Buttons</h2>
          <p className="text-gray-600">
            Buttons with enforced minimum heights and touch feedback
          </p>
          
          {/* Button Variants */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Variants</h3>
            <ResponsiveGrid cols={{ default: 2, sm: 3, md: 4 }} gap="sm">
              <MobileButton variant="primary">Primary</MobileButton>
              <MobileButton variant="secondary">Secondary</MobileButton>
              <MobileButton variant="ghost">Ghost</MobileButton>
              <MobileButton variant="danger">Danger</MobileButton>
              <MobileButton variant="success">Success</MobileButton>
              <MobileButton variant="glow">Glow</MobileButton>
            </ResponsiveGrid>
          </div>

          {/* Button Sizes */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Sizes (44px, 48px, 52px min)</h3>
            <ResponsiveFlex gap="md" align="center">
              <MobileButton size="sm">Small (44px)</MobileButton>
              <MobileButton size="md">Medium (48px)</MobileButton>
              <MobileButton size="lg">Large (52px)</MobileButton>
            </ResponsiveFlex>
          </div>

          {/* Icon Buttons */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Icon Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <MobileIconButton icon={<Home />} label="Home" variant="primary" />
              <MobileIconButton icon={<Settings />} label="Settings" variant="secondary" />
              <MobileIconButton icon={<User />} label="Profile" variant="ghost" />
              <MobileIconButton icon={<Search />} label="Search" variant="success" />
              <MobileIconButton icon={<Menu />} label="Menu" variant="danger" />
            </div>
          </div>

          {/* Buttons with Icons */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Buttons with Icons</h3>
            <MobileButtonGroup direction="vertical" fullWidth>
              <MobileButton icon={<Download />} variant="primary">
                Download PDF
              </MobileButton>
              <MobileButton icon={<Share />} iconPosition="right" variant="secondary">
                Share Link
              </MobileButton>
              <MobileButton icon={<Heart />} variant="danger">
                Add to Favorites
              </MobileButton>
            </MobileButtonGroup>
          </div>

          {/* Loading States */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Loading States</h3>
            <ResponsiveFlex gap="md">
              <MobileButton loading size="sm">Loading</MobileButton>
              <MobileButton loading size="md" variant="secondary">Processing</MobileButton>
              <MobileButton loading size="lg" variant="success">Saving</MobileButton>
            </ResponsiveFlex>
          </div>
        </section>

        {/* Form Inputs Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Mobile Form Inputs</h2>
          <p className="text-gray-600">
            Inputs with 16px font size to prevent iOS zoom and 48px minimum height
          </p>
          
          <div className="space-y-6">
            {/* Text Inputs */}
            <MobileInput
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              hint="We'll never share your email"
              icon={<User className="w-5 h-5" />}
              clearable
              required
            />

            <MobileInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              hint="Must be at least 8 characters"
            />

            <MobileInput
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={formData.name && formData.name.length < 2 ? 'Name too short' : ''}
              clearable
            />

            {/* Select */}
            <MobileSelect
              label="Country"
              options={[
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
                { value: 'au', label: 'Australia' },
              ]}
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="Select your country"
              hint="Choose your current location"
            />

            {/* Textarea */}
            <MobileTextarea
              label="Message"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              hint="Maximum 500 characters"
              rows={4}
            />

            {/* Input Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Input Variants</h3>
              <MobileInput
                label="Default Variant"
                placeholder="Default style"
                variant="default"
              />
              <MobileInput
                label="Filled Variant"
                placeholder="Filled style"
                variant="filled"
              />
              <MobileInput
                label="Outlined Variant"
                placeholder="Outlined style"
                variant="outlined"
              />
            </div>
          </div>
        </section>

        {/* Swipe Gestures Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Swipe Gestures</h2>
          <p className="text-gray-600">
            Swipe in any direction on the box below
          </p>
          
          <div
            ref={swipeRef}
            className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-12 text-white text-center select-none"
          >
            <div className="text-2xl font-bold mb-2">Swipe Me!</div>
            <div className="text-lg">
              {swipeDirection ? `Swiped ${swipeDirection}` : 'Waiting for swipe...'}
            </div>
          </div>
        </section>

        {/* Responsive Containers Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Responsive Layout</h2>
          <p className="text-gray-600">
            Containers that prevent overflow and adapt to screen size
          </p>
          
          <ResponsiveGrid cols={{ default: 1, sm: 2, md: 3, lg: 4 }} gap="md">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl p-6 text-center"
              >
                <div className="text-2xl font-bold text-gray-400 mb-2">
                  {i}
                </div>
                <div className="text-sm text-gray-600">
                  Responsive Grid Item
                </div>
              </div>
            ))}
          </ResponsiveGrid>
        </section>

        {/* Modal Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Mobile Modal</h2>
          <MobileButton onClick={() => setShowModal(true)}>
            Open Modal Demo
          </MobileButton>
        </section>

        {/* Modal */}
        {showModal && (
          <DemoModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </ResponsiveContainer>
  );
}

// Demo Modal Component
function DemoModal({ onClose }: { onClose: () => void }) {
  const modalRef = useSwipeToClose(onClose, { direction: 'down' });
  
  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className="relative bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white p-4 border-b">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Mobile Modal</h3>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-600">
            This modal can be closed by swiping down or tapping the backdrop.
          </p>
          <MobileButton fullWidth onClick={onClose}>
            Close Modal
          </MobileButton>
        </div>
      </div>
    </div>
  );
}