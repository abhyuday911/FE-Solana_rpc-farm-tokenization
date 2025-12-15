import { useCallback, useState } from 'react';
import { useFarmProgram } from './useFarmProgram'
import { BN } from '@coral-xyz/anchor';
import { farmPaymentVault, farmPda, farmRevenueVault, farmSignerPda, farmTokenMintPda, paymentMint } from '@/api/pda';
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor"

type InitializeFarmRersult = { txSig: string, farm: PublicKey, farmAccount: unknown }

export const useInitializeFarm = () => {
    const { program, provider } = useFarmProgram();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const initializeFarm = useCallback(async (): Promise<InitializeFarmRersult> => {
        if (!program || !provider) {
            throw new Error("program or provider not ready");
        }
        const owner = provider.wallet.publicKey;
        if (!owner) throw new Error("wallet not connected");
        setLoading(true);
        setError(null);
        try {
            const [farmAdd] = farmPda(provider.publicKey);
            const [farmSignerPdaAdd] = farmSignerPda(farmAdd);
            const [farmPaymentVaultAdd] = farmPaymentVault(farmAdd);
            const [farmRevenueVaultAdd] = farmRevenueVault(farmAdd);
            const [farmTokenMintPdaAdd] = farmTokenMintPda(farmAdd);
            const paymentMintAdd = paymentMint();

            const txSig = await program?.methods.farmInitialize("ramesh farm", new BN(1_000_000), new BN(100)).accounts({
                owner,
                // @ts-expect-error: probably need to look-up smart contract (it's tests were also showing the same problem)
                farm: farmAdd,
                farmTokenMint: farmTokenMintPdaAdd,
                farmSigner: farmSignerPdaAdd,
                paymentMint: paymentMintAdd,
                farmPaymentVault: farmPaymentVaultAdd,
                farmRevenueVault: farmRevenueVaultAdd,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            }).rpc();

            const farmAccount = await program.account.farm.fetch(farmAdd);
            console.log(farmAccount)
            return { txSig, farm: farmAdd, farmAccount }
        } catch (error) {
            setError(error as Error);
            throw error
        } finally {
            setLoading(false);
        }



    }, [program, provider])

    return { initializeFarm, loading, error, isReady: !!(program && provider) }
}