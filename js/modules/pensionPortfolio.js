/**
 * e-HRMS 2.0 - NPS PRAN Pension Wealth & CRA Protean Ledger Module
 * Government of India - Ministry of Defence / Department of Military Affairs
 */

import { store } from '../state.js';
import { downloadPranStatement } from '../downloader.js';

export function renderPensionPortfolio(container) {
  const state = store.get();
  const user = state.currentUser;
  const payroll = state.payroll;
  const pension = state.pensionNps;

  container.innerHTML = `
    <!-- Top Header Strip -->
    <div class="page-title-strip">
      <div>
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: var(--goi-navy); display: flex; align-items: center; gap: 8px;">
          <span>🛡️</span> National Pension System (NPS) &bull; PRAN Portfolio
        </h2>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
          Protean CRA (NSDL) &bull; Pension Fund Regulatory and Development Authority (PFRDA)
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-sm btn-outline" onclick="alert('NSDL Protean CRA real-time NAV statement refreshed.')">
          🔄 Refresh NAV Rates
        </button>
        <button class="btn btn-sm btn-primary" id="btn-download-pran-statement">
          📥 Download Official CRA Statement
        </button>
      </div>
    </div>

    <!-- PRAN Status Bar -->
    <div class="gov-card mb-20" style="background: linear-gradient(135deg, #002B49, #0f172a); color: #ffffff; padding: 18px 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="font-size: 11px; letter-spacing: 1px; color: #fde047; font-weight: 800; text-transform: uppercase;">Permanent Retirement Account Number</div>
          <div style="font-size: 24px; font-weight: 800; letter-spacing: 1.5px; font-family: monospace; margin-top: 2px;">
            ${pension.pran}
          </div>
          <div style="font-size: 11.5px; color: #cbd5e1; margin-top: 4px;">
            Subscriber: <strong>${user.name}</strong> &bull; DDO Reg No: <strong>10501</strong> &bull; PAO: <strong>001488 (MoD)</strong>
          </div>
        </div>
        <div style="text-align: right;">
          <span class="status-badge badge-sanctioned" style="background: #166534; color: #ffffff; border: 1px solid #4ade80;">
            ✓ ${pension.tier1AccountStatus}
          </span>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">
            CRA: ${pension.cra}
          </div>
        </div>
      </div>
    </div>

    <!-- Wealth Metric Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px;">
      <div class="gov-card" style="padding: 16px; border-left: 4px solid #16a34a; background: linear-gradient(135deg, #ffffff, #f0fdf4);">
        <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Total Accumulated Corpus</div>
        <div style="font-size: 24px; font-weight: 800; color: #166534; margin-top: 4px;">
          ₹${pension.totalCorpus.toLocaleString('en-IN')}
        </div>
        <div style="font-size: 11px; color: #15803d; font-weight: 600; margin-top: 4px;">
          Annualized Return: <strong>${pension.overallReturnRate}</strong>
        </div>
      </div>

      <div class="gov-card" style="padding: 16px; border-left: 4px solid var(--goi-navy); background: linear-gradient(135deg, #ffffff, #f0f9ff);">
        <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Monthly Subscriber (10%)</div>
        <div style="font-size: 24px; font-weight: 800; color: var(--goi-navy); margin-top: 4px;">
          ₹${(Math.round((payroll.basicPay + Math.round(payroll.basicPay * payroll.daRate)) * 0.10)).toLocaleString('en-IN')}
        </div>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
          Deducted under 7th CPC Salary
        </div>
      </div>

      <div class="gov-card" style="padding: 16px; border-left: 4px solid #7c3aed; background: linear-gradient(135deg, #ffffff, #f5f3ff);">
        <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Govt Co-Contribution (14%)</div>
        <div style="font-size: 24px; font-weight: 800; color: #6d28d9; margin-top: 4px;">
          ₹${payroll.govtNpsContribution.toLocaleString('en-IN')}
        </div>
        <div style="font-size: 11px; color: #6d28d9; font-weight: 600; margin-top: 4px;">
          Disbursed by MoD DDO 10501
        </div>
      </div>

      <div class="gov-card" style="padding: 16px; border-left: 4px solid #0284c7; background: linear-gradient(135deg, #ffffff, #f8fafc);">
        <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Total Monthly Accrual</div>
        <div style="font-size: 24px; font-weight: 800; color: #0284c7; margin-top: 4px;">
          ₹${((Math.round((payroll.basicPay + Math.round(payroll.basicPay * payroll.daRate)) * 0.10)) + payroll.govtNpsContribution).toLocaleString('en-IN')}
        </div>
        <div style="font-size: 11px; color: #0369a1; font-weight: 600; margin-top: 4px;">
          Credited to Tier-I PRAN Every Month
        </div>
      </div>
    </div>

    <!-- Asset Allocation & Fund Managers Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
      <!-- Asset Allocation -->
      <div class="gov-card">
        <div class="gov-card-header">
          <span class="gov-card-title">📊 Asset Allocation Strategy (Active Choice)</span>
        </div>
        <div class="gov-card-body">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${pension.assetClasses.map(a => `
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; margin-bottom: 4px;">
                  <span>${a.code} &bull; ${a.name}</span>
                  <span style="color: var(--goi-navy);">${a.percentage}%</span>
                </div>
                <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
                  <div style="background: ${a.code === 'Scheme E' ? '#0284c7' : a.code === 'Scheme C' ? '#16a34a' : '#d97706'}; height: 100%; width: ${a.percentage}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Pension Fund Managers -->
      <div class="gov-card">
        <div class="gov-card-header">
          <span class="gov-card-title">🏛️ Pension Fund Managers (PFM)</span>
        </div>
        <div class="gov-card-body">
          <table class="gov-table" style="font-size: 12px;">
            <thead>
              <tr>
                <th>Fund Manager</th>
                <th>Share</th>
                <th>Current NAV</th>
                <th>Units Held</th>
              </tr>
            </thead>
            <tbody>
              ${pension.fundManagers.map(f => `
                <tr>
                  <td><strong>${f.name}</strong></td>
                  <td style="font-weight: 700; color: var(--goi-blue);">${f.share}</td>
                  <td>${f.nav}</td>
                  <td>${f.units}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Registered Nominations Under PFRDA Regulations -->
    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">👨‍👩‍👧 Registered Nominees under PFRDA (Exits &amp; Withdrawals) Regulations, 2015</span>
        <span class="status-badge badge-sanctioned">Verified with Protean CRA</span>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>Nominee Name</th>
              <th>Relationship</th>
              <th>Percentage Share</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${pension.nominations.map(n => `
              <tr>
                <td><strong>${n.nominee}</strong></td>
                <td>${n.relation}</td>
                <td style="font-size: 13px; font-weight: 800; color: #166534;">${n.share}</td>
                <td><span class="status-badge badge-sanctioned">✓ Active Registered Nominee</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach Download Handler
  container.querySelector('#btn-download-pran-statement')?.addEventListener('click', () => {
    downloadPranStatement(user, payroll, pension);
  });
}
