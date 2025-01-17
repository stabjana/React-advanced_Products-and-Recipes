import { useLocation } from "react-router-dom";
import {Product} from "../types/product";

const SingleProduct = () =>{
    const location = useLocation();
    const product = (location.state as {product:Product})?.product;
    console.log(product);
    return (
        <div>{product.title}</div>
    );
}

export default SingleProduct;