import { Link } from "react-router-dom";

export default function ProductItem(props) {
  const { product } = props;
  return (
    <li className="product-item">
      <Link to={`/${product.id}`} className="link">
        <img className="product-image" src={product.colors[0].images[0]} />
        <p className="product-name">{product.name}</p>
      </Link>
    </li>
  );
}
