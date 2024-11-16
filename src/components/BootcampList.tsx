import Link from "next/link";
import { bootcamps } from "@/placeholderBootcampData";

export const BootcampList = () => {
  // todo: fetch bootcamps from the factory contract using viem
  // const bootcampFactoryAddress =
  //   process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS;

  return (
    <div className="flex flex-col w-[50%]">
      <h3>upcoming bootcamps:</h3>
      <div className="flex flex-row justify-between">
        {bootcamps.map((bootcamp) => {
          // Only return bootcamps that have not started yet
          if (bootcamp.start > Math.floor(Date.now() / 1000)) {
            return (
              <>
                <Link href={`bootcamp-detail?id=${bootcamp.id}`}>
                  <div
                    className="flex p-8 border-4 border-black/60"
                    key={bootcamp.address}
                  >
                    {bootcamp.name} - {bootcamp.address}
                  </div>
                </Link>
              </>
            );
          }
          return null; // Return null for bootcamps that are already started
        })}
      </div>
      <h3>currently running bootcamps:</h3>
      <div className="flex flex-row justify-between">
        {bootcamps.map((bootcamp) => {
          // Only return bootcamps that are currently running
          if (
            bootcamp.start <= Math.floor(Date.now() / 1000) &&
            bootcamp.deadline > Math.floor(Date.now() / 1000)
          ) {
            return (
              <>
                <Link href={`bootcamp-detail?id=${bootcamp.id}`}>
                  <div
                    className="flex p-8 border-4 border-black/60"
                    key={bootcamp.address}
                  >
                    {bootcamp.name} - {bootcamp.address}
                  </div>
                </Link>
              </>
            );
          }
          return null; // Return null for bootcamps that are not currently running
        })}
      </div>
      <h3>finished bootcamps:</h3>
      <div className="flex flex-row justify-between">
        {bootcamps.map((bootcamp) => {
          // Only return bootcamps that have finished
          if (bootcamp.deadline <= Math.floor(Date.now() / 1000)) {
            return (
              <>
                <Link href={`bootcamp-detail?id=${bootcamp.id}`}>
                  <div
                    className="flex p-8 border-4 border-black/60"
                    key={bootcamp.address}
                  >
                    {bootcamp.name} - {bootcamp.address}
                  </div>
                </Link>
              </>
            );
          }
          return null; // Return null for bootcamps that are not finished
        })}
      </div>
    </div>
  );
};
