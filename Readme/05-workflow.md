## Workflow for Managing HBStack Modules

This document outlines the workflow for managing HBStack modules using this template. It includes steps for development, versioning, and automation.

### Workflow Overview

1. **Local Development**:
   - Commit changes using conventional commits (e.g., `feat: add new feature`).
   - Run linting, formatting, and testing locally.

2. **Prepare for Release**:
   - Run the `sync-version.js` script to update the `package.json` version:

     ```bash
     npm run sync-version
     ```

   - Tag the release:

     ```bash
     git tag -a v1.0.0 -m "Release v1.0.0"
     ```

   - Push the tag and changes to the remote repository:

     ```bash
     git push origin main --tags
     ```

3. **CI/CD Pipeline**:
   - The pipeline is triggered by the push to the `main` branch or the new tag.
   - Steps in the pipeline:
     - Run `sync-version.js` to ensure `package.json` is up-to-date.
     - Build, test, and deploy the module.

4. **Automated Updates**:
   - Use `renovate` for dependency updates.
   - Use `mergify` for automated merging of pull requests.

### Tools and Automation

### `sync-version.js`

- Ensures the `package.json` version matches the latest Git tag.
- Run it before tagging a release to keep versions consistent.

### `release-please`

- Automates versioning and changelog generation.
- Creates release pull requests with updated changelogs.

### `renovate`

- Keeps dependencies up-to-date.
- Automatically merges minor and patch updates if configured.

### `mergify` (Optional)

- Automates merging of pull requests created by `release-please` and `renovate`.
- Example configuration:

  ```yaml
  pull_request_rules:
    - name: Automerge Renovate and Release-Please PRs
      conditions:
        - author=renovate[bot]
        - author=release-please[bot]
        - status-success=CI
        - label=automerge
      actions:
        merge:
          method: squash
  ```

## Summary

This workflow ensures that your modules are consistently versioned, tested, and deployed. By automating key steps, it reduces manual effort and minimizes errors.

---

## How to Set Up This Repository Remotely

This section provides a summary of the steps we followed to initialize and upload this repository to a remote GitHub repository.

### Steps to Initialize and Upload the Repository

1. **Initialize the Git Repository**:
   - Run the following command to initialize the repository:

     ```bash
     git init
     ```

   - Add all files to the repository:

     ```bash
     git add .
     ```

   - Make the initial commit:

     ```bash
     git commit -m "chore: initial commit"
     ```

2. **Create a Remote Repository**:
   - Go to [GitHub](https://github.com/) and create a new repository (e.g., `hb-ags-modules-template`).
   - Copy the repository URL.

3. **Add the Remote Repository**:
   - Add the remote URL to your local repository:

     ```bash
     git remote add origin https://github.com/<your-username>/hb-ags-modules-template.git
     ```

   - Verify the remote URL:

     ```bash
     git remote -v
     ```

4. **Push the Repository**:
   - Push the `main` branch to the remote repository:

     ```bash
     git push -u origin main
     ```

5. **Create and Push the `dev` Branch**:
   - Create the `dev` branch:

     ```bash
     git checkout -b dev
     ```

   - Push the `dev` branch to the remote repository:

     ```bash
     git push -u origin dev
     ```

6. **Push Tags**:
   - If you have created tags locally, push them to the remote repository:

     ```bash
     git push origin --tags
     ```

7. **Verify the Remote Repository**:
   - Go to your GitHub repository page and verify that the files, branches, and tags are visible.

This process ensures that the repository is properly initialized and uploaded to a remote GitHub repository, ready for further development and automation.

---

## Setting Up Renovate and Its Configuration

Renovate is a tool used to automate dependency updates. This section explains how to set up Renovate for this repository and configure it effectively.

### Steps to Set Up Renovate

1. **Install Renovate**:
   - Go to the [Renovate GitHub App](https://github.com/apps/renovate).
   - Install the app for your GitHub account or organization.
   - Select the repository (`hb-ags-modules-template`) or enable it for all repositories.

2. **Configure Renovate**:
   - Ensure a `renovate.json` file is present in the repository. This file defines how Renovate manages updates.
   - Example `renovate.json` configuration:

     ```json
     {
       "extends": ["config:base"],
       "automerge": true,
       "packageRules": [
         {
           "matchUpdateTypes": ["minor", "patch"],
           "automerge": true
         },
         {
           "matchUpdateTypes": ["major"],
           "automerge": false
         }
       ],
       "baseBranches": ["dev"],
       "labels": ["dependencies"],
       "prHourlyLimit": 5,
       "prConcurrentLimit": 10
     }
     ```

3. **Push the Configuration**:
   - Add and commit the `renovate.json` file:

     ```bash
     git add renovate.json
     git commit -m "chore: add renovate configuration"
     git push origin dev
     ```

4. **Verify Renovate**:
   - Check the **Pull Requests** section of your repository to see if Renovate has created any PRs for dependency updates.
   - Merge the onboarding PR if it exists.

### Key Settings in `renovate.json`

- **`extends`**: Inherits base configurations from Renovate.
- **`automerge`**: Enables automatic merging for specific update types.
- **`packageRules`**: Defines rules for handling updates (e.g., automerge for minor/patch updates).
- **`baseBranches`**: Specifies the branch where Renovate creates pull requests (e.g., `dev`).
- **`labels`**: Adds labels to Renovate PRs (e.g., `dependencies`).
- **`prHourlyLimit` and `prConcurrentLimit`**: Limits the number of PRs Renovate creates per hour and concurrently.

### Summary

Renovate simplifies dependency management by automating updates and creating pull requests. By configuring it properly, you can ensure your dependencies are always up-to-date with minimal manual effort.
