import React from 'react'
import { Toaster } from 'react-hot-toast' // 🎯 IMPORT TOASTER CONTAINER

const TosterAnimation = () => {
  return (
    <>
      {/* 🎯 Configuration engine settings explicitly positioned to TOP-RIGHT */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'sans-serif',
            fontSize: '14px', // 🎯 FIXED: scaled down from 40px so card dimensions render cleanly on screen
            fontWeight: '600',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 99999 // Ensures the popup stands on top of your navigation bars
          }
        }} 
      />
    </>
  )
}

export default TosterAnimation;