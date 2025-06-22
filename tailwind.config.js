/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/App.tsx' ,
     './src/layout/MainLayout.tsx' ,
      './src/components/Navbar.tsx' ,
      './src/components/ExpenseDasboard.tsx' ,
      './src/components/Transactions.tsx' ,
      './src/components/AddExpense.tsx' ,
      './src/components/Footer.tsx' ,
      './src/components/Categories.tsx' ,
      './src/pages/AllTransactions.tsx' ,
      './src/pages/NotFound.tsx'
    ],
  theme: {
    extend: {
      fontFamily : {
        quicksand : ['quicksand' , 'sans-serif'],
        truculenta : ["Truculenta", 'sans-serif'],
        archivo : [ "Archivo", 'sans-serif' ]
      }
    },
  },
  plugins: [],
}

