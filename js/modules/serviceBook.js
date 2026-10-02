/**
 * e-HRMS 2.0 - Electronic Service Book (e-SB) Module
 * Department of Personnel & Training (DoPT)
 */

import { store } from '../state.js';
import { downloadServiceBook } from '../downloader.js';

export function renderServiceBook(container) {
  const state = store.get();
  const user = state.currentUser;
  const sb = state.serviceBook;

  container.innerHTML = `
    <!-- Top Action Strip -->
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">e-Service Book (e-SB)</span>
        </div>
        <h1 class="page-heading">
          📖 Digital e-Service Book
          <span class="page-heading-hi">/ इलेक्ट्रॉनिक सेवा पुस्तिका</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" id="btn-print-esb">
          🖨️ Print Certified e-SB
        </button>
        <button class="btn btn-primary" id="btn-download-esb">
          📥 Download Digitally Certified e-SB (PDF)
        </button>
      </div>
    </div>

    <!-- Official Certification Header Card -->
    <div class="esb-header-card">
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="assets/emblem.png" alt="State Emblem of India" style="width: 40px; height: 64px; flex-shrink: 0; object-fit: contain;">
        <div>
          <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--text-muted);">
            Government of India &bull; Ministry of Defence &bull; Central Civil Services
          </div>
          <div style="font-size: 17px; font-weight: 800; color: var(--goi-navy); margin-top: 2px;">
            e-Service Book Record: ${user.name} (${user.empId})
          </div>
          <div style="font-size: 12.5px; color: var(--text-secondary); margin-top: 4px;">
            Cadre: ${user.cadre} &bull; DDO: Drawing & Disbursing Officer (DDO), ${user.department}
          </div>
        </div>
      </div>
      <div class="esb-cert-badge">
        <span style="font-size: 20px;">🛡️</span>
        <div>
          <div>Digitally Verified by DDO / Cadre Authority</div>
          <div style="font-size: 10.5px; color: #047857;">Audit Ref: GOI-eSB-VERIFIED-2026-9041 &bull; Aadhaar-linked</div>
        </div>
      </div>
    </div>

    <!-- e-SB Sub-Module Tabs -->
    <div class="tab-nav" id="esb-tab-nav">
      <button class="tab-btn active" data-tab="biodata">1. Bio-Data & Personal</button>
      <button class="tab-btn" data-tab="education">2. Education & Qualification</button>
      <button class="tab-btn" data-tab="family">3. Family & Dependents</button>
      <button class="tab-btn" data-tab="nominations">4. Nominations Register</button>
      <button class="tab-btn" data-tab="history">5. Service History & Postings</button>
      <button class="tab-btn" data-tab="pay">6. Pay Fixation & Increments</button>
      <button class="tab-btn" data-tab="trainings">7. Trainings & Karmayogi</button>
      <button class="tab-btn" data-tab="vigilance">8. Vigilance & Disciplinary</button>
    </div>

    <!-- Tab Contents Container -->
    <div id="esb-tab-content">
      <!-- Content dynamically swapped below -->
    </div>
  `;

  const tabNav = container.querySelector('#esb-tab-nav');
  const tabContent = container.querySelector('#esb-tab-content');

  function renderTab(tabKey) {
    switch (tabKey) {
      case 'biodata':
        tabContent.innerHTML = `
          <div class="gov-card">
            <div class="gov-card-header">
              <span class="gov-card-title">👤 Sub-Book 1: Bio-Data & Personal Particulars</span>
              <span class="status-badge badge-sanctioned">Verified Record</span>
            </div>
            <div class="gov-card-body">
              <div class="key-val-grid">
                <div class="key-val-item">
                  <span class="key-val-label">Full Name (English / Hindi)</span>
                  <span class="key-val-value">${user.name} / ${user.hindiName}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Service Classification &amp; Cadre</span>
                  <span class="key-val-value" style="color: var(--goi-navy); font-weight: 700;">${user.classification || "Central Civil Services - Group 'A' (Gazetted)"}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Employee ID / PRAN</span>
                  <span class="key-val-value">${user.empId} / ${user.pran}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Date of Birth (verified from Matriculation)</span>
                  <span class="key-val-value">${user.dob}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Date of Initial Govt Service</span>
                  <span class="key-val-value">${user.dojGov}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Date of Superannuation</span>
                  <span class="key-val-value">${user.superannuationDate}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Gender & Marital Status</span>
                  <span class="key-val-value">${user.gender} / ${user.maritalStatus}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Blood Group</span>
                  <span class="key-val-value">${user.bloodGroup}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Permanent Account Number (PAN)</span>
                  <span class="key-val-value">${user.pan}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Aadhaar Reference Token</span>
                  <span class="key-val-value">${user.aadhaarRef} (Verified via UIDAI)</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">CGHS Beneficiary ID</span>
                  <span class="key-val-value">${user.cghsBenId}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Home Town / Home State</span>
                  <span class="key-val-value">${user.homeTown}, ${user.homeState}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Father's Name &amp; Occupation</span>
                  <span class="key-val-value"><strong>${user.fatherName || 'Shri Anil Ramkrishna Bawaskar'}</strong> (Reserved Police Sub-Inspector - RSI)</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Mother's Name &amp; Occupation</span>
                  <span class="key-val-value"><strong>${user.motherName || 'Smt. Manisha Anil Bawaskar'}</strong> (House Wife)</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Official Email & Mobile</span>
                  <span class="key-val-value">${user.email} &bull; ${user.mobile}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Official Bank Particulars & PFMS Mandate -->
          <div class="gov-card" style="margin-top: 16px;">
            <div class="gov-card-header">
              <span class="gov-card-title">🏦 Official Bank Particulars &amp; PFMS Mandate (Direct Benefit Transfer)</span>
              <span class="status-badge badge-sanctioned"><i class="fa-solid fa-circle-check"></i> PFMS Active &amp; Verified</span>
            </div>
            <div class="gov-card-body">
              <div class="key-val-grid">
                <div class="key-val-item">
                  <span class="key-val-label">Bank Name</span>
                  <span class="key-val-value"><strong>${user.bankDetails?.bankName || 'SBI'}</strong></span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Branch Name</span>
                  <span class="key-val-value"><strong>${user.bankDetails?.branch || 'DEFENCE BANKING BRANCH, AFS, BAREILLY'}</strong></span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Account Number</span>
                  <span class="key-val-value" style="font-weight: 700; color: var(--goi-blue); font-size: 15px;">${user.bankDetails?.accountNo || '39189241534'}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Account Holder's Name</span>
                  <span class="key-val-value"><strong>${user.bankDetails?.accountHolder || user.name}</strong></span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Account Type</span>
                  <span class="key-val-value">${user.bankDetails?.accountType || 'Savings Account'}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">IFSC Code</span>
                  <span class="key-val-value"><strong>${user.bankDetails?.ifsc || 'SBIN0001818'}</strong></span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">MICR Code / Branch Code</span>
                  <span class="key-val-value">${user.bankDetails?.micr || '243002018'} &bull; Branch Code: ${user.bankDetails?.branchCode || '01818'}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">PFMS Direct Benefit Transfer Mandate</span>
                  <span class="key-val-value" style="color: #166534; font-weight: 600;"><i class="fa-solid fa-shield-halved"></i> Active Direct Salary Credit Mandate (MoD / DMA)</span>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 'education':
        tabContent.innerHTML = `
          <div class="gov-card">
            <div class="gov-card-header">
              <span class="gov-card-title">🎓 Sub-Book 2: Educational & Professional Qualifications</span>
            </div>
            <div class="gov-table-container">
              <table class="gov-table">
                <thead>
                  <tr>
                    <th>Degree / Qualification</th>
                    <th>University / Board / Institution</th>
                    <th>Year of Passing</th>
                    <th>Division / Grade</th>
                    <th>Certificate Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${sb.education.map(ed => `
                    <tr>
                      <td style="font-weight: 700;">${ed.degree}</td>
                      <td>${ed.inst}</td>
                      <td>${ed.year}</td>
                      <td>${ed.grade}</td>
                      <td><span class="status-badge badge-sanctioned">Verified</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        break;

      case 'family':
        tabContent.innerHTML = `
          <div class="gov-card">
            <div class="gov-card-header">
              <span class="gov-card-title">👨‍👩‍👧 Sub-Book 3: Family Particulars & Dependents (CCS Rule 54)</span>
            </div>
            <div class="gov-table-container">
              <table class="gov-table">
                <thead>
                  <tr>
                    <th>Name of Member</th>
                    <th>Relationship</th>
                    <th>Date of Birth</th>
                    <th>Blood Group</th>
                    <th>CGHS Card Ref</th>
                    <th>Dependency</th>
                    <th>Occupation</th>
                  </tr>
                </thead>
                <tbody>
                  ${sb.family.map(f => `
                    <tr>
                      <td style="font-weight: 700;">${f.name}</td>
                      <td>${f.relationship}</td>
                      <td>${f.dob}</td>
                      <td>${f.bloodGroup}</td>
                      <td>${f.cghsCardNo}</td>
                      <td><span class="status-badge badge-sanctioned">${f.dependent ? 'Dependent' : 'Non-Dependent'}</span></td>
                      <td>${f.occupation}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        break;

      case 'nominations':
        tabContent.innerHTML = `
          <div class="gov-card">
            <div class="gov-card-header">
              <span class="gov-card-title">📜 Sub-Book 4: Statutory Nominations Register</span>
            </div>
            <div class="gov-table-container">
              <table class="gov-table">
                <thead>
                  <tr>
                    <th>Nomination Scheme</th>
                    <th>Primary Nominee(s)</th>
                    <th>Share (%)</th>
                    <th>Contingent / Alternate Nominee</th>
                    <th>Date of Acceptance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${sb.nominations.map(n => `
                    <tr>
                      <td style="font-weight: 700;">${n.type}</td>
                      <td>${n.nominee}</td>
                      <td style="font-weight: 700; color: var(--goi-navy);">${n.share}</td>
                      <td>${n.altNominee}</td>
                      <td>${n.regDate}</td>
                      <td><span class="status-badge badge-sanctioned">Valid & Accepted</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        break;

      case 'history':
        tabContent.innerHTML = `
          <div class="gov-card">
            <div class="gov-card-header">
              <span class="gov-card-title">🏢 Sub-Book 5: Service History, Postings & Transfers</span>
            </div>
            <div class="gov-table-container">
              <table class="gov-table">
                <thead>
                  <tr>
                    <th>Designation / Post</th>
                    <th>Ministry / Department / Office</th>
                    <th>Pay Scale / Level</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Govt Order Number</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  ${sb.serviceHistory.map(h => `
                    <tr>
                      <td style="font-weight: 700; color: var(--goi-navy);">${h.post}</td>
                      <td>${h.dept}</td>
                      <td><span class="status-badge badge-info">${h.payLevel}</span></td>
                      <td>${h.from}</td>
                      <td>${h.to}</td>
                      <td><code>${h.orderNo}</code></td>
                      <td>${h.remarks}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        break;

      case 'pay':
        tabContent.innerHTML = `
          <div class="gov-card mb-20">
            <div class="gov-card-header">
              <span class="gov-card-title">💰 Sub-Book 6: Pay Fixation & Annual Increment Register (7th CPC)</span>
              <span class="status-badge badge-sanctioned"><i class="fa-solid fa-stamp"></i> Audited &amp; Vetted</span>
            </div>
            <div class="gov-table-container">
              <table class="gov-table">
                <thead>
                  <tr>
                    <th>Effective Date</th>
                    <th>Nature of Fixation / Event</th>
                    <th>Level &amp; Cell</th>
                    <th>Basic Pay (₹)</th>
                    <th>Statutory Rule / Authority</th>
                    <th>Sanction Order</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  ${sb.payFixation.map(p => `
                    <tr>
                      <td style="white-space: nowrap; font-weight: 600;">${p.date}</td>
                      <td style="font-weight: 600; color: var(--goi-navy);">${p.event}</td>
                      <td><span class="status-badge badge-info">${p.level}, ${p.cell}</span></td>
                      <td style="font-weight: 800; color: #15803d; font-size: 13.5px;">₹${p.basicPay.toLocaleString('en-IN')}</td>
                      <td style="font-size: 11.5px; color: var(--goi-blue);">${p.ruleReference || 'CCS (RP) Rules, 2016'}</td>
                      <td><code>${p.orderNo}</code></td>
                      <td style="font-size: 11.5px; color: var(--text-muted); max-width: 280px;">${p.remarks || '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Official Audit Note on Pay Fixation under FR 22(I)(a)(1) -->
          <div class="gov-card">
            <div class="gov-card-header" style="background: #f8fafc;">
              <span class="gov-card-title">⚖️ Statutory Audit Certificate: Pay Fixation &amp; Pay Protection under FR 22(I)(a)(1)</span>
              <span style="font-size: 11.5px; font-weight: 700; color: #166534;"><i class="fa-solid fa-circle-check"></i> AG Audit Compliance Clear</span>
            </div>
            <div class="gov-card-body" style="font-size: 12.5px; line-height: 1.7; color: #334155;">
              <div style="background: #eff6ff; border-left: 4px solid var(--goi-blue); padding: 12px 16px; border-radius: 4px; margin-bottom: 14px;">
                <strong>Administrative Justification &amp; Rule Compliance:</strong><br>
                Shri Anurag Anil Bawaskar was commissioned into Central Government service on <strong>13 November 2024</strong>. 
                Pursuant to his inter-ministerial posting to the Department of Military Affairs (MoD) and under the provisions of 
                <strong>Fundamental Rule 22(I)(a)(1)</strong> read with <strong>DoPT OM No. 12/3/2009-Pay-I</strong> and 
                <strong>Presidential Sanction Order No. MoD/DMA/Pay-Fix/2026/118 dated 25-06-2026</strong>, his basic pay has been fixed at 
                <strong>Level 7, Cell 16 (₹70,000)</strong> effective 01-July-2026. This protects his previous strategic emoluments drawn during his tenure as 
                Chief Information Security Officer (MeitY) and Deputy Security Analyst (Cabinet Secretariat).
              </div>
              <div class="key-val-grid">
                <div class="key-val-item">
                  <span class="key-val-label">Current 7th CPC Pay Scale</span>
                  <span class="key-val-value">Level 7 (₹44,900 - ₹1,42,400), Cell 16</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Current Basic Pay</span>
                  <span class="key-val-value" style="font-weight: 800; color: #15803d;">₹70,000 / month</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Net Take-Home Salary (Electronic Credit)</span>
                  <span class="key-val-value" style="font-weight: 800; color: #166534;">₹${(state.payroll?.netSalary || 118232).toLocaleString('en-IN')} (Disbursed to SBI AFS Bareilly A/C 39189241534)</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Next Annual Increment Date</span>
                  <span class="key-val-value" style="font-weight: 700; color: var(--goi-blue);">01 July 2027 (Level 7, Cell 17: ₹72,100)</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Pay Fixation Vetting Authority</span>
                  <span class="key-val-value">${user.controllingOfficer.name}, DS (Estt) &bull; Room 106, Sena Bhawan</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Pay Fixation Sanctioning Authority</span>
                  <span class="key-val-value">${user.reviewingOfficer.name}, JS (Estt &amp; Coord) &bull; Room 199-C, South Block</span>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 'trainings':
        tabContent.innerHTML = `
          <div class="gov-card">
            <div class="gov-card-header">
              <span class="gov-card-title">🎯 Sub-Book 7: Training Records & Mission Karmayogi Competencies</span>
              <span class="badge-tag-gov karmayogi">iGOT Integrated</span>
            </div>
            <div class="gov-table-container">
              <table class="gov-table">
                <thead>
                  <tr>
                    <th>Programme / Course Name</th>
                    <th>Training Academy / Institute</th>
                    <th>Duration</th>
                    <th>Completed Date</th>
                    <th>Karmayogi Status</th>
                    <th>Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  ${sb.trainings.map(t => `
                    <tr>
                      <td style="font-weight: 700;">${t.course}</td>
                      <td>${t.inst}</td>
                      <td>${t.duration}</td>
                      <td>${t.completedOn}</td>
                      <td><span class="status-badge badge-sanctioned">iGOT Certified</span></td>
                      <td><button class="btn btn-sm btn-outline" onclick="alert('Viewing Certified Credential for ${t.course}')">View Certificate</button></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        break;

      case 'vigilance':
        tabContent.innerHTML = `
          <div class="gov-card">
            <div class="gov-card-header">
              <span class="gov-card-title">⚖️ Sub-Book 8: Vigilance Status & Integrity Verification</span>
            </div>
            <div class="gov-card-body">
              <div class="gov-alert gov-alert-success mb-20">
                <div style="font-size: 24px;">🛡️</div>
                <div>
                  <strong>Official Vigilance Clearance Status: CLEAR</strong><br>
                  As per records maintained by the ${sb.vigilanceStatus.issuingAuthority}, no disciplinary or departmental proceedings under Rule 14 or Rule 16 of CCS (CCA) Rules, 1965 are pending or contemplated against this officer.
                </div>
              </div>
              <div class="key-val-grid">
                <div class="key-val-item">
                  <span class="key-val-label">Vigilance Clearance Status</span>
                  <span class="key-val-value" style="color: #15803d;">CLEAR (NIL Pending)</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Date of Last CVO Clearance</span>
                  <span class="key-val-value">${sb.vigilanceStatus.lastClearanceDate}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Issuing Authority</span>
                  <span class="key-val-value">${sb.vigilanceStatus.issuingAuthority}</span>
                </div>
                <div class="key-val-item">
                  <span class="key-val-label">Penalties / Major Inquiries</span>
                  <span class="key-val-value">NIL / Clear Record</span>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
    }
  }

  // Bind tab switching
  if (tabNav) {
    tabNav.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabNav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTab(btn.dataset.tab);
      });
    });
  }

  // Print & Download triggers
  container.querySelector('#btn-print-esb')?.addEventListener('click', () => {
    window.print();
  });

  container.querySelector('#btn-download-esb')?.addEventListener('click', () => {
    downloadServiceBook(user, sb);
  });

  // Initial render
  renderTab('biodata');
}
