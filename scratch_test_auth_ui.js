// Test Suite for Login Screen, Header Authentication Toggle & Credentials Directory
import fs from 'fs';

// Mock localStorage for node environment
if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  };
}

console.log('--- Testing Login Screen & Header Auth State ---');

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failed++;
  }
}

// 1. Inspect index.html
const indexHtml = fs.readFileSync('./index.html', 'utf-8');
assert(indexHtml.includes('id="header-user-profile"'), 'index.html contains #header-user-profile');
assert(indexHtml.includes('id="btn-header-logout"'), 'index.html contains #btn-header-logout');
assert(indexHtml.includes('id="header-auth-badge"'), 'index.html contains #header-auth-badge');
assert(!indexHtml.includes('id="role-selector"'), 'Role switcher dropdown is permanently absent');

// 2. Inspect js/app.js auth management
const appJs = fs.readFileSync('./js/app.js', 'utf-8');
assert(appJs.includes('updateHeaderAuth'), 'app.js defines updateHeaderAuth');
assert(appJs.includes('this.updateHeaderAuth(state)'), 'app.js calls updateHeaderAuth on route/state change');
assert(appJs.includes("if (this.currentRoute === 'login')"), 'app.js handles login route');
assert(appJs.includes("store.set({ isAuthenticated: false })"), 'app.js sets isAuthenticated=false on logout');
assert(appJs.includes("store.set({ isAuthenticated: true })"), 'app.js sets isAuthenticated=true on successful login');

// 3. Inspect js/auth.js login template
const authJs = fs.readFileSync('./js/auth.js', 'utf-8');
assert(authJs.includes('credentials-grid'), 'auth.js includes .credentials-grid layout');
assert(authJs.includes('data-uid="anurag.bawaskar"'), 'auth.js includes Anurag Bawaskar card');
assert(authJs.includes('data-uid="devashish.sharma"'), 'auth.js includes Col. Devashish Sharma card');
assert(authJs.includes('data-uid="manoj.sinha"'), 'auth.js includes Shri Manoj Sinha card');
assert(authJs.includes('data-uid="ddo.10501"'), 'auth.js includes DDO Code 10501 card');
assert(authJs.includes('data-uid="anil.chhapolia"'), 'auth.js includes Shri Anil Chhapolia card');
assert(authJs.includes('8459962390'), 'auth.js displays mobile 8459962390 on Anurag card');
assert(authJs.includes('10501'), 'auth.js displays DDO 10501 on Pradeep Kumar card');

// 4. Inspect css/dashboard.css
const css = fs.readFileSync('./css/dashboard.css', 'utf-8');
assert(css.includes('.credentials-grid'), 'dashboard.css defines .credentials-grid');
assert(css.includes('.persona-credential-card'), 'dashboard.css defines .persona-credential-card');
assert(css.includes('.persona-credential-card.active'), 'dashboard.css defines active persona card styling');

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log('🎉 ALL LOGIN UI & AUTH FLOW TESTS PASSED PERFECTLY!');
} else {
  process.exit(1);
}
