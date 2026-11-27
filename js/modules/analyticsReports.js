/**
 * e-HRMS 2.0 - Departmental Analytics, Cadre Reports & Officers Directory Module
 * Department of Military Affairs, Ministry of Defence
 */

import { store } from '../state.js';
import { downloadDirectoryCsv } from '../downloader.js';

export function renderAnalyticsReports(container) {
  const state = store.get();
  const officers = state.dmaOfficersDirectory || [];
  const user = state.currentUser;

  container.innerHTML = `
    <!-- Top Action Strip -->
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">DMA Cadre & Officers Directory</span>
        </div>
        <h1 class="page-heading">
          📊 DMA Administrative Directory & Cadre Analytics
          <span class="page-heading-hi">/ सैन्य कार्य विभाग &bull; अधिकारी निर्देशिका एवं संवर्ग सांख्यिकी</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" onclick="window.print()">
          🖨️ Print DMA Directory
        </button>
        <button class="btn btn-primary" id="btn-export-directory">
          📥 Export Directory (CSV)
        </button>
      </div>
    </div>

    <!-- Top Key Metrics Grid -->
    <div class="dashboard-grid mb-20">
      <div class="col-3">
        <div class="gov-card">
          <div class="gov-card-body" style="text-align: center;">
            <div style="font-size: 28px; font-weight: 800; color: var(--goi-navy);">1,280</div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">DMA Sanctioned Strength</div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="gov-card">
          <div class="gov-card-body" style="text-align: center;">
            <div style="font-size: 28px; font-weight: 800; color: var(--goi-green);">1,142</div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Civil & Military In-Position</div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="gov-card">
          <div class="gov-card-body" style="text-align: center;">
            <div style="font-size: 28px; font-weight: 800; color: #0284c7;">100%</div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Digital e-SB Onboarding</div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="gov-card">
          <div class="gov-card-body" style="text-align: center;">
            <div style="font-size: 28px; font-weight: 800; color: var(--goi-saffron-dark);">98.8%</div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">SPARROW APAR Compliance</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Hierarchy Organogram Card -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="assets/emblem.png" alt="State Emblem of India" style="width: 22px; height: 36px; object-fit: contain;">
          <span class="gov-card-title">Department of Military Affairs - Officer Hierarchy &amp; Workflow Chain</span>
        </div>
        <span class="badge-tag-gov" style="font-size: 11px;">Official Organogram</span>
      </div>
      <div class="gov-card-body">
        <div style="background: #f8fafc; border: 1px solid var(--border-medium); border-radius: 6px; padding: 18px;">
          <!-- Node 1: CDS -->
          <div style="text-align: center; margin-bottom: 12px;">
            <div style="display: inline-block; background: var(--goi-navy); color: #fff; padding: 8px 16px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="font-size: 11px; text-transform: uppercase; color: #facc15;">Secretary, DMA & Chief of Defence Staff (CDS)</div>
              <div style="font-size: 14px; font-weight: 800;">General Anil Chauhan, PVSM, UYSM, AVSM, SM, VSM</div>
              <div style="font-size: 11px; color: #cbd5e1;">South Block, New Delhi</div>
            </div>
          </div>

          <div style="text-align: center; color: var(--text-muted); font-size: 18px; line-height: 1;">&darr;</div>

          <!-- Node 2: Additional Secretary -->
          <div style="text-align: center; margin: 8px 0 12px;">
            <div style="display: inline-block; background: #1e3a8a; color: #fff; padding: 7px 14px; border-radius: 6px;">
              <div style="font-size: 10.5px; text-transform: uppercase; color: #93c5fd;">Additional Secretary (DMA)</div>
              <div style="font-size: 13.5px; font-weight: 700;">Vice Admiral Atul Anand, AVSM, VSM</div>
            </div>
          </div>

          <div style="text-align: center; color: var(--text-muted); font-size: 18px; line-height: 1;">&darr;</div>

          <!-- Node 3: Joint Secretaries Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 8px 0 14px;">
            <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 6px; padding: 8px; text-align: center;">
              <div style="font-size: 10px; font-weight: 700; color: #1d4ed8; text-transform: uppercase;">⭐ Cadre Admin & Reviewing Officer</div>
              <div style="font-size: 12.5px; font-weight: 700; color: var(--goi-navy); margin-top: 2px;">Lieutenant General N.S. Raja Subramani</div>
              <div style="font-size: 11px; color: var(--text-muted);">Joint Secretary (Estt & Coord)</div>
            </div>
            <div style="background: #fff; border: 1px solid var(--border-medium); border-radius: 6px; padding: 8px; text-align: center;">
              <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Works & Parliament</div>
              <div style="font-size: 12.5px; font-weight: 700; color: var(--goi-navy); margin-top: 2px;">Shri Kumar Ravi Kant Singh, IAS</div>
              <div style="font-size: 11px; color: var(--text-muted);">Joint Secretary (Works)</div>
            </div>
            <div style="background: #fff; border: 1px solid var(--border-medium); border-radius: 6px; padding: 8px; text-align: center;">
              <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Army & TA</div>
              <div style="font-size: 12.5px; font-weight: 700; color: var(--goi-navy); margin-top: 2px;">Maj Gen G. S. Choudhry</div>
              <div style="font-size: 11px; color: var(--text-muted);">Joint Secretary (Army)</div>
            </div>
            <div style="background: #fff; border: 1px solid var(--border-medium); border-radius: 6px; padding: 8px; text-align: center;">
              <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Navy & Defence Staff</div>
              <div style="font-size: 12.5px; font-weight: 700; color: var(--goi-navy); margin-top: 2px;">Rear Admiral Kunal Singh Rajkumar</div>
              <div style="font-size: 11px; color: var(--text-muted);">Joint Secretary (Navy)</div>
            </div>
            <div style="background: #fff; border: 1px solid var(--border-medium); border-radius: 6px; padding: 8px; text-align: center;">
              <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Air Force Wing</div>
              <div style="font-size: 12.5px; font-weight: 700; color: var(--goi-navy); margin-top: 2px;">Air Vice Marshal Vikram Gaur</div>
              <div style="font-size: 11px; color: var(--text-muted);">Joint Secretary (Air)</div>
            </div>
          </div>

          <!-- Section Route Connecting to Anurag -->
          <div style="background: #ecfdf5; border: 2px dashed #059669; border-radius: 6px; padding: 12px; margin-top: 10px;">
            <div style="font-size: 11px; font-weight: 800; color: #047857; text-transform: uppercase; margin-bottom: 8px;">
              🎯 Active Administrative Chain for Anurag Anil Bawaskar (Establishment & Joint Staff Branch):
            </div>
            <div style="display: flex; gap: 12px; align-items: center; justify-content: space-around; flex-wrap: wrap;">
              <div style="text-align: center; background: #fff; border: 1px solid #a7f3d0; border-radius: 4px; padding: 6px 14px;">
                <div style="font-size: 10px; font-weight: 700; color: #047857;">SANCTIONING AUTHORITY (MSS)</div>
                <div style="font-size: 13px; font-weight: 700; color: var(--goi-navy);">Shri Anil Kumar Chhapolia</div>
                <div style="font-size: 11px; color: var(--text-muted);">Director (Estt & Joint Staff)</div>
              </div>
              <span style="font-size: 18px; color: #059669;">&rarr;</span>
              <div style="text-align: center; background: #fff; border: 1px solid #a7f3d0; border-radius: 4px; padding: 6px 14px;">
                <div style="font-size: 10px; font-weight: 700; color: #047857;">BRANCH CONTROLLING OFFICER</div>
                <div style="font-size: 13px; font-weight: 700; color: var(--goi-navy);">Shri Rajender Singh</div>
                <div style="font-size: 11px; color: var(--text-muted);">Under Secretary (Estt-I)</div>
              </div>
              <span style="font-size: 18px; color: #059669;">&rarr;</span>
              <div style="text-align: center; background: #fef08a; border: 2px solid #ca8a04; border-radius: 4px; padding: 6px 14px;">
                <div style="font-size: 10px; font-weight: 800; color: #854d0e;">CURRENT LOGGED IN EMPLOYEE (ESS)</div>
                <div style="font-size: 13px; font-weight: 800; color: #713f12;">ANURAG ANIL BAWASKAR</div>
                <div style="font-size: 11px; font-weight: 700; color: #854d0e;">Additional Section Officer - I &bull; Group 'A' (Gazetted)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Official DMA Officers Directory Table -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="assets/emblem.png" alt="State Emblem of India" style="width: 22px; height: 36px; object-fit: contain;">
          <span class="gov-card-title">Department of Military Affairs &bull; Official Officers Directory</span>
        </div>
        <span style="font-size: 12px; color: var(--text-muted);">South Block / Sena Bhawan, New Delhi</span>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>Name of Officer</th>
              <th>Designation & Post</th>
              <th>Wing / Functional Portfolio</th>
              <th>Official Office Location</th>
              <th>Gov Email</th>
              <th>Administrative Role</th>
            </tr>
          </thead>
          <tbody>
            ${officers.map(o => `
              <tr style="${o.name.includes('Devashish') || o.name.includes('Chhapolia') ? 'background: #f0fdf4;' : ''}">
                <td>
                  <strong>${o.name}</strong>
                  ${o.name.includes('Devashish') ? '<span class="status-badge badge-sanctioned" style="margin-left: 6px;">Your Approver</span>' : ''}
                  ${o.name.includes('Chhapolia') ? '<span class="status-badge badge-info" style="margin-left: 6px;">Cadre Admin</span>' : ''}
                </td>
                <td style="font-weight: 600; color: var(--goi-navy);">${o.designation}</td>
                <td>${o.wing}</td>
                <td><span style="font-size: 11.5px; color: var(--text-primary);">📍 ${o.office}</span></td>
                <td><code>${o.email}</code></td>
                <td><span class="status-badge badge-clear">${o.roleType}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  const exportBtn = container.querySelector('#btn-export-directory');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      downloadDirectoryCsv(officers);
    });
  }
}
