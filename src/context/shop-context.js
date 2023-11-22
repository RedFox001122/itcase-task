import { useState, createContext, useEffect } from "react";

export const ShopContext = createContext(null);

export default function ShopContextProvider(props) {
  const { children } = props;
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const addToCart = (product, color, size, name, colorName, price, image) => {
    const productExists = cartItems.find(
      (item) =>
        item.product === product && item.color === color && item.size === size
    );
    if (productExists) {
      setCartItems(
        cartItems.map((item) =>
          item.product === product && item.color === color && item.size === size
            ? { ...productExists, quantity: productExists.quantity + 1 }
            : item
        )
      );
    } else if (size === undefined || size === "") {
      alert("choose size");
    } else {
      setCartItems([
        ...cartItems,
        {
          id: cartItems.length
            ? cartItems.reduce((p, c) => (p.id > c.id ? p : c)).id + 1
            : 1,
          product,
          name,
          colorName,
          price,
          image,
          color,
          size,
          quantity: 1,
        },
      ]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeAll = () => {
    setCartItems([]);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    removeAll,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
}
