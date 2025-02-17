import { Link } from "@tanstack/react-router";

export function ErrorDisplay({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <div className="rounded-lg bg-gray-800 p-8 shadow-2xl">
        <h1 className="mb-4 text-3xl font-bold text-red-400">Oops!</h1>
        <p className="text-gray-300">An unexpected error occurred:</p>
        <pre className="mt-4 rounded-md bg-gray-700 p-4 font-mono text-sm text-red-300">
          {error?.message || "Unknown error"}
        </pre>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => reset()}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="rounded bg-gray-600 px-4 py-2 font-bold text-gray-200 transition-colors hover:bg-gray-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
