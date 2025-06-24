import { useEffect, useState } from "react"
import AddExpense from "../components/AddExpense"
import ExpenseDasboard from "../components/ExpenseDasboard"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Transactions from "../components/Transactions"

interface Expense  {
    id : string;
    amount : number;
    category : string;
    payment : string
    type : "income" | "expense"
}

const MainLayout = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('expense');
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  return (
    <div className="font-archivo bg-slate-50">
      <Navbar/>
        <main className=" flex flex-col mt-1 h-screen px-6 space-y-4 lg:flex-row lg:justify-between lg:items-start relative">
          <ExpenseDasboard expenses={expenses}  />
          <Transactions items={expenses} />
        </main>
        <AddExpense expense={expenses} setExpense={setExpenses} />
        <Footer />
    </div>
  )
}

export default MainLayout
