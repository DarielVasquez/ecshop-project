import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Login,
  Error,
  Cart,
  CategoryProducts,
  SingleProduct,
} from "./pages";
import { NavigationBar, Footer } from "./components";
// import "./App.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="category/:category" element={<CategoryProducts />}></Route>
        <Route path="product/:id" element={<SingleProduct />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
