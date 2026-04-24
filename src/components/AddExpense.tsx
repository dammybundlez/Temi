import { useState } from 'react'
import {
  X,
  Plus,
  DollarSign,
  Wallet,
  CreditCard,
  Landmark,
} from 'lucide-react'
import Categories from './Categories'
import { useExpenseStore, type Type } from '../stores/useExpenseStore'

type PaymentType = 'Cash' | 'Credit/Debit Card' | 'Check'

const PAYMENT_META: Record<PaymentType, { icon: typeof Wallet; label: string }> = {
  Cash: { icon: Wallet, label: 'Cash' },
  'Credit/Debit Card': { icon: CreditCard, label: 'Card' },
  Check: { icon: Landmark, label: 'Check' },
}

const AddExpense = () => {
  const addExpense = useExpenseStore((state) => state.addExpense)
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [payment, setPayment] = useState<PaymentType>('Cash')
  const [type, setType] = useState<Type>('expense')
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetForm = () => {
    setAmount('')
    setCategory('')
    setPayment('Cash')
    setType('expense')
    setError(null)
  }

  const handleOpen = () => {
    setIsOpen(true)
    setError(null)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(resetForm, 300)
  }

  const handleSubmit = () => {
    const parsed = parseFloat(amount)

    if (!amount || isNaN(parsed) || parsed <= 0) {
      setError('Please enter a valid amount')
      return
    }
    if (!category) {
      setError('Please select a category')
      return
    }

    addExpense({
      amount: parsed,
      category,
      payment: payment.trim(),
      type,
    })

    handleClose()
  }

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={handleClose}
      />

      <div
        className={`
          fixed inset-x-0 bottom-0 z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 rounded-full bg-slate-200" />
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Add Transaction</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              {(['income', 'expense'] as Type[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`
                    py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                    ${
                      type === t
                        ? t === 'income'
                          ? 'bg-white text-emerald-600 shadow-sm'
                          : 'bg-white text-rose-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }
                  `}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    setError(null)
                  }}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  className={`block w-full pl-10 pr-4 py-3 rounded-xl border bg-whitetext-lg font-semibold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors
                    ${error && !amount ? 'border-rose-300' : 'border-slate-200'}
                  `}
                />
              </div>
            </div>

            <Categories
              type={type}
              value={category}
              onChange={(val) => {
                setCategory(val)
                setError(null)
              }}
              label="Category"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Cash', 'Credit/Debit Card', 'Check'] as PaymentType[]).map(
                  (p) => {
                    const { icon: Icon, label } = PAYMENT_META[p]
                    return (
                      <button
                        key={p}
                        onClick={() => setPayment(p)}
                        className={`
                          flex flex-col items-center gap-2 py-3 px-2 rounded-xl border-2 transition-all duration-200
                          ${
                            payment === p
                              ? 'border-slate-900 bg-slate-50 text-slate-900'
                              : 'border-slate-200 text-slate-500 hover:border-slate-300'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{label}</span>
                      </button>
                    )
                  }
                )}
              </div>
            </div>

            {error && (
              <p className="text-sm text-rose-600 font-medium text-center animate-pulse">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleClose}
                className="flex-1 py-3.5 rounded-xl border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={`
                  flex-1 py-3.5 rounded-xl text-sm font-bold text-white transition-colors
                  ${
                    type === 'income'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-slate-900 hover:bg-slate-800'
                  }
                `}
              >
                Add {type === 'income' ? 'Income' : 'Expense'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={handleOpen}
        className={`
          fixed right-6 bottom-6 z-30
          w-14 h-14 rounded-full shadow-lg shadow-slate-900/20
          flex items-center justify-center
          transition-all duration-300 hover:scale-110 active:scale-95
          ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          bg-slate-900 hover:bg-slate-800 text-white
        `}
      >
        <Plus className="w-6 h-6" />
      </button>
    </>
  )
}

export default AddExpense