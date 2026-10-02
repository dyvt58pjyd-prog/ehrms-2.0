const fs = require('fs');
const b64 = fs.readFileSync('/tmp/img_base64.txt', 'utf8').trim();
const downloaderPath = 'js/downloader.js';
let lines = fs.readFileSync(downloaderPath, 'utf8').split('\n');

const startIdx = lines.findIndex(line => line.includes('export function downloadServiceCertificate(user) {'));

if (startIdx !== -1) {
  const replaceStart = startIdx - 3;
  
  const newFunc = `/**
 * 17. Download Detailed General Service Certificate (Bilingual, Scanned Dot-Matrix Style)
 */
export function downloadServiceCertificate(user) {
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const refNo = \\\`MOD/DMA/CERT/\\\${new Date().getFullYear()}/\\\${Math.floor(1000 + Math.random() * 9000)}\\\`;

  const body = \\\`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
      
      .scanned-doc {
        font-family: 'Courier New', Courier, monospace;
        color: #1a1a1a;
        background-color: #fdfcf0; /* Slight yellow old paper tint */
        background-image: 
          radial-gradient(#000000 0.5px, transparent 0.5px),
          radial-gradient(#000000 0.5px, transparent 0.5px);
        background-size: 20px 20px;
        background-position: 0 0, 10px 10px;
        /* Make dots very faint to look like paper noise */
        background-blend-mode: overlay;
        opacity: 0.95;
        
        padding: 20px 30px;
        box-shadow: inset 0 0 50px rgba(0,0,0,0.1);
        filter: grayscale(90%) contrast(120%) brightness(95%) sepia(20%) blur(0.3px);
        transform: rotate(-0.4deg); /* Crooked scan effect */
        
        border: 1px solid #999;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .scanned-doc * {
        font-family: 'Courier New', Courier, monospace;
        letter-spacing: -0.2px;
      }

      .bilingual-header {
        text-align: center;
        border-bottom: 2px dashed #333;
        padding-bottom: 10px;
        margin-bottom: 15px;
      }
      
      .bilingual-header h2, .bilingual-header h3, .bilingual-header h4 {
        margin: 2px 0;
        color: #000;
        font-weight: bold;
      }
      
      .bilingual-header h2 { font-size: 16px; }
      .bilingual-header h3 { font-size: 14px; }
      .bilingual-header h4 { font-size: 13px; }
      
      .doc-title-strip-old {
        margin-top: 10px;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        text-decoration: underline;
        text-transform: uppercase;
      }
      
      .old-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
        font-size: 12px;
      }
      
      .old-table td, .old-table th {
        border: 1px solid #333;
        padding: 4px 8px;
        vertical-align: top;
      }
      
      .old-label {
        font-weight: bold;
        width: 45%;
      }
      
      .typewriter-text {
        font-size: 13px;
        line-height: 1.5;
        text-align: justify;
        margin-bottom: 15px;
      }
      
      .sig-block-old {
        margin-top: 30px;
        text-align: right;
        font-size: 12px;
        font-weight: bold;
      }
      
      .stamp {
        border: 2px solid #ca3922;
        color: #ca3922;
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        padding: 5px 10px;
        transform: rotate(-15deg);
        filter: blur(0.5px);
        opacity: 0.8;
        margin-top: 10px;
      }
    </style>

    <div class="scanned-doc">
      <div class="bilingual-header">
        <img src="data:image/png;base64,\${b64}" style="height: 50px; width: auto; margin-bottom: 5px; object-fit: contain; filter: grayscale(100%) contrast(150%);" alt="Logo">
        <h2>GOVERNMENT OF INDIA / भारत सरकार</h2>
        <h3>MINISTRY OF DEFENCE / रक्षा मंत्रालय</h3>
        <h4>DEPARTMENT OF MILITARY AFFAIRS / सैन्य कार्य विभाग</h4>
        <div class="doc-title-strip-old">
          SERVICE CERTIFICATE / सेवा प्रमाण पत्र
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; margin-bottom: 15px;">
        <div>Ref No / संदर्भ संख्या: \\\${refNo}</div>
        <div>Date / दिनांक: \\\${date}</div>
      </div>

      <div class="typewriter-text">
        <p>
          This is to certify that <strong>\\\${user.name}</strong> (Son/Daughter of \\\${user.fatherName || '...'}) is a regular and permanent employee of the Government of India, currently serving under the Department of Military Affairs, Ministry of Defence.
        </p>
        <p>
          यह प्रमाणित किया जाता है कि <strong>\\\${user.hindiName || user.name}</strong> (पुत्र/पुत्री \\\${user.fatherName || '...'}) भारत सरकार के नियमित और स्थायी कर्मचारी हैं, जो वर्तमान में रक्षा मंत्रालय के सैन्य कार्य विभाग के अधीन कार्यरत हैं।
        </p>
        <p>
          As per the official service records maintained by the Department, the detailed service and financial particulars are certified as below: <br>
          विभाग द्वारा अनुरक्षित आधिकारिक सेवा रिकॉर्ड के अनुसार, विस्तृत सेवा और वित्तीय विवरण नीचे प्रमाणित किए गए हैं:
        </p>
      </div>

      <h3 style="font-size: 14px; text-decoration: underline; margin-bottom: 5px;">I. Personal Details / व्यक्तिगत विवरण</h3>
      <table class="old-table">
        <tbody>
          <tr>
            <td class="old-label">Name / नाम</td>
            <td>\\\${user.name} <br> (\\\${user.hindiName || user.name})</td>
          </tr>
          <tr>
            <td class="old-label">Employee ID / कर्मचारी आईडी</td>
            <td>\\\${user.empId}</td>
          </tr>
          <tr>
            <td class="old-label">Designation / पदनाम</td>
            <td>\\\${user.designation} <br> (\\\${user.hindiDesignation || user.designation})</td>
          </tr>
          <tr>
            <td class="old-label">Date of Birth / जन्म तिथि</td>
            <td>\\\${user.dob}</td>
          </tr>
          <tr>
            <td class="old-label">Date of Joining / कार्यग्रहण तिथि</td>
            <td>\\\${user.dojGov}</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: 14px; text-decoration: underline; margin-bottom: 5px;">II. Financial Details / वित्तीय विवरण</h3>
      <table class="old-table">
        <tbody>
          <tr>
            <td class="old-label">Pay Level / वेतन स्तर</td>
            <td>\\\${user.payLevel || 'Level 7'}</td>
          </tr>
          <tr>
            <td class="old-label">PAN No / पैन नंबर</td>
            <td>\\\${user.pan || 'N/A'}</td>
          </tr>
          <tr>
            <td class="old-label">Salary Bank A/c / वेतन बैंक खाता</td>
            <td>
              \\\${user.bankDetails?.bankName || 'State Bank of India'}<br>
              A/c No: \\\${user.bankDetails?.accountNo || 'N/A'} <br>
              IFSC: \\\${user.bankDetails?.ifsc || 'N/A'}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="typewriter-text" style="margin-top: 20px;">
        <p>
          It is certified that NO vigilance/disciplinary proceedings are either pending or contemplated against the official. <br>
          यह प्रमाणित किया जाता है कि अधिकारी के खिलाफ कोई सतर्कता/अनुशासनात्मक कार्रवाई लंबित या विचारणीय नहीं है।
        </p>
      </div>

      <div style="font-size: 10px; margin-top: 30px; border-top: 1px dashed #333; padding-top: 10px;">
        Disclaimer: This certificate is officially generated based on Master Data Records. It does not require a physical ink signature. Its authenticity can be verified via the official token.<br>
        अस्वीकरण: यह प्रमाण पत्र आधिकारिक रूप से मास्टर डेटा रिकॉर्ड के आधार पर तैयार किया गया है।
      </div>

      <div class="sig-block-old">
        <div class="stamp">OFFICIALLY ISSUED / आधिकारिक तौर पर जारी</div><br><br>
        Issued by / द्वारा जारी: Department of Military Affairs<br>
        Token: OFFICIAL-CERT-\\\${Date.now()}
      </div>
    </div>
  \\\`;
  
  // Notice we set isSinglePage = true so we don't wrap it in the modern gov template.
  const doc = \\\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Service_Certificate_\\\${user.empId}</title>
  <style>
    @media print {
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body style="background: #333; margin: 0; padding: 40px;">
  <div class="no-print" style="max-width: 800px; margin: 0 auto 10px; text-align: right;">
    <button onclick="window.print()" style="padding: 5px 12px; background: #eee; color: #000; border: 1px solid #333; cursor: pointer; font-family: monospace; font-weight: bold;">[ PRINT DOCUMENT ]</button>
  </div>
  \\\${body}
</body>
</html>\\\`;

  triggerDownload(\\\`Service_Certificate_\\\${user.empId}.html\\\`, doc);
}
`;

  const result = lines.slice(0, replaceStart).join('\n') + '\n\n' + newFunc;
  fs.writeFileSync(downloaderPath, result);
  console.log('Successfully formatted downloader.js to scanned dot matrix!');
} else {
  console.log('Could not find the function definition in the file.');
}
