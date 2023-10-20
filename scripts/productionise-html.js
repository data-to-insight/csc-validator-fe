const { parse } = require('node-html-parser');
const args = require('args');
const fs = require('fs');
const { exit } = require('process');

const filePath = './build/index.html';

const raw = fs.readFileSync(filePath);

args
  .option('wheelPath', 'the path to the wheel file')
  .option('tool', 'the tool name');

const flags = args.parse(process.argv);

if (!flags.tool || !flags.wheelPath) {
  throw new Error('missing arguments');
}

const { wheelPath, tool } = flags;

const body = parse(raw);

const element = body.querySelector('#root');

element.setAttribute('data-wheelPath', wheelPath);
element.setAttribute('data-tool', tool);

const output = body.toString();

fs.writeFileSync(filePath, output);

exit(0);
