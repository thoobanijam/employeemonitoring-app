import React from 'react'

const LandingPage = () => {
  return (
    <div className='flex justify-center items-center flex-col h-auto'>

<h1 className='text-[#193c62] font-bold mt-30 text-3xl'>Empower Your Workforce 
    <span className='text-[#356395] font-normal'> with</span> Smart Monitoring
</h1>
<p className='text-[#356395] font-semibold mt-6 py-3 border-b border-[#dee9f7] border-t border-[#dee9f7]'>Track Productivity, Attendance, and Performance in Real-Time</p>
    <div className="flex justify-center items-center mt-2 w-full relative">
  <img
    src="/img/monitoring.png"
    alt="Monitoring"
    className="w-[90%] h-[900px] border-lg "
  />
  
</div>
 {/* Buttons overlay */}
  <div className="absolute top-84 left-0 right-0 flex justify-center gap-4">
  <button className="bg-[#2061c4] text-white font-semibold px-6 py-3 rounded-3xl cursor-pointer hover:bg-[#3d83d6]">
    Get Started
  </button>
  <button className="cursor-pointer border border-[#dee9f7] px-6 py-3 rounded-3xl font-semibold text-[#1e426d] shadow-md shadow-[#ccdcec] hover:bg-[#d9e9f6]">
    Watch Demo
  </button>
</div>


    </div>
  )
}

export default LandingPage