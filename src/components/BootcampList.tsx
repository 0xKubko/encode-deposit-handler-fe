"use client";

import { useBootcampAddresses } from "@/app/hooks/useBootcampAddresses";
import { Bootcamp } from "./Bootcamp";

export const BootcampList = () => {
  const {addresses, isLoading} = useBootcampAddresses();
  const isErrored = addresses instanceof Error;

  return (
    <div className="flex flex-col w-[50%]">
      {isLoading ? (
        <div>Loading...</div>
      ) : !addresses || isErrored ? (
        <div>No bootcamps found</div>
      ) : (
          <div className="flex flex-row gap-2">
            {addresses.map((address, index) => {
              return (
                <div key={index}>
                  <Bootcamp address={address} />
                </div>
              );
            })}
          </div>
      )}
    </div>
  );
};
