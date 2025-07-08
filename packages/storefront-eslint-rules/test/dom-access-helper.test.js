import { RuleTester } from "eslint";
import { describe, it } from "vitest";
import rule from "../dom-access-helper.js";

describe("dom-access-helper", () => {
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
					element: "readonly",
				},
			},
		});

		ruleTester.run("dom-access-helper", rule, {
			valid: [
				{
					code: `
                const element = document.querySelector('.foo');
                element.dataset.foo = 'bar';
              `,
				},
			],
			invalid: [
				{
					code: `import DomAccessHelper from 'src/helper/dom-access.helper';`,
					output: "",
					errors: [
						{ message: "Use native DOM methods instead of DomAccessHelper" },
					],
				},
				{
					code: `const value = DomAccessHelper.getDataAttribute(element, 'data-foo');`,
					output: `const value = element.dataset['foo'];`,
					errors: [
						{
							message:
								"Use native DOM method instead of DomAccessHelper.getDataAttribute",
						},
					],
				},
				{
					code: `const has = DomAccessHelper.hasAttribute(element, 'data-foo');`,
					output: `const has = element.hasAttribute('data-foo');`,
					errors: [
						{
							message:
								"Use native DOM method instead of DomAccessHelper.hasAttribute",
						},
					],
				},
				{
					code: `const attr = DomAccessHelper.getAttribute(element, 'data-foo');`,
					output: `const attr = element.getAttribute('data-foo');`,
					errors: [
						{
							message:
								"Use native DOM method instead of DomAccessHelper.getAttribute",
						},
					],
				},
				{
					code: `const el = DomAccessHelper.querySelector(element, '.foo');`,
					output: `const el = element.querySelector('.foo');`,
					errors: [
						{
							message:
								"Use native DOM method instead of DomAccessHelper.querySelector",
						},
					],
				},
				{
					code: `const els = DomAccessHelper.querySelectorAll(element, '.foo');`,
					output: `const els = element.querySelectorAll('.foo');`,
					errors: [
						{
							message:
								"Use native DOM method instead of DomAccessHelper.querySelectorAll",
						},
					],
				},
			],
		});
	});
});
