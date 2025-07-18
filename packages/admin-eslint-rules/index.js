import { compareVersions } from "compare-versions";
import requireExplicitEmits from "./6.7/require-explict-emits.js";
import noVuex from "./6.7/state-import.js";
import noSnippetImport from "./no-snippet-import.js";
import noSrcImport from "./no-src-import.js";
import noSwExtensionOverride from "./no-sw-extension-override.js";

let rules = {
	"no-src-import": noSrcImport,
	"no-snippet-import": noSnippetImport,
	"no-sw-extension-override": noSwExtensionOverride,
	"no-shopware-store": noVuex,
	"require-explict-emits": requireExplicitEmits,
};

if (process.env.SHOPWARE_VERSION) {
	rules = Object.fromEntries(
		Object.entries(rules).filter(([_, rule]) => {
			if (!rule.meta?.minShopwareVersion) {
				return true;
			}

			return (
				compareVersions(
					process.env.SHOPWARE_VERSION,
					rule.meta.minShopwareVersion,
				) >= 0
			);
		}),
	);
}

const config = {
	plugins: {
		"shopware-admin": {
			rules: rules,
		},
	},
	rules: {},
};

Object.keys(rules).forEach((ruleName) => {
	config.rules[`shopware-admin/${ruleName}`] = "error";
});

export default config;
