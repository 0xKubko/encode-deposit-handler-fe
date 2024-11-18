"use client";

import { usePathname } from "next/navigation";
import { useIsManager } from "../app/hooks/useIsManager";
import { useIsAdmin } from "../app/hooks/useIsAdmin";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Menu() {
  const { isAdmin } = useIsAdmin();
  const { isManager } = useIsManager();
  const currentPath = usePathname();
  return (
    <div className="flex flex-row w-full h-[100px] justify-between text-center items-center pl-7 pr-7 mb-10 border">
      <h1 className="text-3xl font-bold">
        <Link href="/">Encode Bootcamp Deposits</Link>
      </h1>
      <div className="flex flex-row items-center gap-4 justify-center">
        {(isAdmin || isManager) && (
          <div>
            <Link href="/" className={currentPath === "/" ? "underline" : ""}>
              Home
            </Link>
          </div>
        )}
        {isAdmin && (
          <div>
            <Link
              href="/admin"
              className={currentPath === "/admin" ? "underline" : ""}
            >
              Admin
            </Link>
          </div>
        )}
        {isManager && (
          <div>
            <Link
              href="/manager"
              className={currentPath === "/manager" ? "underline" : ""}
            >
              Manager
            </Link>
          </div>
        )}
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}
