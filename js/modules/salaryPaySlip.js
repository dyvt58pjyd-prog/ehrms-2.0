/**
 * e-HRMS 2.0 - 7th CPC Salary & Monthly Pay Slip Module
 * Department of Military Affairs, Ministry of Defence
 * Government of India
 */

import { store } from '../state.js';
import { downloadPaySlip, downloadForm16, downloadITRV, downloadSbiLoanAgainstFdReceipt } from '../downloader.js';

function numberToWordsINR(num) {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if ((num = num.toString()).length > 9) return 'Overflow';
  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  return (str.trim() + ' Rupees Only').replace(/\s+/g, ' ');
}

function generateDynamicMonthsOptions() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  let options = '';
  for (let i = 0; i < 4; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();
    const val = `${monthName} ${year}`;
    let label = val;
    if (i === 0) {
      const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      const shortMon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
      label += ` (Disbursed ${lastDay}-${shortMon}-${year})`;
    } else if (d.getMonth() === 6) { // July is usually Annual Increment
      label += ` (With Annual Increment)`;
    }
    options += `<option value="${val}" ${i === 0 ? 'selected' : ''}>${label}</option>`;
  }
  return options;
}

export function renderSalaryPaySlip(container) {
  const state = store.get();
  const user = state.currentUser;
  const payroll = state.payroll;

  // 7th CPC Pay Formula Computations
  const basicPay = payroll.basicPay;
  const da = Math.round(basicPay * payroll.daRate); // 53%
  const hra = Math.round(basicPay * payroll.hraRate); // 30%
  const ta = payroll.transportAllowance; // 3,600
  const daOnTa = Math.round(ta * payroll.daRate); // 53% of TA
  const grossPay = basicPay + da + hra + ta + daOnTa;

  const npsTier1 = Math.round((basicPay + da) * payroll.npsDeductionRate); // 10% of (Basic + DA)
  const cghs = payroll.cghsDeduction;
  const cgegis = payroll.cgegisDeduction;
  const tds = payroll.incomeTaxTds;
  const pt = payroll.professionalTax !== undefined ? payroll.professionalTax : 200;
  const totalDeductions = npsTier1 + cghs + cgegis + tds + pt;

  const netPay = grossPay - totalDeductions;
  const netInWords = numberToWordsINR(netPay);

  container.innerHTML = `
    <!-- Top Action Strip -->
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Salary & Pay Slip</span>
        </div>
        <h1 class="page-heading">
          💳 Monthly Pay Slip & Allowances (7th CPC)
          <span class="page-heading-hi">/ मासिक वेतन पर्ची (सातवां केंद्रीय वेतन आयोग)</span>
        </h1>
      </div>
      <div class="page-actions">
        <select class="form-control" id="select-payslip-month" style="width: auto; font-weight: 600;">
          ${generateDynamicMonthsOptions()}
        </select>
        <button class="btn btn-outline" id="btn-print-payslip">
          🖨️ Print Official Pay Slip
        </button>
        <button class="btn btn-primary" id="btn-download-payslip">
          📥 Download PDF
        </button>
        <button class="btn btn-outline" id="btn-download-form16" style="margin-left: 8px; border-color: #0284c7; color: #0284c7; font-weight: bold;">
          📄 Download Form 16 (TDS Cert & Annexure)
        </button>
        <button class="btn btn-outline" id="btn-download-itrv" style="margin-left: 8px; border-color: #ea580c; color: #ea580c; font-weight: bold;">
          ✅ ITR-V Acknowledgment
        </button>
        <button class="btn btn-outline" id="btn-download-sbi-loan" style="margin-left: 8px; border-color: #002D62; color: #002D62; font-weight: bold; background: #f0f7ff;" title="State Bank of India Loan against Fixed Deposit Sanction Receipt">
          🏦 SBI Loan Against FD Receipt
        </button>
      </div>
    </div>

    <!-- Official Government Pay Slip Document Card -->
    <div class="payslip-wrapper">
      <div class="payslip-header-center">
        <div style="display: flex; justify-content: center; margin-bottom: 12px;">
          <img src="assets/mod_logo.png" alt="MoD Logo" style="height: 70px; width: auto; object-fit: contain;">
        </div>
        <div style="font-size: 16px; font-weight: 800; color: #1e3a8a; letter-spacing: 0.5px; text-transform: uppercase;">
          कार्यालय रक्षा लेखा महानियंत्रक
        </div>
        <div style="font-size: 15px; font-weight: 800; color: #0f172a; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 2px;">
          Controller General of Defence Accounts
        </div>
        <div style="font-size: 13.5px; font-weight: 700; color: #334155; margin-top: 3px;">
          DEPARTMENT OF DEFENCE FINANCE (CGDA) &bull; DDO Code: <span style="color: #1e3a8a;">${user.disbursingOfficer?.ddoCode || user.ddoCode || '10501'}</span>
        </div>
        <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-top: 2px;">
          MINISTRY OF DEFENCE, GOVERNMENT OF INDIA &bull; रक्षा मंत्रालय, भारत सरकार
        </div>
        <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">
          उलान बटार मार्ग, पालम, दिल्ली छावनी - 110010 &bull; Ulan Batar Road, Palam, Delhi Cantt - 110010
        </div>
        <div style="margin-top: 10px; font-weight: 800; color: var(--goi-blue); font-size: 14px; border-top: 1px solid #e2e8f0; padding-top: 8px;">
          मासिक वेतन विवरण / SALARY DISBURSEMENT STATEMENT FOR THE MONTH OF <span id="payslip-month-label">AUGUST 2026</span>
        </div>
      </div>

      <!-- Officer & DDO Particulars -->
      <div class="payslip-meta-grid">
        <div><strong>Employee Name / कर्मचारी का नाम:</strong> ${user.name} (${user.hindiName})</div>
        <div><strong>Employee ID / कर्मचारी आईडी:</strong> ${user.empId}</div>
        <div><strong>Designation &amp; Class / पदनाम व संवर्ग:</strong> ${user.designation} &bull; <strong style="color: var(--goi-navy);">${user.classification || "Group 'A' (Gazetted)"}</strong></div>
        <div><strong>Pay Matrix Level / वेतन स्तर:</strong> ${user.payLevel} (${user.cell})</div>
        <div><strong>PRAN / NPS Acc No / प्रान संख्या:</strong> ${user.pran}</div>
        <div><strong>Permanent Account Number (PAN):</strong> <strong>${user.pan}</strong></div>
        <div><strong>Issuing Authority / जारीकर्ता प्राधिकरण:</strong> <strong>Controller General of Defence Accounts (CGDA)</strong></div>
        <div><strong>Department / विभाग:</strong> <strong>DEPARTMENT OF DEFENCE FINANCE (CGDA)</strong></div>
        <div><strong>DDO Code / डीडीओ कोड:</strong> <strong style="color: var(--goi-navy);">${user.disbursingOfficer?.ddoCode || user.ddoCode || '10501'}</strong> &bull; CGDA / Dept of Defence Finance</div>
        <div><strong>Drawing &amp; Disbursing Officer / डीडीओ:</strong> <strong>${user.disbursingOfficer?.name || 'Shri Pradeep Kumar, SAO'}</strong> (${user.disbursingOfficer?.designation || 'Senior Accounts Officer / DDO, CGDA'})</div>
        <div><strong>PAO Code / वेतन व लेखा कार्यालय:</strong> <strong>001488</strong> (PAO, MoD Secretariat / CGDA, South Block, New Delhi)</div>
        <div><strong>DDO Office / डीडीओ कार्यालय:</strong> Office of the CGDA, Ulan Batar Road, Palam, Delhi Cantt / New Delhi</div>
        <div><strong>Bank Name &amp; Branch / बैंक व शाखा:</strong> ${user.bankDetails?.bankName || 'SBI'} &bull; ${user.bankDetails?.branch || 'DEFENCE BANKING BRANCH, AFS, BAREILLY'}</div>
        <div><strong>Bank Account No / खाता संख्या:</strong> <strong>${user.bankDetails?.accountNo || '39189241534'}</strong> (${user.bankDetails?.accountType || 'Savings Bank - DSP'})</div>
        <div><strong>IFSC Code / आईएफएससी:</strong> <strong>${user.bankDetails?.ifsc || 'SBIN0001818'}</strong> (MICR: ${user.bankDetails?.micr || '243002018'})</div>
        <div><strong>PFMS DBT Mandate / डीबीटी स्थिति:</strong> <span style="color: #166534; font-weight: 700;">✓ Mandate Active &amp; Validated (Scheme: ${user.bankDetails?.pfmsSchemeCode || 'PFMS-DEF-CIV-2024'})</span></div>
      </div>

      <!-- Earnings vs Deductions Split Table -->
      <div class="payslip-columns-grid">
        <!-- Column 1: Earnings -->
        <div class="payslip-col-earnings">
          <table class="payslip-table-mini">
            <thead>
              <tr>
                <th>EARNINGS HEADS / परिलब्धियां (DAC 2025 Object Class I)</th>
                <th style="text-align: right;">AMOUNT / राशि (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Basic Pay / मूल वेतन</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">${user.payLevel}, ${user.cell} &bull; DAC 2025 Object Head 01 (Salaries)</span>
                </td>
                <td class="amount">₹${basicPay.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Dearness Allowance (DA) / महंगाई भत्ता</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">@ 53% of Basic Pay &bull; DAC 2025 Object Head 07 (Allowances)</span>
                </td>
                <td class="amount">₹${da.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>House Rent Allowance (HRA) / मकान किराया भत्ता</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">@ 30% for 'X' Class City (Delhi) &bull; DAC 2025 Object Head 07</span>
                </td>
                <td class="amount">₹${hra.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Transport Allowance (TA) / परिवहन भत्ता</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">Level 7 Higher TPTA City Rate &bull; DAC 2025 Object Head 07</span>
                </td>
                <td class="amount">₹${ta.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>DA on Transport Allowance / परिवहन भत्ते पर डी.ए.</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">@ 53% of Transport Allowance &bull; DAC 2025 Object Head 07</span>
                </td>
                <td class="amount">₹${daOnTa.toLocaleString('en-IN')}</td>
              </tr>
              <tr class="payslip-total-row">
                <td style="color: var(--goi-navy); font-size: 13px;">
                  <strong>GROSS EMOLUMENTS (A) / कुल सकल वेतन</strong>
                </td>
                <td class="amount" style="color: var(--goi-navy); font-size: 14px; font-weight: 800;">
                  ₹${grossPay.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Column 2: Deductions -->
        <div class="payslip-col-deductions">
          <table class="payslip-table-mini">
            <thead>
              <tr>
                <th>STATUTORY DEDUCTIONS / कटौतियां (DAC 2025 / Recoveries)</th>
                <th style="text-align: right;">AMOUNT / राशि (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>NPS Tier-I Employee Contribution / राष्ट्रीय पेंशन प्रणाली</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">10% of (Basic Pay + DA) to PRAN ${user.pran} &bull; DAC 2025 Para 18.17</span>
                </td>
                <td class="amount">₹${npsTier1.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Central Govt Health Scheme (CGHS) / सीजीएचएस</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">Level 7 Statutory Rate &bull; DAC 2025 Object Head 06 (Medical)</span>
                </td>
                <td class="amount">₹${cghs.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>CGEGIS (Group 'A' Gazetted Scheme) / समूह बीमा</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">Group 'A' Insurance Fund &bull; Major Head 8011 / DAC 2025</span>
                </td>
                <td class="amount">₹${cgegis.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Income Tax (TDS) / आयकर कटौती</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">Section 192 (New Tax Regime u/s 115BAC) &bull; Major Head 0021</span>
                </td>
                <td class="amount">₹${tds.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Professional Tax (PT) / वृत्तिकर</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">State Statutory Recovery &bull; Major Head 0028</span>
                </td>
                <td class="amount">₹${pt.toLocaleString('en-IN')}</td>
              </tr>
              <tr class="payslip-total-row">
                <td style="color: var(--status-danger); font-size: 13px;">
                  <strong>TOTAL DEDUCTIONS (B) / कुल कटौतियां</strong>
                </td>
                <td class="amount" style="color: var(--status-danger); font-size: 14px; font-weight: 800;">
                  ₹${totalDeductions.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Net Salary Payable Box -->
      <div class="payslip-net-box">
        <div>
          <div style="font-size: 13.5px; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.3px;">
            NET SALARY CREDITED TO SBI A/C 39189241534 (A - B)
          </div>
          <div style="font-size: 11.5px; color: #15803d; margin-top: 3px;">
            Account Holder: <strong>${user.bankDetails?.accountHolder || user.name}</strong> &bull; Bank: <strong>State Bank of India</strong> &bull; Branch: <strong>DEFENCE BANKING BRANCH, AFS, BAREILLY</strong> (IFSC: <strong>${user.bankDetails?.ifsc || 'SBIN0001818'}</strong>)
          </div>
          <div style="font-size: 11px; color: #166534; margin-top: 3px;">
            Amount in words / शब्दों में राशि: <em>${netInWords}</em>
          </div>
        </div>
        <div class="net-amt-val">
          ₹${netPay.toLocaleString('en-IN')}
        </div>
      </div>

      <!-- Government Co-Contribution & Superannuation Ledger Box -->
      <div class="payslip-govt-contrib-box">
        <div>
          <strong style="color: var(--goi-navy);"><i class="fa-solid fa-shield-halved" style="color: var(--goi-blue); margin-right: 6px;"></i> Government / Employer Co-Contribution (Non-Taxable Superannuation Benefit):</strong>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 3px;">
            14% Government NPS Contribution to PRAN ${user.pran}: <strong>₹14,994</strong> &bull; Govt CGEGIS Insurance Contribution: <strong>₹42</strong> &bull; Total Government Monthly Investment: <strong>₹15,036</strong>
          </div>
        </div>
        <div style="text-align: right; font-size: 12px; font-weight: 700; color: var(--goi-navy);">
          Total Cost to Govt (CTC): ₹1,48,644 / month
        </div>
      </div>

      <!-- Year-to-Date (YTD) Cumulative Statement -->
      <div class="payslip-ytd-box">
        <div class="payslip-ytd-header">
          <span id="ytd-period-label">📊 Financial Year Cumulative Ledger</span>
          <span style="font-size: 11px; font-weight: normal; color: var(--text-secondary);">Tax Regime: New Tax Regime (Section 115BAC)</span>
        </div>
        <div class="payslip-ytd-grid">
          <div class="payslip-ytd-item">
            <span class="payslip-ytd-label">Gross Earnings YTD:</span>
            <span class="payslip-ytd-val" id="ytd-gross"></span>
          </div>
          <div class="payslip-ytd-item">
            <span class="payslip-ytd-label">Employee NPS YTD:</span>
            <span class="payslip-ytd-val" id="ytd-nps"></span>
          </div>
          <div class="payslip-ytd-item">
            <span class="payslip-ytd-label">Income Tax (TDS) YTD:</span>
            <span class="payslip-ytd-val" id="ytd-tds"></span>
          </div>
          <div class="payslip-ytd-item">
            <span class="payslip-ytd-label">Net Disbursed YTD:</span>
            <span class="payslip-ytd-val" id="ytd-net" style="color: #166534;"></span>
          </div>
        </div>
      </div>

      <!-- Government Treasury & PFMS Accounting Classification Audit Strip -->
      <div class="payslip-audit-strip">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #cbd5e1; padding-bottom: 6px; margin-bottom: 6px; font-weight: 600;">
          <span>Treasury Classification: Major Head 2052 (Secretariat-General Services) &bull; Minor Head 090 &bull; Sub Head 02 (CGDA / Defence Finance) &bull; Object Head 01 (Salaries)</span>
          <span id="audit-bill"></span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span id="audit-pfms"></span>
          <span id="audit-credited"></span>
        </div>
      </div>

      <!-- Official Government Computer-Generated Statement Box (No Signature Required) -->
      <div class="payslip-computer-gen-box" style="margin-top: 22px; border: 1.5px solid #002B49; background: #f8fafc; border-radius: 6px; padding: 14px 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 12px; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="background: #e0f2fe; color: #002B49; border-radius: 50%; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;">
              🖥️
            </div>
            <div>
              <div style="font-size: 13.5px; font-weight: 800; color: #002B49; letter-spacing: 0.4px; text-transform: uppercase;">
                THIS IS A COMPUTER-GENERATED PAY SLIP &bull; NO SIGNATURE REQUIRED
              </div>
              <div style="font-size: 11.5px; color: #475569; font-weight: 600; margin-top: 2px;">
                यह एक कंप्यूटर जनित वेतन पर्ची है, अतः इस पर किसी हस्ताक्षर की आवश्यकता नहीं है।
              </div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="text-align: right; font-size: 11px; color: #64748b; line-height: 1.45;">
              <div><strong>System Ref:</strong> e-HRMS2.0/SAL/<span id="sys-ref-code">2026/10501</span></div>
              <div id="payslip-gen-timestamp">Generated on: 31-Aug-2026 10:14 IST</div>
            </div>
            <div style="background: #166534; color: #ffffff; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-shield-halved"></i> PFMS VALIDATED
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px 16px; font-size: 11.5px; color: #334155;">
          <div><strong>Disbursing Authority:</strong> Controller General of Defence Accounts (CGDA)</div>
          <div><strong>Disbursing Office:</strong> DEPARTMENT OF DEFENCE FINANCE (CGDA) &bull; DDO Code: <strong>10501</strong></div>
          <div><strong>Pay &amp; Accounts Office:</strong> PAO Code: <strong>001488</strong> (MoD Secretariat / CGDA, South Block, New Delhi)</div>
          <div><strong>Accounting Authority:</strong> Defence Accounts Department (DAD), Ministry of Defence</div>
          <div><strong>Rule Reference:</strong> Rule 257 &amp; 288 of GFR 2017 &bull; Centralized e-Payroll Mandate</div>
          <div><strong>Legal Validity:</strong> Validated Electronic Document under Section 65B of Indian Evidence Act</div>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-print-payslip').addEventListener('click', () => window.print());
  container.querySelector('#btn-download-itrv')?.addEventListener('click', () => downloadITRV(user));
  
  container.querySelector('#btn-download-form16')?.addEventListener('click', () => {
    downloadForm16(user);
  });

  container.querySelector('#btn-download-sbi-loan')?.addEventListener('click', () => {
    const loanData = store.get().sbiFdLoanDetails || {};
    downloadSbiLoanAgainstFdReceipt(user, loanData);
  });

  container.querySelector('#btn-download-payslip').addEventListener('click', () => {
    downloadPaySlip(user, payroll, selectMonth.value);
  });

  // Dynamically calculate YTD and Audit variables based on current month
  const selectMonth = container.querySelector('#select-payslip-month');
  const monthLabel = container.querySelector('#payslip-month-label');
  const ytdPeriodLabel = container.querySelector('#ytd-period-label');
  const elYtdGross = container.querySelector('#ytd-gross');
  const elYtdNps = container.querySelector('#ytd-nps');
  const elYtdTds = container.querySelector('#ytd-tds');
  const elYtdNet = container.querySelector('#ytd-net');
  
  const elAuditBill = container.querySelector('#audit-bill');
  const elAuditPfms = container.querySelector('#audit-pfms');
  const elAuditCred = container.querySelector('#audit-credited');

  function updatePayslipData() {
    const val = selectMonth.value; // e.g. "October 2026"
    
    const parts = val.split(' ');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const shortNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    const monthName = parts[0];
    const year = parseInt(parts[1], 10);
    const monthIndex = monthNames.indexOf(monthName);
    const shortMon = shortNames[monthIndex];
    
    if(monthLabel) monthLabel.textContent = `${monthName.toUpperCase()} ${year}`;
    
    let fyStartYear = year;
    let monthsSinceApril = monthIndex - 3;
    if (monthsSinceApril < 0) {
      monthsSinceApril += 12;
      fyStartYear -= 1;
    }
    const numMonths = monthsSinceApril + 1;
    
    if(ytdPeriodLabel) ytdPeriodLabel.textContent = `📊 Financial Year Cumulative Ledger (FY ${fyStartYear}-${fyStartYear+1}: April ${fyStartYear} to ${monthName} ${year})`;
    if(elYtdGross) elYtdGross.textContent = '₹' + (grossPay * numMonths).toLocaleString('en-IN');
    if(elYtdNps) elYtdNps.textContent = '₹' + (npsTier1 * numMonths).toLocaleString('en-IN');
    if(elYtdTds) elYtdTds.textContent = '₹' + (tds * numMonths).toLocaleString('en-IN');
    if(elYtdNet) elYtdNet.textContent = '₹' + (netPay * numMonths).toLocaleString('en-IN');
    
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    const pad = (n) => String(n).padStart(2, '0');
    
    if(elAuditBill) elAuditBill.textContent = `Bill No: DEF/FIN-CGDA/SAL-${shortMon}-${year}/0412 (${lastDay}-${shortMon}-${year})`;
    if(elAuditPfms) elAuditPfms.innerHTML = `Token No: TK-10501-${year}-${pad(monthIndex+1)} &bull; Voucher No: PAO-CGDA-VR-${year}-08104 &bull; PFMS ID: PFMS-CGDA-FIN-${year}-${shortMon}-8104 &bull; DDO Code: 10501 (Dept of Defence Finance - CGDA)`;
    if(elAuditCred) elAuditCred.innerHTML = `Payment Advice / RBI UTR: <strong>SBIN0001818948102</strong> &bull; Credited: ${lastDay}-${shortMon}-${year} 10:14 IST`;

    const elSysRef = container.querySelector('#sys-ref-code');
    const elGenTimestamp = container.querySelector('#payslip-gen-timestamp');
    if (elSysRef) elSysRef.textContent = `${year}/${shortMon}/10501`;
    if (elGenTimestamp) elGenTimestamp.textContent = `Generated on: ${lastDay}-${shortMon}-${year} 10:14 IST`;
  }

  if(selectMonth) {
    selectMonth.addEventListener('change', updatePayslipData);
    updatePayslipData();
  }
}
