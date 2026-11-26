import React from 'react';
import { ExternalLink } from 'lucide-react';

interface GoogleMapsButtonProps {
  url: string;
  label?: string;
  compact?: boolean;
  className?: string;
}

/**
 * Iconic Google Maps branded action button with the recognizable 4-color Maps Pin SVG
 * so visitors immediately recognize exact GPS location navigation at a glance.
 */
export const GoogleMapsButton: React.FC<GoogleMapsButtonProps> = ({
  url,
  label = 'Open Google Maps Location',
  compact = false,
  className = ''
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title="Open Exact Site Pin in Google Maps"
      className={`inline-flex items-center justify-between gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold border border-slate-200 shadow-md transition active:scale-[0.98] ${
        compact
          ? 'px-2.5 py-1 rounded-full text-[10px]'
          : 'px-4 py-3 rounded-2xl text-xs shadow-lg'
      } ${className}`}
    >
      <span className="flex items-center gap-2">
        {/* Authentic 4-color Google Maps Location Pin Icon */}
        <svg
          viewBox="0 0 24 32"
          className={compact ? 'w-3.5 h-4.5 shrink-0' : 'w-5 h-6 shrink-0'}
          aria-hidden="true"
        >
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 8.25 10.5 18.8 11.4 19.65a.85.85 0 0 0 1.2 0C13.5 30.8 24 20.25 24 12 24 5.37 18.63 0 12 0z"
            fill="#EA4335"
          />
          <path d="M12 0C5.37 0 0 5.37 0 12c0 2.75.93 5.29 2.48 7.32L12 12V0z" fill="#4285F4" />
          <path d="M2.48 19.32C4.7 22.25 7.98 25.92 10.2 28.3L12 12l-9.52 7.32z" fill="#FBBC04" />
          <path d="M12 12l9.52 7.32C23.07 17.29 24 14.75 24 12H12z" fill="#34A853" />
          <circle cx="12" cy="11.5" r="4.8" fill="#FFFFFF" />
        </svg>
        <span className="whitespace-nowrap">
          {compact ? (
            <>
              <span className="font-extrabold text-[#1a73e8]">Google</span> Maps Pin
            </>
          ) : (
            <>
              <span className="font-extrabold text-[#1a73e8]">Google</span>{' '}
              <span className="text-slate-700">Maps —</span> {label}
            </>
          )}
        </span>
      </span>
      <ExternalLink className={compact ? 'w-3 h-3 text-slate-500' : 'w-4 h-4 text-[#1a73e8] shrink-0'} />
    </a>
  );
};
