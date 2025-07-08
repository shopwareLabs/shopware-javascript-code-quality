import { RuleTester } from "eslint";
import { describe, it } from "vitest";
import rule from "../no-sw-extension-override";

describe("no-sw-extension-override", () => {
  const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2015, sourceType: "module" },
  });

  it("should be a valid override", () => {
    ruleTester.run("no-sw-extension-override", rule, {
      valid: [
        {
          code: `Shopware.Component.override('sw-foo', {})`,
        },
        {
          code: `Shopware.Component.extend('sw-extension-foo', {})`,
        },
        {
          code: `const { Component } = Shopware; Component.extend('sw-extension-foo', {})`,
        },
        {
          code: `const Component = Shopware.Component; Component.extend('sw-extension-foo', {})`,
        },
      ],
      invalid: [],
    });
  });

  it("should be an invalid override", () => {
    ruleTester.run("no-sw-extension-override", rule, {
      valid: [],
      invalid: [
        {
          code: `Shopware.Component.override('sw-extension-foo', {})`,
          errors: [
            { message: "Changing the Shopware Extension Manager is not allowed" },
          ],
        },
        {
          code: `const { Component } = Shopware; Component.override('sw-extension-foo', {})`,
          errors: [
            { message: "Changing the Shopware Extension Manager is not allowed" },
          ],
        },
        {
          code: `const Component = Shopware.Component; Component.override('sw-extension-foo', {})`,
          errors: [
            { message: "Changing the Shopware Extension Manager is not allowed" },
          ],
        },
      ],
    });
  });
});
