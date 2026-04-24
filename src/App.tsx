import { BrowserRouter as Router , Route , Routes  } from "react-router-dom"
import { Suspense , lazy } from "react"
import Toaster  from "./components/Toaster"
import './App.css'

const MainLayout = lazy(() => import('./layout/MainLayout'))
const AllTransactions = lazy(() => import('./pages/AllTransactions'))
const NotFound = lazy(() => import('./layout/NotFound'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={
        <div className="flex items-center justify-center py-10">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 animate-pulse">
            <div className="h-4 w-20 bg-slate-200 rounded mb-3" />
            <div className="h-8 w-32 bg-slate-200 rounded" />
          .
          </div>
        </div>
      }>
        <Toaster />
        <Routes>
          <Route path='/' element={<MainLayout/>} />
          <Route path='/transactions' element={<AllTransactions/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Suspense>
    </Router>

  )
}

export default App
