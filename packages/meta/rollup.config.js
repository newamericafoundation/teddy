import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import pkg from "./package.json";

const deps = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies
});

const globals = deps.reduce((o, name) => {
  if (name.includes("@vx/")) {
    o[name] = "vx";
  }
  if (name.includes("d3-")) {
    o[name] = "d3";
  }
  if (name === "react") {
    o[name] = "React";
  }
  if (name === "react-dom") {
    o[name] = "ReactDOM";
  }
  if (name === "prop-types") {
    o[name] = "PropTypes";
  }
  if (name === "classnames") {
    o[name] = "classNames";
  }
  return o;
}, {});

export default [
  {
    input: "src/index.js",
    external: deps,
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**"
      }),
      postcss({
        extensions: [".css", ".scss"],
        plugins: [autoprefixer],
        minimize: true,
        inject: false,
        extract: "dist/styles.css"
      }),
      terser()
    ],
    output: {
      file: pkg.main,
      format: "umd",
      name: "charts",
      globals
    }
  },
  {
    input: "src/index.js",
    external: deps,
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**"
      }),
      postcss({
        extensions: [".css", ".scss"],
        plugins: [autoprefixer],
        minimize: true,
        inject: false,
        extract: "dist/styles.css"
      }),
      terser()
    ],
    output: { file: pkg.module, format: "es", globals }
  }
];
