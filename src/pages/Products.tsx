import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Products } from "../types/product";
import { Link } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from "@mui/material";

function Products() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);

  return (
    <Typography variant="h4" component="h1" gutterBottom>
      Products Page
      {products.map((product) => {
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
              <Button size="small" /* sx={{palette="primary.dark"}} */>Add to cart</Button>
              <Button size="small" component={Link}
                to={`/products/${product.id}`}>Learn More</Button>
             
            </CardActions>
          </Card>
        );
      })}
    </Typography>
  );
}

export default Products;
