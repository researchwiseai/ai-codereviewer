// test/index.test.ts

import { test, expect, beforeAll } from "bun:test";
import { writeFileSync, mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

// Set up environment variables
beforeAll(() => {
  // Create a temporary directory
  const tempDir = mkdtempSync(join(tmpdir(), "github-action-"));

  // Create a temporary event file
  const event = {
    action: "opened",
    number: 6, // Replace with the PR number you want to test
    repository: {
      owner: { login: "researchwiseai" },
      name: "langgraphjs-checkpoint-dynamodb",
    },
  };

  const eventPath = join(tempDir, "event.json");
  writeFileSync(eventPath, JSON.stringify(event, null, 2));

  process.env.GITHUB_EVENT_PATH = eventPath;
  process.env.GITHUB_EVENT_NAME = "pull_request";
});

test(
  "GitHub Action runs without errors",
  async () => {
    // Import your main script
    // You may need to adjust the import path
    await import("../src/main");

    // You can add assertions here if your script exports functions
    // For now, we just ensure it runs without throwing
    expect(true).toBe(true);
  },
  {
    timeout: 60_000,
  }
);
