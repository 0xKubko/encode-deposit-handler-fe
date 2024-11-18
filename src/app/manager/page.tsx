"use client";

import { Button } from "@radix-ui/themes";
import { useWriteContract } from "wagmi";
import { useState } from "react";
import { BootcampFactoryAbi } from "@/abi/BootcampFactory";
import { useIsManager } from "../hooks/useIsManager";
import { contractFactoryAddress } from "../const";

export default function Manager() {
  const { isManager } = useIsManager();
  const [bootcampName, setBootcampName] = useState("");
  const [bootcampDepositAmount, setBootcampDepositAmount] = useState("");
  const [bootcampDepositToken, setBootcampDepositToken] = useState("");
  const [bootcampDuration, setBootcampDuration] = useState("");
  const [bootcampDeadline, setBootcampDeadline] = useState("");
  const { writeContract } = useWriteContract();

  const handleCreateBootcamp = () => {
    console.log("Creating Bootcamp:", {
      name: bootcampName,
      deadline: bootcampDeadline,
    });

    writeContract({
      abi: BootcampFactoryAbi,
      address: contractFactoryAddress,
      functionName: "createBootcamp",
      args: [
        BigInt(bootcampDepositAmount),
        bootcampDepositToken as `0x${string}`, // 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359 for polygon usdc
        BigInt(bootcampDuration), // 6 weeks is 3628800 seconds
        BigInt(bootcampDeadline), // todo: add handling to this because contract reverts if deadline is in the past? wagmi gives silent error
      ],
    });

    // todo: add some pending, and success/error handling. maybe some transaction receipt?

    return true;
  };

  return (
    <div className="flex flex-col items-center w-[30%] min-w-[500px] justify-center font-[family-name:var(--font-geist-sans)] m-auto">
      <h1 className="text-3xl font-bold mb-5">Manager Page</h1>
      {!isManager ? (
        <div>You are not a manager</div>
      ) : (
        <>
          <p>
            Here, you can create a new bootcamp. To modify an existing one, go
            to the bootcamp detail page.
          </p>

          {/* Input Form for Creating a Bootcamp */}
          <div className="flex flex-col gap-4 w-full mt-4">
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
              <span>Bootcamp Deposit Amount:</span>
              <input
                type="number"
                value={bootcampDepositAmount}
                onChange={(e) => setBootcampDepositAmount(e.target.value)}
                placeholder="Enter deposit amount (e.g., 100)"
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span>Bootcamp Deposit Token:</span>
              <input
                type="text"
                value={bootcampDepositToken}
                onChange={(e) => setBootcampDepositToken(e.target.value)}
                placeholder="Enter deposit token address"
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span>Bootcamp Duration (in seconds):</span>
              <input
                type="number"
                value={bootcampDuration}
                onChange={(e) => setBootcampDuration(e.target.value)}
                placeholder="Enter duration in seconds (e.g., 1800000000)"
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span>Bootcamp Deadline (as a UNIX timestamp):</span>
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
