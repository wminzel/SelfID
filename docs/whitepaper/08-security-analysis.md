8. Threat Model & Security Analysis

SelfID must operate in hostile real-world environments where attackers include:

hackers

malicious governments

corporations

fraudsters

data harvesters

nation-state adversaries

This section defines the threat model and shows how SelfID mitigates these risks.

8.1 Security Principles

SelfID follows five key principles:

1. No Central Authority

No corporation or government can reset your identity.

2. Your Keys = Your Identity

If you own the private key, you own the identity.

3. Minimal On-Chain Data

No names, emails, documents, or personal info.

4. Privacy by Design

Everything on-chain is hashed or public-key based.

5. Cryptographic Guarantees > Legal Guarantees

We trust math, not institutions.

8.2 Threat Actors

Below are the primary attackers the system must defend against.

A. External Hackers

Trying to impersonate users or steal identity data.

B. Governments

Attempting to censor identities or access personal data.

C. Corporations

Trying to track, profile, or monopolize identity systems.

D. Credential Forgers

Trying to fake being a doctor, researcher, student, etc.

E. Phishers

Tricking users into giving control of their keys.

F. Malicious Validators / Validators

Trying to rewrite or selectively censor transactions.

8.3 Threats & Mitigations

SelfID must resist several classes of attacks:

8.3.1 Identity Theft / Key Theft
Threat

Attacker steals a user's private key and takes over their identity.

Mitigations

Key rotation (updateKey)

Optional biometric wallet signing

Hardware wallet support

Social recovery (future extension)

Optional multi-sig DID ownership

8.3.2 On-Chain Censorship
Threat

A validator or government attempts to block DID registrations.

Mitigations

Deploy on censorship-resistant L1 (Ethereum / Polygon / Base)

Spread transactions across multiple RPC endpoints

Allow mirroring the registry across chains (future v2)

DID anchoring can be done on L2 rollups if L1 censorship occurs

8.3.3 Credential Forging
Threat

Someone tries to fake a verifiable credential such as
“I am a doctor” or “I participated in this clinical trial.”

Mitigations

Only trusted issuers can sign credentials

All credentials require cryptographic proof not editable data

Standalone verification libraries validate signatures

Registry does NOT store the credentials — cannot be tampered with

8.3.4 Correlation / Tracking Attacks
Threat

Corporations attempt to link DID usage across multiple websites.

Mitigations

Wallet generates per-app pseudonym keys (just like Sign in with Apple)

DID Document supports multiple public keys with different scopes

No IP address or metadata is stored on-chain

Off-chain communication uses zero-knowledge proofs (future)

8.3.5 Registry Enumeration Attack
Threat

Attacker tries to list all DID users.

Mitigations

DIDs are hashed with keccak256

No user-identifiable data on-chain

Mapping cannot be iterated without brute force

Hashing makes user enumeration effectively impossible.

8.3.6 Replay Attacks When Updating Keys
Threat

Attacker tries to reuse an old signature or old key.

Mitigations

Every update includes a timestamp

Wallet signs update requests using EIP-191 signatures

Future: Nonces included in DID Document for rotation

8.3.7 Compromised Issuers
Threat

Malicious institution tries to issue fake credentials.

Mitigations

Issuer public keys are transparent on-chain

Community trust registry can flag malicious issuers

Credentials tied to issuer identity — cannot forge past keys

Revocation registries allow invalidating bad credentials

8.3.8 Smart Contract Vulnerabilities
Threat

Bugs allowing attacker to alter someone else’s DID entry.

Mitigations

Contract has only 3 functions (extremely small attack surface)

No loops, no external calls, no complex logic

Public audit before v1 launch

Immutable contract => no upgrade backdoors

Minimal storage => minimal risk vectors

8.4 Privacy Guarantees

SelfID is built for privacy:

✔ DID strings never stored
✔ No documents stored
✔ No credential data stored
✔ Only public key + timestamp
✔ All resolution is off-chain
✔ Interactions use pseudonymous per-app keys
✔ Users select what attributes they reveal
✔ Zero-knowledge compatible

Users remain in full control of what they reveal and to whom.

8.5 Comparison to Existing Systems
Compared to OAuth (Google Login / Facebook Login)
Feature	OAuth	SelfID
Centralized	✔	✘
Tracks users	✔	✘
Requires email/phone	✔	✘
Users own their identity	✘	✔
Cannot be censored	✘	✔
Portable across apps	✘	✔
8.6 Summary

SelfID’s security model:

avoids centralized control

avoids personal data exposure

avoids linkability between websites

minimizes on-chain footprint

cryptographically protects keys, credentials, and proofs

uses open standards

This threat model ensures SelfID can function as a global, censorship-resistant identity layer for humanity.
