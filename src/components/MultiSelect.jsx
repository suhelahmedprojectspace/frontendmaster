import React, { useState } from 'react';
import {AnimatePresence,motion} from 'motion/react'
import {X} from 'lucide-react'
const MultiSelect = ({options}) => {
    const[store,setStore]=useState([]);
    const handleSelect = (e) => {
  const value = e.target.value; // ✅ get selected value
  if (value && !store.includes(value)) {
    setStore((prev) => [...prev, value]);
  }
  e.target.value = ""; // reset dropdown
};
    const handleRemove=(removeindex)=>{
        const data= store.filter((_,index)=>index!==removeindex);
        setStore(data);
    }
    const filteredOptions=options.filter((opt)=>!store.includes(opt.name));
  return (
    <div>
        <div className='flex flex-wrap border border-dashed rounded border-gray-400 p-4 gap-2'>
          {store.length === 0 && (
          <span className="text-gray-400 text-sm">No items selected</span>
        )}
        <AnimatePresence>
        {store.map((data,index)=>(
           <motion.div 
           initial={{opacity:0,scale:0.8}}
           animate={{opacity:1,scale:1}}
           exit={{ opacity: 0, scale: 0.8 }}
           transition={{ duration: 0.25 }}
           key={index} className='flex gap-2  items-center justify-between rounded-full px-2 bg-amber-300 text-white text-sm font-semibold'>
              {data}
              <X className='w-4 h-4 ' onClick={()=>handleRemove(index)}/>
           </motion.div> 
        ))}  
        </AnimatePresence>
        </div>
        <select 
     
       onChange={handleSelect}
        className='border border-gray-200 p-2 rounded shadow bg-white w-[300px] 
        text-md text-gray-500 transition ease-in-out duration-300 focus:ring-2 focus:ring-blue-500'>
             <div   className='border border-gray-200  rounded shadow mt-2'>
             <option value="">Select an option...</option>
             {filteredOptions.map((data,index)=>(
                 <option value={data.name} key={index}
               >{data.name}</option>
             ))}
             </div>
        </select>
    </div>
  )
}

export default MultiSelect