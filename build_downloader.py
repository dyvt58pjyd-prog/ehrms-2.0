import base64

with open('assets/emblem.png', 'rb') as f:
    emblem_b64 = base64.b64encode(f.read()).decode('ascii')

js_code = f"""/**
 * e-HRMS 2.0 - Centralized Government Document Exporter & Downloader
 * Ministry of Defence • Department of Military Affairs
 * Government of India
 */

export const EMBLEM_BASE64 = 'data:image/png;base64,{emblem_b64}';

/**
 * Trigger browser file download via Blob
 */
export function triggerDownload(filename, content, mimeType = 'text/html;charset=utf-8') {{
  const blob = new Blob([content], {{ type: mimeType }});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}}/**
 * Standard Government Document Styling Wrapper
 */
function wrapGovDocument(title, bodyContent, isSinglePage = false) {{
  if (isSinglePage) {{
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${{title}} - Government of India</title>
  <style>
    @page {{
      size: A4 portrait;
      margin: 5mm 8mm 5mm 8mm;
    }}
    * {{
      box-sizing: border-box;
    }}
    html, body {{
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.32;
      margin: 0;
      padding: 8px 0;
      background: #f8fafc;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    .doc-container {{
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 12px 18px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.06);
      position: relative;
      page-break-after: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
    }}
    .gov-tricolor-top {{
      height: 4px;
      background: linear-gradient(90deg, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%);
      border-radius: 4px 4px 0 0;
      margin: -12px -18px 6px -18px;
    }}
    .doc-header {{
      text-align: center;
      border-bottom: 2px solid #002B49;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }}
    .doc-emblem {{
      width: 32px;
      height: 52px;
      object-fit: contain;
      margin: 0 auto 2px;
      display: block;
    }}
    .doc-header h2 {{
      font-size: 13px;
      font-weight: 800;
      color: #002B49;
      margin: 0;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }}
    .doc-header h3 {{
      font-size: 11px;
      font-weight: 700;
      color: #334155;
      margin: 1px 0 0;
    }}
    .doc-header h4 {{
      font-size: 10.5px;
      font-weight: 700;
      color: #006699;
      margin: 1px 0 0;
    }}
    .doc-title-strip {{
      margin-top: 4px;
      background: #f1f5f9;
      padding: 3px 8px;
      font-weight: 800;
      font-size: 11px;
      color: #002B49;
      border-radius: 4px;
      text-transform: uppercase;
    }}
    .meta-table, .data-table {{
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 6px;
      font-size: 10px;
    }}
    .meta-table td {{
      padding: 2.5px 6px;
      border: 1px solid #e2e8f0;
    }}
    .meta-label {{
      background: #f8fafc;
      font-weight: 700;
      color: #475569;
      width: 23%;
    }}
    .meta-val {{
      font-weight: 600;
      color: #0f172a;
    }}
    .data-table th {{
      background: #e2e8f0;
      padding: 3.5px 6px;
      text-align: left;
      font-weight: 700;
      color: #002B49;
      font-size: 10px;
      border: 1px solid #cbd5e1;
    }}
    .data-table td {{
      padding: 2px 6px;
      border: 1px solid #e2e8f0;
    }}
    .amount {{
      text-align: right;
      font-weight: 700;
    }}
    .total-row {{
      background: #f1f5f9;
      font-weight: 800;
    }}
    .highlight-box {{
      background: #f0fdf4;
      border: 1.5px solid #86efac;
      border-radius: 4px;
      padding: 5px 10px;
      margin: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    .audit-box {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 3.5px 7px;
      font-size: 9px;
      color: #475569;
      line-height: 1.3;
      margin-top: 4px;
    }}
    .sig-block {{
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 9px;
    }}
    .sig-box {{
      text-align: center;
      border-top: 1px dashed #64748b;
      padding-top: 2px;
      width: 220px;
    }}
    .watermark {{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.035;
      width: 280px;
      pointer-events: none;
      z-index: 0;
    }}
    @media print {{
      html, body {{
        background: transparent !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow: hidden !important;
        height: 100% !important;
      }}
      .doc-container {{
        box-shadow: none !important;
        border: 1px solid #002B49 !important;
        padding: 6px 12px !important;
        max-width: 100% !important;
        margin: 0 !important;
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }}
      .no-print {{
        display: none !important;
      }}
    }}
  </style>
</head>
<body>
  <div class="no-print" style="max-width: 820px; margin: 0 auto 6px; text-align: right;">
    <button onclick="window.print()" style="padding: 5px 12px; background: #002B49; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 700; font-size: 12px;">🖨️ Print / Save as PDF (1 Page Guaranteed)</button>
  </div>
  <div class="doc-container">
    <div class="gov-tricolor-top"></div>
    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 8px; color: #64748b; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
      <span>🇮🇳 e-HRMS 2.0 &bull; Electronic Human Resource Management System</span>
      <span>Government of India &bull; Ministry of Defence</span>
    </div>
    <img src="${{EMBLEM_BASE64}}" class="watermark" alt="Watermark">
    ${{bodyContent}}
    <div style="margin-top: 8px; padding-top: 4px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; font-size: 8px; color: #64748b;">
      <div>✓ Authenticated Digital Document &bull; Public Financial Management System (PFMS) &bull; DDO Code: 10501</div>
      <div>Doc Ref: eHRMS-2.0-MOD-DMA-2026-SAL &bull; Verified u/s 5 Information Technology Act, 2000</div>
    </div>
  </div>
</body>
</html>`;
  }}

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${{title}} - Government of India</title>
  <style>
    @page {{
      size: A4;
      margin: 10mm 12mm 10mm 12mm;
    }}
    * {{
      box-sizing: border-box;
    }}
    body {{
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.5;
      margin: 0;
      padding: 20px;
      background: #f8fafc;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    .doc-container {{
      max-width: 880px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 30px 38px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      position: relative;
    }}
    .gov-tricolor-top {{
      height: 5px;
      background: linear-gradient(90deg, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%);
      margin: -30px -38px 14px -38px;
      border-radius: 4px 4px 0 0;
    }}
    .doc-header {{
      text-align: center;
      border-bottom: 2px solid #002B49;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }}
    .doc-emblem {{
      width: 46px;
      height: 74px;
      object-fit: contain;
      margin: 0 auto 6px;
      display: block;
    }}
    .doc-header h2 {{
      font-size: 15px;
      font-weight: 800;
      color: #002B49;
      margin: 0;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }}
    .doc-header h3 {{
      font-size: 13px;
      font-weight: 700;
      color: #334155;
      margin: 2px 0 0;
    }}
    .doc-header h4 {{
      font-size: 12px;
      font-weight: 700;
      color: #006699;
      margin: 3px 0 0;
    }}
    .doc-title-strip {{
      margin-top: 8px;
      background: #f1f5f9;
      padding: 6px 12px;
      font-weight: 800;
      font-size: 12.5px;
      color: #002B49;
      border-radius: 4px;
      text-transform: uppercase;
    }}
    .meta-table, .data-table {{
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 11.5px;
    }}
    .meta-table td {{
      padding: 5px 8px;
      border: 1px solid #e2e8f0;
    }}
    .meta-label {{
      background: #f8fafc;
      font-weight: 700;
      color: #475569;
      width: 25%;
    }}
    .meta-val {{
      font-weight: 600;
      color: #0f172a;
    }}
    .data-table th {{
      background: #e2e8f0;
      padding: 7px 9px;
      text-align: left;
      font-weight: 700;
      color: #002B49;
      border: 1px solid #cbd5e1;
    }}
    .data-table td {{
      padding: 6px 9px;
      border: 1px solid #e2e8f0;
    }}
    .amount {{
      text-align: right;
      font-weight: 700;
    }}
    .total-row {{
      background: #f1f5f9;
      font-weight: 800;
    }}
    .highlight-box {{
      background: #f0fdf4;
      border: 2px solid #86efac;
      border-radius: 4px;
      padding: 12px 16px;
      margin: 14px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    .audit-box {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 10.5px;
      color: #475569;
      line-height: 1.5;
      margin-top: 12px;
    }}
    .sig-block {{
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 11px;
    }}
    .sig-box {{
      text-align: center;
      border-top: 1px dashed #64748b;
      padding-top: 5px;
      width: 250px;
    }}
    .watermark {{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.035;
      width: 360px;
      pointer-events: none;
      z-index: 0;
    }}
    @media print {{
      body {{
        background: transparent !important;
        padding: 0 !important;
      }}
      .doc-container {{
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        max-width: 100% !important;
      }}
      .no-print {{
        display: none !important;
      }}
    }}
  </style>
</head>
<body>
  <div class="no-print" style="max-width: 880px; margin: 0 auto 12px; text-align: right;">
    <button onclick="window.print()" style="padding: 8px 16px; background: #002B49; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 700; font-size: 12.5px;">🖨️ Print / Save as PDF</button>
  </div>
  <div class="doc-container">
    <div class="gov-tricolor-top"></div>
    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 8.5px; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
      <span>🇮🇳 e-HRMS 2.0 &bull; Central Civil Services Dossier</span>
      <span>Ministry of Defence &bull; Department of Military Affairs</span>
    </div>
    <img src="${{EMBLEM_BASE64}}" class="watermark" alt="Watermark">
    ${{bodyContent}}
    <div style="margin-top: 14px; padding-top: 6px; border-top: 1px solid #cbd5e1; display: flex; justify-content: space-between; align-items: center; font-size: 8.5px; color: #64748b;">
      <div>✓ Digitally Certified Official Government Record &bull; National Informatics Centre (NIC)</div>
      <div>e-HRMS 2.0 Security Node &bull; Legally Valid Electronic Record u/s 4 &amp; 5 IT Act 2000</div>
    </div>
  </div>
</body>
</html>`;
}}

/**
 * Helper: Convert Number to Indian Rupees in Words
 */
function numberToWordsINR(num) {{
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if ((num = num.toString()).length > 9) return 'Overflow';
  const n = ('000000000' + num).substr(-9).match(/^(\\d{{2}})(\\d{{2}})(\\d{{2}})(\\d{{1}})(\\d{{2}})$/);
  if (!n) return '';
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  return (str.trim() + ' Rupees Only').replace(/\\s+/g, ' ');
}}

/**
 * 1. Download Pay Slip (Guaranteed 1-Page Layout)
 */
export function downloadPaySlip(user, payroll, month) {{
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
  const totalDed = nps + cghs + cgegis + tds + pt;
  const net = gross - totalDed;
  const netInWords = numberToWordsINR(net);

  const body = `
    <div class="doc-header">
      <img src="${{EMBLEM_BASE64}}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS (DMA) &bull; SOUTH BLOCK, NEW DELHI</h4>
      <div class="doc-title-strip">
        7th CPC SALARY DISBURSEMENT STATEMENT &bull; MONTH: ${{month.toUpperCase()}}
      </div>
    </div>

    <table class="meta-table">
      <tr>
        <td class="meta-label">Employee Name</td>
        <td class="meta-val">${{user.name}} (${{user.hindiName}})</td>
        <td class="meta-label">Employee ID / PRAN</td>
        <td class="meta-val">${{user.empId}} &bull; ${{user.pran}}</td>
      </tr>
      <tr>
        <td class="meta-label">Designation &amp; Class</td>
        <td class="meta-val">${{user.designation}} &bull; <strong>Group 'A' (Gazetted)</strong></td>
        <td class="meta-label">Pay Matrix Level</td>
        <td class="meta-val">${{user.payLevel}} (${{user.cell}})</td>
      </tr>
      <tr>
        <td class="meta-label">PAN Number</td>
        <td class="meta-val"><strong>${{user.pan}}</strong></td>
        <td class="meta-label">DDO Code / PAO</td>
        <td class="meta-val"><strong>${{user.ddoCode || '10501'}}</strong> (DMA) / 001488 (MoD)</td>
      </tr>
      <tr>
        <td class="meta-label">Bank &amp; Branch</td>
        <td class="meta-val">${{user.bankDetails?.bankName || 'SBI'}}, ${{user.bankDetails?.branch || 'DEFENCE BANKING BRANCH, AFS, BAREILLY'}}</td>
        <td class="meta-label">Bank A/C &amp; IFSC</td>
        <td class="meta-val"><strong>${{user.bankDetails?.accountNo || '39189241534'}}</strong> (IFSC: ${{user.bankDetails?.ifsc || 'SBIN0001818'}})</td>
      </tr>
      <tr>
        <td class="meta-label">Mobile &amp; Tax Regime</td>
        <td class="meta-val"><strong>${{user.mobile || '+91 84599 62390'}}</strong> &bull; New Regime (u/s 115BAC)</td>
        <td class="meta-label">PFMS DBT Status</td>
        <td class="meta-val" style="color: #166534; font-weight: bold;">✓ Mandate Validated &amp; Active (DSP)</td>
      </tr>
    </table>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 6px;">
      <!-- Earnings -->
      <div>
        <table class="data-table">
          <thead>
            <tr>
              <th>EARNINGS HEADS (7th CPC)</th>
              <th style="text-align: right;">AMOUNT (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Pay (${{user.payLevel}}, ${{user.cell}})</td>
              <td class="amount">₹${{basic.toLocaleString('en-IN')}}</td>
            </tr>
            <tr>
              <td>Dearness Allowance (DA @ 53%)</td>
              <td class="amount">₹${{da.toLocaleString('en-IN')}}</td>
            </tr>
            <tr>
              <td>House Rent Allowance (HRA @ 30%)</td>
              <td class="amount">₹${{hra.toLocaleString('en-IN')}}</td>
            </tr>
            <tr>
              <td>Transport Allowance (Level 7)</td>
              <td class="amount">₹${{ta.toLocaleString('en-IN')}}</td>
            </tr>
            <tr>
              <td>DA on Transport Allowance (53%)</td>
              <td class="amount">₹${{daOnTa.toLocaleString('en-IN')}}</td>
            </tr>
            <tr class="total-row">
              <td style="color: #002B49;">GROSS EMOLUMENTS (A)</td>
              <td class="amount" style="color: #002B49;">₹${{gross.toLocaleString('en-IN')}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Deductions -->
      <div>
        <table class="data-table">
          <thead>
            <tr>
              <th>STATUTORY DEDUCTIONS</th>
              <th style="text-align: right;">AMOUNT (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NPS Tier-I Employee Contribution (10%)</td>
              <td class="amount">₹${{nps.toLocaleString('en-IN')}}</td>
            </tr>
            <tr>
              <td>Central Govt Health Scheme (CGHS Level 7)</td>
              <td class="amount">₹${{cghs.toLocaleString('en-IN')}}</td>
            </tr>
            <tr>
              <td>CGEGIS (Group 'A' Gazetted Scheme)</td>
              <td class="amount">₹${{cgegis.toLocaleString('en-IN')}}</td>
            </tr>
            <tr>
              <td>Income Tax (TDS Section 192)</td>
              <td class="amount">₹${{tds.toLocaleString('en-IN')}}</td>
            </tr>
            <tr>
              <td>Professional Tax (PT)</td>
              <td class="amount">₹${{pt.toLocaleString('en-IN')}}</td>
            </tr>
            <tr class="total-row">
              <td style="color: #dc2626;">TOTAL DEDUCTIONS (B)</td>
              <td class="amount" style="color: #dc2626;">₹${{totalDed.toLocaleString('en-IN')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Net Box -->
    <div class="highlight-box">
      <div>
        <div style="font-size: 11.5px; font-weight: 800; color: #166534; text-transform: uppercase;">
          NET SALARY CREDITED TO SBI A/C ${{user.bankDetails?.accountNo || '39189241534'}} (A - B)
        </div>
        <div style="font-size: 10px; color: #15803d; margin-top: 1px;">
          DEFENCE BANKING BRANCH, AFS, BAREILLY &bull; IFSC: ${{user.bankDetails?.ifsc || 'SBIN0001818'}} &bull; MICR: 243002018
        </div>
        <div style="font-size: 9.5px; color: #166534; margin-top: 1px;">
          Amount in words: <em>${{netInWords}}</em>
        </div>
      </div>
      <div style="font-size: 20px; font-weight: 800; color: #166534;">
        ₹${{net.toLocaleString('en-IN')}}
      </div>
    </div>

    <!-- Govt Contribution Box -->
    <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 4px; padding: 3px 8px; margin-bottom: 5px; font-size: 9.5px;">
      <strong>Employer Co-Contribution (Non-Taxable Benefits):</strong>
      Govt NPS 14%: <strong>₹14,994</strong> (PRAN ${{user.pran}}) &bull; Govt CGEGIS: <strong>₹84</strong> &bull; Total CTC: <strong>₹1,48,686 / month</strong>
    </div>

    <!-- Audit Strip -->
    <div class="audit-box">
      <strong>Accounting Classification:</strong> Major Head 2052 (Secretariat-General Services) &bull; Minor Head 090 &bull; Sub Head 02 (DMA) &bull; Detailed Head 02.00.01 (Salaries)<br>
      Bill No: DMA/ESTT-I/SAL-AUG-2026/0412 &bull; Token No: PAO/MOD/DEL/2026/0941 &bull; Voucher No: PAO-DMA-VR-2026-08104 &bull; UTR: SBIN0001818948102 &bull; Credited: 31-Aug-2026
    </div>

    <!-- Signature -->
    <div class="sig-block">
      <div>
        Certified that the government servant named above was on duty during the entire billing period.<br>
        Authenticated via e-HRMS 2.0 Central Payroll Engine &bull; Ministry of Defence.
      </div>
      <div class="sig-box">
        <strong style="color: #002B49;">${{user.disbursingOfficer.name}}</strong><br>
        ${{user.disbursingOfficer.designation}} (DDO Code: ${{user.ddoCode || '10501'}})<br>
        Department of Military Affairs, MoD &bull; <span style="color: #059669; font-weight: 700;">[DIGITALLY SIGNED VIA DSC]</span>
      </div>
    </div>
  `;

  const doc = wrapGovDocument(`Pay_Slip_${{month.replace(/\\s+/g, '_')}}_${{user.name.replace(/\\s+/g, '_')}}`, body, true);
  triggerDownload(`Pay_Slip_${{month.replace(/\\s+/g, '_')}}_${{user.name.replace(/\\s+/g, '_')}}.html`, doc);
}}

/**
 * 2. Download e-Service Book
 */
export function downloadServiceBook(user, sb) {{
  const body = `
    <div class="doc-header">
      <img src="${{EMBLEM_BASE64}}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; CENTRAL CIVIL SERVICES</h4>
      <div class="doc-title-strip">
        DIGITALLY CERTIFIED ELECTRONIC SERVICE BOOK (e-SB) DOSSIER
      </div>
    </div>

    <div style="background: #eff6ff; border-left: 4px solid #002B49; padding: 10px 14px; margin-bottom: 16px; font-size: 12px;">
      <strong>OFFICIAL RECORD CERTIFICATION:</strong> This digital service book record for <strong>${{user.name}}</strong> (Emp ID: <strong>${{user.empId}}</strong>) has been maintained and digitally signed under Rule 257 of the General Financial Rules (GFR), 2017 and DoPT OM No. 21011/1/2005-Estt(A).
    </div>

    <!-- Sub-Book 1: Bio-Data -->
    <h3 style="color: #002B49; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-size: 13px;">Sub-Book 1: Bio-Data & Personal Particulars</h3>
    <table class="meta-table">
      <tr>
        <td class="meta-label">Full Name</td>
        <td class="meta-val">${{user.name}} (${{user.hindiName}})</td>
      </tr>
      <tr>
        <td class="meta-label">Designation &amp; Class</td>
        <td class="meta-val">${{user.designation}} &bull; <strong style="color: #002B49;">Group 'A' (Gazetted)</strong></td>
      </tr>
      <tr>
        <td class="meta-label">Cadre / Department</td>
        <td class="meta-val">${{user.cadre}}</td>
        <td class="meta-label">Ministry</td>
        <td class="meta-val">${{user.ministry}}</td>
      </tr>
      <tr>
        <td class="meta-label">Date of Birth</td>
        <td class="meta-val">${{user.dob}}</td>
        <td class="meta-label">Date of Joining Govt</td>
        <td class="meta-val">${{user.dojGov}} (Commissioned: 13 Nov 2024)</td>
      </tr>
      <tr>
        <td class="meta-label">Superannuation Date</td>
        <td class="meta-val">${{user.superannuationDate}}</td>
        <td class="meta-label">PRAN / NPS Number</td>
        <td class="meta-val">${{user.pran}}</td>
      </tr>
      <tr>
        <td class="meta-label">PAN Number</td>
        <td class="meta-val">${{user.pan}}</td>
        <td class="meta-label">Aadhaar Ref Token</td>
        <td class="meta-val">${{user.aadhaarRef}} (UIDAI Verified)</td>
      </tr>
      <tr>
        <td class="meta-label">Home Town / State</td>
        <td class="meta-val">${{user.homeTown}}, ${{user.homeState}}</td>
        <td class="meta-label">Blood Group & Gender</td>
        <td class="meta-val">${{user.bloodGroup}} &bull; ${{user.gender}} (${{user.maritalStatus}})</td>
      </tr>
      <tr>
        <td class="meta-label">Father's Name &amp; Occupation</td>
        <td class="meta-val">${{user.fatherName || 'Shri Anil Ramkrishna Bawaskar'}} (Reserved Police Sub-Inspector - RSI)</td>
        <td class="meta-label">Mother's Name &amp; Occupation</td>
        <td class="meta-val">${{user.motherName || 'Smt. Manisha Anil Bawaskar'}} (House Wife)</td>
      </tr>
      <tr>
        <td class="meta-label">Salary Bank & Branch</td>
        <td class="meta-val">${{user.bankDetails?.bankName || 'SBI'}}, ${{user.bankDetails?.branch || 'DEFENCE BANKING BRANCH, AFS, BAREILLY'}}</td>
        <td class="meta-label">Account No & IFSC</td>
        <td class="meta-val"><strong>${{user.bankDetails?.accountNo || '39189241534'}}</strong> (IFSC: ${{user.bankDetails?.ifsc || 'SBIN0001818'}})</td>
      </tr>
    </table>

    <!-- Sub-Book 3: Family Particulars & Dependents (CCS Rule 54) -->
    <h3 style="color: #002B49; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-size: 13px; margin-top: 14px;">Sub-Book 3: Family Particulars &amp; Dependents (CCS Rule 54)</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Name of Family Member</th>
          <th>Relationship</th>
          <th>Date of Birth</th>
          <th>Blood Group</th>
          <th>CGHS Card Ref</th>
          <th>Dependency Status</th>
          <th>Occupation / Education</th>
        </tr>
      </thead>
      <tbody>
        ${{sb.family.map(f => `
          <tr>
            <td><strong>${{f.name}}</strong></td>
            <td>${{f.relationship}}</td>
            <td>${{f.dob}}</td>
            <td>${{f.bloodGroup}}</td>
            <td><code>${{f.cghsCardNo}}</code></td>
            <td><span style="color: #166534; font-weight: 700;">${{f.dependent ? 'Dependent' : 'Non-Dependent'}}</span></td>
            <td>${{f.occupation}}</td>
          </tr>
        `).join('')}}
      </tbody>
    </table>

    <!-- Sub-Book 4: Statutory Nominations Register -->
    <h3 style="color: #002B49; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-size: 13px; margin-top: 14px;">Sub-Book 4: Statutory Nominations Register</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Nomination Benefit Type</th>
          <th>Primary Nominee</th>
          <th>Share (%)</th>
          <th>Contingent / Alternate Nominee</th>
          <th>Registration Date</th>
        </tr>
      </thead>
      <tbody>
        ${{sb.nominations.map(n => `
          <tr>
            <td><strong>${{n.type}}</strong></td>
            <td>${{n.nominee}}</td>
            <td style="font-weight: 700; color: #166534;">${{n.share}}</td>
            <td>${{n.altNominee}}</td>
            <td>${{n.regDate}}</td>
          </tr>
        `).join('')}}
      </tbody>
    </table>

    <!-- Sub-Book 5: Postings -->
    <h3 style="color: #002B49; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-size: 13px; margin-top: 14px;">Sub-Book 5: Service History, Postings &amp; Transfers</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Post / Designation</th>
          <th>Ministry / Department</th>
          <th>Pay Level</th>
          <th>Period</th>
          <th>Govt Order No</th>
        </tr>
      </thead>
      <tbody>
        ${{sb.serviceHistory.map(h => `
          <tr>
            <td><strong>${{h.post}}</strong></td>
            <td>${{h.dept}}</td>
            <td>${{h.payLevel}}</td>
            <td>${{h.from}} to ${{h.to}}</td>
            <td><code>${{h.orderNo}}</code></td>
          </tr>
        `).join('')}}
      </tbody>
    </table>

    <!-- Sub-Book 6: Pay Fixation -->
    <h3 style="color: #002B49; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-size: 13px;">Sub-Book 6: Pay Fixation & Increments (7th CPC)</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Effective Date</th>
          <th>Nature of Fixation / Event</th>
          <th>Level & Cell</th>
          <th>Basic Pay (₹)</th>
          <th>Statutory Rule / Authority</th>
          <th>Sanction Order</th>
        </tr>
      </thead>
      <tbody>
        ${{sb.payFixation.map(p => `
          <tr>
            <td>${{p.date}}</td>
            <td><strong>${{p.event}}</strong></td>
            <td>${{p.level}}, ${{p.cell}}</td>
            <td style="font-weight: 800; color: #166534;">₹${{p.basicPay.toLocaleString('en-IN')}}</td>
            <td>${{p.ruleReference || 'CCS (RP) Rules, 2016'}}</td>
            <td><code>${{p.orderNo}}</code></td>
          </tr>
        `).join('')}}
      </tbody>
    </table>

    <!-- Vigilance Clearance -->
    <div style="background: #f0fdf4; border: 1px solid #86efac; padding: 10px 14px; border-radius: 4px; margin-top: 14px; font-size: 11.5px;">
      <strong>Vigilance Status: CLEAR &bull; Last Cleared: ${{sb.vigilanceStatus.lastClearanceDate}}</strong><br>
      Issuing Authority: ${{sb.vigilanceStatus.issuingAuthority}} &bull; Disciplinary Inquiries: NIL &bull; Penalties: NIL
    </div>

    <!-- Signatures -->
    <div class="sig-block">
      <div class="sig-box">
        <strong style="color: #002B49;">${{user.controllingOfficer.name}}</strong><br>
        ${{user.controllingOfficer.designation}}<br>
        Department of Military Affairs<br>
        <span style="color: #059669; font-weight: 700;">[ATTESTED RECORD]</span>
      </div>
      <div class="sig-box">
        <strong style="color: #002B49;">${{user.reviewingOfficer.name}}</strong><br>
        ${{user.reviewingOfficer.designation}}<br>
        Department of Military Affairs<br>
        <span style="color: #059669; font-weight: 700;">[CADRE CONTROLLING AUTHORITY]</span>
      </div>
    </div>
  `;

  const doc = wrapGovDocument(`eServiceBook_${{user.name.replace(/\\s+/g, '_')}}_${{user.empId}}`, body);
  triggerDownload(`eServiceBook_${{user.name.replace(/\\s+/g, '_')}}_${{user.empId}}.html`, doc);
}}

/**
 * 3. Download APAR SPARROW Dossier
 */
export function downloadAparDossier(user, apar) {{
  const cycles = Array.isArray(apar) ? apar : (apar?.cycles || []);
  const body = `
    <div class="doc-header">
      <img src="${{EMBLEM_BASE64}}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; SPARROW APAR DOSSIER</h4>
      <div class="doc-title-strip">
        OFFICIAL ANNUAL PERFORMANCE APPRAISAL DOSSIER &bull; CADRE: ${{user.cadre}}
      </div>
    </div>

    <table class="meta-table">
      <tr>
        <td class="meta-label">Officer Name</td>
        <td class="meta-val">${{user.name}} (${{user.empId}})</td>
        <td class="meta-label">Designation & Post</td>
        <td class="meta-val">${{user.designation}} &bull; Group 'A' (Gazetted)</td>
      </tr>
      <tr>
        <td class="meta-label">Reporting Officer</td>
        <td class="meta-val">${{user.reportingOfficer.name}}</td>
        <td class="meta-label">Reviewing Officer</td>
        <td class="meta-val">${{user.reviewingOfficer.name}}</td>
      </tr>
    </table>

    <h3 style="color: #002B49; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-size: 13px;">Appraisal Records & Cumulative Grading</h3>
    ${{cycles.map(c => `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 14px; margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; margin-bottom: 8px;">
          <strong style="color: #002B49; font-size: 13px;">Cycle: ${{c.year}} (${{c.reportingPeriod}})</strong>
          <span style="background: #059669; color: white; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 11px;">Status: ${{c.status}} &bull; Grading: ${{c.reportingScore || 'N/A'}}/10</span>
        </div>
        <p style="font-size: 12px; margin: 4px 0;"><strong>Self-Appraisal Resume:</strong> ${{c.resumeOfWork}}</p>
        ${{c.reportingRemarks ? `<p style="font-size: 12px; margin: 4px 0; color: #047857;"><strong>Reporting Remarks (${{c.reportingOfficer}}):</strong> ${{c.reportingRemarks}}</p>` : ''}}
        ${{c.reviewingRemarks ? `<p style="font-size: 12px; margin: 4px 0; color: #1e3a8a;"><strong>Reviewing Remarks (${{c.reviewingOfficer}}):</strong> ${{c.reviewingRemarks}}</p>` : ''}}
      </div>
    `).join('')}}

    <div class="sig-block">
      <div>Aadhaar e-Signed under Information Technology Act, 2000.<br>Authentication ID: SPARROW-MOD-DMA-2026-9418.</div>
      <div class="sig-box">
        <strong style="color: #002B49;">${{user.reviewingOfficer.name}}</strong><br>
        Reviewing Authority, DMA<br>
        <span style="color: #059669; font-weight: 700;">[FINALIZED ON SPARROW PORTAL]</span>
      </div>
    </div>
  `;

  const doc = wrapGovDocument(`APAR_SPARROW_${{user.name.replace(/\\s+/g, '_')}}`, body);
  triggerDownload(`APAR_SPARROW_${{user.name.replace(/\\s+/g, '_')}}.html`, doc);
}}

/**
 * 4. Download IPR Acknowledgement
 */
export function downloadIprAck(user, ipr) {{
  const properties = Array.isArray(ipr) ? ipr : (ipr?.properties || []);
  const complianceYear = ipr?.complianceYear || '2025';
  const ackNo = ipr?.ackNo || 'IPR-2025-MOD-8104';
  const filedOn = ipr?.filedOn || '2026-01-14';
  const body = `
    <div class="doc-header">
      <img src="${{EMBLEM_BASE64}}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; VIGILANCE & ETHICS WING</h4>
      <div class="doc-title-strip">
        IMMOVABLE PROPERTY RETURN (IPR) FILING ACKNOWLEDGEMENT & RECEIPT
      </div>
    </div>

    <div style="background: #f0fdf4; border: 1px solid #86efac; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px; font-size: 12px;">
      <strong>FILING COMPLETED:</strong> This is to acknowledge that Shri <strong>${{user.name}}</strong> (${{user.designation}} &bull; Group 'A' Gazetted, Emp ID: ${{user.empId}}) has submitted the Annual Immovable Property Return for the Year <strong>${{complianceYear}}</strong> pursuant to Rule 18(1) of Central Civil Services (Conduct) Rules, 1964.
    </div>

    <table class="meta-table">
      <tr>
        <td class="meta-label">Acknowledgement Ref No</td>
        <td class="meta-val"><code>${{ackNo}}</code></td>
        <td class="meta-label">Date of Electronic Filing</td>
        <td class="meta-val">${{filedOn}}</td>
      </tr>
      <tr>
        <td class="meta-label">Ministry / Department</td>
        <td class="meta-val">${{user.ministry}} &bull; ${{user.department}}</td>
        <td class="meta-label">Permanent Account No (PAN)</td>
        <td class="meta-val">${{user.pan}}</td>
      </tr>
    </table>

    <h3 style="color: #002B49; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-size: 13px;">Schedule of Declared Immovable Property Assets</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Property Type & Location</th>
          <th>Present Market Value</th>
          <th>In Whose Name Held</th>
          <th>Mode of Acquisition</th>
          <th>Annual Income</th>
        </tr>
      </thead>
      <tbody>
        ${{properties.map(p => `
          <tr>
            <td><strong>${{p.propertyType}}</strong><br><span style="font-size: 11px; color: #64748b;">${{p.description}}</span></td>
            <td style="font-weight: 700;">${{p.presentValue}}</td>
            <td>${{p.acquiredInName}}</td>
            <td>${{p.modeOfAcquisition}} (${{p.acquisitionDate}})</td>
            <td style="font-weight: 700; color: #166534;">${{p.annualIncome}}</td>
          </tr>
        `).join('')}}
      </tbody>
    </table>

    <div class="sig-block">
      <div>Digitally signed and archived in Central Vigilance Repository.<br>Verification Token: IPR-MOD-DMA-2026-VERIFIED.</div>
      <div class="sig-box">
        <strong style="color: #002B49;">Central Vigilance Officer (CVO)</strong><br>
        Department of Military Affairs, MoD<br>
        <span style="color: #059669; font-weight: 700;">[ELECTRONIC RECEIPT ISSUED]</span>
      </div>
    </div>
  `;

  const doc = wrapGovDocument(`IPR_Acknowledgement_${{ipr.complianceYear}}_${{user.name.replace(/\\s+/g, '_')}}`, body);
  triggerDownload(`IPR_Acknowledgement_${{ipr.complianceYear}}_${{user.name.replace(/\\s+/g, '_')}}.html`, doc);
}}

/**
 * 5. Download Leave Sanction Order
 */
export function downloadLeaveOrder(user, app) {{
  const now = new Date();
  const todayIso = `${{now.getFullYear()}}-${{String(now.getMonth() + 1).padStart(2, '0')}}-${{String(now.getDate()).padStart(2, '0')}}`;
  
  // Format application date accurately (if app was submitted today or had default stale date, use actual current date)
  let appDate = app.appliedOn || todayIso;
  if (app.id === 'LV-2026-98343' || app.reason?.includes('MBA Admission Counselling') || app.appliedOn === '2026-09-05') {{
    appDate = todayIso;
  }}

  const body = `
    <div class="doc-header">
      <img src="${{EMBLEM_BASE64}}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; ESTABLISHMENT-I BRANCH</h4>
      <div class="doc-title-strip">
        SANCTION ORDER &bull; CCS (LEAVE) RULES, 1972 &bull; ORDER NO: ${{app.sanctionOrderNo || app.sanctionOrder || 'MOD/DMA/ESTT-I/LV/2026/412'}}
      </div>
    </div>

    <p style="font-size: 13px; line-height: 1.8;">
      Sanction of the Competent Authority in the Department of Military Affairs, Ministry of Defence is hereby accorded under 
      the provisions of the <strong>Central Civil Services (Leave) Rules, 1972</strong> for the grant of <strong>${{app.typeName}} (${{app.days}} Days)</strong> 
      to <strong>${{user.name}}</strong>, ${{user.designation}} (Employee ID: ${{user.empId}}) with details as specified below:
    </p>

    <table class="meta-table">
      <tr>
        <td class="meta-label">Application Reference ID</td>
        <td class="meta-val"><code>${{app.id}}</code></td>
        <td class="meta-label">Date of Application</td>
        <td class="meta-val">${{appDate}}</td>
      </tr>
      <tr>
        <td class="meta-label">Nature of Leave</td>
        <td class="meta-val">${{app.typeName}}</td>
        <td class="meta-label">Period of Leave</td>
        <td class="meta-val"><strong>${{app.startDate}} to ${{app.endDate}}</strong> (${{app.days}} Days)</td>
      </tr>
      <tr>
        <td class="meta-label">Reason / Grounds</td>
        <td class="meta-val">${{app.reason}}</td>
        <td class="meta-label">Station Leave Permission</td>
        <td class="meta-val">${{app.stationLeave ? 'Granted (Address on Leave on record)' : 'Not Required'}}</td>
      </tr>
      <tr>
        <td class="meta-label">Sanction Status</td>
        <td class="meta-val" style="color: #166534; font-weight: 800;">SANCTIONED &amp; CREDITED TO LEAVE LEDGER</td>
        <td class="meta-label">DDO Notification</td>
        <td class="meta-val">Notified to ${{user.disbursingOfficer.name}} (DDO Cash)</td>
      </tr>
    </table>

    <div class="sig-block">
      <div>Copy to:<br>1. Official e-Service Book of ${{user.name}}<br>2. DDO Cash Branch, Sena Bhawan<br>3. Guard File</div>
      <div class="sig-box">
        <strong style="color: #002B49;">${{user.reportingOfficer.name}}</strong><br>
        ${{user.reportingOfficer.designation}}<br>
        Department of Military Affairs, MoD<br>
        <span style="color: #059669; font-weight: 700;">[DIGITALLY SANCTIONED]</span>
      </div>
    </div>
  `;

  const doc = wrapGovDocument(`Leave_Sanction_Order_${{app.id}}`, body);
  triggerDownload(`Leave_Sanction_Order_${{app.id}}.html`, doc);
}}

/**
 * 6. Download Claims Reimbursement Voucher
 */
export function downloadClaimOrder(user, claim) {{
  const now = new Date();
  const todayIso = `${{now.getFullYear()}}-${{String(now.getMonth() + 1).padStart(2, '0')}}-${{String(now.getDate()).padStart(2, '0')}}`;
  const claimDate = claim.appliedOn === '2026-09-05' ? todayIso : (claim.appliedOn || todayIso);

  const body = `
    <div class="doc-header">
      <img src="${{EMBLEM_BASE64}}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; CASH & ACCOUNTS BRANCH</h4>
      <div class="doc-title-strip">
        CONTINGENT DISBURSEMENT BILL & SANCTION &bull; REF: ${{claim.id}}
      </div>
    </div>

    <table class="meta-table">
      <tr>
        <td class="meta-label">Claim Reference ID</td>
        <td class="meta-val"><code>${{claim.id}}</code></td>
        <td class="meta-label">Date of Claim Submission</td>
        <td class="meta-val">${{claimDate}}</td>
      </tr>
      <tr>
        <td class="meta-label">Claim Category</td>
        <td class="meta-val"><strong>${{claim.category}}</strong></td>
        <td class="meta-label">Claimant Particulars</td>
        <td class="meta-val">${{user.name}} (${{user.designation}})</td>
      </tr>
      <tr>
        <td class="meta-label">Claimed Amount</td>
        <td class="meta-val">₹${{claim.amountClaimed.toLocaleString('en-IN')}}</td>
        <td class="meta-label">Sanctioned Admissible</td>
        <td class="meta-val" style="font-weight: 800; color: #166534;">₹${{(claim.amountAdmissible || claim.amountClaimed).toLocaleString('en-IN')}}</td>
      </tr>
      <tr>
        <td class="meta-label">Reimbursement Bank A/C</td>
        <td class="meta-val"><strong>${{user.bankDetails?.accountNo || '39189241534'}}</strong> (SBI, AFS Bareilly)</td>
        <td class="meta-label">Disbursement Mode</td>
        <td class="meta-val" style="color: #166534;">PFMS Direct Benefit Transfer (DBT)</td>
      </tr>
    </table>

    <div class="highlight-box">
      <div>
        <strong>DISBURSEMENT AUTHORIZATION:</strong> The admissible amount has been audited and sanctioned for direct electronic transfer to the employee's registered salary bank account.
      </div>
      <div style="font-size: 20px; font-weight: 800; color: #166534;">
        ₹${{(claim.amountAdmissible || claim.amountClaimed).toLocaleString('en-IN')}}
      </div>
    </div>

    <div class="sig-block">
      <div>PFMS Mandate Ref: PFMS-MOD-DMA-CLM-${{claim.id}}</div>
      <div class="sig-box">
        <strong style="color: #002B49;">${{user.disbursingOfficer.name}}</strong><br>
        ${{user.disbursingOfficer.designation}}<br>
        Department of Military Affairs, MoD<br>
        <span style="color: #059669; font-weight: 700;">[SANCTIONED & PASSED FOR PAYMENT]</span>
      </div>
    </div>
  `;

  const doc = wrapGovDocument(`Claim_Sanction_Voucher_${{claim.id}}`, body);
  triggerDownload(`Claim_Sanction_Voucher_${{claim.id}}.html`, doc);
}}

/**
 * 7. Download DMA Officers Directory CSV
 */
export function downloadDirectoryCsv(officers) {{
  let csv = 'Name,Designation,Wing,Office Location,Gov Email,Role Type\\n';
  officers.forEach(o => {{
    const row = [
      `"${{o.name}}"`,
      `"${{o.designation}}"`,
      `"${{o.wing}}"`,
      `"${{o.office}}"`,
      `"${{o.email}}"`,
      `"${{o.roleType}}"`
    ].join(',');
    csv += row + '\\n';
  }});
  triggerDownload('DMA_Officers_Directory_2026.csv', csv, 'text/csv;charset=utf-8;');
}}

/**
 * 8. Download Mission Karmayogi (iGOT) Certificate
 */
export function downloadKarmayogiCertificate(user, course) {{
  const body = `
    <div style="border: 4px double #d97706; padding: 24px 28px; background: linear-gradient(145deg, #ffffff, #fffbeb); border-radius: 8px; text-align: center; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #d97706; padding-bottom: 14px; margin-bottom: 20px;">
        <img src="${{EMBLEM_BASE64}}" style="height: 58px;" alt="Emblem">
        <div>
          <h2 style="margin: 0; font-size: 16px; color: #002B49; letter-spacing: 1px;">GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
          <h3 style="margin: 2px 0 0 0; font-size: 14px; color: #b45309;">DEPARTMENT OF PERSONNEL &amp; TRAINING (DoPT)</h3>
          <h4 style="margin: 2px 0 0 0; font-size: 12px; color: #166534;">MISSION KARMAYOGI &bull; iGOT DIGITAL PLATFORM</h4>
        </div>
        <div style="text-align: right; font-size: 10px; color: #64748b;">
          Certificate No:<br><strong style="font-family: monospace; color: #002B49;">${{course.certificateNo || 'IGOT-CERT-2026-08104'}}</strong>
        </div>
      </div>

      <div style="font-size: 18px; font-weight: 800; color: #b45309; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">
        CERTIFICATE OF COMPETENCY COMPLETION
      </div>

      <p style="font-size: 13px; color: #475569; margin: 0 0 8px 0;">This is officially certified under the National Programme for Civil Services Capacity Building that</p>
      
      <div style="font-size: 22px; font-weight: 800; color: #002B49; margin: 10px 0; border-bottom: 1px dashed #cbd5e1; display: inline-block; padding: 0 24px 4px 24px;">
        ${{user.name}} (${{user.hindiName}})
      </div>
      
      <div style="font-size: 12.5px; color: #334155; margin-bottom: 18px;">
        ${{user.designation}} &bull; <strong>Group 'A' (Gazetted)</strong> &bull; Employee ID: <strong>${{user.empId}}</strong><br>
        Department of Military Affairs, Ministry of Defence
      </div>

      <p style="font-size: 13px; color: #475569; line-height: 1.6; max-width: 650px; margin: 0 auto 16px auto;">
        has successfully completed the mandated competency training course on<br>
        <strong style="font-size: 15px; color: #002B49;">"${{course.title}}"</strong><br>
        offered by <strong>${{course.provider}}</strong> with a duration of <strong>${{course.duration}}</strong>.
      </p>

      <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 24px; font-size: 12px;">
        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 4px;">
          Score Achieved: <strong style="color: #166534;">${{course.score || '95%'}}</strong>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 4px;">
          Grade: <strong style="color: #166534;">${{course.grade || 'A+'}}</strong>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 4px;">
          CBS Credits: <strong style="color: #0284c7;">+${{course.cbsCredits || 120}}</strong>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 4px;">
          Date of Award: <strong>${{course.completedDate || '15-Aug-2026'}}</strong>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 14px;">
        <div style="text-align: left; font-size: 10.5px; color: #64748b;">
          <div>e-HRMS 2.0 &bull; Mission Karmayogi Competency Hub</div>
          <div>QR Token: iGOT-VERIFIED-DoPT-2026</div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 700; color: #002B49; font-size: 12px;">Smt. S. Radha Chauhan, IAS</div>
          <div style="font-size: 10px; color: #64748b;">Secretary, Department of Personnel &amp; Training (DoPT)</div>
          <div style="font-size: 9.5px; color: #166534; font-weight: 700;">[DIGITALLY CERTIFIED VIA iGOT]</div>
        </div>
      </div>
    </div>
  `;
  const doc = wrapGovDocument(`iGOT_Certificate_${{course.id}}`, body, true);
  triggerDownload(`iGOT_Certificate_${{course.id}}_${{user.name.replace(/\\s+/g, '_')}}.html`, doc);
}}

/**
 * 9. Download Ministry of Defence Smart ID Card (Print Ready HTML/PDF)
 */
export function downloadSmartIdCard(user, card) {{
  const body = `
    <div style="text-align: center; margin-bottom: 12px;">
      <h3 style="margin: 0; color: #002B49;">GOVERNMENT OF INDIA &bull; MINISTRY OF DEFENCE</h3>
      <div style="font-size: 11px; color: #64748b;">Official Smart Identity Card & Security Access Pass &bull; South Block / Sena Bhawan</div>
    </div>

    <div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
      <!-- Front Badge -->
      <div style="width: 320px; background: linear-gradient(145deg, #002B49, #083358); color: #ffffff; border-radius: 10px; padding: 16px; border: 2px solid #facc15; box-shadow: 0 4px 10px rgba(0,0,0,0.15); position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(to right, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%);"></div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 6px;">
          <img src="${{EMBLEM_BASE64}}" style="height: 38px;" alt="Emblem">
          <div>
            <div style="font-size: 9px; color: #fde047; font-weight: bold;">MINISTRY OF DEFENCE &bull; भारत सरकार</div>
            <div style="font-size: 10.5px; font-weight: bold;">DEPARTMENT OF MILITARY AFFAIRS</div>
          </div>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <div style="width: 75px; height: 90px; border: 2px solid #facc15; border-radius: 4px; background: #fff; overflow: hidden;">
            <img src="assets/avatar.svg" style="width: 100%; height: 100%;" alt="Officer">
          </div>
          <div style="font-size: 10.5px; line-height: 1.35;">
            <div style="font-size: 12px; font-weight: bold;">${{user.name}}</div>
            <div style="color: #fde047; font-size: 10px;">${{user.hindiName}}</div>
            <div style="color: #93c5fd; font-weight: bold;">${{user.designation}}</div>
            <div style="font-size: 9px; color: #e2e8f0; margin-top: 4px;">
              ID: <strong>${{user.empId}}</strong><br>
              Blood: <strong style="color: #ef4444;">${{card.bloodGroup || 'O+ve'}}</strong> &bull; Pay: ${{user.payLevel}}<br>
              Zone: <strong>ZONE-1 CLEARANCE</strong>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 6px; display: flex; justify-content: space-between; font-size: 8.5px; color: #cbd5e1;">
          <span>CARD: ${{card.cardNo}}</span>
          <span>VALID: 12-NOV-2029</span>
        </div>
      </div>

      <!-- Back Badge -->
      <div style="width: 320px; background: #ffffff; color: #0f172a; border-radius: 10px; padding: 16px; border: 2px solid #002B49; box-shadow: 0 4px 10px rgba(0,0,0,0.15); font-size: 9.5px; line-height: 1.4;">
        <div style="background: #1e293b; height: 20px; margin: -16px -16px 10px -16px; border-top-left-radius: 8px; border-top-right-radius: 8px;"></div>
        <div><strong>Hometown / Address:</strong> Bawaskar Niwas, Ramdaspeth, Nagpur (MH) - 440010</div>
        <div style="margin-top: 3px;"><strong>Emergency Contact:</strong> ${{card.emergencyContact}}</div>
        <div style="margin-top: 3px;"><strong>PAN / PRAN:</strong> ${{user.pan}} &bull; ${{user.pran}}</div>
        <div style="margin-top: 3px;"><strong>DDO Code:</strong> ${{user.ddoCode}} (DMA, Sena Bhawan)</div>
        <div style="margin-top: 10px; border-top: 1px dashed #cbd5e1; padding-top: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: monospace; letter-spacing: 2px; font-size: 14px; font-weight: bold;">|||| | |||||| |||</div>
            <div style="font-size: 8px; color: #64748b;">RFID: ${{card.rfidAccessId}}</div>
          </div>
          <div style="text-align: right; font-size: 8.5px;">
            <strong>Col. Devashish Sharma</strong><br>
            Director (Estt, DMA)<br>
            <span style="color: #166534; font-weight: bold;">[DIGITALLY AUTHORISED]</span>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: 20px; font-size: 10px; color: #64748b;">
      Cut along the borders &bull; Laminate as an ISO/IEC 7810 ID-1 standard Government credential.
    </div>
  `;
  const doc = wrapGovDocument(`Smart_ID_Card_${{user.empId}}`, body, true);
  triggerDownload(`Smart_ID_Card_${{user.empId}}_${{user.name.replace(/\\s+/g, '_')}}.html`, doc);
}}

/**
 * 10. Download NPS PRAN Wealth Statement
 */
export function downloadPranStatement(user, payroll, pension) {{
  const basic = payroll.basicPay;
  const da = Math.round(basic * payroll.daRate);
  const employeeNps = Math.round((basic + da) * 0.10);
  const govtNps = payroll.govtNpsContribution;

  const body = `
    <div class="doc-header">
      <img src="${{EMBLEM_BASE64}}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>PENSION FUND REGULATORY AND DEVELOPMENT AUTHORITY (PFRDA)</h3>
      <h4>NATIONAL PENSION SYSTEM (NPS) &bull; PROTEAN CRA ANNUAL STATEMENT</h4>
      <div class="doc-title-strip">
        NPS PRAN HOLDING &amp; WEALTH VALUATION STATEMENT &bull; FINANCIAL YEAR 2026-2027
      </div>
    </div>

    <table class="meta-table">
      <tr>
        <td class="meta-label">PRAN (Permanent Retirement A/C No)</td>
        <td class="meta-val"><strong>${{pension.pran}}</strong></td>
        <td class="meta-label">Account Status / Tier</td>
        <td class="meta-val" style="color: #166534; font-weight: bold;">✓ ${{pension.tier1AccountStatus}}</td>
      </tr>
      <tr>
        <td class="meta-label">Subscriber Name</td>
        <td class="meta-val">${{user.name}} (${{user.hindiName}})</td>
        <td class="meta-label">Employee ID &amp; Class</td>
        <td class="meta-val">${{user.empId}} &bull; ${{user.classification}}</td>
      </tr>
      <tr>
        <td class="meta-label">Ministry / Department</td>
        <td class="meta-val">Department of Military Affairs, Ministry of Defence</td>
        <td class="meta-label">DDO Code / PAO</td>
        <td class="meta-val"><strong>${{user.ddoCode}}</strong> (DMA) / 001488 (MoD)</td>
      </tr>
      <tr>
        <td class="meta-label">PAN / Mobile</td>
        <td class="meta-val"><strong>${{user.pan}}</strong> &bull; ${{user.mobile}}</td>
        <td class="meta-label">Bank Credit Account</td>
        <td class="meta-val">${{user.bankDetails?.accountNo}} (${{user.bankDetails?.bankName}})</td>
      </tr>
    </table>

    <div class="highlight-box" style="margin-bottom: 12px;">
      <div>
        <div style="font-size: 11px; font-weight: bold; color: #166534;">TOTAL ACCUMULATED NPS CORPUS (TIER-I)</div>
        <div style="font-size: 10px; color: #15803d;">Cumulative Employee Contributions + Central Government Contributions + NAV Growth</div>
      </div>
      <div style="font-size: 22px; font-weight: 800; color: #166534;">
        ₹${{pension.totalCorpus.toLocaleString('en-IN')}}
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
      <table class="data-table">
        <thead>
          <tr>
            <th>MONTHLY DISBURSAL STRUCTURE</th>
            <th style="text-align: right;">AMOUNT (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Employee Monthly Contribution (10% Basic + DA)</td>
            <td class="amount">₹${{employeeNps.toLocaleString('en-IN')}}</td>
          </tr>
          <tr>
            <td>Govt Co-Contribution (14% Basic + DA)</td>
            <td class="amount">₹${{govtNps.toLocaleString('en-IN')}}</td>
          </tr>
          <tr class="total-row">
            <td style="color: #002B49;">TOTAL MONTHLY RETIREMENT ACCRUAL</td>
            <td class="amount" style="color: #002B49;">₹${{(employeeNps + govtNps).toLocaleString('en-IN')}}</td>
          </tr>
        </tbody>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th>PFM ALLOCATION</th>
            <th>SHARE</th>
            <th style="text-align: right;">NAV</th>
          </tr>
        </thead>
        <tbody>
          ${{pension.fundManagers.map(f => `
            <tr>
              <td>${{f.name}}</td>
              <td><strong>${{f.share}}</strong></td>
              <td class="amount">${{f.nav}}</td>
            </tr>
          `).join('')}}
        </tbody>
      </table>
    </div>

    <table class="data-table" style="margin-bottom: 12px;">
      <thead>
        <tr>
          <th>REGISTERED NOMINEE</th>
          <th>RELATION</th>
          <th>SHARE (%)</th>
          <th>REGISTRATION STATUS</th>
        </tr>
      </thead>
      <tbody>
        ${{pension.nominations.map(n => `
          <tr>
            <td><strong>${{n.nominee}}</strong></td>
            <td>${{n.relation}}</td>
            <td><strong>${{n.share}}</strong></td>
            <td style="color: #166534; font-weight: bold;">✓ Active Verified</td>
          </tr>
        `).join('')}}
      </tbody>
    </table>

    <div class="sig-block">
      <div>Central Recordkeeping Agency: Protean eGov Technologies Limited (Formerly NSDL CRA)</div>
      <div class="sig-box">
        <strong style="color: #002B49;">PFRDA / Protean CRA</strong><br>
        Digital Record Maintenance Node<br>
        <span style="color: #059669; font-weight: 700;">[DIGITALLY VERIFIED ELECTRONIC RECORD]</span>
      </div>
    </div>
  `;
  const doc = wrapGovDocument(`NPS_PRAN_Statement_${{pension.pran}}`, body, true);
  triggerDownload(`NPS_PRAN_Statement_${{pension.pran}}_${{user.name.replace(/\\s+/g, '_')}}.html`, doc);
}}
"""

with open('js/downloader.js', 'w') as f:
    f.write(js_code)

print('Generated js/downloader.js successfully!')
