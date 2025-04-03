import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiMenuAlt4 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Skeleton } from "../components/Loader";
import Productcard from "../components/Product-card";
import {
  useCategoriesQuery,
  useFilteredProductsQuery,
} from "../redux/api/ProductAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { customError } from "../types/api-types";
import { CartItemType } from "../types/types";

const Search = () => {
  
  const dispatch=useDispatch();

  const addToCartHandler = (cartItem:CartItemType) => {

    if(cartItem.stock<1) return toast.error("Product is Out of Stock");

   dispatch(addToCart(cartItem));
   toast.success("Product Added to Cart");

  };



  const {
    data: CategoriesRes,
    isError,
    error,
    isLoading,
  } = useCategoriesQuery("");

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setmaxPrice] = useState(100000);
  const [category, setcategory] = useState("");
  const [page, setpage] = useState(1);
 

  const { data: searchedProductsRes ,isError:productIsError,error:productError } = useFilteredProductsQuery({
    search,
    sort,
    price: maxPrice,
    category,
    page,
  });
  const isprev = page > 1;
  const isnext = page < 4;
  const [showModal, setModal] = useState<boolean>(false);
  const [isphone, setIsphone] = useState<boolean>(window.innerWidth < 768);

  if (productIsError) {
    const err = productError as customError;
    toast.error(err.data.message);
  }
  const resizeHandler = () => {
    setIsphone(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="searchPage">
      {isphone && (
        <div
          className="hamburger"
          onClick={() => setModal(true)}
          style={{ fontSize: "1.5rem" }}
        >
          <HiMenuAlt4 />
        </div>
      )}
      <aside
        style={
          isphone
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
                background: "white",
              }
            : {}
        }
      >
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price(Low to High)</option>
            <option value="dsc">Price(High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price :{maxPrice || ""} </h4>
          <input
            value={maxPrice}
            type="range"
            min={1000}
            max={1000000}
            onChange={(e) => setmaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Categories</h4>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">All</option>
            {isLoading === false &&
              CategoriesRes?.data.map((i) => (
                <option value={i} key={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
        {isphone && (
          <button
            id="close-sidebar"
            style={{ textAlign: "center", height: "40px" }}
            onClick={() => setModal(false)}
          >
            X
          </button>
        )}
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isLoading ? (
          <Skeleton length={15} />
        ) : (
          <div className="productList">
            {searchedProductsRes?.data.map((product) => (
              <Productcard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                photo={product.photo}
                stock={product.stock}
                rating={product.rating}
                handler={addToCartHandler}
              />
            ))}
          </div>
        )}
        {searchedProductsRes && searchedProductsRes.totalPage > 1 && (
          <article className="btns">
            <button
              onClick={() => setpage((prev) => prev - 1)}
              disabled={!isprev}
            >
              Prev
            </button>
            <span>
              {page} of {searchedProductsRes.totalPage}
            </span>
            <button
              onClick={() => setpage((prev) => prev + 1)}
              disabled={!isnext}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
