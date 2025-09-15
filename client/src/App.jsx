import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Home from './pages/Home'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>
      </Routes>
      
    </div>
  )
}

export default App
