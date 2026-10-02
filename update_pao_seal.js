const fs = require('fs');
const path = require('path');

const paoImagePath = '/Users/anurag.bawaskar/.gemini/antigravity-ide/brain/a1e3329e-af23-476c-afd9-f09bbeba63f5/stamp_pao_v2_1790930170257.jpg';
const paoBase64 = fs.readFileSync(paoImagePath).toString('base64');
const PAO_SEAL_B64 = `data:image/jpeg;base64,\${paoBase64}`;

let dlCode = fs.readFileSync('js/downloader.js', 'utf8');

// Inject PAO_SEAL_B64 constant at the top
if (!dlCode.includes('const PAO_SEAL_B64')) {
    dlCode = dlCode.replace('const SO_SEAL_B64 =', `const PAO_SEAL_B64 = '\${PAO_SEAL_B64}';\nconst SO_SEAL_B64 =`);
}

// Replace the SO seal with the PAO seal in Form 16 and LTC
dlCode = dlCode.replace(/<img src="\$\{SO_SEAL_B64\}" style="height: 75px; margin-bottom: -5px; opacity: 0\.8; mix-blend-mode: multiply;"><br><strong>Signature of person responsible for deduction of tax<\/strong>/g, '<img src="${PAO_SEAL_B64}" style="height: 90px; margin-bottom: -10px; opacity: 0.9; mix-blend-mode: multiply;"><br><strong>Signature of person responsible for deduction of tax</strong>');

dlCode = dlCode.replace(/<img src="\$\{SO_SEAL_B64\}" style="height: 75px; margin-bottom: -5px; opacity: 0\.8; mix-blend-mode: multiply;"><br><strong>Signature of DDO<\/strong>/g, '<img src="${PAO_SEAL_B64}" style="height: 90px; margin-bottom: -10px; opacity: 0.9; mix-blend-mode: multiply;"><br><strong>Signature of DDO</strong>');

dlCode = dlCode.replace(/<img src="\$\{SO_SEAL_B64\}" style="height: 80px; margin-bottom: -10px; opacity: 0\.8; mix-blend-mode: multiply;"><br>Accounts Officer \(PAO\)<br>/g, '<img src="${PAO_SEAL_B64}" style="height: 95px; margin-bottom: -15px; opacity: 0.9; mix-blend-mode: multiply;"><br>Accounts Officer (PAO)<br>');

fs.writeFileSync('js/downloader.js', dlCode);
console.log('Successfully updated PAO stamp in documents');
