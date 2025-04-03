import { ReactElement, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Column } from "react-table"
import { Skeleton } from "../components/Loader"
import TableHOC from "../components/admin/TableHOC"
import { useMyOrderQuery } from "../redux/api/OrderAPI"
import { RootState } from "../redux/store"
import { customError } from "../types/api-types"
import { Order } from "../types/types"


type DataType={
_id:string,
quantity:number,
discount:number,
amount:number,
status:ReactElement,
action:ReactElement
}

const columns:Column<DataType>[] = [{
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  }
  ,
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  }
  
]
const Orders = () => {
  


  const [rows, setRows] = useState<DataType[]>([]);

  const { user } = useSelector(
    (state: RootState) => state.userReducer
  );

  const {
    data,
    isError,
    error,
    isLoading,
  } = useMyOrderQuery(user?._id!);

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data?.orders.map((i:Order) => (
         {
            _id:i._id,
            amount:i.total,
            discount:i.discount,
            quantity:i.orderItems.length,
              status:<span 
              className={i.status==="processing"?"red":i.status==="shipped"?"green":"purple"}>{i.status}</span>,
            action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
         }))
      );
    }
  }, [data]);
    const Table =TableHOC<DataType>(columns,rows,"dashboard-product-box","Orders",rows.length>6)();
   
  return (
    <div className="container">
        <h1>My Orders</h1>
        {isLoading ? <Skeleton length={15} /> : Table}
    </div>
  )
}

export default Orders