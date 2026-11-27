/**
 * Aadhaar Enabled Biometric Attendance System (AEBAS)
 */
import { store } from '../state.js';

export function renderAEBAS(container) {
  const state = store.get();
  const records = state.aebasRecords || [];
  const stats = state.aebasStats || { avgInTime: '--:--', avgOutTime: '--:--', lateDays: 0, totalWorkingDays: 0 };

  container.innerHTML = `
    <div class="page-title-strip">
      <div class="page-title-left">
        <h1 class="page-heading">
          👆 AEBAS (Aadhaar Enabled Biometric Attendance)
        </h1>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
          National Informatics Centre - Attendance Portal
        </div>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" style="background: #ffffff; font-weight: 600;">
          📥 Download Attendance Report
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px;">
      <div class="card" style="padding: 15px; border-left: 4px solid var(--goi-green);">
        <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average In-Time</div>
        <div style="font-size: 20px; font-weight: 800; color: var(--goi-navy);">${stats.avgInTime}</div>
      </div>
      <div class="card" style="padding: 15px; border-left: 4px solid var(--goi-blue);">
        <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average Out-Time</div>
        <div style="font-size: 20px; font-weight: 800; color: var(--goi-navy);">${stats.avgOutTime}</div>
      </div>
      <div class="card" style="padding: 15px; border-left: 4px solid var(--goi-orange);">
        <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Late Days (This Month)</div>
        <div style="font-size: 20px; font-weight: 800; color: var(--goi-navy);">${stats.lateDays}</div>
      </div>
      <div class="card" style="padding: 15px; border-left: 4px solid var(--goi-navy);">
        <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Working Days Logged</div>
        <div style="font-size: 20px; font-weight: 800; color: var(--goi-navy);">${stats.totalWorkingDays}</div>
      </div>
    </div>

    <!-- Attendance Log Table -->
    <div class="card">
      <div style="padding: 15px; border-bottom: 1px solid var(--border-light); font-weight: 700; color: var(--goi-navy); display: flex; justify-content: space-between; align-items: center;">
        <span>📅 Recent Punch Logs</span>
        <span style="font-size: 12px; font-weight: normal; color: var(--text-muted);">September 2026</span>
      </div>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid var(--border-light);">
              <th style="padding: 12px 15px; text-align: left; color: var(--text-muted);">Date</th>
              <th style="padding: 12px 15px; text-align: left; color: var(--text-muted);">In-Time</th>
              <th style="padding: 12px 15px; text-align: left; color: var(--text-muted);">Out-Time</th>
              <th style="padding: 12px 15px; text-align: left; color: var(--text-muted);">Status</th>
              <th style="padding: 12px 15px; text-align: left; color: var(--text-muted);">Device Location</th>
            </tr>
          </thead>
          <tbody>
            ${records.map(r => `
              <tr style="border-bottom: 1px solid var(--border-light);">
                <td style="padding: 12px 15px; font-weight: 600;">${r.date}</td>
                <td style="padding: 12px 15px; font-weight: ${r.inTime !== '--:--' ? '700' : 'normal'}; color: ${r.inTime !== '--:--' ? 'var(--goi-navy)' : '#94a3b8'};">${r.inTime}</td>
                <td style="padding: 12px 15px; font-weight: ${r.outTime !== '--:--' ? '700' : 'normal'}; color: ${r.outTime !== '--:--' ? 'var(--goi-navy)' : '#94a3b8'};">${r.outTime}</td>
                <td style="padding: 12px 15px;">
                  ${r.status === 'Present' ? '<span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;">Present</span>' : ''}
                  ${r.status === 'Late' ? '<span style="background: #ffedd5; color: #9a3412; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;">Late Arrival</span>' : ''}
                  ${r.status === 'Sunday' || r.status === 'Saturday' ? '<span style="background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;">Weekend</span>' : ''}
                </td>
                <td style="padding: 12px 15px; color: var(--text-muted); font-size: 12px;">${r.location}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
