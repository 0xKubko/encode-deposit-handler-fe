'use client';

import { useAccount } from "wagmi";
import AddManager from "./AddManager";
import RemoveManager from "./RemoveManager";
import AddAdmin from "./AddAdmin";

export default function Admin() {
    const account = useAccount();
    if (!account.address) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-4xl font-bold">You are not connected</h1>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-6 justify-center items-center min-h-screen">
        <AddAdmin />
        <AddManager />
        <RemoveManager />
        </div>
    )
}