const StyleDictionaryPackage = require("style-dictionary");
const { registerConfig } = require("./config");

async function buildTokens({ current, buildPath }) {
  const StyleDictionary = StyleDictionaryPackage.extend(
    registerConfig({
      current: current,
      buildPath: buildPath,
    })
  );

  StyleDictionary.buildAllPlatforms();
}

module.exports = {
  buildTokens,
};
