import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import BookCard from "./BookCard";
import { fetchBooks } from "../services/bookService";
import { Book } from "../types/Book";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 0) {
        setIsLoading(true);
        setHasSearched(true);
        try {
          const response = await fetchBooks(query);
          setResults(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setHasSearched(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300); // 300ms Debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    if (query) {
      setSearchParams({ query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-center mb-6">
        <Input
          className="w-64 p-2 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Suche..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <Spinner show={true} size="large" className="text-center" />
      )}

      {/* No results message */}
      {!isLoading && hasSearched && results.length === 0 && (
        <p className="text-center">Keine Ergebnisse gefunden</p>
      )}

      {/* Results */}
      {!isLoading && results.length > 0 && (
        <h2 className="text-center text-lg font-semibold mb-4">
          {results.length} Ergebnisse gefunden
        </h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ld:grid-cols-5 gap-2">
        {results.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Search;
