const fs = require('fs');
const path = require('path');

const config = JSON.parse(
  fs.readFileSync(path.resolve('merge-config.json'))
    .toString()
);

const files = [];

config.include.forEach(part =>
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

if (!fs.existsSync(config.outDir)) {
  fs.mkdirSync(config.outDir);
}

fs.writeFileSync(config.outDir + '/' + config.outFile, merged);