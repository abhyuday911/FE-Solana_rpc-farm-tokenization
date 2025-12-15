import { FarmTokenization } from '@/constants/farm_tokenization';
import { FARM_IDL } from '@/constants/idl';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { useMemo } from 'react';

export const useFarmProgram = () => {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    return useMemo(() => {
        if (!wallet || !wallet.publicKey || !connection) return { provider: null, program: null }
        const provider = new AnchorProvider(connection, wallet, {});
        const program  = new Program(FARM_IDL as FarmTokenization,
            provider
        ) as Program<FarmTokenization>;
        return { provider, program }
    }, [wallet, connection])
}