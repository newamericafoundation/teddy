#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const template = require("./template")
const ReactDocGenMarkdownRenderer = require("react-docgen-markdown-renderer");
const renderer = new ReactDocGenMarkdownRenderer({template});

let json = "";
process.stdin.setEncoding("utf8");
process.stdin.on("readable", function() {
  let chunk = process.stdin.read();
  if (chunk !== null) {
    json += chunk;
  }
});
process.stdin.on("end", function() {
  buildDocs(JSON.parse(json));
});

function buildDocs(api) {
  const dir = path.dirname(Object.keys(api)[0]);
  const p = dir === "../src" ? "../../docs" : "../../../docs";
  const docPath = path.resolve(`${Object.keys(api)[0]}`, p);

  const toc = Object.keys(api)
    .map(filepath => {
      const name = api[filepath].displayName;
      return `  - [${name}](#${name ? name.toLowerCase() : ""})`;
    })
    .join("\n");

  const md = Object.keys(api).map(filepath => {
    const path = filepath.slice(1);
    return renderer.render(path, api[filepath], []);
  });

  const apiDocs = md.join("\n");

  const description = fs.readFileSync(`${docPath}/description.md`, {
    encoding: "utf-8"
  });

  const docs = [
    description,
    "## Components\n\n",
    toc,
    "## API\n\n",
    apiDocs
  ].join("\n\n");

  fs.writeFileSync("../README.md", docs);
  process.stdout.write(" -> " + "README.md\n");
}
