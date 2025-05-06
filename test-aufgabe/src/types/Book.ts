export type Book = {
  isbn: string;
  image_name?: string;
  image_url?: string;
  title?: string;
  author?: string;
  price: number;
  pages?: string;
  category?: string;
};

export interface CartItem extends Book {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (isbn: string, quantity: number) => void;
  removeItem: (isbn: string) => void;
  getTotalItems: () => number;
}
