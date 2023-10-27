import React from 'react'

function Main({ children }: { children: React.ReactNode}) {
  return (
    <main className='min-h-[calc(100svh-56px)]'>
      {children}
    </main>
  )
}

export default Main
