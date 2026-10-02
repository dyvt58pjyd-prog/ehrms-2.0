const fs = require('fs');
const b64 = fs.readFileSync('/tmp/img_base64.txt', 'utf8').trim();
const downloaderPath = 'js/downloader.js';
const lines = fs.readFileSync(downloaderPath, 'utf8').split('\n');

const startIdx = lines.findIndex(line => line.includes('export function downloadServiceCertificate(user) {'));

if (startIdx !== -1) {
  // Find where to start replacing (including the JSDoc comment above it)
  const replaceStart = startIdx - 3;
  
  const newFunc = `/**
 * 17. Download Detailed General Service Certificate (for Banks/Loans)
 */
export function downloadServiceCertificate(user) {
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const refNo = \\\`MOD/DMA/CERT/\\\${new Date().getFullYear()}/\\\${Math.floor(1000 + Math.random() * 9000)}\\\`;

  const body = \\\`
    <div style="font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a; max-width: 800px; margin: 0 auto; padding: 20px;">
      
      <!-- Header Section -->
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1e3a8a; padding-bottom: 20px; margin-bottom: 25px;">
        <div style="flex: 0 0 100px;">
          <img src="data:image/png;base64,\${b64}" alt="Logo" style="width: 100px; height: auto;">
        </div>
        <div style="flex: 1; text-align: center;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px;">
            Government of India
          </h1>
          <h2 style="margin: 5px 0; font-size: 18px; font-weight: 700; color: #334155;">
            Ministry of Defence
          </h2>
          <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #475569;">
            Department of Military Affairs
          </h3>
          <p style="margin: 5px 0 0 0; font-size: 11px; color: #64748b;">
            South Block, Central Secretariat, New Delhi - 110011
          </p>
        </div>
        <div style="flex: 0 0 100px; text-align: right; font-size: 10px; color: #64748b; font-weight: 600;">
          <div>Ref No: \\\${refNo}</div>
          <div style="margin-top: 4px;">Date: \\\${date}</div>
        </div>
      </div>

      <!-- Title -->
      <div style="text-align: center; margin: 30px 0;">
        <div style="font-size: 20px; font-weight: 800; color: #0f172a; text-decoration: underline; text-underline-offset: 4px;">
          OFFICIAL SERVICE CERTIFICATE
        </div>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 600; color: #475569;">
          (ISSUED FOR FINANCIAL / BANKING / LOAN VERIFICATION PURPOSES)
        </div>
      </div>

      <!-- Certification Text -->
      <div style="font-size: 14px; line-height: 1.8; text-align: justify; margin-bottom: 30px;">
        <p style="text-indent: 40px; margin: 0 0 15px 0;">
          This is to certify and confirm that <strong>\\\${user.name}</strong> (Son/Daughter of \\\${user.fatherName || '...'}) is a regular, permanent, and bona-fide employee of the Government of India, currently serving under the administrative control of the <strong>Department of Military Affairs, Ministry of Defence</strong>.
        </p>
        <p style="text-indent: 40px; margin: 0 0 15px 0;">
          As per the centralized Electronic Service Book (e-HRMS 2.0) records maintained by the Department of Personnel & Training (DoPT) and authenticated by the Cadre Controlling Authority, the detailed service and financial particulars of the official are certified as below:
        </p>
      </div>

      <!-- Section 1: Personal Particulars -->
      <h4 style="font-size: 15px; font-weight: 700; color: #1e3a8a; border-left: 4px solid #1e3a8a; padding-left: 10px; margin-bottom: 15px;">
        I. Personal & Employment Particulars
      </h4>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px;">
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; width: 35%; background-color: #f8fafc;">Full Name of Employee</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>\\\${user.name}</strong></td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Employee ID (Govt. ID)</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-family: monospace; font-size: 14px; color: #0369a1;"><strong>\\\${user.empId}</strong></td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Permanent Retirement A/c No (PRAN)</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">\\\${user.pran || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Current Designation</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 700;">\\\${user.designation}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Service Cadre & Classification</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">\\\${user.cadre || 'Central Civil Services'} / \\\${user.classification || "Group 'A' Gazetted"}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Current Department & Station</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1; color: #b91c1c; font-weight: 600;">Department of Military Affairs, New Delhi</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Date of Birth (Verified)</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">\\\${user.dob}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Date of Initial Govt. Service</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">\\\${user.dojGov}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Date of Superannuation (Retirement)</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">\\\${user.superannuationDate}</td>
          </tr>
        </tbody>
      </table>

      <!-- Section 2: Financial Particulars -->
      <h4 style="font-size: 15px; font-weight: 700; color: #1e3a8a; border-left: 4px solid #1e3a8a; padding-left: 10px; margin-bottom: 15px;">
        II. Financial & Entitlement Details
      </h4>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px;">
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; width: 35%; background-color: #f8fafc;">Pay Level (7th CPC Matrix)</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 700; color: #047857;">\\\${user.payLevel || 'Level 7'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Permanent Account Number (PAN)</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-family: monospace; font-size: 14px; text-transform: uppercase;"><strong>\\\${user.pan || 'N/A'}</strong></td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Aadhaar Reference Token</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">\\\${user.aadhaarRef || 'Verified & Masked'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: 600; background-color: #f8fafc;">Official Salary Bank Account</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">
              <strong>\\\${user.bankDetails?.bankName || 'State Bank of India'}</strong><br>
              A/c No: <span style="font-family: monospace; font-size: 14px;">\\\${user.bankDetails?.accountNo || 'N/A'}</span><br>
              IFSC: \\\${user.bankDetails?.ifsc || 'N/A'} &bull; Branch: \\\${user.bankDetails?.branch || 'N/A'}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Section 3: Vigilance -->
      <h4 style="font-size: 15px; font-weight: 700; color: #1e3a8a; border-left: 4px solid #1e3a8a; padding-left: 10px; margin-bottom: 15px;">
        III. Vigilance Clearance & Disciplinary Status
      </h4>
      <div style="font-size: 13px; line-height: 1.6; text-align: justify; margin-bottom: 30px; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 4px;">
        <p style="margin: 0; color: #166534; font-weight: 600;">
          It is certified that NO vigilance/disciplinary proceedings are either pending or contemplated against the aforementioned official. The official is entirely clear from the vigilance angle as per the records available up to the date of issuance of this certificate.
        </p>
      </div>

      <div style="font-size: 13px; line-height: 1.6; text-align: justify; margin-bottom: 40px; color: #475569;">
        <p style="margin: 0 0 10px 0;">
          <strong>Disclaimer:</strong> This certificate is auto-generated through the e-HRMS 2.0 portal based on the Master Data Records approved by the competent authority. It does not require a physical ink signature. Its authenticity can be verified via the QR/Token mechanism on the official portal.
        </p>
      </div>

      <!-- Footer / Signature -->
      <div class="sig-block" style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #cbd5e1; padding-top: 20px;">
        <div style="font-size: 11px; color: #64748b; line-height: 1.5;">
          Issued by: <strong>Central e-HRMS 2.0 Infrastructure</strong><br>
          Digital Authentication Token: <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">eHRMS-CERT-\\\${Date.now()}</code><br>
          Generated on: \\\${new Date().toLocaleString('en-GB')}
        </div>
        \\\${generateESignature('Shri Rajender Singh, DS (Estt)', 'Department of Military Affairs, MoD', 'Service Certificate Authentication')}
      </div>
    </div>
  \\\`;
  
  const doc = wrapGovDocument(\\\`Service_Certificate_\\\${user.empId}\\\`, body, false);
  triggerDownload(\\\`Service_Certificate_\\\${user.empId}.html\\\`, doc);
}
`;

  // We keep everything before replaceStart and append newFunc
  const result = lines.slice(0, replaceStart).join('\n') + '\n\n' + newFunc;
  fs.writeFileSync(downloaderPath, result);
  console.log('Successfully patched downloader.js with new base64 image!');
} else {
  console.log('Could not find the function definition in the file.');
}
