"use client";

import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { Address, formatUnits } from "viem";
import { ConfirmDeposit } from "./ConfirmDeposit";
import { useDeposit } from "@/app/hooks/useDeposited";
import { deposit } from "@/app/queries/DepositHandler/deposit";
import { allowAmount } from "@/app/queries/ERC20/allowAmount";
import { useAllowance } from "@/app/hooks/useAllowance";
import { Bootcamp } from "@/app/queries/BootcampFactory/fetchBootcampDetail";
import { blockExplorer } from "@/app/const";
import { useDecimals } from "@/app/hooks/useDecimals";
import { withdraw } from "@/app/queries/DepositHandler/withdraw";
import { Status } from "@/app/queries/DepositHandler/DepositTypes";
import { donate } from "@/app/queries/DepositHandler/donate";
import { ConfirmDonate } from "./ConfirmDonate";

interface DepositProps {
  bootcamp: Bootcamp;
  walletAddress: Address;
}

export function DepositWithdraw({ bootcamp, walletAddress }: DepositProps) {
  const [error, setError] = useState<string | null>(null);
  const [tx, setTx] = useState<`0x${string}` | null>(null);

  const { allowance, refetchAllowance } = useAllowance(bootcamp.bootcampAddress, walletAddress, bootcamp.depositToken);
  const { isDeposited, deposit: _deposit, refetchDepositing, isDepositedLoading } = useDeposit(walletAddress, bootcamp.bootcampAddress);
  const decimals = useDecimals(bootcamp.depositToken);

  if (decimals instanceof Error) {
    console.error(decimals.message);
    return <div>Error: {decimals.message}</div>;
  }

  if (_deposit instanceof Error) {
    console.error(_deposit.message);
    return <div>Error: {_deposit.message}</div>
  }
  

  const handleApprove = async () => {
    const result = await allowAmount(bootcamp.bootcampAddress, bootcamp.depositAmount, bootcamp.depositToken);
    if (result instanceof Error) {
      setError(result.message);
      return;
    }
    setTx(result);
    refetchAllowance();
  }

  const handleDeposit = async () => {
    console.log("handleDeposit");
    
    const result = await deposit(bootcamp.bootcampAddress, bootcamp.depositAmount, walletAddress);
    console.log("result", result);
    
    if (result instanceof Error) {
      setError(result.message);
      return;
    }
    setTx(result);
    refetchDepositing();
  };

  const handleWithdrawal = async () => {
    const result = await withdraw(bootcamp.bootcampAddress, bootcamp.depositAmount, walletAddress);
    console.log("result", result);
    
    if (result instanceof Error) {
      setError(result.message);
      return;
    }
    setTx(result);
  };

  const handleDonate = async () => {
    const result = await donate(bootcamp.bootcampAddress);
    console.log("result", result);
    
    if (result instanceof Error) {
      setError(result.message);
      return;
    }
    setTx(result);
  };


  const deposited = isDeposited || isDepositedLoading;
  const depositAmount = decimals ? formatUnits(bootcamp.depositAmount,decimals) : '';
  const deadlinePassed = (new Date()).getSeconds() > bootcamp.bootcampDeadline.getSeconds() + bootcamp.withdrawDuration;
  const withdrawEnabled = !deadlinePassed && isDeposited && _deposit?.status === Status.Withdraw && !_deposit?.depositDonation;
  const passed = _deposit?.status === Status.Passed;

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        {!deposited && Number(allowance) < bootcamp.depositAmount ? <Button className="w-[49%]" color="blue" onClick={handleApprove}>Approve {depositAmount}</Button> :
          (<ConfirmDeposit onConfirm={handleDeposit}  >
            <Button className="w-[49%]" color="blue" disabled={deposited}> Deposit {depositAmount}</Button>
          </ConfirmDeposit>)
        }
        <Button className="w-[49%]" disabled={!withdrawEnabled} onClick={handleWithdrawal}>Withdraw</Button>
      </div>
      {isDeposited && <div className="flex flex-row items-center justify-between">
        <p>Want to donate your deposit ?</p>
        <ConfirmDonate onConfirm={handleDonate} >
          <Button className="w-[49%]" color="blue" disabled={passed || _deposit?.depositDonation}>Donate</Button>
        </ConfirmDonate>
      </div>}

      {tx !== null && (
              <a href={`${blockExplorer}/tx/${tx}`}>See transaction on the explorer!</a>
            )}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
