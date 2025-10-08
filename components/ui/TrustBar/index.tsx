interface TrustBarProps {
  items: Array<{
    label: string;
    icon?: string;
  }>;
  className?: string;
}

export function TrustBar({ items, className = '' }: TrustBarProps) {
  return (
    <div className={`flex flex-wrap items-center gap-6 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <div className="hidden sm:block w-1 h-1 rounded-full bg-neutral-300 -ml-3" />
          )}
          <div className="flex items-center gap-2">
            {/* Icon placeholder - we'll add actual icons later */}
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg 
                className="w-3 h-3 text-emerald-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-neutral-700">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}