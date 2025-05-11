"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem, getCartItems, updateCartItemQuantity, removeFromCart } from "@/lib/cart";
import { toast } from "sonner";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartModal({ open, onOpenChange }: CartModalProps) {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      loadCartItems();
    }
  }, [open]);

  const loadCartItems = async () => {
    try {
      setIsLoading(true);
      const cartItems = await getCartItems();
      setItems(cartItems);
    } catch (error: any) {
      toast.error(error.message || "Failed to load cart items");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateCartItemQuantity(itemId, newQuantity);
      await loadCartItems();
    } catch (error: any) {
      toast.error(error.message || "Failed to update quantity");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      await loadCartItems();
      toast.success("Item removed from cart");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove item");
    }
  };

  const handleCheckout = () => {
    onOpenChange(false);
    router.push("/checkout");
  };

  const total = items.reduce((sum, item) => {
    return sum + (item.quantity * (item.product?.price || 0));
  }, 0);

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center text-neutral-600">
            Loading cart items...
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (items.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center text-neutral-600">
            Your cart is empty
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-4 border-b border-border/50"
            >
              <div
                className="h-20 w-20 bg-cover bg-center rounded-md"
                style={{ backgroundImage: `url(${item.product?.images[0]})` }}
              />
              <div className="flex-grow">
                <h3 className="font-medium">{item.product?.name}</h3>
                <p className="text-sm text-neutral-600">
                  ${item.product?.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4">
            <div className="text-lg font-semibold">
              Total: ${total.toFixed(2)}
            </div>
            <Button onClick={handleCheckout} className="bg-primary hover:bg-primary/90">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}