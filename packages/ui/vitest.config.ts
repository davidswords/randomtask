import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      // json-summary feeds the coverage badge.
      reporter: ["text", "json-summary"],
      include: ["src/**"],
      exclude: ["src/**/*.test.ts"],
      thresholds: { lines: 100, branches: 100, functions: 100, statements: 100 },
    },
  },
});
