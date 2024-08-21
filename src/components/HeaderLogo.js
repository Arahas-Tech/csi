import React from 'react'
import './Logo.css';
import ComapanyLogo from "./assets/arahas_logo.png";
const HeaderLogo = () => {
    const handleToggleSideBar=()=>{
        document.body.classList.toggle('toggle-sidebar');
    }
  return (
    <>
      <div className='department-header'>
        <a href='/' className=' logo d-flex align-items-center'>
        <img
            src={ComapanyLogo}
            alt="Arhas Technologies Logo"
          />
          
        </a>
        <i className='bi bi-list toggle-sidebar-btn d-flex align-items-center' onClick={handleToggleSideBar}></i>
        
      </div>
    </>
  )
}

export default HeaderLogo;
