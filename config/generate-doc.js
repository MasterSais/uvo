const fs = require('fs');
const path = require('path');

const [, , inputFile, outputFile, apiDoc] = process.argv;

const parseTemplate = fileName => {
  let content = fs.readFileSync(path.resolve(fileName)).toString();

  const files = content.match(/\[size:.+\]:.+/g);

  content = content.replace(/\[size:.+\]:.+[\r\n]*/g, '');

  for (const file of files) {
    const [, name, link] = file.match(/(\[size:.+\]): (.+)/);

    const size = fs.statSync(path.resolve(link)).size;

    content = content.replace(name, `~${Math.round(size / 102.4) / 10}kb`)
  }

  const header = `|Classic API|Templating API|Description|\n|:-|:-|:-|`;

  const rows = [];

  const urls = [];

  const apiConfig = JSON.parse(fs.readFileSync(path.resolve('config/api-template.json')));

  apiConfig.forEach(dir => (
    fs.readdirSync(dir).forEach(file => {
      const fileContent = fs.readFileSync(dir + '/' + file).toString();

      const [, name] = fileContent.match(/@name \{([^\}]+)\}/);

      const [, template] = fileContent.match(/@template \{(.+)\}[\r\n\s]/) || [0, ''];

      const [, desc] = fileContent.match(/@desc([^@\/]+)((\*\/)|(\{?@))/);

      const parsedDesc = desc.replace(/[\*\n\r]+|\{$/g, '').trim();

      const parsedTemplate = template.replace(/~/g, '\\~');

      rows.push(`|[${name}][${name}-url]|${parsedTemplate}|${parsedDesc}|`);

      urls.push(`[${name}-url]: ${apiDoc}#${name}`);
    })
  ));

  content = content
    .replace('<% api-url %>', apiDoc)
    .replace('<% api-table %>', `${header}\n${rows.join('\n')}\n\n${urls.join('\n')}`);

  return content;
}

fs.writeFileSync(outputFile, parseTemplate(inputFile));