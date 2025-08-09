import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {motion,AnimatePresence} from "motion/react"
const Modal = ({title,description,open,setOpen}) => {
    useEffect(()=>{
        function handleEsckey(e){
            if(e.key==='Escape'){
                setOpen(false)
            }
        }
        if(open){
            window.addEventListener('keydown',handleEsckey);
        }
        return()=>{
            window.removeEventListener('keydown',handleEsckey)
        }
    },[open,setOpen]);
    if(!open) return null;
  return (
    <AnimatePresence>
   {
     open && (
    <div>
    <div className='fixed inset-0 bg-zinc-100/50 background-blur-md ' onClick={()=>setOpen(false)}></div>
    
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ ease: "easeInOut", duration: 0.2 }}
    className='mx-auto fixed top-1/4 left-1/2 transform bg-white -translate-x-1/2 w-[500px] mt-2 p-4 border border-gray-200 rounded shadow z-20'
     onClick={(e) => e.stopPropagation()}
    >  
        
      <div>
         <div className='flex w-full border-b border-gray-200 mb-2 items-center justify-between p-1 text-md font-semibold'>
            <div>
                {title}
            </div>
            <X className='w-4 h-4 ' onClick={()=>setOpen(false)}/>
        </div>
         <div className='text-sm'>{description}</div>
      </div>
    </motion.div>
    </div>       
     )
   }
    </AnimatePresence>
  )
}

export default Modal