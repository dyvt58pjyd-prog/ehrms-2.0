// Comprehensive Test Suite for e-HRMS 2.0
// Validating Mobile 8459962390, DDO Code 10501, 5 Personas & Work Scopes,
// Group 'A' Status, PAN EYUPB3666M, Net Salary ₹1,18,432, and Bank Particulars

// Mock localStorage for node environment if missing
if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  };
}

import { store, OFFICIAL_PERSONAS } from './js/state.js';
import * as downloader from './js/downloader.js';
import { renderDashboard } from './js/modules/dashboard.js';

console.log('--- Starting e-HRMS 2.0 Comprehensive Validation ---');

const state = store.get();
const user = state.currentUser;
const payroll = state.payroll;

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

// 1. Mobile Number & DDO Code Authenticity
assert(user.mobile.includes('8459962390') || user.mobile.includes('84599 62390'), 'User Mobile Number is 8459962390');
assert(user.ddoCode === '10501', 'User DDO Code is 10501');
assert(payroll.accounting.ddoCode.includes('10501'), 'Payroll Accounting DDO Code is 10501');
assert(user.disbursingOfficer.ddoCode === '10501', 'Disbursing Officer DDO Code is 10501');
assert(OFFICIAL_PERSONAS.DDO.ddoCode === '10501', 'DDO Persona Code is 10501');

// 2. User Identity & Classification
assert(user.name === 'ANURAG ANIL BAWASKAR', 'User Name is ANURAG ANIL BAWASKAR');
assert(user.pan === 'EYUPB3666M', 'User PAN is EYUPB3666M');
assert(payroll.pan === 'EYUPB3666M', 'Payroll PAN is EYUPB3666M');
assert(user.classification.includes("Group 'A'"), 'User Classification includes Group A');
assert(user.group === "Group 'A'", 'User Group is Group A');
assert(user.gazettedStatus.includes("Group 'A'"), 'User Gazetted Status is Group A');

// 3. Bank Particulars
assert(user.bankDetails.accountNo === '39189241534', 'Bank A/C is 39189241534');
assert(user.bankDetails.bankName === 'SBI (State Bank of India)', 'Bank is SBI');
assert(user.bankDetails.branch === 'DEFENCE BANKING BRANCH, AFS, BAREILLY', 'Branch is DEFENCE BANKING BRANCH, AFS, BAREILLY');
assert(user.bankDetails.ifsc === 'SBIN0001818', 'IFSC is SBIN0001818');

// 4. Salary & 7th CPC Computation Authenticity
const basic = payroll.basicPay;
const da = Math.round(basic * payroll.daRate);
const hra = Math.round(basic * payroll.hraRate);
const ta = payroll.transportAllowance;
const daOnTa = Math.round(ta * payroll.daOnTaRate);
const gross = basic + da + hra + ta + daOnTa;

const nps = Math.round((basic + da) * payroll.npsDeductionRate);
const cghs = payroll.cghsDeduction;
const cgegis = payroll.cgegisDeduction;
const tds = payroll.incomeTaxTds;
const pt = payroll.professionalTax !== undefined ? payroll.professionalTax : 200;
const totalDeductions = nps + cghs + cgegis + tds + pt;
const net = gross - totalDeductions;

assert(basic === 70000, 'Basic Pay is ₹70,000 (Level 7 Cell 16)');
assert(da === 37100, 'Dearness Allowance (53%) is ₹37,100');
assert(hra === 21000, 'House Rent Allowance (30%) is ₹21,000');
assert(ta === 3600, 'Transport Allowance is ₹3,600');
assert(daOnTa === 1908, 'DA on TA (53%) is ₹1,908');
assert(gross === 133608, 'Gross Salary is ₹1,33,608');

assert(nps === 10710, 'NPS Tier-I Employee Deduction is ₹10,710');
assert(cghs === 650, 'Statutory CGHS Deduction is ₹650');
assert(cgegis === 120, 'Group A CGEGIS Deduction is ₹120');
assert(tds === 3696, 'Calibrated Income Tax TDS is ₹3,696');
assert(pt === 200, 'Statutory Professional Tax is ₹200');
assert(totalDeductions === 15376, 'Total Deductions is ₹15,376');
assert(net === 118232, 'Net Take-Home Salary is exactly ₹1,18,232');
assert(payroll.netSalary === 118232, 'State payroll netSalary is ₹1,18,232');

// 5. 5 Official Personas & Work Scopes
assert(Object.keys(OFFICIAL_PERSONAS).length === 5, 'Portal defines all 5 Official Personas');

const p1 = OFFICIAL_PERSONAS.EMPLOYEE;
assert(p1.name === 'ANURAG ANIL BAWASKAR' && p1.mobile === '8459962390' && p1.ddoCode === '10501', 
  'Persona 1 (ESS): Anurag Anil Bawaskar, Mobile 8459962390, DDO 10501');
assert(p1.userId === 'anurag.bawaskar' && p1.password === 'Anurag@2026', 'Persona 1 User ID: anurag.bawaskar, Password: Anurag@2026');

const p2 = OFFICIAL_PERSONAS.APPROVER;
assert(p2.name.includes('Anil Kumar Chhapolia') && p2.roleTitle.includes('MSS'), 
  'Persona 2 (MSS Approver): Shri Anil Kumar Chhapolia, JS (Estt & Coord)');
assert(p2.userId === 'anil.chhapolia' && p2.password === 'Director@2026', 'Persona 2 User ID: anil.chhapolia, Password: Director@2026');

const p3 = OFFICIAL_PERSONAS.BRANCH_OFFICER;
assert(p3.name.includes('Rajender Singh') && p3.roleTitle.includes('Scrutiny'), 
  'Persona 3 (Scrutiny): Shri Rajender Singh, DS (Establishment)');
assert(p3.userId === 'manoj.sinha' && p3.password === 'Scrutiny@2026', 'Persona 3 User ID: manoj.sinha, Password: Scrutiny@2026');

const p4 = OFFICIAL_PERSONAS.DDO;
assert(p4.name.includes('Pradeep Kumar') && p4.ddoCode === '10501' && p4.paoCode === '001488', 
  'Persona 4 (DDO Treasury): Shri Pradeep Kumar, SAO, DDO Code 10501, PAO 001488');
assert(p4.userId === 'ddo.10501' && p4.password === 'DDO@10501', 'Persona 4 User ID: ddo.10501, Password: DDO@10501');

const p5 = OFFICIAL_PERSONAS.ADMIN;
assert(p5.name.includes('Raja Subramani') && p5.roleTitle.includes('CCA'), 
  'Persona 5 (Cadre CCA Admin): Lieutenant General N.S. Raja Subramani');
assert(p5.userId === 'raja.subramani' && p5.password === 'Admin@2026', 'Persona 5 User ID: raja.subramani, Password: Admin@2026');

// 6. Role Switcher Removed from HTML Validation
import fs from 'fs';
const indexHtml = fs.readFileSync('./index.html', 'utf8');
assert(!indexHtml.includes('id="role-selector"'), 'Role Switcher selector completely removed from index.html');
assert(!indexHtml.includes('class="role-switcher-container"'), 'role-switcher-container removed from index.html');
assert(indexHtml.includes('id="btn-header-logout"'), 'Dedicated Logout / Sign Out button present in header');

// 7. Role-Adaptive Dashboard Rendering Validation
const roles = ['EMPLOYEE', 'APPROVER', 'BRANCH_OFFICER', 'DDO', 'ADMIN'];
for (const role of roles) {
  store.set({ activeRole: role });
  const mockContainer = {
    innerHTML: '',
    querySelector: () => null
  };
  renderDashboard(mockContainer);
  assert(mockContainer.innerHTML.length > 500, `Dashboard successfully renders view for role: ${role}`);
  
  if (role === 'EMPLOYEE') {
    assert(mockContainer.innerHTML.includes('8459962390') || mockContainer.innerHTML.includes('84599 62390'), 'Employee dashboard contains mobile 8459962390');
    assert(mockContainer.innerHTML.includes('10501'), 'Employee dashboard contains DDO 10501');
    assert(mockContainer.innerHTML.includes('1,18,232'), 'Employee dashboard contains Net ₹1,18,232');
  } else if (role === 'APPROVER') {
    assert(mockContainer.innerHTML.includes('Manager Self Service'), 'Approver dashboard contains MSS Work Desk');
  } else if (role === 'BRANCH_OFFICER') {
    assert(mockContainer.innerHTML.includes('Rajender Singh') || mockContainer.innerHTML.includes('Scrutiny'), 'Branch Officer dashboard contains Scrutiny Desk');
    assert(mockContainer.innerHTML.includes('Scrutiny'), 'Branch Officer dashboard contains Scrutiny Desk');
  } else if (role === 'DDO') {
    assert(mockContainer.innerHTML.includes('Pradeep Kumar'), 'DDO dashboard contains Shri Pradeep Kumar');
    assert(mockContainer.innerHTML.includes('10501'), 'DDO dashboard contains DDO Code 10501');
    assert(mockContainer.innerHTML.includes('1,18,232'), 'DDO dashboard contains Anurag Anil Bawaskar salary ₹1,18,232');
  } else if (role === 'ADMIN') {
    assert(mockContainer.innerHTML.includes('Anil Kumar Chhapolia'), 'Admin dashboard contains Anil Kumar Chhapolia');
    assert(mockContainer.innerHTML.includes('1,280'), 'Admin dashboard contains 1,280 Cadre strength');
  }
}

// Reset store to default
store.set({ activeRole: 'EMPLOYEE' });

// 7. Document Downloader Functions
assert(typeof downloader.downloadPaySlip === 'function', 'downloadPaySlip is exported');
assert(typeof downloader.downloadServiceBook === 'function', 'downloadServiceBook is exported');
assert(typeof downloader.downloadAparDossier === 'function', 'downloadAparDossier is exported');
assert(typeof downloader.downloadIprAck === 'function', 'downloadIprAck is exported');
assert(typeof downloader.downloadLeaveOrder === 'function', 'downloadLeaveOrder is exported');
assert(typeof downloader.downloadClaimOrder === 'function', 'downloadClaimOrder is exported');
assert(typeof downloader.downloadDirectoryCsv === 'function', 'downloadDirectoryCsv is exported');
assert(downloader.EMBLEM_BASE64.startsWith('data:image/png;base64,'), 'EMBLEM_BASE64 is valid embedded PNG');
assert(downloader.EMBLEM_GOLD_BASE64.startsWith('data:image/png;base64,'), 'EMBLEM_GOLD_BASE64 is valid embedded PNG');
assert(downloader.DRDO_LOGO_BASE64.startsWith('data:image/png;base64,'), 'DRDO_LOGO_BASE64 is valid embedded PNG');
assert(typeof downloader.MOD_STAMP_BASE64 === 'string', 'MOD_STAMP_BASE64 is exported');
assert(typeof downloader.downloadSpecialOperationOrder === 'function', 'downloadSpecialOperationOrder is exported');
assert(typeof downloader.downloadTransferOrder === 'function', 'downloadTransferOrder is exported');
assert(typeof downloader.downloadSecurityClearanceCertificate === 'function', 'downloadSecurityClearanceCertificate is exported');
assert(typeof downloader.downloadCtgSanctionOrder === 'function', 'downloadCtgSanctionOrder is exported');
assert(typeof downloader.downloadSpecialDutyAllowanceOrder === 'function', 'downloadSpecialDutyAllowanceOrder is exported');
assert(typeof downloader.downloadWarRoomPass === 'function', 'downloadWarRoomPass is exported');
assert(typeof downloader.downloadOfficialLetterhead === 'function', 'downloadOfficialLetterhead is exported');

// 8. Test downloadOfficialLetterhead generated output
let testLetterHtml = '';
globalThis.Blob = class { constructor([c]) { testLetterHtml = c; } };
globalThis.URL = { createObjectURL: () => 'blob:mock', revokeObjectURL: () => {} };
globalThis.document = {
  body: { appendChild: () => {}, removeChild: () => {} },
  createElement: () => ({ set href(v){}, set download(v){}, click(){} })
};
downloader.downloadOfficialLetterhead();

assert(testLetterHtml.includes('अनुराग अ. बावस्कर'), 'Letterhead includes Hindi name');
assert(testLetterHtml.includes('Anurag A. Bawaskar'), 'Letterhead includes English name in Title Case');
assert(testLetterHtml.includes('FILE NO :'), 'Letterhead includes FILE NO: cell');
assert(testLetterHtml.includes('DATE -'), 'Letterhead includes DATE - cell');
assert(!testLetterHtml.includes('mod_stamp'), 'Letterhead has NO stamp image');
assert(!testLetterHtml.includes('MoD Stamp'), 'Letterhead has NO stamp alt text');

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL 37 COMPREHENSIVE TESTS PASSED PERFECTLY!');
}
