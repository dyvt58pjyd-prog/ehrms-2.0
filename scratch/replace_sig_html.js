const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../js/downloader.js');
let content = fs.readFileSync(filePath, 'utf8');

// Use a regex to find all <div class="sig-box">...</div> blocks and replace them with the adobe signature
content = content.replace(/<div class="sig-box">([\s\S]*?)<\/div>/g, (match, innerContent) => {
  // Extract text by stripping HTML tags and trimming
  const text = innerContent.replace(/<[^>]+>/g, '|').split('|').map(s => s.trim()).filter(s => s.length > 0 && s !== '[DIGITALLY SIGNED VIA DSC]' && s !== '[DIGITALLY SIGNED]' && s !== '[ELECTRONIC RECEIPT ISSUED]');
  
  if (text.length === 0) return match;
  
  const name = text[0];
  const desig = text[1] || 'Ministry of Defence';
  
  return `\${generateESignature('${name.replace(/'/g, "\\'")}', '${desig.replace(/'/g, "\\'")}')}`;
});

fs.writeFileSync(filePath, content);
console.log('Signature HTML replaced.');
