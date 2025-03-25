import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartReducerInitialState } from "../types/reducer-types";
import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );

  const dispatch=useDispatch();
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    pinCode:"" ,
  });
  const navigate = useNavigate();
  const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShippingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const SubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
dispatch(saveShippingInfo(shippingInfo));
    try {
      const { data } = await axios.post(
        `
      ${server}/api/v1/payment/create`,
        { 
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/pay",
      {
        state: {
          clientSecret: data.clientSecret,
        },
      });
    } catch (error) {
  console.log(error);
  toast.error("Something went reallyyy wrong")
  
      
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <div className="shipping">
      <main>
        <h1>Shipping Address</h1>
        <form onSubmit={SubmitHandler}>
          <button className="back" onClick={() => navigate("/cart")}>
            {" "}
            <BiArrowBack />
          </button>
          <input
            type="text"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={ChangeHandler}
            name="address"
          />

          <input
            type="text"
            placeholder="city"
            value={shippingInfo.city}
            onChange={ChangeHandler}
            name="city"
          />

          <input
            type="text"
            placeholder="state"
            value={shippingInfo.state}
            onChange={ChangeHandler}
            name="state"
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingInfo.country}
            onChange={ChangeHandler}
          />

          <input
            type="text"
            placeholder="Pin Code"
            value={shippingInfo.pinCode}
            onChange={ChangeHandler}
            name="pinCode"
          />

          <input
            type="text"
            placeholder="Phone"
            value={shippingInfo.phone}
            onChange={ChangeHandler}
            name="phone"
          />

          <button>Pay</button>
        </form>
      </main>
    </div>
  );
};

export default Shipping;
