"use client";

import { useAccount } from "wagmi";
import { useIsAdmin } from "./hooks/useIsAdmin";
import { useIsManager } from "./hooks/useIsManager";
import { BootcampList } from "@/components/BootcampList";
import Link from "next/link";

export default function Home() {
  const account = useAccount();
  const { isAdmin } = useIsAdmin();
  const { isManager } = useIsManager();

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      {(account.isConnected || isAdmin || isManager) && (
        <>
          <div className="flex flex-row gap-3 w-[50%] pb-8 border-b justify-center">
            {isAdmin && (
              <Link href="/admin">
                <div className="flex p-4 bg-blue-500 text-white rounded-md">
                  Admin Page
                </div>
              </Link>
            )}
            {isManager && (
              <Link href="/manager">
                <div className="flex p-4 bg-blue-500 text-white rounded-md">
                  Manager Page
                </div>
              </Link>
            )}
          </div>
        </>
      )}
      <BootcampList />
    </div>
  );
}
