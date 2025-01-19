import { CartItem } from "../types/CartItem";
import { Product } from "../types/product";

class Cart {
  private items: CartItem[] = [];

  addItem(product: Product) {
    const existingItem = this.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      console.log(
        `${product.title} quantity increased to ${existingItem.quantity}`
      );
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
      console.log(`${product.title} added to cart`);
    }
  }

  removeItem(id: number) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      this.items = this.items.filter((i) => i.id !== id);
      console.log(`${item.title} removed from cart`);
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  clearCart() {
    this.items = [];
    console.log("Cart cleared");
  }
}

export const cart = new Cart();
//  creates a single instance to use throughout the app
