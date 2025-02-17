export function PendingComponent() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <div className="rounded-lg bg-gray-800 p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          {/* Loading spinner */}
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />

          {/* Pulsing text */}
          <h2 className="mb-4 animate-pulse text-2xl font-bold text-blue-400">
            Loading...
          </h2>

          {/* Loading description */}
          <p className="mb-6 text-center text-gray-300">
            Please wait while we fetch your data.
          </p>
        </div>
      </div>
    </div>
  );
}
