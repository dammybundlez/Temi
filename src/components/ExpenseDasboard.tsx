import { useExpenseStore , type FilterPeriod } from "../stores/useExpenseStore"
import { TrendingUp, TrendingDown, Wallet, Calendar } from "lucide-react"
import PieChart from "./PieChart"
import BarChart from "./BarChart"


const formatAmount = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

const FILTER_LABELS: Record<FilterPeriod, string> = {
  all: 'All Time',
  daily: 'Today',
  weekly: 'This Week',
  monthly: 'This Month',
  yearly: 'This Year',
}

const ExpenseDashboard = () => {
  const {filter, setFilter, getTotals} = useExpenseStore()
  const { income , expense , net } = getTotals()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {(['all', 'daily', 'weekly', 'monthly', 'yearly'] as FilterPeriod[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
              ${filter === f
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                : 'bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-slate-200'
              }
            `}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-5 transition hover:shadow-md">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp className="w-16 h-16 text-emerald-600" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-500">Total Income</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">
            {formatAmount(income)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <TrendingUp className="w-3 h-3" />
            <span>Inflow</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-5 transition hover:shadow-md">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingDown className="w-16 h-16 text-rose-600" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-50 text-rose-600">
              <TrendingDown className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-500">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">
            {formatAmount(expense)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs font-medium text-rose-600">
            <TrendingDown className="w-3 h-3" />
            <span>Outflow</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-5 text-white transition hover:shadow-lg hover:shadow-slate-900/20">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet className="w-16 h-16 text-white" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-300">Net Flow</span>
          </div>
          <p className="text-2xl font-bold tracking-tight">
            {formatAmount(net)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs font-medium text-slate-400">
            <Calendar className="w-3 h-3" />
            <span className="capitalize">{FILTER_LABELS[filter]}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Spending Overview</h3>
          <p className="text-sm text-slate-500 mb-6">
             {filter === 'all' ? 'This week\'s breakdown' : `${FILTER_LABELS[filter]} spending`}
          </p>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            <BarChart />
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-1 w-full text-left">Distribution</h3>
          <p className="text-sm text-slate-500 mb-6 w-full text-left">Income vs Expenses</p>
          <div className="w-48 h-48">
            <PieChart income={income} spent={expense} />
          </div>
          <div className="mt-6 w-full space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-600">Income</span>
              </div>
              <span className="font-semibold text-slate-900">{formatAmount(income)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-slate-600">Expenses</span>
              </div>
              <span className="font-semibold text-slate-900">{formatAmount(expense)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseDashboard