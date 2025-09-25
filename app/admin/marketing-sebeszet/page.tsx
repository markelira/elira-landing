import React from 'react';
import { Metadata } from 'next';
import MarketingSebesztCRMDashboard from '@/components/admin/MarketingSebesztCRMDashboard';

export const metadata: Metadata = {
  title: 'Marketing Sebészet CRM | Elira Admin',
  description: 'Teljes CRM rendszer a Marketing Sebészet konzultációk kezeléséhez',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MarketingSebesztCRMPage() {
  return <MarketingSebesztCRMDashboard />;
}