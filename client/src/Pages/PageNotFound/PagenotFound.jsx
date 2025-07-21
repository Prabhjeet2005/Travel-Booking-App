import React from 'react'
import { NavBar } from '../../Components'
import { useNavigate } from 'react-router'

import "./PageNotFound.css";

const PagenotFound = () => {
  const navigate = useNavigate()
  const handleTakeBackClick = ()=>{
    navigate("/")
  }
  return (
    <>
    <NavBar />
    <section className='pg-not-found-container'>
      <section className='pg-not-found-title'>Page Not Found &#58;&#40;</section>
      <section onClick={handleTakeBackClick} className='pg-not-found-btn'>Take Me Back</section>
    </section>
    </>
  )
}

export default PagenotFound