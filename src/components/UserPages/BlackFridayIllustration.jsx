import React from "react";

const BlackFridayIllustration = () => {
  return (
    <div className="w-full flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
      <svg
        viewBox="0 0 1200 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-5xl"
      >
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2b2b2d" />
            <stop offset="100%" stopColor="#3d3d40" />
          </linearGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#grad)" rx="20" />

        {/* Smartphone */}
        <rect x="750" y="120" width="180" height="360" rx="20" fill="#111" />
        <circle cx="840" cy="140" r="4" fill="#333" />

        {/* Credit Card */}
        <rect x="700" y="180" width="200" height="120" rx="10" fill="#222" />
        <rect x="720" y="200" width="50" height="35" rx="5" fill="#555" />

        {/* Shopping Bags */}
        <rect x="950" y="370" width="90" height="120" rx="8" fill="#111" />
        <path
          d="M960 370 Q995 330 1040 370"
          stroke="#333"
          strokeWidth="6"
          fill="none"
        />
        <rect x="880" y="390" width="70" height="90" rx="6" fill="#111" />
        <path
          d="M890 390 Q915 360 940 390"
          stroke="#333"
          strokeWidth="5"
          fill="none"
        />

        {/* T-Shirts */}
        <path
          d="M680 420 h40 v70 h-40 z M660 420 l20 0 v70 h-20 z M720 420 l20 0 v70 h-20 z"
          fill="#111"
        />
        <path
          d="M600 420 h40 v70 h-40 z M580 420 l20 0 v70 h-20 z M640 420 l20 0 v70 h-20 z"
          fill="#111"
        />

        {/* Clouds */}
        <g fill="#ddd">
          <circle cx="900" cy="100" r="20" />
          <circle cx="930" cy="100" r="15" />
          <circle cx="915" cy="85" r="12" />
        </g>
        <g fill="#ddd">
          <circle cx="1000" cy="150" r="15" />
          <circle cx="1020" cy="150" r="10" />
          <circle cx="1010" cy="135" r="8" />
        </g>

        {/* Paper Plane */}
        <polygon
          points="1020,240 1060,260 1020,280 1030,260"
          fill="#eaeaea"
        />

        {/* Decorative Dots / Plus */}
        <circle cx="1050" cy="320" r="3" fill="#aaa" />
        <circle cx="1080" cy="340" r="3" fill="#aaa" />
        <rect x="980" y="220" width="2" height="10" fill="#aaa" />
        <rect x="976" y="224" width="10" height="2" fill="#aaa" />
      </svg>
    </div>
  );
};

export default BlackFridayIllustration;
