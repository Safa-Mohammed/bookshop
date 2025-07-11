import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AUTH_URLS } from "../../../constant/END-POINT";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgetPassword() {
  const navigate = useNavigate();

  interface FormValues {
    email: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

const onSubmit = async (data: FormValues) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailRegex.test(data.email)) {
    toast.warning("Please enter a valid email address");
    return;
  }

  toast.info("Email looks good. Sending reset link...");

  try {
    const response = await axios.post(AUTH_URLS.ForgetPassword, data);
    toast.success(response.data.message || "Reset link sent to your email");
    navigate("/reset-password");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || error.message || "Failed to send reset link.";
    toast.error(errorMsg);
    console.error("Error sending reset link:", errorMsg);
  }
};


  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
        <Typography variant="h6" color="textSecondary" align="left">
          Forgot your password?
        </Typography>

        <Typography variant="subtitle2" fontWeight="500" paddingTop={3}>
          Email
        </Typography>
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
          sx={{ mt: 1 }}
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
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "28px",
          }}
        >
          Send Reset Link
        </button>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}
