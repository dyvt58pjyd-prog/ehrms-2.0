const fs = require('fs');

const b64 = fs.readFileSync('/tmp/img_base64.txt', 'utf8').trim();
const downloaderPath = 'js/downloader.js';
let lines = fs.readFileSync(downloaderPath, 'utf8').split('\n');

const startIdx = lines.findIndex(line => line.includes('export function downloadServiceCertificate(user) {'));

if (startIdx !== -1) {
  const replaceStart = startIdx - 3;
  
  const newFunc = `/**
 * 17. Download Detailed General Service Certificate (for Banks/Loans)
 */
export function downloadServiceCertificate(user) {
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const refNo = \\\`MOD/DMA/CERT/\\\${new Date().getFullYear()}/\\\${Math.floor(1000 + Math.random() * 9000)}\\\`;

  const body = \\\`
    <div class="gov-tricolor-top"></div>
    <div class="doc-header">
      <img src="data:image/png;base64,\${b64}" style="height: 60px; width: auto; margin-bottom: 5px; object-fit: contain;" alt="Logo">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; CENTRAL CIVIL SERVICES</h4>
      <div class="doc-title-strip">
        OFFICIAL DETAILED SERVICE CERTIFICATE
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin: 12px 0; font-size: 11px; color: #475569; font-weight: 700; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">
      <div>Ref No: \\\${refNo}</div>
      <div>Date: \\\${date}</div>
    </div>

    <div style="font-size: 12px; line-height: 1.6; text-align: justify; margin-bottom: 16px;">
      <p style="margin: 0 0 10px 0;">
        This is to certify and confirm that <strong>\\\${user.name}</strong> (Son/Daughter of \\\${user.fatherName || '...'}) is a regular, permanent, and bona-fide employee of the Government of India, currently serving under the administrative control of the <strong>Department of Military Affairs, Ministry of Defence</strong>.
      </p>
      <p style="margin: 0 0 10px 0;">
        As per the centralized Electronic Service Book (e-HRMS 2.0) records maintained by the Department of Personnel & Training (DoPT) and authenticated by the Cadre Controlling Authority, the detailed service and financial particulars of the official are certified as below:
      </p>
    </div>

    <h3 style="color: #002B49; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-size: 13px; margin-top: 16px; margin-bottom: 6px;">
      I. Personal & Employment Particulars
    </h3>
    <table class="meta-table">
      <tbody>
        <tr>
          <td class="meta-label">Full Name of Employee</td>
          <td class="meta-val">\\\${user.name}</td>
        </tr>
        <tr>
          <td class="meta-label">Employee ID (Govt. ID)</td>
          <td class="meta-val" style="font-family: monospace; font-size: 11px; color: #0369a1;">\\\${user.empId}</td>
        </tr>
        <tr>
          <td class="meta-label">Current Designation</td>
          <td class="meta-val">\\\${user.designation}</td>
        </tr>
        <tr>
          <td class="meta-label">Service Cadre & Class</td>
          <td class="meta-val">\\\${user.cadre || 'Central Civil Services'} / \\\${user.classification || "Group 'A' Gazetted"}</td>
        </tr>
        <tr>
          <td class="meta-label">Department & Station</td>
          <td class="meta-val">Department of Military Affairs, New Delhi</td>
        </tr>
        <tr>
          <td class="meta-label">Date of Birth (Verified)</td>
          <td class="meta-val">\\\${user.dob}</td>
        </tr>
        <tr>
          <td class="meta-label">Date of Initial Govt. Service</td>
          <td class="meta-val">\\\${user.dojGov}</td>
        </tr>
        <tr>
          <td class="meta-label">Date of Superannuation</td>
          <td class="meta-val">\\\${user.superannuationDate}</td>
        </tr>
      </tbody>
    </table>

    <h3 style="color: #002B49; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-size: 13px; margin-top: 16px; margin-bottom: 6px;">
      II. Financial & Entitlement Details
    </h3>
    <table class="meta-table">
      <tbody>
        <tr>
          <td class="meta-label">Pay Level (7th CPC)</td>
          <td class="meta-val" style="color: #047857;">\\\${user.payLevel || 'Level 7'}</td>
        </tr>
        <tr>
          <td class="meta-label">PAN (Verified)</td>
          <td class="meta-val" style="font-family: monospace; text-transform: uppercase;">\\\${user.pan || 'N/A'}</td>
        </tr>
        <tr>
          <td class="meta-label">Official Salary Bank A/c</td>
          <td class="meta-val">
            \\\${user.bankDetails?.bankName || 'State Bank of India'} (A/c No: <span style="font-family: monospace;">\\\${user.bankDetails?.accountNo || 'N/A'}</span>)<br>
            IFSC: \\\${user.bankDetails?.ifsc || 'N/A'}
          </td>
        </tr>
      </tbody>
    </table>

    <h3 style="color: #002B49; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-size: 13px; margin-top: 16px; margin-bottom: 6px;">
      III. Vigilance Clearance
    </h3>
    <div class="highlight-box" style="margin-bottom: 16px;">
      <div style="color: #166534; font-weight: 700;">
        It is certified that NO vigilance/disciplinary proceedings are either pending or contemplated against the official. The official is entirely clear from the vigilance angle as per records.
      </div>
    </div>

    <div class="audit-box">
      <strong>Disclaimer:</strong> This certificate is auto-generated through the e-HRMS 2.0 portal based on the Master Data Records. It does not require a physical ink signature. Its authenticity can be verified via the QR/Token mechanism.
    </div>

    <div class="sig-block">
      <div style="font-size: 10px; color: #64748b; line-height: 1.4;">
        Issued by: <strong>Central e-HRMS 2.0 Infrastructure</strong><br>
        Digital Token: <code style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px;">eHRMS-CERT-\\\${Date.now()}</code><br>
        Generated on: \\\${new Date().toLocaleString('en-GB')}
      </div>
      \\\${generateESignature('Shri Rajender Singh, DS (Estt)', 'Department of Military Affairs', 'Service Certificate Authentication')}
    </div>
  \\\`;
  
  const doc = wrapGovDocument(\\\`Service_Certificate_\\\${user.empId}\\\`, body, true);
  triggerDownload(\\\`Service_Certificate_\\\${user.empId}.html\\\`, doc);
}
`;

  const result = lines.slice(0, replaceStart).join('\n') + '\n\n' + newFunc;
  fs.writeFileSync(downloaderPath, result);
  console.log('Successfully formatted downloader.js!');
} else {
  console.log('Could not find the function definition in the file.');
}
