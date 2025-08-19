import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import CartTab from '../components/cartTab';

function layout() {
  return (
    <div className='bg-zinc-200'>
      <main className='w-[12000px] max-w-full ps-5'>
        <Header/>
        <Outlet/>
      </main>
      <CartTab/>
    </div>
  )
}

export default layout
