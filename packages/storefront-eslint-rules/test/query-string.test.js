import { RuleTester } from "eslint";
import { describe, it } from "vitest";
import rule from "../query-string.js";

describe("query-string", () => {
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

		ruleTester.run("query-string", rule, {
			valid: [
				{
					code: "const params = new URLSearchParams(window.location.search);",
				},
			],
			invalid: [
				{
					code: `import querystring from 'query-string';`,
					output: "",
					errors: [
						{
							message:
								"Remove querystring import as URLSearchParams is used instead",
						},
					],
				},
				{
					code: "const params = querystring.parse(window.location.search);",
					output:
						"const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());",
					errors: [
						{ message: "Use URLSearchParams instead of querystring.parse" },
					],
				},
				{
					code: `const params = querystring.stringify({ foo: 'bar' });`,
					output: `const params = new URLSearchParams({ foo: 'bar' }).toString();`,
					errors: [
						{ message: "Use URLSearchParams instead of querystring.stringify" },
					],
				},
			],
		});
	});
});
