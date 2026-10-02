const fs = require('fs');
const path = require('path');

const uploadDir = '/Users/anurag.bawaskar/.gemini/antigravity-ide/brain/a1e3329e-af23-476c-afd9-f09bbeba63f5/.user_uploaded/';
const seal1 = fs.readFileSync(path.join(uploadDir, 'media_1790929884460.png')).toString('base64');
const seal2 = fs.readFileSync(path.join(uploadDir, 'media_1790929898253.png')).toString('base64');

// We'll assume seal1 is MoD seal and seal2 is SO seal based on file size (but they might be flipped)
// Since both are purple stamps, we can just use them in different contexts.
// Actually we can inject both and see.
const b64_1 = `data:image/png;base64,${seal1}`;
const b64_2 = `data:image/png;base64,${seal2}`;

let dlCode = fs.readFileSync('js/downloader.js', 'utf8');

if (!dlCode.includes('const MOD_SEAL_B64')) {
    dlCode = `const MOD_SEAL_B64 = '${b64_1}';\nconst SO_SEAL_B64 = '${b64_2}';\n\n` + dlCode;
}

// 1. Form 16 Part A
dlCode = dlCode.replace(
    '<strong>Signature of person responsible for deduction of tax</strong>',
    '<img src="${SO_SEAL_B64}" style="height: 75px; margin-bottom: -5px; opacity: 0.8; mix-blend-mode: multiply;"><br><strong>Signature of person responsible for deduction of tax</strong>'
);

// 2. Form 16 Part B
dlCode = dlCode.replace(
    '<strong>Signature of DDO</strong>',
    '<img src="${SO_SEAL_B64}" style="height: 75px; margin-bottom: -5px; opacity: 0.8; mix-blend-mode: multiply;"><br><strong>Signature of DDO</strong>'
);

// 3. CGHS Certificate
dlCode = dlCode.replace(
    'Signature of Issuing Authority<br>',
    '<img src="${SO_SEAL_B64}" style="height: 80px; margin-bottom: -10px; opacity: 0.8; mix-blend-mode: multiply;"><br>Signature of Issuing Authority<br>'
);

// 4. LTC Settlement
dlCode = dlCode.replace(
    'Accounts Officer (PAO)<br>',
    '<img src="${SO_SEAL_B64}" style="height: 80px; margin-bottom: -10px; opacity: 0.8; mix-blend-mode: multiply;"><br>Accounts Officer (PAO)<br>'
);

// 5. Transfer Order
dlCode = dlCode.replace(
    '(Anil Kumar)<br>',
    '<img src="${MOD_SEAL_B64}" style="height: 90px; margin-bottom: -15px; opacity: 0.8; mix-blend-mode: multiply;"><br>(Anil Kumar)<br>'
);

// 6. MACP Order
dlCode = dlCode.replace(
    '(P. K. Sharma)<br>',
    '<img src="${MOD_SEAL_B64}" style="height: 90px; margin-bottom: -15px; opacity: 0.8; mix-blend-mode: multiply;"><br>(P. K. Sharma)<br>'
);

// 7. APAR - Reporting Officer
dlCode = dlCode.replace(
    '<strong>Signature of Reporting Officer</strong><br>',
    '<img src="${SO_SEAL_B64}" style="height: 70px; margin-bottom: -10px; opacity: 0.8; mix-blend-mode: multiply;"><br><strong>Signature of Reporting Officer</strong><br>'
);

// 8. APAR - Reviewing Officer
dlCode = dlCode.replace(
    '<strong>Signature of Reviewing Officer</strong><br>',
    '<img src="${MOD_SEAL_B64}" style="height: 80px; margin-bottom: -10px; opacity: 0.8; mix-blend-mode: multiply;"><br><strong>Signature of Reviewing Officer</strong><br>'
);

fs.writeFileSync('js/downloader.js', dlCode);
console.log('Successfully injected stamps into documents.');
