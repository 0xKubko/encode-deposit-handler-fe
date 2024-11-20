"use client";


import { blockExplorer } from "@/app/const";
import { useIsBootcampManager } from "@/app/hooks/useIsBootcampManager";
import { Bootcamp } from "@/app/queries/BootcampFactory/fetchBootcampDetail";
import { checkIsPaused } from "@/app/queries/DepositHandler/checkIsPaused";
import { Status } from "@/app/queries/DepositHandler/DepositTypes";
import { updateStatusBatch } from "@/app/queries/DepositHandler/updateStatusBatch";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Address } from "viem";

interface BootcampManagerActionsProps {
  bootcamp: Bootcamp;
  walletAddress: Address;
}

export function BootcampManagerActions({ bootcamp, walletAddress }: BootcampManagerActionsProps) {

  const { isBootcampManager } = useIsBootcampManager(bootcamp.bootcampAddress);
  const [isPaused, setIsPaused] = useState<boolean | Error>(false);
  const [emergencyWithdrawWallet, setEmergencyWithdrawWallet] = useState("");
  const [clearedUsers, setClearedUsers] = useState<Address[]>([]);
  const [tx, setTx] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetchPausedStatus = async () => {
    if (bootcamp) {
      const pausedStatus = await checkIsPaused(bootcamp.bootcampAddress);
      console.log("pausedStatus", pausedStatus);
      setIsPaused(pausedStatus); // Update pause status
    } else {
      setIsPaused(false);
    }
  };


  useEffect(() => {
    fetchPausedStatus();
  }, [bootcamp.bootcampAddress, walletAddress]);

  const handleTogglePause = async () => {
    const functionName = isPaused ? "unpause" : "pause"; // Toggle between pause and unpause
    console.log(
      `${functionName === "pause" ? "Pausing" : "Unpausing"} the contract...`
    );

    // notice: this wont work because the contract has pause/unpause functions private - need to update the contract first
    // writeContract({
    //   abi: DepositHandlerAbi,
    //   address: bootcamp?.bootcampAddress as `0x${string}`,
    //   functionName: functionName,
    //   args: [],
    // });
    // todo: handle silent ignores when the call reverts
  };

  const handleEmergencyWithdraw = () => {
    // todo: check if the wallet is a manager, not admin

    // notice: this wont work because the contract requires emergencyWithdraw approval first - will change in the contract soon
    // writeContract({
    //   abi: DepositHandlerAbi,
    //   address: bootcamp?.bootcampAddress as `0x${string}`,
    //   functionName: "emergencyWithdraw",
    //   args: [],
    // });

    // todo: add some pending, and success/error handling. maybe some transaction receipt?

    return true;
  };

  const handleClearUsers = async () => {
    const result = await updateStatusBatch(bootcamp.bootcampAddress, clearedUsers, Status.Withdraw);
    console.log("result", result);
    if (result instanceof Error) {
      console.error(result.message);
      setError(result.message);
      return;
    } else {
      setTx(result);
      setClearedUsers([]);
    }


  };


  if (isBootcampManager instanceof Error) {
    console.error(isBootcampManager.message);
    return <div>Error: {isBootcampManager.message}</div>;
  }
  else if (!isBootcampManager) {
    return null
  }
  else {
    return (
      <div className="flex flex-col w-full border-t mt-5 pt-5 gap-3">
        <b>Admin Actions</b>
        {isPaused ? (
          <Button onClick={handleTogglePause}>Unpause</Button>
        ) : (
          <Button onClick={handleTogglePause}>Pause</Button>
        )}
        <div className="w-[100px] border-t"></div>
        <TextField.Root
          value={emergencyWithdrawWallet}
          onChange={(e) => setEmergencyWithdrawWallet(e.target.value)}
          placeholder="Enter wallet address"
          className="w-[50%]"
        />
        <Button onClick={handleEmergencyWithdraw}>
          Emergency Withdraw
        </Button>
        <div className="w-[100px] border-t"></div>
        <TextArea
          placeholder="Enter wallet addresses, separate them by comma"
          value={clearedUsers.join(", ")}
          className="w-full"
          onChange={(e) => {
            const addresses = e.target.value
              .split(",")
              .map((address) => address.trim())
              .filter((address) => address.length > 0);
            setClearedUsers(addresses as Address[]);
          }}
        />
        <Button onClick={handleClearUsers}>Authorize Users for Withdrawal</Button>
        {tx !== null && (
          <a href={`${blockExplorer}/tx/${tx}`}>See transaction on the explorer!</a>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    )
  }
}