import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
const navigate = useNavigate()
  const navigateToProductDetails = async (id) => {
    navigate(`/product/${id}`);
  };
  const totalAmount = cartItems
    .map((item) => {
      const amount = item.price * item.quantity;
      return amount;
    })
    .reduce((cur, acc) => cur + acc, 0);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <List>
        {cartItems.length === 0 ? (
          <Typography>No items in cart</Typography>
        ) : (
          cartItems.map((item) => (
            <Box>
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  {" "}
                  <img
                  onClick={() => navigateToProductDetails(item.id)}
                    src={item.image}
                    alt=""
                    style={{ width: "60px", marginRight: "20px" }}
                  />
                  <ListItemText
                    primary={item.title}
                    secondary={`₹ ${item.price} x ${item.quantity} = ₹ ${(
                      item.price * item.quantity
                    ).toFixed(2)}`}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  {" "}
                  <Button
                    variant="outlined"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  >
                    +
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                  >
                    -
                  </Button>{" "}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </Button>
                </Box>
              </ListItem>
            </Box>
          ))
        )}
      </List>
      <Divider />
      <Box sx={{ textAlign: "right", mt: 3 }}>
        <Typography variant="h6">Total: ₹ {totalAmount.toFixed(2)}</Typography>
      </Box>
    </Container>
  );
};

export default CartPage;
