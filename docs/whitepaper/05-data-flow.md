5. End-to-End Data Flow

This section describes the complete operational flow of SelfID across registration, authentication, credential issuance, and verification. Each flow is designed to minimize on-chain footprint while maximizing privacy and interoperability.

5.1 DID Registration Flow
Purpose:

Create a decentralized identifier (DID) anchored on-chain.

Actors:

User / SelfID Wallet

SelfID Registry (Smart Contract)

Steps:
1. Wallet generates keypair (private key stays local)
2. Wallet creates DID string (e.g., "did:selfid:xyz123")
3. Wallet sends "registerDID(did, publicKey)" to registry contract
4. Contract checks DID not already registered
5. Contract stores:
      didHash → { publicKey, timestamp }
6. Wallet now owns a verifiable on-chain identifier

Diagram
+----------------+         +----------------------+    
| SelfID Wallet  | ----->  | SelfID Registry (SC) |
+----------------+         +----------------------+

Generate keypair
       |
       v
Register DID on-chain
       |
       v
DID stored on registry

5.2 Authentication Flow ("Sign in with SelfID")
Purpose:

Decentralized passwordless login into any app or website.

Actors:

User / SelfID Wallet

Verifier App (website)

SelfID Registry (Smart Contract)

Steps:
1. Verifier sends a random challenge (nonce)
2. Wallet receives challenge and signs it using DID’s private key
3. Verifier fetches user's public key from the SelfID registry
4. Verifier checks signature against fetched public key
5. If valid → user authenticated

Diagram
         Challenge
Verifier -------------> SelfID Wallet
                       (signs with private key)
Verifier <------------- Signature

Verifier ---> Registry --> fetch public key
Verifier verifies signature

User authenticated

5.3 Credential Issuance Flow
Purpose:

Allow external issuers to issue verifiable credentials without storing them on-chain.

Actors:

Issuer (e.g., hospital, university)

User / SelfID Wallet

Steps:
1. Issuer creates digital credential (JSON)
2. Issuer signs credential using its private key
3. User receives credential and stores it:
     - locally on device
     - in encrypted cloud storage
     - in IPFS (optional)
4. No on-chain storage required

Diagram
Issuer signs credential ---> User stores credential locally

(No blockchain calls)

5.4 Credential Verification Flow
Purpose:

Verify user claims (ex: “I am a doctor”, “I am >18”) using cryptographic proofs.

Actors:

User / SelfID Wallet

Verifier Application

Issuer (public key known or anchored on registry)

Steps:
1. Verifier requests proof (e.g., "prove you are a licensed physician")
2. Wallet selects relevant credential
3. Wallet creates a zero-knowledge or selective-disclosure proof:
       (no raw data leaked)
4. Wallet sends proof to verifier
5. Verifier checks:
       - Issuer signature is valid
       - Credential hasn’t expired
       - Nonce tied to session

Diagram
Verifier ---- proof request ---> Wallet
Wallet ---- zk/selective proof ---> Verifier
Verifier verifies issuer signature

5.5 Key Rotation Flow (Security)
Purpose:

Let users recover from key compromise without losing identity.

Actors:

User / SelfID Wallet

SelfID Registry (Smart Contract)

Steps:
1. Wallet generates new keypair
2. Wallet signs rotation request using the old key
3. Wallet calls updateKey(did, newPublicKey)
4. Registry updates stored public key
5. Future logins now use the new key

Diagram
Old Key ---- signs rotation ----> Registry
Registry updates publicKey
New Key becomes active

5.6 Summary of Data Flow Principles

SelfID follows these core principles:

Minimal on-chain state
Only public keys + timestamps stored.

All personal data off-chain
The blockchain never holds sensitive data.

Verifiability everywhere
Every interaction uses cryptographic proofs.

User-owned identity
Keys live on the user device, never on servers.

Interoperability
Any app can verify credentials without contacting the issuer.
