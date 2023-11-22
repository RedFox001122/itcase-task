import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, getProducts, getSizes } from "../../services/api";
import Product from "../product";
import ProductItem from "../productItem";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  if (products.length === 0) {
    return (
      <div className="shop">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="shop">
      <ul className="product-list">
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            image={product.colors[0].images[0]}
            name={product.name}
          />
        ))}
      </ul>
    </div>
  );
}
