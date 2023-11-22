import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";

export default function Cart() {
  const { cartItems, removeFromCart, removeAll } = useContext(ShopContext);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    total();
  }, [cartItems]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalVal += +cartItems[i].price * +cartItems[i].quantity;
    }
    setCartTotal(totalVal);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <p>Корзина пуста :(</p>
        <Link className="link" to="/">
          К покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <p className="cart-name">Корзина:</p>
      {cartItems.map((item) => (
        <div className="cart-item item" key={item.id} id={item.id}>
          <div className="item-info info">
            <img className="info-image" src={item.image} alt="product.img" />
            <div className="info-descr">
              <p>Наименование: {item.name}</p>
              <p>Цвет: {item.colorName}</p>
              <p>Размер: {item.size}</p>
              <p className="info-count">Кол-во: {item.quantity}</p>
            </div>
          </div>
          <hr />
          <div className="item-price">
            <p>{item.price * item.quantity} ₽</p>
          </div>
          <button className="item-btn" onClick={() => removeFromCart(item.id)}>
            <img src="/images/trash.svg" alt="delete" />
          </button>
        </div>
      ))}
      <div className="cart-total">
        <button className="cart-delete" onClick={() => removeAll()}>
          Удалить все
        </button>
        <p>Всего: {cartTotal} ₽</p>
      </div>
    </div>
  );
}
