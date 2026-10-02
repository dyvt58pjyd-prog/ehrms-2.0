/**
 * e-HRMS 2.0 - CPGRAMS & Employee Grievance Redressal Desk
 * Government of India - Department of Personnel & Training & Ministry of Defence
 */

import { store } from '../state.js';

export function renderGrievances(container) {
  const state = store.get();
  const user = state.currentUser;
  const grievances = state.grievances || [];

  container.innerHTML = `
    <!-- Top Header Strip -->
    <div class="page-title-strip">
      <div>
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: var(--goi-navy); display: flex; align-items: center; gap: 8px;">
          <span>⚖️</span> CPGRAMS &bull; Employee Grievance Redressal Desk
        </h2>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
          Centralized Public Grievance Redress and Monitoring System &bull; Department of Military Affairs Internal Redressal Cell
        </div>
      </div>
      <div>
        <button class="btn btn-sm btn-primary" id="btn-open-grievance-modal">
          ✍️ Lodge New Grievance
        </button>
      </div>
    </div>

    <!-- Statutory SLA Banner -->
    <div class="gov-card mb-20" style="background: #f8fafc; border-left: 4px solid var(--goi-navy); padding: 14px 18px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <strong style="color: var(--goi-navy); font-size: 13px;">Statutory Citizen's Charter Mandate &mdash; Rule 37 CCS Rules</strong><br>
          <span style="font-size: 11.5px; color: var(--text-secondary);">
            All official employee grievances within the Department of Military Affairs are subject to a mandatory <strong>30-Day SLA Turnaround</strong> monitored by the Cadre Controlling Authority.
          </span>
        </div>
        <span class="status-badge badge-sanctioned" style="font-size: 11px;">
          SLA Compliance: 100%
        </span>
      </div>
    </div>

    <!-- Grievances Ledger Table -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <span class="gov-card-title">📜 Registered Grievance Dockets &amp; Redressal Audit Trail</span>
        <span style="font-size: 12px; color: var(--text-muted);">${grievances.length} Docket(s) on Record</span>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>Docket No. &amp; Date</th>
              <th>Category</th>
              <th>Subject &amp; Description</th>
              <th>Designated Nodal Officer</th>
              <th>Status &amp; Stage</th>
              <th>Resolution Audit</th>
            </tr>
          </thead>
          <tbody>
            ${grievances.length === 0 ? `
              <tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">No grievance dockets on record.</td></tr>
            ` : grievances.map(g => `
              <tr>
                <td>
                  <strong style="color: var(--goi-blue);">${g.docketNo}</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">${g.dateLodged}</span>
                </td>
                <td><span class="status-badge" style="background: #f1f5f9; color: #334155; font-size: 11px;">${g.category}</span></td>
                <td style="max-width: 240px; font-size: 12px;">
                  <strong>${g.subject}</strong>
                </td>
                <td style="font-size: 11.5px;">${g.nodalOfficer}</td>
                <td>
                  ${g.status === 'RESOLVED' ? `
                    <span class="status-badge badge-sanctioned">✓ Resolved</span>
                  ` : `
                    <span class="status-badge badge-pending">Under Investigation</span>
                  `}
                  <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 3px;">
                    ${g.currentStage}
                  </div>
                </td>
                <td style="font-size: 11.5px; color: #166534;">
                  ${g.resolutionNotes || 'In progress within 30-day SLA window.'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Grievance Redressal Structure Guide -->
    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">🏛️ Three-Tier Grievance Appellate Hierarchy (DoPT Norms)</span>
      </div>
      <div class="gov-card-body" style="font-size: 12.5px; line-height: 1.6; color: var(--text-secondary);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
          <div style="background: #f8fafc; padding: 12px; border-radius: 4px; border: 1px solid var(--border-light);">
            <strong style="color: var(--goi-navy);">Tier 1: Branch Officer</strong><br>
            Deputy Secretary (Establishment) &mdash; Initial scrutiny and direct administrative redressal within 14 days.
          </div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 4px; border: 1px solid var(--border-light);">
            <strong style="color: var(--goi-navy);">Tier 2: Director (Estt &amp; Joint Staff)</strong><br>
            First Appellate Authority for disputed claims, service book corrections, or pay fixation reviews.
          </div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 4px; border: 1px solid var(--border-light);">
            <strong style="color: var(--goi-navy);">Tier 3: Joint Secretary (CCA)</strong><br>
            Final Cadre Appellate Authority for policy appeals and statutory references under CCS (CCA) Rules.
          </div>
        </div>
      </div>
    </div>

    <!-- Lodge Grievance Modal -->
    <div class="modal-backdrop" id="grievance-modal">
      <div class="modal-dialog" style="max-width: 580px;">
        <div class="modal-header">
          <div class="modal-title">
            <span>⚖️</span> Lodge Official Employee Grievance (CPGRAMS)
          </div>
          <button class="modal-close" id="btn-close-grievance-modal">&times;</button>
        </div>
        <form id="form-lodge-grievance">
          <div class="modal-body">
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div class="form-group">
                <label class="form-label">Grievance Category <span class="req">*</span></label>
                <select class="form-control" id="grievance-cat-select" required>
                  <option value="Pay Fixation / 7th CPC Increments">Pay Fixation / 7th CPC Increments / MACP</option>
                  <option value="e-Service Book Record Verification">e-Service Book Record Verification (Rule 257)</option>
                  <option value="CGHS Cashless Treatment / Medical Claim">CGHS Cashless Treatment / Medical Claim</option>
                  <option value="Children Education Allowance (CEA)">Children Education Allowance (CEA) Claim</option>
                  <option value="Leave Encashment / LTC Settlement">Leave Encashment / LTC Settlement</option>
                  <option value="Quarter Allotment / e-Awas License Fee">Quarter Allotment / e-Awas License Fee</option>
                  <option value="Other Administrative Matter">Other Administrative Matter</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Subject of Grievance <span class="req">*</span></label>
                <input type="text" class="form-control" id="grievance-subject" placeholder="Concise summary of issue..." required>
              </div>

              <div class="form-group">
                <label class="form-label">Detailed Grievance Description <span class="req">*</span></label>
                <textarea class="form-control" id="grievance-desc" rows="4" placeholder="Detail the grievance, citing relevant rules, previous communications, or application reference IDs..." required></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Assigned Nodal Officer</label>
                <input type="text" class="form-control" value="Shri Rajender Singh, Under Secretary (Estt-I)" readonly>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-grievance-modal">Cancel</button>
            <button type="submit" class="btn btn-primary">
              🚀 Submit Grievance Docket to CPGRAMS
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Attach Modal Handlers
  const modal = container.querySelector('#grievance-modal');
  const openBtn = container.querySelector('#btn-open-grievance-modal');
  const closeBtn = container.querySelector('#btn-close-grievance-modal');
  const cancelBtn = container.querySelector('#btn-cancel-grievance-modal');
  const form = container.querySelector('#form-lodge-grievance');

  openBtn?.addEventListener('click', () => modal?.classList.add('show'));
  closeBtn?.addEventListener('click', () => modal?.classList.remove('show'));
  cancelBtn?.addEventListener('click', () => modal?.classList.remove('show'));

  // Form Submit Handler
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const cat = container.querySelector('#grievance-cat-select').value;
    const subject = container.querySelector('#grievance-subject').value;
    const desc = container.querySelector('#grievance-desc').value;

    const todayIso = new Date().toISOString().split('T')[0];
    const newDocket = {
      docketNo: `DMA/E/2026/${Math.floor(10000 + Math.random() * 90000)}`,
      category: cat,
      subject: subject,
      dateLodged: todayIso,
      slaDays: 30,
      status: 'PENDING',
      currentStage: 'Registered on CPGRAMS 7.0 &bull; Forwarded to DS (Estt) for First-Line Scrutiny',
      nodalOfficer: 'Shri Rajender Singh, DS (Estt)',
      resolutionNotes: 'Under active review with Establishment-I branch.'
    };

    store.set(curr => ({
      ...curr,
      grievances: [newDocket, ...(curr.grievances || [])],
      notifications: [
        {
          id: Date.now(),
          title: 'Grievance Docket Registered',
          message: `Grievance ${newDocket.docketNo} (${cat}) logged on CPGRAMS with 30-day statutory SLA.`,
          type: 'info',
          timestamp: 'Just now'
        },
        ...curr.notifications
      ]
    }));

    modal?.classList.remove('show');
    alert(`Grievance Registered Successfully on CPGRAMS!\n\nDocket No: ${newDocket.docketNo}\nSLA Deadline: 30 Days\nForwarded to: Shri Rajender Singh, Under Secretary (Estt-I).`);
    renderGrievances(container);
  });
}

export { renderGrievances as renderGrievancesDesk };
