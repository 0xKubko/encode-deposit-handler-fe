"use client";

import { Suspense } from "react";
import { BootcampDetail } from "@/components/BootcampDetail";

export default function BootcampDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BootcampDetail />
    </Suspense>
  );
}
