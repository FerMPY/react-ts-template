import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <div className="rounded-lg bg-gray-800 p-8 shadow-2xl">
        <h1 className="mb-4 text-3xl font-bold text-yellow-400">
          404 - Not Found
        </h1>
        <p className="mb-6 text-gray-300">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
