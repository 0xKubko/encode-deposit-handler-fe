"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bootcamp,
  fetchBootcampDetails,
} from "@/app/queries/fetchBootcampDetails";

export const BootcampList = () => {
  const [bootcamps, setBootcamps] = useState<Bootcamp[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

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
          <h3>all bootcamps:</h3>
          <div className="flex flex-col gap-2 justify-between">
            {bootcamps.map((bootcamp) => {
              return (
                <div key={bootcamp.id}>
                  <Link href={`bootcamp-detail?id=${bootcamp.id}`}>
                    <div className="flex p-8 border-4 border-black/60">
                      {bootcamp.id} - {bootcamp.bootcampAddress}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <h3>currently running bootcamps:</h3>
          todo: based on the start time and deadline
          <h3>finished bootcamps:</h3>
          todo: based on the start time and deadline
        </>
      )}
    </div>
  );
};
