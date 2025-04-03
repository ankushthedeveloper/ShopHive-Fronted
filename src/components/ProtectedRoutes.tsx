import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'


interface props{
    adminOnly: boolean,
    admin:boolean,
    children?:ReactElement,
    isAuthenticated:boolean,
    redirect?:string
}
const ProtectedRoutes = ({adminOnly,admin,children,isAuthenticated,redirect='/'}:props) => {

  if (!isAuthenticated) return <Navigate to={redirect} />

  if(adminOnly && !admin) return <Navigate to={redirect} /> 

  return children? children : <Outlet/>
}
export default ProtectedRoutes