/**
 * Automated Verification Script for Exact e-hrms.gov.in Login Recreation
 */

import { renderLoginScreen } from './js/auth.js';
import { store, OFFICIAL_PERSONAS } from './js/state.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('================================================================');
console.log('🧪 e-HRMS 2.0 Exact Login Recreation Verification');
console.log('================================================================\n');

// Mock DOM container
const container = {
  innerHTML: '',
  listeners: {},
  querySelector(selector) {
    if (selector === '#captcha-canvas') {
      return {
        getContext: () => ({
          clearRect: () => {},
          createLinearGradient: () => ({ addColorStop: () => {} }),
          fillRect: () => {},
          beginPath: () => {},
          moveTo: () => {},
          bezierCurveTo: () => {},
          stroke: () => {},
          save: () => {},
          restore: () => {},
          translate: () => {},
          rotate: () => {},
          fillText: () => {}
        }),
        width: 112,
        height: 38
      };
    }
    if (selector === '#form-ehrms-login') {
      return {
        addEventListener: (event, handler) => {
          this.listeners[event] = handler;
        }
      };
    }
    if (selector === '#login-username') {
      return { value: 'anurag.bawaskar', style: {} };
    }
    if (selector === '#login-password') {
      return { value: 'Anurag@2026', style: {} };
    }
    if (selector === '#login-captcha') {
      return { value: '123456' };
    }
    if (selector === '#login-alert-box') {
      return { style: {}, innerHTML: '', className: '' };
    }
    return {
      addEventListener: () => {},
      classList: { add: () => {}, remove: () => {} },
      style: {}
    };
  },
  querySelectorAll(selector) {
    if (selector === '.persona-option-row') {
      return [
        { addEventListener: () => {}, getAttribute: () => 'EMPLOYEE' }
      ];
    }
    return [];
  }
};

let loginSuccessCalled = false;
let redirectedRoute = null;

renderLoginScreen(container, (target) => {
  loginSuccessCalled = true;
  redirectedRoute = target;
});

console.log('1️⃣ Checking Branding & Visual Text matching Screenshot...');
assert(container.innerHTML.includes('e-HRMS 2.0'), 'Contains exact portal name "e-HRMS 2.0"');
assert(container.innerHTML.includes('Department of Personnel &amp; Training') || container.innerHTML.includes('Department of Personnel & Training'), 'Contains "Department of Personnel & Training"');
assert(container.innerHTML.includes('About e-HRMS'), 'Contains "About e-HRMS"');
assert(container.innerHTML.includes('e-HRMS 2.0 is an online portal to provide end to end HR services to the Government employees'), 'Contains exact About description text');

console.log('\n2️⃣ Checking Form Fields & Controls matching Screenshot...');
assert(container.innerHTML.includes('Login to Your Account'), 'Contains title "Login to Your Account"');
assert(container.innerHTML.includes('Email/User ID:'), 'Contains label "Email/User ID:"');
assert(container.innerHTML.includes('Password:'), 'Contains label "Password:"');
assert(container.innerHTML.includes('Captcha'), 'Contains label "Captcha"');
assert(container.innerHTML.includes('btn-login-glossy'), 'Contains glossy pill Login button');
assert(container.innerHTML.includes('Login With e-parichay'), 'Contains "Login With e-parichay" link');

console.log('\n3️⃣ Checking Statutory Copyright Footer...');
assert(container.innerHTML.includes('Copyright 2022 Department of Personnel and Training, All Right reserved.'), 'Contains exact footer: "© Copyright 2022 Department of Personnel and Training, All Right reserved."');

console.log('\n4️⃣ Checking e-Parichay Persona Support...');
assert(container.innerHTML.includes('modal-parichay-personas'), 'Contains e-Parichay personas modal');
assert(container.innerHTML.includes('Anurag Anil Bawaskar'), 'Includes Anurag Anil Bawaskar in personas');
assert(container.innerHTML.includes('Col. Devashish Sharma'), 'Includes Col. Devashish Sharma in personas');
assert(container.innerHTML.includes('Shri Manoj Kumar Sinha'), 'Includes Manoj Kumar Sinha in personas');
assert(container.innerHTML.includes('Shri Pradeep Kumar, SAO'), 'Includes DDO Pradeep Kumar in personas');
assert(container.innerHTML.includes('Shri Anil Kumar Chhapolia'), 'Includes CCA Anil Kumar Chhapolia in personas');

console.log('\n================================================================');
console.log(`🏁 Results: Passed: ${passed} | Failed: ${failed}`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✨ All Exact Login recreation checks passed with 100% success!');
  process.exit(0);
}
