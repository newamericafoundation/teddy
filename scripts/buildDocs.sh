#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const ReactDocGenMarkdownRenderer = require("react-docgen-markdown-renderer");
const renderer = new ReactDocGenMarkdownRenderer();

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
    var name = getComponentName(filepath);
    return renderer.render(
      filepath,
      api[filepath],
      []
    );
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

function getComponentName(filepath) {
  let name = path.basename(filepath);
  let ext;
  while ((ext = path.extname(name))) {
    name = name.substring(0, name.length - ext.length);
  }
  return name;
}
