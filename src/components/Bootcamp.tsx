"use client";

import { useBootcampDetails } from "@/app/hooks/useBootcampDetails";
import Link from "next/link";
import { Address } from "viem";
import Image from "next/image";

export function Bootcamp({address}: {address: Address}){
    const {bootcamp, isLoading} = useBootcampDetails(address);

    let imgSrc;
    switch (bootcamp?.name){
        case "Advanced Solidity Bootcamp":
            imgSrc = "/advancedSol.png";
            break;
        case "ZK and Scaling Bootcamp":
            imgSrc = "/zkScaling.png";
            break;
        case "EVM Bootcamp":
            imgSrc = "/evm.png";
            break;
        default:
            imgSrc = "/advancedSol.png";
            break;
    }

    if(isLoading || !bootcamp){
        return <div>Loading...</div>
    }
    if(bootcamp instanceof Error){
        return <div>Error: {bootcamp.message}</div>
    }

    return (
        <Link href={`bootcamp-detail?address=${address}`}>
        <div className="flex flex-col p-8 border-4 border-black/60 w-[265px] h-[340px] gap-1 rounded-md">
          <Image
            src={imgSrc}
            alt="Bootcamp Image"
            width={230}
            height={158}
            className="mb-5"
          />
          <b>{bootcamp.name}</b>
          <p>
            Start: {bootcamp.bootcampStartTime.toDateString()}
          </p>
          <div className="flex bg-blue-500 rounded-full p-2 text-white justify-center items-center mt-2">
            View More
          </div>
        </div>
      </Link>
    )
}