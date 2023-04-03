import React from 'react'
import './Home.css'
import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { CirclesWithBar } from  'react-loader-spinner'


 const OCR = () => {

    const [imagePath, setImagePath] = useState("");
    const [text, setText] = useState("");
   
    const handleChange = (event) => {
      setImagePath(URL.createObjectURL(event.target.files[0]));
    }

    const handleClick = () => {
        document.getElementsByClassName("loader")[0].style.display="flex";
     document.getElementsByClassName("App")[0].style.display="none";
        Tesseract.recognize(
          imagePath,'eng',
          { 
            logger: m => console.log(m) 
          }
        )
        .catch (err => {
          console.error(err);
        })
        .then(result => {
          // Get Confidence score
          let confidence = result.confidence
         
          let textt = result.data.text
          
          setText(textt);
          document.getElementsByClassName("loader")[0].style.display="none";
          document.getElementsByClassName("App")[0].style.display="block";

        })
      }
  return (
    <>
    <div className="App">
    <main className="App-main">
      <h3 className='text-danger m-2'>Actual Image</h3>
      <img 
         src={imagePath} className="App-image" alt="Loading...."/>
      
        <h3 className='text-success m-2'>Extracted text</h3>
      <div className="text-box">
        <p> {text} </p>
      </div>
      <input className='m-5 bg-dark'  type="file" onChange={handleChange} />
      <button onClick={handleClick} style={{height:50}}> Convert To Text</button>
    </main>
  </div>
<div className="loader">
<CirclesWithBar
  
  height="200"
  width="200"
  color="#4fa998"
  wrapperStyle={{margin:"auto"}}
  wrapperClass=""
  visible="true"
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  
  ariaLabel='circles-with-bar-loading'
/>


</div>
 

  </>
  )
}

export default OCR;