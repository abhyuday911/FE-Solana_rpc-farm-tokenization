// create program from idl
import { FarmTokenization } from '@/constants/farm_tokenization';
import { FARM_IDL } from '@/constants/idl';
import { Program } from '@coral-xyz/anchor';
import { clusterApiUrl, Connection } from '@solana/web3.js'

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
export const createProgram = () => {
    return new Program(FARM_IDL as FarmTokenization, {
        connection,
    });
}