# Solana Client Side Integration

An application featuring integration of solana client-side with <b> organized folder structure <b/>.

<br/>

## Getting Started

First, run the development server:

```bash
bun install

bun dev
```

<!--
    @coral-xyz/anchor \
    @solana/web3.js \
    @solana/spl-token

    | Package             | Purpose                                                           |
    | ------------------- | ----------------------------------------------------------------- |
    | `@coral-xyz/anchor` | Anchor client library to interact with your program from frontend |
    | `@solana/web3.js`   | Core Solana SDK                                                   |
    | `@solana/spl-token` | Create ATAs, transfer tokens, fetch balances, etc.                |


    ## good folder structure to have.

    src/
        components/
            BuyShares.tsx
            FarmDashboard.tsx
        hooks/
            useAnchor.ts        <- wraps wallet + creates Anchor provider
            useFarm.ts          <- UI-ready functions (buy, fetch, initialize)
        api/
            anchors.ts          <- createProgram(provider)
            solana.ts           <- connection, provider creation
            pdas.ts             <- PDA helpers
            token.ts            <- create ATA, etc.
            farm.ts             <- optional: plain JS functions for farm calls
        lib/
            bn.ts
            format.ts
            math.ts
        constants/
            idl.json
            programId.ts
        App.tsx
 -->

## Reference Docs

[Wallet Adapter](https://solana.com/developers/cookbook/wallets/connect-wallet-react) <br/>
[Anchor Provider](https://www.anchor-lang.com/docs/clients/typescript)
| Feature                       | Needs Wallet Adapter | Needs Anchor Provider |
| ----------------------------- | -------------------- | --------------------- |
| Send SOL                      | ✔                    | ❌                     |
| Send SPL tokens               | ✔                    | ❌                     |
| Call normal Web3 instructions | ✔                    | ❌                     |
| Call Anchor instructions      | ✔                    | ✔                     |
| Fetch Anchor accounts         | ❌                    | ✔                     |
| Use `.methods.*` or `.rpc()`  | ✔                    | ✔                     |
