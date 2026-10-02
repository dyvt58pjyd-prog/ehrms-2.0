/**
 * e-HRMS 2.0 - SPARROW / APAR Module
 * Department of Personnel & Training (DoPT)
 * Smart Performance Appraisal Report Recording Online Window
 */

import { store } from '../state.js';
import { downloadAparDossier } from '../downloader.js';

export function renderAparSparrow(container) {
  const state = store.get();
  const user = state.currentUser;
  const cycles = state.apar.cycles;

  container.innerHTML = `
    <!-- Top Action Strip -->
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">SPARROW / APAR Module</span>
        </div>
        <h1 class="page-heading">
          🎯 Annual Performance Appraisal Report (APAR)
          <span class="page-heading-hi">/ स्पैरो वार्षिक कार्य निष्पादन मूल्यांकन</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" id="btn-download-apar">
          📥 Download Full APAR Dossier
        </button>
      </div>
    </div>

    <!-- Official Workflow Stages Banner -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="assets/emblem.png" alt="State Emblem of India" style="width: 22px; height: 36px; object-fit: contain;">
          <span class="gov-card-title">SPARROW Statutory Workflow Stages & Timelines (DoPT Calendar)</span>
        </div>
      </div>
      <div class="gov-card-body">
        <div style="display: flex; justify-content: space-between; align-items: center; position: relative; flex-wrap: wrap; gap: 14px;">
          <div style="text-align: center; flex: 1;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--goi-green); color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px; font-weight: bold;">1</div>
            <strong style="font-size: 12px;">Appraisal Generation</strong>
            <div style="font-size: 11px; color: var(--text-muted);">Custodian (31 Mar)</div>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--goi-saffron); color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px; font-weight: bold;">2</div>
            <strong style="font-size: 12px;">Self-Appraisal</strong>
            <div style="font-size: 11px; color: var(--text-muted);">Officer (30 Apr)</div>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: #0284c7; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px; font-weight: bold;">3</div>
            <strong style="font-size: 12px;">Reporting Appraisal</strong>
            <div style="font-size: 11px; color: var(--text-muted);">Reporting Officer (30 Jun)</div>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--goi-navy); color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px; font-weight: bold;">4</div>
            <strong style="font-size: 12px;">Reviewing Grading</strong>
            <div style="font-size: 11px; color: var(--text-muted);">Reviewing Officer (31 Jul)</div>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: #059669; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px; font-weight: bold;">5</div>
            <strong style="font-size: 12px;">Disclosure & Final</strong>
            <div style="font-size: 11px; color: var(--text-muted);">Aadhaar e-Signed</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Appraisal Cycle (FY 2025-2026) -->
    <div class="gov-card mb-20 apar-cycle-card">
      <div class="gov-card-header">
        <span class="gov-card-title">📝 Active Cycle: Financial Year 2025–2026 (SPARROW-GOI-2026-981)</span>
        <span class="status-badge badge-pending">Self-Appraisal Stage</span>
      </div>
      <div class="gov-card-body">
        <div class="key-val-grid mb-20">
          <div class="key-val-item">
            <span class="key-val-label">Reporting Period</span>
            <span class="key-val-value">01/04/2025 to 31/03/2026</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Reporting Officer</span>
            <span class="key-val-value">${user.reportingOfficer.name}</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Reviewing Officer</span>
            <span class="key-val-value">${user.reviewingOfficer.name}</span>
          </div>
          <div class="key-val-item">
            <span class="key-val-label">Submission Deadline</span>
            <span class="key-val-value" style="color: var(--status-danger);">30 April 2026</span>
          </div>
        </div>

        <form id="form-apar-self">
          <div class="form-group mb-20">
            <label class="form-label">
              <strong>Part II: Self-Appraisal - Brief Resume of the Work Done</strong> <span class="req">*</span>
            </label>
            <div class="form-help mb-20">
              Brief resume of the work done by you during the year/period under report, bringing out specific achievements and significant contributions (max 500 words).
            </div>
            <textarea class="form-control" rows="5" id="apar-resume-text" required>${cycles[1].resumeOfWork}</textarea>
          </div>

          <div class="form-group mb-20">
            <label class="form-label"><strong>Constraints / Bottlenecks Faced (if any)</strong></label>
            <textarea class="form-control" rows="3" id="apar-constraints-text" placeholder="Specify any hurdles or resource limitations...">None encountered that impeded core mission delivery.</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button type="button" class="btn btn-outline" onclick="alert('Draft saved to SPARROW database.')">💾 Save Draft</button>
            <button type="submit" class="btn btn-primary">
              🚀 Sign & Submit Self-Appraisal to Reporting Officer
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Historical APAR Dossier Record -->
    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">📜 Finalized APAR Dossier: Financial Year 2024–2025</span>
        <span class="status-badge badge-sanctioned">Completed & Disclosed</span>
      </div>
      <div class="gov-card-body">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div class="score-badge-circle">9.5</div>
            <div>
              <div style="font-size: 18px; font-weight: 800; color: var(--goi-navy);">Overall Numerical Grading: 9.5 / 10.0</div>
              <div style="font-size: 13px; color: var(--status-success); font-weight: 700;">Category: OUTSTANDING (सर्वोत्कृष्ट)</div>
            </div>
          </div>
          <button class="btn btn-sm btn-outline" onclick="window.print()">🖨️ Print Finalized APAR</button>
        </div>

        <div class="gov-alert gov-alert-info">
          <div>
            <strong>Reporting Officer's Assessment (${cycles[0].reportingOfficer}):</strong><br>
            "${cycles[0].reportingRemarks}"
          </div>
        </div>

        <div class="gov-alert gov-alert-success">
          <div>
            <strong>Reviewing Officer's Concurrence (${cycles[0].reviewingOfficer}):</strong><br>
            "${cycles[0].reviewingRemarks}"
          </div>
        </div>

        <div class="gov-table-container">
          <table class="gov-table">
            <thead>
              <tr>
                <th>Appraisal Component</th>
                <th>Weightage (%)</th>
                <th>Reporting Score (1-10)</th>
                <th>Reviewing Score (1-10)</th>
                <th>Weighted Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Assessment of Work Output</strong> (Accomplishment of planned work, quality of output, analytical ability)</td>
                <td>40%</td>
                <td>9.5</td>
                <td>9.6</td>
                <td style="font-weight: 700;">3.84 / 4.0</td>
              </tr>
              <tr>
                <td><strong>Assessment of Personal Attributes</strong> (Sense of responsibility, emotional quotient, leadership, punctuality)</td>
                <td>30%</td>
                <td>9.4</td>
                <td>9.5</td>
                <td style="font-weight: 700;">2.85 / 3.0</td>
              </tr>
              <tr>
                <td><strong>Assessment of Functional Competency</strong> (Knowledge of rules/laws, strategic planning, promptness in disposal)</td>
                <td>30%</td>
                <td>9.3</td>
                <td>9.4</td>
                <td style="font-weight: 700;">2.81 / 3.0</td>
              </tr>
              <tr style="background: #f1f5f9; font-weight: 800;">
                <td colspan="4" style="text-align: right;">Total Composite Numerical Score:</td>
                <td style="color: #15803d; font-size: 15px;">9.50 / 10.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Handle Self-Appraisal Submission
  const selfForm = container.querySelector('#form-apar-self');
  selfForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const resume = container.querySelector('#apar-resume-text').value;

    store.set(curr => {
      const updatedCycles = [...curr.apar.cycles];
      updatedCycles[1] = {
        ...updatedCycles[1],
        status: 'WITH_REPORTING_OFFICER',
        currentStage: 'Pending with Reporting Officer (Smt. Sunita Verma, IAS)',
        selfAppraisalSubmitted: new Date().toISOString().split('T')[0],
        resumeOfWork: resume
      };
      return {
        ...curr,
        apar: {
          ...curr.apar,
          cycles: updatedCycles
        }
      };
    });

    alert("Self-Appraisal successfully submitted via SPARROW 2.0!\n\nAuthenticated with Aadhaar e-Sign token.\nStatus: Forwarded to Reporting Officer (Smt. Sunita Verma, IAS).");
    renderAparSparrow(container);
  });

  const downloadBtn = container.querySelector('#btn-download-apar');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadAparDossier(user, cycles);
    });
  }
}
