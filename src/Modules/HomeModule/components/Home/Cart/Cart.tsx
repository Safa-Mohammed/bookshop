// src/pages/Cart.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  fetchBooks,
  updateCartItem,
  deleteCartItem,
  selectCart,
} from "../Redux/cartSlice";
import type { AppDispatch } from "../../../../../store";
import { useAuthContext } from "../../../../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import PaymentForm from "../Payment/PaymentForm";
import "react-toastify/dist/ReactToastify.css";
import { resetCartState } from "../Redux/cartSlice";

 


const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, booksMap, loading } = useSelector(selectCart);
  const [showPayment, setShowPayment] = useState(false);

 const { isAuthenticated } = useAuthContext();
const token = isAuthenticated ? localStorage.getItem("userToken") : null;
  useEffect(() => {
    if (!token) return;
    dispatch(fetchCart(token));
    dispatch(fetchBooks());
  }, [token]);

  const handleQuantityChange = (bookId: string, newQty: number) => {
    const item = cart.items.find((i) => i.book === bookId);
    const itemId = item?._id;
    const items = cart.items.map((i) =>
      i.book === bookId
        ? { book: i.book, quantity: String(newQty) }
        : { book: i.book, quantity: String(i.quantity) }
    );

    if (newQty <= 0 && itemId) {
      dispatch(deleteCartItem({ token: token!, itemId }));
    } else {
      dispatch(updateCartItem({ token: token!, cartId: cart._id, items }));
    }
  };

const handlePaymentSuccess = () => {
  dispatch(resetCartState());
  setShowPayment(false);
  toast.success("Payment Successful");
};

  const validItems = cart.items.filter(
    (item) => item.book && booksMap[item.book]
  );
  const subtotal = validItems.reduce(
    (sum, item) => sum + booksMap[item.book].price * item.quantity,
    0
  );
  const tax = +(subtotal * 0.045).toFixed(2);
  const totalCost = +(subtotal + tax).toFixed(2);

 if (!isAuthenticated) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <Typography variant="h6" color="error">
                Please login to view your cart
            </Typography>
        </Box>
    );
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (showPayment) {
    return (
      <>
        <ToastContainer />
   
        <Box sx={{ backgroundColor: "#FFE5E5", py: 3, textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#2D2C72" }}
          >  
            HOME / CART / CHECKOUT  
          </Typography>
        </Box>
        <Box p={4}>
          <PaymentForm
            cartId={cart._id}
            totalAmount={totalCost}
            onSuccess={handlePaymentSuccess}
            onBack={() => setShowPayment(false)}
          />
        </Box>
      </>
    );
  }

  return (
    <>
    
      <ToastContainer />
      <Box sx={{ backgroundColor: "#FFE5E5", py: 3, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2D2C72" }}>
          HOME / CART
        </Typography>
      </Box>

      <Box p={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                backgroundImage: "linear-gradient(to right, #F5FFFE, #FFE5E5)",
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="#393280"
                  fontWeight="bold"
                >
                  Your Shopping Cart (
                  {validItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  items)
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                      <TableCell>#</TableCell>
                      <TableCell>Book</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Subtotal</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {validItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography>
                            Your cart is empty. Start shopping!
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      validItems.map((item, idx) => {
                        const book = booksMap[item.book];
                        return (
                          <TableRow key={item._id} hover>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <img
                                  src={
                                    book.image && book.image !== "null"
                                      ? book.image
                                      : "/bookimg.png"
                                  }
                                  alt={book.name}
                                  width={50}
                                  height={70}
                                  loading="lazy"
                                  style={{
                                    marginRight: 16,
                                    borderRadius: 4,
                                    objectFit: "cover",
                                    backgroundColor: "#f5f5f5",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                                  }}
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    if (!target.dataset.fallback) {
                                      target.src = "/bookimg.png";
                                      target.dataset.fallback = "true"; // prevents infinite loop
                                    }
                                  }}
                                />

                                <Box>
                                  <Typography>{book.name}</Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    by {book.author}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <IconButton
                                  onClick={() =>
                                    handleQuantityChange(
                                      book._id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  size="small"
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography mx={1}>{item.quantity}</Typography>
                                <IconButton
                                  onClick={() =>
                                    handleQuantityChange(
                                      book._id,
                                      item.quantity + 1
                                    )
                                  }
                                  size="small"
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              {book.price.toFixed(2)} E£
                            </TableCell>
                            <TableCell align="right">
                              {(book.price * item.quantity).toFixed(2)} E£
                            </TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() =>
                                  handleQuantityChange(book._id, 0)
                                }
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundImage: "linear-gradient(to right, #F5FFFE, #FFE5E5)",
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="#393280"
                  fontWeight="bold"
                >
                  Order Summary
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Subtotal</TableCell>
                      <TableCell align="right">
                        {subtotal.toFixed(2)} E£
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tax (4.5%)</TableCell>
                      <TableCell align="right">{tax.toFixed(2)} E£</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        {totalCost.toFixed(2)} E£
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Button
              variant="contained"
              fullWidth
              size="large"
              endIcon={<ShoppingCartCheckoutIcon />}
              sx={{
                backgroundColor: "#ED553B",
                mt: 3,
                "&:hover": { backgroundColor: "#d1452e" },
              }}
              disabled={validItems.length === 0}
              onClick={() => setShowPayment(true)}
            >
              Proceed to Checkout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Cart;
