import React, { useContext } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AUTH_URLS } from "../../../constant/END-POINT";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { saveUserData }: any = useContext(AuthContext);

  interface ValuesForm {
    username: string;
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValuesForm>();

  const onSubmit = async (data: ValuesForm) => {
    try {
      let response = await axios.post(AUTH_URLS.Login, data);

      localStorage.setItem("userToken", response?.data?.data?.accessToken);
      saveUserData();
      toast.success(response?.data?.message || "Login successful!");
      setTimeout(() => {
        navigate("/dashboard/home");
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error("Login failed. Please try again");

      console.error("Login error:", errorMessage);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <Typography variant="h6" color="textSecondary" align="left">
        Welcome back!
      </Typography>
      <Typography variant="h5" fontWeight="500" mb={3} align="left">
        Login to your account
      </Typography>

      <Typography variant="subtitle2" fontWeight="500" paddingTop={3}>
        Email
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        {...register("email", {
        })}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
        sx={{ mt: 1 }}
      />

      <Typography variant="subtitle2" fontWeight="500" paddingTop={3}>
        Password
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ""}
        sx={{ mt: 1 }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 2,
          pt: 2,
        }}
      >
        <Box display="flex" alignItems="center">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" style={{ marginLeft: 8, fontSize: 14 }}>
            Remember Me
          </label>
        </Box>
        <Typography
          component="a"
          fontSize={14}
          color="#6C63FF"
          sx={{ textDecoration: "none", cursor: "pointer" }}
          onClick={() => navigate("/forget-password")}
        >
          Forgot Password?
        </Typography>
      </Box>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#F06449",
          color: "white",
          border: "none",
          borderRadius: 4,
          marginBottom: 8,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      <button
        type="button"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "white",
          color: "#6C63FF",
          border: "2px solid #6C63FF",
          borderRadius: 4,
          fontWeight: "500",
          cursor: "pointer",
        }}
        onClick={() => navigate("/register")}
      >
        Register
      </button>

      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default Login;
