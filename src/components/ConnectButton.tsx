"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton as RainbowKitConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { checkIsAdmin } from "@/app/queries/checkIsAdmin";
import { checkIsManager } from "@/app/queries/checkIsManager";

export const ConnectButton = () => {
  const { isConnected, address: walletAddress, chain } = useAccount();
  const [hydrated, setHydrated] = useState(false);
  const [isAdmin, setIsAdmin] = useState<Boolean | Error>(false); // State for admin status
  const [isManager, setIsManager] = useState<Boolean | Error>(false); // State for manager status

  // auxillary functions
  const fetchAdminStatus = async () => {
    if (walletAddress) {
      const adminStatus = await checkIsAdmin(walletAddress);
      setIsAdmin(adminStatus); // Update admin status
    } else {
      setIsAdmin(false);
    }
  };

  const fetchManagerStatus = async () => {
    if (walletAddress) {
      const managerStatus = await checkIsManager(walletAddress);
      setIsManager(managerStatus); // Update manager status
    } else {
      setIsManager(false);
    }
  };

  useEffect(() => {
    fetchAdminStatus();
    fetchManagerStatus();

    setHydrated(true);
  }, [walletAddress]); // Rerun when the wallet address changes

  if (!hydrated) return null;

  if (!isConnected) {
    return <RainbowKitConnectButton />;
  }

  return (
    <div>
      already connected as {walletAddress} on {chain?.name}
      <div className="flex flex-row justify-between">
        {isAdmin && (
          <Link href="/admin">
            <div className="flex p-4 bg-rose-500 text-white rounded-md">
              Admin Page
            </div>
          </Link>
        )}
        {isManager && (
          <Link href="/manager">
            <div className="flex p-4 bg-rose-500 text-white rounded-md">
              Manager Page
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
