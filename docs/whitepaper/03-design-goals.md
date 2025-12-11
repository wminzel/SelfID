# 3. Design Goals

SelfID is intended to be the simplest, safest, and most universal decentralized identity layer.  
This section outlines the key design requirements that guide the protocol.

---

## 3.1 User Ownership

- Every user controls their own identity via cryptographic private keys.
- No company, government, or service can modify or revoke a user’s identity.
- Private keys never leave the user’s device.

---

## 3.2 Privacy Preservation

- No personal or identifying information is stored on-chain.
- Only hashed identifiers and public keys exist in the Registry.
- Applications receive cryptographic proofs, not raw user data.
- Supports zero-knowledge proofs for age, profession, trial participation, etc.

---

## 3.3 Minimal On-Chain Footprint

- On-chain storage is limited to:  
  **hash(DID) → public key + timestamp**
- All credentials (doctor license, researcher status, medical trial participation) stay off-chain.
- Reduces gas costs, attack surface, and regulatory burden.

---

## 3.4 Interoperability

- Designed to integrate with existing DID standards (W3C DID, VC, JSON-LD).
- Works across all major blockchains via modular registry contracts.
- Easily integrates with traditional Web2 apps via a simple “Sign in with SelfID” API.

---

## 3.5 Simplicity for Developers

- Only three core contract methods:
  - `registerDID(did, pubKey)`
  - `updateKey(did, newPubKey)`
  - `resolve(did)`
- Web2 sites integrate with <20 lines of JS.
- No blockchain expertise required.

---

## 3.6 Security

- Strong cryptography (Ed25519 or secp256k1)
- Replay protection by including timestamps in signatures
- Verified signature scheme ensures only identity owners can update keys
- Optional multi-signature identity recovery

---

## 3.7 Extensibility

- Compatible with future modules:
  - Verifiable credential attestations
  - Zero-knowledge proof circuits
  - Multi-network registries
  - Decentralized social graph

SelfID is designed to start extremely simple, but scale to a full global identity ecosystem over time.
