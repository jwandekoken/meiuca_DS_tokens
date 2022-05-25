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
      console.log("dictionary: ", dictionary);
      return "";
    },
  });
}

module.exports = {
  registerConfig,
  registerFilters,
  registerFormat,
};
