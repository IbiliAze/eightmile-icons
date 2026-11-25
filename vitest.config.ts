import { defineConfig } from 'vitest/config';

/** The icons render to markup with `react-dom/server`, so the tests need no DOM. */
export default defineConfig({
  test: { environment: 'node', include: ['src/**/*.test.ts', 'src/**/*.test.tsx'] },
});
