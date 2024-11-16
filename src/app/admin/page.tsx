'use client';

import { useAccount } from "wagmi";
import AddManager from "./AddManager";
import RemoveManager from "./RemoveManager";
import AddAdmin from "./AddAdmin";
import { useIsAdmin } from "../store/selectors";

export default function Admin() {
    const account = useAccount();
    const isAdmin = useIsAdmin();

    if (!isAdmin) {
        return (
            <div className="flex justify-center items-center">
                <h1 className="text-4xl font-bold">You are not an admin</h1>
            </div>
        )
    }

    if (!account.address) {
        return (
            <div className="flex justify-center items-center">
                <h1 className="text-4xl font-bold">You are not connected</h1>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-6 justify-center items-center">
        <AddAdmin />
        <AddManager />
        <RemoveManager />
        </div>
    )
}