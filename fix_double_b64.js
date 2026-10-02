const fs = require('fs');
const filePath = 'js/downloader.js';
let code = fs.readFileSync(filePath, 'utf8');
code = code.replace('data:image/png;base64,data:image/png;base64,', 'data:image/png;base64,');
fs.writeFileSync(filePath, code);
console.log('Fixed double base64 prefix');
