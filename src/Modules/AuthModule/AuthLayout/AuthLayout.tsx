// AuthLayout.tsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import myImage from "../../../assets/bookstorimg.jpg";
import logo from "../../../assets/booksLogo.png";

export default function AuthLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          flex: 1,
          width: { xs: "100%", md: "50%" },
          height: { xs: "40vh", md: "100%" },
        }}
      >
        <img
          src={myImage}
          alt="Auth Illustration"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          width: { xs: "100%", md: "50%" },
          height: { xs: "100vh", md: "100%" },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          {/* Logo */}
          <Box  display="flex" justifyContent="center">
            <img src={logo} alt="Bookstore Logo" width={64} height={64} />
          </Box>

          {/* Here comes the form content */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
