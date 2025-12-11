// src/crypto.ts

// Basic DID Document Type
export interface DidDocument {
  "@context": "https://www.w3.org/ns/did/v1";
  id: string;
  verificationMethod: Array<{
    id: string;
    type: "JsonWebKey2020";
    controller: string;
    publicKeyJwk: JsonWebKey;
  }>;
  authentication: string[];
}

/**
 * Generate a random DID identifier part: 16 random bytes -> hex
 */
function generateRandomId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Generate a new DID + DID Document.
 * Uses P-256 (ECDSA) keys via WebCrypto.
 */
export async function generateDIDDocument(): Promise<{
  did: string;
  document: DidDocument;
}> {
  // 1. Generate key pair
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true, // extractable (so we can export + demo local storage)
    ["sign", "verify"]
  );

  // 2. Export public key as JWK (for DID Document)
  const publicKeyJwk = (await crypto.subtle.exportKey(
    "jwk",
    keyPair.publicKey
  )) as JsonWebKey;

  // 3. Export private key as JWK (MVP ONLY – NOT secure for production)
  const privateKeyJwk = (await crypto.subtle.exportKey(
    "jwk",
    keyPair.privateKey
  )) as JsonWebKey;

  // 4. Create DID
  const idFragment = generateRandomId();
  const did = `did:selfid:${idFragment}`;
  const keyId = `${did}#keys-1`;

  // 5. Build DID Document
  const document: DidDocument = {
    "@context": "https://www.w3.org/ns/did/v1",
    id: did,
    verificationMethod: [
      {
        id: keyId,
        type: "JsonWebKey2020",
        controller: did,
        publicKeyJwk,
      },
    ],
    authentication: [keyId],
  };

  // 6. Store private key for this DID (MVP demo only)
  // In a real wallet you’d use secure storage / key management.
  const walletEntry = {
    did,
    privateKeyJwk,
  };
  localStorage.setItem(`selfid-wallet:${did}`, JSON.stringify(walletEntry));

  return { did, document };
}
