export function generateDID(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const hex = Array.from(array, b => b.toString(16).padStart(2, "0")).join("");
  return `did:self:${hex}`;
}
