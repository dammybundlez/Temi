interface DonutChartProps {
  income: number
  spent: number
  size?: number
  strokeWidth?: number
  gap?: number
  className?: string
}

const DonutChart = ({
  income,
  spent,
  size = 160,
  strokeWidth = 5,
  gap = 2,
  className = '',
}: DonutChartProps) => {
  const radius = 14
  const circumference = 2 * Math.PI * radius
  const total = income + spent
  const net = income - spent

  const hasData = total > 0
  const isMixed = income > 0 && spent > 0

  const gapAngle = isMixed ? gap : 0
  const availableAngle = 360 - gapAngle

  const incomeAngle = hasData ? (income / total) * availableAngle : 0
  const spentAngle = hasData ? (spent / total) * availableAngle : 0

  const incomeArc = (incomeAngle / 360) * circumference
  const spentArc = (spentAngle / 360) * circumference
  const gapArc = (gapAngle / 360) * circumference

  const spentOffset = isMixed ? -(incomeArc + gapArc) : 0

  const formatCompact = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(val)

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        className="-rotate-90"
      >
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />

        {hasData && (
          <>
           <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="#10b981"
              strokeWidth={strokeWidth}
              strokeDasharray={`${incomeArc} ${circumference}`}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />

            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="#f43f5e"
              strokeWidth={strokeWidth}
              strokeDasharray={`${spentArc} ${circumference}`}
              strokeDashoffset={spentOffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </>
        )}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Net
        </span>
        <span
          className={`text-sm font-bold ${
            net >= 0 ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {formatCompact(net)}
        </span>
      </div>
    </div>
  )
}

export default DonutChart