// src/pages/BookDetailsPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { BOOK_URLS } from "../../../../../constant/END-POINT";

/* ---------- Types & constants ---------- */
interface Book {
  id: string;
  name: string;
  author: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const fallbackImage = "/book (1).png";

/* ---------- Component ---------- */
export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setErrorMsg("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          BOOK_URLS.GetBookById(id!),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          throw new Error("Book not found or access denied.");
        }

        const data = await res.json();

        if (!data || !data._id) {
          throw new Error("Book data is missing.");
        }

        setBook({
          id: data._id,
          name: data.name,
          author: data.author,
          price: data.price,
          image: data.image,
          category: data.category?.title || "Unknown",
          description: data.description,
        });
      } catch (err: any) {
        console.error("Book fetch error:", err);
        setErrorMsg(err.message || "Failed to fetch book");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorMsg || !book) {
    return (
      <Box textAlign="center" mt={6}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg || "Book not found"}
        </Alert>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "linear-gradient(135deg, #FFE5E5, #F5FFFE)",
        py: 4,
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          boxShadow: 4,
          p: 3,
        }}
      >
        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          alignItems="center"
        >
          {/* Image on the left */}
          <Box flexShrink={0}>
            <img
              src={book.image || fallbackImage}
              onError={(e) => (e.currentTarget.src = fallbackImage)}
              alt={book.name}
              style={{
                width: 220,
                height: 320,
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          </Box>

          {/* Text on the right */}
          <CardContent sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              mb={2}
              color="#2D2C72"
              textAlign={{ xs: "center", md: "left" }}
            >
              {book.name}
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Author:</strong> {book.author}
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Price:</strong> ${book.price.toFixed(2)}
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Category:</strong> {book.category}
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong> {book.description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}