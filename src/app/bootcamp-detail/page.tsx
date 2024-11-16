"use client";

import { useSearchParams } from "next/navigation";
import { bootcamps } from "../../placeholderBootcampData";
import { Button } from "@radix-ui/themes";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function BootcampDetail() {
  // get the user account address
  const { isConnected, address: walletAddress } = useAccount();
  const [clearedUsers, setClearedUsers] = useState<string[]>([]);
  const [emergencyWithdrawWallet, setEmergencyWithdrawWallet] = useState("");

  // todo: useSearchParams for handling the id in the url
  const params = useSearchParams();
  const id = params.get("id");
  console.log("id", id);

  // todo: fetch data from the contract

  // todo: check if the contract is paused
  const paused = false;

  // todo: check if the user is an admin
  const isAdmin = true;

  // todo: check if the user has already deposited
  const deposited = false;

  // fetching from the placeholder data for now
  const bootcamp = bootcamps.find((bootcamp) => bootcamp.id === Number(id));

  if (!bootcamp) {
    return <>no bootcamp with this id was found</>;
  }

  const handleTogglePause = () => {
    console.log("Toggling Pause");
    // something like this but queues up on-chain txn paused = !paused;
  };

  const handleEmergencyWithdraw = () => {
    console.log("Emergency Withdraw");
  };

  const handleClearUsers = () => {
    console.log("Clearing Users");
    // todo: use clearedUsers from textarea
  };

  return (
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>
        {bootcamp.name} (# {bootcamp.id})
      </h1>
      <div className="flex items-center border-4 border-rose-900 p-10 rounded-[10] bg-rose-600 text-white">
        Make sure to be accepted, if you are not and deposit, it will be lost
      </div>

      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-col gap-2 items-center">
          <h2>Start:</h2>
          <p>{new Date(bootcamp.start * 1000).toLocaleString()}</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h2>Deadline:</h2>
          <p>{new Date(bootcamp.deadline * 1000).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <h2>Bootcamp Address:</h2>
        <p>{bootcamp.address}</p>
      </div>

      <div className="flex flex-row gap-4 items-center">
        <Button>Deposit</Button>

        {deposited ? (
          <Button>Withdraw</Button>
        ) : (
          <Button disabled>Withdraw</Button>
        )}
      </div>

      {isAdmin && (
        <>
          <h2>Admin Actions</h2>
          {paused ? (
            <Button onClick={handleTogglePause}>Unpause</Button>
          ) : (
            <Button onClick={handleTogglePause}>Pause</Button>
          )}

          <input
            value={emergencyWithdrawWallet}
            onChange={(e) => setEmergencyWithdrawWallet(e.target.value)}
            placeholder="Enter wallet address"
          />
          <Button onClick={handleEmergencyWithdraw}>Emergency Withdraw</Button>

          <input
            type="textarea"
            placeholder="Enter wallet addresses, separate them by comma"
            onChange={(e) => {
              const addresses = e.target.value
                .split(",") // Split the input by commas
                .map((address) => address.trim()) // Trim whitespace from each address
                .filter((address) => address.length > 0); // Remove empty entries
              setClearedUsers(addresses); // Update the state once with the processed array
            }}
          />
          <Button onClick={handleClearUsers}>Clear Users</Button>
        </>
      )}
    </div>
  );
}
