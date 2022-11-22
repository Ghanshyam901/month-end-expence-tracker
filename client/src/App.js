import "./App.css";
// import {Button} from 'antd';
// import 'antd/dist/antd.css'; //css
import "antd/dist/antd.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute> <Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute(props){
  if(localStorage.getItem('monthend-db-user')){
    return props.children
  }else{
    return <Navigate to="/login"/>
  }
}





export default App;
