import { PROGRAM_ID } from '@/constants/ProgramId';
import { PublicKey } from '@solana/web3.js';

export const farmPda = (owner: PublicKey) => {
    return PublicKey.findProgramAddressSync([Buffer.from("farm"), owner.toBuffer()], PROGRAM_ID);
}

export const farmSignerPda = (farmPda: PublicKey) => {
    return PublicKey.findProgramAddressSync([Buffer.from("farm"), farmPda.toBuffer()], PROGRAM_ID)
}

export const farmPaymentVault = (farmPda: PublicKey) => {
    return PublicKey.findProgramAddressSync([Buffer.from("payment-vault"), farmPda.toBuffer()], PROGRAM_ID)
}

export const farmRevenueVault = (farmPda: PublicKey) => {
    return PublicKey.findProgramAddressSync([Buffer.from('revenue-vault'), farmPda.toBuffer()], PROGRAM_ID)
}

export const paymentMint = () => {
    return new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr")
}

export const farmTokenMintPda= (farmPda: PublicKey) => {
    return PublicKey.findProgramAddressSync([Buffer.from("farm_token_mint"), farmPda.toBuffer()], PROGRAM_ID)
}