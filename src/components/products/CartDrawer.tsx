import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import type { CartItem } from "@/hooks/useCart";
import type { Currency } from "@/config/appConfig";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  currency: Currency;
  total: number;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onOpenChange, items, currency, total, onUpdateQuantity, onRemove, onClear, onCheckout }: CartDrawerProps) {
  const symbol = currency === "inr" ? "₹" : "$";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Cart ({items.reduce((s, i) => s + i.quantity, 0)})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-4 mt-4">
            {items.map(({ product, quantity }) => {
              const price = currency === "inr" ? product.price.inr : product.price.usd;
              return (
                <div key={product.id} className="flex gap-3 p-3 rounded-xl border border-border bg-card">
                  <img src={product.previewImage} alt={product.name} className="w-20 h-15 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground truncate">{product.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{symbol}{price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="ml-auto w-7 h-7 rounded-md flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-primary whitespace-nowrap">
                    {symbol}{(price * quantity).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-3 mt-4 sm:flex-col">
            <div className="flex items-center justify-between w-full py-3 border-t border-border">
              <span className="text-sm font-medium text-muted-foreground">Total</span>
              <span className="text-xl font-bold text-foreground">{symbol}{total.toLocaleString()}</span>
            </div>
            <Button className="w-full" size="lg" onClick={onCheckout}>
              Checkout
            </Button>
            <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={onClear}>
              Clear cart
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
