import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, Sparkles, Crown } from "lucide-react";
import { BUNDLE_THRESHOLD, BUNDLE_PER_ITEM_PRICE, STARTER_PRICE, ALL_ACCESS_PRICE, type CartItem } from "@/hooks/useCart";
import type { Currency } from "@/config/appConfig";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  currency: Currency;
  total: number;
  onRemove: (id: string) => void;
  isBundle: boolean;
  isAllAccess: boolean;
  onClear: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onOpenChange, items, currency, total, onRemove, onClear, onCheckout, isBundle, isAllAccess }: CartDrawerProps) {
  const symbol = currency === "inr" ? "₹" : "$";
  const starterPrice = currency === "inr" ? STARTER_PRICE.inr : STARTER_PRICE.usd;
  const bundlePerItem = currency === "inr" ? BUNDLE_PER_ITEM_PRICE.inr : BUNDLE_PER_ITEM_PRICE.usd;
  const allAccessPrice = currency === "inr" ? ALL_ACCESS_PRICE.inr : ALL_ACCESS_PRICE.usd;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
         <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Cart ({items.length} item{items.length !== 1 ? "s" : ""})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-4 mt-4">
           {/* Pricing tier banner */}
            {isAllAccess && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm">
                <Crown className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-foreground">
                  <strong>All Access!</strong> All {items.length} prototypes for {symbol}{allAccessPrice.toLocaleString()}
                </span>
              </div>
            )}
            {isBundle && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20 text-sm">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">
                  <strong>Pro Bundle active!</strong> {items.length} prototypes at just {symbol}{bundlePerItem.toLocaleString()} each
                </span>
              </div>
            )}
            {!isBundle && !isAllAccess && items.length > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-muted border border-border text-sm text-muted-foreground">
                Add {BUNDLE_THRESHOLD - items.length} more to unlock <strong className="text-foreground">Pro Bundle ({symbol}{bundlePerItem.toLocaleString()} per product)</strong>
              </div>
            )}
            {items.map(({ product }) => (
              <div key={product.id} className="flex gap-3 p-3 rounded-xl border border-border bg-card">
                <img src={product.previewImage} alt={product.name} className="w-20 h-15 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{product.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isAllAccess ? (
                      <span className="text-amber-600 font-medium">All Access</span>
                    ) : isBundle ? (
                      <span className="text-primary font-medium">Included in bundle</span>
                    ) : (
                      <>{symbol}{starterPrice.toLocaleString()}</>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(product.id)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors self-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
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
