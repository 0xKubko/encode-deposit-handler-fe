import { ConnectButton } from "@/components/ConnectButton";
import { BootcampList } from "@/components/BootcampList";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="font-bold mb-4">Encode Bootcamp Deposits</h1>
      <ConnectButton />
      <BootcampList />
    </div>
  );
}
