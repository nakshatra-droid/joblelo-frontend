import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        to={"/"}
        className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold text-gray-900 hover:bg-yellow-500 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
