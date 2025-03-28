import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productdetail.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Rating,
  Typography,
} from "@mui/material";
import { addToCart } from "../cartSlice";
import { fetchProducts } from "../productSlice";
function ProductDetail() {
  const { items: products } = useSelector((state) => state.products);
  const params = useParams();
  const dispatch = useDispatch();
  const selectedProductDetails = products.find(
    (item) => item.id === +params.id
  );
  console.log(params, products, selectedProductDetails);
  useEffect(() => {
    //if there are no product fetch from api
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);
  const addProductsTotheCart = () => {
    dispatch(addToCart(selectedProductDetails));
  };
  //Fall back loader until details fetch
  if (!Object.keys(selectedProductDetails || {}).length) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  }
  return (
    <>
      <Box className="individaual-productcontainer" mt={6}>
        <Box>
          <img
            src={selectedProductDetails?.image}
            className="image-individual"
            alt=""
          />
        </Box>
        <Box
          className="product-details"
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: "column",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h4">{selectedProductDetails?.title}</Typography>
          <Typography variant="p" sx={{ textAlign: "left" }}>
            {selectedProductDetails?.description}
          </Typography>
          <Box>
            <Typography variant="h6">
              Price :₹ {selectedProductDetails?.price}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <Rating
              value={selectedProductDetails.rating.rate}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="body2" ml={1}>
              ({selectedProductDetails.rating.count})
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{ width: "200px", marginTop: "20px" }}
            fullWidth
            onClick={addProductsTotheCart}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ProductDetail;
