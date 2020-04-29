const fs = require('fs');
const path = require('path');

const [, , file] = process.argv;

const config = JSON.parse(
  fs.readFileSync(path.resolve('config/markdown-template.json'))
    .toString()
);

const genTitle = (title, level) => (
  String()
    .concat('#'.repeat(level))
    .concat(' `')
    .concat(title)
    .concat('`\n\r')
);

const loadFiles = (files) => files.map(file => `${inline(file)}\n\r`)

const readDir = (dirName) => fs.readdirSync(dirName).map(fileName => dirName + '/' + fileName);

const parseDoc = (files, level) => files
  .map(file => {
    const examples = [];

    file = inline(file, false, examples);

    const [, name] = file.match(/@name \{([^\}]+)\}/);

    const [, scheme] = file.match(/@scheme \{([^\}]+)\}/) || [];

    const [, desc] = file.match(/@desc([^@\/]+)((\*\/)|(\{?@))/);

    return (
      `${genTitle(name, level)}\n${
      (
        scheme
          ? `\`\`\`js\n${scheme ? scheme : ''}\n\`\`\``
          : ''
      )
      }\n${
      (
        desc.replace(/[\*\n\r]+|\{$/g, '').trim()
      )
      }\n\n${examples.length > 0 ? `\`\`\`js${examples[0]}\n\`\`\`\n\n` : String()}`
    )
  });

const inline = (file, parse = false, examples) => {
  let content = fs.readFileSync(path.resolve(file)).toString();

  const example = content.match(/\/\/\#example[\r\n]*?([\s\S]+)/);

  if (example) {
    examples.push(example[1]);
  }

  if (parse) {
    const annotation = content.match(/\/\*\*[\s\S]+\*\//);

    if (annotation) {
      content = annotation[0]
        .replace(/^\/\*\*(\s*)?(\r\n)?/, String())
        .replace(/(\s*)?(\r\n)?\*\/$/, String())
    } else {
      content = String();
    }
  }

  const matches = content.match(/\* \{@link (.+)\}/g);

  return (
    matches
      ? matches.reduce((result, match) => (
        result.replace(match, inline(match.slice(9, -1) + '.ts', true, examples))
      ), content)
      : content
  );
}

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