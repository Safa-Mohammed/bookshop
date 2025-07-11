import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export const NewsletterSection: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fef1f0",
        px: 2,
        pb: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative", // allows child to be absolutely positioned
      }}
    >
      {/* Main Red Box */}
      <Box
        sx={{
          backgroundColor: "#ED553B",
          width: "100%",
          maxWidth: 800,
          textAlign: "center",
          color: "#fff",
          p: 6,
          position: "relative",
        }}
      >
        <Typography
          fontWeight="bold"
          mb={2}
          sx={{
            fontSize: {
              xs: 24,
              sm: 40,
              md: 56,
            },
          }}
        >
          Subscribe to Our Newsletter
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: {
              xs: 14,
              sm: 18,
              md: 20,
            },
          }}
        >
          Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet,
          consectetur. Elit adipiscing enim pharetra hac.
        </Typography>

        {/* Email Box Positioned at Bottom */}
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            backgroundColor: "#fff",
            boxShadow: 3,
            px: 2,
            py: 1,
            width: "90%",
            maxWidth: 500,
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            placeholder="youremail123@gmail.com"
            variant="standard"
            fullWidth
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      p: 0.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f9f9f9",
                      width: 32,
                      height: 32,
                    }}
                  >
                    <EmailIcon color="disabled" fontSize="small" />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              // Target the input element's placeholder
              "& input::placeholder": {
                color: "#57656C",
                opacity: 1,
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f24d3d",
              color: "#fff",
              px: 4,
              letterSpacing: 1,
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "#d23a2f",
              },
            }}
          >
            SUBSCRIBE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsletterSection;
