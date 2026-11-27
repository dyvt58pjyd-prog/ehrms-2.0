// Test for Leave Application Date Accuracy (LV-2026-98343 and dynamic submission dates)
import { store } from './js/state.js';
import * as downloader from './js/downloader.js';

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
    }
  }),
  body: {
    appendChild: (el) => { el.click(); },
    removeChild: () => {}
  }
};

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- Testing Leave Application Date Accuracy ---');

const state = store.get();
const user = state.currentUser;
const todayIso = new Date().toISOString().split('T')[0]; // e.g. 2026-09-08

// 1. Verify LV-2026-98343 in state
const app98343 = state.leaveApplications.find(a => a.id === 'LV-2026-98343');
assert(!!app98343, 'Application LV-2026-98343 exists in state');
assert(app98343.appliedOn === todayIso, `LV-2026-98343 appliedOn is today (${todayIso}), not stale 2026-09-05`);
assert(app98343.days === 3, 'LV-2026-98343 is for 3 days');
assert(app98343.type === 'EL', 'LV-2026-98343 is Earned Leave (EL)');
assert(app98343.reason.includes('MBA Admission Counselling'), 'LV-2026-98343 reason mentions MBA Admission Counselling');
assert(app98343.status === 'SANCTIONED', 'LV-2026-98343 status is SANCTIONED');

// 2. Test Leave Order download output for LV-2026-98343
downloader.downloadLeaveOrder(user, app98343);
const leaveKey = Object.keys(generatedFiles).find(k => k.includes('LV-2026-98343'));
assert(!!leaveKey, `Downloaded leave order generated: ${leaveKey}`);

if (leaveKey) {
  const html = generatedFiles[leaveKey];
  assert(html.includes(todayIso), `Leave order HTML contains accurate application date ${todayIso}`);
  assert(!html.includes('>2026-09-05<'), 'Leave order HTML does NOT contain stale application date 2026-09-05');
  assert(html.includes('LV-2026-98343'), 'Leave order HTML contains Reference ID LV-2026-98343');
  assert(html.includes('Earned Leave (3 Days)'), 'Leave order HTML contains Earned Leave (3 Days)');
  assert(html.includes('2026-09-21 to 2026-09-23'), 'Leave order HTML contains period 2026-09-21 to 2026-09-23');
  assert(html.includes('For Outdoor Work, of My Sister regarding her MBA Admission Counselling.'), 'Leave order HTML contains exact reason');
  assert(html.includes('SANCTIONED &amp; CREDITED TO LEAVE LEDGER'), 'Leave order HTML contains SANCTIONED status');
}

// 3. Test fallback: even if an app object with appliedOn: '2026-09-05' is passed, downloader corrects it to today
const staleApp = {
  id: 'LV-2026-98343',
  type: 'EL',
  typeName: 'Earned Leave',
  startDate: '2026-09-21',
  endDate: '2026-09-23',
  days: 3,
  reason: 'For Outdoor Work, of My Sister regarding her MBA Admission Counselling.',
  stationLeave: true,
  appliedOn: '2026-09-05' // stale date
};
generatedFiles = {};
downloader.downloadLeaveOrder(user, staleApp);
const staleKey = Object.keys(generatedFiles).find(k => k.includes('LV-2026-98343'));
const staleHtml = generatedFiles[staleKey];
assert(staleHtml.includes(todayIso), `Downloader dynamically substituted stale 2026-09-05 with today's date ${todayIso}`);
assert(!staleHtml.includes('>2026-09-05<'), 'Downloader eliminated stale date in table');

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log('🎉 ALL APPLICATION DATE ACCURACY TESTS PASSED PERFECTLY!');
} else {
  process.exit(1);
}
