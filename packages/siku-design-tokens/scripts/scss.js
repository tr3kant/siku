const fs = require('fs');
const path = require('path');

const builtFilename = 'index.scss';
const distPath = path.join(__dirname, '../dist');

const filesToImport = fs.readdirSync(distPath).filter((filename) => (
  filename !== builtFilename && filename.endsWith('.scss')
));

const importStatements = filesToImport.map((filename) => `@import "./${filename}";`);

fs.writeFileSync(path.join(distPath, builtFilename), importStatements.join('\n'));
