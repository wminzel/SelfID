7. SelfID Registry Smart Contract Specification

The SelfID Registry is the core on-chain component of the SelfID identity system.
It provides secure DID registration, key management, and lookup functions.
This contract is intentionally minimal—only storing what cannot safely be stored off-chain.

7.1 Contract Overview

The registry is a single smart contract responsible for:

Registering a DID

Storing the public key associated with a DID

Supporting public key rotation

Resolving a DID into its current public key

Emitting events for off-chain indexing

Ensuring only the DID owner can update the key

No personal data, credentials, or documents are stored on-chain.

7.2 Storage Structure

The registry stores one mapping:

mapping(bytes32 => PublicKey) public didToKey;


Where:

struct PublicKey {
    bytes key;        // the wallet’s public key
    uint256 updatedAt; // timestamp of last update
}

Why this is minimal:

Only 64 bytes per DID + timestamp

No DID string (hashed for privacy)

No documents

No metadata except updatedAt

This allows massive scalability at low cost.

7.3 DID Hashing

The registry never stores DIDs directly.

On-chain identifier:

didHash = keccak256(utf8(DID))


This ensures:

Privacy (DIDs can't be enumerated)

Efficient mapping lookup

Fixed-size storage

7.4 Core Functions

Below is the full specification of each function, matching the Solidity implementation.

7.4.1 registerDID(string did, bytes publicKey)
Purpose

Registers a DID for the first time.

Rules

DID must not already exist.

Caller must provide a valid public key.

Emits a DIDRegistered event.

Pseudocode
if didToKey[didHash] exists:
    revert “DID already registered”
store publicKey, timestamp
emit DIDRegistered(did, publicKey)

7.4.2 updateKey(string did, bytes newPublicKey)
Purpose

Updates the public key for an existing DID.

Rules

DID must already exist.

Must prove ownership (future: signature verification).

Updates stored public key + updatedAt.

Emits a KeyUpdated event.

Security

Current minimal version requires:

Only the correct key owner signs the rotation (to be implemented in v1.1)

7.4.3 resolve(string did)
Purpose

Returns the public key and timestamp for a DID.

Output
returns (bytes publicKey, uint256 updatedAt)

Usage

DID resolvers call this function to assemble a W3C-compatible DID Document.

7.5 Events

Events allow off-chain systems (indexers, wallets, identity hubs) to track DID activity.

DIDRegistered
event DIDRegistered(string did, bytes publicKey);


Emitted when a DID is first created.

KeyUpdated
event KeyUpdated(string did, bytes publicKey);


Emitted whenever the owner rotates their key.

7.6 Security Model

SelfID Registry follows a layered security approach:

1. Ownership Proof

Initial version relies on key signing (to be added in v1.1).
Future implementations include:

ECDSA.recover signature verification

Key delegation via DID Documents

Social / multi-sig recovery (optional extension)

2. No Personal Data On-Chain

Only public keys + timestamps.
Proofs, credentials, and user data stay off-chain.

3. Hash-Based Privacy

DIDs are hashed → hides user identity.

4. Minimal Attack Surface

Only 3 functions exposed.
No loops, no gas-heavy operations.

5. Upgradeability (Optional)

Registry can be:

simple contract

upgradeable proxy (future v2 option)

Current spec assumes non-upgradeable, immutable registry for trust minimization.

7.7 Gas Cost Expectations

Very low gas usage:

Operation	Expected Gas
Register DID	~50,000
Update Key	~35,000
Resolve DID	~5,000

This ensures global-scale usage for minimal cost.

7.8 Versioning

SelfID Registry starts as:

SelfIDRegistry v1.0


Planned upgrades:

v1.1: signature verification for key rotation

v2.0: multi-key support

v3.0: cross-chain identity registry

7.9 Summary

The SelfID Registry:

is simple

secure

private

extremely low-cost

fully decentralized

compatible with W3C DID standards

It provides the essential anchor for SelfID’s global identity layer.
