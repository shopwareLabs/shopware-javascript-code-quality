import DomAccessHelper from "./dom-access-helper.js";
import HttpClient from "./http-client.js";
import MigratePluginManager from "./plugin-manager.js";
import QueryString from "./query-string.js";

export default {
	plugins: {
		"shopware-storefront": {
			rules: {
				"migrate-plugin-manager": MigratePluginManager,
				"no-dom-access-helper": DomAccessHelper,
				"no-http-client": HttpClient,
				"no-query-string": QueryString,
			},
		},
	},
	rules: {
		"shopware-storefront/migrate-plugin-manager": "error",
		"shopware-storefront/no-dom-access-helper": "warn",
		"shopware-storefront/no-http-client": "warn",
		"shopware-storefront/no-query-string": "warn",
	},
};
