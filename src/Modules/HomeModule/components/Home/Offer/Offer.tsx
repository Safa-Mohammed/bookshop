import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";

import {
  Box,
  Typography,
  Button,
  // IconButton,
  Stack,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import bookImg from "../../../../../assets/Unsplash.png";
import { useEffect } from "react";

const slides = [
  {
    title: "All books are 50% off now!",
    subtitle: "Don't miss such a deal!",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
    img: bookImg,
  },
   {
    title: "All books are 50% off now!",
    subtitle: "Don't miss such a deal!",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
    img: bookImg,
  },
];

export default function Offer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    import("swiper/swiper-bundle.css");
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 4, md: 3 },
        px: 2,
        backgroundColor: "#F9F9F9",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", borderRadius: "20px", backgroundColor: "#fcebea", p: { xs: 3, md: 5 } }}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".custom-swiper-button-prev",
            nextEl: ".custom-swiper-button-next",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          spaceBetween={50}
          slidesPerView={1}
          loop
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Stack
                direction={{ xs: "column", md: "row"}}
                alignItems="center"
                justifyContent="space-between"
                spacing={{ xs: 3, md: 6 }} sx={{}}
              >
                <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2.5rem" },
                      color: "#463C74",
                      fontWeight: 600,
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "1.1rem", md: "45px" },
                      color: "#463C74",
                      fontWeight: 500,
                      mb: 2,
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "0.95rem", md: "18px" },
                      color: "#393280CC",
                      lineHeight: 1.8,
                      mb: 3,
                    }}
                  >
                    {slide.description}
                  </Typography>
                  {/* Countdown Timer */}
<Box
  sx={{
    display: "flex",
    justifyContent: { xs: "center", md: "flex-start" },
    gap: 4,
    mb: 3,
  }}
>
  <Box sx={{ textAlign: "center" ,fontFamily:'Inter'}}>
    <Typography variant="h5" sx={{ color: "#E74C3C", fontWeight: 500 }}>
      768
    </Typography>
    <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
      DAYS
    </Typography>
  </Box>
  <Box sx={{ textAlign: "center" }}>
    <Typography variant="h5" sx={{ color: "#E74C3C", fontWeight: 500 }}>
      01
    </Typography>
    <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
      HOUR
    </Typography>
  </Box>
  <Box sx={{ textAlign: "center" }}>
    <Typography variant="h5" sx={{ color: "#E74C3C", fontWeight: 500 }}>
      27
    </Typography>
    <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
      MIN
    </Typography>
  </Box>
  <Box sx={{ textAlign: "center" }}>
    <Typography variant="h5" sx={{ color: "#E74C3C", fontWeight: 500 }}>
      55
    </Typography>
    <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
      SEC
    </Typography>
  </Box>
</Box>
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIosIcon />}
                    sx={{
                      border: "2px solid #393280",
                      color: "#393280",
                      px: 3,
                      "&:hover": {
                        borderColor: "#2c255d",
                        backgroundColor: "#f5f5ff",
                      },
                    }}
                  >
                    Read More
                  </Button>
                </Box>

                <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <img
                    src={slide.img}
                    alt="Book Cover"
                    style={{
                      maxWidth: "100%",
                      maxHeight: isMobile ? "200px" : "300px",
                      borderRadius: "16px",
                    }}
                  />
                </Box>
              </Stack>
            </SwiperSlide>
          ))}

         
          <Box
  className="swiper-pagination-custom"
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,

    // Inactive bullets
    "& .swiper-pagination-bullet": {
      width: 30,
      height: 30,
      position: "relative",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&::before": {
        content: '""',
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "#393280",
        transition: "all 0.3s ease",
      },
    },

    // Active bullet with outer circle
    "& .swiper-pagination-bullet-active": {
      border: "2px solid #e74c3c",
      borderRadius: "50%",
      "&::before": {
        backgroundColor: "#e74c3c",
      },
    },
  }}
/>

        </Swiper>
      </Container>
    </Box>
  );
}

 
