"use client";

import { useBootcampAddresses } from "@/app/hooks/useBootcampAddresses";
import { Bootcamp } from "./Bootcamp";

export const BootcampList = () => {
  const {addresses, isLoading} = useBootcampAddresses();

  if (addresses instanceof Error) {
    return (
      <div>
        <p>Error: {addresses.message}</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col w-[50%]">
      {isLoading ? (
        <div>Loading...</div>
      ) : !addresses ? (
        <div>No bootcamps found</div>
      ) : (
        <>
          <div className="flex flex-row gap-2">
            {addresses.map((address, index) => {
              return (
                <div key={index}>
                  <Bootcamp address={address} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
