
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";
import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import bookImg from "../../../../../assets/book (1).png";
import { useEffect } from "react";

const slides = [
  {
    title: "Featured Book",
    auther:'By Timbur Hood',
    nameBook:'Birds gonna be happy',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
    img: bookImg,
    price:'$45.00'
  },
  {
    title: "Ipsum Dolsaszdxor Si",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
    img: bookImg,
  },
  // Add more slides as needed
];

export default function Featuredbook() {
  useEffect(() => {
    import("swiper/swiper-bundle.css");
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "auto"},
         py:4,
       textAlign:'center',
        backgroundImage: "linear-gradient(to right, #FFE5E5, #F5FFFE,#FFFFFF)",
      }}
    >
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
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-around"
              spacing={{ xs: 4, md: 3 }}
              sx={{ px: { xs: 2, md: 12 }, width: "100%" }}
            >
                 <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  paddingY:3,
                }}
              >
                <img
                  src={slide.img}
                  alt="Book Cover"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "500px",
                    height: "auto",
                   }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  p: { xs: 2, md: 4 },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2.5rem" },
                    color: "#393280",
                    fontFamily: "Inter",
                    fontWeight: "600",
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
  variant="h5"
  gutterBottom
  sx={{
    position: "relative",
    fontSize: { xs: "1.5rem", md: "16px" },
    color: "#4D4D4D",
    fontFamily: "Inter",
    fontWeight: 600,
    paddingBottom: 1,
    textTransform: "uppercase", 
    paddingTop:'4px',
    '&::before': {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100px", // adjust as needed
      height: "2px",
      backgroundColor: "#ED553B",
      transform: "translateY(-100%)",
     
    }
  }}
>
 

                  {slide.auther}
                </Typography>
                 <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    fontSize: { xs: "0.9rem", md: "28px" },
                    color: "#393280",
                    fontWeight:'600',
                  }}
                >
                  {slide.nameBook}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: "#7A7A7A",
                    lineHeight: "2",
                    padding:'2',
                  }}
                >
                  {slide.description}
                </Typography>
                
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIosIcon />}
                  size="large"
                  sx={{
                    border: "2px solid #393280",
                    color: "#393280",
                    "&:hover": {
                      borderColor: "#2c255d",
                      backgroundColor: "#f5f5ff",
                      padding:'3'
                      
                    },
                  }}
                >
                  View More
                </Button>
              </Box>
           
            </Stack>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <IconButton
          className="custom-swiper-button-prev"
          sx={{
            ...navButtonStyle,
            left: { xs: 5, md: 10 },
            top: { xs: "45%", md: "50%" },
          }}
          size="small"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <IconButton
          className="custom-swiper-button-next"
          sx={{
            ...navButtonStyle,
            right: { xs: 5, md: 10 },
            top: { xs: "45%", md: "50%" },
          }}
          size="small"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>

        {/* Circle Pagination */}
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
    </Box>
  );
}

const navButtonStyle = {
  position: "absolute",
  transform: "translateY(-50%)",
  zIndex: 10,
  backgroundColor: "white",
  border: "1px solid #eee",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
};


