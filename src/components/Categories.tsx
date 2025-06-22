interface CategoryProps {
    type : 'income' | 'expense'
    value : string
    onChange : ( value : string ) => void
}

const incomeCategories = [
  { value: '💼 Salary / Wages' },
  { value: '🧑‍💻 Freelance' },
  { value: '🏢 Business Income' },
  { value: '📈 Investment Returns' },
  { value: '🎁 Gifts' },
  { value: '💸 Dividends' },
  { value: '👴 Pension'},
];

const expenseCategories = [
  { value: '🍔 Food & Groceries', },
  { value: '💡 Utilities' },
  { value: '🏠 Rent / Mortgage' },
  { value: '🎮 Entertainment' },
  { value: '🛡️ Insurance',  },
  { value: '✈️ Travel',  },
  { value: '📺 Subscriptions'},
  { value: 'Others'},

];

const Categories = ({type , value , onChange} : CategoryProps) => {
  const options = type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="relative w-full">
      <select
        title="select"
        name="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block appearance-none w-full bg-white  border border-[#c6e6b8] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
        <option value="">Select {type} category</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.value}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 dark:text-gray-300">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          >
          <path d="M5.516 7.548l4.484 4.486 4.485-4.486L15.484 9l-6 6-6-6z" />
        </svg>
      </div>
    </div>
  );
}

export default Categories
