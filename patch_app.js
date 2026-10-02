const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'js/app.js');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Add imports
const importsToAdd = `
import { renderEOffice } from './modules/eoffice.js';
import { renderAEBAS } from './modules/aebas.js';
import { renderCGHS } from './modules/cghs.js';
import { renderDeputation } from './modules/deputation.js';
import { renderEAwas } from './modules/eAwas.js';
`;

// Find where imports end
const lastImportIndex = content.lastIndexOf("import {");
const endOfLastImport = content.indexOf("\n", lastImportIndex) + 1;
content = content.substring(0, endOfLastImport) + importsToAdd + content.substring(endOfLastImport);

// 2. Add routing logic
const routingToAdd = `
      case '#eoffice':
        renderEOffice(this.appContainer);
        break;
      case '#aebas':
        renderAEBAS(this.appContainer);
        break;
      case '#cghs':
        renderCGHS(this.appContainer);
        break;
      case '#deputation':
        renderDeputation(this.appContainer);
        break;
      case '#eawas':
        renderEAwas(this.appContainer);
        break;
`;

// Insert into route switch
const defaultCaseIndex = content.indexOf("default:");
content = content.substring(0, defaultCaseIndex) + routingToAdd + content.substring(defaultCaseIndex);

fs.writeFileSync(appPath, content);
console.log("app.js patched successfully.");
