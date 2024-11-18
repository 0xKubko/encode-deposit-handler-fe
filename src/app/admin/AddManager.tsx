'use client';

import { useAccount } from "wagmi";
import { addManager } from "../queries/BootcampFactory/addManager";
import { useState } from "react";
import { checkAddress } from "../utils/checkAddress";
import { Modal } from "../components/Modal";
import { blockExplorer } from "../const";
import { checkIsManager } from "../queries/BootcampFactory/checkRole";

export default function AddManager() {
    const account = useAccount();
    const [managerAddress, setManagerAddress] = useState<string>('0x');
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tx, setTx] = useState<`0x${string}` | null>(null);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setManagerAddress(event.currentTarget.value);
        setError(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!checkAddress(managerAddress)) {
            console.log('Invalid address');
            setError('Invalid address');
            return;
        }
        if (account.address) {
            const isManager = await checkIsManager(managerAddress as `0x${string}`);
            
            if (isManager instanceof Error) {
                setError(isManager.message)
                return;
            }else if(isManager){
                setError("This address is already a manager")
                return;
            }

            setIsLoading(true);
            addManager(managerAddress as `0x${string}`).then(
                result => {
                    if (result instanceof Error) {  
                        setError(result.message);                      
                    } else {
                        setTx(result);
                        setError(null); // Clear error if submission is successful
                    }
                    setIsLoading(false);
                }
            );
        }
    };

    return (
        <div>
            <button className="btn" onClick={() => setVisible(true)}>Add Manager</button>
            <Modal visible={visible}>
                <h3 className="font-bold text-lg">Add Manager</h3>
                <input
                    type="text"
                    placeholder="Manager Address"
                    className="input input-primary"
                    value={managerAddress}
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