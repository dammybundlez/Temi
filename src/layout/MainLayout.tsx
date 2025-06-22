import AddExpense from "../components/AddExpense"
import ExpenseDasboard from "../components/ExpenseDasboard"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Transactions from "../components/Transactions"

const MainLayout = () => {
  return (
    <div className="font-archivo">
      <Navbar/>
        <main className="bg-slate-50 flex flex-col mt-1 h-screen px-6 space-y-4 lg:flex-row lg:justify-between lg:gap-4 lg:items-start relative">
          <ExpenseDasboard />
          <Transactions />
        </main>
        <AddExpense />
        <Footer />
    </div>
  )
}

export default MainLayout
