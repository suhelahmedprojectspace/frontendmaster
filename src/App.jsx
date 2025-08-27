
import { useState,useContext } from 'react'
import './App.css'
// import { ToastContext} from './NotificationProvider';
// import ImageSlider from './components/ImageSlider';
// import TodoList from './components/TodoList';
// import ExpensesTracker from './components/ExpensesTracker';
// import UserDirectory from './components/userDirectory';
import KanbanBoard from './components/KanbanBoard';
// import Quiz from './components/Quiz';
// import Weather from './components/Weather';

// import Search from './components/Search';
// const categories = [
//   { id: 1, name: "Electronics", icon: "💻" },
//   { id: 2, name: "Clothing", icon: "👕" },
//   { id: 3, name: "Books", icon: "📚" },
//   { id: 4, name: "Home & Kitchen", icon: "🏠" },
// ];

function App() {
  return (
    <>
      <div className='flex items-center justify-center min-h-screen flex-col'>
       <h1 className='text-amber-300 text-6xl font-extrabold'>Frontend Masters</h1>
       <KanbanBoard/>
       </div>
    </>
  )
}

export default App
