// src/App.tsx
import { useState } from "react";
import { generateDIDDocument, DidDocument } from "./crypto";

function App() {
  const [did, setDid] = useState<string | null>(null);
  const [doc, setDoc] = useState<DidDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);

      const { did, document } = await generateDIDDocument();
      setDid(did);
      setDoc(document);
    } catch (e) {
      console.error(e);
      setError("Failed to generate DID document. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>SelfID Wallet (MVP)</h1>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: loading ? "wait" : "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "Generating…" : "Generate DID"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}

      <h3>Your DID:</h3>
      <pre>{did ?? "— Click 'Generate DID' to create one —"}</pre>

      <h3>DID Document:</h3>
      <pre style={{ background: "#f5f5f5", padding: "16px" }}>
        {doc ? JSON.stringify(doc, null, 2) : "— No DID Document yet —"}
      </pre>
    </div>
  );
}

export default App;
