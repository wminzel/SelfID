// src/crypto.ts

export type DidDocument = {
  id: string;
  verificationMethod: {
    id: string;
    type: string;
    controller: string;
    publicKeyHex: string;
  }[];
  authentication: string[];
};

/**
 * Generate a random hex string of N bytes.
 */
function randomHex(bytes: number): string {
  const buf = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * For this MVP we fake a keypair and just generate a random public key.
 * In a real wallet you'd use WebCrypto or a library like noble/ed25519.
 */
function generateMockPublicKeyHex(): string {
  return randomHex(32); // 256-bit fake public key
}

/**
 * Generate a DID and a minimal DID Document (did:selfid:...).
 */
export async function generateDIDDocument(): Promise<{
  did: string;
  document: DidDocument;
}> {
  const did = `did:selfid:${randomHex(16)}`;
  const publicKeyHex = generateMockPublicKeyHex();

  const document: DidDocument = {
    id: did,
    verificationMethod: [
      {
        id: `${did}#key-1`,
        type: "EcdsaSecp256k1VerificationKey2019",
        controller: did,
        publicKeyHex,
      },
    ],
    authentication: [`${did}#key-1`],
  };

  return { did, document };
}

