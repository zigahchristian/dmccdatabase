import React, { useEffect, useState } from "react";

interface LoadingProps {
  logoUrl: string; // URL of the logo to display in the middle
}

const Loading: React.FC<LoadingProps> = ({ logoUrl }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate the loading progress to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 10000) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Update every 50ms for a smooth fill effect

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-32 h-32">
        {/* SVG for water fill effect */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#FFFF00"
            strokeWidth="4"
            fill="none"
            className="animation: spin 1s linear infinite"
          />
          {/* Water fill circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#024240"
            strokeWidth="4"
            fill="#8B0000"
            style={{
              strokeDasharray: 2 * Math.PI * 45, // Circumference
              strokeDashoffset:
                2 * Math.PI * 45 - (progress / 100) * 2 * Math.PI * 45, // Dynamic stroke offset
              transform: "rotate(-90deg)",
              transformOrigin: "center",
            }}
          />
        </svg>

        {/* Logo in the center */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <img src={logoUrl} alt="Logo" className="w-24 h-24 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
