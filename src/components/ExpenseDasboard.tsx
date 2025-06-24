import { useEffect, useState } from "react"
import '../styles/ExpenseDasboard.css'
import PieChart from "./PieChart"

type Filter = 'all' | 'daily' | 'weekly' | 'monthly' | 'yearly'

interface Sum {
  id : string;
  amount : string | number;
  type : 'income' | 'expense' ;
}

 const formatAmount = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

interface ExpenseDashboardProps {
  expenses: Sum[]
}

const ExpenseDasboard = ({ expenses } : ExpenseDashboardProps) => {
  const [ filter , setFilter ] = useState<Filter>('all')
  const [ total , setTotal ] = useState(0)
  const [ income , setIncome ] = useState(0)
  const [ expense , setExpense ] = useState(0)

      useEffect(() => {
          if (Array.isArray(expenses)) {  
          const income = expenses.filter(t => t.type === 'income').reduce((sum , t) => sum + Number(t.amount) , 0)
          const expense = expenses.filter(t => t.type === 'expense').reduce((sum , t) => sum + Number(t.amount) , 0)
          const total = (income + expense)

          setIncome(income)
          setExpense(expense)
          setTotal(total)
        }
      }, [expenses])
  
  return (
    <div className="flex flex-col space-y-4 mt-4">
      <div className="flex gap-4 w-full overflow-x-auto no-scrollbar space-x-2 min-w-[80px]">
        {(['all' , 'daily' , 'weekly' , 'monthly' , 'yearly'] as Filter[]).map(e => (
          <button key={e} onClick={() => setFilter(e)}
            className={`px-6 py-2 rounded-xl text-md text-black border-2 font-medium transition
              ${filter === e
                ? 'border-[#c6e6b8]'
                : 'border-gray-200 text-gray-600'}`}
                >
                {e === 'all' && 'All'}
                {e === 'daily' && 'Daily'}
                {e === 'weekly' && 'Weekly'}
                {e === 'monthly' && 'Monthly'}
                {e === 'yearly' && 'Yearly'}
          </button>
        ))}
      </div>
      <div className="w-full bg-white shadow-sm p-2 rounded-2xl flex items-center justify-between py-4">
          <div className="space-y-5">
            <div className="flex flex-col">
              <div className="flex items-start gap-2">
                <span className="content"></span>
                <div>
                  <p className="font-normal text-gray-500">Income</p>
                  <h1 className="text-2xl font-bold">{formatAmount(income)}</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-start gap-2">
                <span className="spent"></span>
                <div>
                  <p className="font-normal text-gray-500">Spent</p>
                  <h1 className="text-2xl font-bold">{formatAmount(expense)}</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-start gap-2">
                <span className="total"></span>
                <div>
                  <p className="font-normal text-gray-500">Total</p>
                  <h1 className="text-2xl font-bold">{formatAmount(total)}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <PieChart  income={income} spent={expense} />
          </div>
      </div>        
    </div>
  )
}

export default ExpenseDasboard
