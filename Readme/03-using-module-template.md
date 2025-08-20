### Start Building a Module

- There is a repository that contains a basic structure for building a Hugo module which can be used in conjunction with HBStack modules, taking advantage of assets management and assets building. You can find it [here](https://github.com/agsayyed/hb-ags-modules-template).

### How to use this template

This template is designed to simplify the creation of new HBStack modules. Follow these steps to create a new module:

1. **Clone the Template**:

   ```bash
   git clone <template-repo-url> new-module-name
   cd new-module-name
   # delete files which are not required
   1. code workspace that comes with template
   2. Package.lock.json
   3. .vscode folder
   4. .git folder
   5.
   ```

2. **Replace Placeholders**:
   - Replace all occurrences of `hb-ags-modules-template` with your new module name in `package.json`, `README.md`, and other relevant files.
   - Update `config.yaml` to include your module's detail.
   - Also include any import required to build the module.

3. **Initialize the Module**:
   - Run `hugo mod init github.com/yourusername/new-module-name` to initialize the module with the correct path.
   - Run the setup script to initialize the module:

     ```bash
     ./setup.sh
     ```

4. **Start Development**:
   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the development server:

     ```bash
     npm run dev
     ```

5. **Test and Build**:
   - Run linting and formatting:

     ```bash
     npm run lint:js
     npm run lint:scss
     npm run format
     ```

   - Build the module:

     ```bash
     npm run build
     ```

6. **Publish the Module**:
   - Commit your changes and push to a remote repository.
   - Tag a release using semantic versioning.

## Automating Module Creation

A `setup.sh` script is included to automate the creation of new modules. This script:

- Replaces placeholders with the new module name.
- Updates configuration files.
- Initializes a new Git repository.

To use the script:

```bash
./setup.sh new-module-name
```

## Template Configuration

The `template-config.yaml` file defines default settings for new modules:

```yaml
default_module_name: 'new-module'
default_author: 'Your Name'
default_license: 'MIT'
```

Update this file to customize the template for your needs.
