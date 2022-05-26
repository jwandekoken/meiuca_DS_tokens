const StyleDictionary = require("style-dictionary");

function registerConfig({ current, buildPath }) {
  return {
    source: [current.source],
    platforms: {
      "web/css": {
        transformGroup: "css",
        buildPath: buildPath.css,
        files: [
          {
            destination: `${current.filename}.css`,
            format: "css/variables",
            filter: "notIsObject",
          },
        ],
      },
      "web/scss": {
        transformGroup: "scss",
        buildPath: buildPath.scss,
        files: [
          {
            destination: `${current.filename}.scss`,
            format: "scss/variables",
            filter: "notIsObject",
          },
          {
            destination: `mixins.scss`,
            format: "scss/mixin",
            filter: "isObject",
          },
        ],
      },
    },
  };
}

function registerFilters() {
  StyleDictionary.registerFilter({
    name: "isObject",
    matcher: function (token) {
      return typeof token.value === "object";
    },
  });

  StyleDictionary.registerFilter({
    name: "notIsObject",
    matcher: function (token) {
      return typeof token.value !== "object";
    },
  });
}

function registerFormat() {
  StyleDictionary.registerFormat({
    name: "scss/mixin",
    formatter: function ({ dictionary }) {
      let output = "";
      dictionary.allProperties.map((prop) => {
        if (prop.attributes.category == "switch") {
          output += `
						@if $type == switch-${prop.attributes.type} {
							transition-duration: ${prop.value.velocity};
							transition-timing-function: ${prop.value.vibe};
						}
					`;
        }
        if (prop.attributes.category == "spin") {
          output += `
						@if $type == spin-${prop.attributes.type} {
							transition-duration: ${prop.value.velocity};
							transition-timing-function: ${prop.value.vibe};
							#{$trigger} {
								transform: rotate(${prop.value.rotation});
							}
						}
					`;
        }
        if (prop.attributes.category == "expand") {
          output += `
						@if $type == expand-${prop.attributes.type} {
							transition-duration: ${prop.value.velocity};
							transition-timing-function: ${prop.value.vibe};
							#{$trigger} {
								transform: scale(${prop.value.scale});
							}
						}
					`;
        }
      });

      return `@mixin motion-token($type, $trigger){ ${output} }`;
    },
  });
}

module.exports = {
  registerConfig,
  registerFilters,
  registerFormat,
};
