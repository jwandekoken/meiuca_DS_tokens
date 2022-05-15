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
          },
        ],
      },
    },
  };
}

module.exports = {
  registerConfig,
};
