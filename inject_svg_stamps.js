const fs = require('fs');

const svgGenerator = `
function generateSVGStamp(topText, bottomText, color = "#4a148c") {
  const rotation = Math.random() * 20 - 10;
  const idSuffix = Math.random().toString(36).substring(7);
  return \\\`<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(\\\${rotation}deg); opacity: 0.85; mix-blend-mode: multiply; font-family: 'Times New Roman', Times, serif; filter: blur(0.3px);">
    <circle cx="75" cy="75" r="72" fill="none" stroke="\\\${color}" stroke-width="2" stroke-dasharray="3 1" />
    <circle cx="75" cy="75" r="69" fill="none" stroke="\\\${color}" stroke-width="1.5" />
    <circle cx="75" cy="75" r="45" fill="none" stroke="\\\${color}" stroke-width="1" />
    <path id="topTextPath_\\\${idSuffix}" d="M 20 75 A 55 55 0 0 1 130 75" fill="none" />
    <path id="bottomTextPath_\\\${idSuffix}" d="M 20 75 A 55 55 0 0 0 130 75" fill="none" />
    <text fill="\\\${color}" font-size="14" font-weight="bold" letter-spacing="1.5">
      <textPath href="#topTextPath_\\\${idSuffix}" startOffset="50%" text-anchor="middle">\\\${topText}</textPath>
    </text>
    <text fill="\\\${color}" font-size="14" font-weight="bold" letter-spacing="1.5">
      <textPath href="#bottomTextPath_\\\${idSuffix}" startOffset="50%" text-anchor="middle">\\\${bottomText}</textPath>
    </text>
    <image href="\\\${EMBLEM_BASE64}" x="55" y="45" height="54" width="40" opacity="0.9" />
  </svg>\\\`;
}
`;

let dlCode = fs.readFileSync('js/downloader.js', 'utf8');

// Inject the function
if (!dlCode.includes('function generateSVGStamp')) {
    dlCode = dlCode.replace('export function downloadServiceBook(user) {', svgGenerator + '\nexport function downloadServiceBook(user) {');
}

// Replace PAO
dlCode = dlCode.replace(/<img src="\$\{PAO_SEAL_B64\}"[^>]+>/g, '${generateSVGStamp("PAY & ACCOUNTS OFFICE", "MINISTRY OF DEFENCE")}');

// Replace SO
dlCode = dlCode.replace(/<img src="\$\{SO_SEAL_B64\}"[^>]+>/g, '${generateSVGStamp("SECTION OFFICER", "DEPARTMENT OF MILITARY AFFAIRS")}');

// Replace MOD
dlCode = dlCode.replace(/<img src="\$\{MOD_SEAL_B64\}"[^>]+>/g, '${generateSVGStamp("JOINT SECRETARY", "MINISTRY OF DEFENCE")}');

fs.writeFileSync('js/downloader.js', dlCode);
console.log('Successfully injected SVG stamps');
