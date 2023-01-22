import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import Cart from "./component/Cart";
import CreateProduct from "./page/CreateProduct";
import Homepage from "./page/Homepage";
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import ProductDetail from "./page/ProductDetail";
import Register from "./page/Register";
import Profile from "./page/Profile";
import Shipping from "./page/Shipping";
import UpdateProduct from "./page/UpdateProduct";
import Success from "./page/Success";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-800 text-white ">
        <div>
          <Navbar />
          <Cart />
          <Routes path="/">
            <Route index element={<Homepage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/create" element={<CreateProduct />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
            </Route>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/success" element={<Success />} />
            <Route path="/profile" element={<Profile />} />
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
