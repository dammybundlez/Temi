import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router'

interface Transactions {
    id : string,
    category : string,
    amount: number,
    payment : string,
    type : string
  }

  const formatAmount = (value: number) =>
   new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const Transactions = ({ items }: { items: Transactions[] }) => {
  return (
    <div className='flex flex-col space-y-3 lg:w-[50%]'>
      <div className='flex justify-between items-center'>
        <h4 className='text-xl text-gray-500'>Recent transactions</h4>
        <Link to='/transactions'><button className='flex items-center justify-between gap-4 rounded-full border-2 hover:border-[#c6e6b8] px-3 py-1 text-gray-500'>See All<FaAngleRight /></button></Link>
      </div>
       {items.length === 0 && (
          <p className="text-gray-400 text-sm italic">No Expenses yet.</p>
        )}
      {items.slice(0 ,5)?.map(item => (
        <div className='flex justify-between items-center shadow-sm p-2 rounded-lg bg-white '>
          <div className='flex gap-3 items-center'>
              <div>
                  <h5 className='text-lg font-semibold text-gray-800 capitalize'>{item.category}</h5>
                  <p className='font-light ml-7 text-sm  font text-gray-800'>{item.payment}</p>
              </div>
          </div>
          <div className='flex flex-col items-end'>
              <p className={` text-lg font-semibold ${item.type === 'income' ? 'text-green-700' : 'text-red-600'} text-gray-800`}>{formatAmount(item.amount)}</p>
              <p className='font-medium text-xs text-gray-800'>{item.id}</p>
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default Transactions
