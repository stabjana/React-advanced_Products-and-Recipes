import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Products from "./pages/Products";
import { Product } from "./types/product";
import SingleProduct from "./pages/SingleProduct";
import { Cart } from "./components/Cart";
import { cart } from "./cart/cart";
import { CartItem } from "./types/CartItem";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Badge
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    cart.addItem(product);

  };
  
  const removeFromCart = (id: number) => {
    cart.removeItem(id);
    setCartItems([...cart.getItems()]);
  };
  
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/recipe/1">
            Recipe
          </Button>
        </Toolbar>
      </AppBar>
      <Cart
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
      />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<Products onAddToCart={addToCart} />}
          />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
