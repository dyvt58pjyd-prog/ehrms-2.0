/**
 * e-HRMS 2.0 - 7th CPC Salary & Monthly Pay Slip Module
 * Department of Military Affairs, Ministry of Defence
 * Government of India
 */

import { store } from '../state.js';
import { downloadPaySlip, downloadForm16, downloadITRV } from '../downloader.js';

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
          <option value="August 2026" selected>August 2026 (Disbursed 31-Aug-2026)</option>
          <option value="July 2026">July 2026 (With Annual Increment)</option>
          <option value="June 2026">June 2026</option>
          <option value="May 2026">May 2026</option>
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
      </div>
    </div>

    <!-- Official Government Pay Slip Document Card -->
    <div class="payslip-wrapper">
      <div class="payslip-header-center">
        <div style="display: flex; justify-content: center; margin-bottom: 15px;">
          <img src="assets/mod_logo.png" alt="MoD Logo" style="height: 70px; width: auto; object-fit: contain;">
        </div>
        <h3>GOVERNMENT OF INDIA &bull; भारत सरकार</h3>
        <h4>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h4>
        <h4>DEPARTMENT OF MILITARY AFFAIRS (DMA), SOUTH BLOCK, NEW DELHI</h4>
        <div style="margin-top: 6px; font-weight: 700; color: var(--goi-blue); font-size: 14px;">
          SALARY DISBURSEMENT STATEMENT FOR THE MONTH OF <span id="payslip-month-label">AUGUST 2026</span>
        </div>
      </div>

      <!-- Officer & DDO Particulars -->
      <div class="payslip-meta-grid">
        <div><strong>Employee Name / कर्मचारी का नाम:</strong> ${user.name} (${user.hindiName})</div>
        <div><strong>Employee ID / कर्मचारी आईडी:</strong> ${user.empId}</div>
        <div><strong>Designation & Class / पदनाम व संवर्ग:</strong> ${user.designation} &bull; <strong style="color: var(--goi-navy);">${user.classification || "Group 'A' (Gazetted)"}</strong></div>
        <div><strong>Pay Matrix Level / वेतन स्तर:</strong> ${user.payLevel} (${user.cell})</div>
        <div><strong>PRAN / NPS Acc No / प्रान संख्या:</strong> ${user.pran}</div>
        <div><strong>Permanent Account Number (PAN):</strong> <strong>${user.pan}</strong></div>
        <div><strong>DDO Code / डीडीओ कोड:</strong> ${user.disbursingOfficer.ddoCode || '201140'} (DDO, Dept of Military Affairs)</div>
        <div><strong>PAO Code / वेतन व लेखा कार्यालय:</strong> 001488 (PAO, MoD, South Block)</div>
        <div><strong>Bank Name & Branch / बैंक व शाखा:</strong> ${user.bankDetails?.bankName || 'SBI'} &bull; ${user.bankDetails?.branch || 'DEFENCE BANKING BRANCH, AFS, BAREILLY'}</div>
        <div><strong>Bank Account No / खाता संख्या:</strong> <strong>${user.bankDetails?.accountNo || '39189241534'}</strong> (${user.bankDetails?.accountType || 'Savings Bank - DSP'})</div>
        <div><strong>IFSC Code / आईएफएससी:</strong> <strong>${user.bankDetails?.ifsc || 'SBIN0001818'}</strong> (MICR: 243002018)</div>
        <div><strong>PFMS DBT Mandate / डीबीटी स्थिति:</strong> <span style="color: #166534; font-weight: 700;">✓ Mandate Active &amp; Validated</span></div>
      </div>

      <!-- Earnings vs Deductions Split Table -->
      <div class="payslip-columns-grid">
        <!-- Column 1: Earnings -->
        <div class="payslip-col-earnings">
          <table class="payslip-table-mini">
            <thead>
              <tr>
                <th>EARNINGS HEADS / परिलब्धियां (7th CPC)</th>
                <th style="text-align: right;">AMOUNT / राशि (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Basic Pay / मूल वेतन</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">${user.payLevel}, ${user.cell}</span>
                </td>
                <td class="amount">₹${basicPay.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Dearness Allowance (DA) / महंगाई भत्ता</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">@ 53% of Basic Pay (MoF OM effective 01.07.2026)</span>
                </td>
                <td class="amount">₹${da.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>House Rent Allowance (HRA) / मकान किराया भत्ता</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">@ 30% for 'X' Class City (Delhi - u/s MoF Rules)</span>
                </td>
                <td class="amount">₹${hra.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Transport Allowance (TA) / परिवहन भत्ता</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">Level 7 Higher TPTA City Rate</span>
                </td>
                <td class="amount">₹${ta.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>DA on Transport Allowance / परिवहन भत्ते पर डी.ए.</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">@ 53% of Transport Allowance</span>
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
                <th>STATUTORY DEDUCTIONS / कटौतियां</th>
                <th style="text-align: right;">AMOUNT / राशि (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>NPS Tier-I Employee Contribution / राष्ट्रीय पेंशन प्रणाली</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">10% of (Basic Pay + DA) credited to PRAN ${user.pran}</span>
                </td>
                <td class="amount">₹${npsTier1.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Central Govt Health Scheme (CGHS) / सीजीएचएस</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">Pay Level 7 Contribution (MoHFW OM S.11011/11/2016)</span>
                </td>
                <td class="amount">₹${cghs.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>CGEGIS (Group 'A' Gazetted Scheme) / समूह बीमा</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">Insurance Fund u/s CGEGIS 1980 Rules (Group 'A')</span>
                </td>
                <td class="amount">₹${cgegis.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Income Tax (TDS) / आयकर कटौती</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">Section 192 (New Tax Regime u/s 115BAC)</span>
                </td>
                <td class="amount">₹${tds.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Professional Tax (PT) / व्यवसाय कर</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">Statutory State Professional Tax Deduction</span>
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

      <!-- Year-to-Date (YTD) Cumulative Statement (FY 2026-2027) -->
      <div class="payslip-ytd-box">
        <div class="payslip-ytd-header">
          <span>📊 Financial Year Cumulative Ledger (FY 2026-27: April 2026 to August 2026)</span>
          <span style="font-size: 11px; font-weight: normal; color: var(--text-secondary);">Tax Regime: New Tax Regime (Section 115BAC)</span>
        </div>
        <div class="payslip-ytd-grid">
          <div class="payslip-ytd-item">
            <span class="payslip-ytd-label">Gross Earnings YTD:</span>
            <span class="payslip-ytd-val">₹6,68,040</span>
          </div>
          <div class="payslip-ytd-item">
            <span class="payslip-ytd-label">Employee NPS YTD:</span>
            <span class="payslip-ytd-val">₹53,550</span>
          </div>
          <div class="payslip-ytd-item">
            <span class="payslip-ytd-label">Income Tax (TDS) YTD:</span>
            <span class="payslip-ytd-val">₹18,780</span>
          </div>
          <div class="payslip-ytd-item">
            <span class="payslip-ytd-label">Net Disbursed YTD:</span>
            <span class="payslip-ytd-val" style="color: #166534;">₹5,92,160</span>
          </div>
        </div>
      </div>

      <!-- Government Treasury & PFMS Accounting Classification Audit Strip -->
      <div class="payslip-audit-strip">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #cbd5e1; padding-bottom: 6px; margin-bottom: 6px; font-weight: 600;">
          <span>Treasury Classification: Major Head 2052 (Secretariat-General Services) &bull; Minor Head 090 &bull; Sub Head 02 (DMA) &bull; Object Head 01 (Salaries)</span>
          <span>Bill No: DMA/ESTT-I/SAL-AUG-2026/0412 (28-Aug-2026)</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Token No: PAO/MOD/DEL/2026/0941 &bull; Voucher No: PAO-DMA-VR-2026-08104 &bull; PFMS ID: PFMS-MOD-DMA-2026-AUG-8104</span>
          <span>Payment Advice / RBI UTR: <strong>SBIN0001818948102</strong> &bull; Credited: 31-Aug-2026 10:14 IST</span>
        </div>
      </div>

      <!-- Government Authentication & Digital Signature Footer -->
      <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--text-muted);">
        <div>
          Certified that the government servant named above was on duty during the entire billing period.<br>
          Generated through Centralized e-HRMS 2.0 &bull; Public Financial Management System (PFMS), Ministry of Finance.
        </div>
        <div style="display: flex; align-items: center; gap: 14px;">
          
          <div style="text-align: center; border-top: 1px dashed #94a3b8; padding-top: 6px; width: 260px;">
          <strong style="color: var(--goi-navy);">${user.disbursingOfficer?.name || 'Shri Pradeep Kumar, SAO'}</strong><br>
          ${user.disbursingOfficer?.designation || 'Drawing & Disbursing Officer (DDO)'}<br>
          Department of Military Affairs, Ministry of Defence<br>
          <span style="color: var(--goi-green); font-weight: bold;"><i class="fa-solid fa-certificate"></i> [DIGITALLY SIGNED VIA e-SIGN DSC]</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const monthSelect = container.querySelector('#select-payslip-month');
  const monthLabel = container.querySelector('#payslip-month-label');
  monthSelect.addEventListener('change', () => {
    monthLabel.textContent = monthSelect.value.toUpperCase();
  });

  container.querySelector('#btn-print-payslip').addEventListener('click', () => window.print());
  container.querySelector('#btn-download-itrv')?.addEventListener('click', () => downloadITRV(user));
  
  container.querySelector('#btn-download-form16')?.addEventListener('click', () => {
    downloadForm16(user);
  });

  container.querySelector('#btn-download-payslip').addEventListener('click', () => {
    downloadPaySlip(user, payroll, monthSelect.value);
  });
}
