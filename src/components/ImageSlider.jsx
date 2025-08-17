import React from 'react'
import { useState } from 'react';
import {motion,AnimatePresence} from 'motion/react'
const imagedata=[ 
  {id:1,src:"./image_1.jpg",alt:"image_1"},
  {id:2,src:"./image_2.jpg",alt:"image_2"},
  {id:3,src:"./image_3.jpg",alt:"image_3"},
  {id:4,src:"./image_4.jpg",alt:"image_4"},

]
const ImageSlider = () => {
    const[data,setData]=useState(imagedata);
    const[filter,setFilter]=useState([]);
    const[count,setCounter]=useState(0);

    const handleCarsoule=()=>{
        setCounter((prev) => (prev + 1) % imagedata.length); 
    }

      const handlePrev = () => {
    setCounter((prev) => (prev - 1 + imagedata.length) % imagedata.length);
  };

  return (
    <div className='flex flex-col gap-2 items-center'>  
    <div className='relative w-64 h-64 overflow-hidden rounded shadow'>
                <AnimatePresence mode="wait">
                <motion.img 
                key={imagedata[count].id}
                src={imagedata[count].src} 
                alt={imagedata[count].alt} 
                initial={{x:100,opacity:0}}
                animate={{x:0,opacity:1}}
                exit={{x:-100, opacity:0}}
                 transition={{ duration: 0.5, ease:"easeInOut" }}
                 
           className="absolute w-64 h-64  rounded shadow"/>
                </AnimatePresence>
    </div>    
               
       <div className='flex gap-4'>
        <button
           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-30"
           onClick={handlePrev} disabled={count==1}
        >Prev</button>
        <button onClick={handleCarsoule}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >Next</button>
       </div>
    </div>
  )
}

export default ImageSlider