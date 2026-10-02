const fs = require('fs');
const path = require('path');

const downloaderPath = path.join(__dirname, 'js/downloader.js');
let content = fs.readFileSync(downloaderPath, 'utf8');

// Convert anurag_photo.jpg
try {
  const anuragB64 = fs.readFileSync(path.join(__dirname, 'assets/anurag_photo.jpg')).toString('base64');
  const anuragDataUri = `data:image/jpeg;base64,${anuragB64}`;
  content = content.replace(/assets\/anurag_photo\.jpg/g, anuragDataUri);
} catch (e) {
  console.log("anurag_photo.jpg not found or error:", e);
}

// Convert father_photo.jpg
try {
  const fatherB64 = fs.readFileSync(path.join(__dirname, 'assets/father_photo.jpg')).toString('base64');
  const fatherDataUri = `data:image/jpeg;base64,${fatherB64}`;
  content = content.replace(/assets\/father_photo\.jpg/g, fatherDataUri);
} catch (e) {
  console.log("father_photo.jpg not found or error:", e);
}

// Convert avatar.svg
try {
  const avatarB64 = fs.readFileSync(path.join(__dirname, 'assets/avatar.svg')).toString('base64');
  const avatarDataUri = `data:image/svg+xml;base64,${avatarB64}`;
  content = content.replace(/assets\/avatar\.svg/g, avatarDataUri);
} catch (e) {
  console.log("avatar.svg not found or error:", e);
}

fs.writeFileSync(downloaderPath, content);
console.log("Images successfully inlined into downloader.js");
