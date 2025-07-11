import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Divider,
  Avatar,
  Link as MuiLink,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";
import {
  Person,
  ShoppingBag,
  FavoriteBorder,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import LockResetIcon from "@mui/icons-material/LockReset";

// Redux + Auth
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, selectCart } from "../Redux/cartSlice"; 
import type { AppDispatch } from "../../../../../store";
import { AuthContext } from "../../../../../context/authContext";

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "HOME", path: "/dashboard/home" },
    { label: "ABOUT US", path: "/dashboard/about" },
  { label: "Contact US", path: "/dashboard/contact" },
  ];

  // Redux + Auth setup
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector(selectCart);
  const authContext = useContext(AuthContext);
  const token = authContext?.userData ? localStorage.getItem("userToken") : null;

  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [token, dispatch]);

  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  const handlePasswordChangeClick = () => {
    navigate("/change-password");
  };

  const handleCartClick = () => {
    navigate("/dashboard/cart");
  };

  return (
    <Box>
      {/* Main Navigation */}
      <Toolbar sx={{ justifyContent: "space-between", px: 3, py: 1.5 }}>
        {/* Logo with Home Link */}
        <MuiLink component={Link} to="/" underline="none">
          <Avatar sx={{ width: 48, height: 48, bgcolor: "grey.400" }} />
        </MuiLink>

        {/* Navigation Links or Hamburger */}
        {isMobile ? (
          <>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  px={2}
                  py={1}
                >
                  <Typography variant="h6">Menu</Typography>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Divider />
                <List>
                  {navLinks.map((link, index) => (
                    <ListItem
                      key={index}
                      component={Link}
                      to={link.path}
                    >
                      <ListItemText primary={link.label} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {navLinks.map((link, index) => (
              <MuiLink
                component={Link}
                to={link.path}
                key={index}
                underline="none"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "medium",
                  color: "text.primary",
                  fontSize: 18,
                  fontFamily: "Inter, sans-serif",
                  '&:hover': {
                    color: "primary.main",
                  },
                }}
              >
                {link.label}
              </MuiLink>
            ))}
          </Stack>
        )}

        {/* Action Icons */}
        {!isMobile && (
          <Stack direction="row" spacing={2}>
            <IconButton onClick={handleProfileClick}>
              <Person />
            </IconButton>

            <IconButton onClick={handleCartClick}>
              <Badge
                badgeContent={cartCount}
                color="error"
                showZero
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.7rem",
                    minWidth: 18,
                    height: 18,
                    top: 6,
                    right: 6,
                  },
                }}
              >
                <ShoppingBag />
              </Badge>
            </IconButton>

            <IconButton onClick={handleWishlistClick}>
              <FavoriteBorder />
            </IconButton>

            <IconButton onClick={handlePasswordChangeClick}>
              <LockResetIcon />
            </IconButton>
          </Stack>
        )}
        {children && <Box ml={2}>{children}</Box>}

      </Toolbar>
    </Box>
  );
};

export default Navbar;