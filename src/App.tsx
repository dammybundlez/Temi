import { BrowserRouter as Router , Route , Routes  } from "react-router-dom"
import { Suspense , lazy } from "react"

const MainLayout = lazy(() => import('./layout/MainLayout'))
const AllTransactions = lazy(() => import('./pages/AllTransactions'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="text-center py-10">⏳ Please wait...</div>}>
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
