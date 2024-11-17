"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton as RainbowKitConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { checkIsAdmin } from "@/app/queries/checkIsAdmin";

export const ConnectButton = () => {
  const { isConnected, address: walletAddress, chain } = useAccount();
  const [hydrated, setHydrated] = useState(false);
  const [isAdmin, setIsAdmin] = useState<Boolean | Error>(false); // State for admin status

  useEffect(() => {
    setHydrated(true);

    // Check if the connected wallet is an admin
    const fetchAdminStatus = async () => {
      if (walletAddress) {
        const adminStatus = await checkIsAdmin(walletAddress);
        setIsAdmin(adminStatus); // Update admin status
      } else {
        setIsAdmin(false);
      }
    };

    fetchAdminStatus();
  }, [walletAddress]); // Rerun when the wallet address changes

  if (!hydrated) return null;

  if (!isConnected) {
    return <RainbowKitConnectButton />;
  }

  return (
    <div>
      already connected as {walletAddress} on {chain?.name}
      {isAdmin && (
        <Link href="/admin">
          <div className="flex p-4 bg-rose-500 text-white rounded-md">
            Admin Page
          </div>
        </Link>
      )}
    </div>
  );
};
