import React from 'react'


const GlowWrapper = ({children}) => {
  return (
    <div className="grid gap-8 items-start justify-center">
    <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c75cfa] to-[#7307a6] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
   {children}
  </div>
  </div>
  )
}

export default GlowWrapper;