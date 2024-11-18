"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bootcamp,
  fetchBootcampDetails,
} from "@/app/queries/BootcampFactory/fetchBootcampDetails";
import Image from "next/image";

export const BootcampList = () => {
  const [bootcamps, setBootcamps] = useState<Bootcamp[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const fetchBootcamps = async () => {
    setLoading(true);
    const data = await fetchBootcampDetails();

    if (data instanceof Error) {
      setError(data.message);
      setBootcamps(null);
    } else {
      setBootcamps(data);
      setError(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBootcamps();
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="flex flex-col w-[50%]">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !bootcamps ? (
        <div>No bootcamps found</div>
      ) : (
        <>
          <div className="flex flex-row gap-2">
            {bootcamps.map((bootcamp, i) => {
              let name;
              let imgSrc;
              if (i === 0) {
                name = "Advanced Solidity Bootcamp";
                imgSrc = "/advancedSol.png";
              } else if (i === 1) {
                name = "ZK and Scaling Bootcamp";
                imgSrc = "/zkScaling.png";
              } else {
                name = "EVM Bootcamp";
                imgSrc = "/evm.png";
              }
              return (
                <div key={i}>
                  <Link href={`bootcamp-detail?id=${bootcamp.id}`}>
                    <div className="flex flex-col p-8 border-4 border-black/60 w-[265px] h-[340px] gap-1 rounded-md">
                      <Image
                        src={imgSrc}
                        alt="Bootcamp Image"
                        width={230}
                        height={158}
                        className="mb-5"
                      />
                      <b>{name}</b>
                      <p>
                        Start:{" "}
                        {new Date(1732492800 * 1000).toLocaleDateString()}
                      </p>
                      <div className="flex bg-blue-500 rounded-full p-2 text-white text-center justify-center items-center mt-2">
                        View More
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
