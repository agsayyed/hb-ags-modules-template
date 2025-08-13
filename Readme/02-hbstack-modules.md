### Building Hbstack Modules

The [example](./01-hugo-modules.md) is a basic structure for building a Hugo module which can be used in conjunction with HBstack modules taking advantage of assets management and assets building.

However, if you are using the `Hbstack` framework, the structure and implementation will be slightly different. The `Hbstack` framework provides additional features and conventions for building modules.

HBStack modules are designed to extend the functionality of Hugo sites by providing reusable components. This guide will help you create a custom HBStack module. There are two ways to create a module one with using hugopress and the other without using hugopress.

### Modules without hugopress

- A Hugopress module is a Hugo module which allows you some functionality using hugo module structure with a specific structure and conventions. The structure of the module is slightly different from the one which does not use hugopress. Below is the structure of a module which does not use hugopress.

```bash
my_module/
├── assets/
│   └── hb/
│       └── modules/
│           └── my_module/
│               ├── js/
│               │   └── index.ts
│               └── scss/
│                   ├── index.scss
│                   └── variables.tmpl.scss
|── layouts/
│   └── partials/
│       ├── hb/
│       │   └── modules/
│       │       └── my_module/
│       │           └── index.html
```

### Modules with hugopress

- A Hugopress module is a Hugo module which allows you some functionality to create a module with a specific structure and conventions. The structure of the module is slightly different from the one which does not use hugopress. Below is the structure of a module which uses hugopress.

```bash
my_module/
├── assets/
│   └── hb/
│       └── modules/
│           └── my_module/
│               ├── js/
│               │   └── index.ts
│               └── scss/
│                   ├── index.scss
│                   └── variables.tmpl.scss
├── layouts/
│   └── partials/
│       ├── hugopress/
│       │   └── modules/
│       │       └── hb-vendor-my_module/hooks/
│       │           └── body-end.html
```

- The difference between the two structures is that the `layouts/partials/hugopress/modules/hb-vendor-my_module/hooks/` directory is used to store hooks for the module. The naming conventions for the module and its assets are also slightly different, as they follow the `hb-vendor-my_module` pattern.

> Note: The use of `hb-` prefix is handy when one is extending the functionality of the `Hbstack` provided module. If it is not then there is no need to use `hb-` prefix, as it allows for better organization and prevents conflicts with other modules. Also note that the `hb-` prefix is used in the `hugopress` module structure to indicate that it is a module provided by the `Hbstack` framework and not in assets or data directories.

## Module Structure for AGS Vendor

Here's the complete structure for your HBStack module using `ags` as the vendor name with and without `hugopress`:

```bash
hb-ags-hello/                     # Repository name
├── assets/
│   └── hb/
│       └── modules/
│           └── ags-hello/        # kebab-case in assets
│               ├── js/
│               │   └── index.ts
│               └── scss/
│                   ├── index.scss
│                   └── variables.tmpl.scss
├── data/
│   └── hb/
│       └── modules/
│           └── ags_hello/        # snake_case in data
│               └── params.yaml
├── go.mod
├── i18n/
│   └── en.yaml
└── layouts/
    └── partials/
        ├── hb/
        │   └── modules/
        │       └── ags-hello/    # kebab-case in hb modules
        │           └── index.html
        └── hugopress/
            └── modules/
                └── hb-ags-hello/ # prefixed with hb- in hugopress with vendor ags
                    ├── attributes/
                    │   └── default.html
                    └── hooks/
                        └── ags-hello-begin.html
```

- This structure ensures that your module is organized and follows the conventions for HBStack modules, making it easy to integrate with the framework. Let's implement each key file.
