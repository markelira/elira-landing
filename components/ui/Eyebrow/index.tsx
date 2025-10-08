import { HTMLAttributes } from 'react';

interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'premium';
}

export function Eyebrow({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}: EyebrowProps) {
  const variantStyles = {
    default: 'bg-slate-50 border-slate-200 text-slate-700',
    premium: 'bg-slate-50 border-slate-200 text-slate-800',
  };

  return (
    <div 
      className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-semibold ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}