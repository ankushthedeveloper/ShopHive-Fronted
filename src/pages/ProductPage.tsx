import { BiCart } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { useSingleProductQuery } from "../redux/api/ProductAPI";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { customError } from "../types/api-types";
import { CartItemType } from "../types/types";
import { server } from "../redux/store";
import { Skeleton } from "../components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import "../Styles/ProductPage.scss"; // Global SCSS file

const ProductPage = () => {
  const { id } = useParams();
  const { data: res, isError, isLoading, error } = useSingleProductQuery(id!);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }

  const { price, name, stock, photo, category, tags, description, rating } =
    res?.data || {
      name: "",
      price: 0,
      stock: 0,
      photo: "",
      category: "",
      tags: [],
      description: "",
      rating: 0,
    };
 
    const cartHandler = (cartItem: CartItemType) => {
    if (cartItem.stock < 1) return toast.error("Product is Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Product Added to Cart");
  };

  const buyHandler = (cartItem: CartItemType) => {
    if (cartItem.stock < 1) return toast.error("Product is Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("For Checkout, Go to Cart");
    navigate("/cart");
  };

  return (
    <div className="product-page">
      {isLoading ? (
        <Skeleton length={20} />
      ) : (
        <div className="product-main">
          {/* Product Image */}
          <div className="product-image-container">
            <h5 className="category">{category}</h5>
            <img src={`${server}/${photo}`} alt={name} className="product-image" />
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h1 className="product-name">{name}</h1>
            <p className="product-price">₹{price}</p>
            <p className="product-stock">{stock} Available</p>
            <p className="product-rating">Rating: ⭐ {rating}/5</p>

            <div className="product-tags">
              {tags.map((t:string, index) => (
                <span key={index} className="tag">
                  #{t.trim()}
                </span>
              ))}
            </div>

            <p className="product-description">{description}</p>

            {/* Buttons */}
            <div className="product-buttons">
              <button
                onClick={() => cartHandler({productId:id, name, price, stock,photo, quantity:1 })}
                className="btn btn-add-to-cart"
              >
                Add to Cart <BiCart />
              </button>
              <button
                onClick={() => buyHandler({ productId:id, name, price, stock,photo, quantity:1 })}
                className="btn btn-buy-now"
              >
                Buy Now <FiShoppingBag />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
