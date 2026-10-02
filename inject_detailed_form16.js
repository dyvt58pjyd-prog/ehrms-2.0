const fs = require('fs');

const funcContent = `export function downloadForm16(user) {
  const currentYear = new Date().getFullYear();
  const finYear = \`\${currentYear-1}-\${currentYear}\`;
  
  const body = \`
    <style>
      @page { size: A4; margin: 8mm; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; margin: 0; padding: 0; background: #fff; line-height: 1.3; }
      .f16-container { border: 2px solid #000; padding: 15px; margin-bottom: 20px; page-break-after: always; }
      .f16-header { text-align: center; border-bottom: 2px solid #000; margin-bottom: 10px; padding-bottom: 5px; }
      .f16-header h2 { margin: 0; font-size: 16px; font-weight: bold; }
      .f16-header h3 { margin: 5px 0; font-size: 14px; font-weight: bold; }
      .f16-header p { margin: 3px 0 0 0; font-size: 11px; }
      .f16-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
      .f16-table th, .f16-table td { border: 1px solid #000; padding: 4px 6px; vertical-align: top; }
      .f16-table th { background: #f9f9f9; font-weight: bold; text-align: left; }
      .val-right { text-align: right; font-weight: bold; font-family: 'Courier New', Courier, monospace; }
      .section-title { background: #e0e0e0; font-weight: bold; padding: 4px; border: 1px solid #000; margin-top: 10px; margin-bottom: 0; font-size: 11px; }
      
      @media print {
        body { padding: 0 !important; }
        .no-print { display: none !important; }
        .f16-container { box-shadow: none !important; border: 1px solid #000 !important; }
      }
    </style>
    
    <div class="no-print" style="text-align: right; margin-bottom: 10px; font-family: Arial;">
      <button onclick="window.print()" style="padding: 6px 14px; background: #2563eb; color: #fff; cursor: pointer; font-weight: bold; border: none; border-radius: 4px; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">🖨️ PRINT OFFICIAL FORM 16</button>
    </div>

    <!-- PART A -->
    <div class="f16-container">
      <div class="f16-header">
        <h2>FORM NO. 16</h2>
        <p>[See rule 31(1)(a)]</p>
        <h3>PART A</h3>
        <p style="font-weight: bold;">Certificate under section 203 of the Income-tax Act, 1961 for tax deducted at source on salary</p>
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
          <td style="font-weight: bold; font-size: 12px;">\${user.pan || 'N/A'}</td>
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

      <div class="section-title">Summary of Tax Deducted at Source</div>
      <table class="f16-table" style="margin-top: -1px;">
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
      
      <div style="margin-top: 20px; text-align: justify; font-size: 11px;">
        <strong>Verification</strong><br><br>
        I, <strong>Shri Rajender Singh, DS (Estt)</strong>, son of Shri Ram Singh working in the capacity of Drawing and Disbursing Officer do hereby certify that a sum of Rs. 1,80,800.00 has been deducted and deposited to the credit of the Central Government. I further certify that the information given above is true, complete and correct and is based on the books of account, documents, TDS statements, and other available records.<br><br>
        <div style="display: flex; justify-content: space-between; margin-top: 30px;">
          <div>
            Place: <strong>NEW DELHI</strong><br>
            Date: <strong>15-May-\${currentYear}</strong>
          </div>
          <div style="text-align: center;">
            <div style="border-bottom: 1px solid #000; width: 200px; height: 30px; margin-bottom: 5px;"></div>
            <strong>Signature of person responsible for deduction of tax</strong><br>
            Full Name: Shri Rajender Singh<br>
            Designation: DS (Estt) & DDO
          </div>
        </div>
      </div>
    </div>

    <!-- PART B -->
    <div class="f16-container">
      <div class="f16-header">
        <h3>PART B (Annexure)</h3>
        <p style="font-weight: bold;">Details of Salary paid and any other income and tax deducted</p>
      </div>
      
      <table class="f16-table">
        <tr>
          <th colspan="3" style="text-align: center;">Details of Salary Paid</th>
        </tr>
        <tr>
          <td style="width: 5%;">1.</td>
          <td style="width: 75%;">Gross Salary</td>
          <td style="width: 20%;" class="val-right"></td>
        </tr>
        <tr>
          <td></td>
          <td>(a) Salary as per provisions contained in section 17(1)</td>
          <td class="val-right">14,50,000.00</td>
        </tr>
        <tr>
          <td></td>
          <td>(b) Value of perquisites under section 17(2) (as per Form No. 12BA)</td>
          <td class="val-right">0.00</td>
        </tr>
        <tr>
          <td></td>
          <td>(c) Profits in lieu of salary under section 17(3) (as per Form No. 12BA)</td>
          <td class="val-right">0.00</td>
        </tr>
        <tr>
          <td></td>
          <td><strong>(d) Total Gross Salary (a+b+c)</strong></td>
          <td class="val-right">14,50,000.00</td>
        </tr>
        <tr>
          <td>2.</td>
          <td>Less: Allowances to the extent exempt under section 10</td>
          <td class="val-right"></td>
        </tr>
        <tr>
          <td></td>
          <td>(a) Travel concession or assistance under section 10(5)</td>
          <td class="val-right">0.00</td>
        </tr>
        <tr>
          <td></td>
          <td>(b) House rent allowance under section 10(13A)</td>
          <td class="val-right">1,20,000.00</td>
        </tr>
        <tr>
          <td></td>
          <td><strong>(c) Total Amount of Exemption claimed under section 10</strong></td>
          <td class="val-right">1,20,000.00</td>
        </tr>
        <tr>
          <td>3.</td>
          <td><strong>Balance (1-2)</strong></td>
          <td class="val-right">13,30,000.00</td>
        </tr>
        <tr>
          <td>4.</td>
          <td>Deductions under section 16</td>
          <td class="val-right"></td>
        </tr>
        <tr>
          <td></td>
          <td>(a) Standard deduction under section 16(ia)</td>
          <td class="val-right">50,000.00</td>
        </tr>
        <tr>
          <td></td>
          <td>(b) Entertainment allowance under section 16(ii)</td>
          <td class="val-right">0.00</td>
        </tr>
        <tr>
          <td></td>
          <td>(c) Tax on employment under section 16(iii)</td>
          <td class="val-right">2,500.00</td>
        </tr>
        <tr>
          <td>5.</td>
          <td><strong>Total amount of deductions under section 16 (4a+4b+4c)</strong></td>
          <td class="val-right">52,500.00</td>
        </tr>
        <tr>
          <td>6.</td>
          <td><strong>Income chargeable under the head "Salaries" (3-5)</strong></td>
          <td class="val-right">12,77,500.00</td>
        </tr>
        <tr>
          <td>7.</td>
          <td>Add: Any other income reported by the employee</td>
          <td class="val-right">0.00</td>
        </tr>
        <tr>
          <td>8.</td>
          <td><strong>Gross Total Income (6+7)</strong></td>
          <td class="val-right">12,77,500.00</td>
        </tr>
        <tr>
          <th colspan="3" style="text-align: center;">Deductions under Chapter VI-A</th>
        </tr>
        <tr>
          <td>9.</td>
          <td>Deduction in respect of life insurance premia, PPF, NPS, etc. under section 80C</td>
          <td class="val-right">1,50,000.00</td>
        </tr>
        <tr>
          <td>10.</td>
          <td>Deduction in respect of health insurance premia under section 80D</td>
          <td class="val-right">25,000.00</td>
        </tr>
        <tr>
          <td>11.</td>
          <td><strong>Aggregate of deductible amount under Chapter VI-A</strong></td>
          <td class="val-right">1,75,000.00</td>
        </tr>
        <tr>
          <th colspan="3" style="text-align: center;">Tax Computation</th>
        </tr>
        <tr>
          <td>12.</td>
          <td><strong>Total Taxable Income (8-11)</strong></td>
          <td class="val-right">11,02,500.00</td>
        </tr>
        <tr>
          <td>13.</td>
          <td>Tax on Total Income</td>
          <td class="val-right">1,43,250.00</td>
        </tr>
        <tr>
          <td>14.</td>
          <td>Rebate under section 87A</td>
          <td class="val-right">0.00</td>
        </tr>
        <tr>
          <td>15.</td>
          <td>Surcharge (wherever applicable)</td>
          <td class="val-right">0.00</td>
        </tr>
        <tr>
          <td>16.</td>
          <td>Health and Education Cess (4% of 13+15)</td>
          <td class="val-right">5,730.00</td>
        </tr>
        <tr>
          <td>17.</td>
          <td><strong>Tax Payable (13+15+16)</strong></td>
          <td class="val-right">1,48,980.00</td>
        </tr>
        <tr>
          <td>18.</td>
          <td>Less: Relief under section 89</td>
          <td class="val-right">0.00</td>
        </tr>
        <tr>
          <td>19.</td>
          <td><strong>Net Tax Payable (17-18)</strong></td>
          <td class="val-right">1,48,980.00</td>
        </tr>
      </table>
      
      <div style="margin-top: 15px; text-align: justify; font-size: 11px;">
        <strong>Verification</strong><br><br>
        I, <strong>Shri Rajender Singh, DS (Estt)</strong>, son of Shri Ram Singh working in the capacity of Drawing and Disbursing Officer do hereby certify that the information given above is true, complete and correct and is based on the books of account, documents, TDS statements, and other available records.<br><br>
        <div style="display: flex; justify-content: space-between; margin-top: 25px;">
          <div>
            Place: <strong>NEW DELHI</strong><br>
            Date: <strong>15-May-\${currentYear}</strong>
          </div>
          <div style="text-align: center;">
            <div style="border-bottom: 1px solid #000; width: 200px; height: 30px; margin-bottom: 5px;"></div>
            <strong>Signature of DDO</strong>
          </div>
        </div>
      </div>
    </div>
  \`;
  
  const doc = \`<!DOCTYPE html><html lang="en"><head><title>Form_16_Part_A_B_\${user.empId}</title></head><body>\${body}</body></html>\`;
  triggerDownload(\`Form_16_\${user.empId}.html\`, doc);
}
`;

const downloaderPath = 'js/downloader.js';
let dlCode = fs.readFileSync(downloaderPath, 'utf8');

// Find where the old downloadForm16 starts
const funcStart = dlCode.indexOf('export function downloadForm16');
if (funcStart !== -1) {
    // find the previous JSDoc block if it exists
    const docStart = dlCode.lastIndexOf('/**\n * 18. Download Form 16', funcStart);
    const startIdx = docStart !== -1 ? docStart : funcStart;
    
    dlCode = dlCode.substring(0, startIdx);
}

dlCode += '\n' + funcContent;
fs.writeFileSync(downloaderPath, dlCode);
console.log('Successfully injected detailed Form 16 (Part A & Part B)');
