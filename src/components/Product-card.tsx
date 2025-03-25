import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { FcRating } from "react-icons/fc";
import { CartItemType } from "../types/types";
import '../Styles/productCard.scss'
type ProductProps = {
  productId: string;
  price: number;
  stock: number;
  photo: string;
  name: string;
  rating: number;
  handler: (cartItem: CartItemType) => string | undefined;
};

const ProductCard = ({
  productId,
  photo,
  price,
  name,
  stock,
  rating,
  handler,
}: ProductProps) => {
  return (
    <div className="Product-card">
      <img src={`${server}/${photo}`} alt={name} />

      <div className="info">
        <Link to={`/product/${productId}`}>{name}</Link>
        <p className="price">₹{price}</p>
        <span className={`stock ${stock==0 && "out-of-stock"}`}>{stock > 0 ? `${stock} Available` : "Out of Stock"}</span>
        <div className="rating">
          <FcRating /> {`${rating}/5`}
        </div>
      </div>

      <div className="productProcess">
        <button
          className="btn"
          onClick={() =>
            handler({
              productId,
              photo,
              price,
              name,
              stock,
              quantity: 1,
            })
          }
        >
          <FaPlus />
        </button>
        <Link to={`/product/${productId}`}>
          <CiSearch />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
