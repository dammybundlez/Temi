import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { isToday, isThisWeek, isThisMonth, isThisYear, startOfDay, startOfWeek, startOfMonth, startOfYear, endOfYear, endOfMonth, endOfWeek, endOfDay, isWithinInterval } from 'date-fns'




export type FilterPeriod = 'all' | 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface Expense {
  id: string
  amount: number
  category: string
  payment: string
  type: 'income' | 'expense'
  date: string 
}

interface ExpenseStore {
  expenses: Expense[]
  filter: FilterPeriod
  setFilter: (filter: FilterPeriod) => void
  addExpense: (data: Omit<Expense, 'id' | 'date'>) => void
  deleteExpense: (id: string) => void
  getFilteredExpenses: () => Expense[]
  getTotals: () => { income: number; expense : number; net: number }
}

const isValidDate = (d: Date): boolean => !isNaN(d.getTime())

const filterByPeriod = (expenses: Expense[], period: FilterPeriod): Expense[] => {
  if (period === 'all') return expenses

  const now = new Date()
  const intervals = {
    daily: { start: startOfDay(now), end: endOfDay(now) },
    weekly: { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) },
    monthly: { start: startOfMonth(now), end: endOfMonth(now) },
    yearly: { start: startOfYear(now), end: endOfYear(now) },
  }

  const { start, end } = intervals[period]

  return expenses.filter((e) => {
    if (!e.date) return false 
    const d = new Date(e.date)
    if (!isValidDate(d)) return false
    return isWithinInterval(d, { start, end })
  })
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],
      filter: 'all',

      setFilter: (filter) => set({ filter }),

      addExpense: (data) => {
        const newExpense: Expense = {
          ...data,
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
        }
        set((state) => ({ expenses: [...state.expenses, newExpense] }))

        toast.success(`${data.type === 'income' ? 'Income' : 'Expense'} added`, {
                description: `${data.category} · ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(data.amount)}`,
            })},

      deleteExpense: (id) => {
        const expense = get().expenses.find((e) => e.id === id)
  
        set((state) => ({
        expenses: state.expenses.filter((e) => e.id !== id),
        }))
        
            if (expense) {
                toast('Transaction deleted', {
                description: `${expense.category} · ${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(expense.amount)}`,
                action: {
                    label: 'Undo',
                    onClick: () => {
                    set((state) => ({
                        expenses: [...state.expenses, expense].sort(
                        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                        ),
                    }))
                    toast.success('Restored')
                    },
                },
                })
            }
        },

      getFilteredExpenses: () => {
        const { expenses, filter } = get()
        return filterByPeriod(expenses, filter)
      },

      getTotals: () => {
        const filtered = get().getFilteredExpenses()
        const income = filtered
          .filter((e) => e.type === 'income')
          .reduce((sum, e) => sum + e.amount, 0)
        const expense = filtered
          .filter((e) => e.type === 'expense')
          .reduce((sum, e) => sum + e.amount, 0)
        return { income, expense, net: income - expense }
      },
    }),
    {
      name: 'expense-storage',
      partialize: (state) => ({ expenses: state.expenses }),
    }
  )
)