const fs = require('fs');

const funcs = `
/**
 * 19. Download CGHS Dependency Certificate
 */
export function downloadCGHSCertificate(user) {
  const body = \`
    <style>
      @page { size: A4; margin: 15mm; }
      body { font-family: Arial, sans-serif; font-size: 12px; margin: 0; padding: 0; }
      .cert-box { border: 4px double #000; padding: 20px; text-align: center; }
      .header-img { height: 60px; margin-bottom: 10px; }
      h2 { text-decoration: underline; margin-bottom: 20px; }
      .content { text-align: left; line-height: 1.8; margin-top: 20px; font-size: 14px; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { border: 1px solid #000; padding: 8px; text-align: left; }
      @media print { body { padding: 0 !important; } .no-print { display: none !important; } }
    </style>
    <div class="no-print" style="text-align: right; margin-bottom: 10px;">
      <button onclick="window.print()" style="padding: 6px 14px; background: #000; color: #fff; font-weight: bold; cursor: pointer;">PRINT CGHS CERT</button>
    </div>
    <div class="cert-box">
      <img src="\${window.location.origin}/assets/mod_logo.png" class="header-img" alt="Logo" onerror="this.style.display='none'">
      <h3>GOVERNMENT OF INDIA<br>MINISTRY OF DEFENCE</h3>
      <h2>CGHS DEPENDENCY CERTIFICATE</h2>
      <div class="content">
        This is to certify that <strong>\${user.name}</strong>, Designation: <strong>\${user.designation}</strong>, EMP ID: <strong>\${user.empId}</strong> is a bonafide employee of the Department of Military Affairs.<br><br>
        The following family members are entirely dependent on him/her and are eligible for medical facilities under the Central Government Health Scheme (CGHS):
      </div>
      <table>
        <tr><th>S.No.</th><th>Name of Dependent</th><th>Relationship</th><th>Age / DOB</th></tr>
        <tr><td>1.</td><td>Smt. Anita Singh</td><td>Wife</td><td>42 Years</td></tr>
        <tr><td>2.</td><td>Master Rahul Singh</td><td>Son</td><td>16 Years</td></tr>
        <tr><td>3.</td><td>Kumari Priya Singh</td><td>Daughter</td><td>14 Years</td></tr>
      </table>
      <div style="margin-top: 50px; text-align: right; font-weight: bold;">
        Signature of Issuing Authority<br>
        Department of Military Affairs
      </div>
    </div>
  \`;
  const doc = \`<!DOCTYPE html><html><head><title>CGHS_Cert_\${user.empId}</title></head><body>\${body}</body></html>\`;
  triggerDownload(\`CGHS_Certificate_\${user.empId}.html\`, doc);
}

/**
 * 20. Download Form 26AS (Annual Tax Statement)
 */
export function downloadForm26AS(user) {
  const currentYear = new Date().getFullYear();
  const body = \`
    <style>
      @page { size: A4; margin: 15mm; }
      body { font-family: 'Courier New', monospace; font-size: 11px; margin: 0; padding: 0; }
      .f26-box { border: 1px solid #333; padding: 20px; }
      h2 { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 20px; }
      table { width: 100%; border-collapse: collapse; margin-top: 15px; }
      th, td { border: 1px solid #666; padding: 6px; text-align: left; }
      th { background: #eee; }
      @media print { body { padding: 0 !important; } .no-print { display: none !important; } }
    </style>
    <div class="no-print" style="text-align: right; margin-bottom: 10px;">
      <button onclick="window.print()" style="padding: 6px 14px; background: #000; color: #fff; font-weight: bold; cursor: pointer;">PRINT FORM 26AS</button>
    </div>
    <div class="f26-box">
      <h2>FORM 26AS (Annual Tax Statement under Section 203AA)</h2>
      <p><strong>Permanent Account Number (PAN):</strong> \${user.pan || 'N/A'}</p>
      <p><strong>Financial Year:</strong> \${currentYear-1}-\${currentYear}</p>
      <p><strong>Assessment Year:</strong> \${currentYear}-\${currentYear+1}</p>
      <p><strong>Name of Assessee:</strong> \${user.name}</p>
      
      <h3>PART A: Details of Tax Deducted at Source</h3>
      <table>
        <tr><th>Name of Deductor</th><th>TAN of Deductor</th><th>Total Amount Paid</th><th>Total Tax Deducted</th><th>Total TDS Deposited</th></tr>
        <tr><td>MINISTRY OF DEFENCE</td><td>DELD01010G</td><td>14,50,000.00</td><td>1,80,800.00</td><td>1,80,800.00</td></tr>
      </table>
      
      <div style="margin-top: 40px; font-size: 10px; text-align: center; border-top: 1px solid #999; padding-top: 10px;">
        This is a system generated statement derived from the TRACES portal and does not require a physical signature.
      </div>
    </div>
  \`;
  const doc = \`<!DOCTYPE html><html><head><title>Form_26AS_\${user.empId}</title></head><body>\${body}</body></html>\`;
  triggerDownload(\`Form_26AS_\${user.empId}.html\`, doc);
}

/**
 * 21. Download LTC Settlement Certificate
 */
export function downloadLTCCertificate(user) {
  const body = \`
    <style>
      @page { size: A4; margin: 15mm; }
      body { font-family: Arial, sans-serif; font-size: 12px; margin: 0; padding: 0; }
      .ltc-box { border: 2px solid #000; padding: 20px; }
      h2 { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
      table { width: 100%; border-collapse: collapse; margin-top: 15px; }
      th, td { border: 1px solid #000; padding: 8px; text-align: left; }
      @media print { body { padding: 0 !important; } .no-print { display: none !important; } }
    </style>
    <div class="no-print" style="text-align: right; margin-bottom: 10px;">
      <button onclick="window.print()" style="padding: 6px 14px; background: #000; color: #fff; font-weight: bold; cursor: pointer;">PRINT LTC SETTLEMENT</button>
    </div>
    <div class="ltc-box">
      <h2>LTC SETTLEMENT / SANCTION ORDER</h2>
      <p style="text-align: right;"><strong>Date:</strong> \${new Date().toLocaleDateString('en-GB')}</p>
      <p><strong>Sanction Order No:</strong> DMA/LTC/\${new Date().getFullYear()}/0892</p>
      
      <p>Sanction of the Competent Authority is hereby accorded for the settlement of Leave Travel Concession (LTC) claim of <strong>\${user.name}, \${user.designation}</strong>.</p>
      
      <table>
        <tr><th>Block Year</th><td>2022-2025 (All India)</td></tr>
        <tr><th>Place of Visit</th><td>Port Blair, Andaman & Nicobar Islands</td></tr>
        <tr><th>Total Fare Claimed</th><td>Rs. 1,45,000/-</td></tr>
        <tr><th>Advance Drawn</th><td>Rs. 1,00,000/-</td></tr>
        <tr><th>Net Amount Payable</th><td><strong>Rs. 45,000/-</strong></td></tr>
      </table>
      
      <p style="margin-top: 20px;">The amount of Rs. 45,000/- will be credited to salary account number \${user.bankDetails?.accountNo || 'XXX'}.</p>
      
      <div style="margin-top: 50px; text-align: right; font-weight: bold;">
        Accounts Officer (PAO)<br>
        Department of Military Affairs
      </div>
    </div>
  \`;
  const doc = \`<!DOCTYPE html><html><head><title>LTC_Cert_\${user.empId}</title></head><body>\${body}</body></html>\`;
  triggerDownload(\`LTC_Certificate_\${user.empId}.html\`, doc);
}
`;

let dlCode = fs.readFileSync('js/downloader.js', 'utf8');
dlCode += '\n' + funcs;
fs.writeFileSync('js/downloader.js', dlCode);

let payslipCode = fs.readFileSync('js/modules/salaryPaySlip.js', 'utf8');
payslipCode = payslipCode.replace('📄 Download Form 16 (Part A)', '📄 Download Form 16 (TDS Cert & Annexure)');
fs.writeFileSync('js/modules/salaryPaySlip.js', payslipCode);

let sbCode = fs.readFileSync('js/modules/serviceBook.js', 'utf8');
sbCode = sbCode.replace(
  "import { downloadServiceBook, downloadServiceCertificate } from '../downloader.js';",
  "import { downloadServiceBook, downloadServiceCertificate, downloadCGHSCertificate, downloadForm26AS, downloadLTCCertificate } from '../downloader.js';"
);

sbCode = sbCode.replace(
  '📄 Download Service Certificate\n        </button>',
  `📄 Download Service Certificate
        </button>
        <button class="btn btn-outline" id="btn-download-cghs" style="margin-left: 8px; border-color: #10b981; color: #10b981;">
          🏥 CGHS Certificate
        </button>
        <button class="btn btn-outline" id="btn-download-f26" style="margin-left: 8px; border-color: #f59e0b; color: #f59e0b;">
          📑 Form 26AS (Tax Credit)
        </button>
        <button class="btn btn-outline" id="btn-download-ltc" style="margin-left: 8px; border-color: #8b5cf6; color: #8b5cf6;">
          ✈️ LTC Settlement Order
        </button>`
);

const bindLoc = "container.querySelector('#btn-download-service-cert')?.addEventListener('click', () => {";
sbCode = sbCode.replace(
  bindLoc,
  `container.querySelector('#btn-download-cghs')?.addEventListener('click', () => downloadCGHSCertificate(user));
  container.querySelector('#btn-download-f26')?.addEventListener('click', () => downloadForm26AS(user));
  container.querySelector('#btn-download-ltc')?.addEventListener('click', () => downloadLTCCertificate(user));
  
  ` + bindLoc
);

fs.writeFileSync('js/modules/serviceBook.js', sbCode);
console.log('Successfully added more certificates!');
