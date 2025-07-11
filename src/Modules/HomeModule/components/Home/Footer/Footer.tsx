import React from "react";
import Grid from "@mui/material/GridLegacy";
import { Box, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#E6533C", color: "#fff", pt: 6, pb: 4 }}>
      <Grid container spacing={0} px={{ xs: 2, md: 9 }}>
        {/* Logo and description */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            <Box
              component="img"
              src="../../../../../public/sample logo 1.png"
              alt="Logo"
              sx={{ width: 64, height: 64, mb: 2 }}
            />
            <Typography
              variant="body2"
              sx={{
                maxWidth: 250,
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: "400",
              }}
            >
              Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Typography>
          </Box>

          {/* Social icons */}
          <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
            <IconButton sx={{ color: "#fff" }}>
              <FacebookIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <LinkedInIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <TwitterIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <YouTubeIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Grid>

        {/* Company Links */}
        <Grid item xs={6} md={4}>
          <Typography  sx={{ fontWeight: "bold", mb: 2,fontSize:'24px' }}>
            COMPANY
          </Typography>
          {[
            "HOME",
            "ABOUT US",
            "BOOKS",
            "NEW RELEASE",
            "CONTACT US",
            "BLOG",
          ].map((item) => (
            <Typography key={item} variant="body2" sx={{ mb: 1 ,fontSize:'18px'}}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#fff",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Important Links */}
        <Grid item xs={6} md={4}>
          <Typography  sx={{ fontWeight: "bold", mb: 2,fontSize:'24px' }}>
            IMPORTANT LINKS
          </Typography>
          {["Privacy Policy", "FAQs", "Terms of Service"].map((item) => (
            <Typography key={item} variant="body2" sx={{ mb: 1 ,fontSize:'18px'}}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#FFFF",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item}
              </Link>
            </Typography>
          ))}
        </Grid>
      </Grid>

      {/* Footer bottom */}
      <Box
        sx={{
          mt: 4,
          px: { xs: 2, md: 8 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 14,
        }}
      >
        <Typography variant="body2">
          © 2022 Arihant. All Rights Reserved.
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link
            href="#"
            underline="none"
            sx={{ color: "#fff", fontWeight: 500 }}
          >
            Privacy
          </Link>
          <Typography variant="body2" component="span">
            |
          </Typography>
          <Link
            href="#"
            underline="none"
            sx={{ color: "#fff", fontWeight: 500 }}
          >
            Terms of Service
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
