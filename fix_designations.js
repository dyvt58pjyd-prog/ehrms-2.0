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
        
        let content = fs.readFileSync(fullPath, 'utf8');
        let original = content;

        // Fix the rank
        content = content.replace(/Gen\. N\.S\. Raja Subramani/g, 'Lieutenant General N.S. Raja Subramani');
        
        // Fix incorrect residual designations attached to the CDS
        content = content.replace(/Lieutenant General N\.S\. Raja Subramani, Joint Secretary & CVO, Department of Military Affairs/g, 'Lieutenant General N.S. Raja Subramani, Chief of Defence Staff, Department of Military Affairs');
        content = content.replace(/Lieutenant General N\.S\. Raja Subramani, JS/g, 'Lieutenant General N.S. Raja Subramani, CDS');
        content = content.replace(/Lieutenant General N\.S\. Raja Subramani <span class="badge-tag">Joint Secretary \(Estt & Coord\)<\/span>/g, 'Lieutenant General N.S. Raja Subramani <span class="badge-tag">Chief of Defence Staff</span>');
        content = content.replace(/Lieutenant General N\.S\. Raja Subramani, Joint Secretary/g, 'Lieutenant General N.S. Raja Subramani, Chief of Defence Staff');

        // Note: The previous substitution might have left some designations as JS.
        // E.g., "Gen. N.S. Raja Subramani (Joint Secretary (Estt & Coord))"
        content = content.replace(/Lieutenant General N\.S\. Raja Subramani \(Joint Secretary \(Estt & Coord\)\)/g, 'Lieutenant General N.S. Raja Subramani (Chief of Defence Staff)');

        if (content !== original) {
            fs.writeFileSync(fullPath, content);
            console.log(`Fixed designations in ${fullPath}`);
        }
    }
}

for (const dir of directories) {
    processDirectory(dir);
}
const indexHtml = path.join(__dirname, 'index.html');
if (fs.existsSync(indexHtml)) {
    let content = fs.readFileSync(indexHtml, 'utf8');
    let original = content;
    content = content.replace(/Gen\. N\.S\. Raja Subramani/g, 'Lieutenant General N.S. Raja Subramani');
    if (content !== original) {
        fs.writeFileSync(indexHtml, content);
        console.log(`Fixed index.html`);
    }
}
