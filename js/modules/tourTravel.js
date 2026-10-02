/**
 * e-HRMS 2.0 - Tour & Travel Management Module (TA/DA)
 * Department of Personnel & Training (DoPT)
 */

import { store } from '../state.js';

export function renderTourTravel(container) {
  const state = store.get();
  const tours = state.tours;

  container.innerHTML = `
    <!-- Top Action Strip -->
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Tour & Travel Management</span>
        </div>
        <h1 class="page-heading">
          ✈️ Official Tour & Travel Claims
          <span class="page-heading-hi">/ आधिकारिक यात्रा एवं टीए/डीए प्रबंधन</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" id="btn-open-tour-modal">
          🛫 New Tour Requisition & Advance
        </button>
      </div>
    </div>

    <!-- Tour Entitlement Matrix Info -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <span class="gov-card-title">ℹ️ 7th CPC Travel Entitlements (Pay Level 12 - Deputy Secretary)</span>
      </div>
      <div class="gov-card-body" style="font-size: 12.5px;">
        <div class="key-val-grid">
          <div class="key-val-item">
            <span class="key-val-label">Travel Entitlement by Air</span>
            <span class="key-val-value">Economy Class (Air India / Authorised Agents)</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Travel Entitlement by Rail</span>
            <span class="key-val-value">AC 1st Class / Executive Class</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Daily Allowance (Hotel Accommodation)</span>
            <span class="key-val-value">Up to ₹4,500 per day + Reimbursement of AC Taxi charges</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Daily Food Allowance</span>
            <span class="key-val-value">Lump sum ₹1,000 per day</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tours Ledger Table -->
    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">📋 Official Tour Requisitions & Settlement Status</span>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>Tour Ref ID</th>
              <th>Destination & Sector</th>
              <th>Period</th>
              <th>Official Purpose</th>
              <th>Mode of Travel</th>
              <th>Advance (Req / Sanc)</th>
              <th>Status</th>
              <th>Sanction Order</th>
            </tr>
          </thead>
          <tbody>
            ${tours.map(t => `
              <tr>
                <td style="font-weight: 700; color: var(--goi-blue);">${t.id}</td>
                <td><strong>${t.destination}</strong><br><span style="font-size: 11px; color: var(--text-muted);">From: ${t.origin}</span></td>
                <td>${t.startDate} to ${t.endDate}</td>
                <td style="max-width: 220px; font-size: 12px;">${t.purpose}</td>
                <td>${t.mode}</td>
                <td>
                  ₹${t.advanceRequested.toLocaleString('en-IN')}<br>
                  <span style="font-size: 11px; color: ${t.advanceSanctioned ? 'var(--goi-green)' : 'var(--text-muted)'};">
                    Sanc: ₹${(t.advanceSanctioned || 0).toLocaleString('en-IN')}
                  </span>
                </td>
                <td>
                  <span class="status-badge badge-${t.status === 'SETTLED' ? 'sanctioned' : 'pending'}">${t.status}</span>
                </td>
                <td style="font-size: 11.5px;">
                  ${t.sanctionOrder ? `<code>${t.sanctionOrder}</code>` : '<span style="color: var(--status-warning);">Under Sanction</span>'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- New Tour Requisition Modal -->
    <div class="modal-backdrop" id="tour-modal">
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-title">
            <span>🛫 Official Tour Requisition Form (Annexure 'A')</span>
          </div>
          <button class="modal-close" id="btn-close-tour-modal">&times;</button>
        </div>
        <form id="form-apply-tour">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Place of Tour (Destination) <span class="req">*</span></label>
                <input type="text" class="form-control" id="tour-destination" placeholder="e.g. Mumbai / Chennai / Kolkata" required value="Bengaluru, Karnataka">
              </div>

              <div class="form-group">
                <label class="form-label">Origin Sector</label>
                <input type="text" class="form-control" value="New Delhi (HQ)" readonly>
              </div>

              <div class="form-group">
                <label class="form-label">Departure Date <span class="req">*</span></label>
                <input type="date" class="form-control" id="tour-start" value="2026-10-05" required>
              </div>

              <div class="form-group">
                <label class="form-label">Return Date <span class="req">*</span></label>
                <input type="date" class="form-control" id="tour-end" value="2026-10-08" required>
              </div>

              <div class="form-group">
                <label class="form-label">Entitled Mode of Travel</label>
                <select class="form-control" id="tour-mode">
                  <option value="Air (Economy - Air India/Balmer Lawrie/IRCTC)">Air (Economy Class - Govt OM)</option>
                  <option value="Train (1st AC / Executive Class)">Rail (1st Class AC)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Tour Advance Requested (₹) <span class="req">*</span></label>
                <input type="number" class="form-control" id="tour-advance" value="28000" required>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Detailed Official Purpose of Tour <span class="req">*</span></label>
                <textarea class="form-control" id="tour-purpose" required>Inter-departmental review meeting on National Data Governance Framework and administrative reforms with State nodal authorities.</textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-tour-modal">Cancel</button>
            <button type="submit" class="btn btn-primary">🚀 Submit Tour Requisition for Sanction</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const modal = container.querySelector('#tour-modal');
  const openBtn = container.querySelector('#btn-open-tour-modal');
  const closeBtn = container.querySelector('#btn-close-tour-modal');
  const cancelBtn = container.querySelector('#btn-cancel-tour-modal');
  const form = container.querySelector('#form-apply-tour');

  openBtn.addEventListener('click', () => modal.classList.add('show'));
  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('show'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dest = container.querySelector('#tour-destination').value;
    const start = container.querySelector('#tour-start').value;
    const end = container.querySelector('#tour-end').value;
    const mode = container.querySelector('#tour-mode').value;
    const adv = parseInt(container.querySelector('#tour-advance').value, 10) || 0;
    const purpose = container.querySelector('#tour-purpose').value;

    const newTour = {
      id: `TOUR-2026-${Math.floor(100 + Math.random() * 900)}`,
      purpose: purpose,
      origin: 'New Delhi',
      destination: dest,
      startDate: start,
      endDate: end,
      mode: mode,
      estimatedCost: Math.round(adv * 1.25),
      advanceRequested: adv,
      advanceSanctioned: adv,
      status: 'PENDING_APPROVAL',
      appliedOn: new Date().toISOString().split('T')[0],
      sanctionOrder: null
    };

    store.set(curr => ({
      ...curr,
      tours: [newTour, ...curr.tours]
    }));

    modal.classList.remove('show');
    alert(`Tour Requisition ${newTour.id} submitted!\n\nStatus: Pending with Controlling Authority (Joint Secretary Establishment).`);
    renderTourTravel(container);
  });
}
