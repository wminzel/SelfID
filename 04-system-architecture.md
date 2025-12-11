4. System Architecture Overview

SelfID is designed as a lightweight decentralized identity layer that combines on-chain identifiers with off-chain, privacy-preserving credentials. The architecture has four major components:

4.1 Components
1. SelfID Wallet (User Application)

A mobile or browser-based wallet that:

Generates and stores private keys locally

Holds the user's DID

Stores verifiable credentials off-chain

Signs authentication challenges

Approves public key rotations

The wallet is the root of trust for the user.

2. SelfID Registry Contract (On-Chain)

A minimal Ethereum-compatible smart contract storing:

did → publicKey

Timestamp of updates

It does not store personal data, ensuring:

Privacy

Low gas cost

Long-term compatibility

3. Credential Issuers (Off-Chain)

Trusted institutions issue digitally signed credentials:

Hospitals

Universities

Employers

Research organizations

Governments

Credentials are stored off-chain (IPFS, cloud storage, or user device).

4. Verifier Apps (Websites / Services)

Any application can integrate Sign in with SelfID:

Healthcare portals

Research communities

Clinical trial enrollment

Social platforms

DAO governance

Verifiers never receive raw personal data — only cryptographic proofs.

4.2 DID Registration Flow
+-------------+        +--------------------+        +----------------------+
| SelfID App  | -----> | SelfID Registry    | -----> | Blockchain (EVM)     |
+-------------+        +--------------------+        +----------------------+

1. User installs SelfID Wallet
2. Wallet generates keypair (private key stays local)
3. Wallet calls registerDID(did, publicKey)
4. Registry validates and stores the publicKey

4.3 Authentication (Login) Flow
User logs into example.com

+-------------+      +----------------+      +------------------+
| SelfID App  | <--> | example.com    | <--> | SelfID Registry  |
+-------------+      +----------------+      +------------------+

1. Verifier sends a random challenge (nonce)
2. Wallet signs challenge with private key
3. Verifier fetches publicKey from registry
4. Verifier checks signature
5. User is authenticated


This replaces:

Passwords

Email-based login

Social logins

4.4 Credential Issuance & Verification
Issuance
Issuer signs credential → User stores it in wallet (off-chain)

Verification
Verifier requests proof → Wallet generates proof → Verifier checks issuer signature


No blockchain interaction is required for verifying credentials.

4.5 Threat Model Summary

SelfID protects against:

Centralized identity providers (Google, Apple, Meta)

Data breaches (no personal data stored on-chain)

Key theft (key rotation supported)

Credential forgery (issuer signatures)

Surveillance (off-chain verification leaves no blockchain trail)

SelfID never stores:

Phone numbers

Emails

Personal metadata

Government IDs
