import fs from "fs";
import { execSync } from "child_process";

try {
  // Get the latest Git tag that follows semantic versioning (starts with 'v' followed by numbers)
  const gitOutput = execSync('git tag --list "v*" --sort=-version:refname', { encoding: "utf8" });
  const tags = gitOutput
    .trim()
    .split("\n")
    .filter((tag) => tag.match(/^v\d+\.\d+\.\d+/));

  if (tags.length === 0) {
    console.error("No valid version tags found (format: v*.*.*)");
    process.exit(1);
  }

  const version = tags[0]; // Get the latest version tag

  console.log(`Found latest version tag: ${version}`);

  // Read package.json
  const packageJsonPath = "./package.json";
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  // Update version (remove 'v' prefix for package.json)
  packageJson.version = version.replace(/^v/, "");

  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
  console.log(`Updated package.json version to ${packageJson.version}`);
} catch (error) {
  console.error("Error syncing version:", error.message);
  process.exit(1);
}
