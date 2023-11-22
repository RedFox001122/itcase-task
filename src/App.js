import { useParams, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./pages/shop";
import Cart from "./pages/cart";
import Navbar from "./components/Navbar";
import Product from "./pages/product";
import NotFound from "./pages/notFound";
import { getProducts, getSizes } from "./services/api";
import ShopContextProvider from "./context/shop-context";

export default function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}
