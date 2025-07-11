import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ORDER_URLS } from "../../../../../constant/END-POINT";

interface PaymentFormProps {
  cartId: string;
  totalAmount: number;
  onSuccess: () => void;
  onBack: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  cartId,
  totalAmount,
  onSuccess,
  onBack,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [country, setCountry] = useState("Egypt");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState<number | "">("");
  const [floor, setFloor] = useState<number | "">("");
  const [appartment, setAppartment] = useState<number | "">("");
  const [mobile, setMobile] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const token = localStorage.getItem("userToken");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !cartId) {
      toast.warn("Payment error: missing data");
      return;
    }

    // Validate required address fields
    if (
      !country.trim() ||
      !city.trim() ||
      !state.trim() ||
      !street.trim() ||
      building === "" ||
      floor === "" ||
      appartment === "" ||
      !mobile.trim()
    ) {
      toast.error("Please fill all required address fields.");
      return;
    }

    setIsProcessing(true);
    try {
      // For testing: using Stripe test token "tok_visa"
      const stripeToken = { id: "tok_visa" };

      const delivery_address = {
        country,
        city,
        state,
        street,
        building: Number(building),
        floor: Number(floor),
        appartment: Number(appartment),
        mobile,
        additional_info: additionalInfo,
        location: {
          type: "Point",
          coordinates: [30.0444, 31.2357],
        },
      };

      const response = await fetch(
        ORDER_URLS.CreateOrder(cartId),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: stripeToken.id,
            delivery_address,
          }),
        }
      );

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Order creation failed");
      }
      
      navigate("/dashboard/confirm");
      window.scrollTo(0, 0);
      toast.success("Payment successful!");
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Card
        sx={{
          backgroundImage: "linear-gradient(to right, #F5FFFE, #FFE5E5)",
          boxShadow: 3,
          mb: 3,
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
          <Typography variant="h6" gutterBottom>
            Total Amount: {totalAmount.toFixed(2)} E£
          </Typography>
        </CardContent>
      </Card>

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
            Payment & Shipping
          </Typography>

          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom>
              Payment Method
            </Typography>
            <Box p={2} border="1px solid #ccc" borderRadius={2} mb={2}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Shipping Address
            </Typography>
            <TextField
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="State/Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Street Address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <Box display="flex" gap={2}>
              <TextField
                label="Building No."
                type="number"
                value={building}
                onChange={(e) =>
                  setBuilding(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Floor"
                type="number"
                value={floor}
                onChange={(e) =>
                  setFloor(e.target.value === "" ? "" : Number(e.target.value))
                }
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Apartment"
                type="number"
                value={appartment}
                onChange={(e) =>
                  setAppartment(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
            </Box>
            <TextField
              label="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Additional Information"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={2}
            />
          </Box>
        </CardContent>
      </Card>

      <Box display="flex" gap={2} mt={3}>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={onBack}
          sx={{
            py: 1.5,
            borderRadius: 1,
            height: 56,
          }}
        >
          Back to Cart
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          endIcon={
            isProcessing ? <CircularProgress size={20} color="inherit" /> : null
          }
          sx={{
            backgroundColor: "#ED553B",
            "&:hover": { backgroundColor: "#d1452e" },
            py: 1.5,
            borderRadius: 1,
            height: 56,
          }}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Complete Order"}
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentForm;