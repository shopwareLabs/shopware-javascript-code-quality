import { RuleTester } from "eslint";
import { describe, it } from "vitest";
import rule from "../no-snippet-import";

describe("no-snippet-import", () => {
  const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2015, sourceType: "module" },
  });

  it("should be a valid module registration", () => {
    ruleTester.run("no-snippet-import", rule, {
      valid: [
        {
          code: `Shopware.Module.register('my-module', { routes: {} })`,
        },
        {
          code: `Module.register('my-module', { routes: {} })`,
        },
      ],
      invalid: [],
    });
  });

  it("should be an invalid module registration", () => {
    ruleTester.run("no-snippet-import", rule, {
      valid: [],
      invalid: [
        {
          code: `Shopware.Module.register('my-module', { snippets: {} })`,
          errors: [
            {
              message:
                "Passing 'snippets' to Shopware.Module.register is forbidden as it increases the bundle size. Snippets are automatically loaded when they are placed in a folder named snippet.",
            },
          ],
        },
        {
          code: `Module.register('my-module', { snippets: {} })`,
          errors: [
            {
              message:
                "Passing 'snippets' to Shopware.Module.register is forbidden as it increases the bundle size. Snippets are automatically loaded when they are placed in a folder named snippet.",
            },
          ],
        },
      ],
    });
  });
});
