import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillHouseDoorFill } from "react-icons/bs";


export default function Header() {
  return (
    <header className='container-fluid bg-danger  '>
      <div className='container p-2'>
        <div className='row align-items-center '>
          <div className='logo col-auto'>
            <h2> Shaked Yosef Sofer</h2>
          </div>
          <nav className='col-auto '>
            <ul>
         
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Favorites">Favorites</Link></li>
              <li className='home-icon' ><Link to="/"><BsFillHouseDoorFill /> </Link></li>

            </ul>
         
          </nav>
                    
        </div>

      </div>
    </header>
  )
}



