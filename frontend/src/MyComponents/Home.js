import React from 'react'
import './Home.css'
import {
    Link
    
  } from "react-router-dom";
const Home = () => {
  return (
   <div className="container box  my-auto">
    <Link to="/ocr" className='btn btn-primary  m-2  w-50 butn'>OCR</Link>
    <br />
    <Link to="/tensorflowHome" className='btn btn-success m-2  w-50 butn'>TENSORFLOW</Link>
    <br />
    <Link to="/tfliteHome" className='btn btn-warning m-2 w-50 butn'>TFLITE</Link>
    
   </div>  
  );
}
 export default Home;