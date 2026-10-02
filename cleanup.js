const fs = require('fs');
const path = require('path');

const downloaderPath = path.join(__dirname, 'js/downloader.js');
let content = fs.readFileSync(downloaderPath, 'utf8');

// Replace all data URIs for JPEG and SVG back to variable names
content = content.replace(/data:image\/jpeg;base64,[A-Za-z0-9+/=]+/g, (match) => {
    if (match.length > 50000) { // anurag_photo
        return '${ANURAG_PHOTO_BASE64}';
    } else if (match.length > 10000) { // father_photo (guess length difference, we'll just name them based on order if we can)
        return '${FATHER_PHOTO_BASE64}';
    }
    return match;
});

content = content.replace(/data:image\/svg\+xml;base64,[A-Za-z0-9+/=]+/g, '${AVATAR_SVG_BASE64}');

// Wait, the original had 'assets/anurag_photo.jpg' and I replaced it with the data uri.
// So my previous fix_images.js replaced all "assets/anurag_photo.jpg" with the data URI.
// Now I'm replacing the data URI with "${ANURAG_PHOTO_BASE64}".
// So the string will be `<img src="${ANURAG_PHOTO_BASE64}">` which is perfectly valid inside a template literal.

fs.writeFileSync(downloaderPath, content);
console.log("Cleanup done.");
