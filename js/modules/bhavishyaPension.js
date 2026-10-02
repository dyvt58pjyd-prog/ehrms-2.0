/**
 * e-HRMS 2.0 - Bhavishya Pension Workflow Tracking Module
 * Tracks the generation of Pension Payment Order (PPO) and post-retirement dues.
 */

import { store } from '../state.js';

export function renderBhavishyaPension(container) {
  const state = store.get();
  const user = state.currentUser;

  // Compute days to retirement
  const dobParts = user.dob.split('-');
  const dobDate = new Date(dobParts[2], new Date(Date.parse(dobParts[1] +" 1, 2012")).getMonth(), dobParts[0]);
  const retirementDate = new Date(dobDate.getFullYear() + 60, dobDate.getMonth(), dobDate.getDate());
  const now = new Date();
  const daysToRetirement = Math.max(0, Math.floor((retirementDate - now) / (1000 * 60 * 60 * 24)));
  const yearsToRetirement = (daysToRetirement / 365).toFixed(1);

  // Define the workflow steps
  const workflowSteps = [
    { step: 1, title: 'Form 5 Submission', desc: 'Submission of Pension Papers by Retiring Employee (8 Months prior)', status: 'COMPLETED', date: '10-Feb-2026' },
    { step: 2, title: 'HOO Verification', desc: 'Head of Office verifies service book and leave records', status: 'COMPLETED', date: '15-Mar-2026' },
    { step: 3, title: 'PAO Processing', desc: 'Pay & Accounts Office calculates pension & gratuity', status: 'ACTIVE', date: 'Pending' },
    { step: 4, title: 'CPAO Authorization', desc: 'Central Pension Accounting Office issues Special Seal Authority', status: 'PENDING', date: '---' },
    { step: 5, title: 'PPO Generation', desc: 'Electronic Pension Payment Order (e-PPO) generated via DigiLocker', status: 'PENDING', date: '---' }
  ];

  container.innerHTML = `
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Bhavishya Workflow</span>
        </div>
        <h1 class="page-heading">
          🎓 Bhavishya Pension Tracking
          <span class="page-heading-hi">/ भविष्य पेंशन ट्रैकिंग</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" onclick="alert('Downloading Pension Calculation Sheet (Provisional)')">
          📄 Download Calculation Sheet
        </button>
      </div>
    </div>

    <!-- Bhavishya Central Tracking Banner -->
    <div class="gov-alert gov-alert-info mb-20" style="border-left: 4px solid #ea580c; background: #fff7ed;">
      <div style="font-size: 24px;">⏳</div>
      <div>
        <strong>Superannuation Status:</strong> You are scheduled to retire on <strong>${user.superannuationDate}</strong> (${yearsToRetirement} years remaining).
        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
          As per DoPPW guidelines, your pension processing workflow has been initiated. Track your e-PPO generation below.
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 20px;">
      <!-- Main Workflow Tracker -->
      <div class="gov-card" style="flex: 2;">
        <div class="gov-card-header">
          <span class="gov-card-title">Pension Payment Order (PPO) Workflow</span>
        </div>
        <div class="gov-card-body">
          <div style="display: flex; flex-direction: column; gap: 0;">
            ${workflowSteps.map((s, idx) => `
              <div style="display: flex; gap: 15px; position: relative; padding-bottom: ${idx === workflowSteps.length - 1 ? '0' : '25px'};">
                ${idx !== workflowSteps.length - 1 ? `<div style="position: absolute; left: 14px; top: 30px; bottom: 0; width: 2px; background: ${s.status === 'COMPLETED' ? '#16a34a' : '#cbd5e1'};"></div>` : ''}
                <div style="width: 30px; height: 30px; border-radius: 50%; background: ${s.status === 'COMPLETED' ? '#16a34a' : s.status === 'ACTIVE' ? '#eab308' : '#e2e8f0'}; display: flex; align-items: center; justify-content: center; color: ${s.status === 'PENDING' ? '#64748b' : '#fff'}; font-weight: bold; flex-shrink: 0; z-index: 1;">
                  ${s.status === 'COMPLETED' ? '✓' : s.step}
                </div>
                <div style="flex: 1; margin-top: 4px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <div style="font-size: 14px; font-weight: 700; color: ${s.status === 'PENDING' ? '#64748b' : 'var(--goi-navy)'};">${s.title}</div>
                      <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${s.desc}</div>
                    </div>
                    <div style="text-align: right;">
                      <span class="status-badge badge-${s.status === 'COMPLETED' ? 'sanctioned' : s.status === 'ACTIVE' ? 'pending' : 'rejected'}" style="${s.status === 'PENDING' ? 'background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1;' : ''}">${s.status}</span>
                      <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${s.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Estimated Dues Side Panel -->
      <div class="gov-card" style="flex: 1;">
        <div class="gov-card-header">
          <span class="gov-card-title">💰 Estimated Dues</span>
        </div>
        <div class="gov-card-body">
          <div class="key-val-grid" style="grid-template-columns: 1fr;">
            <div class="key-val-item">
              <span class="key-val-label">Basic Pension (Proposed)</span>
              <span class="key-val-value" style="color: #15803d; font-weight: 700;">₹35,000 / month</span>
            </div>
            <div class="key-val-item">
              <span class="key-val-label">Commutation of Pension</span>
              <span class="key-val-value">₹14,20,500</span>
            </div>
            <div class="key-val-item">
              <span class="key-val-label">Retirement Gratuity (DCRG)</span>
              <span class="key-val-value">₹20,00,000 (Max Limit)</span>
            </div>
            <div class="key-val-item">
              <span class="key-val-label">Leave Encashment (300 Days EL)</span>
              <span class="key-val-value">₹10,50,000</span>
            </div>
            <div class="key-val-item" style="border-top: 1px dashed #cbd5e1; padding-top: 10px; margin-top: 5px;">
              <span class="key-val-label" style="font-weight: 800; color: var(--goi-navy);">Total Lump Sum Disbursal</span>
              <span class="key-val-value" style="font-size: 18px; font-weight: 800; color: var(--goi-blue);">₹44,70,500</span>
            </div>
          </div>
          <div style="margin-top: 20px; font-size: 11px; color: var(--text-muted); text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px;">
            Figures are purely indicative and subject to final audit by PAO and CPAO.
          </div>
        </div>
      </div>
    </div>
  `;
}
