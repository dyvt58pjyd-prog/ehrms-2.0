/**
 * e-HRMS 2.0 - Claims & Reimbursements Module
 * Department of Personnel & Training (DoPT)
 */

import { store } from '../state.js';
import { downloadClaimOrder } from '../downloader.js';

export function renderClaimsAllowances(container) {
  const state = store.get();
  const claims = state.claims;

  container.innerHTML = `
    <!-- Top Action Strip -->
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Claims & Reimbursements</span>
        </div>
        <h1 class="page-heading">
          🧾 Claims, Allowances & Reimbursements
          <span class="page-heading-hi">/ भत्ते एवं प्रतिपूर्ति दावे</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" id="btn-new-claim">
          ➕ File New Claim / प्रतिपूर्ति दावा
        </button>
      </div>
    </div>

    <!-- Allowances Entitlement Summary Grid -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="assets/emblem.png" alt="State Emblem of India" style="width: 22px; height: 36px; object-fit: contain;">
          <span class="gov-card-title">Statutory Entitlement Slabs & Direct Credit Account (7th CPC - Level 7)</span>
        </div>
      </div>
      <div class="gov-card-body">
        <div class="key-val-grid">
          <div class="key-val-item">
            <span class="key-val-label">Children Education Allowance (CEA)</span>
            <span class="key-val-value">₹27,000 / year / child (Max 2 children)</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Hostel Subsidy</span>
            <span class="key-val-value">₹81,000 / year / child</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Briefcase Allowance (Level 7)</span>
            <span class="key-val-value">₹5,000 once every 3 years</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Telephone / Mobile Reimbursement</span>
            <span class="key-val-value">₹1,500 + GST per month</span>
          </div>
          <div class="key-val-item" style="grid-column: span 2;">
            <span class="key-val-label">Direct PFMS / DBT Disbursement Account</span>
            <span class="key-val-value" style="color: var(--goi-blue); font-weight: 700;">
              🏦 SBI A/C ${state.currentUser.bankDetails?.accountNo || '39189241534'} &bull; ${state.currentUser.bankDetails?.branch || 'DEFENCE BANKING BRANCH, AFS, BAREILLY'} (IFSC: ${state.currentUser.bankDetails?.ifsc || 'SBIN0001818'})
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Claims Ledger -->
    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">📜 Claims Submission & Settlement History</span>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Category</th>
              <th>Particulars</th>
              <th>Claimed Amount</th>
              <th>Admissible / Sanctioned</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Voucher / Action</th>
            </tr>
          </thead>
          <tbody>
            ${claims.map(c => `
              <tr>
                <td style="font-weight: 700; color: var(--goi-blue);">${c.id}</td>
                <td><strong>${c.category}</strong></td>
                <td style="font-size: 12px; max-width: 250px;">${c.description || c.childName || 'Allowance Claim'}</td>
                <td style="font-weight: 700;">₹${c.amountClaimed.toLocaleString('en-IN')}</td>
                <td style="font-weight: 700; color: var(--goi-green);">
                  ${c.amountAdmissible ? `₹${c.amountAdmissible.toLocaleString('en-IN')}` : 'Under Review'}
                </td>
                <td>${c.appliedOn}</td>
                <td>
                  <span class="status-badge badge-${c.status.toLowerCase()}">${c.status}</span>
                </td>
                <td>
                  ${c.status === 'SANCTIONED' || c.status === 'APPROVED' ? `
                    <button class="btn btn-outline btn-xs btn-download-claim" data-id="${c.id}" style="padding: 3px 8px; font-size: 11px; cursor: pointer; border-radius: 4px; border: 1px solid var(--goi-green); color: var(--goi-green);">
                      📥 Sanction Voucher
                    </button>
                  ` : `
                    <span style="color: var(--text-muted); font-size: 11px;">Pending Audit</span>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- New Claim Modal -->
    <div class="modal-backdrop" id="claim-modal">
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-title">
            <span>➕ Submit Allowance / Reimbursement Claim</span>
          </div>
          <button class="modal-close" id="btn-close-claim-modal">&times;</button>
        </div>
        <form id="form-submit-claim">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label">Claim Category <span class="req">*</span></label>
                <select class="form-control" id="claim-cat" required>
                  <option value="Children Education Allowance (CEA)">Children Education Allowance (CEA) - ₹27,000</option>
                  <option value="Medical Reimbursement (CGHS)">Medical Reimbursement (CGHS / CS-MA)</option>
                  <option value="Briefcase Allowance">Briefcase / Executive Bag Allowance</option>
                  <option value="Telephone & Broadband Allowance">Telephone & Broadband Allowance</option>
                  <option value="Newspaper Reimbursement">Newspaper / Periodical Reimbursement</option>
                </select>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Description / Bill Specifics <span class="req">*</span></label>
                <input type="text" class="form-control" id="claim-desc" value="Monthly Broadband and Landline bill for September 2026" required>
              </div>

              <div class="form-group">
                <label class="form-label">Amount Claimed (₹) <span class="req">*</span></label>
                <input type="number" class="form-control" id="claim-amt" value="2655" required>
              </div>

              <div class="form-group">
                <label class="form-label">Supporting Bill / Invoice Attachment</label>
                <input type="file" class="form-control" id="claim-file">
                <div class="form-help">Upload scanned PDF or JPG invoice (Max 5MB)</div>
              </div>

              <div class="form-group full-width" style="background: #eff6ff; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 4px; font-size: 12px; color: #1e3a8a;">
                <i class="fa-solid fa-building-columns" style="color: var(--goi-blue); margin-right: 6px;"></i>
                Sanctioned reimbursement will be disbursed via PFMS to your official salary account: <strong>SBI A/C ${state.currentUser.bankDetails?.accountNo || '39189241534'} (DEFENCE BANKING BRANCH, AFS, BAREILLY &bull; IFSC: ${state.currentUser.bankDetails?.ifsc || 'SBIN0001818'})</strong>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-claim-modal">Cancel</button>
            <button type="submit" class="btn btn-primary">🚀 Submit Claim to DDO</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const modal = container.querySelector('#claim-modal');
  const openBtn = container.querySelector('#btn-new-claim');
  const closeBtn = container.querySelector('#btn-close-claim-modal');
  const cancelBtn = container.querySelector('#btn-cancel-claim-modal');
  const form = container.querySelector('#form-submit-claim');

  openBtn.addEventListener('click', () => modal.classList.add('show'));
  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('show'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cat = container.querySelector('#claim-cat').value;
    const desc = container.querySelector('#claim-desc').value;
    const amt = parseInt(container.querySelector('#claim-amt').value, 10) || 0;

    const newClaim = {
      id: `CLM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      category: cat,
      description: desc,
      amountClaimed: amt,
      amountAdmissible: amt,
      status: 'PENDING',
      appliedOn: new Date().toISOString().split('T')[0],
      remarks: 'Self-certified online submission via e-HRMS 2.0'
    };

    store.set(curr => ({
      ...curr,
      claims: [newClaim, ...curr.claims]
    }));

    modal.classList.remove('show');
    alert(`Claim ${newClaim.id} for ₹${amt.toLocaleString('en-IN')} submitted!\n\nStatus: Pending verification with DDO (DoPT Cash Section).`);
    renderClaimsAllowances(container);
  });

  // Attach Claim Voucher download handlers
  container.querySelectorAll('.btn-download-claim').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const claim = claims.find(c => c.id === btn.dataset.id);
      if (claim) {
        downloadClaimOrder(state.currentUser, claim);
      }
    });
  });
}
