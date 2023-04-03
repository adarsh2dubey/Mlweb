import { div } from '@tensorflow/tfjs'
import React, { useRef, useState, useEffect } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";

import './Home.css'
import { CirclesWithBar } from  'react-loader-spinner'
const TensorflowGallery = () => {
    const [media, setMedia] = useState("");
    const canvasRef = useRef(null);

    const handleChange = (event) => {
        setMedia(URL.createObjectURL(event.target.files[0]));
      }

    const runCoco = async () => {
      document.getElementsByClassName("loader")[0].style.display="flex";
        const net = await cocossd.load();
        console.log("Handpose model loaded.");
        //  Loop and detect hands
          detect(net);
          
        
    }
    
    const detect = async (net) => {
          // document.getElementById("hide").style.visibility="hidden"
          const img=document.getElementById("img");
          const obj = await net.detect(img);
          console.log(obj)
          // Draw mesh
          const ctx = canvasRef.current.getContext("2d");
          ctx.clearRect(0, 0, 300, 300);
          drawRect(obj, ctx); 
          document.getElementsByClassName("loader")[0].style.display="none";
    }
      
    const drawRect = (detections, ctx) =>{
      // Loop through each prediction
      detections.forEach(prediction => {
    
        // Extract boxes and classes
        const [x, y, width, height] = prediction['bbox']; 
        const text = prediction['class']; 
        
        // Set styling
        const color = Math.floor(Math.random()*16777215).toString(16);
        ctx.strokeStyle = '#' + color
        ctx.font = '22px Arial';
        ctx.fontWeight ='bold'
    
        // Draw rectangles and text
        ctx.beginPath();   
        ctx.fillStyle = '#' + color
        ctx.fillText(text, x, y);
        ctx.lineWidth = 2;
        ctx.rect(x, y, width, height); 
        ctx.stroke();
      });
    } 
  return (
    <>
    <div id="hide">  
        <input className='m-5 bg-dark'  type="file" onChange={handleChange} />
        <button onClick={runCoco} style={{height:50}}> Submit</button>
       
    </div>
    <div>
      <img style={{zindex:9,position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            height:"300px",
            width:"300px"
            
           }} id="img" src={media} alt="image" />
         <canvas
           ref={canvasRef}
           style={{
            position: "absolute",
            marginLeft: "auto",
             marginRight: "auto",
             left: 0,
             right: 0,
           
           textAlign: "center",
            zindex: 8,
            height:"300px",
            width:"300px"
          }}
        /> 
        </div>
        <div className="loader" >
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
export default TensorflowGallery ;