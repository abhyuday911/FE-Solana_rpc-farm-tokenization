import { useCallback, useState } from 'react';
import { useFarmProgram } from './useFarmProgram';
import { BN } from '@coral-xyz/anchor';
import { farmPaymentVault, farmPda, farmRevenueVault, farmSignerPda, farmTokenMintPda, paymentMint } from '@/api/farm/pda';
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token';
import { SystemProgram } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor"


export const useInitializeFarm = () => {
    const { program, provider } = useFarmProgram();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    const initializeFarm = useCallback(async (farmName: string, totalShares: BN, pricePerShare: BN) => {

        if (!program || !provider) throw new Error("program or provider not ready");
        const owner = provider.wallet.publicKey;
        if (!owner) throw new Error("Wallet not connected");
        setError(null);
        setIsLoading(true)


        try {
            const farmPdaAdd = farmPda(owner);
            const paymentMintAdd = paymentMint();
            const farmPaymentVaultAdd = farmPaymentVault(farmPdaAdd);
            const farmRevenueVaultAdd = farmRevenueVault(farmPdaAdd);
            const farmTokenMintPdaAdd = farmTokenMintPda(farmPdaAdd);
            const farmSignerAdd = farmSignerPda(farmPdaAdd)

            const txSig = await program.methods.farmInitialize(farmName, totalShares, pricePerShare)
                .accounts({
                    owner,
                    // @ts-expect-error look into the anchor contract test this problem was there as well.
                    farm: farmPdaAdd,
                    farmTokenMint: farmTokenMintPdaAdd,
                    farmSigner: farmSignerAdd,
                    paymentMint: paymentMintAdd,
                    farmPaymentVault: farmPaymentVaultAdd,
                    farmRevenueVault: farmRevenueVaultAdd,
                    associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY
                })
                .rpc()

            const farmAccount = await program.account.farm.fetch(farmPdaAdd);
            return { txSig, farm: farmPdaAdd, farmAccount }
        } catch (error) {
            setError(error as Error);
            throw error
        } finally {
            setIsLoading(false)
        }

    }, [program, provider]);



    return { initializeFarm, isReady: !!(program && provider), isLoading, error }

}