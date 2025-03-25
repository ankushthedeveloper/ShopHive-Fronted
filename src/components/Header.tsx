import { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser } from "react-icons/fa";

import { IoExitOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";



interface propType{
  user:User|null
}
const Header = ({user}:propType) => {
    const [isOpen,setIsopen]=useState<boolean>(false);
    const logoutHandler = async () => {
      try {
        await signOut(auth);
        toast.success("Sign Out Successfully");
        setIsopen(false);
      } catch (error) {
        toast.error("Sign Out Fail");
      }
    };
  return (
    <nav className="header">
      <Link onClick={() => setIsopen(false)} to={"/"}>Home</Link>
      <Link onClick={() => setIsopen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsopen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>
      {user?._id ? (
        <>
          <button onClick={()=>setIsopen((prev)=>!prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen} 
          > <button style={{fontSize:"1.5rem" ,position:'fixed',top:'200px',right:'250px'}} id="close-sidebar" onClick={() => setIsopen(false)}>
          <IoExitOutline/>
          </button>
            <div >
              {user.role === "admin" && (
                <Link to="/admin/dashboard" >Admin-Panel</Link>
              )}

              <Link to={'/orders'}>Orders</Link>

              <Link to={'/orders'}>Orders</Link>
              <button><LuLogOut/>Signout</button>
            </div>
          </dialog>
          <button style={{color:"red"}} onClick={logoutHandler}><LuLogOut/></button>
        </>
      ) : (
        <Link to={"/login"} style={{color:"green"}}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
