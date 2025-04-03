import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItemType } from "../types/types";

type CartProps = {
  cartItem: CartItemType;
  incrementHandler: (cartItem: CartItemType) => void;
  decrementHandler: (cartItem: CartItemType) => void;
  removeHandler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartProps) => {
  const { productId, name, price, photo, quantity } = cartItem;

  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt="name" />
      <article>
        <Link to={`/product/${productId}`} style={{ fontFamily: "monospace" }}>
          {name}
        </Link>
        <span style={{ fontWeight: "bold", textAlign: "center" }}>
          ₹ {price}/-
        </span>
      </article>
      <div className="quantity">
        <button onClick={() => incrementHandler(cartItem)}>+</button>
        <span>{quantity}</span>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
      </div>
      <button
        style={{ color: "red" }}
        className="delete"
        onClick={() => removeHandler(productId!)}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
