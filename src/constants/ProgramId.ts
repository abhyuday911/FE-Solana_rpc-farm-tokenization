import { PublicKey } from '@solana/web3.js';
import { FARM_IDL } from './idl';
export const PROGRAM_ID = new PublicKey(FARM_IDL.address)