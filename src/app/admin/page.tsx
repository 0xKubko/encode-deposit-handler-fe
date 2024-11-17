"use client";

import { Button } from "@radix-ui/themes";
import { useAccount, useWriteContract } from "wagmi";
import { useState } from "react";
import { readContract } from "wagmi/actions";
import { config } from "@/app/providers";
import { BootcampFactoryAbi } from "@/abi/BootcampFactory";

export default function Admin() {
  // get the user account address
  const { isConnected, address: walletAddress } = useAccount();
  const {
    data: hash,
    isPending,
    writeContract,
    error: writeError,
  } = useWriteContract();

  // todo: fetch data from the contract

  // todo: check if the user is an admin
  const isAdmin = true;

  const [managerAddress, setManagerAddress] = useState("");

  // todo: fetch this from backend as there is no list on-chain
  const currentManagers = ["0x1234", "0x5678"];

  async function handleAddManager() {
    try {
      const managerRole = await readContract(config, {
        abi: BootcampFactoryAbi,
        address: process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS
          ? (process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS as `0x${string}`)
          : "0x0000000000000000000000000000000000000000",
        functionName: "MANAGER",
        args: [],
      });

      const txn = writeContract({
        abi: BootcampFactoryAbi,
        address: process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS
          ? (process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS as `0x${string}`)
          : "0x0000000000000000000000000000000000000000",
        functionName: "grantRole",
        args: [managerRole, managerAddress as `0x${string}`],
      });
      return txn;
    } catch (error) {
      return error as Error;
    }
  }

  async function handleRemoveManager() {
    try {
      const managerRole = await readContract(config, {
        abi: BootcampFactoryAbi,
        address: process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS
          ? (process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS as `0x${string}`)
          : "0x0000000000000000000000000000000000000000",
        functionName: "MANAGER",
        args: [],
      });

      const txn = writeContract({
        abi: BootcampFactoryAbi,
        address: process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS
          ? (process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS as `0x${string}`)
          : "0x0000000000000000000000000000000000000000",
        functionName: "revokeRole",
        args: [managerRole, managerAddress as `0x${string}`],
      });
      return txn;
    } catch (error) {
      return error as Error;
    }
  }

  if (!isAdmin) {
    return <>You are not an admin</>;
  }

  return (
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Admin Page</h1>
      <p>Here, you can add and remove bootcamp managers.</p>

      <h2>Current Managers</h2>
      {currentManagers.map((manager) => (
        <div key={manager}>{manager}</div>
      ))}

      {/* Input Form for Adding a Manager */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <label className="flex flex-col">
          <span>Manager Address:</span>
          <input
            type="text"
            value={managerAddress}
            onChange={(e) => setManagerAddress(e.target.value)}
            placeholder="Enter manager address"
            className="border rounded px-3 py-2"
          />
        </label>

        <Button onClick={handleAddManager}>Add Manager</Button>
        <Button onClick={handleRemoveManager}>Remove Manager</Button>
      </div>
    </div>
  );
}
