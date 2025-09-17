import React from 'react'
import ResumeComponents from './ResumeComponents'
const Resume = () => {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
        <div>
        <h1>Resume Builder</h1>
        <ResumeComponents title="Basic Info"/>
        </div>
    </div>
  )
}

export default Resume