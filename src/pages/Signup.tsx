import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [info, setInfo] = useState({
    FirstName: "",
    LastName: "",
    Username: "",
    Password: "",
    ConfirmPassword: "",
  });

  const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="signup">
      <main>
        <h1>SignUp to uSpace</h1>
        <form>
          <input
            type="text"
            placeholder="FirstName"
            value={info.FirstName}
            onChange={ChangeHandler}
            name="FirstName"
          />

          <input
            type="text"
            placeholder="LastName"
            value={info.LastName}
            onChange={ChangeHandler}
            name="LastName"
          />

          <input
            type="text"
            placeholder="Username"
            value={info.Username}
            onChange={ChangeHandler}
            name="Username"
          />

          <input
            type="text"
            placeholder="Password"
            value={info.Password}
            onChange={ChangeHandler}
            name="Password"
          />

          <input
            type="text"
            placeholder="ConfirmPassword"
            value={info.ConfirmPassword}
            onChange={ChangeHandler}
            name="ConfirmPassword"
          />
          <button>SignUp</button>
          <p>
            Already have an account? <Link to="/login" className="green">Login</Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Signup;
