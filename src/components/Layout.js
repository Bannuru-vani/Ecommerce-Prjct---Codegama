import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const navigate = useNavigate();
  const goToCartPage = () => {
    navigate("/cart");
  };
  return (
    <AppBar style={{ position: "fixed", zIndex: "10" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          style={{ color: "white", textDecoration: "none", fontSize: "22px" }}
          to="/"
        >
     
          Ecommerce
        </Link>

        <IconButton color="inherit" onClick={goToCartPage}>
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "white", p: 2, mt: "auto" }}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} My Website. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box component="main" flexGrow={1} p={2} mt={4}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
