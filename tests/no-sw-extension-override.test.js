import { RuleTester } from "eslint";
import rule from "../no-sw-extension-override";

const ruleTester = new RuleTester({
	languageOptions: { ecmaVersion: 2015, sourceType: "module" },
});

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
