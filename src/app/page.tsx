"use client";

import { BootcampList } from "@/components/BootcampList";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <BootcampList />
    </div>
  );
}
