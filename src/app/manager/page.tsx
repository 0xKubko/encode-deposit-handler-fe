"use client";

import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { useIsManager } from "@/app/hooks/useIsManager";
import { createBootcamp } from "@/app/queries/BootcampFactory/createBootcamp";
import { blockExplorer } from "@/app/const";
import { useQueryClient } from "@tanstack/react-query";

export default function Manager() {
  const { isManager } = useIsManager();
  const [bootcampName, setBootcampName] = useState("");
  const [bootcampDepositAmount, setBootcampDepositAmount] = useState("");
  const [bootcampDepositToken, setBootcampDepositToken] = useState("");
  const [bootcampStartTime, setBootcampStartTime] = useState("");
  const [bootcampDeadline, setBootcampDeadline] = useState("");
  const [withdrawDuration, setWithdrawDuration] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tx, setTx] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleCreateBootcamp = () => {

    if(!bootcampName || !withdrawDuration){
      setError("Please fill out all fields");
      return;
    }

    console.log("Creating Bootcamp:", {
      name: bootcampName,
      deadline: withdrawDuration,
    });

    createBootcamp(
      Number(bootcampDepositAmount),
      bootcampDepositToken,
      Number(bootcampStartTime),
      Number(bootcampDeadline),
      Number(withdrawDuration),
      bootcampName,
      queryClient
    ).then((result) => {
      if (result instanceof Error) {
        console.error("Error creating bootcamp:", result);
        setError(result.message);
        return;
      } else {
        console.log("Bootcamp Created:", result);
        setTx(result);
      }
    });

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
              <span>Bootcamp Start Time (as UNIX Timestamps in seconds):</span>
              <input
                type="number"
                value={bootcampStartTime}
                onChange={(e) => setBootcampStartTime(e.target.value)}
                placeholder="Enter start date in seconds (e.g., 1800000000)"
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span>Bootcamp Ending Date (as UNIX Timestamps in seconds):</span>
              <input
                type="number"
                value={bootcampDeadline}
                onChange={(e) => setBootcampDeadline(e.target.value)}
                placeholder="Enter deadline date (e.g., 1800000000)"
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span>Withdraw Duration(seconds):</span>
              <input
                type="number"
                value={withdrawDuration}
                onChange={(e) => setWithdrawDuration(e.target.value)}
                placeholder="Enter deadline (e.g., 1800000000)"
                className="border rounded px-3 py-2"
              />
            </label>
            <Button
              onClick={handleCreateBootcamp}
              disabled={!bootcampName || !withdrawDuration}
            >
              Create Bootcamp
            </Button>
            {tx !== null && (
              <a href={`${blockExplorer}/tx/${tx}`}>See on the explorer!</a>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
}
