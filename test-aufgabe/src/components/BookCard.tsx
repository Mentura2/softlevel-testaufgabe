import { Book } from "../types/Book";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/utils";
import { IMAGE_BASE_URL } from "../config/config";

type Props = {
  book: Book;
};

function BookCard({ book }: Props) {
  const formattedPrice = book.price ? formatPrice(book.price) : null;
  return (
    <Link
      to={`/details/${book.isbn}`}
      className="border rounded-md p-2 shadow hover:shadow-lg transition block bg-white w-44"
    >
      <img
        src={
          book.image_name
            ? `${IMAGE_BASE_URL}${book.image_name}`
            : "placeholder.jpg"
        }
        alt={book.title}
        className="w-full h-50 object-cover mb-2 rounded"
      />
      <h2 className="text-sm font-semibold truncate">
        {book.title || "Kein Titel verfügbar"}
      </h2>
      <p className="text-xs text-gray-600 truncate">
        {book.author || "Unbekannter Autor"}
      </p>
      <p className="text-sm font-bold mt-1">
        {formattedPrice ? `${formattedPrice}` : "Preis nicht verfügbar"}
      </p>
    </Link>
  );
}

export default BookCard;
