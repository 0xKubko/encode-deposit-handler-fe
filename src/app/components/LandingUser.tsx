'use client';

import { useQuery } from "@tanstack/react-query";
import { Bootcamp, fetchBootcamps } from "../queries/BootcampFactory/fetchBootcamps";
import { Card } from "./Card";

export function LandingUser(){
    const bootcamps = useQuery({ queryKey: ['bootcamps'], queryFn: fetchBootcamps });
    
    if(bootcamps.isLoading){
        return <div>Loading...</div>
    }
    if(bootcamps.isError || bootcamps.data?.ok === false){
        return <div>Error: {bootcamps.error?.message || (bootcamps.data?.ok ? 'unknow error' : bootcamps.data?.error.message) }</div>
    }
    return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
  {bootcamps.data && bootcamps.data.ok && bootcamps.data.value.map((bootcamp: Bootcamp) => (
    <Card key={bootcamp.id} title={`${bootcamp.id}`}>
      <div>
        {bootcamp.depositAmount && <div>Deposit amount: {bootcamp.depositAmount.toString()}</div>}
        {bootcamp.depositToken && <div>Deposit token: {bootcamp.depositToken}</div>}
        {bootcamp.bootcampAddress && <div>Bootcamp address: {bootcamp.bootcampAddress}</div>}
      </div>
    </Card>
  ))}
</div>
    )
}