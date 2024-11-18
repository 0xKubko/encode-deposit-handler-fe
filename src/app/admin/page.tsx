"use client";

import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { blockExplorer } from "../const";
import { addManager, removeManager } from "../queries/BootcampFactory/addManager";

export default function Admin() {
  const {isAdmin} = useIsAdmin();
  const [managerAddress, setManagerAddress] = useState("");
  const [tx, setTx] = useState<`0x${string}` | null>(null);
  const [error, setError] = useState<string | null>(null);

  // todo: fetch this from backend as there is no list on-chain
  const currentManagers = ["0x1234", "0x5678"];

  const handleAddManager = async () => {
    setError(null);
    setTx(null);
    const result = await addManager(managerAddress as `0x${string}`)
    if (result instanceof Error) {
      console.error(result);
      setError(result.message);
    } else {
      setTx(result);
    }
  };

  const handleRemoveManager = async () => {
    setError(null);
    setTx(null);
    const result = await removeManager(managerAddress as `0x${string}`);
    if (result instanceof Error) {
      console.error(result);
      setError(result.message);
    } else {
      setTx(result);
    }
  };

  return (
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Admin Page</h1>
      {!isAdmin ? (
        <p>You are not an admin</p>
      ) : (
        <>
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
            {tx !== null && <a href={`${blockExplorer}/tx/${tx}`}>See on the explorer!</a>}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
}
