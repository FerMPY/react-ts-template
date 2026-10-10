import { Skeleton } from "#/components/ui/skeleton";

export function PendingComponent() {
  return (
    <div
      className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="flex flex-col gap-3">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    </div>
  );
}
