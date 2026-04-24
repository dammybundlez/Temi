import { ChevronDown } from "lucide-react"

interface CategoryProps {
  type: 'income' | 'expense'
  value: string
  onChange: (value: string) => void
  label?: string
}

const incomeCategories = [
  { value: 'Salary / Wages', emoji: '💼' },
  { value: 'Freelance', emoji: '🧑‍💻' },
  { value: 'Business Income', emoji: '🏢' },
  { value: 'Investment Returns', emoji: '📈' },
  { value: 'Gifts', emoji: '🎁' },
  { value: 'Dividends', emoji: '💸' },
  { value: 'Pension', emoji: '👴' },
]

const expenseCategories = [
  { value: 'Food & Groceries', emoji: '🍔' },
  { value: 'Utilities', emoji: '💡' },
  { value: 'Rent / Mortgage', emoji: '🏠' },
  { value: 'Entertainment', emoji: '🎮' },
  { value: 'Insurance', emoji: '🛡️' },
  { value: 'Travel', emoji: '✈️' },
  { value: 'Subscriptions', emoji: '📺' },
  { value: 'Others', emoji: '📝' },
]

const Categories = ({ type, value, onChange, label }: CategoryProps) => {
  const options = type === 'income' ? incomeCategories : expenseCategories

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full appearance-none rounded-xl border bg-white py-2.5 pl-4 pr-10 text-sm 
            text-slate-900 placeholder:text-slate-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900
            ${value ? 'border-slate-300' : 'border-slate-200'}
            hover:border-slate-300
          `}
        >
          <option value="" disabled>
            Select a {type} category
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.emoji} {opt.value}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

export default Categories