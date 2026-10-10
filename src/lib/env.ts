/** True in the static SPA build (`pnpm build:spa` / `pnpm dev:spa`), where there is no server. */
export const isSpa = import.meta.env.MODE === "spa";
