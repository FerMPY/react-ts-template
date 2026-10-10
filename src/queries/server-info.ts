import { queryOptions } from "@tanstack/react-query";

import { getServerInfo } from "#/server/server-info";

export const serverInfoQueryOptions = queryOptions({
  queryKey: ["server-info"],
  queryFn: () => getServerInfo(),
});
