"use client";

import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import {
  Bootcamp,
  fetchBootcampDetail,
} from "@/app/queries/fetchBootcampDetail";
import { checkIsAdmin } from "@/app/queries/checkIsAdmin";
import { useWriteContract } from "wagmi";
import { checkIsPaused } from "@/app/queries/checkIsPaused";
import { DepositHandlerAbi } from "@/abi/DepositHandler";

export function BootcampDetail() {
  const { address: walletAddress } = useAccount();
  const [bootcamp, setBootcamp] = useState<Bootcamp | null>(null);
  const [emergencyWithdrawWallet, setEmergencyWithdrawWallet] = useState("");
  const [clearedUsers, setClearedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | Error>(false);
  const [isPaused, setIsPaused] = useState<boolean | Error>(false);

  const { writeContract, error: writeError } = useWriteContract();

  const params = useSearchParams();
  const id = params.get("id");

  // auxillary functions
  const fetchBootcamp = async () => {
    setLoading(true);
    const data = await fetchBootcampDetail(Number(id));

    if (data instanceof Error) {
      setError(data.message);
      setBootcamp(null);
    } else {
      setBootcamp(data);
      setError(null);
    }

    setLoading(false);
  };

  const fetchAdminStatus = async () => {
    if (walletAddress) {
      const adminStatus = await checkIsAdmin(walletAddress);
      setIsAdmin(adminStatus); // Update admin status
    } else {
      setIsAdmin(false);
    }
  };

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
    fetchBootcamp();
    fetchAdminStatus();
    fetchPausedStatus();
  }, [id, walletAddress]);

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
      address: bootcamp?.bootcampAddress as `0x${string}`,
      functionName: "updateStatusBatch",
      args: [clearedUsers as `0x${string}`[], 2], // 2 is the status for cleared = Status.Passed
    });
  };

  return (
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !bootcamp ? (
        <div>No bootcamp found</div>
      ) : (
        <>
          <h1>
            {bootcamp.bootcampAddress} (# {bootcamp.id.toString()})
          </h1>
          <div className="flex items-center border-4 border-rose-900 p-10 rounded-[10] bg-rose-600 text-white">
            Make sure to be accepted, if you are not and deposit, it will be
            lost
          </div>
          <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-col gap-2 items-center">
              <h2>Start:</h2>
              {/* todo: handle start date from the contract */}
              {/* <p>{new Date(bootcamp.start * 1000).toLocaleString()}</p> */}
              todo: based on the start time and deadline
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h2>Deadline:</h2>
              {/* todo: handle deadline from the contract */}
              {/* <p>{new Date(bootcamp.deadline * 1000).toLocaleString()}</p> */}
              todo: based on the start time and deadline
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <h2>Bootcamp Address:</h2>
            <p>{bootcamp.bootcampAddress}</p>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <Button onClick={handleDeposit}>Deposit</Button>
            {deposited ? (
              <Button>Withdraw</Button>
            ) : (
              <Button disabled>Withdraw</Button>
            )}
          </div>
          {isAdmin && (
            <>
              <h2>Admin Actions</h2>
              {isPaused ? (
                <Button onClick={handleTogglePause}>Unpause</Button>
              ) : (
                <Button onClick={handleTogglePause}>Pause</Button>
              )}
              <TextField.Root
                value={emergencyWithdrawWallet}
                onChange={(e) => setEmergencyWithdrawWallet(e.target.value)}
                placeholder="Enter wallet address"
                className="w-[50%]"
              />
              <Button onClick={handleEmergencyWithdraw}>
                Emergency Withdraw
              </Button>
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
            </>
          )}
        </>
      )}
    </div>
  );
}