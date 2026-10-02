/**
 * Automated Verification Script for e-HRMS 2.0 New Features & Document Downloaders
 */

import { store, OFFICIAL_PERSONAS } from './js/state.js';
import { renderIgotKarmayogi } from './js/modules/igotKarmayogi.js';
import { renderSmartIdCard } from './js/modules/smartIdCard.js';
import { renderPensionPortfolio } from './js/modules/pensionPortfolio.js';
import { renderGrievances, renderGrievancesDesk } from './js/modules/grievances.js';
import * as downloader from './js/downloader.js';

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
console.log('🧪 e-HRMS 2.0 Comprehensive Feature & Integrity Test Suite');
console.log('================================================================\n');

// 1. State Verification
console.log('1️⃣ Checking e-HRMS 2.0 State Attributes...');
const state = store.get();
assert(state.karmayogi !== undefined, 'karmayogi state branch exists');
assert(state.karmayogi?.totalHours === 48.5 || state.karmayogi?.learningHours === 48.5, 'iGOT learning hours is 48.5');
assert(state.karmayogi?.cbsCredits === 620, 'iGOT CBS credits is 620');
assert(state.karmayogi?.courses?.filter(c => c.status === 'COMPLETED').length >= 4, 'At least 4 completed iGOT courses');

assert(state.smartIdCard !== undefined, 'smartIdCard state branch exists');
assert(state.smartIdCard?.cardNo === 'MOD-ID-2024-8104', 'Smart ID Card No matches MOD-ID-2024-8104');
assert(state.smartIdCard?.bloodGroup === 'O+ve', 'Blood group is O+ve');
assert(state.smartIdCard?.emergencyContact?.includes('94221 48102'), 'Emergency contact has Father phone number');

assert(state.pensionNps !== undefined, 'pensionNps state branch exists');
assert(state.pensionNps?.pran === '110194810244', 'PRAN matches 110194810244');
assert(state.pensionNps?.totalCorpus === 318640, 'Total corpus is ₹3,18,640');
assert(state.pensionNps?.monthlyTotal === 25704, 'Monthly pension investment is ₹25,704');

assert(state.grievances !== undefined && Array.isArray(state.grievances), 'grievances state branch exists as Array');
assert(state.grievances?.length >= 1, 'CPGRAMS grievance records exist');
assert(state.grievances[0]?.docketNo === 'DMA/E/2026/00142', 'Initial docket DMA/E/2026/00142 exists');

// 2. Application Date Check (LV-2026-98343)
console.log('\n2️⃣ Verifying Leave Application Date Accuracy...');
const lvApp = state.leaveApplications.find(a => a.id === 'LV-2026-98343');
assert(lvApp !== undefined, 'LV-2026-98343 found');
assert(lvApp?.appliedOn === '2026-09-08', `LV-2026-98343 appliedOn is today (2026-09-08), actual: ${lvApp?.appliedOn}`);
assert(lvApp?.days === 3, 'LV-2026-98343 is 3 days');
assert(lvApp?.typeName?.includes('Earned Leave') || lvApp?.type === 'EL', 'LV-2026-98343 type is Earned Leave');
assert(lvApp?.reason?.includes('MBA Admission Counselling'), 'LV-2026-98343 reason contains sister MBA Admission Counselling');

// 3. Module Renderers Verification
console.log('\n3️⃣ Verifying 4 New Module Renderers...');
const createMockContainer = () => {
  return {
    innerHTML: '',
    querySelector: () => ({ addEventListener: () => {}, classList: { toggle: () => {} } }),
    querySelectorAll: () => []
  };
};

try {
  const container1 = createMockContainer();
  renderIgotKarmayogi(container1);
  assert(container1.innerHTML.includes('Mission Karmayogi'), 'iGOT Karmayogi rendered HTML successfully');
  assert(container1.innerHTML.includes('48.5'), 'iGOT contains 48.5 learning hours');
} catch (e) {
  assert(false, `iGOT Karmayogi render failed: ${e.message}`);
}

try {
  const container2 = createMockContainer();
  renderSmartIdCard(container2);
  assert(container2.innerHTML.includes('Official Smart Identity Card'), 'Smart ID Card rendered HTML successfully');
  assert(container2.innerHTML.includes('ANURAG ANIL BAWASKAR'), 'Smart ID Card contains employee name');
  assert(container2.innerHTML.includes('Sena Bhawan'), 'Smart ID Card contains office zone');
} catch (e) {
  assert(false, `Smart ID Card render failed: ${e.message}`);
}

try {
  const container3 = createMockContainer();
  renderPensionPortfolio(container3);
  assert(container3.innerHTML.includes('National Pension System'), 'NPS Pension rendered HTML successfully');
  assert(container3.innerHTML.includes('110194810244'), 'NPS Pension contains PRAN');
  assert(container3.innerHTML.includes('3,18,640'), 'NPS Pension contains corpus figure');
} catch (e) {
  assert(false, `NPS Pension render failed: ${e.message}`);
}

try {
  const container4 = createMockContainer();
  renderGrievances(container4);
  assert(container4.innerHTML.includes('CPGRAMS'), 'CPGRAMS Desk rendered HTML successfully');
  assert(container4.innerHTML.includes('DMA/E/2026/00142'), 'CPGRAMS contains docket number');
} catch (e) {
  assert(false, `CPGRAMS Desk render failed: ${e.message}`);
}

// 4. Downloader Functions Verification
console.log('\n4️⃣ Verifying Downloader Functions in js/downloader.js...');
const requiredDownloaders = [
  'downloadPaySlip',
  'downloadServiceBook',
  'downloadAparDossier',
  'downloadIprAck',
  'downloadLeaveOrder',
  'downloadClaimOrder',
  'downloadDirectoryCsv',
  'downloadKarmayogiCertificate',
  'downloadSmartIdCard',
  'downloadPranStatement'
];

requiredDownloaders.forEach(fnName => {
  assert(typeof downloader[fnName] === 'function', `downloader.${fnName} is exported as a function`);
});

// 5. Salary & Professional Tax check
console.log('\n5️⃣ Verifying Salary & Professional Tax Authenticity...');
assert(state.payroll.professionalTax === 200, `Professional tax is exactly ₹200 (actual: ${state.payroll.professionalTax})`);
assert(state.payroll.totalDeductions === 15376, `Total deductions is ₹15,376 (actual: ${state.payroll.totalDeductions})`);
assert(state.payroll.netSalary === 118232, `Net salary is ₹1,18,232 (actual: ${state.payroll.netSalary})`);

console.log('\n================================================================');
console.log(`🏁 Results: Passed: ${passed} | Failed: ${failed}`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✨ All e-HRMS 2.0 feature & date verification tests passed with 100% success!');
  process.exit(0);
}
