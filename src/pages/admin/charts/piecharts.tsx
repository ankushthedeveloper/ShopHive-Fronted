// import AdminSidebar from "../../../components/admin/AdminSidebar";
// import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
// import data from "../../../assets/data.json";

// const PieCharts = () => {
//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main className="chart-container">
//         <h1>Pie & Doughnut Charts</h1>
//         <section>
//           <div>
//             <PieChart
//               labels={["Processing", "Shipped", "Delivered"]}
//               data={[12, 9, 13]}
//               backgroundColor={[
//                 `hsl(110,80%, 80%)`,
//                 `hsl(110,80%, 50%)`,
//                 `hsl(110,40%, 50%)`,
//               ]}
//               offset={30}
//             />
//           </div>
//           <h2>Order Fulfillment Ratio</h2>
//         </section>

//         <section>
//           <div>
//             <DoughnutChart
//               labels={data.categories.map((i) => i.heading)}
//               data={data.categories.map((i) => i.value)}
//               backgroundColor={data.categories.map(
//                 (i) => `hsl(${i.value * 4}, ${i.value}%, 50%)`
//               )}
//               legends={false}
//               offset={[30,40,50]}
//             />
//           </div>
//           <h2>Product Categories Ratio</h2>
//         </section>

//         <section>
//           <div>
//             <DoughnutChart
//               labels={["In Stock", "Out Of Stock"]}
//               data={[40, 20]}
//               backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
//               legends={false}
//               offset={[0, 80]}
//               cutout={"70%"}
//             />
//           </div>
//           <h2> Stock Availability</h2>
//         </section>

//         <section>
//           <div>
//             <DoughnutChart
//               labels={[
//                 "Marketing Cost",
//                 "Discount",
//                 "Burnt",
//                 "Production Cost",
//                 "Net Margin",
//               ]}
//               data={[32, 18, 5, 20, 25]}
//               backgroundColor={[
//                 "hsl(110,80%,40%)",
//                 "hsl(19,80%,40%)",
//                 "hsl(69,80%,40%)",
//                 "hsl(300,80%,40%)",
//                 "rgb(53, 162, 255)",
//               ]}
//               legends={false}
//               offset={[20, 30, 20, 30, 80]}
//             />
//           </div>
//           <h2>Revenue Distribution</h2>
//         </section>

//         <section>
//           <div>
//             <PieChart
//               labels={[
//                 "Teenager(Below 20)",
//                 "Adult (20-40)",
//                 "Older (above 40)",
//               ]}
//               data={[30, 250, 70]}
//               backgroundColor={[
//                 `hsl(10, ${80}%, 80%)`,
//                 `hsl(10, ${80}%, 50%)`,
//                 `hsl(10, ${40}%, 50%)`,
//               ]}
//               offset={40}
//             />
//           </div>
//           <h2>Users Age Group</h2>
//         </section>

//         <section>
//           <div>
//             <DoughnutChart
//               labels={["Admin", "Customers"]}
//               data={[40, 250]}
//               backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
//               offset={[0, 50]}
//             />
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default PieCharts;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { categories } from "../../../assets/data.json";
import { Skeleton } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { usePieQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data: res, isError, isLoading } = usePieQuery(user?._id!);
  if (isError) return <Navigate to={'/admin/dashboard'}/>
  const pie = res?.pieCharts!;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie and Doughnut Charts</h1>
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <div className="pieChart">
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[
                    pie.orderFullfillment.processing,
                    pie.orderFullfillment.shipped,
                    pie.orderFullfillment.delivered,
                  ]}
                  backgroundColor={categories.map(
                    (i) => `hsl(${i.value * 6},${i.value}%,80%)`
                  )}
                  offset={20}
                  //[0,0,50]
                />
              </div>
              <h2>Order and Fullfillment Ratio</h2>
            </section>

            <section>
              <div className="pieChart">
                <DoughnutChart
                  labels={pie.categoryCount.map((i) => Object.keys(i)[0])}
                  data={pie.categoryCount.map((i) => Object.values(i)[0])}
                  backgroundColor={categories.map(
                    (i) => `hsl(${Math.random()*5},${Object.values(i)[0]}%,80%)`
                  )}
                  cutout={"50%"}
                  legends={false}
                  offset={30}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>

            <section>
              <div className="pieChart">
                <DoughnutChart
                  labels={["In Stock", "Out of Stock"]}
                  data={[
                    pie.stockAvailablity.inStock,
                    pie.stockAvailablity.outOfStock,
                  ]}
                  backgroundColor={categories.map(
                    (i) => `hsl(${i.value * 7},${i.value}%,80%)`
                  )}
                  offset={20}
                  legends={false}
                  cutout={"70%"}
                />
              </div>
              <h2>Stock Availability</h2>
            </section>

            <section>
              <div className="pieChart">
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    pie.RevenueDistribution.marketingCost,
                    pie.RevenueDistribution.discount,
                    pie.RevenueDistribution.burnt,
                    pie.RevenueDistribution.productionCost,
                    pie.RevenueDistribution.netMargin,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={30}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div className="pieChart">
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[pie.usersAgeGroup.teen, pie.usersAgeGroup.adult, pie.usersAgeGroup.senior]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={30}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div className="pieChart">
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[pie.adminCustomer.admin, pie.adminCustomer.user]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  legends
                  offset={30}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
