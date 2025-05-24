import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Deployment Configuration Tests", () => {
  it("should have correct Next.js version", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8")
    );
    expect(packageJson.dependencies.next).toBeDefined();
    expect(packageJson.dependencies.next).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("should have required build scripts", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8")
    );
    expect(packageJson.scripts.build).toBe("next build");
    expect(packageJson.scripts.start).toBe("next start");
  });

  it("should have proper Next.js configuration", () => {
    const nextConfig = fs.readFileSync(
      path.join(process.cwd(), "next.config.mjs"),
      "utf-8"
    );
    expect(nextConfig).toContain("images:");
    expect(nextConfig).toContain("experimental:");
  });

  it("should have proper TypeScript configuration", () => {
    const tsConfig = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "tsconfig.json"), "utf-8")
    );
    expect(tsConfig.compilerOptions.strict).toBe(true);
    expect(tsConfig.compilerOptions.esModuleInterop).toBe(true);
  });

  it("should have proper environment variables", () => {
    const envFile = fs.readFileSync(
      path.join(process.cwd(), ".env.example"),
      "utf-8"
    );
    expect(envFile).toContain("NEXT_PUBLIC_");
  });

  it("should have proper image optimization configuration", () => {
    const nextConfig = fs.readFileSync(
      path.join(process.cwd(), "next.config.mjs"),
      "utf-8"
    );
    expect(nextConfig).toContain("images:");
  });

  it("should have proper build output configuration", () => {
    const nextConfig = fs.readFileSync(
      path.join(process.cwd(), "next.config.mjs"),
      "utf-8"
    );
    expect(nextConfig).toContain("output:");
  });
});
