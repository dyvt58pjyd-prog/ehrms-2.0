const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const navLinksToAdd = `
      <a href="#eoffice" class="nav-item">📁 e-Office FTS</a>
      <a href="#aebas" class="nav-item">👆 AEBAS Attendance</a>
      <a href="#cghs" class="nav-item">⚕️ CGHS Medical</a>
      <a href="#deputation" class="nav-item">🎓 Deputation & CSS</a>
      <a href="#eawas" class="nav-item">🏡 e-Awas Allotment</a>
`;

// Insert after the active dashboard link
const insertPoint = content.indexOf('<a href="#service-book" class="nav-item">📖 e-Service Book</a>');
content = content.substring(0, insertPoint) + navLinksToAdd + content.substring(insertPoint);

fs.writeFileSync(indexPath, content);
console.log("index.html patched successfully.");
