import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Skeleton } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";
import { lastMonths } from "../../../utils/features";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const {last6Months,last12Months}=lastMonths()
const Barcharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError,  isLoading } = useBarQuery(user?._id!);
  if (isError) return <Navigate to={'/admin/dashboard'}/>

 
  const products=data?.barCharts.products||[];
  const orders=data?.barCharts.orders||[];
  const users=data?.barCharts.users||[];

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
       {isLoading?<Skeleton length={20}/> :<>
       <h1>Bar Charts</h1>
        <section>
          <BarChart
            data_1={products}
            data_2={users}
            title_1="Products"
            title_2="Users"
            labels={last6Months}
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2={`hsl(360, 90%, 90%)`}
          />
          <h2>Top Products & Top Customers</h2>
        </section>

        <section>
          <BarChart
            horizontal={true}
            data_1={orders}
            data_2={[]}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={last12Months}
          />
          <h2>Orders throughout the year</h2>
        </section>
       </>}
      </main>
    </div>
  );
};

export default Barcharts;
