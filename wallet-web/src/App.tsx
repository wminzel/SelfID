// src/App.tsx
import { useEffect, useState } from "react";
import { generateDIDDocument, type DidDocument } from "./crypto";

function App() {
  const [did, setDid] = useState<string>("");
  const [doc, setDoc] = useState<DidDocument | null>(null);

  // Load saved DID from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("didDocument");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as { did: string; document: DidDocument };
      setDid(parsed.did);
      setDoc(parsed.document);
    } catch (err) {
      console.error("Failed to parse saved DID document", err);
    }
  }, []);

  async function handleGenerate() {
    const { did, document } = await generateDIDDocument();
    setDid(did);
    setDoc(document);

    // Persist to localStorage
    localStorage.setItem("didDocument", JSON.stringify({ did, document }));
  }

  async function handleCopy() {
    if (!did) return;
    await navigator.clipboard.writeText(did);
    alert("DID copied to clipboard");
  }

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: 800,
            marginBottom: "24px",
            color: "#111827",
          }}
        >
          SelfID Wallet (MVP)
        </h1>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <button
            onClick={handleGenerate}
            style={{
              padding: "10px 24px",
              borderRadius: "999px",
              border: "none",
              background: "#111827",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Generate DID
          </button>

          <button
            onClick={handleCopy}
            disabled={!did}
            style={{
              padding: "10px 24px",
              borderRadius: "999px",
              border: "1px solid #d1d5db",
              background: did ? "white" : "#f9fafb",
              color: "#111827",
              fontSize: "16px",
              cursor: did ? "pointer" : "not-allowed",
              fontWeight: 500,
            }}
          >
            Copy DID
          </button>
        </div>

        {/* DID display */}
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#111827",
            }}
          >
            Your DID:
          </h2>
          <div
            style={{
              background: "#f9fafb",
              borderRadius: "8px",
              padding: "12px 16px",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
              fontSize: "14px",
              color: "#111827",
              minHeight: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {did || "—"}
          </div>
        </div>

        {/* DID Document display */}
        <div>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#111827",
            }}
          >
            DID Document:
          </h2>
          <pre
            style={{
              background: "#f9fafb",
              borderRadius: "8px",
              padding: "16px",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
              fontSize: "13px",
              color: "#111827",
              maxHeight: "400px",
              overflow: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {doc ? JSON.stringify(doc, null, 2) : "—"}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;

