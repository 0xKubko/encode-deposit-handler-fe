'use client';

import { useAccount } from "wagmi";
import { useState } from "react";
import { checkAddress } from "../utils/checkAddress";
import { Modal } from "../components/Modal";
import { blockExplorer } from "../const";
import { addressIsManager } from "../functions/BootcampFactory/hasRole";
import { addAdmin } from "../functions/BootcampFactory/addAdmin";

export default function AddAdmin() {
    const account = useAccount();
    const [adminAddress, setAdminAddress] = useState<string>('0x');
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tx, setTx] = useState<`0x${string}` | null>(null);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setAdminAddress(event.currentTarget.value);
        setError(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!checkAddress(adminAddress)) {
            console.log('Invalid address');
            setError('Invalid address');
            return;
        }
        if (account.address) {
            const isManager = await addressIsManager(adminAddress as `0x${string}`);
            
            if(isManager.ok && isManager.value){
                setError("This address is already a manager")
                return;
            } else if (!isManager.ok){
                setError(isManager.error.message)
                return;
            }

            setIsLoading(true);
            addAdmin(adminAddress as `0x${string}`).then(
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
            <button className="btn" onClick={() => setVisible(true)}>Add Admin</button>
            <Modal visible={visible}>
                <h3 className="font-bold text-lg">Add Admin</h3>
                <input
                    type="text"
                    placeholder="Admin Address"
                    className="input input-primary"
                    value={adminAddress}
                    onChange={handleInputChange}
                />
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