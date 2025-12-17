"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useInitializeFarm } from "@/hooks/useFarm";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { LandPlot, Layers, Wallet } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { BN } from "@coral-xyz/anchor";

const InitializeFarmFormSchema = yup.object({
  farmName: yup.string().min(1).required(),
  totalShares: yup.number().positive().required(),
  pricePerShare: yup.number().positive().required(),
});

interface Farm {
  farmName: string;
  totalShares: number;
  pricePerShare: number;
}

const Main = () => {
  const { initializeFarm, isLoading, isReady } = useInitializeFarm();
  const [farm, setFarm] = useState<PublicKey | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(InitializeFarmFormSchema) });

  const onSubmit = async (data: Farm) => {
    try {
      const { farmAccount, farm } = await initializeFarm(
        data.farmName,
        new BN(data.totalShares),
        new BN(data.pricePerShare)
      );
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-md bg-green-900/10 border p-6 rounded-lg space-y-4 mb-20"
      >
        <InputGroup>
          <InputGroupInput
            required
            placeholder="Farm Name"
            {...register("farmName")}
          />
          <InputGroupAddon>
            <LandPlot />
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupInput
            type="number"
            placeholder="Total Shares"
            required
            {...register("totalShares")}
          />
          <InputGroupAddon>
            <Layers />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput
            type="number"
            placeholder="Price Per Share"
            required
            {...register("pricePerShare")}
          />
          <InputGroupAddon>
            <Wallet />
          </InputGroupAddon>
        </InputGroup>
        <Button disabled={!isReady || isLoading} className="w-full mt-2">
          {isLoading ? "Creating Farm..." : "Create Farm"}
        </Button>
        <p>
          {errors.farmName?.message ||
            errors.totalShares?.message ||
            errors.pricePerShare?.message}
        </p>
      </form>

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
    </div>
  );
};

export default Main;
