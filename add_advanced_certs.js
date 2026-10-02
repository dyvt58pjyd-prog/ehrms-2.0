const fs = require('fs');

const funcs = `
/**
 * 23. Download APAR
 */
export function downloadAPAR(user) {
  const currentYear = new Date().getFullYear();
  const body = \`
    <style>
      @page { size: A4; margin: 15mm; }
      body { font-family: 'Times New Roman', Times, serif; font-size: 11px; margin: 0; padding: 0; line-height: 1.4; }
      .apar-container { border: 2px solid #000; padding: 15px; margin-bottom: 20px; page-break-after: always; }
      .header-img { height: 70px; display: block; margin: 0 auto 10px; }
      h2, h3, h4 { text-align: center; margin: 5px 0; }
      h2 { text-decoration: underline; font-size: 16px; }
      h3 { font-size: 14px; }
      .section-title { background: #d0d0d0; font-weight: bold; padding: 4px; border: 1px solid #000; margin-top: 15px; margin-bottom: 0; font-size: 12px; text-align: center; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
      th, td { border: 1px solid #000; padding: 6px; text-align: left; vertical-align: top; }
      .val-center { text-align: center; }
      .signature-block { display: flex; justify-content: space-between; margin-top: 40px; }
      @media print { body { padding: 0 !important; } .no-print { display: none !important; } .apar-container { box-shadow: none !important; border: 1px solid #000 !important; } }
    </style>
    
    <div class="no-print" style="text-align: right; margin-bottom: 10px;">
      <button onclick="window.print()" style="padding: 6px 14px; background: #000; color: #fff; cursor: pointer; font-weight: bold; border: none; border-radius: 4px;">🖨️ PRINT APAR</button>
    </div>

    <!-- PART 1 & 2 -->
    <div class="apar-container">
      <img src="\${window.location.origin}/assets/mod_logo.png" class="header-img" alt="Logo" onerror="this.style.display='none'">
      <h3>GOVERNMENT OF INDIA<br>MINISTRY OF DEFENCE<br>DEPARTMENT OF MILITARY AFFAIRS</h3>
      <h2>ANNUAL PERFORMANCE ASSESSMENT REPORT (APAR)</h2>
      <h4 style="margin-bottom: 20px;">Report for the year/period from 01.04.\${currentYear-1} to 31.03.\${currentYear}</h4>

      <div class="section-title">PART-I: BASIC INFORMATION</div>
      <table>
        <tr><td style="width: 30%;">1. Name of the Officer</td><td style="width: 70%; font-weight: bold;">\${user.name}</td></tr>
        <tr><td>2. Employee ID</td><td>\${user.empId}</td></tr>
        <tr><td>3. Date of Birth</td><td>\${new Date(user.dob).toLocaleDateString('en-GB')}</td></tr>
        <tr><td>4. Designation/Post Held</td><td>\${user.designation}</td></tr>
        <tr><td>5. Date of Continuous Appointment</td><td>\${new Date(user.dojGov).toLocaleDateString('en-GB')}</td></tr>
        <tr><td>6. Present Pay Level & Cell</td><td>\${user.payLevel}, \${user.cell}</td></tr>
        <tr><td>7. Period of absence from duty</td><td>Earned Leave: 12 Days, Medical Leave: 0 Days</td></tr>
      </table>

      <div class="section-title">PART-II: SELF APPRAISAL</div>
      <p><strong>1. Brief description of duties:</strong><br>
      Handling policy matters related to Armed Forces personnel, preparation of cabinet notes, parliament questions, and coordination with Service Headquarters. Responsible for drafting complex OMs, financial sanction orders, and maintaining classified files.</p>
      
      <p><strong>2. Annual targets and achievements:</strong></p>
      <table>
        <tr><th>Targets / Objectives</th><th>Achievements</th><th>Shortfalls (if any)</th></tr>
        <tr><td>Disposal of VIP References within 15 days</td><td>Achieved 98% disposal rate</td><td>NIL</td></tr>
        <tr><td>Digitization of legacy service records</td><td>Completed 10,000+ files via e-Office</td><td>NIL</td></tr>
        <tr><td>Drafting answers to Parliament Questions</td><td>Handled 45 Starred/Unstarred PQs with zero errors</td><td>NIL</td></tr>
      </table>
      
      <div class="signature-block">
        <div>Date: <strong>10.04.\${currentYear}</strong></div>
        <div style="text-align: center;"><strong>Signature of the Officer reported upon</strong><br>(\${user.name})</div>
      </div>
    </div>

    <!-- PART 3 & 4 -->
    <div class="apar-container">
      <div class="section-title">PART-III: APPRAISAL BY REPORTING OFFICER</div>
      <p><strong>1. Assessment of work output (Weightage: 40%)</strong></p>
      <table>
        <tr><th style="width: 70%;">Attributes</th><th style="width: 30%;">Grading (1-10)</th></tr>
        <tr><td>i) Accomplishment of planned work / work allotted</td><td class="val-center">9.0</td></tr>
        <tr><td>ii) Quality of output</td><td class="val-center">9.5</td></tr>
        <tr><td>iii) Analytical ability</td><td class="val-center">9.0</td></tr>
        <tr><td>iv) Accomplishment of exceptional work / unforeseen tasks</td><td class="val-center">9.0</td></tr>
        <tr><td style="text-align: right; font-weight: bold;">Overall grading on 'Work Output'</td><td class="val-center" style="font-weight: bold;">9.13</td></tr>
      </table>

      <p><strong>2. Assessment of personal attributes (Weightage: 30%)</strong></p>
      <table>
        <tr><th style="width: 70%;">Attributes</th><th style="width: 30%;">Grading (1-10)</th></tr>
        <tr><td>i) Attitude to work</td><td class="val-center">9.0</td></tr>
        <tr><td>ii) Sense of responsibility</td><td class="val-center">9.5</td></tr>
        <tr><td>iii) Maintenance of Discipline</td><td class="val-center">10.0</td></tr>
        <tr><td>iv) Communication skills</td><td class="val-center">9.0</td></tr>
        <tr><td>v) Capacity to work in time limit</td><td class="val-center">9.0</td></tr>
        <tr><td style="text-align: right; font-weight: bold;">Overall grading on 'Personal Attributes'</td><td class="val-center" style="font-weight: bold;">9.30</td></tr>
      </table>

      <p><strong>3. Assessment of functional competency (Weightage: 30%)</strong></p>
      <table>
        <tr><th style="width: 70%;">Attributes</th><th style="width: 30%;">Grading (1-10)</th></tr>
        <tr><td>i) Knowledge of Rules / Regulations / Procedures</td><td class="val-center">9.5</td></tr>
        <tr><td>ii) Strategic planning ability</td><td class="val-center">9.0</td></tr>
        <tr><td>iii) Decision making ability</td><td class="val-center">9.0</td></tr>
        <tr><td>iv) Coordination ability</td><td class="val-center">9.5</td></tr>
        <tr><td style="text-align: right; font-weight: bold;">Overall grading on 'Functional Competency'</td><td class="val-center" style="font-weight: bold;">9.25</td></tr>
      </table>
      
      <p style="margin-top: 15px;"><strong>4. Pen Picture by Reporting Officer:</strong><br>
      The officer is extremely hardworking, dedicated, and possesses excellent drafting skills. He has shown immense analytical ability in handling complex MoD policy matters. Highly recommended for further progression.</p>
      
      <div class="signature-block">
        <div>Date: <strong>05.05.\${currentYear}</strong></div>
        <div style="text-align: center;"><strong>Signature of Reporting Officer</strong><br>Shri R. K. Singh, Deputy Secretary</div>
      </div>

      <div class="section-title">PART-IV: REVIEW BY REVIEWING OFFICER</div>
      <p><strong>1. Do you agree with the assessment made by the reporting officer?</strong> Yes, completely agree.</p>
      <p><strong>2. Overall Grading (1-10):</strong> <span style="font-size: 18px; font-weight: bold; border: 1px solid #000; padding: 2px 10px;">9.22 (Outstanding)</span></p>
      
      <div class="signature-block">
        <div>Date: <strong>20.05.\${currentYear}</strong></div>
        <div style="text-align: center;"><strong>Signature of Reviewing Officer</strong><br>Smt. Kavita Sharma, Joint Secretary</div>
      </div>
    </div>
  \`;
  const doc = \`<!DOCTYPE html><html><head><title>APAR_\${user.empId}</title></head><body>\${body}</body></html>\`;
  triggerDownload(\`APAR_\${user.empId}_\${currentYear}.html\`, doc);
}

/**
 * 24. Download MACP Order
 */
export function downloadMACPOrder(user) {
  const currentYear = new Date().getFullYear();
  const body = \`
    <style>
      @page { size: A4; margin: 20mm; }
      body { font-family: 'Times New Roman', Times, serif; font-size: 14px; margin: 0; padding: 0; line-height: 1.5; }
      .macp-container { padding: 10px; }
      .header-img { height: 70px; display: block; margin: 0 auto 10px; }
      .top-header { text-align: center; font-weight: bold; }
      .ref-bar { display: flex; justify-content: space-between; margin-top: 20px; font-weight: bold; }
      .subject { margin: 30px 0; font-weight: bold; text-align: justify; }
      table { width: 100%; border-collapse: collapse; margin: 20px 0; }
      th, td { border: 1px solid #000; padding: 8px; text-align: center; }
      th { font-weight: bold; }
      @media print { body { padding: 0 !important; } .no-print { display: none !important; } }
    </style>
    <div class="no-print" style="text-align: right; margin-bottom: 10px;">
      <button onclick="window.print()" style="padding: 6px 14px; background: #000; color: #fff; cursor: pointer; font-weight: bold;">🖨️ PRINT MACP ORDER</button>
    </div>
    <div class="macp-container">
      <div class="top-header">
        No. A-26011/12/\${currentYear}-Estt.<br>
        GOVERNMENT OF INDIA<br>
        MINISTRY OF DEFENCE<br>
        DEPARTMENT OF MILITARY AFFAIRS
      </div>
      <div class="ref-bar">
        <div>South Block, New Delhi</div>
        <div>Dated: 12th August, \${currentYear}</div>
      </div>
      
      <div style="text-align: center; text-decoration: underline; font-weight: bold; font-size: 16px; margin-top: 20px;">
        OFFICE ORDER
      </div>
      
      <div class="subject">
        Subject: Grant of financial upgradation under the Modified Assured Career Progression (MACP) Scheme to Group 'A' & 'B' officers of the Department of Military Affairs - regarding.
      </div>
      
      <div style="text-align: justify;">
        In pursuance of the Department of Personnel & Training (DoP&T) OM No. 35034/3/2015-Estt.(D) dated 22.10.2019 and upon the recommendation of the Departmental Screening Committee (DSC), the President is pleased to grant the next financial upgradation under the MACP Scheme to the following officer with effect from the date mentioned against his name:
      </div>
      
      <table>
        <tr>
          <th>S.No.</th>
          <th>Name & Designation</th>
          <th>Present Pay Level (7th CPC)</th>
          <th>Upgraded Pay Level (MACP)</th>
          <th>Date of Effect</th>
        </tr>
        <tr>
          <td>1.</td>
          <td><strong>\${user.name}</strong><br>\${user.designation}</td>
          <td>\${user.payLevel}</td>
          <td><strong>Level 8 (₹47,600 - ₹1,51,100)</strong></td>
          <td>01.07.\${currentYear}</td>
        </tr>
      </table>
      
      <div style="text-align: justify; margin-top: 20px;">
        2. The grant of MACP is subject to the condition that the officer is free from vigilance angle and no disciplinary proceedings are pending or contemplated against him.<br><br>
        3. The officer may exercise his option for fixation of pay under FR 22(I)(a)(1) within one month from the date of issue of this order.
      </div>
      
      <div style="margin-top: 60px; text-align: right; font-weight: bold;">
        (P. K. Sharma)<br>
        Under Secretary to the Government of India<br>
        Tel: 011-2301XXXX
      </div>
      
      <div style="margin-top: 40px; font-size: 12px;">
        <strong>Copy to:</strong><br>
        1. The Officer concerned (\${user.name}).<br>
        2. The Pay & Accounts Officer, Ministry of Defence, South Block.<br>
        3. DDO, Department of Military Affairs.<br>
        4. Service Book / Personal File of the Officer.<br>
        5. IT Cell for uploading on e-HRMS 2.0.
      </div>
    </div>
  \`;
  const doc = \`<!DOCTYPE html><html><head><title>MACP_Order_\${user.empId}</title></head><body>\${body}</body></html>\`;
  triggerDownload(\`MACP_Order_\${user.empId}.html\`, doc);
}

/**
 * 25. Download NPS Statement
 */
export function downloadNPSStatement(user) {
  const currentYear = new Date().getFullYear();
  const body = \`
    <style>
      @page { size: A4; margin: 15mm; }
      body { font-family: Arial, sans-serif; font-size: 12px; margin: 0; padding: 0; line-height: 1.4; color: #333; }
      .nps-container { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; }
      .header-area { display: flex; justify-content: space-between; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px; }
      h2 { color: #2563eb; margin: 0; font-size: 20px; }
      .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
      .info-box { border: 1px solid #ddd; padding: 10px; background: #f9f9f9; }
      .table-title { font-weight: bold; font-size: 14px; background: #2563eb; color: #fff; padding: 5px; margin-bottom: 0; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
      th { background: #f0f0f0; text-align: center; font-size: 11px; }
      .text-left { text-align: left; }
      .highlight { background: #eef2ff; font-weight: bold; }
      @media print { body { padding: 0 !important; } .no-print { display: none !important; } }
    </style>
    
    <div class="no-print" style="text-align: right; margin-bottom: 10px;">
      <button onclick="window.print()" style="padding: 6px 14px; background: #2563eb; color: #fff; cursor: pointer; font-weight: bold; border: none; border-radius: 4px;">🖨️ PRINT NPS SOT</button>
    </div>

    <div class="nps-container">
      <div class="header-area">
        <div>
          <h2>NATIONAL PENSION SYSTEM (NPS)</h2>
          <p style="margin: 5px 0; font-weight: bold;">CENTRAL RECORDKEEPING AGENCY (CRA)</p>
          <p style="margin: 0; font-size: 11px;">STATEMENT OF TRANSACTION (SOT) FOR THE FY \${currentYear-1}-\${currentYear}</p>
        </div>
        <div style="text-align: right;">
          <img src="\${window.location.origin}/assets/mod_logo.png" style="height: 50px;" alt="Logo" onerror="this.style.display='none'">
        </div>
      </div>

      <div class="info-grid">
        <div class="info-box">
          <strong>Subscriber Details</strong><br><br>
          Name: <strong>\${user.name}</strong><br>
          PRAN: <strong>\${user.pran}</strong><br>
          Sector: Central Government<br>
          DDO Reg. No: \${user.ddoCode}<br>
          PAO Reg. No: 001488
        </div>
        <div class="info-box">
          <strong>Value of your NPS Account (Tier-I)</strong><br><br>
          Total Contributions: ₹ 11,20,500.00<br>
          Total Gain/Loss: <span style="color: green;">₹ 4,35,800.50</span><br>
          Total Valuation as on 31.03.\${currentYear}: <br>
          <span style="font-size: 18px; color: #2563eb; font-weight: bold;">₹ 15,56,300.50</span>
        </div>
      </div>

      <div class="table-title">Investment Summary (Tier-I)</div>
      <table>
        <tr>
          <th class="text-left">Pension Fund Manager (PFM)</th>
          <th>Scheme</th>
          <th>NAV as on 31-Mar</th>
          <th>Units Allotted</th>
          <th>Current Value (₹)</th>
        </tr>
        <tr>
          <td class="text-left">SBI Pension Funds Pvt. Ltd.</td>
          <td class="text-left">CG Scheme</td>
          <td>45.8921</td>
          <td>11,324.5420</td>
          <td class="highlight">5,19,706.50</td>
        </tr>
        <tr>
          <td class="text-left">LIC Pension Fund Ltd.</td>
          <td class="text-left">CG Scheme</td>
          <td>42.1154</td>
          <td>12,415.8812</td>
          <td class="highlight">5,22,900.00</td>
        </tr>
        <tr>
          <td class="text-left">UTI Retirement Solutions Ltd.</td>
          <td class="text-left">CG Scheme</td>
          <td>43.7712</td>
          <td>11,735.8904</td>
          <td class="highlight">5,13,694.00</td>
        </tr>
        <tr>
          <td colspan="4" style="text-align: right; font-weight: bold;">Total Portfolio Value:</td>
          <td class="highlight" style="font-size: 14px;">15,56,300.50</td>
        </tr>
      </table>

      <div class="table-title">Contribution Details (Current Financial Year)</div>
      <table>
        <tr>
          <th class="text-left">Month</th>
          <th>Employee Cont. (₹)</th>
          <th>Employer Cont. (₹) (14%)</th>
          <th>Total (₹)</th>
        </tr>
        <tr><td class="text-left">Apr \${currentYear-1}</td><td>9,450.00</td><td>13,230.00</td><td>22,680.00</td></tr>
        <tr><td class="text-left">May \${currentYear-1}</td><td>9,450.00</td><td>13,230.00</td><td>22,680.00</td></tr>
        <tr><td class="text-left">Jun \${currentYear-1}</td><td>9,450.00</td><td>13,230.00</td><td>22,680.00</td></tr>
        <tr><td class="text-left">Jul \${currentYear-1} (Increment)</td><td>9,820.00</td><td>13,748.00</td><td>23,568.00</td></tr>
        <tr><td class="text-left">Aug \${currentYear-1}</td><td>9,820.00</td><td>13,748.00</td><td>23,568.00</td></tr>
        <tr><td class="text-left">Sep \${currentYear-1}</td><td>9,820.00</td><td>13,748.00</td><td>23,568.00</td></tr>
        <tr>
          <td class="text-left" style="font-weight: bold;">Total for FY</td>
          <td class="highlight">1,15,360.00</td>
          <td class="highlight">1,61,504.00</td>
          <td class="highlight" style="font-size: 12px;">2,76,864.00</td>
        </tr>
      </table>

      <div style="font-size: 10px; color: #666; text-align: justify; margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px;">
        <strong>Disclaimer:</strong> This is a computer-generated statement issued by the Central Recordkeeping Agency (CRA) on behalf of the NPS Trust. The valuations are based on the Net Asset Value (NAV) declared by the respective Pension Fund Managers on the closing date. This statement does not require a physical signature.
      </div>
    </div>
  \`;
  const doc = \`<!DOCTYPE html><html><head><title>NPS_Statement_\${user.empId}</title></head><body>\${body}</body></html>\`;
  triggerDownload(\`NPS_Statement_\${user.empId}.html\`, doc);
}

/**
 * 26. Download Transfer / Posting Order
 */
export function downloadTransferOrder(user) {
  const currentYear = new Date().getFullYear();
  const body = \`
    <style>
      @page { size: A4; margin: 25mm; }
      body { font-family: 'Times New Roman', Times, serif; font-size: 14px; margin: 0; padding: 0; line-height: 1.5; }
      .transfer-container { padding: 10px; }
      .header-img { height: 70px; display: block; margin: 0 auto 10px; }
      .top-header { text-align: center; font-weight: bold; font-size: 16px; }
      .ref-bar { display: flex; justify-content: space-between; margin-top: 20px; font-weight: bold; }
      table { width: 100%; border-collapse: collapse; margin: 25px 0; }
      th, td { border: 1px solid #000; padding: 10px; text-align: center; }
      th { font-weight: bold; background: #f5f5f5; }
      @media print { body { padding: 0 !important; } .no-print { display: none !important; } }
    </style>
    <div class="no-print" style="text-align: right; margin-bottom: 10px;">
      <button onclick="window.print()" style="padding: 6px 14px; background: #000; color: #fff; cursor: pointer; font-weight: bold;">🖨️ PRINT TRANSFER ORDER</button>
    </div>
    <div class="transfer-container">
      <div class="top-header" style="font-size: 14px;">
        No. E-11011/4/\${currentYear}-Estt(A)<br>
        <strong>GOVERNMENT OF INDIA<br>MINISTRY OF DEFENCE</strong><br>
        (Department of Military Affairs)
      </div>
      <div class="ref-bar">
        <div>South Block, New Delhi</div>
        <div>Dated: 05th September, \${currentYear}</div>
      </div>
      
      <div style="text-align: center; text-decoration: underline; font-weight: bold; font-size: 16px; margin-top: 30px;">
        NOTIFICATION
      </div>
      
      <div style="text-align: justify; margin-top: 30px;">
        The President is pleased to approve the transfer and posting of the following Group 'A' officer of the Central Secretariat Service (CSS) with immediate effect, until further orders:
      </div>
      
      <table>
        <tr>
          <th>S.No.</th>
          <th>Name of the Officer & EMP ID</th>
          <th>Present Posting</th>
          <th>Posted To</th>
        </tr>
        <tr>
          <td>1.</td>
          <td><strong>\${user.name}</strong><br>(\${user.empId})<br>\${user.designation}</td>
          <td>Department of Military Affairs, MoD (Air-I Section)</td>
          <td><strong>Department of Defence, MoD (D-Navy Section)</strong></td>
        </tr>
      </table>
      
      <div style="text-align: justify; margin-top: 20px;">
        2. The officer is directed to report to the Department of Defence immediately after relinquishing charge of his present post in the Department of Military Affairs.<br><br>
        3. This issues with the approval of the Competent Authority.
      </div>
      
      <div style="margin-top: 60px; text-align: right; font-weight: bold;">
        (Anil Kumar)<br>
        Director (Estt.)<br>
        Tel: 011-2301XXXX
      </div>
      
      <div style="margin-top: 50px; font-size: 12px;">
        <strong>To,</strong><br>
        The Manager,<br>
        Government of India Press,<br>
        Minto Road, New Delhi (for publication in the Gazette of India)
      </div>
      
      <div style="margin-top: 20px; font-size: 12px;">
        <strong>Copy to:</strong><br>
        1. The Officer concerned (\${user.name}).<br>
        2. JS (Estt), Department of Defence.<br>
        3. PAO, Ministry of Defence.<br>
        4. Guard File / e-HRMS 2.0 Portal.
      </div>
    </div>
  \`;
  const doc = \`<!DOCTYPE html><html><head><title>Transfer_Order_\${user.empId}</title></head><body>\${body}</body></html>\`;
  triggerDownload(\`Transfer_Order_\${user.empId}.html\`, doc);
}
`;

let dlCode = fs.readFileSync('js/downloader.js', 'utf8');
dlCode += '\n' + funcs;
fs.writeFileSync('js/downloader.js', dlCode);

let sbCode = fs.readFileSync('js/modules/serviceBook.js', 'utf8');
sbCode = sbCode.replace(
  "import { downloadServiceBook, downloadServiceCertificate, downloadCGHSCertificate, downloadForm26AS, downloadLTCCertificate } from '../downloader.js';",
  "import { downloadServiceBook, downloadServiceCertificate, downloadCGHSCertificate, downloadForm26AS, downloadLTCCertificate, downloadAPAR, downloadMACPOrder, downloadNPSStatement, downloadTransferOrder } from '../downloader.js';"
);

// We need to inject these buttons into the esb header card or page actions
// I'll add them to a new dedicated "Official Documents & Sanction Orders" section in service book so it doesn't clutter the top bar too much.

const injectSection = `
    <!-- Official Documents & Sanction Orders Section -->
    <div style="background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 20px; margin-top: 20px;">
      <h3 style="margin-top: 0; color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
        <i class="fa-solid fa-file-contract"></i> Official Documents & Sanction Orders
      </h3>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 15px;">
        <button class="btn btn-outline" id="btn-download-apar" style="border-color: #3b82f6; color: #3b82f6;">
          📊 Download APAR (ACR)
        </button>
        <button class="btn btn-outline" id="btn-download-macp" style="border-color: #8b5cf6; color: #8b5cf6;">
          📈 MACP / Promotion Order
        </button>
        <button class="btn btn-outline" id="btn-download-nps" style="border-color: #10b981; color: #10b981;">
          💰 NPS Annual Statement
        </button>
        <button class="btn btn-outline" id="btn-download-transfer" style="border-color: #f59e0b; color: #f59e0b;">
          🚚 Transfer / Posting Order
        </button>
      </div>
    </div>
`;

// Insert the new section just before the closing container div or after the current header card
const headerCardEnd = sbCode.indexOf('<!-- Official Certification Header Card -->');
const insertPos = sbCode.indexOf('<div class="esb-header-card">', headerCardEnd);
const nextSectionPos = sbCode.indexOf('<!-- Personal details grid -->', insertPos);

if (nextSectionPos !== -1) {
    sbCode = sbCode.substring(0, nextSectionPos) + injectSection + '\n    ' + sbCode.substring(nextSectionPos);
}

// Add event listeners
const bindLoc = "container.querySelector('#btn-download-service-cert')?.addEventListener('click', () => {";
sbCode = sbCode.replace(
  bindLoc,
  `container.querySelector('#btn-download-apar')?.addEventListener('click', () => downloadAPAR(user));
  container.querySelector('#btn-download-macp')?.addEventListener('click', () => downloadMACPOrder(user));
  container.querySelector('#btn-download-nps')?.addEventListener('click', () => downloadNPSStatement(user));
  container.querySelector('#btn-download-transfer')?.addEventListener('click', () => downloadTransferOrder(user));
  
  ` + bindLoc
);

fs.writeFileSync('js/modules/serviceBook.js', sbCode);
console.log('Successfully added the 4 detailed documents');
