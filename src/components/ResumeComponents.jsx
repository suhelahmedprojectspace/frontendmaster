import React,{useState} from 'react'
import { Plus, Trash2 } from 'lucide-react';
const steps={
    1: "Basic Info",
    2: "Education Details", 
    3: "Work Experience",
    4: "Projects",
    5: "Skills"
}

const FormElement=({index, data, onChange, onRemove ,fields})=>{
    const handleInputChange=(field,value)=>{
        onChange(index,field,value)
    }
    return(
        <div className='relative flex flex-col space-y-4 items-center justify-center border border-gray-200 p-4 rounded-md shadow-sm'>
         <button
          onClick={()=>onRemove(index)}
          className='absolute top-1 right-2 text-red-400 hover:text-red-600'
          type="button"
         >
          <Trash2 size={16}/>
         </button>
         {fields.map((field)=>(
            <div key={field.name} className='w-full'>
                {field.type==='text' && (
                    <input
                     type='text'
                     placeholder={field.placeholder}
                     value={data[field.name] || ''}
                     onChange={(e)=>handleInputChange(field.name,e.target.value)}
                     className='border border-gray-200 px-2 py-3 rounded-md w-full'
                    
                    />
                )}
                {field.type==='date-range' && (
                    <div className='flex space-x-4 w-full'>
                        <input
                        type='date'
                        placeholder={field.startPlaceholder}
                        value={data[field.startName]}
                        onChange={(e)=>handleInputChange(field.name,e.target.value)}
                        className="border border-gray-200 px-2 py-2 rounded-md w-full"
                        />

                           <input
                        type='date'
                        placeholder={field.endPlaceholder}
                        value={data[field.endName]}
                        onChange={(e)=>handleInputChange(field.name,e.target.value)}
                        className="border border-gray-200 px-2 py-2 rounded-md w-full"
                        />
                    </div>
                )}
                {field.type==='textarea' &&(
                  <textarea
                   placeholder={field.placeholder}
                   value={data[field.name] || ''}
                   onChange={(e) => handleInputChange(field.name, e.target.value)}
                   className="border border-gray-200 px-2 py-2 rounded-md w-full"
                   rows={3}
                  
                  />  
                )}
            </div>
         ))}
        </div>
    )
}

const formConfigs={
    education:[
        { name: 'institutionName', type: 'text', placeholder: 'Enter Institution Name' },
        { name: 'courseName', type: 'text', placeholder: 'Enter Course Name' },
        { name: 'dateRange', type: 'date-range', startName: 'startDate', endName: 'endDate', startPlaceholder: 'Start Date', endPlaceholder: 'End Date' },
        { name: 'description', type: 'textarea', placeholder: 'Enter Description' }
    ],
    workExperience:[
        { name: 'companyName', type: 'text', placeholder: 'Enter Company Name' },
        { name: 'position', type: 'text', placeholder: 'Enter Position' },
        { name: 'dateRange', type: 'date-range', startName: 'startDate', endName: 'endDate', startPlaceholder: 'Start Date', endPlaceholder: 'End Date' },
        { name: 'description', type: 'textarea', placeholder: 'Enter Job Description' }
    
    ],
     projects: [
        { name: 'projectName', type: 'text', placeholder: 'Enter Project Name' },
        { name: 'technologies', type: 'text', placeholder: 'Technologies Used' },
        { name: 'dateRange', type: 'date-range', startName: 'startDate', endName: 'endDate', startPlaceholder: 'Start Date', endPlaceholder: 'End Date' },
        { name: 'description', type: 'textarea', placeholder: 'Project Description' }
    ],
    skills: [
        { name: 'skillName', type: 'text', placeholder: 'Enter Skill Name' },
        { name: 'proficiency', type: 'text', placeholder: 'Proficiency Level (Beginner/Intermediate/Advanced)' }
    ]
    
}
const ResumeComponents = ({title}) => {
   const [step,setStep]=useState(1);
   const[formData,setFormData]=useState({
     basicInfo:{
        firstname:'',
        lastName:'',
        address:''
     },
     education:[{}],
     workExperience:[{}],
     projects:[{}],
     skills:[{}]
   })
  
   const handleAddItem=(section)=>{
     setFormData(prev=>({
        ...prev,
        [section]:[...prev[section],{}]
     }))
   }
   const handleRemoveItem=(section,index)=>{
    setFormData(prev=>({
        ...prev,
        [section]:prev[section].filter((_,i)=>i!==index)
    }));
   };
  
   const handleInputChange=(section,index)=>{
     setFormData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
   };

   const handleBasicInfoChange=(field,value)=>{
     setFormData(prev=>({
        ...prev,
        basicInfo:{
          ...prev.basicInfo,
          [field]:value   
        }
     }))
   };

   const getCurrentSection=()=>{
     switch(step){
        case 2: return 'education';
        case 3: return 'workExperience';
        case 4: return 'projects';
        case 5: return 'skills';
        default: return 'basicInfo';

     }
   }

  const renderDynamicSection=(sectionName)=>{
    const sectionData=formData[sectionName];
    const fields=formConfigs[sectionName];

    return(
        <div className='flex flex-col space-y-4 w-full'>
            {sectionData.map((item,index)=>(
                <FormElement
                  key={index}
                  index={index}
                  data={item}
                  onChange={(idx, field, value) => handleInputChange(sectionName, idx, field, value)}
                  onRemove={(idx) => handleRemoveItem(sectionName, idx)}
                  fields={fields}
                
                />
            ))}
            <div className='flex justify-center'>
             <button
             onClick={()=>handleAddItem(sectionName)}
             className='border border-gray-300 rounded-lg p-3 hover:bg-gray-50 flex items-center space-x-2'
             type="button"
             >
                  <Plus size={20} className='text-gray-500'/>
                   <span>Add {sectionName.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
             </button>
            </div>
        </div>
    )
  }
  return (
    <div className='border border-gray-200 flex flex-col items-center justify-center p-4 rounded-md space-y-4 w-3xl'>
    <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-500">Step {step}: {steps[step]}</p>
     {step === 1 && (
                <div className='flex flex-col space-y-4 w-full max-w-md'>
                    <input 
                        type='text' 
                        placeholder='Enter your First Name' 
                        value={formData.basicInfo.firstName}
                        onChange={(e) => handleBasicInfoChange('firstName', e.target.value)}
                        className='border border-gray-200 px-3 py-3 rounded-md w-full'
                    />
                    <input 
                        type='text' 
                        placeholder='Enter your Last Name'
                        value={formData.basicInfo.lastName}
                        onChange={(e) => handleBasicInfoChange('lastName', e.target.value)}
                        className='border border-gray-200 px-3 py-3 rounded-md w-full'
                    />
                    <textarea 
                        placeholder='Enter your Address'
                        value={formData.basicInfo.address}
                        onChange={(e) => handleBasicInfoChange('address', e.target.value)}
                        className='border border-gray-200 px-3 py-3 rounded-md w-full'
                        rows={3}
                    />
                </div>
            )}
    {step === 2 && renderDynamicSection('education')}
            {step === 3 && renderDynamicSection('workExperience')}
            {step === 4 && renderDynamicSection('projects')}
            {step === 5 && renderDynamicSection('skills')}

    <div className='flex space-x-4'>
         <button onClick={()=>setStep(step-1)}
           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
           disabled={step===1}
         >
             Prev
    </button>

         <button onClick={()=>setStep(step+1)}
           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={step === Object.keys(steps).length}
         >
             Next
         </button>
    
    </div>
    </div>
  )
}

export default ResumeComponents