import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import Layout from "./components/Layout";


const basename = process.env.NODE_ENV === "production" ? "/Ecommerce-Prjct---Codegama" : "/";
function App() {
  return (
    <div className="App">
      <Router basename={basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
