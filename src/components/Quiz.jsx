import React, { useEffect, useState } from 'react'
import { motion,AnimatePresence } from 'motion/react';

const quizQuestions = [
  {
    id:1,
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink Markup Language", "Home Tool Markup Language"],
    answer: "HyperText Markup Language",
  },
  {
    id:2,
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS",
  },
  {
    id:3,
    question: "Which is not a JavaScript Framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: "Django",
  },
  {
    id:4,
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<javascript>", "<js>", "<scripting>"],
    answer: "<script>",
  },
  {
    id:5,
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Microsoft", "Google", "Oracle"],
    answer: "Netscape",
  },
  {
    id:6,
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets",
  },
  {
    id:7,
    question: "Which HTML attribute is used to define inline styles?",
    options: ["class", "style", "font", "styles"],
    answer: "style",
  },
  {
    id:8,
    question: "Which is the correct CSS syntax?",
    options: ["body {color: black;}", "{body:color=black;}", "body:color=black;", "{body;color:black;}"],
    answer: "body {color: black;}",
  },
  {
    id:9,
    question: "Which of the following is not a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
  },
  {
    id:10,
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//",
  },
];

const Quiz = () => {
    const [current,setCurrent]=useState(0);
    const [minutes,setMinutes]=useState(2);
    const[second,setSecond]=useState(60);
    const[isActive,setIsActive]=useState(false);
    const[timer,setTimer]=useState(minutes);
    const [selected, setSelected] = useState(null)
    const[score,setScore]=useState(0);
    const handleAnswer=(option,index)=>{
          setSelected(index)
        if(option===quizQuestions[current].answer){
            setScore((prev)=>prev+1);
        }
    }
  useEffect(()=>{
     let timer;
     if(isActive){
        timer=setInterval(()=>{
            if(second>0){
                setSecond((prev)=>prev-1);
            }else if(minutes>0){
                setMinutes((prev)=>prev-1);
                setSecond(59);
            }else{
                clearInterval(timer);
                setIsActive(false);
            }
        },1000)
     }
     return ()=>clearInterval(timer);
  },[isActive,minutes,second]);

  const handleStart=()=>setIsActive(true);
  const handlePause=()=>setIsActive(false);
  const handleReset=()=>{
    setIsActive(false);
    setMinutes(1);
    setSecond(60);
  }
  return (
    <div className='border border-gray-200 mt-2 p-10
     w-2xl items-center flex flex-col  shadow rounded space-y-6'>
       <div className='flex items-center gap-4 font-semibold text-xl'>
           {minutes} : {second < 10 ? `0${second}`:second}
       </div>
       
       {current===quizQuestions.length-1 ?(
        <div className='flex flex-col space-y-2 items-center'>
              <span className='text-2xl font-bold tracking-wide text-green-500'>{score}/{quizQuestions.length}</span>
              <span className='mt-2 font-semibold tracking-wider'>score</span>
              <button 
              className='bg-red-600 text-white py-2 px-6 rounded font-semibold'
              onClick={()=>{
                setCurrent(0);
                setSelected(null);
              }}>Restart</button>
        </div>
       ):(
       <AnimatePresence mode='wait'>  
        <motion.div
             key={current}
              initial={{x:100,opacity:0}}
              animate={{x:0,opacity:1}}
              exit={{x:-100,opacity:0}}
                 transition={{ duration: 0.4 }}
         
        >
        <div className='mb-2 text-xl font-semibold tracking-wider'>{quizQuestions[current].question}</div>
      
     
       <div
       className='grid grid-cols-2 gap-4'>
          {quizQuestions[current].options.map((data,index)=>(
              <div
                 key={index}
                 onClick={()=>handleAnswer(data,index)}
                 className={`border border-gray-200 px-2  py-2 rounded text-center cursor-pointer
                   ${selected ===index  ? "bg-sky-400 text-white" : ""}}
                 `}>
                  <span className='text-md font-semibold tracking-wide' 
                  >{data}</span>
              </div>
          ))}
       </div>
      
       <div className='flex gap-2 mt-4'>
       <button disabled={current==0} 
        onClick={() => {
            setCurrent(current - 1)
            setSelected(null)
          }}
        className='bg-sky-400 text-white rounded px-6 py-2 disabled:opacity-25'>Prev</button>
       <button onClick={()=>{
        setCurrent(current+1)
        setSelected(null);
    }}
       
       disabled={current==quizQuestions.length-1}  className='bg-sky-400 text-white rounded px-6 py-2 disabled:opacity-30'>Next</button>
       </div>
        </motion.div>
         </AnimatePresence>
       )}
       <div className='flex gap-4 mt-4'>
        <button onClick={handleStart} className='border border-gray-200 font-semibold bg-blue-500 text-white px-6 py-2 rounded' disabled={isActive}>
          Start
        </button>
        <button onClick={handlePause} 
         className='border border-gray-200 bg-amber-600 text-white px-6 font-semibold py-2 rounded'
        disabled={!isActive}>
          Pause
        </button>
        <button
         className='border border-gray-200 bg-red-500 font-semibold text-white px-6 py-2 rounded'
        onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default Quiz