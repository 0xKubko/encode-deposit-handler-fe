"use client";

import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import Image from "next/image";
import { Address } from "viem";
import { useBootcampDetails } from "@/app/hooks/useBootcampDetails";
import { DepositWithdraw } from "./BootcampActions/DepositWithdraw";
import { BootcampManagerActions } from "./BootcampActions/BootcampManagerActions";


export function BootcampDetail() {
  const { address: walletAddress, isConnected } = useAccount();
  const params = useSearchParams();
  const address = params.get("address");
  const { bootcamp, isLoading } = useBootcampDetails(address as Address);

  let bootcampImgSrc;
  switch (bootcamp?.name) {
    case "Advanced Solidity Bootcamp":
      bootcampImgSrc = "/advancedSol.png";
      break;
    case "ZK and Scaling Bootcamp":
      bootcampImgSrc = "/zkScaling.png";
      break;
    case "EVM Bootcamp":
      bootcampImgSrc = "/evm.png";
      break;
    default:
      bootcampImgSrc = "/advancedSol.png";
      break;
  }


  const isBootcampError = bootcamp instanceof Error;
  return (
    <div className="flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      {isLoading ? (<div>Loading...</div>)
        : (bootcamp && !isBootcampError && (
          <div className="flex flex-row min-w-[1000px] w-[80%] mb-8 justify-between">
            <div className="flex flex-col gap-3 w-[50%]">
              <h1 className="text-3xl font-bold">{bootcamp.name}</h1>
              <div className="flex items-center border-4 border-rose-900 p-5 rounded-md bg-rose-600 text-white my-3 justify-center">
                Make sure to be accepted, if you are not and deposit, it will be
                lost
              </div>
              <div className="flex flex-row gap-4 items-center justify-between">
                <div className="flex flex-col gap-2">
                  <b>Start:</b>
                  <p>{bootcamp.bootcampStartTime.toDateString()}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <b>Deadline:</b>
                  <p>{bootcamp.bootcampDeadline.toDateString()}</p>

                </div>
              </div>
              <div className="flex flex-col gap-4">
                <b>Bootcamp Address:</b> {address}
              </div>
              {isConnected && walletAddress && (
                <div>
                  <div className="flex flex-col border-t pt-5 gap-4">
                    <b>Actions:</b>
                    <DepositWithdraw bootcamp={bootcamp} walletAddress={walletAddress} />
                  </div>
                  <BootcampManagerActions bootcamp={bootcamp} walletAddress={walletAddress} />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={bootcampImgSrc}
                alt="Bootcamp Image"
                width={676}
                height={466}
                className="mb-5"
              />
            </div>
          </div>
        ))}
    </div>
  );
}
