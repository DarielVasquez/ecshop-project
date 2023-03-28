import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Login, Error } from "./pages";
import { Navbar, Footer } from "./components";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
