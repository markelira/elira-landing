'use client';

interface TrustStripProps {
  title?: string;
  logos?: Array<{
    name: string;
    src: string;
    alt: string;
  }>;
  metrics?: Array<{
    value: string;
    label: string;
  }>;
}

export function TrustStrip({ 
  title = "Akikkel együttműködünk",
  logos = [],
  metrics = [
    { value: '500+', label: 'Vállalkozás' },
    { value: '15+', label: 'Szakértő' },
    { value: '98%', label: 'Elégedettség' },
  ]
}: TrustStripProps) {
  return (
    <section className="cluely-section-sm">
      <div className="cluely-container">
        
        {/* Title */}
        <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider mb-12">
          {title}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="cluely-heading-2 text-blue-600 mb-1">
                {metric.value}
              </div>
              <div className="cluely-body text-slate-500">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Logo Grid (placeholder for now) */}
        {logos.length > 0 && (
          <div className="mt-16 grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
            {logos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center">
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-8 object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}