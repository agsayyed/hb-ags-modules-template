const { execSync } = require('child_process');
const fs = require('fs');

// Step 1: Sync version in package.json
console.log('Syncing version in package.json...');
execSync('npm run sync-version');

// Step 2: Get the repository URL
console.log('Fetching repository URL...');
const repoUrl = execSync('git remote get-url origin').toString().trim();

// Step 3: Run release-please to create a release PR
console.log('Running release-please to create a release PR...');
execSync(`npx release-please release-pr --token=$GITHUB_TOKEN --repo-url=${repoUrl}`, { stdio: 'inherit' });

// Step 4: Update ReadMe.md with the latest version
console.log('Updating ReadMe.md with the latest version...');
const version = execSync('git describe --tags --abbrev=0').toString().trim();
const readmePath = './Readme.md';
let readme = fs.readFileSync(readmePath, 'utf8');
readme = readme.replace(/Version: v[0-9.]+/, `Version: v${version}`);
fs.writeFileSync(readmePath, readme);
console.log(`Updated ReadMe.md to version ${version}`);
