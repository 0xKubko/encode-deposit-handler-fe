"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { polygon } from "wagmi/chains";
import { Theme } from "@radix-ui/themes";

export const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Theme>{children}</Theme>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
