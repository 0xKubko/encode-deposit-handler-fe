"use client";

import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useWriteContract } from "wagmi";
import { checkIsPaused } from "@/app/queries/DepositHandler/checkIsPaused";
import { DepositHandlerAbi } from "@/abi/DepositHandler";
import { useIsAdmin } from "@/app/hooks/useIsAdmin";
import Image from "next/image";
import { Address } from "viem";
import { useBootcampDetails } from "@/app/hooks/useBootcampDetails";

export function BootcampDetail() {
  const { address: walletAddress } = useAccount();
  const [emergencyWithdrawWallet, setEmergencyWithdrawWallet] = useState("");
  const [clearedUsers, setClearedUsers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean | Error>(false);
  const { isAdmin } = useIsAdmin();

  const { writeContract, error: writeError } = useWriteContract();
  const params = useSearchParams();
  const address = params.get("address");

  const {bootcamp, isLoading} = useBootcampDetails(address as Address);

  const fetchPausedStatus = async () => {
    if (bootcamp) {
      const pausedStatus = await checkIsPaused(address as Address);
      console.log("pausedStatus", pausedStatus);
      setIsPaused(pausedStatus); // Update pause status
    } else {
      setIsPaused(false);
    }
  };

  useEffect(() => {
    fetchPausedStatus();
  }, [address, walletAddress]);




  if (!address) {
    setError("No address found");
  }
  
  if (!bootcamp){
    return <div>Loading...</div>
  }

  const bootcampName = bootcamp.name;
  let bootcampImgSrc;
  switch (bootcampName){
      case "Advanced Solidity Bootcamp":
          bootcampImgSrc = "/advancedSol.png";
          break;
      case "ZK and Scaling Bootcamp":
          bootcampImgSrc = "/zkScaling.png";
          break;
      case "EVM Bootcamp":
          bootcampImgSrc = "/evm.png";
          break;
      default:
          bootcampImgSrc = "/advancedSol.png";
          break;
  }



  const deposited = false; // Replace with actual logic to check deposit status

  const handleDeposit = () => {
    console.log("Depositing");
    // todo: handle deposit logic + approvals first
  };

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

    console.log("error", writeError);

    return true;
  };

  const handleClearUsers = () => {
    writeContract({
      abi: DepositHandlerAbi,
      address: address as `0x${string}`,
      functionName: "updateStatusBatch",
      args: [clearedUsers as `0x${string}`[], 2], // 2 is the status for cleared = Status.Passed
    });
  };

  return (
    <div className="flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !bootcamp ? (
        <div>No bootcamp found</div>
      ) : (
        <div className="flex flex-row min-w-[1000px] w-[80%] mb-8 justify-between">
          <div className="flex flex-col gap-3 w-[50%]">
            <h1 className="text-3xl font-bold">{bootcampName}</h1>
            <div className="flex items-center border-4 border-rose-900 p-5 rounded-md bg-rose-600 text-white my-3 justify-center">
              Make sure to be accepted, if you are not and deposit, it will be
              lost
            </div>
            <div className="flex flex-row gap-4 items-center justify-between">
              <div className="flex flex-col gap-2">
                <b>Start:</b>
                {/* todo: handle deadline from the contract */}
                <p>{new Date(1732492800 * 1000).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <b>Deadline:</b>
                {/* todo: handle deadline from the contract */}
                <p>{new Date(1732492800 * 1000).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <b>Bootcamp Address:</b> {address}
            </div>
            <div className="flex flex-row items-center justify-between">
              <Button className="w-[49%]" onClick={handleDeposit}>
                Deposit
              </Button>
              {deposited ? (
                <Button className="w-[49%]">Withdraw</Button>
              ) : (
                <Button className="w-[49%]" disabled>
                  Withdraw
                </Button>
              )}
            </div>
            {isAdmin && (
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
                    setClearedUsers(addresses);
                  }}
                />
                <Button onClick={handleClearUsers}>Clear Users</Button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={bootcampImgSrc}
              alt="Bootcamp Image"
              width={676}
              height={466}
              className="mb-5"
            />
          </div>
        </div>
      )}
    </div>
  );
}
