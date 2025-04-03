import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { messageTypeResponse } from "../types/api-types";
import toast from "react-hot-toast";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [login] = useLoginMutation();
  const loginHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.displayName!,
        photo: user.photoURL!,
        email: user.email!,
        gender,
        gId: user.uid!,
        role: "user",
        dob:date,
      });
      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const err = res.error as FetchBaseQueryError;
        const message = (err.data as messageTypeResponse).message;
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <main>
        <h1>SignIn to uSpace</h1>
        <form>
          <div>
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              placeholder="DOB"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

          </div>
          <p style={{fontSize:"1.3rem" ,fontFamily:"monospace"}}>Already Signed In Once ? <span style={{fontSize:"1rem" , color:"green" ,fontFamily:"monospace"}}>No need to fill above Details</span></p>
          <button
            style={{ background: "white", color: "black" }}
            onClick={loginHandler}
          >
            <FcGoogle />
            Sign In with Google
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
