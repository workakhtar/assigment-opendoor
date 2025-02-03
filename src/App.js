import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router"
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
    <Navbar /> 
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        

        <Route path="/*" element={  <Navigate to='/' /> }></Route>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
