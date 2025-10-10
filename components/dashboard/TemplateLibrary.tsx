'use client';

import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CoursePDF {
  id: string;
  title: string;
  description: string;
  url: string;
}

const coursePDFs: CoursePDF[] = [
  {
    id: 'blogposzt-generator',
    title: 'Blogposzt generátor',
    description: 'AI-alapú blogposzt készítő sablon',
    url: 'https://drive.google.com/file/d/1jw4_izUgnQHpnWDUswOCbKH0h6gkltcf/view?usp=sharing'
  },
  {
    id: 'bulletpoint-generator',
    title: 'Bulletpoint generátor',
    description: 'Bulletpointok készítése termékoldalra, landoló oldalra',
    url: 'https://drive.google.com/file/d/13adEI925qZLbmtnnWKUrhggkH5fhDVMC/view?usp=sharing'
  },
  {
    id: 'buyer-persona-generator',
    title: 'Buyer persona generátor',
    description: 'Komplett vevői profil meghatározása ChatGPT-vel',
    url: 'https://drive.google.com/file/d/1dfaiqQBV6hOOz_Iz1sANStfyNJvqGCMy/view?usp=sharing'
  },
  {
    id: 'buyer-persona',
    title: 'Buyer persona',
    description: 'Vevői persona sablon és útmutató',
    url: 'https://drive.google.com/file/d/1N8WaQQvskCiutXYPOD089leAhhMXijW3/view?usp=sharing'
  },
  {
    id: 'email-marketing-generator',
    title: 'Email marketing generátor',
    description: 'AI-t használd E-mail marketingre',
    url: 'https://drive.google.com/file/d/1PnfgOCkNT29s6I4p5vJVAvKjaedrdffw/view?usp=sharing'
  },
  {
    id: 'facebook-ads-generator',
    title: 'Facebook ads copy generátor',
    description: 'Személyre szabott Facebook hirdetés 2 perc alatt',
    url: 'https://drive.google.com/file/d/1yCLa-UhSzdlxBsGzz3JkrNtXirPQ8jJV/view?usp=sharing'
  },
  {
    id: 'social-media-generator',
    title: 'Közösségi média poszt generátor',
    description: 'Személyre szabott közösségi média poszt 3 perc alatt',
    url: 'https://drive.google.com/file/d/1M9eSYzQd7qkTy1KhBkLkBNwmV-x7XErE/view?usp=sharing'
  }
];

export function TemplateLibrary() {
  const handleDownload = (pdf: CoursePDF) => {
    window.open(pdf.url, '_blank');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Masterclass anyagok
        </h3>
        <span className="text-xs font-medium text-gray-500">
          {coursePDFs.length} PDF
        </span>
      </div>

      {/* PDF List */}
      <div className="space-y-2">
        {coursePDFs.map((pdf) => (
          <div
            key={pdf.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {pdf.title}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {pdf.description}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDownload(pdf)}
              className="ml-4 flex-shrink-0"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
