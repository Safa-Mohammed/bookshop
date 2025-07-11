// ChangePassword.tsx
import { useEffect, useContext } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTH_URLS } from "../../../constant/END-POINT";
import { AuthContext } from "../../../context/authContext";  // Adjust import path accordingly

interface FormValues {
  password: string;       // Current password
  password_new: string;   // New password
}

export default function ChangePassword() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    // If no token or no user data, redirect to login
    if (!localStorage.getItem("userToken") || !authContext?.userData) {
      toast.error("You must be logged in to change your password");
      navigate("/login");
    }
  }, [navigate, authContext]);

  const onSubmit = async (data: FormValues) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("Authentication token missing. Please login.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        AUTH_URLS.ChangePassword,
        {
          password: data.password,
          password_new: data.password_new,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in header
          },
        }
      );

      toast.success(response.data.message || "Password changed successfully");
      // Optionally clear token or refresh user data here
      navigate("/dashboard/home");
    } catch (error: any) {
      // Better error extraction
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Error changing password";
      toast.error(errMsg);
      console.error("Error changing password:", errMsg);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", maxWidth: 400, mx: "auto", mt: 4 }}
      >
        <Typography variant="h6" color="textSecondary" align="left" mb={2}>
          Change Password
        </Typography>

        <Typography variant="subtitle2" fontWeight="500" paddingTop={2}>
          Current Password
        </Typography>
        <TextField
          label="Current Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", {
            required: "Current password is required",
            minLength: { value: 6, message: "Must be at least 6 characters" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Typography variant="subtitle2" fontWeight="500" paddingTop={2}>
          New Password
        </Typography>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password_new", {
            required: "New password is required",
            minLength: { value: 6, message: "Must be at least 6 characters" },
          })}
          error={!!errors.password_new}
          helperText={errors.password_new?.message}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#F06449",
            color: "white",
            border: "none",
            borderRadius: 4,
            marginTop: 28,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Change Password
        </button>
      </Box>
      <ToastContainer position="top-right" autoClose={10000} />
    </>
  );
}
