import React from 'react';

type DonutChartProps = {
  income: number
  spent: number
  size?: number
  gap?:number
}

const PieChart: React.FC<DonutChartProps> = ({ income, spent, size = 160 , gap = 1 }) => {
  const total = income + spent;
  const radius = 14;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;

  const totalGap = 360 - gap

  const incomeDegrees = (income / total) * totalGap
  const spentDegrees = (spent / total) * totalGap


  const incomeDash = (incomeDegrees / 360) * circumference;
  const spentDash = (spentDegrees/ 360) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      className="rotate-[-90deg]"
    >
      {/* Background ring */}
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke="#e5e7eb" 
        strokeWidth={strokeWidth}
      />

      {/* Income arc */}
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke="#c6e6b8" 
        strokeWidth={strokeWidth}
        strokeDasharray={`${incomeDash} ${circumference}`}
        strokeDashoffset={3}
        strokeLinecap="round"
      />

      {/* Spent arc (offset by incomeDash + gap) */}
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke="rgb(188, 62, 62)" 
        strokeWidth={strokeWidth}
        strokeDasharray={`${spentDash} ${circumference}`}
        strokeDashoffset={`${-incomeDash - ((gap))}`}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PieChart;