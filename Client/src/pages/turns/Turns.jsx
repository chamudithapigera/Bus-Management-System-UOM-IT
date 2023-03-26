import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./Turns.scss"

const Turns = () => {
  return (
    <div>
      <div className='turns'>
      <Sidebar/>
      <div className="turnsContainer">
        <Navbar/>
        turns
      </div>
    </div>
    </div>
  )
}

export default Turns
