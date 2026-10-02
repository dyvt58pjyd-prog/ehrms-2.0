// Comprehensive Verification Test for Family Details
import fs from 'fs';

// Mock localStorage for node environment
if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  };
}

let generatedFiles = {};
let blobMap = new Map();
globalThis.Blob = class {
  constructor(parts) {
    this.content = parts.join('');
  }
};
globalThis.URL = {
  createObjectURL: (blob) => {
    const url = 'mock://blob-' + Math.random();
    blobMap.set(url, blob.content);
    return url;
  },
  revokeObjectURL: () => {}
};
globalThis.document = {
  createElement: () => ({
    href: '',
    download: '',
    click: function() {
      generatedFiles[this.download] = blobMap.get(this.href) || '';
    },
    style: {}
  }),
  body: {
    appendChild: () => {},
    removeChild: () => {}
  }
};

console.log('--- Validating Family Particulars & Records in e-HRMS 2.0 ---');

import { store } from './js/state.js';
import * as downloader from './js/downloader.js';

const state = store.get();
const user = state.currentUser;
const sb = state.serviceBook;

let passed = 0;
let failed = 0;

function assert(condition, name) {
  if (condition) {
    console.log(`✅ PASS: ${name}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${name}`);
    failed++;
  }
}

// 1. Father Details
const father = sb.family.find(f => f.relationship === 'Father');
assert(father, 'Father record exists in Sub-Book 3');
assert(father?.name.includes('Anil Ramkrishna Bawaskar'), 'Father name is Anil Ramkrishna Bawaskar');
assert(father?.dob === '1976-10-17', 'Father DOB is 1976-10-17 (17-10-1976)');
assert(father?.bloodGroup === 'O+ve', 'Father Blood Group is O+ve');
assert(father?.occupation.includes('Reserved Police Sub-Inspector') && father?.occupation.includes('RSI'), 'Father Occupation is Reserved Police Sub-Inspector (RSI)');

// 2. Mother Details
const mother = sb.family.find(f => f.relationship === 'Mother');
assert(mother, 'Mother record exists in Sub-Book 3');
assert(mother?.name.includes('Manisha Anil Bawaskar'), 'Mother name is Manisha Anil Bawaskar');
assert(mother?.dob === '1981-06-01', 'Mother DOB is 1981-06-01 (01-06-1981)');
assert(mother?.bloodGroup.toLowerCase().includes('not known'), 'Mother Blood Group is Not Known');
assert(mother?.occupation.includes('House Wife'), 'Mother Occupation is House Wife');

// 3. Sister Details
const sister = sb.family.find(f => f.relationship === 'Sister');
assert(sister, 'Sister record exists in Sub-Book 3');
assert(sister?.name.includes('Rohini Anil Bawaskar'), 'Sister name is Rohini Anil Bawaskar');
assert(sister?.dob === '2004-05-26', 'Sister DOB is 2004-05-26 (26-05-2004)');
assert(sister?.occupation.includes('Bachelor of Science'), 'Sister Education is Bachelor of Science');

// 4. Bio-Data Father/Mother
assert(user.fatherName?.includes('Anil Ramkrishna Bawaskar'), 'currentUser.fatherName is Anil Ramkrishna Bawaskar');
assert(user.motherName?.includes('Manisha Anil Bawaskar'), 'currentUser.motherName is Manisha Anil Bawaskar');

// 5. Nominations
const dcrgNom = sb.nominations.find(n => n.type.includes('DCRG'));
assert(dcrgNom?.nominee.includes('Anil Ramkrishna Bawaskar'), 'DCRG Primary Nominee is Father Anil Ramkrishna Bawaskar');
const npsNom = sb.nominations.find(n => n.type.includes('Manisha Anil Bawaskar'), 'NPS Primary Nominee is Mother Manisha Anil Bawaskar');

// 6. Test generated e-Service Book file content
downloader.downloadServiceBook(user, sb);
const sbFileName = Object.keys(generatedFiles).find(f => f.startsWith('eServiceBook'));
const capturedDoc = generatedFiles[sbFileName] || '';

assert(capturedDoc.includes('Anil Ramkrishna Bawaskar'), 'Generated Service Book contains Father Anil Ramkrishna Bawaskar');
assert(capturedDoc.includes('Reserved Police Sub-Inspector - RSI') || capturedDoc.includes('Reserved Police Sub-Inspector (RSI)'), 'Generated Service Book contains RSI occupation');
assert(capturedDoc.includes('Manisha Anil Bawaskar'), 'Generated Service Book contains Mother Manisha Anil Bawaskar');
assert(capturedDoc.includes('House Wife'), 'Generated Service Book contains House Wife');
assert(capturedDoc.includes('Rohini Anil Bawaskar'), 'Generated Service Book contains Sister Rohini Anil Bawaskar');
assert(capturedDoc.includes('Bachelor of Science'), 'Generated Service Book contains Bachelor of Science');
assert(capturedDoc.includes('Sub-Book 3: Family Particulars'), 'Generated Service Book contains Sub-Book 3');
assert(capturedDoc.includes('Sub-Book 4: Statutory Nominations Register'), 'Generated Service Book contains Sub-Book 4');

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log('🎉 ALL FAMILY DETAILS & SERVICE BOOK TESTS PASSED PERFECTLY!');
} else {
  process.exit(1);
}
