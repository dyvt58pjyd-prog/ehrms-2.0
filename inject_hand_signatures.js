const fs = require('fs');

const handSigFunc = `
function generateHandSignature(name, color = "#000080") {
  const rotation = Math.random() * -10 - 2; // Random rotation between -2 and -12 degrees
  return \\\`<div style="font-family: 'Brush Script MT', 'Bradley Hand', 'Lucida Handwriting', 'Apple Chancery', cursive; font-size: 36px; color: \\\${color}; transform: rotate(\\\${rotation}deg); margin-top: -65px; margin-bottom: 20px; position: relative; z-index: 10; opacity: 0.9; pointer-events: none;">\\\${name}</div>\\\`;
}
`;

let dlCode = fs.readFileSync('js/downloader.js', 'utf8');

if (!dlCode.includes('function generateHandSignature')) {
    dlCode = dlCode.replace('function generateSVGStamp', handSigFunc + '\nfunction generateSVGStamp');
}

// 1. Form 16 Part A (PAO)
dlCode = dlCode.replace(
    '${generateSVGStamp("PAY & ACCOUNTS OFFICE", "MINISTRY OF DEFENCE")}<br><strong>Signature of person responsible for deduction of tax</strong>',
    '${generateSVGStamp("PAY & ACCOUNTS OFFICE", "MINISTRY OF DEFENCE")}\\n${generateHandSignature("Rajender Singh")}\\n<strong>Signature of person responsible for deduction of tax</strong>'
);

// 2. Form 16 Part B (PAO)
dlCode = dlCode.replace(
    '${generateSVGStamp("PAY & ACCOUNTS OFFICE", "MINISTRY OF DEFENCE")}<br><strong>Signature of DDO</strong>',
    '${generateSVGStamp("PAY & ACCOUNTS OFFICE", "MINISTRY OF DEFENCE")}\\n${generateHandSignature("Rajender Singh")}\\n<strong>Signature of DDO</strong>'
);

// 3. CGHS (Section Officer)
dlCode = dlCode.replace(
    '${generateSVGStamp("SECTION OFFICER", "DEPARTMENT OF MILITARY AFFAIRS")}<br>Signature of Issuing Authority<br>',
    '${generateSVGStamp("SECTION OFFICER", "DEPARTMENT OF MILITARY AFFAIRS")}\\n${generateHandSignature("S. K. Sharma", "#000000")}\\nSignature of Issuing Authority<br>'
);

// 4. LTC Settlement (PAO)
dlCode = dlCode.replace(
    '${generateSVGStamp("PAY & ACCOUNTS OFFICE", "MINISTRY OF DEFENCE")}<br>Accounts Officer (PAO)<br>',
    '${generateSVGStamp("PAY & ACCOUNTS OFFICE", "MINISTRY OF DEFENCE")}\\n${generateHandSignature("Pradeep Kumar")}\\nAccounts Officer (PAO)<br>'
);

// 5. APAR Reporting Officer
dlCode = dlCode.replace(
    '${generateSVGStamp("SECTION OFFICER", "DEPARTMENT OF MILITARY AFFAIRS")}<br><strong>Signature of Reporting Officer</strong><br>Shri R. K. Singh, Deputy Secretary',
    '${generateSVGStamp("SECTION OFFICER", "DEPARTMENT OF MILITARY AFFAIRS")}\\n${generateHandSignature("R. K. Singh")}\\n<strong>Signature of Reporting Officer</strong><br>Shri R. K. Singh, Deputy Secretary'
);

// 6. APAR Reviewing Officer
dlCode = dlCode.replace(
    '${generateSVGStamp("JOINT SECRETARY", "MINISTRY OF DEFENCE")}<br><strong>Signature of Reviewing Officer</strong><br>Smt. Kavita Sharma, Joint Secretary',
    '${generateSVGStamp("JOINT SECRETARY", "MINISTRY OF DEFENCE")}\\n${generateHandSignature("Kavita Sharma")}\\n<strong>Signature of Reviewing Officer</strong><br>Smt. Kavita Sharma, Joint Secretary'
);

// 7. MACP Order
dlCode = dlCode.replace(
    '${generateSVGStamp("JOINT SECRETARY", "MINISTRY OF DEFENCE")}<br>(P. K. Sharma)<br>',
    '${generateSVGStamp("JOINT SECRETARY", "MINISTRY OF DEFENCE")}\\n${generateHandSignature("P. K. Sharma", "#000000")}\\n(P. K. Sharma)<br>'
);

// 8. Transfer Order
dlCode = dlCode.replace(
    '${generateSVGStamp("JOINT SECRETARY", "MINISTRY OF DEFENCE")}<br>(Anil Kumar)<br>',
    '${generateSVGStamp("JOINT SECRETARY", "MINISTRY OF DEFENCE")}\\n${generateHandSignature("Anil Kumar")}\\n(Anil Kumar)<br>'
);

fs.writeFileSync('js/downloader.js', dlCode);
console.log('Successfully injected hand signatures over stamps');
