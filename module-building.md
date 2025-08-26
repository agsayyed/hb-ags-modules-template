## Why Hugo Modules

Hugo modules are a powerful feature that allows you to create reusable components and share them across different Hugo sites. They enable better organization of your code, promote reusability, and simplify the management of dependencies. By using Hugo modules, you can encapsulate functionality, styles, and assets in a structured way, making it easier to maintain and extend your projects.

### Hugo Modules are Go Modules

Hugo modules are built on top of Go modules, which means they follow the same principles of versioning and dependency management. This allows you to leverage the Go ecosystem for managing your Hugo projects, ensuring that your modules are versioned correctly and can be easily shared with others.

### Building Hugo Modules

1. Follow this link to build a [Hugo Module](./hugo-modules.md)

---

## HBstack Framework and Hugomods

HBStack is a framework designed to enhance the capabilities of Hugo modules, providing additional features and conventions for building reusable components. It allows you to create modules that can be easily integrated into Hugo sites, leveraging the power of Hugo's templating system while adhering to best practices for modular development.

### Building HBStack Modules

- Follow this link to build a [HBStack Module](./hbstack-modules.md)

---

### Using the Module Template

This repository provides a template for creating Hugo modules specifically designed for the AGS vendor using the HBStack framework. The template includes a basic structure, default parameters, and example implementations to help you get started quickly.

- Follow this link to learn how to use the [Module Template](./using-module-template.md)

---

### Module Building Guide

This guide provides a comprehensive overview of how to build a custom module for the AGS vendor using the HBStack framework. It includes detailed instructions on folder structure, required files, and example implementations to help you create a fully functional module.

- Follow this link to read the [Module Building Guide](./module-building-example.md)

---

### Environment Setup

This section covers the development environment setup for building HBStack modules, including package management, formatting tools, and VS Code configuration.

#### Package Management with pnpm

This project uses **pnpm** instead of npm for faster and more efficient package management:

```bash
# Install pnpm globally if not already installed
npm install -g pnpm

# Install dependencies
pnpm install

# Add new dependencies
pnpm add <package-name>

# Add development dependencies
pnpm add -D <package-name>
```

#### Package.json Structure

The `package.json` is organized to separate build tools from development-only tools:

**Dependencies (Production/Build Tools):**

- `postcss`, `postcss-cli`, `autoprefixer` - CSS processing and optimization
- `@fullhuman/postcss-purgecss` - Unused CSS removal
- `typescript` - TypeScript compilation

**DevDependencies (Development Tools):**

- `prettier`, `prettier-plugin-go-template` - Code formatting for Go templates
- `eslint`, `@typescript-eslint/*` - JavaScript/TypeScript linting
- `stylelint`, `stylelint-config-standard-scss` - SCSS linting
- `markdownlint-cli2` - Markdown linting

#### Go Template Formatting Setup

##### Required Extensions

Install these VS Code extensions for optimal Go template development:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode", // Prettier formatter
    "jinliming2.vscode-go-template", // Go template syntax highlighting
    "budparr.language-hugo-vscode", // Hugo-specific support
    "eliostruyf.vscode-hugo-themer" // Hugo theme development tools
  ]
}
```

##### Prettier Configuration

The `.prettierrc.json` file is configured to handle Go templates:

```json
{
  "plugins": ["prettier-plugin-go-template"],
  "overrides": [
    {
      "files": ["*.html"],
      "options": {
        "parser": "go-template",
        "printWidth": 80,
        "goTemplateBracketSpacing": true
      }
    }
  ]
}
```

##### VS Code Workspace Settings

The workspace configuration (`hb-ags-modules-template.code-workspace`) includes:

```json
{
  "settings": {
    "editor.formatOnSave": true,
    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "prettier.documentSelectors": ["**/*.html"],
    "files.associations": {
      "*.html": "html"
    }
  }
}
```

##### Formatting Go Templates

With the setup complete, you can format Go template files using:

1. **Right-click method**: Right-click in any `.html` file → "Format Document"
2. **Keyboard shortcut**: `Shift+Alt+F` (Linux/Windows) or `Shift+Option+F` (Mac)
3. **Command palette**: `Ctrl+Shift+P` → "Format Document"
4. **Auto-format**: Files automatically format on save

**Example formatted Go template:**

```go
{{- $data := "" }}
{{- $flush := false }}
{{- $alwaysOpen := false }}

{{- if .IsNamedParams }}
  {{- $data = .Get "data" }}
  {{- if isset .Params "flush" }}{{ $flush = .Get "flush" }}{{ end }}
  {{- if isset .Params "alwaysOpen" }}{{ $alwaysOpen = .Get "alwaysOpen" }}{{ end }}
{{- else }}
  {{- $data = .Get 0 }}
{{- end }}
```

#### Development Scripts

Common development commands available via pnpm:

```bash
# Linting
pnpm run lint          # Run all linters
pnpm run lint:js       # Lint JavaScript/TypeScript
pnpm run lint:scss     # Lint SCSS files
pnpm run lint:md       # Lint Markdown files

# Formatting
pnpm run format        # Format all files
pnpm run format:md     # Format Markdown files
```

#### Syntax Highlighting:

The `jinliming2.vscode-go-template` extension provides:

- **Syntax highlighting** for Go template tags (`{{`, `}}`, `{{-`, `-}}`)
- **Bracket matching** for template expressions
- **Code folding** for template blocks
- **IntelliSense** support for Hugo functions and variables

This setup ensures a smooth development experience with proper formatting, linting, and syntax highlighting for all file types in your HBStack module project.
