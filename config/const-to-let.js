const fs = require('fs');
const path = require('path');

const [, , filePath] = process.argv;

fs.writeFileSync(
  filePath,
  fs.readFileSync(path.resolve(filePath)).toString().replace(/const /g, 'let ')
);