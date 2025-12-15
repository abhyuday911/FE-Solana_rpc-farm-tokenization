import { farmIdl } from '@/constants/farm-tokenization/idl';
import { FarmTokenization } from '@/constants/farm-tokenization/type';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { useMemo } from 'react';

export const useFarmProgram = () => {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();


    return useMemo(() => {
        if (!wallet || !connection) return { provider: null, program: null }

        const provider = new AnchorProvider(connection, wallet, {});
        const program = new Program(farmIdl as FarmTokenization, provider) as Program<FarmTokenization>;

        return { provider, program }
    }, [connection, wallet])
}

// new program will take the provider as the provider and not the connection as provider (which is written in the anchor docs)
    // Error: This function requires 'Provider.sendAndConfirm' to be implemented.
    // at MethodsBuilder.rpc [as _rpcFn] (rpc.ts:24:15)
    // at MethodsBuilder.rpc (methods.ts:434:17)
    // at async useInitializeFarm.useCallback[initializeFarm] (useFarm.ts:52:13)
    // at async handleClick (Main.tsx:9:29)