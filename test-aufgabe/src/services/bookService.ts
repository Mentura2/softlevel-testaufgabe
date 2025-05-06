import { Book } from "../types/Book";
import { API_BASE_URL } from "../config/config";

// Für die slow funktion einfach ein "-slow" an "/search" anhängen
export async function fetchBooks(query: string): Promise<Book[]> {
  const response = await fetch(`${API_BASE_URL}/search?query=${query}`);
  const data = await response.json();
  return data;
}

// Für die slow funktion einfach ein "-slow" an "/search" anhängen
export async function fetchBookDetails(isbn: string): Promise<Book | null> {
  const response = await fetch(`${API_BASE_URL}/search?query=${isbn}`);
  const data = await response.json();

  return data.length > 0 ? data[0] : null;
}
