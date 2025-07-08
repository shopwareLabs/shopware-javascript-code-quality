# Shopware Administration ESLint Rules

This package provides ESLint rules for the Shopware Administration.

## Installation

You can install this package using npm:

```bash
npm install @shopwarelabs/admin-eslint-rules --save-dev
```

## Usage

Add the following to your `.eslintrc.js` file:

```javascript
module.exports = {
    "plugins": [
        "@shopwarelabs/admin-eslint-rules"
    ],
    "rules": {
        "@shopwarelabs/admin-eslint-rules/no-snippet-import": "error",
        "@shopwarelabs/admin-eslint-rules/no-src-import": "error",
        "@shopwarelabs/admin-eslint-rules/no-sw-extension-override": "error",
        "@shopwarelabs/admin-eslint-rules/require-explict-emits": "error",
        "@shopwarelabs/admin-eslint-rules/state-import": "error"
    }
};
```

## Rules

- `no-snippet-import`: Prevents direct import of snippets.
- `no-src-import`: Prevents direct import of `src` files.
- `no-sw-extension-override`: Prevents overriding of `sw-extension` components.
- `require-explict-emits`: Requires explicit emits in components.
- `state-import`: Enforces correct import of state.
