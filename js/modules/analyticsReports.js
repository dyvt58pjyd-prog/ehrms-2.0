/**
 * e-HRMS 2.0 - Departmental Analytics, Cadre Reports & Officers Directory Module
 * Narcotics Control Bureau (NCB HQ), Ministry of Home Affairs
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
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">NCB HQ Cadre &amp; Officers Directory</span>
        </div>
        <h1 class="page-heading">
          📊 NCB HQ Administrative Directory &amp; Cadre Analytics (MHA)
          <span class="page-heading-hi">/ स्वापक नियंत्रण ब्यूरो &bull; अधिकारी निर्देशिका एवं संवर्ग सांख्यिकी</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" onclick="window.print()">
          🖨️ Print NCB Directory
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
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">NCB / MHA Sanctioned Strength</div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="gov-card">
          <div class="gov-card-body" style="text-align: center;">
            <div style="font-size: 28px; font-weight: 800; color: var(--goi-green);">1,142</div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Executive &amp; Deputation Cadre</div>
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
          <img src="assets/ncb_logo.png" alt="NCB Crest" style="height: 36px; width: auto; object-fit: contain;">
          <span class="gov-card-title">Narcotics Control Bureau (NCB HQ), MHA &mdash; Hierarchy &amp; Deputation Chain</span>
        </div>
        <span class="badge-tag-gov" style="font-size: 11px;">Official NCB Organogram</span>
      </div>
      <div class="gov-card-body">
        <div style="background: #f8fafc; border: 1px solid var(--border-medium); border-radius: 6px; padding: 18px;">
          <!-- Node 1: DG NCB -->
          <div style="text-align: center; margin-bottom: 12px;">
            <div style="display: inline-block; background: var(--goi-navy); color: #fff; padding: 8px 16px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="font-size: 11px; text-transform: uppercase; color: #facc15;">Director General, Narcotics Control Bureau (NCB HQ)</div>
              <div style="font-size: 14px; font-weight: 800;">Shri N. S. Raja Subramani</div>
              <div style="font-size: 11px; color: #cbd5e1;">West Block No. 1, R.K. Puram, New Delhi - 110066</div>
            </div>
          </div>

          <div style="text-align: center; color: var(--text-muted); font-size: 18px; line-height: 1;">&darr;</div>

          <!-- Node 2: MHA IS-II Oversight -->
          <div style="text-align: center; margin: 8px 0 12px;">
            <div style="display: inline-block; background: #1e3a8a; color: #fff; padding: 7px 14px; border-radius: 6px;">
              <div style="font-size: 10.5px; text-transform: uppercase; color: #93c5fd;">Deputy Director General (Ops &amp; Coord), NCB HQ</div>
              <div style="font-size: 13.5px; font-weight: 700;">Shri Anil Kumar Chhapolia</div>
            </div>
          </div>

          <div style="text-align: center; color: var(--text-muted); font-size: 18px; line-height: 1;">&darr;</div>

          <!-- Section Route Connecting to Anurag -->
          <div style="background: #ecfdf5; border: 2px dashed #059669; border-radius: 6px; padding: 12px; margin-top: 10px;">
            <div style="font-size: 11px; font-weight: 800; color: #047857; text-transform: uppercase; margin-bottom: 8px;">
              🎯 Active Deputation Reporting Chain for Shri Anurag Anil Bawaskar (NCB HQ, New Delhi):
            </div>
            <div style="display: flex; gap: 12px; align-items: center; justify-content: space-around; flex-wrap: wrap;">
              <div style="text-align: center; background: #fff; border: 1px solid #a7f3d0; border-radius: 4px; padding: 6px 14px;">
                <div style="font-size: 10px; font-weight: 700; color: #047857;">ESTABLISHMENT &amp; DEPUTATION ORDER AUTH</div>
                <div style="font-size: 13px; font-weight: 700; color: var(--goi-navy);">Shri R. K. Verma</div>
                <div style="font-size: 11px; color: var(--text-muted);">Deputy Director (Admn.), NCB HQ</div>
              </div>
              <span style="font-size: 18px; color: #059669;">&rarr;</span>
              <div style="text-align: center; background: #fff; border: 1px solid #a7f3d0; border-radius: 4px; padding: 6px 14px;">
                <div style="font-size: 10px; font-weight: 700; color: #047857;">DDO &amp; PAO (NCB), MHA</div>
                <div style="font-size: 13px; font-weight: 700; color: var(--goi-navy);">Shri Pradeep Kumar, SAO</div>
                <div style="font-size: 11px; color: var(--text-muted);">DDO 10501 &bull; PAO (NCB), New Delhi</div>
              </div>
              <span style="font-size: 18px; color: #059669;">&rarr;</span>
              <div style="text-align: center; background: #fef08a; border: 2px solid #ca8a04; border-radius: 4px; padding: 6px 14px;">
                <div style="font-size: 10px; font-weight: 800; color: #854d0e;">CURRENT LOGGED IN OFFICER (ESS)</div>
                <div style="font-size: 13px; font-weight: 800; color: #713f12;">ANURAG ANIL BAWASKAR</div>
                <div style="font-size: 11px; font-weight: 700; color: #854d0e;">Assistant Director (NCB HQ) &bull; Group 'A' Gazetted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Official NCB HQ Officers Directory Table -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="assets/ncb_logo.png" alt="NCB Crest" style="height: 36px; width: auto; object-fit: contain;">
          <span class="gov-card-title">Narcotics Control Bureau (NCB HQ) &bull; Official Officers Directory</span>
        </div>
        <span style="font-size: 12px; color: var(--text-muted);">West Block No. 1, Wing No. 5, R.K. Puram, New Delhi</span>
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
              <tr style="${o.name.includes('R. K. Verma') || o.name.includes('Chhapolia') ? 'background: #f0fdf4;' : ''}">
                <td>
                  <strong>${o.name}</strong>
                  ${o.name.includes('R. K. Verma') ? '<span class="status-badge badge-sanctioned" style="margin-left: 6px;">Your Approver</span>' : ''}
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
