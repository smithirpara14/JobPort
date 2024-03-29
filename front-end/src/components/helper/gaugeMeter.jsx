import React from 'react';

const GaugeMeter = ({ value, min, max, label }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="gauge-meter">
      <h2>{label}</h2>
      <svg width="200" height="120" viewBox="0 0 200 120">
        <circle cx="100" cy="70" r="50" fill="none" stroke="#ccc" strokeWidth="10" />
        <circle
          cx="100"
          cy="70"
          r="50"
          fill="none"
          stroke="#007bff" // You can adjust the color here
          strokeWidth="10"
          strokeDasharray={`${percentage}, 100`}
          strokeLinecap="round"
          transform="rotate(-90, 100, 70)"
        />
        <text x="100" y="90" fontSize="20" textAnchor="middle" fill="#000">
          {value}
        </text>
      </svg>
    </div>
  );
};

export default GaugeMeter;
