const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');
const fbjsPreset = require('babel-preset-fbjs/configure')({
  stripDEV: false,
});

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [
          jestPreset,
          fbjsPreset,
        ],
        retainLines: true,
      }).code;
    }
    return src;
  },
};
