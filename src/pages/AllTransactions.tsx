import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface AllTransac {
  id : string;
  category : string,
  amount: number,
  payment : string
  type: string
}

const formatAmount = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const AllTransactions = () => {
  const [ items , setItem ] = useState<AllTransac[]>([])
  const [ hasMounted , setHasMounted ] = useState(false)
  
    useEffect(() => {
      setHasMounted(true)
      const stored = localStorage.getItem('expense')
      if(stored){
        try {
          setItem(JSON.parse(stored))
        } catch (err) {
          console.error('Failed to parse localStorage data:', err);
        }
      }
    }, [])

    useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('expense', JSON.stringify(items));
    }
  }, [items , hasMounted]);


    const removeExpense = ( id : string ) => {
      setItem(items.filter(t => t.id !== id))
      localStorage.setItem('expense' , JSON.stringify(items.filter(t => t.id !== id)))
    }

  return (
    <div className="">
      <Navbar/>
      <div className="flex h-screen flex-col px-6 space-y-4 mt-1 bg-slate-50 pt-5 font-archivo">
        <h1 className="text-2xl text-gray-600 pb-1">Transactions</h1>
        {items.length === 0 && (
                  <p className="text-gray-400 text-sm italic">No Expenses yet.</p>
          )}
            {items.map(item => (
          <div className="flex items-center group">
            <div>
              <p onClick={() => removeExpense(item.id)} className="px-2 bg-red-500 text-white font-bold invisible group-hover:visible cursor-pointer">X</p>
            </div>
            <div className='flex justify-between items-center shadow-sm p-2 rounded-md bg-white w-full'>
              <div className='flex gap-3 items-center'>
                  <div>
                      <h5 className='text-lg font-semibold text-gray-800 capitalize'>{item.category}</h5>
                      <p className='font-light text-sm text-gray-800 ml-7'>{item.payment}</p>
                  </div>
              </div>
              <div className='flex flex-col items-end'>
                  <p className={`font-semibold text-lg ${item.type === 'income' ? 'text-green-600' : 'text-red-600'} text-gray-800`}>{formatAmount(item.amount)}</p>
                  <p className=' text-xs font-medium text-gray-800'>{item.id}</p>
              </div>
            </div>
          </div>
          ))
        }
      </div>
      <Footer />
    </div>
  )
}

export default AllTransactions
