// import { Link } from "react-router-dom";
// import Productcard from "../components/Product-card";
// import { useLatestProductsQuery } from "../redux/api/ProductAPI";
// import toast from "react-hot-toast";
// import  { Skeleton } from "../components/Loader";
// import { CartItemType } from "../types/types";
// import { addToCart } from "../redux/reducer/cartReducer";
// import { useDispatch } from "react-redux";

// const Home = () => {
//   const dispatch=useDispatch();
//   const addToCartHandler = (cartItem:CartItemType) => {

//     if(cartItem.stock<1) return toast.error("Product is Out of Stock");

//     else{
//       dispatch(addToCart(cartItem));
//       toast.success("Product Added to Cart");
//     }

//   };
//   const { data, isLoading, isError } = useLatestProductsQuery("");

//   if (isError) toast.error("Cannot fetch products");
//   return (
//     <div className="home">
//       <h1>uSpace</h1>

//       <section></section>

//       <div className="heading">
//         <h1>Latest Products</h1>
//         <Link
//           to="/search"
//           className="findMore"
//           style={{ background: "yellowgreen", padding: "5px" }}
//         >
//           More
//         </Link>
//       </div>
//       <div className="products">
//         { isLoading?<Skeleton/> :(data?.data.map((i) => (
//           <Productcard
//             productId={i._id}
//             key={i._id}
//             name={i.name}
//             price={i.price}
//             photo={i.photo}
//             stock={i.stock}
//             rating={i.rating}
//             handler={addToCartHandler}
//           />)
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;



import { Link } from "react-router-dom";
import Productcard from "../components/Product-card";
import { useLatestProductsQuery, useTrendingProductsQuery } from "../redux/api/ProductAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItemType } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import heroImage from "../assets/shoppingOnline.jpg"; // Add an attractive image
import '../Styles/home.scss'
const Home = () => {
  const dispatch = useDispatch();
  
  const addToCartHandler = (cartItem: CartItemType) => {
    if (cartItem.stock < 1) return toast.error("Product is Out of Stock");
    
    dispatch(addToCart(cartItem));
    toast.success("Product Added to Cart");
  };

  const { data, isLoading, isError } = useLatestProductsQuery("");
  const {data:trendingData}=useTrendingProductsQuery("");
  
  if (isError) toast.error("Cannot fetch products");

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to uSpace</h1>
          <p>Find the best deals on top-rated products. Shop now and save big!</p>
          <Link to="/search" className="btn">Shop Now</Link>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Shop now" />
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories">
        <div className="category">Electronics</div>
        <div className="category">Fashion</div>
        <div className="category">Home & Kitchen</div>
        <div className="category">Beauty</div>
        <div className="category">Sports</div>
      </div>

      {/* Latest Products */}
      <div className="heading">
        <h1>Latest Products</h1>
        <Link to="/search" className="findMore">More</Link>
      </div>
      <div className="products">
        {isLoading ? <Skeleton /> : data?.data.map((i) => (
          <Productcard
            productId={i._id}
            key={i._id}
            name={i.name}
            price={i.price}
            photo={i.photos[0]}
            stock={i.stock}
            rating={i.rating}
            handler={addToCartHandler}
          />
        ))}
      </div>

      {/* Trending Products */}
      <div className="trending-products">
        <h2>Trending Now</h2>
        <div className="trending-list">
          {isLoading ? <Skeleton /> : trendingData?.data.slice(0, 5).map((i) => (
              <Productcard
              productId={i._id}
              key={i._id}
              name={i.name}
              price={i.price}
              photo={i.photo}
              stock={i.stock}
              rating={i.rating}
              handler={addToCartHandler}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <p>&copy; 2025 uSpace. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
