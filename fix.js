const fs = require('fs');
let code = fs.readFileSync('js/downloader.js', 'utf8');
code = code.split('\\${').join('${');
code = code.split('\\`').join('`');
fs.writeFileSync('js/downloader.js', code);
console.log('Fixed');
