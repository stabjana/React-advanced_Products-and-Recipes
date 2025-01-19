import CloseIcon from "@mui/icons-material/Close";
import { CartItem } from "../types/CartItem";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

interface CartProps {
  open?: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
}

export function Cart({ open, onClose, items, onRemoveItem }: CartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {items.map((item) => (
            <ListItem key={item.id} divider sx={{ display: "block", py: 2 }}>
              <ListItemText
                primary={item.title}
                secondary={`Quantity: ${item.quantity}`}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Typography variant="body2">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
                <IconButton onClick={() => onRemoveItem(item.id)} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 2 }}>
          <Divider />
          <Typography variant="h6" sx={{ my: 2 }}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button variant="contained" fullWidth>
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}