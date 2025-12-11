export function generateDID(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
  return `did:selfid:${hex}`;
}
