'use client';

import { useAccount } from "wagmi";
import CreateBootcamp from "./createBootcamp";

export default function Manager() {
    const account = useAccount();

    if (!account.address) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-4xl font-bold">You are not connected</h1>
            </div>
        )
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <CreateBootcamp />
        </div>
    )
}