// transpile.js
import * as Babel from '@babel/standalone';

const babelOptions = {
  presets: [ "react", ["es2015", { "modules": false }]]
}

export default function preprocess(str) {
  const { code } = Babel.transform(str, babelOptions);

  return code;
}