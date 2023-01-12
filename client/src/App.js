import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import Cart from "./page/Cart";
import CreateProduct from "./page/CreateProduct";
import Homepage from "./page/Homepage";
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import Register from "./page/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-800 text-white ">
        <div>
          <Navbar />
          <Cart />
          <Routes path="/">
            <Route index element={<Homepage />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/create" element={<CreateProduct />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
