import { Toaster as Sonner } from 'sonner'

const Toaster = () => {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: '#0f172a',
          color: '#f4f4f4',
          border: '1px solid #1e293b',
        },
      }}
    />
  )
}

export default Toaster