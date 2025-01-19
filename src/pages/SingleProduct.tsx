import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/product";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from "@mui/material";

const SingleProduct = () => {
  const location = useLocation();
  const productId = useParams();
  // Here we retrieve the state from React router dom.
  const [product, setProduct] = useState<Product | undefined>(
    (location.state as { product: Product })?.product
  );
  console.log(product);
  console.log(productId);

  // to cache the data
  // Case is handled if product is not found in the state we call it from the single product api
  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId.id}`
        );
        const data = await response.json();
        setProduct(data);
      };
      fetchProduct();
    }
  }, [product, productId.id]);

  return (
    <div>
      <p>{product?.title}</p>
      <Button size="small" /* sx={{palette="primary.dark"}} */>
        Add to cart
      </Button>
      <Button size="small" component={Link} to={`/products`}>
        Back
      </Button>
    </div>
  );
};

export default SingleProduct;
