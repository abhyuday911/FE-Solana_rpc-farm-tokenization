import { PublicKey } from '@solana/web3.js';
import { farmIdl } from './idl';

export const FarmProgramId = new PublicKey(farmIdl.address);