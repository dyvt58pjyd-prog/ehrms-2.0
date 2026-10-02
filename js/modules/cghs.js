/**
 * CGHS Medical Reimbursement Module
 */
import { store } from '../state.js';

export function renderCGHS(container) {
  const state = store.get();
  const claims = state.cghsClaims || [];
  const user = state.currentUser || {};

  container.innerHTML = `
    <div class="page-title-strip">
      <div class="page-title-left">
        <h1 class="page-heading">
          ⚕️ CGHS Medical Claims & Beneficiary Details
        </h1>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
          Central Government Health Scheme - Beneficiary ID: ${user.cghsBenId || 'CGHS/DEL/DMA/2444810'}
        </div>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="alert('Claim Submission Form Opened');">
          + File New Medical Claim
        </button>
      </div>
    </div>

    <!-- CGHS E-Card Display -->
    <div class="card" style="margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 4px solid #16a34a; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; gap: 20px; align-items: center;">
        <div style="width: 60px; height: 60px; border-radius: 30px; background: #166534; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px;">
          🏥
        </div>
        <div>
          <div style="font-size: 16px; font-weight: 800; color: #166534;">Primary Beneficiary Card Active</div>
          <div style="font-size: 13px; color: #15803d; margin-top: 4px;">Dispensary: CGHS Wellness Centre (73), North Avenue, New Delhi</div>
          <div style="font-size: 12px; font-weight: 700; color: #166534; margin-top: 6px;">Ward Entitlement: Private Ward</div>
        </div>
      </div>
      <button class="btn btn-outline" style="border-color: #166534; color: #166534;" onclick="alert('Downloading CGHS Index Card...');">
        💳 Download E-Card
      </button>
    </div>

    <!-- Claims Ledger -->
    <div class="card">
      <div style="padding: 15px; border-bottom: 1px solid var(--border-light); font-weight: 700; color: var(--goi-navy);">
        🧾 Claims & Reimbursement Ledger
      </div>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid var(--border-light);">
              <th style="padding: 12px 15px; text-align: left; color: var(--text-muted);">Claim ID</th>
              <th style="padding: 12px 15px; text-align: left; color: var(--text-muted);">Patient Details</th>
              <th style="padding: 12px 15px; text-align: left; color: var(--text-muted);">Treatment & Hospital</th>
              <th style="padding: 12px 15px; text-align: right; color: var(--text-muted);">Amount Claimed</th>
              <th style="padding: 12px 15px; text-align: left; color: var(--text-muted);">Status</th>
            </tr>
          </thead>
          <tbody>
            ${claims.map(c => `
              <tr style="border-bottom: 1px solid var(--border-light);">
                <td style="padding: 12px 15px; font-weight: 700; color: var(--goi-blue);">${c.id}<br><span style="font-size: 10px; color: var(--text-muted); font-weight: normal;">${c.date}</span></td>
                <td style="padding: 12px 15px;">${c.patient}</td>
                <td style="padding: 12px 15px;">${c.treatment}<br><span style="font-size: 11px; color: var(--text-muted);">${c.hospital}</span></td>
                <td style="padding: 12px 15px; text-align: right; font-weight: 700;">₹${(c.amount || 0).toLocaleString('en-IN')}</td>
                <td style="padding: 12px 15px;">
                  ${c.status === 'Settled' ? '<span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700;">Settled</span>' : ''}
                  ${c.status === 'Pending Scrutiny' ? '<span style="background: #fef08a; color: #854d0e; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700;">Pending Scrutiny</span>' : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
