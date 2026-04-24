import { Link } from 'react-router'
import { ChevronRight, ArrowUpRight, ArrowDownRight, Receipt, ShoppingBag, Coffee, Car, Home, Zap, Film, HeartPulse, GraduationCap, Briefcase, Trash2 } from 'lucide-react'
import { useExpenseStore } from '../stores/useExpenseStore'

const formatAmount = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

const getCategoryMeta = (category: string) => {
  const map: Record<string, { icon: typeof Receipt; color: string; bg: string }> = {
    salary: { icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    freelance: { icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    food: { icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-50' },
    groceries: { icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    transport: { icon: Car, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    rent: { icon: Home, color: 'text-purple-600', bg: 'bg-purple-50' },
    utilities: { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    entertainment: { icon: Film, color: 'text-pink-600', bg: 'bg-pink-50' },
    health: { icon: HeartPulse, color: 'text-red-600', bg: 'bg-red-50' },
    education: { icon: GraduationCap, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  }
  
const normalized = category.toLowerCase()
 return map[normalized] || { icon: Receipt, color: 'text-slate-600', bg: 'bg-slate-100' }
}

const Transactions = () => {
  const deleteExpenses = useExpenseStore((state) => state.deleteExpense);
  const filtered = useExpenseStore((state) => state.getFilteredExpenses())
  const displayItems = filtered.slice(0, 5)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Transactions
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {filtered.length} total
          </p>
        </div>
        <Link 
          to="/transactions"  className="group inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-all">
          See all
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50">
          <Receipt className="w-10 h-10 text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No transactions yet</p>
          <p className="text-slate-400 text-sm mt-1">Add your first expense to get started</p>
        </div>
      )}

      <div className="space-y-2">
        {displayItems.map((item) => {
          const { icon: Icon, color, bg } = getCategoryMeta(item.category)
          const isIncome = item.type === 'income'

          return (
            <div key={item.id} className="group flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${bg} ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 capitalize truncate">
                    {item.category}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 capitalize">
                    {item.payment}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-0.5 flex-shrink-0 ml-4">
                <div className={`flex items-center gap-1 text-sm font-bold ${isIncome ? 'text-emerald-600' : 'text-red-500'}`}>
                  {isIncome ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
                  )}
                  <span>{isIncome ? '+' : '-'}{formatAmount(Math.abs(item.amount))}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 tracking-wide">
                  #{item.id.slice(-6)}
                </span>
              </div>
              <button
                  onClick={() => deleteExpenses(item.id)}
                  className="p-2 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Transactions