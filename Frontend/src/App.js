import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import Dashboard from "./pages/Dashboard";
import UploadDocument from "./Components/documents/UploadDocument";
import { DocumentProvider } from "./context/DocumentContext";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Ledger from "./pages/Ledger";
function App(){
  return(
    <>
    <BrowserRouter>
    <DocumentProvider>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/upload" element={<UploadDocument/>}/>
      <Route path="/ledger" element={<Ledger/>}/> 
      <Route path="/transactions" element={<Transactions/>}/>
      <Route path="/analytics" element={<Analytics/>}/>
    </Routes>
    </DocumentProvider>
    </BrowserRouter>
    </>
  )
}
export default App;