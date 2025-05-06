import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { useCartStore } from "../store/cartStore";

function Header() {
  const { getTotalItems } = useCartStore();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBook} className="text-2xl mr-5" />
        <h1 className="text-xl font-bold">Buchladen</h1>
      </div>
      <nav>
        <ul
          className="flex space-x-4 items-center"
          style={{ marginRight: "40px" }}
        >
          <li>
            <Link to="/">Startseite</Link>
          </li>
          <li className="relative">
            <Link to="/cart" className="flex items-center">
              <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
              {/* Zeige die Anzahl der Artikel im Warenkorb */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
