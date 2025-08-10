import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

const ratingByUser = [
  { username: "Aman", rated: 4 }
];

const StarRating = () => {
 const [rating, setRating] = useState(0); // Selected star count
 const [noofStrt]=useState(5);
  const starRef = useRef();

  useEffect(() => {
    if (starRef.current) {
      const starCount = starRef.current.children.length;
      console.log("Number of stars:", starCount);
    }
  }, []);

  const handleStar = (index) => {
   setRating(index+1);
  };

  return (
    <div className="flex flex-col" ref={starRef}>
      <div className='flex gap-1'>
       {[...Array(5)].map((_,index)=>(
         <Star
          key={index}
          onClick={()=>handleStar(index)}
          fill={index < rating ? 'yellow':'none'}
          size={40}
          className="cursor-pointer text-yellow-400   mt-2"
         />
       ))}

      </div>
      <div className='mt-10 border shadow rounded border-gray-200 p-2'>
      {ratingByUser.map((data,index)=>(
        <div key={index} className='flex flex-col p-2'>
            <div className='text-md font-semibold'>{data.username}</div>
            <div className='flex'>
             {[...Array(noofStrt)].map((_,index)=>(
                  <Star
                   key={index}
                  onClick={()=>handleStar(index)}
                  fill={index < data.rated ? 'yellow':'none'}
                   size={20}
                  className="cursor-pointer text-yellow-400   mt-2"
         />
             ))}
            </div>
        </div>
      ))} 
   
      </div>  
    </div>

  );
};

export default StarRating;
