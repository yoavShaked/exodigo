import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const QueryProvider = React.memo(
  ({ children }: { readonly children: React.ReactElement }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
);
