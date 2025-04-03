import { FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { OrderItemType } from "../../models/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../types/reducer-types";
import { server } from "../../../redux/store";
import { Order } from "../../../types/types";
import { responseToast } from "../../../utils/features";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../../redux/api/OrderAPI";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phone:""
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};


const TransactionManagement = () => {
  const navigate=useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useOrderDetailsQuery(id!);

  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    tax,
    total,
    shippingCharges,
    status,
    subtotal,
    discount,
    user: { name },
    _id,
  } = data?.order || defaultData;

  if(isError) return navigate('/404');

  const [updateOrder]=useUpdateOrderMutation();
  const [deleteOrder]=useDeleteOrderMutation();
  
  const updateHandler = async () => {
    const res=await updateOrder({
      userId:user?._id!,
      orderId:data?.order._id!,
      
    })
    responseToast(res,navigate,"/admin/transaction")
  
  };

  const deleteHandler = async () => {
    const res=await deleteOrder({
      userId:user?._id!,
      orderId:data?.order._id!,
      
    })
    responseToast(res,navigate,"/admin/transaction")
  
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section
          style={{
            padding: "2rem",
          }}
        >
          <h2>Order Items</h2>

          {orderItems.map((i) => (
            <ProductCard
              key={i._id}
              name={i.name}
              photo={`${server}/${i.photo}`}
              _id={i._id}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </section>

        <article className="shipping-info-card">
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </span>
          </p>
          <button className="shipping-btn" onClick={updateHandler}>
            Process Status
          </button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
