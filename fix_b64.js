const fs = require('fs');
const b64 = fs.readFileSync('/tmp/img_base64.txt', 'utf8').trim();
let code = fs.readFileSync('js/downloader.js', 'utf8');
code = code.replace('${b64}', b64);
fs.writeFileSync('js/downloader.js', code);
console.log('Fixed ReferenceError for b64');
