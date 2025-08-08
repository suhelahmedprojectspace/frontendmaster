import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordain = () => {
  const [show, setShow] = useState(false);

  return (
    <div className='flex flex-col shadow border border-gray-200 p-4 w-[500px] rounded'>
      <div className='flex justify-between items-center border-b border-gray-200 cursor-pointer' onClick={() => setShow(prev => !prev)}>
        <h3 className='text-2xl font-semibold mb-1'>Frontend Master</h3>
        <ChevronDown
          className={`w-4 transition-transform duration-200 ease-in-out ${show ? 'rotate-180' : ''}`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in ${show ? 'max-h-96 p-2' : 'max-h-0 p-0'}`}
      >
        <span className='text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolore ratione facere dolor minus necessitatibus hic veniam, itaque sunt animi ea, deleniti molestiae accusamus nisi totam officiis, tenetur autem tempore.
          Obcaecati et provident, ipsam perspiciatis ad neque ut odit consequatur quibusdam veritatis commodi velit possimus esse voluptate quaerat molestias autem placeat amet earum sapiente! Enim tempore nihil temporibus provident tenetur.
        </span>
      </div>
    </div>
  );
};

export default Accordain;
