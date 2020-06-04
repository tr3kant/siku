const util = require('util');
const fs = require('fs');
const path = require('path');
const copyFilePromise = util.promisify(fs.copyFile);

const fnFile = ['convert.scss', 'utilities.scss', 'mini-units.scss'];
const fnStatement = fnFile.map((filename) => `@import "./${filename}";`).join('\n');

function copyFiles(srcDir, destDir, files) {
  return Promise.all(files.map(f => {
    return copyFilePromise(path.join(__dirname, srcDir, f), path.join(__dirname, destDir, f));
  }));
}

function rewriteIndex(newStatement) {
  const indexScss = path.join(__dirname, '../dist/index.scss');
  fs.readFile(indexScss, 'utf8', (err, data) => {
    if (err) throw err;
    fs.writeFile (indexScss, `${newStatement}\n${data}`, (err) => {
      if (err) throw err;
    });
  });

}

copyFiles('../functions', '../dist', fnFile).then(() => {
 rewriteIndex(fnStatement);
}).catch(err => {
 console.log(err);
});
