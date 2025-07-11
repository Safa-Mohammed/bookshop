import {
  Box,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emailValidation } from "../../../constant/VALIDATION";
import { AUTH_URLS } from "../../../constant/END-POINT";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegisterFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      console.log("Data sent to register API:", data);

      const response = await axios.post(AUTH_URLS.Register, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message || "Registration successful!");
      navigate("/login");
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";

      if (error.response?.status === 400) {
        if (error.response.data?.message === "ERROR_MSG_BAD_REQUEST") {
          errorMessage = "Please fill in all required fields correctly.";
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
      console.error("Registration failed:", errorMessage);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
      autoComplete="off"
    >
      <Typography variant="h6" color="textSecondary" align="left">
        Welcome back!
      </Typography>
      <Typography variant="h5" fontWeight="500" mb={3} align="left">
        Register Your Password
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="First Name"
          fullWidth
          autoComplete="off"
          {...register("first_name", { required: "First name is required" })}
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
        />
        <TextField
          label="Last Name"
          fullWidth
          autoComplete="off"
          {...register("last_name", { required: "Last name is required" })}
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
        />
      </Box>

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        autoComplete="off"
        {...register("email", { ...emailValidation })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        autoComplete="new-password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Role"
        select
        fullWidth
        margin="normal"
        defaultValue=""
        autoComplete="off"
        {...register("role", { required: "Role is required" })}
        error={!!errors.role}
        helperText={errors.role?.message}
      >
        <MenuItem value="" disabled>
          Select Role
        </MenuItem>
        <MenuItem value="Customer">Customer</MenuItem>
        <MenuItem value="Seller">Seller</MenuItem>
      </TextField>

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
          Save
        </button>
      </Box>

      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default Register;
