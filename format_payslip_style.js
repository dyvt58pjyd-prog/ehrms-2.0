const fs = require('fs');
const b64 = fs.readFileSync('/tmp/img_base64.txt', 'utf8').trim();
const downloaderPath = 'js/downloader.js';
let lines = fs.readFileSync(downloaderPath, 'utf8').split('\n');

const startIdx = lines.findIndex(line => line.includes('export function downloadServiceCertificate(user) {'));

if (startIdx !== -1) {
  const replaceStart = startIdx - 3;
  
  const newFunc = `/**
 * 17. Download Detailed General Service Certificate (Payslip Pattern)
 */
export function downloadServiceCertificate(user) {
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const refNo = \`MOD/DMA/CERT/\${new Date().getFullYear()}/\${Math.floor(1000 + Math.random() * 9000)}\`;

  const body = \`
    <style>
      @page {
        size: A4;
        margin: 10mm;
      }
      body {
        margin: 0;
        padding: 0;
        background: #fff;
      }
      .cda-header {
        text-align: center;
        font-family: Arial, sans-serif;
        margin-bottom: 15px;
        border-bottom: 2px solid #000;
        padding-bottom: 4px;
      }
      .cda-title {
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 4px;
      }
      .cda-subtitle {
        font-size: 14px;
        font-weight: bold;
        text-decoration: underline;
        margin-bottom: 5px;
      }
      .cda-table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'Courier New', Courier, monospace;
        font-size: 11px;
        margin-bottom: 15px;
      }
      .cda-table th, .cda-table td {
        border: 1px solid #000;
        padding: 4px 6px;
        text-align: left;
        line-height: 1.3;
      }
      .cda-table th {
        background-color: #f0f0f0;
        font-weight: bold;
      }
      .cert-paragraph {
        font-family: 'Courier New', Courier, monospace;
        font-size: 12px;
        line-height: 1.6;
        margin-bottom: 15px;
        text-align: justify;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .no-print { display: none !important; }
      }
    </style>
    
    <div class="no-print" style="max-width: 800px; margin: 0 auto 10px; text-align: right; font-family: Arial, sans-serif;">
      <button onclick="window.print()" style="padding: 5px 12px; background: #000; color: #fff; border: 1px solid #333; cursor: pointer; font-weight: bold;">PRINT DOCUMENT</button>
    </div>

    <div style="max-width: 800px; margin: 0 auto; border: 1px solid #fff;">
      <div class="cda-header">
        <img src="data:image/png;base64,\${b64}" style="width: 55px; height: auto; margin: 0 auto 5px auto; display: block;" alt="Logo">
        <div class="cda-title" style="margin-bottom: 2px;">सैन्य कार्य विभाग (नई दिल्ली)</div>
        <div class="cda-title">DEPARTMENT OF MILITARY AFFAIRS (NEW DELHI)</div>
        <div style="font-size: 13px; font-weight: bold; margin-bottom: 2px;">रक्षा मंत्रालय, भारत सरकार</div>
        <div style="font-size: 12px; margin-bottom: 10px;">MINISTRY OF DEFENCE, GOVERNMENT OF INDIA</div>
        <div class="cda-subtitle">सेवा प्रमाण पत्र / SERVICE CERTIFICATE</div>
      </div>

      <div style="display: flex; justify-content: space-between; font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; margin-bottom: 15px;">
        <div>Ref No / संदर्भ संख्या: \${refNo}</div>
        <div>Date / दिनांक: \${date}</div>
      </div>

      <div class="cert-paragraph">
        यह प्रमाणित किया जाता है कि <strong>\${user.hindiName || user.name}</strong> (पुत्र/पुत्री \${user.fatherName || '...'}) भारत सरकार के नियमित और स्थायी कर्मचारी हैं, जो वर्तमान में रक्षा मंत्रालय के सैन्य कार्य विभाग के अधीन कार्यरत हैं।<br><br>
        This is to certify that <strong>\${user.name}</strong> (Son/Daughter of \${user.fatherName || '...'}) is a regular and permanent employee of the Government of India, currently serving under the Department of Military Affairs, Ministry of Defence.
      </div>

      <table class="cda-table">
        <tr>
          <td style="width: 25%; font-weight: bold;">नाम<br>NAME</td>
          <td style="width: 25%;">\${user.hindiName || user.name}<br>\${user.name}</td>
          <td style="width: 25%; font-weight: bold;">कर्मचारी आईडी<br>EMPLOYEE ID</td>
          <td style="width: 25%;">\${user.empId}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">पदनाम<br>DESIGNATION</td>
          <td>\${user.hindiDesignation || user.designation}<br>\${user.designation}</td>
          <td style="font-weight: bold;">सेवा संवर्ग<br>SERVICE CADRE</td>
          <td>\${user.cadre || 'Central Civil Services'}<br>\${user.classification || "Group 'A'"}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">जन्म तिथि<br>DATE OF BIRTH</td>
          <td>\${user.dob}</td>
          <td style="font-weight: bold;">कार्यग्रहण तिथि<br>DATE OF JOINING</td>
          <td>\${user.dojGov}</td>
        </tr>
      </table>

      <table class="cda-table">
        <tr>
          <td style="width: 25%; font-weight: bold;">वेतन स्तर<br>PAY LEVEL</td>
          <td style="width: 25%;">\${user.payLevel || 'Level 7'}</td>
          <td style="width: 25%; font-weight: bold;">पैन<br>PAN</td>
          <td style="width: 25%;">\${user.pan || 'N/A'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">वेतन बैंक<br>SALARY BANK</td>
          <td colspan="3">
            \${user.bankDetails?.bankName || 'State Bank of India'}<br>
            A/C NO: \${user.bankDetails?.accountNo || 'N/A'} &nbsp;|&nbsp; IFSC: \${user.bankDetails?.ifsc || 'N/A'}
          </td>
        </tr>
      </table>

      <div class="cert-paragraph" style="margin-top: 15px;">
        यह प्रमाणित किया जाता है कि अधिकारी के खिलाफ कोई सतर्कता/अनुशासनात्मक कार्रवाई लंबित या विचारणीय नहीं है।<br>
        It is certified that NO vigilance/disciplinary proceedings are either pending or contemplated against the official.
      </div>

      <div style="font-family: Arial, sans-serif; font-size: 10px; margin-top: 30px; border-top: 1px dashed #333; padding-top: 10px;">
        Disclaimer: This certificate is officially generated based on Master Data Records. It does not require a physical ink signature. Its authenticity can be verified via the official token.<br>
        अस्वीकरण: यह प्रमाण पत्र आधिकारिक रूप से मास्टर डेटा रिकॉर्ड के आधार पर तैयार किया गया है।
      </div>

      <div style="margin-top: 30px; text-align: right; font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold;">
        Issued by / द्वारा जारी: Department of Military Affairs<br>
        Token: OFFICIAL-CERT-\${Date.now()}
      </div>
    </div>
  \`;
  
  const doc = \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Service_Certificate_\${user.empId}</title>
</head>
<body style="background: #fff; margin: 0; padding: 40px;">
  \${body}
</body>
</html>\`;

  triggerDownload(\`Service_Certificate_\${user.empId}.html\`, doc);
}
`;

  const result = lines.slice(0, replaceStart).join('\n') + '\n\n' + newFunc;
  fs.writeFileSync(downloaderPath, result);
  console.log('Successfully formatted downloader.js to payslip style!');
} else {
  console.log('Could not find the function definition in the file.');
}
