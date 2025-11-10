import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), "../.env.local") });

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
