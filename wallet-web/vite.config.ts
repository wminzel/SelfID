import { defineConfig } from "vite";

// Use an async config so we can `import()` the ESM plugin.
export default defineConfig(async () => {
  const react = (await import("@vitejs/plugin-react")).default;

  return {
    plugins: [react()],
    // optional but fine to keep things clear:
    root: ".",
    build: {
      outDir: "dist",
    },
  };
});
