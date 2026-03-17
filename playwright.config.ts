import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    command:
      "cp -r .next/static .next/standalone/.next/static && cp -r public .next/standalone/public && node .next/standalone/server.js",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
