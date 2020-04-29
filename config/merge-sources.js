const fs = require('fs');
const path = require('path');

const config = JSON.parse(
  fs.readFileSync(path.resolve('config/merge-config.json'))
    .toString()
);

config.forEach(bundle => {
  const files = [];

  bundle.files.forEach(part =>
    part.file
      ? files.push(part)
      : fs.readdirSync(part.dir).forEach(file => files.push({ ...part, file: part.dir + '/' + file }))
  );

  const merged = files.reduce((parts, { file, removeExports }) =>
    parts
      .concat([
        fs.readFileSync(path.resolve(file))
          .toString()
          .replace(/(import).+(from).+;/g, '')
          .replace(/((\r\n)+$)|(^(\r\n)+)/g, '')
          .replace(removeExports ? (/export\s/g) : '', '')
      ]), [])
    .join('\r\n\r\n');

  if (!fs.existsSync(bundle.outDir)) {
    fs.mkdirSync(bundle.outDir);
  }

  fs.writeFileSync(bundle.outDir + '/' + bundle.outFile, merged);
});