import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Typography, Box, IconButton, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Swiper as SwiperType } from "swiper";
import axios from "axios";
import { useCategoryContext } from "../../../../../context/CategoryContext";
import { useNavigate } from "react-router-dom";
import { CATEGORY_URLS } from "../../../../../constant/END-POINT";

interface Category {
  _id: string;
  title: string;
  status: string;
  books: Array<{
    _id: string;
    image?: string;
  }>;
}

export default function Categories() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedCategory } = useCategoryContext();
  const navigate = useNavigate();

  const fallbackImages = [
    "/Engineering Books.png",
    "/Management Books.png",
    "/Higher Education.png",
    "/cate5.jpg",
    "/cate4.jpg",
    "/category5.jpg",
  ];
  const [lastUsedFallbackIndex, setLastUsedFallbackIndex] = useState<number | null>(null);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    
    // Get a random index different from the last used one
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * fallbackImages.length);
    } while (fallbackImages.length > 1 && randomIndex === lastUsedFallbackIndex);
    
    // Update the last used index
    setLastUsedFallbackIndex(randomIndex);
    
    // Set the src to the randomly selected fallback image
    target.src = fallbackImages[randomIndex];
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(CATEGORY_URLS.GetAllCategories);
        const filteredCategories = response.data.filter(
          (category) => 
            category.status === "active" && 
            category.books && 
            category.books.length > 0
        );
        setCategories(filteredCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate("/dashboard/list-product");
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography
        variant="h5"
        sx={{
          position: "relative",
          pl: 8,
          fontWeight: 200,
          color: "#ED553B",
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "50%",
            width: "50px",
            height: "3px",
            backgroundColor: "#ED553B",
          },
        }}
      >
        Categories
      </Typography>

      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#393280",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Explore our Top Categories
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => swiperInstance?.slidePrev()}
            sx={{
              transition: "transform 0.2s ease",
              "&:hover": { backgroundColor: "#ED553B" },
              backgroundColor: "#FFFFFF",
              border: "1px solid #8C8C8C",
            }}
          >
            <ArrowBackIos sx={{ color: "#8C8C8C" }} />
          </IconButton>
          <IconButton
            onClick={() => swiperInstance?.slideNext()}
            sx={{
              transition: "transform 0.2s ease",
              "&:hover": { backgroundColor: "#ED553B" },
              backgroundColor: "#FFFFFF",
              border: "1px solid #8C8C8C",
            }}
          >
            <ArrowForwardIos sx={{ color: "#8C8C8C" }} />
          </IconButton>
        </Box>
      </Box>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 1,
                cursor: "pointer",
              }}
              onClick={() => handleCategoryClick(category._id)}
            >
              <Box
                component="img"
                src={category.books[0]?.image || "/bookimg.png"}
                alt={category.title}
                onError={handleImageError}
                sx={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 2,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  mt: 2,
                  fontWeight: 600,
                  color: "#2D2C72",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {category.title}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "transparent",
          padding: 2,
        }}
      >
        <Button
          sx={{
            border: "1px solid #393280",
            backgroundColor: "transparent",
            color: "#393280",
            fontWeight: 600,
            padding: "8px 16px",
            "&:hover": {
              backgroundColor: "#393280",
              color: "#fff",
            },
          }}
          onClick={() => {window.scrollTo(100, 0);navigate("/products")}}
        >
          VIEW MORE
        </Button>
      </Box>
    </Box>
  );
}