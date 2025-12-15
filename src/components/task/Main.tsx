"use client";
import { Button } from "../ui/button";
import { useInitializeFarm } from "@/hooks/useFarm";
import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { toast } from "sonner";

const Main = () => {
  const { initializeFarm, loading, isReady } = useInitializeFarm();
  const [farmPubKey, setFarmPubKey] = useState<PublicKey | null>(null);

  const createFarm = async () => {
    try {
      const { farm } = await initializeFarm();
      setFarmPubKey(farm);
      toast.success("Farm created successfully");
    } catch (err) {
      toast.error("Failed to create farm");
      console.error(err);
    }
  };

  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <>
        {farmPubKey && (
          <>
            <h1 className="text-xl px-2">{farmPubKey?.toString()}</h1>
            <Button asChild variant={"secondary"}>
              <Link
                href={`https://explorer.solana.com/address/${farmPubKey?.toString()}?cluster=devnet`}
                target="_blank"
              >
                Solana Explorer Link
              </Link>
            </Button>
          </>
        )}
      </>
      <Button onClick={createFarm} disabled= {!isReady || loading}>
        {loading ? "Creating Farm..." : "Create Farm"}
      </Button>
    </div>
  );
};

export default Main;
