import React,{useEffect,useState} from 'react'

const Pagination = () => {
    const[data,setData]=useState([]);
    const[currentPage,setCurrent]=useState(1);
    const perpageCard=20;
    const noofbutton = Math.ceil(data.length / perpageCard);
    useEffect(()=>{
       const fetchdata=async()=>{
          fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => setData(data))
       }
       fetchdata()
    },[])
    const startIndex=(currentPage-1)*perpageCard;
    const endIndex=startIndex+perpageCard;
    const currentData=data.slice(startIndex,endIndex)
    const gotoPage=(page)=>{
       if(page>=1 && page<=noofbutton){
         setCurrent(page)
       }
    }
  return (
    <div className='p-4 overflow-hidden'>
        <div className='grid grid-cols-3 gap-4   mx-auto '>
            {currentData.map((item)=>(
                <div key={item.id} className='shadow  p-4 rounded'>
                   <div>
                    <div className='border-b mb-2 flex flex-col space-y-2 border-gray-200 text-wrap'>
                    <span>{item.name}</span>
                   <span>{item.email}</span>
                    </div>
                  <span>{item.body}</span>
                    </div>
                </div>
            ))}
         
        </div>
        <div className='flex mt-6'>

            <button className='border bg-white text-zinc-400 border-gray-300 px-2'
            onClick={()=>gotoPage(currentPage-1)}
            disabled={currentData===1}
            >Prev</button>
            {
                [...Array(noofbutton)].map((_,index)=>(
                    <button 
                    className={`border text-white font-semibold border-gray-300 px-4 ${currentPage===index+1?"bg-blue-600":"bg-gray-200"}`}>{index + 1}</button>
                )) 
            }
            <button 
            className='border bg-white text-zinc-400 border-gray-300 px-2' 
            disabled={currentPage===noofbutton}
           onClick={()=>gotoPage(currentPage+1)}>Next</button>
        </div>
    </div>
  )
}

export default Pagination