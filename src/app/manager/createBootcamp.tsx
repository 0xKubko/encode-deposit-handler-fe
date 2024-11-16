'use client';

import { useAccount } from "wagmi";
import { useState } from "react";
import { checkAddress } from "../utils/checkAddress";
import { Modal } from "../components/Modal";
import { blockExplorer } from "../const";
import { createBootcamp } from "../functions/BootcampFactory/createBootcamp";

interface Args {
    depositAmount: bigint;
    depositToken: `0x${string}`;
    bootcampStartTime: bigint;
}

export default function CreateBootcamp() {
    const account = useAccount();
    const [args, setArgs] = useState<Args>({depositAmount: BigInt(250), depositToken: '0x', bootcampStartTime: BigInt(0)});
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tx, setTx] = useState<`0x${string}` | null>(null);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        if (name === 'depositToken') {
            setArgs((args) => ({ ...args, [name]: value as `0x${string}` }));
        } else {
            setArgs((args) => ({ ...args, [name]: BigInt(value) }));
        }

        setError(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!checkAddress(args.depositToken)) {
            console.log('Invalid deposit token address');
            setError('Invalid deposit token address');
            return;
        }
        if (account.address) {
            setIsLoading(true);
            
            createBootcamp(args.depositAmount, args.depositToken, args.bootcampStartTime).then(
                result => {
                    if (result.ok) {                        
                        setTx(result.value);
                        setError(null); // Clear error if submission is successful
                    } else {
                        setError(result.error.message);
                    }
                    setIsLoading(false);
                }
            );
        }
    };

    return (
        <div>
            <button className="btn" onClick={() => setVisible(true)}>Create a bootcamp</button>
            <Modal visible={visible}>
                <h3 className="font-bold text-lg">Create a bootcamp</h3>
                <div>
                <h4 className="text-sm">Deposit Amount</h4>
                <input
                    name="depositAmount"
                    type="number"
                    placeholder="Deposit Amount"
                    className="input input-primary"
                    value={args.depositAmount.toString()}
                    onChange={handleInputChange}
                />
                </div>
                <div>
                <h4 className="text-sm">Deposit Token Address</h4>
                <input
                    type="text"
                    name="depositToken"
                    placeholder="Desposit Token Address"
                    className="input input-primary"
                    value={args.depositToken}
                    onChange={handleInputChange}
                />
                </div>
                <div>
                <h4 className="text-sm">Bootcamp Start Time</h4>
                <input
                    name="bootcampStartTime"
                    type="number"
                    placeholder="Bootcamp Start Time"
                    className="input input-primary"
                    value={args.bootcampStartTime.toString()}
                    onChange={handleInputChange}
                />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {isLoading && tx ===null && <span className="loading loading-dots loading-lg"></span>}
                {tx !== null && <a href={`${blockExplorer}/tx/${tx}`}>See on the explorer!</a>}
                <div className="modal-action">
                    {!tx && <button className="btn" onClick={handleSubmit}>Submit</button>}
                    <button className="btn" onClick={() => setVisible(false)}>Close</button>
                </div>
            </Modal>
        </div>
    )
}