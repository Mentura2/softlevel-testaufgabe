import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../config/config";

function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Einkaufswagen</h1>
      {items.length === 0 ? (
        <p className="text-grey-600 text-lg text-center">
          Ihr Warenkorb ist leer.
        </p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.isbn}
              className="flex items-center bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              {/* Buchbild mit Link zur Detailseite */}
              <Link to={`/details/${item.isbn}`}>
                <img
                  src={`${IMAGE_BASE_URL}${item.image_name}`}
                  alt={item.title}
                  className="w-24 h-32 object-contain rounded cursor-pointer"
                />
              </Link>

              {/* Buchinformationen */}
              <div className="flex-1 ml-6">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">ISBN: {item.isbn}</p>
                <p className="text-green-600 font-bold mt-2">
                  {(item.price ?? 0).toFixed(2)} €
                </p>
              </div>

              {/* Optionen: Menge anpassen und Löschen */}
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-2">
                  <label htmlFor={`quantity-${item.isbn}`} className="text-sm">
                    Menge:
                  </label>
                  <input
                    id={`quantity-${item.isbn}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.isbn, Number(e.target.value))
                    }
                    className="w-16 border border-gray-300 rounded p-2 text-center"
                  />
                </div>
                <button
                  onClick={() => removeItem(item.isbn)}
                  className="text-red-500 hover:underline"
                >
                  Entfernen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
