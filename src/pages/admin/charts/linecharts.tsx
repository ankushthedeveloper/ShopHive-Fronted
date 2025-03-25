import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Skeleton } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { useLineQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";
import { lastMonths } from "../../../utils/features";


const {last6Months,last12Months}=lastMonths()
const Linecharts = () => {


  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError,  isLoading } = useLineQuery(user?._id!);
  if (isError) return <Navigate to={'/admin/dashboard'}/>

 
  const products=data?.LineCharts.product||[];
  const revenue=data?.LineCharts.revenue||[];
  const users=data?.LineCharts.users||[];
  const discount=data?.LineCharts.discount||[];


  

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
       {isLoading?<Skeleton length={20}/>:
       <>
        <section>
          <LineChart
            data={users}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            labels={last6Months}
            backgroundColor="rgba(53, 162, 255, 0.5)"
          />
          <h2>Active Users</h2>
        </section>

        <section>
          <LineChart
            data={products}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            labels={last6Months}
            label="Products"
          />
          <h2>Total Products (SKU)</h2>
        </section>

        <section>
          <LineChart
            data={revenue}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={last12Months}
          />
          <h2>Total Revenue </h2>
        </section>

        <section>
          <LineChart
            data={discount}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={last12Months}
          />
          <h2>Discount Allotted </h2>
        </section>
       </>}
      </main>
    </div>
  );
};

export default Linecharts;
