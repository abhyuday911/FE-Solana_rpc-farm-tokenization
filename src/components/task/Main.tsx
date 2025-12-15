"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useInitializeFarm } from "@/hooks/useFarm";
import { PublicKey } from "@solana/web3.js";
import { toast } from "sonner";
import Link from "next/link";

const Main = () => {
  const { initializeFarm, isLoading, isReady } = useInitializeFarm();
  const [farm, setFarm] = useState<PublicKey | null>(null);

  const handleClick = async () => {
    try {
      const { farmAccount, farm } = await initializeFarm();
      toast.info(farmAccount.name + " created!");

      setFarm(farm);
      console.log(farmAccount);
    } catch (error) {
      console.log(error);
      toast.error("farm not created, something went wrong.");
    }
  };
  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      {farm && (
        <>
          <h1 className="text-2xl text-green-600">{farm.toString()}</h1>
          <Button asChild variant={"secondary"}>
            <Link
              href={`https://explorer.solana.com/address/${farm}?cluster=devnet`}
              target="blank"
            >
              View On Solana Explorer
            </Link>
          </Button>
        </>
      )}
      <Button onClick={handleClick} disabled= {!isReady || isLoading}>
        {isLoading ? "Creating Farm..." : "Create Farm"}
      </Button>
    </div>
  );
};

export default Main;
