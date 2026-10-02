/**
 * e-HRMS 2.0 - Manager Self Service (MSS) / Approvals Inbox Module
 * Department of Military Affairs, Ministry of Defence
 * Integrated with Aadhaar e-Sign & Digital Verification
 */

import { store } from '../state.js';

export function renderApprovals(container) {
  const state = store.get();
  const user = state.currentUser;
  const pendingLeaves = state.leaveApplications.filter(l => l.status === 'PENDING');
  const pendingTours = state.tours.filter(t => t.status === 'PENDING_APPROVAL');
  const pendingClaims = state.claims.filter(c => c.status === 'PENDING');
  const aparPending = state.apar.cycles.filter(c => c.status === 'WITH_REPORTING_OFFICER');

  const totalPending = pendingLeaves.length + pendingTours.length + pendingClaims.length + aparPending.length;

  container.innerHTML = `
    <!-- Top Action Strip -->
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Manager Self Service (MSS)</span>
        </div>
        <h1 class="page-heading">
          ⚖️ Sanctions & Approvals Inbox (MSS)
          <span class="page-heading-hi">/ प्रशासनिक स्वीकृति एवं ई-हस्ताक्षर इनबॉक्स</span>
        </h1>
      </div>
      <div class="page-actions">
        <span class="status-badge ${totalPending > 0 ? 'badge-pending' : 'badge-sanctioned'}" style="font-size: 13px; padding: 6px 12px;">
          ${totalPending} Requests Awaiting Your Sanction
        </span>
      </div>
    </div>

    <!-- Genuine DMA Approver Persona Note -->
    <div class="gov-alert gov-alert-info mb-20" style="border-left: 4px solid var(--goi-navy);">
      <div style="font-size: 24px;">🏛️</div>
      <div>
        <strong>Sanctioning Authority View:</strong> Logged in as <strong>Shri Anil Kumar Chhapolia, Joint Secretary (Establishment & Coordination)</strong>, Department of Military Affairs, Ministry of Defence.
        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">
          Competent delegated administrative and financial powers under Central Civil Services Rules and Ministry of Defence Delegation of Financial Powers (DFP).
        </div>
      </div>
    </div>

    <!-- Tabs for different approval categories -->
    <div class="tab-nav" id="approvals-tab-nav">
      <button class="tab-btn active" data-tab="leaves">Leaves (${pendingLeaves.length})</button>
      <button class="tab-btn" data-tab="tours">Official Tours (${pendingTours.length})</button>
      <button class="tab-btn" data-tab="claims">Reimbursements (${pendingClaims.length})</button>
      <button class="tab-btn" data-tab="apar">APAR Appraisals (${aparPending.length})</button>
    </div>

    <div id="approvals-content">
      <!-- Injected dynamically below -->
    </div>

    <!-- Simulated Aadhaar e-Sign / DSC Modal -->
    <div class="modal-backdrop" id="esign-modal">
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-title">
            <span>🛡️ Electronic Signature (e-Sign 3.0 / C-DAC ESP)</span>
          </div>
          <button class="modal-close" id="btn-close-esign-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="gov-alert gov-alert-success mb-20">
            <div>
              <strong>Ministry of Defence e-Governance:</strong> Legally binding digital authentication under Section 5 of Information Technology Act, 2000.
            </div>
          </div>
          <div style="background: #f8fafc; border: 1px solid var(--border-medium); border-radius: 6px; padding: 16px; margin-bottom: 20px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--goi-navy); margin-bottom: 6px;">
              Request to be Sanctioned:
            </div>
            <div id="esign-summary-text" style="font-size: 13px; color: var(--text-primary);"></div>
          </div>
          <div class="form-group">
            <label class="form-label">Signer Identification (Aadhaar / Virtual ID)</label>
            <input type="text" class="form-control" value="XXXX-XXXX-4819 (Shri Anil Kumar Chhapolia, Joint Secretary, DMA)" readonly>
          </div>
          <div class="form-group" style="margin-top: 14px;" id="esign-approval-date-group">
            <label class="form-label">Effective Sanction Date <span style="font-weight:normal; color:#666;">(Adjust to post-date or back-date)</span></label>
            <input type="date" class="form-control" id="esign-approval-date" value="${new Date().toISOString().split('T')[0]}" style="max-width: 200px;">
          </div>
          <div class="form-group" style="margin-top: 14px;">
            <label class="form-label">Enter 6-Digit Aadhaar OTP <span class="req">*</span></label>
            <div style="display: flex; gap: 10px;">
              <input type="password" class="form-control" id="esign-otp" value="123456" maxlength="6" style="letter-spacing: 6px; font-size: 18px; text-align: center; max-width: 200px;">
              <button type="button" class="btn btn-outline" style="font-size: 12px;" onclick="alert('OTP re-sent to registered mobile of Shri Anil Kumar Chhapolia')">Resend OTP</button>
            </div>
            <div class="form-help">Demo Authentication OTP is pre-filled: 123456</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" id="btn-cancel-esign">Cancel</button>
          <button type="button" class="btn btn-success" id="btn-confirm-esign">
            ✍️ Authenticate & Issue Official DMA Sanction Order
          </button>
        </div>
      </div>
    </div>
  `;

  const contentArea = container.querySelector('#approvals-content');
  const tabNav = container.querySelector('#approvals-tab-nav');
  const esignModal = container.querySelector('#esign-modal');
  const esignSummary = container.querySelector('#esign-summary-text');
  let currentActionItem = null;

  function renderCategory(cat) {
    if (cat === 'leaves') {
      if (pendingLeaves.length === 0) {
        contentArea.innerHTML = `
          <div class="gov-card">
            <div class="gov-card-body" style="text-align: center; color: var(--text-muted); padding: 40px;">
              ✅ No pending leave applications awaiting your sanction in the Department of Military Affairs.
            </div>
          </div>
        `;
        return;
      }
      contentArea.innerHTML = `
        <div class="gov-card">
          <div class="gov-table-container">
            <table class="gov-table">
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Applicant (ASO-I)</th>
                  <th>Leave Type</th>
                  <th>Duration</th>
                  <th>Station Permission</th>
                  <th>Reason</th>
                  <th>Workflow Scrutiny Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${pendingLeaves.map(l => `
                  <tr>
                    <td style="font-weight: 700; color: var(--goi-blue);">${l.id}</td>
                    <td>
                      <strong>${user.name}</strong><br>
                      <span style="font-size: 11px; color: var(--text-muted);">${user.designation}</span><br>
                      <span style="font-size: 10px; color: #0284c7;">ID: ${user.empId}</span>
                    </td>
                    <td><strong>${l.typeName}</strong> (${l.type})</td>
                    <td>${l.startDate} to ${l.endDate}<br><span style="font-weight: 700;">(${l.days} days)</span></td>
                    <td>
                      ${l.stationLeave ? `
                        <span class="status-badge badge-sanctioned" title="Address: ${l.stationLeaveAddress}">Station Perm Req</span>
                      ` : `
                        <span style="color: var(--text-muted); font-size: 12px;">Headquarters</span>
                      `}
                    </td>
                    <td style="font-size: 12px; max-width: 180px;">${l.reason}</td>
                    <td>
                      <div style="font-size: 11px; color: #0284c7; font-weight: 600;">
                        Scrutinized & Recommended
                      </div>
                      <div style="font-size: 10.5px; color: var(--text-muted);">
                        by ${user.controllingOfficer.name} (DS Estt)
                      </div>
                    </td>
                    <td>
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-sm btn-success btn-approve-leave" data-id="${l.id}">
                          ✍️ Sanction (e-Sign)
                        </button>
                        <button class="btn btn-sm btn-danger btn-reject-leave" data-id="${l.id}">
                          Return
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (cat === 'tours') {
      if (pendingTours.length === 0) {
        contentArea.innerHTML = `<div class="gov-card"><div class="gov-card-body" style="text-align: center; color: var(--text-muted); padding: 40px;">No pending tour requisitions in queue.</div></div>`;
        return;
      }
      contentArea.innerHTML = `
        <div class="gov-card">
          <div class="gov-table-container">
            <table class="gov-table">
              <thead>
                <tr>
                  <th>Tour ID</th>
                  <th>Applicant</th>
                  <th>Destination Sector</th>
                  <th>Dates</th>
                  <th>Travel Mode</th>
                  <th>Advance Requested</th>
                  <th>Workflow Route</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${pendingTours.map(t => `
                  <tr>
                    <td style="font-weight: 700; color: var(--goi-blue);">${t.id}</td>
                    <td><strong>${user.name}</strong><br><span style="font-size: 11px; color: var(--text-muted);">${user.designation}</span></td>
                    <td>${t.destination}</td>
                    <td>${t.startDate} to ${t.endDate}</td>
                    <td>${t.mode}</td>
                    <td style="font-weight: 700; color: var(--goi-navy);">₹${t.advanceRequested.toLocaleString('en-IN')}</td>
                    <td><span style="font-size: 11px; color: var(--text-muted);">Recommended by DS Estt</span></td>
                    <td>
                      <button class="btn btn-sm btn-success btn-approve-tour" data-id="${t.id}">
                        ✍️ Sanction Tour
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (cat === 'claims') {
      if (pendingClaims.length === 0) {
        contentArea.innerHTML = `<div class="gov-card"><div class="gov-card-body" style="text-align: center; color: var(--text-muted); padding: 40px;">No pending claims in queue.</div></div>`;
        return;
      }
      contentArea.innerHTML = `
        <div class="gov-card">
          <div class="gov-table-container">
            <table class="gov-table">
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Applied On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${pendingClaims.map(c => `
                  <tr>
                    <td style="font-weight: 700; color: var(--goi-blue);">${c.id}</td>
                    <td><strong>${c.category}</strong></td>
                    <td>${c.description}</td>
                    <td style="font-weight: 700;">₹${c.amountClaimed.toLocaleString('en-IN')}</td>
                    <td>${c.appliedOn}</td>
                    <td>
                      <button class="btn btn-sm btn-success btn-approve-claim" data-id="${c.id}">Sanction & Send to DDO</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (cat === 'apar') {
      if (aparPending.length === 0) {
        contentArea.innerHTML = `<div class="gov-card"><div class="gov-card-body" style="text-align: center; color: var(--text-muted); padding: 40px;">No pending APAR appraisals awaiting reporting remarks.</div></div>`;
        return;
      }
      contentArea.innerHTML = `
        <div class="gov-card">
          <div class="gov-card-body">
            <h3>SPARROW Performance Appraisal FY 2025-2026: ${user.name} (${user.designation})</h3>
            <p style="margin: 10px 0; font-size: 13px;"><strong>Officer's Self-Appraisal:</strong> ${aparPending[0].resumeOfWork}</p>
            <div class="form-group" style="margin-top: 14px;">
              <label class="form-label">Reporting Officer Numerical Score (1.0 to 10.0)</label>
              <input type="number" step="0.1" max="10" min="1" class="form-control" id="apar-score-input" value="9.7" style="width: 140px;">
            </div>
            <div class="form-group" style="margin-top: 14px;">
              <label class="form-label">Reporting Officer Evaluation Remarks</label>
              <textarea class="form-control" id="apar-reporting-remarks">Exceptional officer with deep technical cybersecurity expertise and unmatched civil-military coordination in DMA.</textarea>
            </div>
            <button class="btn btn-success" id="btn-submit-apar-reporting" style="margin-top: 14px;">
              Submit Reporting Grading & Forward to Lieutenant General N.S. Raja Subramani (Reviewing Officer)
            </button>
          </div>
        </div>
      `;

      const aparBtn = contentArea.querySelector('#btn-submit-apar-reporting');
      if (aparBtn) {
        aparBtn.addEventListener('click', () => {
          const score = parseFloat(contentArea.querySelector('#apar-score-input').value) || 9.7;
          const rem = contentArea.querySelector('#apar-reporting-remarks').value;

          store.set(curr => {
            const updated = [...curr.apar.cycles];
            updated[1] = {
              ...updated[1],
              status: 'WITH_REVIEWING_OFFICER',
              currentStage: 'Pending with Reviewing Officer (Lieutenant General N.S. Raja Subramani, CDS DMA)',
              reportingScore: score,
              reportingRemarks: rem
            };
            return {
              ...curr,
              apar: { ...curr.apar, cycles: updated }
            };
          });

          alert("Reporting Officer Appraisal recorded and forwarded to Reviewing Officer (Lieutenant General N.S. Raja Subramani, Chief of Defence Staff)!");
          renderApprovals(container);
        });
      }
    }

    // Attach Approve Buttons
    contentArea.querySelectorAll('.btn-approve-leave').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = state.leaveApplications.find(l => l.id === id);
        currentActionItem = { type: 'LEAVE', item: target };
        esignSummary.innerHTML = `
          <strong>Sanction of ${target.typeName} (${target.type})</strong><br>
          Applicant: ${user.name} (${user.designation}, DMA)<br>
          Employee ID: ${user.empId} &bull; PRAN: ${user.pran}<br>
          Leave Period: ${target.startDate} to ${target.endDate} (${target.days} days)<br>
          Forwarding Recommendation: Certified by ${user.controllingOfficer.name}, DS (Estt)
        `;
        esignModal.classList.add('show');
      });
    });

    contentArea.querySelectorAll('.btn-reject-leave').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const reason = prompt("Enter administrative reason for returning application to applicant:");
        if (reason) {
          store.set(curr => ({
            ...curr,
            leaveApplications: curr.leaveApplications.map(l => l.id === id ? { ...l, status: 'REJECTED', reason: `${l.reason} [Returned by Shri Anil Kumar Chhapolia: ${reason}]` } : l),
            notifications: [
              {
                id: Date.now(),
                title: 'Leave Application Returned',
                message: `Leave application ${id} returned by Shri Anil Kumar Chhapolia with note: ${reason}`,
                type: 'warning',
                timestamp: 'Just now'
              },
              ...curr.notifications
            ]
          }));
          alert(`Leave application ${id} returned to ${user.name}.`);
          renderApprovals(container);
        }
      });
    });

    contentArea.querySelectorAll('.btn-approve-tour').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = state.tours.find(t => t.id === id);
        currentActionItem = { type: 'TOUR', item: target };
        esignSummary.innerHTML = `
          <strong>Sanction of Official Tour & TA Advance</strong><br>
          Applicant: ${user.name} (${user.designation}, DMA)<br>
          Sector: ${target.origin} to ${target.destination}<br>
          Advance Amount: ₹${target.advanceRequested.toLocaleString('en-IN')}
        `;
        esignModal.classList.add('show');
      });
    });

    contentArea.querySelectorAll('.btn-approve-claim').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = state.claims.find(c => c.id === id);
        currentActionItem = { type: 'CLAIM', item: target };
        esignSummary.innerHTML = `
          <strong>Sanction of ${target.category}</strong><br>
          Claimant: ${user.name} (${user.designation})<br>
          Amount Sanctioned: ₹${target.amountClaimed.toLocaleString('en-IN')}
        `;
        esignModal.classList.add('show');
      });
    });
  }

  // Bind Tab clicks
  if (tabNav) {
    tabNav.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabNav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCategory(btn.dataset.tab);
      });
    });
  }

  // e-Sign Modal Handlers
  container.querySelector('#btn-close-esign-modal')?.addEventListener('click', () => esignModal?.classList.remove('show'));
  container.querySelector('#btn-cancel-esign')?.addEventListener('click', () => esignModal?.classList.remove('show'));

  container.querySelector('#btn-confirm-esign')?.addEventListener('click', () => {
    const otp = container.querySelector('#esign-otp').value;
    if (otp !== '123456') {
      alert("Invalid OTP! Please enter 123456 for demo authentication.");
      return;
    }
    
    // Read the custom approval date selector
    const dateInput = container.querySelector('#esign-approval-date');
    const selectedDateStr = (dateInput && dateInput.value) ? dateInput.value : new Date().toISOString().split('T')[0];

    if (currentActionItem.type === 'LEAVE') {
      const target = currentActionItem.item;
      const orderNo = `MoD/DMA/Estt-I/LV/2026/${Math.floor(100 + Math.random() * 900)}`;

      store.set(curr => {
        // Deduct balance
        const balances = { ...curr.leaveBalances };
        if (balances[target.type]) {
          balances[target.type].availed += target.days;
          balances[target.type].balance = Math.max(0, balances[target.type].balance - target.days);
        }

        // Use the selected date instead of today
        const actionDate = new Date(selectedDateStr);
        const actionIso = selectedDateStr;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const actionFormatted = `${String(actionDate.getDate()).padStart(2, '0')}-${months[actionDate.getMonth()]}-${actionDate.getFullYear()}`;
        
        // Use current time for the time part
        const now = new Date();
        const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const updatedApps = curr.leaveApplications.map(l => {
          if (l.id === target.id) {
            return {
              ...l,
              status: 'SANCTIONED',
              approvedBy: 'Shri Anil Kumar Chhapolia (Joint Secretary - Estt & Coord, DMA)',
              approvedOn: actionIso,
              sanctionOrderNo: orderNo,
              workflowRoute: [
                ...(l.workflowRoute || []),
                { role: 'Sanctioning Authority', officer: 'Shri Anil Kumar Chhapolia (Joint Secretary, DMA)', action: 'Sanctioned via Aadhaar e-Sign', date: `${actionFormatted} ${timeFormatted}` }
              ]
            };
          }
          return l;
        });

        return {
          ...curr,
          leaveBalances: balances,
          leaveApplications: updatedApps,
          notifications: [
            {
              id: Date.now(),
              title: 'Leave Application Sanctioned',
              message: `Your ${target.typeName} (${target.days} days) has been SANCTIONED by Shri Anil Kumar Chhapolia under Order No. ${orderNo}.`,
              type: 'success',
              timestamp: 'Just now'
            },
            ...curr.notifications
          ]
        };
      });

      esignModal.classList.remove('show');
      alert(`Leave Application ${target.id} SANCTIONED!\n\nSanction Order No: ${orderNo}\nDigitally signed by Shri Anil Kumar Chhapolia, Joint Secretary (DMA).\nLeave balance deducted in real-time.\nNotification dispatched to ${user.name}.`);
      renderApprovals(container);

    } else if (currentActionItem.type === 'TOUR') {
      const target = currentActionItem.item;
      const orderNo = `MoD/DMA/Tour/2026/${Math.floor(100 + Math.random() * 900)}`;

      store.set(curr => ({
        ...curr,
        tours: curr.tours.map(t => t.id === target.id ? { ...t, status: 'APPROVED', sanctionOrder: orderNo } : t),
        notifications: [
          {
            id: Date.now(),
            title: 'Tour Advance Sanctioned',
            message: `Tour to ${target.destination} advance (₹${target.advanceRequested}) sanctioned by Shri Anil Kumar Chhapolia. Forwarded to DDO.`,
            type: 'success',
            timestamp: 'Just now'
          },
          ...curr.notifications
        ]
      }));

      esignModal.classList.remove('show');
      alert(`Tour Requisition ${target.id} Approved!\n\nSanction Order: ${orderNo}\nForwarded to DDO Shri Pradeep Kumar for advance disbursement.`);
      renderApprovals(container);

    } else if (currentActionItem.type === 'CLAIM') {
      const target = currentActionItem.item;

      store.set(curr => ({
        ...curr,
        claims: curr.claims.map(c => c.id === target.id ? { ...c, status: 'APPROVED' } : c),
        notifications: [
          {
            id: Date.now(),
            title: 'Claim Approved',
            message: `${target.category} (₹${target.amountClaimed}) approved by Joint Secretary (DMA). Forwarded to DDO Cash Section.`,
            type: 'success',
            timestamp: 'Just now'
          },
          ...curr.notifications
        ]
      }));

      esignModal.classList.remove('show');
      alert(`Claim ${target.id} Approved and forwarded to DDO Shri Pradeep Kumar for electronic credit.`);
      renderApprovals(container);
    }
  });

  // Initial render of first tab
  renderCategory('leaves');
}
