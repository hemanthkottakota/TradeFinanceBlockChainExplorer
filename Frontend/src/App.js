import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import Dashboard from "./pages/Dashboard";
import UploadDocument from "./Components/documents/UploadDocument";
function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="upload" element={<UploadDocument/>}/> 
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;