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

  // State for the form inputs
  const [bootcampName, setBootcampName] = useState("");
  const [bootcampDeadline, setBootcampDeadline] = useState("");

  const handleCreateBootcamp = () => {
    console.log("Creating Bootcamp:", {
      name: bootcampName,
      deadline: bootcampDeadline,
    });

    // todo: call the contract to create a new bootcamp - using viem
    return true;
  };

  if (!isAdmin) {
    return <>You are not an admin</>;
  }

  return (
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Admin Page</h1>
      <p>
        Here, you can create a new bootcamp. To modify an existing one, go to
        the bootcamp detail page.
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
    </div>
  );
}
