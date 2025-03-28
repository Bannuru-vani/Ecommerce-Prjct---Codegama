import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Snackbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const navigateToProductDetails = async (id) => {
    navigate(`/product/${id}`);
  };
  const addProductsTotheCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card
        onClick={() => navigateToProductDetails(product.id)}
        sx={{
          maxWidth: 300,
          m: 2,
          p: 1,
          boxShadow: 3,
          borderRadius: 3,
          cursor: "pointer",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain", p: 2 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {product.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" noWrap>
            {product.description}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Rating
              value={product.rating.rate}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="body2" ml={1}>
              ({product.rating.count})
            </Typography>
          </Box>
          <Typography variant="h6" color="primary" mt={1}>
            ₹ {product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={addProductsTotheCart}
            variant="contained"
            size="small"
            fullWidth
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message="Product added to the Cart"
      />
    </div>
  );
};

export default ProductCard;
