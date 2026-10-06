import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev server only. Since Next 16.4, a page opened from a host other than localhost does not
  // hydrate unless the host is listed here. For a phone check, run `npm run dev -- -H <LAN IP>`.
  allowedDevOrigins: ["127.0.0.1"],
  // Do not write frontend/AGENTS.md when an AI agent runs `next dev`; agents read CLAUDE.md.
  agentRules: false,
};

export default nextConfig;
