import { RuleTester } from "eslint";
import { describe, it } from "vitest";
import rule from "../http-client.js";

describe("http-client", () => {
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
					HttpClient: "readonly",
					client: "readonly",
				},
			},
		});

		ruleTester.run("http-client", rule, {
			valid: [
				{
					code: `fetch('/foo').then(res => res.json());`,
				},
			],
			invalid: [
				{
					code: `import HttpClient from 'src/service/http-client.service';`,
					output: "",
					errors: [
						{
							message: "Remove HttpClient import as fetch will be used instead",
						},
					],
				},
				{
					code: `const client = new HttpClient(); client.get('/foo', (res) => console.log(res));`,
					output: `const client = new HttpClient(); fetch('/foo')
    .then(response => response.text())
    .then((res) => {
        console.log(res)
    });`,
					errors: [{ message: "Use fetch API instead of client.get" }],
				},
				{
					code: `const client = new HttpClient(); client.post('/foo', { foo: 'bar' }, (res) => console.log(res));`,
					output: `const client = new HttpClient(); fetch('/foo', {\n    method: 'POST',\n    headers: {\n        'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({ foo: 'bar' })\n})\n    .then(response => response.text())\n    .then((res) => {\n        console.log(res)\n    });`,
					errors: [{ message: "Use fetch API instead of client.post" }],
				},
			],
		});
	});
});
