
import { useState,useContext } from 'react'
import './App.css'
import Pagination from './components/pagination';
import MultiSelect from './components/MultiSelect';
import { ToastContext} from './NotificationProvider';

import Search from './components/Search';
const categories = [
  { id: 1, name: "Electronics", icon: "💻" },
  { id: 2, name: "Clothing", icon: "👕" },
  { id: 3, name: "Books", icon: "📚" },
  { id: 4, name: "Home & Kitchen", icon: "🏠" },
];

function App() {
  const[open,setOpen]=useState(false);
  const {tiggerToast}=useContext(ToastContext);
  return (
    <>
      <div className='flex items-center justify-center min-h-screen flex-col'>
       <h1 className='text-amber-300 text-6xl font-extrabold'>Frontend Masters</h1>
       <Search/>
       <button
        onClick={() => tiggerToast("Hello, custom toast! 🚀")}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Show Toast
      </button>
       </div>
    </>
  )
}

export default App
