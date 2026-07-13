import dotenv from "dotenv";
import path from "path";
import process from "process";
import { defineConfig } from "prisma/config";

dotenv.config({ path: path.join(process.cwd(), "..", ".env") });

export default defineConfig({
  schema: "prisma/schema",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
