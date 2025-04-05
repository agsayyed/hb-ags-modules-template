import fs from 'fs';
import { execSync } from 'child_process';

// Get the latest Git tag
const version = execSync('git describe --tags --abbrev=0').toString().trim();

// Read package.json
const packageJsonPath = './package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update version
packageJson.version = version;

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Updated package.json version to ${version}`);
