import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Product } from "../types/product";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Container,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

function Products({ onAddToCart }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);

  // get categories from products
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // filter products based on search
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Container>
        <Box
          sx={{
            display: "flex",
            gap: 1.5, // Reduced gap for tighter spacing
            mb: 3,
            mt: 1,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            fullWidth
            size="small" // Smaller size
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 300, // Constrain the width for a smaller appearance
            }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            {" "}
            {/* Reduced minWidth */}
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Container>

      <Typography variant="h4" component="h1" gutterBottom>
        Products Page
        {/* {products.map((product) */}
         {filteredProducts.map((product) => {
          return (
            <Card key={product.id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={product.title}
                height="140"
                image={product.image}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {product.title}
                </Typography>
                <Typography variant="h5" component="div">
                  {product.description}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  adjective
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  /* sx={{palette="primary.dark"}} */ onClick={() =>
                    onAddToCart(product)
                  }
                >
                  Add to cart
                </Button>
                <Button
                  size="small"
                  component={Link}
                  to={`/products/${product.id}`}
                  state={{ product }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Typography>
    </div>
  );
}

export default Products;
