interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function PillarCard({ 
  icon, 
  title, 
  description,
  className = '' 
}: PillarCardProps) {
  return (
    <div className={`group bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-shadow duration-500 ${className}`}>
      
      {/* Icon */}
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:opacity-80 transition-opacity duration-500">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-neutral-600 leading-relaxed">
        {description}
      </p>

    </div>
  );
}