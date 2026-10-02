/**
 * e-HRMS 2.0 - Immovable Property Return (IPR) Module
 * Department of Personnel & Training (DoPT)
 * Rule 18(1) of the Central Civil Services (Conduct) Rules, 1964
 */

import { store } from '../state.js';
import { downloadIprAck } from '../downloader.js';

export function renderIprFiling(container) {
  const state = store.get();
  const user = state.currentUser;
  const ipr = state.ipr;

  container.innerHTML = `
    <!-- Top Action Strip -->
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Immovable Property Return (IPR)</span>
        </div>
        <h1 class="page-heading">
          🏡 Immovable Property Return (IPR)
          <span class="page-heading-hi">/ अचल संपत्ति का वार्षिक विवरण (Rule 18 CCS Conduct Rules)</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" id="btn-print-ipr">
          🖨️ Print IPR Statement
        </button>
        <button class="btn btn-primary" id="btn-download-ipr-ack">
          📥 Download Digitally Signed Acknowledgement
        </button>
      </div>
    </div>

    <!-- Official Compliance Banner -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="assets/emblem.png" alt="State Emblem of India" style="width: 22px; height: 36px; object-fit: contain;">
          <span class="gov-card-title">Statutory Declaration Status for Year ${ipr.complianceYear}</span>
        </div>
        <span class="status-badge badge-sanctioned">Filed & Complied</span>
      </div>
      <div class="gov-card-body">
        <div class="key-val-grid">
          <div class="key-val-item">
            <span class="key-val-label">Compliance Status</span>
            <span class="key-val-value" style="color: var(--goi-green);">SUBMITTED & DIGITALLY VERIFIED</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Filing Acknowledgement Ref No.</span>
            <span class="key-val-value"><code>${ipr.ackNo}</code></span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Date of Filing</span>
            <span class="key-val-value">${ipr.filedOn}</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Statutory Provision</span>
            <span class="key-val-value">Rule 18(1) of CCS (Conduct) Rules, 1964</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Property Schedule Table -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <span class="gov-card-title">📋 Schedule of Immovable Property Assets Owned / Inherited / Acquired</span>
        <button class="btn btn-sm btn-primary" id="btn-add-property">+ Add Property Asset</button>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Property Type & Location</th>
              <th>Present Market Value</th>
              <th>Held In Whose Name</th>
              <th>Mode of Acquisition & Date</th>
              <th>Annual Income from Property</th>
              <th>Prior Permission / Sanction</th>
            </tr>
          </thead>
          <tbody>
            ${ipr.properties.map((p, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td>
                  <strong>${p.propertyType}</strong><br>
                  <span style="font-size: 11.5px; color: var(--text-secondary);">${p.description}</span>
                </td>
                <td style="font-weight: 700; color: var(--goi-navy);">${p.presentValue}</td>
                <td>${p.acquiredInName}</td>
                <td style="font-size: 12px;">
                  ${p.modeOfAcquisition}<br>
                  <span style="color: var(--text-muted); font-size: 11px;">Acquired: ${p.acquisitionDate}</span>
                </td>
                <td style="font-weight: 700; color: var(--goi-green);">${p.annualIncome}</td>
                <td style="font-size: 11px;">${p.priorSanctionObtained}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Rule 18 Conduct Rules Advisory -->
    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">⚖️ DoPT Statutory Instructions (Rule 18 Guidelines)</span>
      </div>
      <div class="gov-card-body" style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.6;">
        <p>Every Government servant holding a Group 'A' or Group 'B' post shall submit an annual return in such form as may be prescribed by the Government in this behalf, giving full particulars regarding the immovable property inherited by him or owned or acquired by him or held by him on lease or mortgage, either in his own name or in the name of any member of his family or in the name of any other person, by 31st January of every year.</p>
        <p style="margin-top: 8px;"><strong>Vigilance Clearance Linkage:</strong> Failure to submit the annual IPR within prescribed timelines results in denial of vigilance clearance for empanelment, promotion, deputation, and foreign training.</p>
      </div>
    </div>

    <!-- Add Property Modal -->
    <div class="modal-backdrop" id="ipr-modal">
      <div class="modal-dialog modal-lg">
        <div class="modal-header">
          <div class="modal-title">
            <span>🏡 Declare Immovable Property Schedule (Form 1)</span>
          </div>
          <button class="modal-close" id="btn-close-ipr-modal">&times;</button>
        </div>
        <form id="form-add-property">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Nature / Type of Property <span class="req">*</span></label>
                <select class="form-control" id="prop-type" required>
                  <option value="Residential Flat / Apartment">Residential Flat / Apartment</option>
                  <option value="Residential House / Plot">Residential House / Plot</option>
                  <option value="Agricultural Land">Agricultural Land</option>
                  <option value="Commercial Shop / Office">Commercial Shop / Office</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Present Market Value (₹) <span class="req">*</span></label>
                <input type="text" class="form-control" id="prop-val" placeholder="e.g. ₹ 65,00,000" value="₹ 45,00,000" required>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Detailed Location & Description <span class="req">*</span></label>
                <textarea class="form-control" id="prop-desc" required>Ancestral agricultural plot (0.8 Acres), Ramdaspeth / Umred, Nashik, Maharashtra</textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Acquired in Whose Name <span class="req">*</span></label>
                <input type="text" class="form-control" id="prop-holder" value="${user.name} (Self)" required>
              </div>

              <div class="form-group">
                <label class="form-label">Annual Income from Property</label>
                <input type="text" class="form-control" id="prop-income" value="₹ 36,000">
              </div>

              <div class="form-group full-width">
                <label class="form-label">Mode of Acquisition & Departmental Prior Permission Ref</label>
                <input type="text" class="form-control" id="prop-mode" value="Ancestral inheritance / family property with prior intimation to Cadre">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-ipr-modal">Cancel</button>
            <button type="submit" class="btn btn-primary">💾 Save Property Declaration</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const modal = container.querySelector('#ipr-modal');
  const openBtn = container.querySelector('#btn-add-property');
  const closeBtn = container.querySelector('#btn-close-ipr-modal');
  const cancelBtn = container.querySelector('#btn-cancel-ipr-modal');
  const form = container.querySelector('#form-add-property');

  openBtn.addEventListener('click', () => modal.classList.add('show'));
  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('show'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = container.querySelector('#prop-type').value;
    const val = container.querySelector('#prop-val').value;
    const desc = container.querySelector('#prop-desc').value;
    const holder = container.querySelector('#prop-holder').value;
    const income = container.querySelector('#prop-income').value;
    const mode = container.querySelector('#prop-mode').value;

    const newProp = {
      id: Date.now(),
      propertyType: type,
      description: desc,
      presentValue: val,
      acquiredInName: holder,
      relationship: 'Self',
      modeOfAcquisition: mode,
      acquisitionDate: '2026-08-10',
      annualIncome: income,
      priorSanctionObtained: 'Yes - Notified to DoPT'
    };

    store.set(curr => ({
      ...curr,
      ipr: {
        ...curr.ipr,
        properties: [...curr.ipr.properties, newProp]
      }
    }));

    modal.classList.remove('show');
    alert("Property asset added to Annual Return schedule!");
    renderIprFiling(container);
  });

  container.querySelector('#btn-print-ipr').addEventListener('click', () => window.print());
  container.querySelector('#btn-download-ipr-ack').addEventListener('click', () => {
    downloadIprAck(user, ipr);
  });
}
