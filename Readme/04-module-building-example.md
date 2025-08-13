## Module Building Guide

Once you have cloned the template repository and followed the initial setup, you can start building your own Hugo modules. This guide provides an overview of how to structure and build modules effectively.

## Initialize the Module

- Be in a directory where you want to create your module.
- Run the following command to initialize a new module:

```bash
hugo mod init github.com/yourusername/hb-ags-hello
```

This command creates a `go.mod` file that defines your module and its dependencies.

---

### 1. Module Definition (go.mod)

```go
module github.com/agsayyed/hb-ags-hello

go 1.19

require (
  github.com/hbstack/hb v0.6.0 // indirect
  github.com/hbstack/hugopress v0.6.0 // indirect if you are using hugopress
)
```

### 2. Default Parameters (data/hb/modules/ags_hello/params.yaml)

```yaml
# Default parameters for AGS Hello module
enabled: true
title: 'AGS Hello World'
message: 'Your first AGS module is working!'
show_button: true
button_text: 'Click Me'
background_color: '#f8f9fa'
text_color: '#212529'
```

### 3. Module Template (layouts/partials/hb/modules/ags-hello/index.html)

```html
{{- /* AGS Hello World Module */ -}} {{ $params := default dict (index
site.Data.hb.modules "ags_hello") }} {{ $context := dict "params" $params "page"
. }} {{- with $params -}} {{- if default true .enabled -}}
<div
  class="hb-ags-hello"
  {{-
  with
  .background_color
  }}
  style="background-color: {{ . }};"
  {{
  end
  }}
>
  {{- /* Call pre-content hooks */ -}} {{ partial
  "hugopress/functions/render-hooks" (dict "hooks" "ags-hello-begin" "context"
  $context) }}

  <h2
    class="hb-ags-hello-title"
    {{-
    with
    .text_color
    }}
    style="color: {{ . }};"
    {{
    end
    }}
  >
    {{ .title | default "AGS Hello World" }}
  </h2>

  <div class="hb-ags-hello-message">
    {{ .message | default "This is a basic AGS module for HBStack." }}
  </div>

  {{- if default false .show_button -}}
  <button class="btn btn-primary hb-ags-hello-button">
    {{ .button_text | default (i18n "ags_hello_button_text" | default "Click
    Me") }}
  </button>
  {{- end -}} {{- /* Call post-content hooks */ -}} {{ partial
  "hugopress/functions/render-hooks" (dict "hooks" "ags-hello-end" "context"
  $context) }}
</div>
{{- end -}} {{- end -}}
```

### 4. Hook Implementation (layouts/partials/hugopress/modules/hb-ags-hello/hooks/ags-hello-begin.html)

```html
{{- /* Begin Hook for AGS Hello module */ -}} {{ $context := .context }} {{
$params := $context.params }} {{- /* Optional content to be inserted at the
beginning of the module */ -}}
<div class="hb-ags-hello-hook-content">
  <div class="small text-muted mb-2">Powered by AGS Module</div>
</div>
```

### 5. Default Attributes (layouts/partials/hugopress/modules/hb-ags-hello/attributes/default.html)

```html
{{- /* Default attributes for AGS Hello module */ -}} class="p-3 rounded
shadow-sm mb-4"
```

### 6. SCSS Variables (assets/hb/modules/ags-hello/scss/variables.tmpl.scss)

```scss
// AGS Hello module SCSS variables
// This file can access Hugo parameters through templating

// Get module parameters with fallbacks
$ags-hello-background: {{ site.Params.hb.ags_hello.background_color | default "#f8f9fa" }};
$ags-hello-text-color: {{ site.Params.hb.ags_hello.text_color | default "#212529" }};
$ags-hello-border-radius: 0.5rem;
$ags-hello-padding: 1.5rem;
$ags-hello-margin-bottom: 2rem;
```

### 7. SCSS Styles (assets/hb/modules/ags-hello/scss/index.scss)

```scss
// AGS Hello module styles
@import 'variables';

.hb-ags-hello {
  margin-bottom: $ags-hello-margin-bottom;
  padding: $ags-hello-padding;
  background-color: $ags-hello-background;
  border-radius: $ags-hello-border-radius;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &-title {
    color: $ags-hello-text-color;
    font-size: 1.75rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  &-message {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  &-button {
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  &-hook-content {
    margin-bottom: 0.75rem;
  }
}

// Media queries for responsive design
@media (max-width: 768px) {
  .hb-ags-hello {
    padding: 1rem;

    &-title {
      font-size: 1.5rem;
    }

    &-message {
      font-size: 1.1rem;
    }
  }
}
```

### 8. TypeScript Implementation (assets/hb/modules/ags-hello/js/index.ts)

```typescript
// AGS Hello module functionality

/**
 * Module class for hb-ags-hello
 */
class AGSHelloModule {
  private elements: HTMLElement[];
  private initialized: boolean = false;

  constructor() {
    this.elements = Array.from(document.querySelectorAll('.hb-ags-hello'));
  }

  /**
   * Initialize the module
   */
  public init(): void {
    if (this.initialized || this.elements.length === 0) {
      return;
    }

    this.initialized = true;
    console.log('AGS Hello module initialized');

    // Set up event listeners
    this.setupEventListeners();
  }

  /**
   * Set up event listeners for buttons
   */
  private setupEventListeners(): void {
    this.elements.forEach((element) => {
      const button = element.querySelector('.hb-ags-hello-button');

      if (button) {
        button.addEventListener('click', () => this.handleButtonClick(element));
      }
    });
  }

  /**
   * Handle button clicks
   */
  private handleButtonClick(element: HTMLElement): void {
    // Toggle a class or perform an action when clicked
    element.classList.toggle('hb-ags-hello--active');

    // Example: Change the message text when clicked
    const messageEl = element.querySelector('.hb-ags-hello-message');
    if (messageEl) {
      messageEl.textContent =
        'Button clicked! The module is working perfectly.';
    }
  }
}

// Initialize the module when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const module = new AGSHelloModule();
  module.init();
});

// Export the class for potential external use
export { AGSHelloModule };
```

### 9. Translations (i18n/en.yaml)

```yaml
# English translations for AGS Hello module
- id: ags_hello_button_text
  translation: 'Click Me'

- id: ags_hello_title
  translation: 'AGS Hello World'

- id: ags_hello_message
  translation: 'Your first AGS module for HBStack is working!'
```

### 10. Example Shortcode (layouts/shortcodes/ags-hello.html)

```html
{{- /* Shortcode to include the AGS Hello module */ -}} {{ partial
"hb/modules/ags-hello/index" . }}
```

## Using the Module in a Site

To use this module in a Hugo site with HBStack:

```yaml
# In your site's hugo.yaml
module:
  imports:
    # Other imports
    - path: github.com/hbstack/hb
    - path: github.com/agsayyed/hb-ags-hello

params:
  hb:
    ags_hello:
      enabled: true
      title: 'Welcome to My Site'
      message: 'This is powered by my custom AGS module.'
      show_button: true
      button_text: 'Learn More'
      background_color: '#f0f8ff'
      text_color: '#0d6efd'
```

---
