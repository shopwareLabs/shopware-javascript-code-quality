import { RuleTester } from "eslint";
import { describe, it } from "vitest";
import rule from "../plugin-manager.js";

describe("plugin-manager", () => {
	it("should be a valid rule", () => {
		const ruleTester = new RuleTester({
			languageOptions: {
				ecmaVersion: 2021,
				sourceType: "module",
				globals: {
					window: "readonly",
					document: "readonly",
					console: "readonly",
					fetch: "readonly",
					URLSearchParams: "readonly",
				},
			},
		});

		ruleTester.run("plugin-manager", rule, {
			valid: [
				{
					code: "const PluginManager = window.PluginManager;",
				},
				{
					code: "const PluginBaseClass = window.PluginBaseClass;",
				},
			],
			invalid: [
				{
					code: `import PluginManager from 'src/plugin-system/plugin.manager';`,
					output: "const PluginManager = window.PluginManager;",
					errors: [
						{
							message:
								"Import from plugin.manager should use window.PluginManager",
						},
					],
				},
				{
					code: `import Plugin from 'src/plugin-system/plugin.class';`,
					output: "const Plugin = window.PluginBaseClass;",
					errors: [
						{
							message:
								"Import from src/plugin-system/plugin.class should use window.PluginBaseClass",
						},
					],
				},
			],
		});
	});
});
