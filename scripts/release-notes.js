const YAML = require("yaml");
const fs = require("fs");

const notes = fs.readFileSync(".github/release-notes.yaml", "utf8");
const output = YAML.parse(notes);

fs.writeFileSync("./src/data/release-notes.json", JSON.stringify(output));
