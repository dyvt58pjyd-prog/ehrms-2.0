/**
 * e-HRMS 2.0 - Leave Management System (LMS) Module
 * Department of Military Affairs, Ministry of Defence
 * Central Civil Services (Leave) Rules, 1972
 */

import { store } from '../state.js';
import { downloadLeaveOrder } from '../downloader.js?v=2';

export function renderLeaveManagement(container) {
  const state = store.get();
  const balances = state.leaveBalances;
  const applications = state.leaveApplications;
  const user = state.currentUser;

  container.innerHTML = `
    <!-- Top Action Strip -->
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Leave Management System (LMS)</span>
        </div>
        <h1 class="page-heading">
          🌴 Leave Management & Ledger
          <span class="page-heading-hi">/ अवकाश प्रबंधन एवं अनुमोदन प्रणाली (CCS Leave Rules, 1972)</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" id="btn-open-leave-modal">
          ✍️ Apply for Leave / स्टेशन अनुमति
        </button>
      </div>
    </div>

    <!-- Live Leave Balances Cards -->
    <div class="leave-balance-grid mb-20">
      <div class="leave-metric-card cl">
        <div class="leave-code">Casual Leave (CL)</div>
        <div class="leave-val">${balances.CL.balance}</div>
        <div class="leave-name">Availed: ${balances.CL.availed} / ${balances.CL.credited}</div>
      </div>
      <div class="leave-metric-card rh">
        <div class="leave-code">Restricted Holiday (RH)</div>
        <div class="leave-val">${balances.RH.balance}</div>
        <div class="leave-name">Availed: ${balances.RH.availed} / ${balances.RH.credited}</div>
      </div>
      <div class="leave-metric-card el">
        <div class="leave-code">Earned Leave (EL)</div>
        <div class="leave-val">${balances.EL.balance}</div>
        <div class="leave-name">Max Cap: 300 Days</div>
      </div>
      <div class="leave-metric-card hpl">
        <div class="leave-code">Half Pay Leave (HPL)</div>
        <div class="leave-val">${balances.HPL.balance}</div>
        <div class="leave-name">Accumulated: ${balances.HPL.opening + balances.HPL.credited}</div>
      </div>
      <div class="leave-metric-card">
        <div class="leave-code">Commuted Leave</div>
        <div class="leave-val">${balances.COMMUTED.balance}</div>
        <div class="leave-name">On Medical Cert.</div>
      </div>
    </div>

    <!-- Departmental Administrative Workflow Strip -->
    <div class="gov-card mb-20" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid var(--goi-navy);">
      <div class="gov-card-body" style="padding: 14px 18px;">
        <div style="font-size: 11.5px; font-weight: 800; text-transform: uppercase; color: var(--goi-navy); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <img src="assets/emblem.png" alt="State Emblem of India" style="width: 22px; height: 36px; object-fit: contain;">
          <span>Department of Military Affairs &bull; Official Leave Processing &amp; Approval Hierarchy</span>
        </div>
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; font-size: 12.5px;">
          <div style="background: #ffffff; border: 1px solid var(--border-medium); border-radius: 4px; padding: 6px 12px; display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 14px;">👤</span>
            <div><strong>Level 1: Applicant</strong><br><span style="font-size: 11px; color: var(--text-muted);">${user.name} (ASO-I)</span></div>
          </div>
          <span style="color: var(--text-muted); font-size: 16px;">➔</span>
          <div style="background: #ffffff; border: 1px solid var(--border-medium); border-radius: 4px; padding: 6px 12px; display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 14px;">📑</span>
            <div><strong>Level 2: Branch Scrutiny</strong><br><span style="font-size: 11px; color: var(--text-muted);">${user.controllingOfficer.name} (DS Estt)</span></div>
          </div>
          <span style="color: var(--text-muted); font-size: 16px;">➔</span>
          <div style="background: #ffffff; border: 1px solid var(--goi-navy); border-radius: 4px; padding: 6px 12px; display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 14px;">⚖️</span>
            <div><strong>Level 3: Sanctioning Authority</strong><br><span style="font-size: 11px; color: var(--goi-navy); font-weight: 600;">${user.reportingOfficer.name} (Joint Secretary, DMA)</span></div>
          </div>
          <span style="color: var(--text-muted); font-size: 16px;">➔</span>
          <div style="background: #ffffff; border: 1px solid var(--border-medium); border-radius: 4px; padding: 6px 12px; display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 14px;">💳</span>
            <div><strong>Level 4: DDO Notification</strong><br><span style="font-size: 11px; color: var(--text-muted);">${user.disbursingOfficer.name} (DDO Cash)</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Leave Application History Table -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <span class="gov-card-title">📜 Leave Applications Ledger & Multi-Stage Workflow Audit</span>
        <span style="font-size: 12px; color: var(--text-muted);">Calendar Year 2026 &bull; Cadre: ${user.cadre}</span>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Leave Type</th>
              <th>Period (From - To)</th>
              <th>Days</th>
              <th>Station Leave</th>
              <th>Reason & Purpose</th>
              <th>Workflow Route & Current Custody</th>
              <th>Status & Order</th>
            </tr>
          </thead>
          <tbody>
            ${applications.map(app => `
              <tr>
                <td style="font-weight: 700; color: var(--goi-blue);">
                  ${app.id}
                  <div style="font-size: 10.5px; color: var(--text-muted); font-weight: normal; margin-top: 2px;">
                    Applied: ${app.appliedOn}
                  </div>
                </td>
                <td><strong>${app.typeName}</strong> (${app.type})</td>
                <td>${app.startDate} to ${app.endDate}</td>
                <td style="text-align: center; font-weight: 700;">${app.days}</td>
                <td>
                  ${app.stationLeave ? `
                    <span class="status-badge badge-sanctioned" title="Outstation Address: ${app.stationLeaveAddress || 'Nashik, Maharashtra'}">Permission Granted</span>
                  ` : `
                    <span style="color: var(--text-muted); font-size: 12px;">Headquarters (Delhi)</span>
                  `}
                </td>
                <td style="max-width: 180px; font-size: 12px;">${app.reason}</td>
                <td>
                  ${app.status === 'SANCTIONED' ? `
                    <div style="font-size: 11.5px; color: #166534; font-weight: 600;">
                      ✅ Sanctioned by ${app.approvedBy || user.reportingOfficer.name}
                    </div>
                    <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 2px;">
                      Route: ASO-I ➔ DS (Estt) ➔ Joint Secretary (DMA)
                    </div>
                  ` : app.status === 'PENDING' ? `
                    <div style="font-size: 11.5px; color: #b45309; font-weight: 700;">
                      ⏳ With ${user.reportingOfficer.name} (Joint Secretary, DMA)
                    </div>
                    <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 2px;">
                      Recommended by ${user.controllingOfficer.name} (DS Estt)
                    </div>
                  ` : `
                    <span class="status-badge badge-rejected">${app.status}</span>
                  `}
                </td>
                <td style="font-size: 11.5px;">
                  ${app.status === 'SANCTIONED' ? `
                    <strong style="color: var(--goi-navy);">${app.sanctionOrderNo || 'MoD/DMA/Estt-I/LV/2026/412'}</strong><br>
                    <button class="btn btn-outline btn-xs btn-download-leave" data-id="${app.id}" style="margin-top: 4px; padding: 3px 8px; font-size: 11px; cursor: pointer; border-radius: 4px; border: 1px solid var(--goi-blue); color: var(--goi-blue);">
                      📥 Download Order
                    </button>
                  ` : `
                    <span class="status-badge badge-pending">Action Awaiting</span>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- CCS Leave Rules Quick Reference Guide -->
    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">ℹ️ Statutory Provisions (Central Civil Services Leave Rules, 1972)</span>
      </div>
      <div class="gov-card-body" style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.6;">
        <ul style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px;">
          <li><strong>Earned Leave (EL):</strong> Credited in advance in two installments of 15 days each on 1st January and 1st July. Max accumulation permitted is 300 days.</li>
          <li><strong>Casual Leave (CL):</strong> 8 days in a calendar year for administrative offices in DMA. Cannot be combined with EL, HPL or joining time.</li>
          <li><strong>Station Leave:</strong> Prior permission of the Joint Secretary (Establishment & Coordination) is mandatory before leaving headquarters during weekends/holidays.</li>
          <li><strong>Sanctioning Workflow:</strong> ASO-I applications are scrutinized by Under Secretary (Estt-I) and sanctioned by Joint Secretary (Establishment & Coordination), DMA with Aadhaar e-Sign.</li>
        </ul>
      </div>
    </div>

    <!-- Apply Leave Modal -->
    <div class="modal-backdrop" id="leave-modal">
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-title">
            <span>✍️ Apply for Leave (MoD / DMA Form 1)</span>
          </div>
          <button class="modal-close" id="btn-close-leave-modal">&times;</button>
        </div>
        <form id="form-apply-leave">
          <div class="modal-body">
            <!-- Official Hierarchy Route Banner -->
            <div style="background: #f1f5f9; border: 1px solid var(--border-medium); border-radius: 6px; padding: 12px; margin-bottom: 16px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--goi-navy); margin-bottom: 4px;">
                🏛️ Administrative Approval Route (Department of Military Affairs)
              </div>
              <div style="font-size: 12px; color: var(--text-primary);">
                <strong>Applicant:</strong> ${user.name} (ASO-I) &rarr;
                <strong>Scrutiny:</strong> ${user.controllingOfficer.name} (DS Estt) &rarr;
                <strong>Sanctioning Officer:</strong> ${user.reportingOfficer.name} (Joint Secretary, DMA)
              </div>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Nature of Leave <span class="req">*</span></label>
                <select class="form-control" id="leave-type-select" required>
                  <option value="CL">Casual Leave (CL) - Balance: ${balances.CL.balance} days</option>
                  <option value="RH">Restricted Holiday (RH) - Balance: ${balances.RH.balance} days</option>
                  <option value="EL">Earned Leave (EL) - Balance: ${balances.EL.balance} days</option>
                  <option value="HPL">Half Pay Leave (HPL) - Balance: ${balances.HPL.balance} days</option>
                  <option value="COMMUTED">Commuted Leave (Medical Certificate)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Sanctioning Authority (Joint Secretary, DMA)</label>
                <input type="text" class="form-control" value="${user.reportingOfficer.name}, ${user.reportingOfficer.designation}" readonly>
              </div>

              <div class="form-group">
                <label class="form-label">From (Date & Time) <span class="req">*</span></label>
                <input type="datetime-local" class="form-control" id="leave-from-date" value="2026-09-21T09:00" required>
              </div>

              <div class="form-group">
                <label class="form-label">To (Date & Time) <span class="req">*</span></label>
                <input type="datetime-local" class="form-control" id="leave-to-date" value="2026-09-21T13:00" required>
              </div>

              <div class="form-group">
                <label class="form-label">Calculated Days</label>
                <input type="number" step="0.5" class="form-control" id="leave-days-count" value="0.5" readonly style="font-weight: bold; background: #e0f2fe;">
              </div>

              <div class="form-group">
                <label class="form-label">Forwarding Branch Officer</label>
                <input type="text" class="form-control" value="${user.controllingOfficer.name}, Under Secretary (Estt-I)" readonly>
              </div>

              <div class="form-group full-width">
                <label class="form-label" style="display:flex; justify-content:space-between; align-items:center;">
                  <span>Reason for Leave <span class="req">*</span></span>
                  <button type="button" class="btn btn-outline btn-xs" id="btn-ai-draft-leave" style="font-size: 10.5px; padding: 2px 8px; border-color: #8b5cf6; color: #6d28d9; font-weight: 700; background: #f5f3ff;">
                    🤖 Draft with Titan AI
                  </button>
                </label>
                <textarea class="form-control" id="leave-reason" placeholder="State specific reason for leave application..." required>Personal domestic commitment and family visit</textarea>
              </div>

              <!-- Medical Certificate Section -->
              <div class="form-group full-width" id="medical-cert-section" style="display: none; background: #fff1f2; padding: 12px; border: 1px dashed #fca5a5; border-radius: 4px;">
                <label class="form-label" style="color: #991b1b; font-weight: 700;">Attach Medical Certificate (Required for Commuted / Sick Leave)</label>
                <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png">
                <div style="font-size: 11px; color: #b91c1c; margin-top: 4px;">As per Rule 19 of CCS (Leave) Rules, 1972, medical certificate from CGHS/AMA is mandatory.</div>
              </div>

              <div class="form-group full-width" style="background: #f8fafc; padding: 12px; border: 1px solid var(--border-light); border-radius: 4px;">
                <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;">
                  <input type="checkbox" id="check-station-leave" checked>
                  Permission required to leave Headquarters (Station Leave)
                </label>
                <div id="station-leave-details" style="margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <div>
                    <label class="form-label">Outstation Address During Leave</label>
                    <input type="text" class="form-control" id="station-address" value="Bawaskar Niwas, Ramdaspeth, Nashik (Maharashtra)">
                  </div>
                  <div>
                    <label class="form-label">Emergency Contact Telephone</label>
                    <input type="tel" class="form-control" id="station-phone" value="+91 9822453218">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-leave-modal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="btn-submit-leave">
              🚀 Submit Application to Shri Anil Kumar Chhapolia
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Attach modal handlers
  const modal = container.querySelector('#leave-modal');
  const openBtn = container.querySelector('#btn-open-leave-modal');
  const closeBtn = container.querySelector('#btn-close-leave-modal');
  const cancelBtn = container.querySelector('#btn-cancel-leave-modal');
  const form = container.querySelector('#form-apply-leave');

  const fromDateInput = container.querySelector('#leave-from-date');
  const toDateInput = container.querySelector('#leave-to-date');
  const daysCountInput = container.querySelector('#leave-days-count');

  function calculateDays() {
    const f = new Date(fromDateInput.value);
    const t = new Date(toDateInput.value);
    if (!isNaN(f) && !isNaN(t) && t >= f) {
      const diffTime = Math.abs(t - f);
      // Convert ms to days
      let diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      // If span crosses multiple days, assume standard 8-hour workday bounds
      // To keep it simple and authentic, we round to nearest 0.5 days.
      // If time diff is very small, minimum is 0.5 days.
      let calculated = Math.round(diffDays * 2) / 2;
      
      // If they select the exact same day but a few hours apart (e.g. 09:00 to 13:00), it's 0.5.
      // If they select 09:00 to 17:30 same day, it's 1 day.
      if (calculated === 0 && diffTime > 0) calculated = 0.5;
      
      daysCountInput.value = Math.max(0.5, calculated);
    } else {
      daysCountInput.value = 0.5;
    }
  }

  fromDateInput.addEventListener('change', calculateDays);
  toDateInput.addEventListener('change', calculateDays);

  openBtn.addEventListener('click', () => modal.classList.add('show'));
  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('show'));

  // Station leave toggle
  const stationCheck = container.querySelector('#check-station-leave');
  const stationDetails = container.querySelector('#station-leave-details');
  stationCheck.addEventListener('change', () => {
    stationDetails.style.display = stationCheck.checked ? 'grid' : 'none';
  });

  // Leave type change (Toggle medical cert)
  const leaveTypeSelect = container.querySelector('#leave-type-select');
  const medicalSection = container.querySelector('#medical-cert-section');
  if (leaveTypeSelect && medicalSection) {
    leaveTypeSelect.addEventListener('change', () => {
      if (leaveTypeSelect.value === 'COMMUTED') {
        medicalSection.style.display = 'block';
      } else {
        medicalSection.style.display = 'none';
      }
    });
  }

  // Titan AI Draft Leave Reason
  const btnAiDraft = container.querySelector('#btn-ai-draft-leave');
  const reasonInput = container.querySelector('#leave-reason');
  if (btnAiDraft && reasonInput) {
    btnAiDraft.addEventListener('click', async () => {
      const type = leaveTypeSelect ? leaveTypeSelect.value : 'CL';
      const fDate = fromDateInput.value;
      
      btnAiDraft.innerHTML = '⏳ Drafting...';
      btnAiDraft.disabled = true;

      try {
        const apiKey = localStorage.getItem('gemini_api_key') || 'AIzaSyDmuGktyOTVGfBdka1vp73hlU2HSxIgN44';
        const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            contents: [{
              parts: [{ text: "Draft a brief, formal, one-sentence reason for taking " + type + " leave starting " + fDate + " for an Indian government official. Do not include greetings or signatures." }]
            }]
          })
        });
        
        const data = await res.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          reasonInput.value = data.candidates[0].content.parts[0].text.trim().replace(/^"|"$/g, '');
        }
      } catch (e) {
        alert('Could not connect to Titan AI for drafting.');
      }
      
      btnAiDraft.innerHTML = '🤖 Draft with Titan AI';
      btnAiDraft.disabled = false;
    });
  }

  // Handle leave submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = container.querySelector('#leave-type-select').value;
    const fromDate = fromDateInput.value;
    const toDate = toDateInput.value;
    const days = parseFloat(daysCountInput.value) || 0.5;
    const reason = container.querySelector('#leave-reason').value;
    const isStation = stationCheck.checked;
    const stationAddr = container.querySelector('#station-address').value;
    const stationTel = container.querySelector('#station-phone').value;

    const now = new Date();
    const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const todayFormatted = `${String(now.getDate()).padStart(2, '0')}-${months[now.getMonth()]}-${now.getFullYear()}`;
    const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Format the selected datetime-local values for display
    const formatDateTime = (dtStr) => {
      const d = new Date(dtStr);
      if (isNaN(d)) return dtStr;
      return `${String(d.getDate()).padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    };

    const newApp = {
      id: `LV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      type: type,
      typeName: type === 'EL' ? 'Earned Leave' : type === 'CL' ? 'Casual Leave' : type === 'RH' ? 'Restricted Holiday' : 'Half Pay Leave',
      startDate: formatDateTime(fromDate),
      endDate: formatDateTime(toDate),
      days: days,
      reason: reason,
      stationLeave: isStation,
      stationLeaveAddress: isStation ? stationAddr : '',
      emergencyContact: isStation ? stationTel : '',
      status: 'PENDING',
      appliedOn: todayIso,
      approvedBy: null,
      approvedOn: null,
      sanctionOrderNo: null,
      workflowRoute: [
        { role: 'Applicant', officer: `${user.name} (ASO-I)`, action: 'Application Submitted', date: `${todayFormatted} ${timeFormatted}` },
        { role: 'Branch Officer', officer: `${user.controllingOfficer.name} (DS Estt)`, action: 'Forwarded for Sanction', date: `${todayFormatted} ${timeFormatted}` },
        { role: 'Sanctioning Authority', officer: `${user.reportingOfficer.name} (Joint Secretary, DMA)`, action: 'Pending Action', date: 'Pending' }
      ]
    };

    store.set(curr => {
      const updatedBalances = JSON.parse(JSON.stringify(curr.leaveBalances));
      if (updatedBalances[type]) {
        updatedBalances[type].balance -= days;
        if (updatedBalances[type].availed !== undefined) {
          updatedBalances[type].availed += days;
        }
      }

      return {
        ...curr,
        leaveBalances: updatedBalances,
        leaveApplications: [newApp, ...curr.leaveApplications],
        notifications: [
          {
            id: Date.now(),
            title: 'Leave Application Dispatched',
            message: `Application ${newApp.id} for ${newApp.typeName} (${days} days) submitted on ${todayIso} and forwarded to Shri Anil Kumar Chhapolia, Joint Secretary (DMA).`,
            type: 'info',
            timestamp: 'Just now'
          },
          ...curr.notifications
        ]
      };
    });

    modal.classList.remove('show');
    alert(`Leave application ${newApp.id} submitted successfully on ${todayIso}!\n\nOfficial DMA Workflow Route:\n1. Applicant: ${user.name} (ASO-I)\n2. Forwarded by: ${user.controllingOfficer.name}, Under Secretary (Estt-I)\n3. Pending Sanction with: ${user.reportingOfficer.name}, Joint Secretary (Establishment & Coordination)\n\nTip: You can sign in as Shri Anil Kumar Chhapolia, Joint Secretary (MSS) with user ID anil.chhapolia to review and sanction this application via Aadhaar e-Sign.`);
    renderLeaveManagement(container);
  });

  // Attach Leave Order download handlers
  container.querySelectorAll('.btn-download-leave').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const app = applications.find(a => a.id === btn.dataset.id);
      if (app) {
        downloadLeaveOrder(user, app);
      }
    });
  });
}
