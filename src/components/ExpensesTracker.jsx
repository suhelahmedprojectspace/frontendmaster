import React, { useEffect, useState } from 'react'

const ExpensesTracker = () => {
    const[result,setResult]=useState([]);
    console.log(result);
    const[sum,setSum]=useState('');
    const[data,setData]=useState({
        name:"",
        price:"",
        time:"",
    })

    useEffect(()=>{
        localStorage.setItem('expense',JSON.stringify(result));
    },[result])

    useEffect(()=>{
        const storeExpense=localStorage.getItem("expense");
        if(storeExpense){
            setResult(JSON.parse(storeExpense));
        }
    },[])

    useEffect(()=>{
          let total=0;
          result.forEach(item=>
            {total+=Number(item.price);

            })
        setSum(total);
    },[result])


    const hanldeAddExp=()=>{
       if(!data.trim())return;
       const now=new Date();
       const currentdate=now.toLocaleDateString();
       const currenttime=now.toLocaleTimeString();
       const dateofexpense=`${currentdate} ${currenttime} `
       const newExpense={name:data.name,price:data.price,time:dateofexpense}
       setResult((prev)=>[...prev,newExpense]);
       setData({ name: "", price: "" });
    }
    
  return (
    <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
        <input type='text'
        name="name"
        className='border border-dashed border-gray-200 px-4 py-2 rounded'
        placeholder='Enter the name of the food' value={data.name} 
       onChange={(e) => setData({ ...data, name: e.target.value })}/>
        <input type="text" 
        name="price"
        className='border border-dashed border-gray-200 px-4 py-2 rounded'
        placeholder='Enter the cost of the day' 
        value={data.price}
        onChange={(e)=>setData({...data,price:e.target.value})}
        />
        <button 
        className='bg-amber-600 text-white font-semibold tracking-wide px-4 py-2 rounded '
        onClick={hanldeAddExp} type='button' onKeyDown={(e)=>{
            if(e.key==="Enter"){
                hanldeAddExp()
            }
        }}>Add</button>
        </div>
        <div className='flex flex-col space-y-2'>
        {result.map((data,index)=>(
            <div key={index} className='flex justify-between p-4  tracking-wide border border-gray-200 rounded '>
              <span className='text-md text-black'>
                    {data.name}
             </span> 
             <span>
              {data.price}
             </span>
            </div>
        ))}
        </div>
        <div className='flex '>
            your total for day is {sum}
        </div>
    </div>
  )
}

export default ExpensesTracker