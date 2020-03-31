const fs = require('fs');
const path = require('path');

const [, , filePath] = process.argv;

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

fs.writeFileSync(
  filePath,
  inline(filePath)
);