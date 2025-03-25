import { useEffect, useState } from "react";
import CartItemCard from "../components/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types";
import { CartItemType } from "../types/types";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const [coupon, setCoupoon] = useState<string>("");
  const [isvalidCoupon, setIsvalidCoupon] = useState<boolean>(false);
  const { cartItems, total, subtotal, tax, discount, shippingCharges } =
    useSelector(
      (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
    );

  const dispatch = useDispatch();
  const incrementHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity! >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity!+ 1 }));
  };
  const decrementHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity! <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity! - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const {token,cancel}=axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios
      .get(`${server}/api/v1/payment/coupon/discount?code=${coupon}`,{cancelToken:token})
      .then((res) => {
        setIsvalidCoupon(true);
        dispatch(discountApplied(res.data.discount));
        console.log(res.data);
      })
      .catch(() => {
        setIsvalidCoupon(false);
        dispatch(discountApplied(0));
      });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsvalidCoupon(false);
    };
  }, [coupon]);


  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    //uSpaceF\src\assets\shoppingOnline.jpg
    <div className="cart">
      <div className="cartInfo">
        <main>
          {cartItems.length<1 && (
            <em className="red">No Product Added in the cart</em>
          )}
          {cartItems.map((item) => (
            <CartItemCard
              key={item.productId}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              cartItem={item}
            />
          ))}
        </main>
        <section className="info">
          <p>Shipping Charges :{shippingCharges}₹</p>
          <p>Tax: ₹{tax}</p>
          <p>Subtotal:₹{subtotal}</p>
          <p className="purple">Discount:- ₹{discount}</p>

          <input
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupoon(e.target.value)}
          />
          {coupon &&
            (isvalidCoupon ? (
              <em className="green">
                Coupon of ₹{discount} Applied Succesfully😊
              </em>
            ) : (
              <em className="red">Invalid Coupon🧐 </em>
            ))}

          <p>Total: ₹{total - discount}</p>

          {cartItems.length > 0 ? (
            <Link to={"/shipping"}>CheckOut</Link>
          ) : (
            <em className="red">No Product Added in the cart</em>
          )}
        </section>
      </div>
    </div>
  );
};

export default Cart;
