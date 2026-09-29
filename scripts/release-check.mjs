import { loadEnv } from "vite";
const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const missing = ["SITE_URL", "PUBLIC_INQUIRY_ENDPOINT"].filter(
  (key) => !env[key],
);
if (missing.length || env.PUBLIC_RELEASE_READY !== "true") {
  console.error(
    "Release blocked. Preview only. Required configuration:",
    missing.join(", "),
    "PUBLIC_RELEASE_READY=true",
  );
  process.exit(1);
}
console.log(
  "Configuration present. Business approval, privacy, integration tests, project status and migration gates still require review.",
);
