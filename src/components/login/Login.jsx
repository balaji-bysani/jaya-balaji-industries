// Login.jsx
import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      const Admin = { email: "Admin@gmail.com", password: "admin123" };
      const employee = { email: "employee@gmail.com", password: "employee123" };
      const developer = { email: "developer@gmail.com", password: "developer123" };

      if (user.email === Admin.email && user.password === Admin.password) {
        toast.success("Login successful!");
        setUserState(Admin);
        navigate("/ecommerce", { replace: true });
      } else if (user.email === employee.email && user.password === employee.password) {
        Toast.success("Login successful!");
        setUserState(employee);
        navigate("./pages/Ecommerce.jsx", { replace: true });
      } else if (user.email === developer.email && user.password === developer.password) {
        toast.success("Login successful!");
        setUserState(developer);
        navigate("./pages/Ecommerce.jsx", { replace: true });
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
        <NavLink to="/signup">Not yet registered? Register Now</NavLink>
      </div>
    </div>
  );
};

export default Login;
