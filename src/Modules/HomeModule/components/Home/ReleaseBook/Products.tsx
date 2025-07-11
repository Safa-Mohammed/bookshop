// src/pages/Product.tsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Typography, Box, GlobalStyles, Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchCart } from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { BOOK_URLS, CART_URLS } from "../../../../../constant/END-POINT";

interface Book {
  id: string;
  name: string;
  author: string;
  price: number;
  image?: string;
}

const fallbackImages = [
  "/book (1).png",
  "/book16 1.png",
  "/book4 4.png",
  "/book3 4.png",
];
let shuffledFallbacks: string[] = [];
let fallbackIndex = 0;

const getUniqueFallbackImage = (): string => {
  if (
    shuffledFallbacks.length === 0 ||
    fallbackIndex >= shuffledFallbacks.length
  ) {
    shuffledFallbacks = [...fallbackImages].sort(() => Math.random() - 0.5);
    fallbackIndex = 0;
  }
  return shuffledFallbacks[fallbackIndex++];
};

export default function Product() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(BOOK_URLS.GetAllBooks)
      .then((res) => res.json())
      .then((data) => {
        setBooks(
          (data?.data || []).map((item: any) => ({
            id: item._id,
            name: item.name,
            author: item.author,
            price: item.price,
            image: item.image,
          }))
        );
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAddToCart = async (book: Book) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      showSnackbar("Please login to add items to the cart.", "error");
      return;
    }

    try {
      const response = await fetch(
        CART_URLS.AddCartItem,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            book: book.id,
            quantity: 1,
          }),
        }
      );

      if (response.ok) {
        showSnackbar("Item added to cart successfully", "success");
        dispatch(fetchCart(token) as any);
      } else {
        const result = await response.json();
        throw new Error(result.message || "Error adding item to cart");
      }
    } catch (error: any) {
      showSnackbar(error.message || "Failed to add item to cart", "error");
    }
  };

  return (
    <Box
      sx={{ px: 4, py: 6, backgroundColor: "#fcecec", position: "relative" }}
    >
      <GlobalStyles
        styles={{
          ".swiper": { width: "100%", margin: "0 auto" },
          ".swiper-pagination": {
            position: "relative !important",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "33px",
            zIndex: 10,
            paddingTop: "18px",
            paddingLeft: "1px",
            borderTop: "1px solid rgb(223, 220, 219)",
            borderRadius: "10px",
            paddingBottom: "10px",
          },
          ".swiper-pagination-bullet": {
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "transparent !important",
            border: "none",
            position: "relative",
            opacity: 1,
            cursor: "pointer",
            boxSizing: "border-box",
            transition: "border-color 0.3s ease",
          },
          ".swiper-pagination-bullet::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "10px",
            height: "10px",
            backgroundColor: "gray",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            transition: "background-color 0.3s ease",
            zIndex: 1,
          },
          ".swiper-pagination-bullet-active": {
            border: "1px solid #ED553B",
            backgroundColor: "transparent !important",
          },
          ".swiper-pagination-bullet-active::before": {
            backgroundColor: "#ED553B",
          },
        }}
      />

      <Typography
        variant="h5"
        sx={{
          fontWeight: 200,
          color: "#7A7A7A",
          fontSize: 14,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Some quality items
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          my: 4,
        }}
      >
        <Box sx={{ flex: 1, height: "1px", backgroundColor: "#E0E0E0" }} />
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#393280", whiteSpace: "nowrap" }}
        >
          New Release Books
        </Typography>
        <Box sx={{ flex: 1, height: "1px", backgroundColor: "#E0E0E0" }} />
      </Box>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={15}
        pagination={{ clickable: true }}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {books.slice(0, 4).map((book, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
                  backgroundColor: "#FFFF",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.03)" },
                  "&:hover .hoverOverlay": { opacity: 1 },
                }}
              >
                <Box
                  component="img"
                  src={book.image}
                  alt={book.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = getUniqueFallbackImage();
                  }}
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    boxShadow: 3,
                    paddingY: 2,
                  }}
                />
                <Box
                  className="hoverOverlay"
                  sx={{
                    position: "absolute",
                    right: "4%",
                    bottom: "50%",
                    width: "93%",
                    height: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ED553B",
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    color: "#fff",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/dashboard/book-data/${book.id}`);
                  }}
                >
                  Book Deatails
                </Box>

                <Box
                  className="hoverOverlay"
                  sx={{
                    position: "absolute",
                    right: "4%",
                    bottom: "25%",
                    width: "93%",
                    height: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ED553B",
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    color: "#fff",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddToCart(book)}
                >
                  ADD TO CART
                </Box>
              </Box>

              <Typography
                variant="subtitle1"
                sx={{ mt: 2, fontWeight: 600, color: "#2D2C72" }}
              >
                {book.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#888888" }}
              >
                {book.author}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ mt: 2, fontWeight: 600, color: "#ED553B" }}
              >
                ${book.price}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Typography
          onClick={() => window.open("/dashboard/list-product", "_blank")}
          sx={{
            color: "#2D2C72",
            fontSize: 16,
            fontWeight: 500,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          view All Products
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
