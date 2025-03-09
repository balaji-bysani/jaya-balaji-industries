// Login.jsx
import React, { useState, useEffect } from "react";
import basestyle from "../../../src/Base.module.css";
import loginstyle from "./Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const admin = { email: "Admin@gmail.com", password: "admin123" };
      const marker = { email: "Marker@gmail.com", password: "marker123" };
      const supervisor = { email: "Supervisor@gmail.com", password: "supervisor123" };

      if (user.email === admin.email && user.password === admin.password) {
        /*toast.success("Login successful!");*/
        setUserState(admin);
        navigate("/Admin", { replace: true });
      } else if (user.email === marker.email && user.password === marker.password) {
        /*Toast.success("Login successful!");*/
        setUserState(marker);
        navigate("/Marker", { replace: true });
      } else if (user.email === supervisor.email && user.password === supervisor.password) {
        /*toast.success("Login successful!");*/
        setUserState(supervisor);
        navigate("/Supervisor", { replace: true });
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    }
  }, [formErrors, isSubmit]);

  return (
    <div className={`${loginstyle.loginPageContainer} `}>
      <div className={loginstyle.loginFormContainer}>
        <form>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
            className={loginstyle.loginFormInput}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
            className={loginstyle.loginFormInput}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <button
            className={`${basestyle.button_common} `}
            onClick={loginHandler}
          >
            Login
          </button>
        </form>
        {/* <NavLink to="/signup">Not yet registered? Register Now</NavLink> */}
      </div>
    </div>
  );
};

export default Login;
