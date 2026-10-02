const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../js/downloader.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the CSS
content = content.replace(/\.sig-box \{[\s\S]*?\}\s*\.sig-box::before \{[\s\S]*?\}/g, `
    .sig-box {
      font-family: Arial, sans-serif;
      text-align: center;
      border: 1px solid #767676;
      background-color: #ffffff;
      padding: 6px;
      border-radius: 2px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      width: 370px;
      margin-left: auto;
    }
    .adobe-left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ca3922;
      font-family: Arial, sans-serif;
      font-size: 20px;
      font-weight: bold;
      border-right: 1px dotted #ccc;
      padding-right: 15px;
      margin-right: 10px;
    }
    .adobe-right {
      flex: 2;
      font-family: 'Courier New', Courier, monospace;
      font-size: 10px;
      color: #333;
      text-align: left;
      font-weight: normal;
      line-height: 1.3;
    }
`);

// Add the helper function
if (!content.includes('generateESignature')) {
  content += `

/**
 * Generate a genuine Adobe-style e-Signature block
 */
export function generateESignature(name, desig, reason = 'Document Authentication', location = 'New Delhi') {
  const date = new Date().toISOString().replace('T', ' ').substring(0, 19) + " +05'30'";
  const shortName = name.split(',')[0].replace(/Shri|Smt\\.|Dr\\./g, '').trim();
  
  return \`
    <div class="sig-box" style="display: flex;">
      <div class="adobe-left" style="flex: 1; font-size: 18px;">
        \${shortName}
      </div>
      <div class="adobe-right" style="flex: 2;">
        <strong>Digitally signed by \${name}</strong><br>
        DN: c=IN, o=Government of India, ou=\${desig}, cn=\${name}<br>
        Date: \${date}<br>
        Reason: \${reason}<br>
        Location: \${location}
      </div>
    </div>
  \`;
}
`;
}

fs.writeFileSync(filePath, content);
console.log('Signature CSS and Helper added.');
