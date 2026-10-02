const fs = require('fs');

const funcCode = `
/**
 * 18. Download Form 16 (Annual Tax Statement)
 */
export function downloadForm16(user) {
  const currentYear = new Date().getFullYear();
  const body = \`
    <style>
      @page { size: A4; margin: 10mm; }
      body { font-family: 'Courier New', Courier, monospace; font-size: 11px; margin: 0; padding: 0; background: #fff; }
      .f16-header { text-align: center; border-bottom: 2px solid #000; margin-bottom: 10px; padding-bottom: 5px; }
      .f16-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
      .f16-table th, .f16-table td { border: 1px solid #000; padding: 4px 6px; }
      .f16-table th { background: #f0f0f0; }
      .val-right { text-align: right; font-weight: bold; }
      
      @media print {
        body { padding: 0 !important; }
        .no-print { display: none !important; }
      }
    </style>
    
    <div class="no-print" style="text-align: right; margin-bottom: 10px; font-family: Arial;">
      <button onclick="window.print()" style="padding: 5px 12px; background: #000; color: #fff; cursor: pointer; font-weight: bold;">[ PRINT FORM 16 ]</button>
    </div>

    <div style="border: 2px solid #000; padding: 15px;">
      <div class="f16-header">
        <h2 style="margin: 0;">FORM NO. 16</h2>
        <p style="margin: 3px 0 0 0;">[See rule 31(1)(a)]</p>
        <h3 style="margin: 5px 0;">PART A</h3>
        <p style="margin: 3px 0 0 0; font-weight: bold;">Certificate under section 203 of the Income-tax Act, 1961 for tax deducted at source on salary</p>
      </div>

      <table class="f16-table">
        <tr>
          <td style="width: 50%;">
            <strong>Name and address of the Employer:</strong><br><br>
            DEPARTMENT OF MILITARY AFFAIRS<br>
            MINISTRY OF DEFENCE, SOUTH BLOCK<br>
            NEW DELHI - 110011
          </td>
          <td style="width: 50%;">
            <strong>Name and designation of the Employee:</strong><br><br>
            \${user.name}<br>
            \${user.designation}<br>
            EMP ID: \${user.empId}
          </td>
        </tr>
      </table>

      <table class="f16-table">
        <tr>
          <th>PAN of the Deductor</th>
          <th>TAN of the Deductor</th>
          <th>PAN of the Employee</th>
        </tr>
        <tr style="text-align: center;">
          <td>DELM01827F</td>
          <td>DELD01010G</td>
          <td style="font-weight: bold;">\${user.pan || 'N/A'}</td>
        </tr>
      </table>

      <table class="f16-table">
        <tr>
          <th>Assessment Year</th>
          <th>Period with Employer</th>
        </tr>
        <tr style="text-align: center;">
          <td>\${currentYear}-\${currentYear+1}</td>
          <td>01-Apr-\${currentYear-1} to 31-Mar-\${currentYear}</td>
        </tr>
      </table>

      <h3 style="border-bottom: 1px dashed #333;">Summary of Tax Deducted at Source</h3>
      <table class="f16-table">
        <tr>
          <th>Quarter</th>
          <th>Receipt Numbers of original statements</th>
          <th>Amount of tax deducted (Rs.)</th>
          <th>Amount of tax deposited/remitted (Rs.)</th>
        </tr>
        <tr><td>Q1</td><td>001928374</td><td class="val-right">45,200.00</td><td class="val-right">45,200.00</td></tr>
        <tr><td>Q2</td><td>001929112</td><td class="val-right">45,200.00</td><td class="val-right">45,200.00</td></tr>
        <tr><td>Q3</td><td>002011928</td><td class="val-right">45,200.00</td><td class="val-right">45,200.00</td></tr>
        <tr><td>Q4</td><td>002199342</td><td class="val-right">45,200.00</td><td class="val-right">45,200.00</td></tr>
        <tr>
          <th colspan="2" style="text-align: right;">TOTAL:</th>
          <th class="val-right">1,80,800.00</th>
          <th class="val-right">1,80,800.00</th>
        </tr>
      </table>
      
      <div style="margin-top: 30px; text-align: justify;">
        <strong>Verification</strong><br><br>
        I, <strong>Shri Rajender Singh, DS (Estt)</strong>, son of Shri Ram Singh working in the capacity of Drawing and Disbursing Officer do hereby certify that a sum of Rs. 1,80,800.00 has been deducted and deposited to the credit of the Central Government.<br><br>
        <div style="text-align: right; margin-top: 20px;">
          <strong>Signature of person responsible for deduction of tax</strong><br>
          Token: F16-\${Date.now()}
        </div>
      </div>
    </div>
  \`;
  
  const doc = \`<!DOCTYPE html><html lang="en"><head><title>Form_16_\${user.empId}</title></head><body>\${body}</body></html>\`;
  triggerDownload(\`Form_16_\${user.empId}.html\`, doc);
}
`;

fs.appendFileSync('js/downloader.js', '\n' + funcCode);
console.log('Appended downloadForm16 successfully.');
