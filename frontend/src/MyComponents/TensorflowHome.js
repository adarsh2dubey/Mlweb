import React from 'react'
import {
    Link
    
  } from "react-router-dom";
const TensorflowHome = () => {
  return (
    <div style={{display: "inline-block",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "300px",
        height: "200px",
        margin: "auto",
        padding:"5%",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        
        }}>

        <Link  to='/tensorflow' className="btn w-100 btn-primary">Live Camera</Link>
        <br />
        <br />
        <Link to='/tensorflowGallery'  className="btn w-100 btn-dark">Gallery</Link>
    </div>
  )
}
export default TensorflowHome