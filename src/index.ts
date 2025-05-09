#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";
import { editionListUrl, languageList, surahUrl } from "./lib/constant.js";
// import fetch from "node-fetch"; // Only needed if Node <18

const server = new McpServer({
  name: "mosleem",
  description: "A tool getting data for quran",
  version: "0.0.1",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "language-list",
  "getting list all language may supported wint some edition",
  async () => {
    try {
      const url = languageList();
      const response = await fetch(url);
      const data = await response.text();
      return {
        content: [{ type: "text", text: data }],
      };
    } catch (err) {
      console.error(err);
      return {
        content: [{ type: "text", text: "Failed to fetch language list" }],
      };
    }
  }
);

server.tool(
  "getting editiion list",
  "edition list is name of recitation  quran with any language",
  async () => {
    try {
      const url = editionListUrl();
      const response = await fetch(url);
      const data = await response.text();
      return {
        content: [{ type: "text", text: data }],
      };
    } catch (err) {
      console.error(err);
      return {
        content: [{ type: "text", text: "Failed to fetch edition list" }],
      };
    }
  }
);

server.tool(
  "getting surah by edition",
  "choise surah recitation, and language wich you want to read",
  {
    identifier: z
      .string()
      .describe(
        "you can get identifiet from edition-list.identifier, identifierhas incloude language code "
      ),
    surah: z.number().min(1).max(114).describe(" number must be 001 - 114"),
  },
  async ({ identifier, surah }) => {
    try {
      let surahs = `00${surah.toString()}`;
      if (surahs.length > 3) {
        surahs = surahs.slice(-3);
      }
      const url = surahUrl(identifier, surahs);
      console.log(url);
      const response = await fetch(url);
      const data = await response.text();
      return {
        content: [{ type: "text", text: data }],
      };
    } catch (err) {
      console.error(err);
      return {
        content: [{ type: "text", text: "Failed to fetch edition list" }],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
