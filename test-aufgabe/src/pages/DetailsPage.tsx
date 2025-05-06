import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "../components/ui/spinner";
import { formatPrice } from "../utils/utils";
import { Book } from "../types/Book";
import { fetchBookDetails } from "../services/bookService";
import { useCartStore } from "../store/cartStore"; // Importiere den Warenkorb-Store
import { toast } from "react-toastify"; // Toast-Benachrichtigungen
import { IMAGE_BASE_URL } from "../config/config"; // Importiere die Konfiguration für den Bild-URL
import "react-toastify/dist/ReactToastify.css";

function DetailsPage() {
  const { isbn } = useParams<{ isbn: string }>(); // ISBN aus der URL
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1); // Zustand für die Menge
  const { addItem } = useCartStore(); // Zugriff auf den Warenkorb-Store

  useEffect(() => {
    const fetchData = async () => {
      if (!isbn) {
        console.error("ISBN is undefined");
        return;
      }
      try {
        const bookData = await fetchBookDetails(isbn);
        setBook(bookData);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchData();
  }, [isbn]);

  if (!book) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ paddingBottom: "20vh" }}
      >
        <Spinner show={true} size="large" className="text-center" />
      </div>
    );
  }

  const formattedPrice = book.price ? formatPrice(book.price) : null;

  const handleGenreClick = (genre: string) => {
    navigate(`/?query=${encodeURIComponent(genre)}`);
  };

  const handleAddToCart = () => {
    if (quantity < 1) {
      toast.error("Bitte eine gültige Menge auswählen.");
      return;
    }

    addItem({
      isbn: book.isbn,
      title: book.title || "Kein Titel verfügbar",
      price: book.price || 0,
      image_name: book.image_name || "placeholder.jpg",
      quantity,
    });

    toast.success(`${book.title} wurde erfolgreich zum Warenkorb hinzugefügt!`);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{ paddingBottom: "20vh" }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full border border-gray-200">
        <button
          onClick={() => window.history.back()}
          className="text-blue-500 underline mb-4 cursor-pointer"
        >
          Zurück zur Suche
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Buchbild */}
          <img
            src={
              book.image_name
                ? `${IMAGE_BASE_URL}${book.image_name}`
                : "placeholder.jpg"
            }
            alt={book.title}
            className="w-64 h-auto object-contain rounded"
          />

          {/* Buchinformationen */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="text-lg text-gray-700 mb-4">
              {book.author || "Unknown author"}
            </p>
            <p className="text-2xl font-semibold text-green-600 mb-4">
              {formattedPrice ? `${formattedPrice}` : "Preis nicht verfügbar"}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              <button
                onClick={() => handleGenreClick(book.category || "")}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                {book.category || "Keine Kategorie verfügbar"}
              </button>
            </p>

            {/* Menge auswählen */}
            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="quantity" className="text-sm font-medium">
                Menge:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border border-gray-300 rounded p-2 text-center"
              />
            </div>

            {/* Button zum Hinzufügen in den Warenkorb */}
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 cursor-pointer"
            >
              Zum Warenkorb hinzufügen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
