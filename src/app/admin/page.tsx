"use client";

import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { blockExplorer } from "../const";
import {
  addManager,
  removeManager,
} from "../queries/BootcampFactory/addManager";

export default function Admin() {
  const { isAdmin } = useIsAdmin();
  const [managerAddress, setManagerAddress] = useState("");
  const [tx, setTx] = useState<`0x${string}` | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddManager = async () => {
    setError(null);
    setTx(null);
    const result = await addManager(managerAddress as `0x${string}`);
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
    <div className="flex flex-col items-center w-[30%] min-w-[500px] justify-center font-[family-name:var(--font-geist-sans)] m-auto">
      <h1 className="text-3xl font-bold mb-5">Admin Page</h1>
      {!isAdmin ? (
        <p>You are not an admin</p>
      ) : (
        <>
          <p>Here, you can add and remove bootcamp managers.</p>

          {/* Input Form for Adding a Manager */}
          <div className="flex flex-col w-[100%] gap-4 mt-4">
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
            <div className="flex flex-row gap-4 justify-between">
              <Button onClick={handleAddManager} className="w-[49%]">
                Add Manager
              </Button>
              <Button onClick={handleRemoveManager} className="w-[49%]">
                Remove Manager
              </Button>
            </div>
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
