import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./Breakdown.scss"

const Breakdown = () => {
  return (
    <div>
      <div className='breakdown'>
      <Sidebar/>
      <div className="breakdownContainer">
        <Navbar/>
        breakdown
      </div>
    </div>
    </div>
  )
}

export default Breakdown
