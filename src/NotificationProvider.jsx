import React, { useState } from 'react'
import { createContext } from 'react'

export const ToastContext=createContext();

const ToastProvider = ({children}) => {
    const[show,setShow]=useState(false);
    const[message,setMessage]=useState("");
    const[progressBar,setProgressBar]=useState(90);
    const [variant,setVariant]=useState({
        info:"",
        success:"",
        error:"",
    })
    const tiggerToast=(msg)=>{
        setMessage(msg);
        setShow(true);
        setProgressBar(100);
        
        let interval;
        interval=setInterval(()=>{
            setProgressBar((prev)=>{
                if(prev<=0){
                    clearInterval(interval);
                    setShow(false);
                    return 0;
                }
                return prev-2;
            })
        },100)
        // setTimeout(()=>{
        //     setShow(false);
        //     setMessage("");
        // },3000);
    }
  return (
    <ToastContext.Provider value={{show,setShow,tiggerToast}} >
        <div className='relative'>
             {children}
            {show &&(
             <div className='absolute bg-white shadow rounded z-10 border border-gray-100 px-4 py-2 transition-all duration-300 top-10 right-4'>
               <div className='text-sm font-semibold tracking-wide'>
                {message}
                <div className="bg-green-400 h-1 rounded bottom-0"
                 style={{width:`${progressBar}%`}}
                />
               </div>
             </div>
            )}
        </div>
       
    </ToastContext.Provider>
  )
}

export default ToastProvider;