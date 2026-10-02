/**
 * e-HRMS 2.0 - Vigilance Clearance & NOC Module
 * Tracks applications for CVC Clearance, Passport NOCs, and Deputation Clearance.
 */
import { store } from '../state.js';
import { downloadNocOrder } from '../downloader.js';

export function renderVigilanceNoc(container) {
  const state = store.get();
  const user = state.currentUser;
  
  // Initialize vigilanceNoc applications if not exist
  const nocApps = state.vigilanceNocApplications || [
    {
      id: 'NOC-2026-9112',
      type: 'NOC for Ordinary Passport issuance',
      appliedOn: '2026-08-10',
      status: 'CLEARED',
      cvcStatus: 'Verified (No Pending Enquiries)',
      authority: 'Chief Vigilance Officer, MoD'
    }
  ];

  container.innerHTML = `
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Vigilance & NOCs</span>
        </div>
        <h1 class="page-heading">
          🛡️ Vigilance Clearance & NOC
          <span class="page-heading-hi">/ सतर्कता क्लीयरेंस एवं एनओसी</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" id="btn-apply-noc">
          + Apply for New NOC
        </button>
      </div>
    </div>

    <!-- CVC Central Tracking Banner -->
    <div class="gov-alert gov-alert-info mb-20" style="border-left: 4px solid #b91c1c;">
      <div style="font-size: 24px;">🏛️</div>
      <div>
        <strong>Central Vigilance Commission (CVC) Integration:</strong> Applications for Passport NOCs, Foreign Deputation, and Commercial Employment post-retirement are verified in real-time against the National Vigilance Registry.
      </div>
    </div>

    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">My NOC Applications</span>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>NOC Type</th>
              <th>Applied On</th>
              <th>CVC Verification Status</th>
              <th>Final Status</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            ${nocApps.map(app => `
              <tr>
                <td><strong>${app.id}</strong></td>
                <td>${app.type}</td>
                <td>${app.appliedOn}</td>
                <td><span style="color: #16a34a; font-weight: 600;">✓ ${app.cvcStatus}</span></td>
                <td>
                  <span class="status-badge badge-${app.status.toLowerCase() === 'cleared' ? 'sanctioned' : 'pending'}">${app.status}</span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline btn-download-noc" data-id="${app.id}">
                    📥 Download NOC
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Apply for NOC Modal -->
    <div class="gov-modal" id="modal-apply-noc">
      <div class="gov-modal-content" style="max-width: 500px;">
        <div class="gov-modal-header">
          <h3 style="margin:0; font-size: 16px; color: var(--goi-navy);">📝 Apply for New Vigilance Clearance (NOC)</h3>
          <span class="close-modal" id="btn-close-noc-modal" style="cursor: pointer; font-size: 18px;">&times;</span>
        </div>
        <div class="gov-modal-body">
          <form id="form-apply-noc">
            <div class="form-group mb-10">
              <label class="form-label">NOC Type / Purpose</label>
              <select id="noc-type" class="form-control" required>
                <option value="">-- Select Purpose --</option>
                <option value="Ordinary Passport Issuance / Renewal">Ordinary Passport Issuance / Renewal</option>
                <option value="Official Passport Issuance">Official Passport Issuance</option>
                <option value="Foreign Visit / Deputation">Foreign Visit / Deputation</option>
                <option value="Private Employment Post-Retirement">Private Employment Post-Retirement</option>
              </select>
            </div>
            <div class="form-group mb-10">
              <label class="form-label">Destination Country (if applicable)</label>
              <input type="text" id="noc-country" class="form-control" placeholder="e.g., USA, UK, Singapore">
            </div>
            <div class="form-group mb-10">
              <label class="form-label">Justification / Remarks</label>
              <textarea id="noc-remarks" class="form-control" rows="3" placeholder="Provide brief reason for NOC..."></textarea>
            </div>
            
            <div class="gov-alert gov-alert-warning" style="font-size: 11px; margin-top: 15px;">
              <strong>Disclaimer:</strong> False information may lead to disciplinary action under CCS (Conduct) Rules.
            </div>

            <div style="text-align: right; margin-top: 20px;">
              <button type="button" class="btn btn-outline" id="btn-cancel-noc" style="margin-right: 10px;">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit Application</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners
  const btnApply = container.querySelector('#btn-apply-noc');
  const modalApply = container.querySelector('#modal-apply-noc');
  const btnCloseModal = container.querySelector('#btn-close-noc-modal');
  const btnCancelModal = container.querySelector('#btn-cancel-noc');
  const formApply = container.querySelector('#form-apply-noc');

  const openModal = () => modalApply.classList.add('show');
  const closeModal = () => modalApply.classList.remove('show');

  if (btnApply) btnApply.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);

  if (formApply) {
    formApply.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const type = document.getElementById('noc-type').value;
      const today = new Date().toISOString().split('T')[0];
      const newId = 'NOC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

      const newApp = {
        id: newId,
        type: type,
        appliedOn: today,
        status: 'PENDING',
        cvcStatus: 'Pending Initial Verification',
        authority: 'Chief Vigilance Officer, MoD'
      };

      const updatedApps = [newApp, ...nocApps];
      store.set({ vigilanceNocApplications: updatedApps });
      
      closeModal();
      alert('NOC Application submitted successfully. CVC verification initiated.');
      
      // Re-render
      renderVigilanceNoc(container);
    });
  }

  // Attach Download Listeners
  container.querySelectorAll('.btn-download-noc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.closest('button').getAttribute('data-id');
      const app = nocApps.find(a => a.id === id);
      if (app) {
        if (app.status !== 'CLEARED') {
          alert('Cannot download certificate. Status is ' + app.status);
          return;
        }
        downloadNocOrder(user, app);
      }
    });
  });
}
