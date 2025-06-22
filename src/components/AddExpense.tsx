
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import Categories from './Categories'
import { format } from 'date-fns';

import '../styles/AddExpense.css'

type PaymentType = 'Cash' | 'Credit/Debit Card' | 'Check'

interface Expense  {
    id : string;
    amount : number;
    category : string;
    payment : string
    type : "income" | "expense"
}
type Type = 'income' | 'expense'

interface AddExpenseProps {
  expense: Expense[];
  setExpense: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const AddExpense = ({ expense , setExpense } : AddExpenseProps) => {
    const [ amount , setAmount ] = useState('')
    const [ category , setCategory ] = useState<string>('')
    const [ payment , setPayment] = useState<PaymentType>('Cash')
    const [ isShow , setIsShow ] = useState<boolean>(true)
    const [ hasMounted , setHasMounted ] = useState(false)
    const [ type , setType ] = useState<Type>('income')

    useEffect(() => {
        setHasMounted(true);
        const saved = typeof window !== 'undefined' && localStorage.getItem('expense');
        if (saved) {
        try {
            const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
            setExpense(parsed);
            }
        } catch (err) {
           console.error('Failed to parse localStorage:', err);
        }
        }
    }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('expense', JSON.stringify(expense));
    }
  }, [expense, hasMounted]);

  const now = new Date()

    const addExpense = () => {
        if (!amount || !category || !payment.trim()) return
        const newExpense : Expense = {
            id : format(now , 'yyyy-MM-dd HH:mm:ss'),
            amount : parseFloat(amount),
            type,
            category : category,
            payment : payment.trim(),
        }
        setExpense([ ...expense , newExpense ])
        setAmount('');
        setCategory('')
        setIsShow(!isShow)
        localStorage.setItem('expense', JSON.stringify([ ...expense , newExpense ]))
    }

    const handleShow = () => {
        setIsShow((prev) => !prev)
    }
    
    const cancel = () => {
        setIsShow(!isShow)
    }
  return (
    <div className={`fixed w-full left-0  ${isShow ? 'bottom-[-55rem] ' : 'bottom-[0]'} shadow-2xl z-30 ease-in transition-all  `}>
        <div className='rounded-t-3xl bg-white shadow-2xl py-3 px-5 transition ease-in'>
            <h3 className='text-center mb-10 mt-3 text-2xl'>Add Transaction</h3>
            <div className='flex flex-col space-y-5 md:flex-row lg:flex-row md:justify-between lg:justify-between md:gap-6 lg:gap-5'>
                <div className='flex flex-col space-y-4 md:w-full lg:w-full'>
                    <div className='wave-group bg-slate-100 py-6 rounded-md'>
                        <input value={amount} onChange={(e) => setAmount(e.target.value)} required type="number" title='amount' id='amount' name='amount' placeholder='$'
                                min="0"
                                step="0.01"
                                inputMode="decimal" className='input mt-3' />
                        <span className="bar"></span>
                        <label className='label' id="label" htmlFor='amount' >
                            <span className="label-char" style={{ ['--index' as any]: 0 }}>A</span>
                            <span className="label-char" style={{ ['--index' as any]: 1 }}>m</span>
                            <span className="label-char" style={{ ['--index' as any]: 2 }}>o</span>
                            <span className="label-char" style={{ ['--index' as any]: 3 }}>u</span>
                            <span className="label-char" style={{ ['--index' as any]: 4 }}>n</span>
                            <span className="label-char" style={{ ['--index' as any]: 5 }}>t</span>
                        </label>
                    </div>
                    <div className='bg-slate-100 p-2 rounded-md flex flex-col space-y-4 font-thin font-quicksand px-[31px] gap-2 py-4'>
                        <p>Category</p>
                        <div className='flex justify-between items-center gap-2 w-full'>
                            {(['income', 'expense'] as Type[]).map(e => (
                            <button key={e} onClick={() => setType(e)}
                                className={`px-6 py-2 rounded-xl text-md text-black border-2 font-medium transition w-full
                                    ${type === e ? 'border-[#c6e6b8]' : 'border-gray-200 text-gray-600'}`}
                                    >
                                    {e === 'income' && 'income'}
                                    {e === 'expense' && 'expense'}              
                            </button>
                            ))}
                        </div>     
                        <Categories type={type} value={category} onChange={setCategory} />
                    </div>
                </div>
                <div className='lg:w-full md:w-full'>
                    <h2 className='mb-3 text-xl'>Payment Type</h2>
                    <div className='flex flex-col gap-2 md:gap-4 md:w-full lg:w-full'>
                        {(['Cash' , 'Credit/Debit Card' , 'Check' ] as PaymentType[]).map(e => (     
                            <button key={e} onClick={() => setPayment(e)}
                                className={`py-3 px-2 rounded-3xl text-md text-black border-2 font-medium transition flex items-center gap-2 w-48
                                    ${payment === e
                                        ? 'border-[#c6e6b8]'
                                        : 'border-gray-300 text-gray-600'}`}
                                    >
                                    <input
                                        type="checkbox"
                                        className="hidden peer" 
                                        title='checkbox'  
                                        name='check'     
                                    />
                                    <div className="w-5 h-5 rounded-full border-2 border-[#c6e6b8] flex items-center justify-center peer-checked:bg-green-100">
                                        <div className={`w-2.5 h-2.5 rounded-full bg-[#c6e6b8] peer-checked:block ${payment === e ? 'block' : 'hidden'}`}></div>
                                    </div>
                                    {e === 'Cash' && 'Cash'}
                                    {e === 'Credit/Debit Card' && 'Credit/Debit Card'}
                                    {e === 'Check' && 'Check'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center gap-2 w-full mt-24 mb-12'>
                <button onClick={cancel} className={`bg-transparent border-2 border-gray-200 font-bold rounded-3xl p-4 w-1/2`}>Cancel</button>
                <button onClick={addExpense} className='bg-[#c6e6b8] font-bold rounded-3xl p-4 w-1/2'>Add</button>
            </div>
        </div>
      <button onClick={handleShow} title='button'  className='fixed right-4 bottom-4 z-[-40] bg-[#c6e6b8] rounded-full p-7 opacity-80'> <FaPlus className='w-7 h-7 font-light'/> </button>
    </div>
  )
}

export default AddExpense
