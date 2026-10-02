const fs = require('fs');

const funcContent = `
/**
 * 22. Download ITR-V Acknowledgment
 */
export function downloadITRV(user) {
  const currentYear = new Date().getFullYear();
  const ackNum = Math.floor(100000000000000 + Math.random() * 90000000000000).toString();
  const body = \`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+39&display=swap');
      @page { size: A4; margin: 15mm; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; margin: 0; padding: 0; }
      .itr-container { border: 1px solid #000; padding: 10px; }
      .header-area { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 10px; }
      .header-title { text-align: center; flex-grow: 1; }
      .header-title h2 { margin: 0; font-size: 18px; }
      .header-title h3 { margin: 2px 0; font-size: 14px; }
      .header-box { border: 1px solid #000; padding: 5px; text-align: center; font-weight: bold; width: 120px; }
      .info-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
      .info-table th, .info-table td { border: 1px solid #000; padding: 4px; text-align: left; }
      .val-right { text-align: right; font-weight: bold; font-family: 'Courier New', Courier, monospace; }
      .barcode { font-family: 'Libre Barcode 39', monospace; font-size: 45px; margin: 10px 0 0 0; font-weight: normal; }
      @media print { body { padding: 0 !important; } .no-print { display: none !important; } }
    </style>
    
    <div class="no-print" style="text-align: right; margin-bottom: 10px;">
      <button onclick="window.print()" style="padding: 6px 14px; background: #ea580c; color: #fff; cursor: pointer; font-weight: bold; border: none; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">🖨️ PRINT ITR-V</button>
    </div>

    <div class="itr-container">
      <div class="header-area">
        <div class="header-box" style="font-size: 14px;">ITR-V</div>
        <div class="header-title">
          <h2>INDIAN INCOME TAX RETURN ACKNOWLEDGEMENT</h2>
          <h3>[Where the data of the Return of Income in Form ITR-1 (SAHAJ), ITR-2, ITR-3, ITR-4 (SUGAM), ITR-5, ITR-6, ITR-7 filed and verified]</h3>
          <p style="margin: 0; font-size: 10px;">(Please see rule 12 of the Income-tax Rules, 1962)</p>
        </div>
        <div class="header-box">Assessment Year<br><br><span style="font-size: 16px;">\${currentYear}-\${currentYear+1}</span></div>
      </div>
      
      <table class="info-table">
        <tr>
          <td style="width: 20%; font-weight: bold;">PAN</td>
          <td style="width: 30%; font-weight: bold; font-size: 14px;">\${user.pan || 'N/A'}</td>
          <td style="width: 20%; font-weight: bold;">Aadhaar Number</td>
          <td style="width: 30%;">\${user.aadhaar || 'XXXX-XXXX-1234'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Name</td>
          <td colspan="3" style="font-weight: bold;">\${user.name}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Address</td>
          <td colspan="3">Department of Military Affairs, South Block, New Delhi - 110011</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Status</td>
          <td>Individual</td>
          <td style="font-weight: bold;">Form Number</td>
          <td>ITR-1 Sahaj</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Filed u/s</td>
          <td>139(1) - On or before due date</td>
          <td style="font-weight: bold;">e-Filing Ack No.</td>
          <td style="font-weight: bold;">\${ackNum}</td>
        </tr>
      </table>

      <div style="text-align: center; margin: 5px 0 15px 0;">
        <div class="barcode">*\${ackNum}*</div>
        <span style="font-size: 10px;">DO NOT SEND THIS ACKNOWLEDGEMENT TO CPC, BENGALURU</span>
      </div>

      <table class="info-table">
        <tr><th colspan="2" style="text-align: center; background: #eee;">COMPUTATION OF INCOME AND TAX RETURN</th></tr>
        <tr><td style="width: 80%;">1. Gross Total Income</td><td class="val-right" style="width: 20%;">12,77,500</td></tr>
        <tr><td>2. Deductions under Chapter VI-A</td><td class="val-right">1,75,000</td></tr>
        <tr><td>3. Total Income (1 - 2)</td><td class="val-right">11,02,500</td></tr>
        <tr><td>4. Current Year loss, if any</td><td class="val-right">0</td></tr>
        <tr><td>5. Net Tax Payable (Tax and surcharge less rebate)</td><td class="val-right">1,43,250</td></tr>
        <tr><td>6. Health and Education Cess</td><td class="val-right">5,730</td></tr>
        <tr><td>7. Total Tax and Cess Payable (5 + 6)</td><td class="val-right">1,48,980</td></tr>
        <tr><td>8. Total Advance Tax Paid</td><td class="val-right">0</td></tr>
        <tr><td>9. Total Self Assessment Tax Paid</td><td class="val-right">0</td></tr>
        <tr><td>10. Total TDS Claimed</td><td class="val-right">1,48,980</td></tr>
        <tr><td>11. Total TCS Claimed</td><td class="val-right">0</td></tr>
        <tr><td>12. Total Taxes Paid (8 + 9 + 10 + 11)</td><td class="val-right">1,48,980</td></tr>
        <tr><td style="font-weight: bold;">13. Amount Payable (7 - 12) (if 7 > 12)</td><td class="val-right" style="font-weight: bold;">0</td></tr>
        <tr><td style="font-weight: bold;">14. Refund (12 - 7) (if 12 > 7)</td><td class="val-right" style="font-weight: bold;">0</td></tr>
      </table>

      <div style="margin-top: 15px; font-size: 10px;">
        <p style="text-align: justify;">Income Tax Return submitted electronically on <strong>28-Jul-\${currentYear} 14:32:11</strong> from IP address 117.234.12.8. System generated electronic verification is completed. DO NOT send physical copy to CPC.</p>
      </div>
    </div>
  \`;
  
  const doc = \`<!DOCTYPE html><html><head><title>ITRV_Ack_\${user.empId}</title></head><body>\${body}</body></html>\`;
  triggerDownload(\`ITRV_Acknowledgment_\${user.empId}.html\`, doc);
}
`;

let dlCode = fs.readFileSync('js/downloader.js', 'utf8');

const funcStart = dlCode.indexOf('export function downloadITRV');
if (funcStart !== -1) {
    const docStart = dlCode.lastIndexOf('/**\n * 22. Download ITR-V', funcStart);
    const startIdx = docStart !== -1 ? docStart : funcStart;
    dlCode = dlCode.substring(0, startIdx);
}

dlCode += '\n' + funcContent;
fs.writeFileSync('js/downloader.js', dlCode);
console.log('Successfully updated ITR-V with actual barcode');
