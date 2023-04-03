import Axios from 'axios';
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import io from 'socket.io-client';


const TfliteLive = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    
   
    
    useEffect(() => {
      const socket = io("localhost:5001/", {
        transports: ["websocket"],
        cors: {
          origin: "http://localhost:3000/",
        },
      });
      setTimeout(myTimer, 5000)
      
   
      // setInterval(myTimer, 3000);

     
      function myTimer() {
        const imageSrc = webcamRef.current.getScreenshot();
      
  
        socket.emit('frame', { imageSrc });
      }

      socket.on('list_data', (jsonList) => {
        // const data = JSON.parse(jsonList);  // Convert the JSON string back to a list of JSON objects
        myTimer()
        console.log("data are",jsonList)
        drawRect(jsonList)
      });
    }, []);
    
  
      // function dataURLtoFile(dataurl, filename) {
      //   var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      //       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      //       while(n--){
      //           u8arr[n] = bstr.charCodeAt(n);
      //       }
      //       return new File([u8arr], filename, {type:mime});
      //   }
      const detect = async () => {
        // Check data is available
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null &&
          webcamRef.current.video.readyState === 4
        ) {
          // Get Video Properties
          const video = webcamRef.current.video;
          const canvas = document.createElement('canvas');
          canvas.width = webcamRef.current.video.videoWidth;
          canvas.height = webcamRef.current.video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          const capturedImage = canvas.toDataURL('image/png');
    

            // var file = dataURLtoFile(capturedImage, 'filename.png');
            const blob = new Blob([video.src], { type: 'video/mp4' });
            const file = new File([blob], 'video.mp4', { type: 'video/mp4' });

            const formData = new FormData();
            formData.append('video',file);
            Axios.post("http://127.0.0.1:5000/detectLive",formData,
            ).then((response)=>{
        // setList(response.data);
             console.log("Output in reactjs",response.data,typeof(response.data));  
       
            drawRect(response.data)
        
      });
        }
      };
     
     
     
      function drawRect(res){
        // document.getElementsByClassName("loader")[0].style.display="none";
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
    <div className="App">
    <header className="App-header">
      <Webcam
        ref={webcamRef}
        muted={true} 
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: "90vw",
          height: "90vh",
        }}
      />

      <canvas
        id="canvas"
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          border:"1rem solid black ",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 8,
          width: "90vw",
          height: "90vh",
        }}
      />
    </header>
  </div>
  )
}
export default TfliteLive;