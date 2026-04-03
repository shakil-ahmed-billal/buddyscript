import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Silence workspace root warning by providing the absolute root path
  // @ts-ignore
  turbopack: {
    root: path.resolve(process.cwd(), ".."),
  },
};

export default nextConfig;
