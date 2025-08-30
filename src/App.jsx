import { Link, Route, Routes } from "react-router-dom";
import Products from "./Products";
import Product from "./Product";

const App = () => {
  return (
    <div>
      <h1>Hii I am React Querry</h1>
      <nav>
        <Link to="/">product</Link>
        <br />
        <Link to="/products">Products</Link>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
