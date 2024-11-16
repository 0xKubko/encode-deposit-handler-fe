"use client";

import { Button } from "@radix-ui/themes";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function Admin() {
  // get the user account address
  const { isConnected, address: walletAddress } = useAccount();

  // todo: fetch data from the contract

  // todo: check if the user is an admin
  const isAdmin = true;

  const [managerAddress, setManagerAddress] = useState("");

  // todo: fetch this from the contract
  const currentManagers = ["0x1234", "0x5678"];

  const handleAddManager = () => {
    console.log("Adding Manager");
    // todo: call the contract to add manager
  };

  const handleRemoveManager = () => {
    console.log("Removing Manager");
  };

  if (!isAdmin) {
    return <>You are not an admin</>;
  }

  return (
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Admin Page</h1>
      <p>Here, you can add and remove bootcamp managers.</p>

      <h2>Current Managers</h2>
      {currentManagers.map((manager) => (
        <div>{manager}</div>
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
