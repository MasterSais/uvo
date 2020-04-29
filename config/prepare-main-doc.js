const fs = require('fs');
const path = require('path');

const [, , inputFile, outputFile, apiDoc] = process.argv;

const inline = (file, parse = false) => {
  let content = fs.readFileSync(path.resolve(file)).toString();

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
        result.replace(match, inline(match.slice(9, -1) + '.ts', true))
      ), content)
      : content
  );
}

const parseTemplate = fileName => {
  let content = fs.readFileSync(path.resolve(fileName)).toString();

  const files = content.match(/\[size:.+\]:.+/g);

  content = content.replace(/\[size:.+\]:.+[\r\n]*/g, '');

  for (const file of files) {
    const [, name, link] = file.match(/(\[size:.+\]): (.+)/);

    const size = fs.statSync(path.resolve(link)).size;

    content = content.replace(name, `~${Math.round(size / 102.4) / 10}kb`)
  }

  const header = `|Base API|Templating API|Description|\n|:-|:-|:-|`;

  const apiConfig = JSON.parse(fs.readFileSync(path.resolve('config/api-table-template.json')));

  apiConfig.forEach(({ name, files }) => {
    const rows = [];

    const urls = [];

    files.forEach(dir => (
      (
        fs.readdirSync(dir).forEach(file => {
          const fileContent = inline(dir + '/' + file);

          const [, name] = fileContent.match(/@name \{([^\}]+)\}/);

          const [, template] = fileContent.match(/@template \{(.+)\}[\r\n\s]/) || [0, ''];

          const [, desc] = fileContent.match(/@desc([^@\/]+)((\*\/)|(\{?@))/);

          const parsedDesc = desc.replace(/[\*\n\r]+|\{$/g, '').trim();

          rows.push(`|[${name}][${name}-url]|${template}|${parsedDesc}|`);

          urls.push(`[${name}-url]: ${apiDoc}#${name}`);
        })
      )
    ));

    content = content.replace(`<% ${name} %>`, `${header}\n${rows.join('\n')}\n\n${urls.join('\n')}`);
  });

  return content.replace('<% api-url %>', apiDoc);
}

fs.writeFileSync(outputFile, parseTemplate(inputFile));