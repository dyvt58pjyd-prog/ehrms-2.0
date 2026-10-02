/**
 * e-HRMS 2.0 - Leave Travel Concession (LTC) Module
 * Department of Personnel & Training (DoPT)
 * Central Civil Services (LTC) Rules, 1988
 */

import { store } from '../state.js';

export function renderLtcModule(container) {
  const state = store.get();
  const ltc = state.ltc;
  const user = state.currentUser;

  container.innerHTML = `
    <!-- Top Action Strip -->
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Leave Travel Concession (LTC)</span>
        </div>
        <h1 class="page-heading">
          🚆 Leave Travel Concession (LTC)
          <span class="page-heading-hi">/ अवकाश यात्रा रियायत (CCS LTC Rules, 1988)</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" id="btn-apply-ltc">
          🎟️ Prior Intimation / Apply LTC Advance
        </button>
      </div>
    </div>

    <!-- LTC Block Status Overview Card -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <span class="gov-card-title">📌 LTC Entitlement & Block Year Profile</span>
        <span class="status-badge badge-sanctioned">Active Block</span>
      </div>
      <div class="gov-card-body">
        <div class="key-val-grid">
          <div class="key-val-item">
            <span class="key-val-label">Current 4-Year Block Period</span>
            <span class="key-val-value">${ltc.currentBlock}</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Declared Home Town</span>
            <span class="key-val-value">${user.homeTown} (${user.homeState})</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Mode & Class Entitlement</span>
            <span class="key-val-value">${ltc.entitlement}</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">EL Encashment Availed</span>
            <span class="key-val-value">${ltc.encashmentAvailedLifetime} / 60 Days (Lifetime Cap)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- LTC Claims History Table -->
    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">📜 LTC Claims & Sanctions Ledger</span>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>LTC Ref ID</th>
              <th>Type / Concession</th>
              <th>Declared Destination</th>
              <th>Family Covered</th>
              <th>EL Encashment</th>
              <th>Advance Sanc (₹)</th>
              <th>Settled Amount (₹)</th>
              <th>Status</th>
              <th>Sanction Order</th>
            </tr>
          </thead>
          <tbody>
            ${ltc.requests.map(r => `
              <tr>
                <td style="font-weight: 700; color: var(--goi-blue);">${r.id}</td>
                <td><span class="status-badge badge-info">${r.type}</span></td>
                <td><strong>${r.declaredDestination}</strong></td>
                <td style="font-size: 11.5px;">${r.familyMembersCovered.join(', ')}</td>
                <td style="text-align: center; font-weight: 700;">${r.elEncashmentDays} Days</td>
                <td>₹${r.advanceSanctioned.toLocaleString('en-IN')}</td>
                <td style="font-weight: 700; color: var(--goi-green);">₹${(r.totalClaimSettled || 0).toLocaleString('en-IN')}</td>
                <td><span class="status-badge badge-sanctioned">${r.status}</span></td>
                <td><code>${r.sanctionOrder}</code></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- LTC Intimation Modal -->
    <div class="modal-backdrop" id="ltc-modal">
      <div class="modal-dialog modal-lg">
        <div class="modal-header">
          <div class="modal-title">
            <span>🎟️ Prior Intimation & LTC Advance Application</span>
          </div>
          <button class="modal-close" id="btn-close-ltc-modal">&times;</button>
        </div>
        <form id="form-apply-ltc">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Nature of LTC Concession <span class="req">*</span></label>
                <select class="form-control" id="ltc-type">
                  <option value="Home Town">Home Town LTC (${user.homeTown})</option>
                  <option value="Anywhere in India">Anywhere in India (All India LTC)</option>
                  <option value="Special Dispensation (NER / J&K / Ladakh)">Special Dispensation (NER / J&K / Ladakh)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Destination to be visited <span class="req">*</span></label>
                <input type="text" class="form-control" id="ltc-dest" value="Srinagar, Jammu & Kashmir" required>
              </div>

              <div class="form-group">
                <label class="form-label">Proposed Date of Outward Journey <span class="req">*</span></label>
                <input type="date" class="form-control" id="ltc-start" value="2026-11-10" required>
              </div>

              <div class="form-group">
                <label class="form-label">Proposed Date of Return Journey <span class="req">*</span></label>
                <input type="date" class="form-control" id="ltc-end" value="2026-11-18" required>
              </div>

              <div class="form-group">
                <label class="form-label">Earned Leave (EL) Encashment Required?</label>
                <select class="form-control" id="ltc-encashment">
                  <option value="10">Yes - 10 Days EL Encashment (Entitled)</option>
                  <option value="0">No Encashment</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">LTC Advance Requested (₹)</label>
                <input type="number" class="form-control" id="ltc-adv-amt" value="75000">
              </div>

              <div class="form-group full-width">
                <label class="form-label">Family Members to Accompany (Check all eligible):</label>
                <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 6px;">
                  <label><input type="checkbox" checked disabled> Self (${user.name})</label>
                  ${state.serviceBook.family.map((f, idx) => `
                    <label><input type="checkbox" id="ltc-fam-${idx}" checked> ${f.name} (${f.relationship})</label>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-ltc-modal">Cancel</button>
            <button type="submit" class="btn btn-primary">🚀 Submit LTC Prior Intimation</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const modal = container.querySelector('#ltc-modal');
  const openBtn = container.querySelector('#btn-apply-ltc');
  const closeBtn = container.querySelector('#btn-close-ltc-modal');
  const cancelBtn = container.querySelector('#btn-cancel-ltc-modal');
  const form = container.querySelector('#form-apply-ltc');

  openBtn.addEventListener('click', () => modal.classList.add('show'));
  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('show'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = container.querySelector('#ltc-type').value;
    const dest = container.querySelector('#ltc-dest').value;
    const start = container.querySelector('#ltc-start').value;
    const end = container.querySelector('#ltc-end').value;
    const encash = parseInt(container.querySelector('#ltc-encashment').value, 10) || 0;
    const adv = parseInt(container.querySelector('#ltc-adv-amt').value, 10) || 0;

    const covered = [`Self (${user.name})`];
    state.serviceBook.family.forEach((f, idx) => {
      const chk = container.querySelector(`#ltc-fam-${idx}`);
      if (chk && chk.checked) covered.push(`${f.name} (${f.relationship})`);
    });

    const newLtc = {
      id: `LTC-2026-${Math.floor(100 + Math.random() * 900)}`,
      type: type,
      declaredDestination: dest,
      familyMembersCovered: covered,
      travelDates: `${start} to ${end}`,
      elEncashmentDays: encash,
      advanceRequested: adv,
      advanceSanctioned: adv,
      status: 'SUBMITTED',
      totalClaimSettled: 0,
      sanctionOrder: 'Pending DDO Sanction'
    };

    store.set(curr => ({
      ...curr,
      ltc: {
        ...curr.ltc,
        requests: [newLtc, ...curr.ltc.requests]
      }
    }));

    modal.classList.remove('show');
    alert(`LTC Intimation & Advance application ${newLtc.id} submitted successfully!\n\nSanctioning Authority: Competent Authority, Department of Military Affairs, MoD.`);
    renderLtcModule(container);
  });
}
