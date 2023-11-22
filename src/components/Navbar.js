import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shop-context";

export default function Navbar() {
  const { cartItems } = useContext(ShopContext);
  return (
    <div className="navbar">
      <div className="links">
        <Link className="link" to="/">
          Лого
        </Link>
        <Link className="link" to="/cart">
          Корзина
          <div className="link-badge">{cartItems.length}</div>
        </Link>
      </div>
    </div>
  );
}
