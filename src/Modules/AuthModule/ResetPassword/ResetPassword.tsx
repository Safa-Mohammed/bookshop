import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AUTH_URLS } from "../../../constant/END-POINT";

export default function ResetPassword() {
  const navigate = useNavigate();

  interface FormValues {
    email: string;
    otp: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(
      AUTH_URLS.ResetPassword, 
        data
      );
      console.log(response.data.message);
      console.log("Password reset successful!");
      navigate("/login");
    } catch (error: any) {
      console.error(
        "Reset failed:",
        error?.response?.data?.message || error.message
      );
       console.log("Failed to reset password.");
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
        Reset Your Password
      </Typography>

      {/* Email Input */}
      <Typography variant="subtitle2" fontWeight="500">
        Email
      </Typography>
      <Box sx={{ py: 1 }}>
        <TextField
          variant="outlined"
          fullWidth
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Box>

      {/* OTP Input */}
      <Typography variant="subtitle2" fontWeight="500">
        OTP
      </Typography>
      <Box sx={{ py: 1 }}>
        <TextField
          variant="outlined"
          fullWidth
          {...register("otp", { required: "OTP is required" })}
          error={!!errors.otp}
          helperText={errors.otp?.message}
        />
      </Box>

      {/* New Password Input */}
      <Typography variant="subtitle2" fontWeight="500">
        New Password
      </Typography>
      <Box sx={{ py: 1 }}>
        <TextField
          variant="outlined"
          fullWidth
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Box>

      {/* Remember Me */}
      <Box display="flex" alignItems="center">
        <input type="checkbox" id="remember" />
        <label htmlFor="remember" style={{ marginLeft: 8, fontSize: 14 }}>
          Remember Me
        </label>
      </Box>

      {/* Buttons */}
      <Box mt={1}>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#F06449",
            color: "white",
            border: "none",
            borderRadius: 4,
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: 8,
          }}
        >
          Reset Password
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
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
        >
          Back to Register
        </button>
      </Box>
    </Box>
  ); 
}