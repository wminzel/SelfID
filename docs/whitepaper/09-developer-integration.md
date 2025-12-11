9. Developer Integration Guide: “Sign in with SelfID”

This section provides a clear, minimal guide for developers who want to integrate SelfID authentication into their apps or websites.
The design goal is: Add SelfID login in under 10 minutes.

9.1 Overview

SelfID authentication uses a challenge–response mechanism:

The app generates a random challenge (nonce)

The SelfID Wallet signs it

The app resolves the DID to fetch the user’s public key from the blockchain

The app verifies the signature

User is authenticated without passwords, emails, or centralized identity providers

9.2 Requirements to Integrate

Developers need:

Basic HTML/JS (for web)

A SelfID-compatible wallet (browser extension or mobile)

RPC endpoint for reading the SelfID Registry

No blockchain transactions are needed to verify identities.

9.3 Add a “Sign in with SelfID” Button

Any website can add a login button:

<button id="selfid-login">
  Sign in with SelfID
</button>

9.4 Generate a Challenge (Nonce)

On button click, generate a 32-byte random nonce:

function generateChallenge() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

9.5 Send Login Request to Wallet

Apps send a request object that includes:

domain

challenge

timestamp

expiration window

const request = {
  type: "SelfIDLoginRequest",
  domain: window.location.hostname,
  challenge: generateChallenge(),
  timestamp: Math.floor(Date.now() / 1000),
  expires_in: 30
};

const response = await window.selfid.login(request);

9.6 Wallet Response Payload

Wallet returns:

{
  "did": "did:selfid:abc123...",
  "signature": "0x....",
  "challenge": "abcde12345..."
}


This proves:

the wallet received the challenge

the user signed it using their private key

9.7 Resolve the User’s DID (Fetch Public Key)

Apps fetch the public key from the SelfID Registry.

Using ethers.js:

import { ethers } from "ethers";
import SelfIDRegistryABI from "./SelfIDRegistryABI.json";

const provider = new ethers.JsonRpcProvider(
  "https://base-sepolia.example.org"
);

const registry = new ethers.Contract(
  "0xSELFID_REGISTRY_ADDRESS",
  SelfIDRegistryABI,
  provider
);

async function fetchPublicKey(did) {
  const [pubkey, updatedAt] = await registry.resolve(did);
  return pubkey;
}

9.8 Verify the Signature

After obtaining the public key:

import { verifyMessage } from "ethers";

const canonicalMessage = [
  "SelfID Authentication",
  `domain: ${request.domain}`,
  `challenge: ${request.challenge}`,
  `timestamp: ${request.timestamp}`,
  `expires_in: ${request.expires_in}`,
  `did: ${response.did}`
].join("\n");

const valid = verifyMessage(canonicalMessage, response.signature)
              === pubkeyRecoveredFromRegistry;


If valid === true → user authenticated.

9.9 Full Example (Copy-Paste)
document.getElementById("selfid-login").onclick = async () => {
  
  // 1. Construct login request
  const req = {
    type: "SelfIDLoginRequest",
    domain: window.location.hostname,
    challenge: generateChallenge(),
    timestamp: Math.floor(Date.now() / 1000),
    expires_in: 30
  };

  // 2. Ask wallet to sign
  const resp = await window.selfid.login(req);

  // 3. Resolve DID → get public key
  const pubkey = await fetchPublicKey(resp.did);

  // 4. Verify signature
  const canonical = [
    "SelfID Authentication",
    `domain: ${req.domain}`,
    `challenge: ${req.challenge}`,
    `timestamp: ${req.timestamp}`,
    `expires_in: ${req.expires_in}`,
    `did: ${resp.did}`
  ].join("\n");

  const recovered = ethers.verifyMessage(canonical, resp.signature);

  if (recovered === pubkey) {
    alert("Logged in with SelfID!");
  } else {
    alert("Signature mismatch. Authentication failed.");
  }
};

9.10 Server-Side Verification (Node.js)
import { ethers } from "ethers";

// verify canonical message with signature
function verifySelfIDLogin(body, pubkeyFromRegistry) {
  const canonical = [
    "SelfID Authentication",
    `domain: ${body.domain}`,
    `challenge: ${body.challenge}`,
    `timestamp: ${body.timestamp}`,
    `expires_in: ${body.expires_in}`,
    `did: ${body.did}`
  ].join("\n");

  const recovered = ethers.verifyMessage(canonical, body.signature);

  return recovered === pubkeyFromRegistry;
}

9.11 Integration Checklist

✔ Wallet installed
✔ Login button added
✔ Challenge generated
✔ Wallet signs challenge
✔ Registry resolves DID
✔ Signature verified
✔ Session created

9.12 Common Mistakes

❌ Using expired timestamps
❌ Forgetting to verify domain
❌ Using unhashed DIDs
❌ Not enforcing randomness in challenges
❌ Not verifying the response against registry key

9.13 Summary

Adding SelfID login requires:

No passwords

No phone numbers

No emails

No OAuth tokens

No backend dependency on a centralized provider

Developers only need:

A login button

20 lines of JS

The public key from the SelfID Registry

Signature verification

SelfID login is secure, privacy-preserving, and interoperable across all apps.
