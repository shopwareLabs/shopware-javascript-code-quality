export default {
	meta: {
		type: "suggestion",
		docs: {
			description: "Replace DomAccessHelper methods with native DOM methods",
			category: "Migration",
			recommended: true,
		},
		fixable: "code",
	},

	create(context) {
		let importedHelperName = null;

		return {
			ImportDeclaration(node) {
				// Check if import is from dom-access.helper
				if (node.source.value === "src/helper/dom-access.helper") {
					if (node.specifiers && node.specifiers.length > 0) {
						const defaultImport = node.specifiers.find(
							(spec) => spec.type === "ImportDefaultSpecifier",
						);
						if (defaultImport) {
							importedHelperName = defaultImport.local.name;
						}
					}

					context.report({
						node,
						message: "Use native DOM methods instead of DomAccessHelper",
						fix(fixer) {
							return fixer.remove(node);
						},
					});
				}
			},

			CallExpression(node) {
				if (
					node.callee.type === "MemberExpression" &&
					node.callee.object.name === (importedHelperName || "DomAccessHelper")
				) {
					const method = node.callee.property.name;
					const args = node.arguments;

					const dataSetKey = toCamelCase(
						context
							.getSourceCode()
							.getText(args[1])
							.replace(/^data-/, ""),
					);

					const fixes = {
						getDataAttribute: () =>
							`${context.getSourceCode().getText(args[0])}.dataset['${dataSetKey}']`,
						hasAttribute: () =>
							`${context.getSourceCode().getText(args[0])}.hasAttribute(${context.getSourceCode().getText(args[1])})`,
						getAttribute: () =>
							`${context.getSourceCode().getText(args[0])}.getAttribute(${context.getSourceCode().getText(args[1])})`,
						querySelector: () =>
							`${context.getSourceCode().getText(args[0])}.querySelector(${context.getSourceCode().getText(args[1])})`,
						querySelectorAll: () =>
							`${context.getSourceCode().getText(args[0])}.querySelectorAll(${context.getSourceCode().getText(args[1])})`,
					};

					if (fixes[method]) {
						context.report({
							node,
							message: `Use native DOM method instead of ${importedHelperName || "DomAccessHelper"}.${method}`,
							fix(fixer) {
								return fixer.replaceText(node, fixes[method]());
							},
						});
					}
				}
			},
		};
	},
};

function toCamelCase(str) {
	return str
		.replace(/['"]/g, "")
		.replace(/^data-/, "")
		.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}
