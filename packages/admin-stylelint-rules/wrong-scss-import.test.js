import stylelint from "stylelint";
import { describe, expect, it } from "vitest";
import { messages, ruleName } from "./wrong-scss-import.js";

const config = {
	plugins: ["./wrong-scss-import.js"],
	rules: {
		[ruleName]: true,
	},
};

describe("stylelint rule", () => {
	it("should fail on wrong import", async () => {
		const {
			results: [{ warnings }],
		} = await stylelint.lint({
			code: `@import "~scss/variables.scss";`,
			config,
		});

		expect(warnings).toHaveLength(1);
		expect(warnings[0].text).toBe(messages.rejected);
	});

	it("should not fail on correct import", async () => {
		const {
			results: [{ warnings }],
		} = await stylelint.lint({
			code: `@import "~scss/variables";`,
			config,
		});

		expect(warnings).toHaveLength(0);
	});

	it("should not fail on correct import with single quotes", async () => {
		const {
			results: [{ warnings }],
		} = await stylelint.lint({
			code: `@import '~scss/variables';`,
			config,
		});

		expect(warnings).toHaveLength(0);
	});

	it("should not fail on other imports", async () => {
		const {
			results: [{ warnings }],
		} = await stylelint.lint({
			code: `@import "./foo.scss";`,
			config,
		});

		expect(warnings).toHaveLength(0);
	});

	it("should fix the import", async () => {
		const {
			results: [{ warnings }],
		} = await stylelint.lint({
			code: `@import "~scss/variables.scss";`,
			config,
			fix: true,
		});

		expect(warnings).toHaveLength(0);
	});

	it("should fix the import with single quotes", async () => {
		const {
			results: [{ warnings }],
		} = await stylelint.lint({
			code: `@import '~scss/variables.scss';`,
			config,
			fix: true,
		});

		expect(warnings).toHaveLength(0);
	});
});
