const fs = require('fs');
const path = require('path');

const directories = [
    path.join(__dirname, 'js'),
    path.join(__dirname, 'js', 'modules')
];

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) continue;
        if (!fullPath.endsWith('.js') && !fullPath.endsWith('.html')) continue;
        processFile(fullPath);
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // We use tokens to prevent cascading replacements
    // e.g. Devashish -> Anil, and then old Anil -> Raja. If we don't use tokens, the new Anil becomes Raja too.
    
    // --- STEP 1: TOKENIZE ---
    // Old Level 4 (Reviewing): Anil Kumar Chhapolia -> TOKEN_LEVEL4
    content = content.replace(/Shri Anil Kumar Chhapolia/g, '__L4_NAME__');
    content = content.replace(/anil\.chhapolia/g, '__L4_ID__');
    content = content.replace(/ak\.chhapolia@nic\.in/g, '__L4_EMAIL__');
    content = content.replace(/Joint Secretary \(Establishment & Coordination\)/g, '__L4_DESIG_LONG__');
    content = content.replace(/Joint Secretary - Estt & Coord, DMA/g, '__L4_DESIG_SHORT1__');
    content = content.replace(/JS \(Estt & Coord\)/g, '__L4_DESIG_SHORT2__');
    content = content.replace(/Joint Secretary, Department of Military Affairs/g, '__L4_DESIG_SHORT3__');
    content = content.replace(/Joint Secretary \(DMA\)/g, '__L4_DESIG_SHORT4__');
    content = content.replace(/Joint Secretary, DMA/g, '__L4_DESIG_SHORT5__');
    content = content.replace(/JS & CCA/g, '__L4_DESIG_SHORT6__');
    content = content.replace(/MOD-DMA-JS-01/g, '__L4_EMP_ID__');

    // Old Level 3 (Reporting): Devashish Sharma -> TOKEN_LEVEL3
    content = content.replace(/Col\. Devashish Sharma/g, '__L3_NAME__');
    content = content.replace(/devashish\.sharma/g, '__L3_ID__');
    content = content.replace(/col\.devashish/g, '__L3_ID2__');
    content = content.replace(/dir-estt\.dma@gov\.in/g, '__L3_EMAIL__');
    content = content.replace(/Director \(Establishment & Joint Staff\)/g, '__L3_DESIG_LONG__');
    content = content.replace(/Director - Estt, DMA/g, '__L3_DESIG_SHORT1__');
    content = content.replace(/Director \(Estt, DMA\)/g, '__L3_DESIG_SHORT2__');
    content = content.replace(/Director, DMA/g, '__L3_DESIG_SHORT3__');
    content = content.replace(/Director \(DMA\)/g, '__L3_DESIG_SHORT4__');
    content = content.replace(/Director \(MSS\)/g, '__L3_DESIG_SHORT5__');
    content = content.replace(/Director \(Estt\)/g, '__L3_DESIG_SHORT6__');
    content = content.replace(/MOD-DMA-DIR-2021/g, '__L3_EMP_ID__');

    // Old Level 2 (Controlling): Manoj Kumar Sinha -> TOKEN_LEVEL2
    content = content.replace(/Shri Manoj Kumar Sinha/g, '__L2_NAME__');
    content = content.replace(/Under Secretary \(Establishment-I\)/g, '__L2_DESIG_LONG__');
    content = content.replace(/Under Secretary, Estt-I/g, '__L2_DESIG_SHORT1__');
    content = content.replace(/US \(Estt-I\)/g, '__L2_DESIG_SHORT2__');
    content = content.replace(/US Estt-I/g, '__L2_DESIG_SHORT3__');
    content = content.replace(/us-estt\.dma@gov\.in/g, '__L2_EMAIL__');
    content = content.replace(/MOD-DMA-US-108/g, '__L2_EMP_ID__');

    // --- STEP 2: REPLACE TOKENS WITH NEW VALUES ---

    // New Level 4 (Reviewing): Gen. N.S. Raja Subramani (Chief of Defence Staff / Secy DMA)
    content = content.replace(/__L4_NAME__/g, 'Gen. N.S. Raja Subramani');
    content = content.replace(/__L4_ID__/g, 'raja.subramani');
    content = content.replace(/__L4_EMAIL__/g, 'cds.dma@gov.in');
    content = content.replace(/__L4_DESIG_LONG__/g, 'Chief of Defence Staff & Secretary DMA');
    content = content.replace(/__L4_DESIG_SHORT1__/g, 'CDS & Secy, DMA');
    content = content.replace(/__L4_DESIG_SHORT2__/g, 'CDS');
    content = content.replace(/__L4_DESIG_SHORT3__/g, 'Secretary, Department of Military Affairs');
    content = content.replace(/__L4_DESIG_SHORT4__/g, 'CDS (DMA)');
    content = content.replace(/__L4_DESIG_SHORT5__/g, 'CDS, DMA');
    content = content.replace(/__L4_DESIG_SHORT6__/g, 'CDS & Secy');
    content = content.replace(/__L4_EMP_ID__/g, 'MOD-DMA-CDS-01');

    // New Level 3 (Reporting): Shri Anil Kumar Chhapolia (Joint Secretary Estt & Coord)
    content = content.replace(/__L3_NAME__/g, 'Shri Anil Kumar Chhapolia');
    content = content.replace(/__L3_ID__/g, 'anil.chhapolia');
    content = content.replace(/__L3_ID2__/g, 'anil.chhapolia');
    content = content.replace(/__L3_EMAIL__/g, 'ak.chhapolia@nic.in');
    content = content.replace(/__L3_DESIG_LONG__/g, 'Joint Secretary (Establishment & Coordination)');
    content = content.replace(/__L3_DESIG_SHORT1__/g, 'Joint Secretary - Estt & Coord, DMA');
    content = content.replace(/__L3_DESIG_SHORT2__/g, 'Joint Secretary (Estt & Coord, DMA)');
    content = content.replace(/__L3_DESIG_SHORT3__/g, 'Joint Secretary, DMA');
    content = content.replace(/__L3_DESIG_SHORT4__/g, 'Joint Secretary (DMA)');
    content = content.replace(/__L3_DESIG_SHORT5__/g, 'Joint Secretary (MSS)');
    content = content.replace(/__L3_DESIG_SHORT6__/g, 'Joint Secretary (Estt)');
    content = content.replace(/__L3_EMP_ID__/g, 'MOD-DMA-JS-01');

    // New Level 2 (Controlling): Shri Rajender Singh (Deputy Secretary Establishment)
    content = content.replace(/__L2_NAME__/g, 'Shri Rajender Singh');
    content = content.replace(/__L2_DESIG_LONG__/g, 'Deputy Secretary (Establishment)');
    content = content.replace(/__L2_DESIG_SHORT1__/g, 'Deputy Secretary, Estt');
    content = content.replace(/__L2_DESIG_SHORT2__/g, 'DS (Estt)');
    content = content.replace(/__L2_DESIG_SHORT3__/g, 'DS Estt');
    content = content.replace(/__L2_EMAIL__/g, 'ds-estt.dma@gov.in');
    content = content.replace(/__L2_EMP_ID__/g, 'MOD-DMA-DS-204');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

for (const dir of directories) {
    processDirectory(dir);
}
// Also process index.html
const indexHtml = path.join(__dirname, 'index.html');
if (fs.existsSync(indexHtml)) {
    processFile(indexHtml);
}

console.log('Hierarchy update complete!');
