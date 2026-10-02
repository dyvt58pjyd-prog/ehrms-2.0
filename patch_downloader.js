const fs = require('fs');
const path = require('path');

const downloaderPath = path.join(__dirname, 'js/downloader.js');
let content = fs.readFileSync(downloaderPath, 'utf8');

const anuragB64 = fs.readFileSync(path.join(__dirname, 'assets/anurag_photo.jpg')).toString('base64');
const anuragDataUri = `data:image/jpeg;base64,${anuragB64}`;

const fatherB64 = fs.readFileSync(path.join(__dirname, 'assets/father_photo.jpg')).toString('base64');
const fatherDataUri = `data:image/jpeg;base64,${fatherB64}`;

const avatarB64 = fs.readFileSync(path.join(__dirname, 'assets/avatar.svg')).toString('base64');
const avatarDataUri = `data:image/svg+xml;base64,${avatarB64}`;

// Add declarations at the top of downloader.js after EMBLEM_BASE64
const insertionIndex = content.indexOf('const EMBLEM_BASE64');
const nextLineIndex = content.indexOf('\n', insertionIndex);

const declarations = `
const ANURAG_PHOTO_BASE64 = '${anuragDataUri}';
const FATHER_PHOTO_BASE64 = '${fatherDataUri}';
const AVATAR_SVG_BASE64 = '${avatarDataUri}';
`;

content = content.substring(0, nextLineIndex) + declarations + content.substring(nextLineIndex);

// I should also check if my cleanup left any syntax errors, specifically in the onload attributes.
// The onload hack was: `<img src="assets/emblem.png" style="display:none;" onload="this.onload=null; this.src='${ANURAG_PHOTO_BASE64}';">`
// Let's completely remove these hacky hidden preloader images, since I'm using the base64 string directly in the actual images now!
content = content.replace(/<img src="assets\/emblem\.png" style="display:none;"[^>]+>/g, '');

fs.writeFileSync(downloaderPath, content);
console.log("Downloader patched successfully.");
