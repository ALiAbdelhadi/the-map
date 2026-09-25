import { type SVGProps, useId } from "react";

/** language-toggle-en — Figma icon, recoloured to currentColor. */
export function LanguageToggleEnIcon(props: SVGProps<SVGSVGElement>) {
  // The icon renders twice (header and drawer); a shared gradient id would resolve to
  // the copy inside the hidden one, and the track would not paint.
  const gradient = `toggle-track-${useId().replace(/[^\w-]/g, "")}`;
  return (
    <svg
      width="59"
      height="24"
      viewBox="0 0 59 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <g>
          <path
            d="M12.0596 18.9348C15.9181 18.9348 19.0567 15.8272 19.0567 12.0068C19.0567 8.17955 15.9181 5.06641 12.0596 5.06641C8.20976 5.06641 5.07674 8.17802 5.0752 12.0037C5.07551 12.7225 5.18578 13.4161 5.39085 14.0689C6.27803 16.8853 8.93214 18.9348 12.0596 18.9348Z"
            fill="currentColor"
          />
          <path
            d="M12.0984 24H46.9016C53.5728 24 59 18.6168 59 12.0003C59 5.38318 53.5728 0 46.9016 0H12.0984C5.42717 0 0 5.38318 0 12.0003C0 18.6168 5.42717 24 12.0984 24ZM3.17204 12.0003C3.17204 7.11796 7.17675 3.14633 12.0984 3.14633H46.9016C51.8233 3.14633 55.828 7.11796 55.828 12.0003C55.828 16.882 51.8233 20.8537 46.9016 20.8537H12.0984C8.09924 20.8537 4.7054 18.2311 3.57381 14.6286C3.31299 13.7999 3.17204 12.9192 3.17204 12.0065C3.17204 12.0054 3.17235 12.0045 3.17235 12.0034C3.17235 12.0024 3.17204 12.0013 3.17204 12.0003Z"
            fill={`url(#${gradient})`}
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id={gradient}
          x1="0"
          y1="12"
          x2="59"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#087DFD" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}
