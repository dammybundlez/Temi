// components/WeeklyBarChart.tsx
import { useMemo } from 'react'
import { useExpenseStore } from '../stores/useExpenseStore'
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { startOfWeek, addDays, isSameDay } from 'date-fns'

const formatAmount = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl">
      <p className="font-medium mb-1">{label}</p>
      <p className="text-emerald-400 font-bold">{formatAmount(payload[0].value)}</p>
    </div>
  )
}

const WeeklyBarChart = () => {
  const expenses = useExpenseStore((state) => state.expenses)
  const filter = useExpenseStore((state) => state.filter)

  const data = useMemo(() => {
    const filtered = useExpenseStore.getState().getFilteredExpenses()
    const expenseItems = filtered.filter((e) => e.type === 'expense')

    const today = new Date()
    const weekStart = startOfWeek(today, { weekStartsOn: 1 })
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    return days.map((day, i) => {
      const date = addDays(weekStart, i)
      const dayTotal = expenseItems
        .filter((e) => isSameDay(new Date(e.date), date))
        .reduce((sum, e) => sum + e.amount, 0)

      return {
        day,
        amount: dayTotal,
        isToday: isSameDay(date, today),
      }
    })
  }, [expenses, filter])

//   const maxAmount = Math.max(...data.map((d) => d.amount), 1)

  const hasData = data.some((d) => d.amount > 0)

  if (!hasData) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400">
        <p className="text-sm">No spending data for this period</p>
        <p className="text-xs text-slate-300 mt-1">Add expenses to see your breakdown</p>
      </div>
    )
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickFormatter={(val) => `$${val}`}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', radius: 4 }} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isToday ? '#10b981' : '#0f172a'}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyBarChart