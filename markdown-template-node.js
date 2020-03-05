const fs = require('fs');
const path = require('path');

const [, , file] = process.argv;

const config = JSON.parse(
  fs.readFileSync(path.resolve('markdown-template.json'))
    .toString()
);

const genTitle = (title, level) => `${'#'.repeat(level)} ${title}\n\r`;

const loadFiles = (files) => files.map(file => `${fs.readFileSync(path.resolve(file)).toString()}\n\r`)

const parseDoc = (doc, mark) => doc
  .split('/**')
  .filter(part => part.includes(mark))
  .map(part => ({
    desc:
      (part.match(/\*[^\@]+\*/g) || [])
        .join(String())
        .replace(/\n|\r|\s{2}/g, String())
        .replace(/\s*\*\s*/g, '*')
        .replace(/\*\*$/g, '*')
        .replace(/\*\*/g, '\n\r')
        .replace(/\*/g, String()),
    export:
      (part.match(new RegExp(mark + '')) || [])
  }))
  .filter(Boolean)
  .join('\n')

const build = (config, level = 1) => (
  config
    .map(({ title, content, sub, parse }) => [
      (
        title
          ? genTitle(title, level)
          : String()
      ),
      ...(
        parse
          ? parseDoc(loadFiles(content).join(String()), parse)
          : loadFiles(content)
      ),
      (
        sub
          ? build(sub, level + (title ? 1 : 0))
          : String()
      )
    ].join(String())).join(String())
);

fs.writeFileSync(file, build(config));