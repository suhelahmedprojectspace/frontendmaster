import React,{useEffect, useState} from 'react'
import {motion,AnimatePresence} from 'motion/react'
const Weather = () => {
    const [data,setData]=useState({});
    useEffect(()=>{
      fetch('  https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.76&current_weather=true')
      .then(res=>res.json()).then(data=>setData(data));
    },[])

return (
  <div className='flex flex-col'>
    {data.current_weather &&
      <div className={`relative flex flex-col items-center rounded-3xl justify-center px-4 py-3 shadow w-72 h-96 text-white text-md ${data.current_weather.is_day?"bg-sky-500":"bg-zinc-600"} hover:outline-8 hover:outline-orange-300`}>
        <AnimatePresence >
         {data.current_weather.is_day? (
                  <motion.img 
                  initial={{
                    y:500,
                    x:-200,
                    opacity:0}}
                  animate={{x:0,y:0,opacity:1}}
                  transition={{duration:200,type: "spring", stiffness: 50}}
                  exit={{x: -500,opacity: 0,}}
                  src="./sun.png" alt='sun' className='w-40 h-40 object-contain absolute top-4'/> 

         ):(
              <motion.img 
                  initial={{
                    y:500,
                    x:-200,
                    opacity:0}}
                  animate={{x:0,y:0,opacity:1}}
                  transition={{duration:200,type: "spring", stiffness: 50}}
                  exit={{x: -500,opacity: 0,}} src="./moon.png" alt='sun' className='w-40 h-40 object-contain absolute top-4'/> 
         )}
  
        </AnimatePresence>
       <div className='relative text-4xl font-semibold tracking-wide'>
        {data.current_weather.temperature}
          <div className='absolute -top-2 -right-5 border-4 border-white rounded-full w-4 h-4'/>
        </div>

        <div className='absolute bottom-20 flex flex-col  w-full px-2 items-center'>
          <div className='p-2 text-md font-semibold tracking-wide '>{data.current_weather.time ? new Date(data.current_weather.time).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:"2-digit"}):null}</div>
        <div className='grid grid-cols-2 gap-1.5'>        
        <div className='bg-white/90 text-zinc-600 font-semibold text-center rounded-md px-2'>{data.current_weather.winddirection}</div>
        <div className='bg-white/90 text-zinc-600 font-semibold text-center rounded-md px-2'>{data.current_weather.windspeed} {data.current_weather_units.windspeed} </div>
        </div>  
        </div>
      
      </div>
    }
  </div>
);

}

export default Weather