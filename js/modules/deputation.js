/**
 * Central Staffing Scheme (CSS) Deputation & Training Module
 */
import { store } from '../state.js';
import {
  NCB_LOGO_BASE64,
  generateNcbDeputationLetterHtml,
  downloadNcbDeputationLetter,
  printNcbDeputationLetter
} from '../downloader.js';

export function renderDeputation(container) {
  const state = store.get();
  const user = state.currentUser || {};
  const dep = state.ncbDeputationOrder || {};
  const circulars = state.deputationCirculars || [];

  container.innerHTML = `
    <div class="page-title-strip">
      <div class="page-title-left">
        <h1 class="page-heading">
          🎓 Central Staffing Scheme (CSS) & Foreign Training
        </h1>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
          Apply for Deputation, Mandatory Training, and Cadre Clearance
        </div>
      </div>
    </div>

    <!-- Active NCB HQ Deputation Order Card (MHA OrderAdmin Format) -->
    <div id="ncb-deputation-order-section" class="card" style="margin-bottom: 20px; padding: 20px; background: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #1e3a8a;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:14px; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:14px;">
          <img src="${NCB_LOGO_BASE64}" alt="NCB Crest" style="height:56px; width:auto;" />
          <div>
            <div style="font-size:11px; font-weight:700; color:#991b1b; letter-spacing:0.6px; text-transform:uppercase;">Ministry of Home Affairs &bull; Narcotics Control Bureau (NCB HQ)</div>
            <h3 style="margin:2px 0 4px 0; font-size:17px; color:#0f172a;">Deputation &amp; Transfer Office Order &mdash; Assistant Director</h3>
            <div style="font-size:12.5px; color:#475569;">
              <strong>${dep.orderNo || 'No. I-12014/18/2026-Ad.I/NCB'}</strong> &bull; Dated: <strong>${dep.orderDate || '20th November, 2026'}</strong> &bull; Effective w.e.f. <strong>${dep.effectiveDateDot || '20.11.2026'} (F.N.)</strong>
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button id="btn-preview-ncb-dep" class="btn btn-secondary btn-sm" type="button">👁️ Toggle Live Order Sheet</button>
          <button id="btn-print-ncb-dep" class="btn btn-secondary btn-sm" type="button">🖨️ Print / Save PDF</button>
          <button id="btn-download-ncb-dep" class="btn btn-primary btn-sm" type="button">⬇️ Download Order</button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px; font-size:12.5px;">
        <div><span style="color:#64748b;">Transferred From:</span><br/><strong>${dep.parentDept || 'DRDO, Ministry of Defence'}</strong></div>
        <div><span style="color:#64748b;">Transferred To / Post:</span><br/><strong>${dep.postTitle || 'Assistant Director'}, NCB HQ, Delhi</strong></div>
        <div><span style="color:#64748b;">Effective Date &amp; Tenure:</span><br/><strong>20 November 2026</strong> (${dep.tenureYears || 'three years'})</div>
        <div><span style="color:#64748b;">Pay Matrix / Signing Auth:</span><br/><strong>Level 7 (₹70,000)</strong> &bull; ${dep.signingOfficer || 'R. K. Verma'}</div>
      </div>

      <div id="ncb-dep-preview-wrap" style="margin-top:14px; border:1px solid #cbd5e1; border-radius:6px; overflow:hidden; background:#e5e7eb;">
        <iframe id="ncb-dep-iframe" title="NCB Deputation Office Order" style="width:100%; height:640px; border:none; display:block;"></iframe>
      </div>
    </div>

    <!-- Active Applications Status -->
    <div class="card" style="margin-bottom: 20px; padding: 20px; background: #f8fafc; border: 1px solid var(--border-medium); display: flex; align-items: center; justify-content: space-between;">
      <div>
        <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Current Active Application</div>
        <div style="font-size: 16px; font-weight: 800; color: var(--goi-navy); margin-top: 4px;">Foreign Training - Maxwell School (USA)</div>
        <div style="font-size: 13px; color: #b45309; font-weight: 600; margin-top: 4px;">Status: Pending Cadre Clearance (Vigilance)</div>
      </div>
      <button class="btn btn-outline" style="border-color: var(--goi-navy); color: var(--goi-navy);" onclick="alert('Viewing NOC workflow');">
        🔍 Track NOC Status
      </button>
    </div>

    <!-- Live DoPT Circulars -->
    <div class="card">
      <div style="padding: 15px; border-bottom: 1px solid var(--border-light); font-weight: 700; color: var(--goi-navy);">
        📢 Active DoPT & ISTM Circulars
      </div>
      <div style="padding: 20px;">
        <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
          ${circulars.map(c => `
            <div style="padding: 15px; border: 1px solid var(--border-light); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; background: #ffffff;">
              <div>
                <div style="display: flex; gap: 8px; margin-bottom: 6px;">
                  <span style="background: ${c.type === 'Training' ? '#e0f2fe' : '#fef08a'}; color: ${c.type === 'Training' ? '#0369a1' : '#854d0e'}; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 700;">${c.type}</span>
                  <span style="font-size: 11px; font-weight: 700; color: var(--text-muted);">${c.department}</span>
                </div>
                <div style="font-size: 14px; font-weight: 700; color: var(--goi-navy); margin-bottom: 4px;">
                  ${c.title}
                </div>
                <div style="font-size: 12px; color: var(--text-muted);">
                  Reference: ${c.id} &bull; Deadline: <span style="color: #dc2626; font-weight: 600;">${c.deadline}</span>
                </div>
              </div>
              <div>
                <button class="btn btn-primary" style="font-size: 12px; padding: 6px 15px;" onclick="alert('Starting application for \\n${c.title}');">Apply Now</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const iframe = container.querySelector('#ncb-dep-iframe');
  if (iframe) {
    iframe.srcdoc = generateNcbDeputationLetterHtml(user, dep);
  }
  const previewWrap = container.querySelector('#ncb-dep-preview-wrap');
  container.querySelector('#btn-preview-ncb-dep')?.addEventListener('click', () => {
    if (previewWrap) {
      previewWrap.style.display = previewWrap.style.display === 'none' ? 'block' : 'none';
    }
  });
  container.querySelector('#btn-print-ncb-dep')?.addEventListener('click', () => printNcbDeputationLetter(user, dep));
  container.querySelector('#btn-download-ncb-dep')?.addEventListener('click', () => downloadNcbDeputationLetter(user, dep));
}
