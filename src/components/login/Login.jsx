// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
      const supervisor = {
        email: "Supervisor@gmail.com",
        password: "supervisor123",
      };

      if (user.email === admin.email && user.password === admin.password) {
        toast.success("Login Successful!", {
          position: "top-right",
        });
        setUserState(admin);
        navigate("/Admin", { replace: true });
      } else if (
        user.email === marker.email &&
        user.password === marker.password
      ) {
        toast.success("Login Successful!", {
          position: "top-right",
        });
        setUserState(marker);
        navigate("/Marker", { replace: true });
      } else if (
        user.email === supervisor.email &&
        user.password === supervisor.password
      ) {
        toast.success("Login Successful!", {
          position: "top-right",
        });
        setUserState(supervisor);
        navigate("/Supervisor", { replace: true });
      } else {
        toast.error("Invalid email or password. Please try again.", {
          position: "top-center",
        });
      }
    }
  }, [formErrors, isSubmit]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full overflow-hidden">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-left">Login</CardTitle>
              <CardDescription className="text-left">
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-left">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      onChange={changeHandler}
                      value={user.email}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={changeHandler}
                      value={user.password}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={loginHandler}
                  >
                    Login
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
