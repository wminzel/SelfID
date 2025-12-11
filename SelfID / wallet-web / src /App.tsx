import React, { useState } from "react";
import { generateDID } from "./crypto";

export default function App() {
  const [did, setDid] = useState<string | null>(null);

  const handleGenerate = () => {
    const newDid = generateDID();
    setDid(newDid);
    localStorage.setItem("selfid-did", newDid);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>SelfID Wallet (MVP)</h1>

      <button
        onClick={handleGenerate}
        style={{
          padding: "12px 20px",
          borderRadius: "8px",
          background: "#4c82fb",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Generate DID
      </button>

      {did && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your DID:</h3>
          <code>{did}</code>
        </div>
      )}
    </div>
  );
}
