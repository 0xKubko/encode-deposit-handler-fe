"use client";

import { Button } from "@radix-ui/themes";
import { useAccount, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";
import { BootcampFactoryAbi } from "@/abi/BootcampFactory";
import { checkIsManager } from "@/app/queries/checkIsManager";

export default function Manager() {
  const { isConnected, address: walletAddress } = useAccount();
  const [hydrated, setHydrated] = useState(false);
  const [isManager, setIsManager] = useState<Boolean | Error>(false);
  const [bootcampName, setBootcampName] = useState("");
  const [bootcampDeadline, setBootcampDeadline] = useState("");
  const {
    data: hash,
    isPending,
    writeContract,
    error: writeError,
  } = useWriteContract();

  // auxillary functions
  const fetchManagerStatus = async () => {
    if (walletAddress) {
      const managerStatus = await checkIsManager(walletAddress);
      setIsManager(managerStatus); // Update manager status
    } else {
      setIsManager(false);
    }
  };

  useEffect(() => {
    fetchManagerStatus();

    setHydrated(true);
  }, [walletAddress]); // Rerun when the wallet address changes

  if (!hydrated) return null;

  const handleCreateBootcamp = () => {
    console.log("Creating Bootcamp:", {
      name: bootcampName,
      deadline: bootcampDeadline,
    });

    const txn = writeContract({
      abi: BootcampFactoryAbi,
      address: process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS
        ? (process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS as `0x${string}`)
        : "0x0000000000000000000000000000000000000000",
      functionName: "createBootcamp",
      args: [
        // todo: pass the correct arguments - just some placeholders for now
        BigInt(100), // depositAmount
        "0x6EEBe75caf9c579B3FBA9030760B84050283b50a", // depositToken
        BigInt(bootcampDeadline), // duration
        BigInt(bootcampDeadline), // deadline
      ],
    });
    console.log("txn", txn);
    console.log("hash", hash);
    console.log("isPending", isPending);
    console.log("writeError", writeError);
    // todo: call the contract to create a new bootcamp - using viem
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Manager Page</h1>
      {!isManager ? (
        <div>You are not a manager</div>
      ) : (
        <>
          <p>
            Here, you can create a new bootcamp. To modify an existing one, go
            to the bootcamp detail page.
          </p>

          {/* Input Form for Creating a Bootcamp */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            <label className="flex flex-col">
              <span>Bootcamp Name:</span>
              <input
                type="text"
                value={bootcampName}
                onChange={(e) => setBootcampName(e.target.value)}
                placeholder="Enter bootcamp name"
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span>Bootcamp Deadline (in seconds since epoch):</span>
              <input
                type="number"
                value={bootcampDeadline}
                onChange={(e) => setBootcampDeadline(e.target.value)}
                placeholder="Enter deadline (e.g., 1800000000)"
                className="border rounded px-3 py-2"
              />
            </label>

            <Button
              onClick={handleCreateBootcamp}
              disabled={!bootcampName || !bootcampDeadline}
            >
              Create Bootcamp
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
