// src/components/ProductListingPage.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  IconButton,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import Grid from "@mui/material/GridLegacy";
import { useDispatch } from "react-redux";
import { useCategoryContext } from "../../../../../context/CategoryContext";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../Redux/cartSlice";
import type { AppDispatch } from "../../../../../store";
import { BOOK_URLS, CART_URLS, CATEGORY_URLS } from "../../../../../constant/END-POINT";

interface Product {
  id: string;
  name: string;
  author: string;
  price: number;
  image: string;
  category: string;
}

interface Category {
  _id: string;
  title: string;
  status: string;
}

const fallbackImage = "/book (1).png";

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoriesWithBooks, setCategoriesWithBooks] = useState<Category[]>([]);
  const { selectedCategory, setSelectedCategory } = useCategoryContext();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("az");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter((product) => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const booksResponse = await fetch(BOOK_URLS.GetAllBooks);
      const booksData = await booksResponse.json();

      const categoriesResponse = await fetch(CATEGORY_URLS.GetAllCategories);
      const categoriesData = await categoriesResponse.json();

      const activeCategories = categoriesData.filter((cat: Category) => cat.status === "active");
       
      const mappedProducts: Product[] = (booksData.data || []).map((item: any) => ({
        id: item._id,
        name: item.name,
        author: item.author,
        price: item.price,
        image: item.image,
        category: item.category,
      }));

      setProducts(mappedProducts);
      setFilteredProducts(mappedProducts);

      const bookCategories = new Set(mappedProducts.map((product) => product.category));
      const categoriesWithBooks = activeCategories.filter((cat: Category) =>
        bookCategories.has(cat._id)
      );
      setCategoriesWithBooks(categoriesWithBooks);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      showSnackbar("Failed to fetch data", "error");
    }
  };

  const applyPriceFilter = () => {
    const filtered = products.filter((product) => {
      const price = product.price;
      if (minPrice !== "" && price < minPrice) return false;
      if (maxPrice !== "" && price > maxPrice) return false;
      if (selectedCategory && product.category !== selectedCategory) return false;
      return true;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const applyCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAddToCart = async (product: Product) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      showSnackbar("Please login to add items to the cart.", "error");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(CART_URLS.AddCartItem, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          book: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Error adding item to cart");
      }

      showSnackbar("Item added to cart successfully", "success");
      dispatch(fetchCart(token));
    } catch (error) {
      console.error("Add to cart error:", error);
      showSnackbar("Failed to add item to cart", "error");
    }
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "az":
        return a.name.localeCompare(b.name);
      case "za":
        return b.name.localeCompare(a.name);
      case "low":
        return a.price - b.price;
      case "high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#FFE5E5", py: 3, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2D2C72" }}>
          HOME / PRODUCTS
        </Typography>
      </Box>

      <Box display="flex" p={3}>
        {/* Sidebar */}
        <Box width="20%" pr={2}>
          <Typography variant="h6" gutterBottom>Price</Typography>
          <Box display="flex" gap={1}>
            <TextField
              size="small"
              label="$ Min"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
              fullWidth
            />
            <TextField
              size="small"
              label="$ Max"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
              fullWidth
            />
          </Box>
          <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={applyPriceFilter}>
            Filter
          </Button>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>Categories</Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Button
              variant={!selectedCategory ? "contained" : "outlined"}
              onClick={() => applyCategoryFilter(null)}
              sx={{
                justifyContent: "flex-start",
                backgroundColor: !selectedCategory ? "#ED553B" : "transparent",
                color: !selectedCategory ? "#FFF" : "#2D2C72",
                "&:hover": {
                  backgroundColor: !selectedCategory ? "#D8432D" : "#F5F5F5",
                },
              }}
            >
              All
            </Button>

            {categoriesWithBooks.map((category) => (
              <Button
                key={category._id}
                variant={selectedCategory === category._id ? "contained" : "outlined"}
                onClick={() => applyCategoryFilter(category._id)}
                sx={{
                  justifyContent: "flex-start",
                  backgroundColor: selectedCategory === category._id ? "#ED553B" : "transparent",
                  color: selectedCategory === category._id ? "#FFF" : "#2D2C72",
                  "&:hover": {
                    backgroundColor: selectedCategory === category._id ? "#D8432D" : "#F5F5F5",
                  },
                }}
              >
                {category.title}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Products */}
        <Box width="80%" pl={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortOption}
                label="Sort by"
                onChange={(e) => {
                  setSortOption(e.target.value as string);
                  setCurrentPage(1);
                }}
              >
                <MenuItem value="az">Alphabetically, A-Z</MenuItem>
                <MenuItem value="za">Alphabetically, Z-A</MenuItem>
                <MenuItem value="low">Price: Low to High</MenuItem>
                <MenuItem value="high">Price: High to Low</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="body1">
              Showing {paginatedProducts.length} of {filteredProducts.length} results
            </Typography>

            <FormControl size="small" sx={{ minWidth: 80 }}>
              <InputLabel>Show</InputLabel>
              <Select
                value={itemsPerPage}
                label="Show"
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={1}>
              <IconButton 
                color={viewMode === "grid" ? "primary" : "default"} 
                onClick={() => setViewMode("grid")}
              >
                <ViewModuleIcon />
              </IconButton>
              <IconButton 
                color={viewMode === "list" ? "primary" : "default"} 
                onClick={() => setViewMode("list")}
              >
                <ViewListIcon />
              </IconButton>
            </Stack>
          </Box>

          <Grid container spacing={3}>
            {paginatedProducts.map((product) => (
              <Grid
                key={product.id}
                item
                xs={12}
                sm={viewMode === "grid" ? 4 : 12}
                md={viewMode === "grid" ? 4 : 12}
              >
                <Box
                  sx={{
                    position: "relative",
                    "&:hover .hoverOverlay": {
                      opacity: 1,
                    },
                  }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: viewMode === "list" ? "row" : "column",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.03)",
                        ".add-to-cart-btn": {
                          opacity: 1,
                          pointerEvents: "auto",
                        },
                      },
                      position: "relative",
                      zIndex: 0,
                      height: viewMode === "grid" ? 270 : "auto",
                      width: viewMode === "grid" ? 200 : "auto",
                      maxWidth: {
                        xs: "88%",
                        sm: "88%",
                        md: viewMode === "list" ? "30%" : "unset",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={product.image || fallbackImage}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                      alt={product.name}
                      sx={{
                        width: viewMode === "list" ? 300 : "100%",
                        height: viewMode === "list" ? 400 : "100%",
                        objectFit: "contain",
                      }}
                    />
                    <Box
                      className="add-to-cart-btn"
                      onClick={() => navigate(`/dashboard/book-data/${product.id}`)}
                      sx={{
                        position: "absolute",
                        bottom: 100,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#ED553B",
                        color: "#fff",
                        width: "95%",
                        textAlign: "center",
                        fontWeight: "bold",
                        opacity: 0,
                        pointerEvents: "none",
                        transition: "opacity 0.3s ease",
                        zIndex: 1,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      Details Book
                    </Box>

                    <Box
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        position: "absolute",
                        bottom: 50,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#ED553B",
                        color: "#fff",
                        width: "95%",
                        textAlign: "center",
                        fontWeight: "bold",
                        opacity: 0,
                        pointerEvents: "none",
                        transition: "opacity 0.3s ease",
                        zIndex: 1,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      Add to Cart
                    </Box>
                  </Card>

                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="#2D2C72"
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.author}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="#ED553B"
                        fontWeight={600}
                      >
                        ${product.price?.toFixed(2) || "N/A"}
                      </Typography>
                      <Button variant="outlined" color="primary" sx={{ visibility: "hidden" }}>
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderColor: "#ED553B",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  color: "#2D2C72",
                },
                "& .Mui-selected": {
                  backgroundColor: "#ED553B",
                  color: "#fff",
                  borderColor: "#ED553B",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductListingPage;