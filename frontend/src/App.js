import Home from "./MyComponents/Home"
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import OCR from "./MyComponents/OCR";
import Tensorflow from "./MyComponents/Tensorflow";
import TensorflowHome from "./MyComponents/TensorflowHome";
import TensorflowGallery from "./MyComponents/TensorflowGallery";
import TfliteHome from "./MyComponents/tfliteHome";
import Tflite from "./MyComponents/Tflite";
import TfliteLive from "./MyComponents/TfliteLive";
function App() {
  return (
    <>
    <Router >
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/ocr" element= {<OCR />} />
       <Route exact path="/tensorflow" element= {<Tensorflow />} />
         <Route exact path="/tensorflowHome" element= {<TensorflowHome />} />
         <Route exact path="/tensorflowGallery" element= {<TensorflowGallery />} />
         <Route exact path="/tflite" element= {<Tflite />} />
         <Route exact path="/tfliteHome" element= {<TfliteHome />} />
         <Route exact path="/tfliteLive" element= {<TfliteLive />} />
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
