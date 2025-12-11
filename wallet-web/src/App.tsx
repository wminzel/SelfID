import { useState } from "react";
import { generateDID } from "./crypto";

function App() {
  const [did, setDid] = useState("");

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>SelfID Wallet (MVP)</h1>

      <button
        onClick={() => setDid(generateDID())}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Generate DID
      </button>

      <h3>Your DID:</h3>
      <pre>{did}</pre>
    </div>
  );
}

export default App;
