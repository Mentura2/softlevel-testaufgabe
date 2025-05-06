import { create } from "zustand";
import { CartItem, CartState } from "../types/Book";

export const useCartStore = create<CartState>((set) => ({
  items: JSON.parse(localStorage.getItem("cart") || "[]"),

  // Hinzufügen eines Artikels zum Warenkorb
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.isbn === item.isbn);
      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map((i) =>
          i.isbn === item.isbn
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        updatedItems = [...state.items, item];
      }
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),

  // Aktualisieren der Menge eines Artikels
  updateQuantity: (isbn, quantity) =>
    set((state) => {
      const updatedItems = state.items.map((i) =>
        i.isbn === isbn ? { ...i, quantity } : i
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),

  // Entfernen eines Artikels aus dem Warenkorb
  removeItem: (isbn) =>
    set((state) => {
      const updatedItems = state.items.filter((i) => i.isbn !== isbn);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),

  // Gesamtanzahl der Artikel im Warenkorb berechnen
  getTotalItems: () =>
    JSON.parse(localStorage.getItem("cart") || "[]").reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    ),
}));

// Synchronisierung mit localStorage bei Änderungen in anderen Tabs
window.addEventListener("storage", () => {
  const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  useCartStore.setState({ items: updatedCart });
});
