import Search from "../components/Search";

function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-white-100">
      <div className="text-center text-gray-600 mt-10">
        <h1 className="text-2xl font-bold">Willkommen in der Buchsuche!</h1>
        <p className="mt-4">
          Geben Sie unten einen Suchbegriff ein, um Bücher zu finden.
        </p>
      </div>
      <Search />
    </div>
  );
}

export default DashboardPage;
