import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import { CATEGORY_URLS } from "../../../../../constant/END-POINT";

interface Book {
  id: number;
  title: string;
  author: string;
}

export default function CategoriesData() {
  const { categoryId } = useParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      try {
        if (!categoryId) return;
        
        // First, get the category name
        const categoryResponse = await fetch(
          CATEGORY_URLS.GetCategoryById(categoryId)
        );
        const categoryData = await categoryResponse.json();
        setCategoryName(categoryData.name);

        // Then, get books for this category
        const booksResponse = await fetch(
          CATEGORY_URLS.GetCategoryBooks(categoryId)
        );
        const booksData = await booksResponse.json();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching category books:", error);
      }
    };

    fetchCategoryBooks();
  }, [categoryId]);

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {categoryName} Books
        </Typography>
        
        {books.length > 0 ? (
          <Box>
            {books.map((book) => (
              <Box key={book.id} sx={{ mb: 3, p: 2, border: "1px solid #eee" }}>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1">{book.author}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography>No books found in this category</Typography>
        )}
      </Box>
    </Container>
  );
}