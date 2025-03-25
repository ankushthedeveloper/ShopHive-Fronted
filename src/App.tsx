import { Suspense, lazy, useEffect } from "react";
import "./Styles/app.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userAPI";
import { userReducerInitialState } from "./types/reducer-types";
import Loader from "./components/Loader";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Notfound from "./pages/not-found";
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Checkout = lazy(() => import("./pages/Checkout"));

//LoggedIn user Routes

//admin routes
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Customers = lazy(() => import("./pages/admin/customers"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManage = lazy(() => import("./pages/admin/management/productmanagement")
);
const TransactionInfo = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

const BarCharts = lazy(() => import("./pages/admin/charts/barcharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/piecharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/linecharts"));

const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Orders = lazy(() => import("./pages/Orders"));

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);

        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    });

    // return () => {}
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Header user={user} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductPage />} />
          //auth Routes
          <Route
            path="/login"
            element={
              <ProtectedRoutes isAuthenticated={user ? false : true}  adminOnly={false} admin={false}>
                <Login />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoutes isAuthenticated={user ? false : true} adminOnly={false} admin={false}>
                <Signup />
              </ProtectedRoutes>
            }
          />
          //LoggedIn user Routes
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          //admin routes
          <Route
            element={
              <ProtectedRoutes
                isAuthenticated={true}
                admin={user?.role === "admin" ? true : false}
                adminOnly={true}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<BarCharts />} />
            <Route path="/admin/chart/pie" element={<PieCharts />} />
            <Route path="/admin/chart/line" element={<LineCharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManage />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionInfo />}
            />
          </Route>
          <Route path="*" element={<Notfound />} />
          <Route path="/pay" element={<Checkout/>}/>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
