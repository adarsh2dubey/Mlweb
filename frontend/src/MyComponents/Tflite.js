import React, { useRef, useState, useEffect } from "react";
import Axios from 'axios';
import { CirclesWithBar } from  'react-loader-spinner'
import './Home.css'
 const Tflite = () => {
 
  const [media, setMedia] = useState('');
  const [img, setImg] = useState('');
  // const [res, setRes] = useState(null);
  const canvasRef = useRef(null);

  const handleChange = (event) => {
   const pic= event.target.files[0]
    setMedia(pic)
    setImg(URL.createObjectURL(pic));

    }

    function runCoco(){
      document.getElementsByClassName("loader")[0].style.display="flex";
      console.log(media)
      const formData = new FormData();
      formData.append('image', media);
      Axios.post("http://127.0.0.1:5001/detect",formData,
       ).then((response)=>{
        // setList(response.data);
        console.log("Output in reactjs",response.data,typeof(response.data));  
       
        drawRect(response.data)
        
      });

     
    }
   function drawRect(res){
    document.getElementsByClassName("loader")[0].style.display="none";
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 300, 300);
    console.log("vro",res)
    res.forEach(resp=> {
      
      // Extract boxes and classes
      const [xmin, ymin, xmax, ymax] = resp['bbox']; 
      const text = resp['class_name']; 
  
      // Set styling
      const color = Math.floor(Math.random()*16777215).toString(16);
      ctx.strokeStyle = '#' + color
      ctx.font = '22px Arial';
      ctx.fontWeight ='bold'
      console.log("draw ho parha ii nhi")
      // Draw rectangles and text
      ctx.beginPath();   
      ctx.fillStyle = '#' + color
    
      const x = xmin * 300;
      const y = ymin * 300;
      const width = (xmax - xmin) * 300;
      const height = (ymax - ymin) * 300;
      ctx.fillText(text, x,y);
      ctx.rect(x, y, width,height); 
      ctx.stroke();
    });
  
   }
    

  return (
    <>
    <div>  <input className='m-5 bg-dark text-light'  type="file" onChange={handleChange} />
    <button onClick={runCoco} style={{height:50}}> Submit</button></div>

<div>
<img style={{zindex:9,position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      textAlign: "center",
      height:"300px",
      width:"300px"
      
     }} id="img" src={img} alt="image" />
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
export default Tflite;
