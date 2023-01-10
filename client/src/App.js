import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Homepage from "./page/Homepage";
import Login from "./page/Login";
import Register from "./page/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-800 text-white ">
        <div>
          <Navbar />
          <Routes path="/">
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
