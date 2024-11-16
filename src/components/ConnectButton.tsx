"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton as RainbowKitConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export const ConnectButton = () => {
  const { isConnected, address: walletAddress, chain } = useAccount();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (!isConnected) {
    return <RainbowKitConnectButton />;
  }

  // todo: fetch this from the contracts
  const isAdmin = true;

  return (
    <div>
      already connected as {walletAddress} on {chain?.name}
      {isAdmin && (
        <>
          <Link href="/admin">
            <div className="flex p-4 bg-rose-500 text-white rounded-md">
              Admin Page
            </div>
          </Link>
        </>
      )}
    </div>
  );
};
