import { useExpenseStore } from '../stores/useExpenseStore'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Receipt,
  ShoppingBag,
  Coffee,
  Car,
  Home,
  Zap,
  Film,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Landmark,
  CreditCard,
  Wallet,
  Calendar,
  SlidersHorizontal,
  TrendingUp,
  Shield,
  Plane,
} from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'

const formatAmount = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

const getCategoryMeta = (category: string) => {
  const normalized = category.toLowerCase().replace(/[^\w\s]/g, '').trim()
  
  const map: Record<string, { icon: typeof Receipt; color: string; bg: string }> = {
    'salary wages': { icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    freelance: { icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    'business income': { icon: Landmark, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    'investment returns': { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    dividends: { icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    pension: { icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    gifts: { icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    'food groceries': { icon: ShoppingBag, color: 'text-orange-600', bg: 'bg-orange-50' },
    food: { icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-50' },
    groceries: { icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    transport: { icon: Car, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    'rent mortgage': { icon: Home, color: 'text-purple-600', bg: 'bg-purple-50' },
    rent: { icon: Home, color: 'text-purple-600', bg: 'bg-purple-50' },
    utilities: { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    entertainment: { icon: Film, color: 'text-pink-600', bg: 'bg-pink-50' },
    insurance: { icon: Shield, color: 'text-slate-600', bg: 'bg-slate-100' },
    travel: { icon: Plane, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    subscriptions: { icon: CreditCard, color: 'text-violet-600', bg: 'bg-violet-50' },
    health: { icon: HeartPulse, color: 'text-red-600', bg: 'bg-red-50' },
    education: { icon: GraduationCap, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    others: { icon: Receipt, color: 'text-slate-600', bg: 'bg-slate-100' },
  }

  return map[normalized] || { icon: Receipt, color: 'text-slate-600', bg: 'bg-slate-100' }
}

const AllTransactions = () => {
  const expenses = useExpenseStore((state) => state.expenses)
  const deleteExpense = useExpenseStore((state) => state.deleteExpense)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'amount'>('newest')

  const sortedExpenses = [...expenses].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'amount':
        return b.amount - a.amount
      default:
        return 0
    }
  })

  const totalIncome = expenses
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0)
  const totalExpense = expenses
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
            <p className="text-sm text-slate-500 mt-1">
              {expenses.length} total · {formatAmount(totalIncome)} in ·{' '}
              {formatAmount(totalExpense)} out
            </p>
          </div>
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="amount">Highest amount</option>
            </select>
            <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Income
            </p>
            <p className="text-xl font-bold text-emerald-600 mt-1">
              {formatAmount(totalIncome)}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Expenses
            </p>
            <p className="text-xl font-bold text-rose-600 mt-1">
              {formatAmount(totalExpense)}
            </p>
          </div>
        </div>

        {expenses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50">
            <Receipt className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium text-lg">No transactions yet</p>
            <p className="text-slate-400 text-sm mt-1">
              Add your first transaction from the dashboard
            </p>
          </div>
        )}

        <div className="space-y-2">
          {sortedExpenses.map((item) => {
            const { icon: Icon, color, bg } = getCategoryMeta(item.category)
            const isIncome = item.type === 'income'
            const date = new Date(item.date)

            return (
              <div
                key={item.id}
                className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              >
                <div
                  className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl ${bg} ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900 capitalize truncate">
                      {item.category.replace(/[^\w\s]/g, '').trim()}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${
                        isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-slate-500 capitalize">
                      {item.payment}
                    </p>
                    <span className="text-slate-300">·</span>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="w-3 h-3" />
                      {format(date, 'MMM d, yyyy · h:mm a')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div
                      className={`flex items-center justify-end gap-1 text-sm font-bold ${
                        isIncome ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
                      )}
                      <span>
                        {isIncome ? '+' : '-'}
                        {formatAmount(Math.abs(item.amount))}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      #{item.id.slice(-6)}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteExpense(item.id)}
                    className="p-2 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete transaction"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AllTransactions