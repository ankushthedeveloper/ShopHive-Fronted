import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { RootState } from "../../redux/store";
import {
  useAllusersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userAPI";
import { useSelector } from "react-redux";
import { customError } from "../../types/api-types";
import toast from "react-hot-toast";
import { responseToast } from "../../utils/features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data: res, isError, error, isLoading } = useAllusersQuery(user?._id!);

  const [deleteUser] = useDeleteUserMutation();
  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminId: user?._id! });
    responseToast(res, null, "");
  };

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (res) {
      setRows(
        res.data.map((i) => ({
          avatar: (
            <img
              src={i.photo}
              style={{
                borderRadius: "50%",
                fontSize: "3rem",
                color: "white",
                background: "teal",
                minWidth:"50px"
              }}
              alt={i.name.charAt(0)}
            />
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [res]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Customers;
