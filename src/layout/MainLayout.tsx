import AddExpense from "../components/AddExpense"
import ExpenseDashboard from "../components/ExpenseDasboard"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Transactions from "../components/Transactions"


const MainLayout = () => {

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <Navbar />
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <section>
          <ExpenseDashboard />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2">
            <Transactions />
          </div>
        </div>
      </main>
      <AddExpense />

      <Footer />
    </div>
  )
}

export default MainLayout