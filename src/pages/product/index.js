import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getSizes } from "../../services/api";
import { ShopContext } from "../../context/shop-context";

export default function Product(props) {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState();
  const [currentImg, setCurrentImg] = useState(0);
  const [currentSize, setCurrentSize] = useState();
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    getProduct(id).then((res) => {
      setProduct(res);
      setColor(res?.colors[0]);
      setCurrentImg(res?.colors[0].images[0]);
    });
    getSizes().then((res) => setSizes(res));
  }, [id]);

  const changeColor = (item) => {
    setColor(item);
    setCurrentImg(item?.images[0]);
    setCurrentSize("");
  };

  const prevSlide = (img) => {
    const indexImg = color.images.indexOf(img);
    if (indexImg !== 0) setCurrentImg(color.images[indexImg - 1]);
  };

  const nextSlide = (img) => {
    const indexImg = color.images.indexOf(img);
    if (indexImg !== color.images.length - 1) {
      setCurrentImg(color.images[indexImg + 1]);
    }
  };

  if (product === undefined) {
    return (
      <div className="product">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="product">
      <div className="product-gallery">
        <div className="gallery">
          <img className="product-image" src={currentImg} />
          <button className="prev" onClick={() => prevSlide(currentImg)} />
          <button className="next" onClick={() => nextSlide(currentImg)} />
        </div>
        <ul className="product-color">
          {product.colors.map((item) => {
            return (
              <li key={item.id}>
                <img
                  className={
                    item === color
                      ? "product-image_preview active"
                      : "product-image_preview"
                  }
                  src={item.images[0]}
                  alt={item.images[0]}
                  data-title={color.name}
                  onClick={() => changeColor(item)}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="product-info">
        <p className="product-name">
          {product.name},<span> цвет: {color.name}</span>
        </p>

        <div className="product-price">
          <p className="product-descr">{color.description}</p>
          <p key={color.id}>Стоимость: {Math.floor(color.price)} ₽</p>
        </div>
        <div className="product-size">
          <p>Выберите размер:</p>
          <div className="sizes">
            {sizes.map((size) => {
              return (
                <div
                  className={
                    color.sizes.includes(size.id)
                      ? currentSize === size.label
                        ? "size-block active"
                        : "size-block"
                      : "size-block_disabled"
                  }
                  key={size.id}
                  onClick={
                    color.sizes.includes(size.id)
                      ? () => setCurrentSize(size.label)
                      : null
                  }
                >
                  <p>{size.label}</p>
                  <p>{size.number}</p>
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="product-btn"
          onClick={() =>
            addToCart(
              product.id,
              color.id,
              currentSize,
              product.name,
              color.name,
              color.price,
              color.images[0]
            )
          }
        >
          Купить
        </button>
      </div>
    </div>
  );
}
