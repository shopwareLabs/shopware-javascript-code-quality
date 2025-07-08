import { RuleTester } from "eslint";
import rule from "../no-snippet-import";

const ruleTester = new RuleTester({
	languageOptions: { ecmaVersion: 2015, sourceType: "module" },
});

ruleTester.run("no-snippet-import", rule, {
	valid: [
		{
			code: `Shopware.Module.register('my-module', { routes: {} })`,
		},
		{
			code: `Module.register('my-module', { routes: {} })`,
		},
	],
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
