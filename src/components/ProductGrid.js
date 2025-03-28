import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  CircularProgress,
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../productSlice";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  const [selectedCategories, setSelectedCategories] = useState([]);
//getting unique categaries
  const categories = [...new Set(products.map((p) => p.category))];

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClear = () => {
    setSelectedCategories([]);
  };
  const capitalizeFirstLetter = (str) => {
    const strtoArray = str.split("");
    return strtoArray[0].toUpperCase() + strtoArray.splice(1).join("");
  };

  const filteredProducts =
    selectedCategories.length === 0
      ? products
      : products.filter((p) => selectedCategories.includes(p.category));

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  }

  if (status === "failed") {
    return <Typography color="error">Failed to load products.</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography textAlign="center" variant="h4" gutterBottom>
        Our Products
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={3}
        justifyContent="center"
      >
        <FormControl component="fieldset" variant="standard">
          <FormGroup row>
            {categories.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                }
                label={capitalizeFirstLetter(cat)}
              />
            ))}
          </FormGroup>
        </FormControl>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClear}
          disabled={!selectedCategories.length}
        >
          Clear Categories
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
