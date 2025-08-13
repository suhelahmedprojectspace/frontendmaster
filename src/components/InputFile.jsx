import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
const InputFile = () => {
  const [storeFile, setStore] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isDraggin,setIsDraggin]=useState(false);

  useEffect(()=>{
     const savedFiles = localStorage.getItem("uploadedfiles");
    if (savedFiles) {
      setStore(JSON.parse(savedFiles));
    }
  },[])

  useEffect(()=>{
     localStorage.setItem('uploadedfiles',JSON.stringify(storeFile))
  },[storeFile])
   
 //Dray handlres
 const handleDragOver=(e)=>{
  e.preventDefault();
  e.stopPropagation();
  setIsDraggin(true);
 }

 const handleDragLeave=(e)=>{
  e.preventDefault();
  e.stopPropagation();
  setIsDraggin(false)
 }

 const handleDrop=(e)=>{
   e.preventDefault();
   e.stopPropagation();
   setIsDraggin(false);

   if(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length){
      const droppedFiles=Array.from(e.dataTransfer.files);
      
      const filesWithPreview=droppedFiles.map((file)=>{
        let previewUrl=null
        if(file.type.startsWith("image/")){
          previewUrl=URL.createObjectURL(file)
        }
        return{
            name: file.name,
        type: file.type,
        previewUrl,
        }
      })
      setStore((prev)=>[...prev,...filesWithPreview])
     
   }
 }
  const handlefileUpload = (e) => {
    const selectedFiles=Array.from(e.target.files);
    // const file=Array.from(selectedFiles);
   
    const filesWithPreview=selectedFiles.map((file)=>{
      let previewUrl=null;
      if(file.type.startsWith("image/")){
        previewUrl=URL.createObjectURL(file)
      }
      return{
        name:file.name,
        type:file.type,
        previewUrl
      }
    })
     setStore((prev) => [...prev, ...filesWithPreview]);
  };
  const handleRemove=(id)=>{
    const updatedFiles=storeFile.filter((_,index)=>index!==id);
    setStore(updatedFiles);
  }
  return (
    <div className="flex mt-10 flex-col items-center gap-10 w-full max-w-lg p-6 bg-white rounded shadow">
      <div
       onDragOver={handleDragOver}
       onDragLeave={handleDragLeave}
       onDrop={handleDrop}
       className={`flex w-full p-10 justify-center items-center border-2 border-dashed
         border-gray-200 rounded hover:bg-gray-100 duration-300 ease-in-out     ${isDraggin ?"border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
    
      >   
      <label className='w-full flex flex-col items-center cursor-pointer'>
       <span className="text-gray-700 font-semibold text-md text-center ">
            Click or drag files to upload
          </span> 
      <input
        type="file"
        multiple  // Allow multiple file selection
        onChange={handlefileUpload}
        className='hidden'
      />
      </label>
    
      </div>
      <div className='grid grid-cols-1 w-full'>
       {storeFile.map((file,index)=>(
          <div key={index} className='flex items-center justify-between border border-gray-100 py-2 mb-2'>
            <div className='flex items-center gap-2'>
             {file.previewUrl ? (
              <img
               src={file.previewUrl}
               alt={file.name}
               className='w-16 h-16 object-cover rounded-full ml-2'
              />
             ):(
             <div className="w-4 h-4 flex items-center justify-center m-2">
                📄
              </div>
             )}
             <div>
              <p className="font-semibold">{file.name}</p>
              <p className="text-sm text-gray-500">{file.type}</p>
             </div>
            </div>
            <X className="w-4 h-4 text-md mr-2 font-semibold border border-gray-300 hover:bg-red-600 hover:text-white " onClick={()=>{handleRemove(index)}}/>
          </div>
       ))}
      </div>
    
    </div>
  );
};

export default InputFile;
