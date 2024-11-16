'use client';

import { useAccount } from "wagmi";
import CreateBootcamp from "./createBootcamp";
import { useIsAdmin, useIsManager } from "../store/selectors";
import Link from "next/link";

export default function Manager() {
    const account = useAccount();
    const isManager = useIsManager();
    const isAdmin = useIsAdmin();

    if (!isManager && !isAdmin) {
        return (
            <div className="flex justify-center items-center">
                <h1 className="text-4xl font-bold">You are not a manager</h1>
            </div>
        )

    } if (!isManager && isAdmin) {
        return (
            <div className="flex justify-center items-center">
                <h1 className="text-4xl font-bold p-3">You are not a manager but you can </h1>
                <Link className="text-4xl font-bold underline" href="/admin"> add yourself as a Manager (as an admin) </Link>
            </div>
        )
    }

    if (!account.address) {
        return (
            <div className="flex flex-col gap-6 justify-center items-center">
                <h1 className="text-4xl font-bold">You are not connected</h1>
            </div>
        )
    }
    return (
        <>

        <div className="flex flex-col gap-6 justify-center items-center">
            <CreateBootcamp />
        </div>
        </>
    )
}