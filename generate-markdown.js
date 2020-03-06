const fs = require('fs');
const path = require('path');

const [, , file] = process.argv;

const config = JSON.parse(
  fs.readFileSync(path.resolve('markdown-template.json'))
    .toString()
);

const genTitle = (title, level) => `${'#'.repeat(level)} \`${title}\`\n\r`;

const loadFiles = (files) => files.map(file => `${fs.readFileSync(path.resolve(file)).toString()}\n\r`)

const readDir = (dirName) => fs.readdirSync(dirName).map(fileName => dirName + '/' + fileName);

const parseDoc = (files, level) => files
  .map(file => fs.readFileSync(path.resolve(file)).toString())
  .map(file => {
    const [, name] = file.match(/@name \{([^\}]+)\}/);
    const [, desc] = file.match(/@desc([^@\/\{]+)((\*\/)|(\{?@))/)
    const example = file.match(/\/\/\#example[\r\n]*?([\s\S]+)/)

    return (
      `${genTitle(name, level)}\n${
      (
        desc
          .replace(/[\r\n]+/g, String())
          .replace(/\s?\*\s?/g, '*')
          .replace(/\*\*/g, '\r\n')
          .replace(/\*/g, ' ')
          .trim()
      )
      }\n\n${example ? `\`\`\`js${example[1]}\n\`\`\`\n\n` : String()}`
    )
  });

const build = (config, level = 1) => (
  config
    .map(({ title, content, contentDir, sub, parse }) => [
      (
        title
          ? genTitle(title, level)
          : String()
      ),
      ...(
        parse
          ? parseDoc(content || readDir(contentDir), level)
          : loadFiles(content || readDir(contentDir))
      ),
      (
        sub
          ? build(sub, level + (title ? 1 : 0))
          : String()
      )
    ].join(String())).join(String())
);

fs.writeFileSync(file, build(config));