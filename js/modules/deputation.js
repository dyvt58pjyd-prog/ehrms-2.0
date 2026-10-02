/**
 * Central Staffing Scheme (CSS) Deputation & Training Module
 */
import { store } from '../state.js';

export function renderDeputation(container) {
  const state = store.get();
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
}
