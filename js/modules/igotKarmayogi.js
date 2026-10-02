/**
 * e-HRMS 2.0 - Mission Karmayogi (iGOT Capacity Building & Training) Module
 * Department of Personnel & Training (DoPT) & Ministry of Defence
 * Government of India
 */

import { store } from '../state.js';
import { downloadKarmayogiCertificate } from '../downloader.js';

export function renderIgotKarmayogi(container) {
  const state = store.get();
  const user = state.currentUser;
  const karmayogi = state.karmayogi;
  const courses = karmayogi.courses || [];

  container.innerHTML = `
    <!-- Top Header Strip -->
    <div class="page-title-strip">
      <div>
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: var(--goi-navy); display: flex; align-items: center; gap: 8px;">
          <span>🇮🇳</span> Mission Karmayogi &bull; iGOT Capacity Building Hub
        </h2>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
          National Programme for Civil Services Capacity Building (NPCSCB) &bull; Competency-Based Human Resource Management
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-sm btn-outline" id="btn-browse-karmayogi">
          🔍 Browse Course Repository
        </button>
        <button class="btn btn-sm btn-primary" onclick="alert('iGOT Karmayogi Profile Synced with DoPT Central Repository.')">
          🔄 Sync Competency Score
        </button>
      </div>
    </div>

    <!-- Executive Metrics Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px;">
      <div class="gov-card" style="padding: 16px; border-left: 4px solid var(--goi-navy); background: linear-gradient(135deg, #ffffff, #f0f9ff);">
        <div style="font-size: 11.5px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Total Learning Hours Logged</div>
        <div style="font-size: 24px; font-weight: 800; color: var(--goi-navy); margin-top: 4px;">
          ${karmayogi.totalHours} <span style="font-size: 14px; font-weight: 600; color: #0284c7;">/ 50.0 Hrs</span>
        </div>
        <div style="font-size: 11px; color: #166534; font-weight: 600; margin-top: 4px;">
          ✓ 97% of Annual Mandatory Target Achieved
        </div>
      </div>

      <div class="gov-card" style="padding: 16px; border-left: 4px solid #16a34a; background: linear-gradient(135deg, #ffffff, #f0fdf4);">
        <div style="font-size: 11.5px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">CBS Competency Credits</div>
        <div style="font-size: 24px; font-weight: 800; color: #166534; margin-top: 4px;">
          ${karmayogi.cbsCredits} <span style="font-size: 13px; font-weight: 600; color: var(--text-muted);">Credits</span>
        </div>
        <div style="font-size: 11px; color: #059669; font-weight: 600; margin-top: 4px;">
          Level 4 - Advanced Civil Servant Practitioner
        </div>
      </div>

      <div class="gov-card" style="padding: 16px; border-left: 4px solid #d97706; background: linear-gradient(135deg, #ffffff, #fffbeb);">
        <div style="font-size: 11.5px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Certified Modules</div>
        <div style="font-size: 24px; font-weight: 800; color: #b45309; margin-top: 4px;">
          ${karmayogi.completedCoursesCount} <span style="font-size: 13px; font-weight: 600; color: var(--text-muted);">Completed</span>
        </div>
        <div style="font-size: 11px; color: #d97706; font-weight: 600; margin-top: 4px;">
          100% Pass Rate &bull; Avg Score: 94%
        </div>
      </div>

      <div class="gov-card" style="padding: 16px; border-left: 4px solid #4f46e5; background: linear-gradient(135deg, #ffffff, #eef2ff);">
        <div style="font-size: 11.5px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Cadre Authority Vetting</div>
        <div style="font-size: 15px; font-weight: 800; color: #4338ca; margin-top: 8px;">
          DoPT &bull; DMA Estt-I
        </div>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
          Linked to Annual APAR Appraisal Score
        </div>
      </div>
    </div>

    <!-- Active Courses & Certificates Section -->
    <div class="gov-card mb-20">
      <div class="gov-card-header">
        <span class="gov-card-title">📜 Department of Military Affairs &mdash; Mandatory & Recommended Learning Courses</span>
        <span style="font-size: 12px; color: var(--text-muted);">DoPT / ISTM / MoD Official Modules</span>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>Course ID & Title</th>
              <th>Offering Institution</th>
              <th>Duration</th>
              <th>Credits</th>
              <th>Status / Progress</th>
              <th>Grade / Completion</th>
              <th style="text-align: center;">Certification</th>
            </tr>
          </thead>
          <tbody>
            ${courses.map(c => `
              <tr>
                <td>
                  <strong style="color: var(--goi-navy);">${c.title}</strong><br>
                  <span style="font-size: 11px; color: var(--text-muted);">Module ID: <code>${c.id}</code></span>
                </td>
                <td style="font-size: 12.5px;">${c.provider}</td>
                <td style="font-size: 12px; font-weight: 600;">${c.duration}</td>
                <td style="font-size: 12px; font-weight: 700; color: #166534;">+${c.cbsCredits}</td>
                <td>
                  ${c.status === 'COMPLETED' ? `
                    <span class="status-badge badge-sanctioned">✓ Certified Completed</span>
                  ` : c.status === 'IN_PROGRESS' ? `
                    <div>
                      <span class="status-badge badge-pending">In Progress (${c.progress}%)</span>
                      <div style="background: #e2e8f0; height: 5px; border-radius: 3px; margin-top: 4px; width: 100px; overflow: hidden;">
                        <div style="background: var(--goi-blue); height: 100%; width: ${c.progress}%;"></div>
                      </div>
                    </div>
                  ` : `
                    <span class="status-badge" style="background: #f1f5f9; color: #475569;">Enrolled</span>
                  `}
                </td>
                <td>
                  ${c.status === 'COMPLETED' ? `
                    <strong style="color: #166534;">Grade: ${c.grade} (${c.score})</strong><br>
                    <span style="font-size: 10.5px; color: var(--text-muted);">${c.completedDate}</span>
                  ` : c.status === 'IN_PROGRESS' ? `
                    <button class="btn btn-xs btn-primary btn-resume-course" data-id="${c.id}" style="padding: 3px 8px; font-size: 11px;">
                      ▶ Resume Module
                    </button>
                  ` : `
                    <button class="btn btn-xs btn-outline btn-start-course" data-id="${c.id}" style="padding: 3px 8px; font-size: 11px;">
                      🚀 Start Learning
                    </button>
                  `}
                </td>
                <td style="text-align: center;">
                  ${c.status === 'COMPLETED' ? `
                    <button class="btn btn-outline btn-xs btn-download-cert" data-id="${c.id}" style="padding: 4px 10px; font-size: 11.5px; font-weight: 700; color: #0284c7; border-color: #0284c7;">
                      🏅 Download Certificate
                    </button>
                  ` : `
                    <span style="font-size: 11px; color: var(--text-muted);">Awaiting Completion</span>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mission Karmayogi Guiding Principles Box -->
    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">💡 Mission Karmayogi &bull; 6 Core Pillars for Civil Services Transformation</span>
      </div>
      <div class="gov-card-body" style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.6;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
          <div style="background: #f8fafc; padding: 12px; border-radius: 4px; border: 1px solid var(--border-light);">
            <strong style="color: var(--goi-navy);">1. Rule to Role Transition:</strong> Shift civil services from rule-bound procedures to competency-driven agile roles within the Ministry of Defence.
          </div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 4px; border: 1px solid var(--border-light);">
            <strong style="color: var(--goi-navy);">2. On-Site & Digital Learning:</strong> Continuously upgrade skills in Cyber Assurance, GeM procurement, and Public Financial Management.
          </div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 4px; border: 1px solid var(--border-light);">
            <strong style="color: var(--goi-navy);">3. APAR Appraisal Linkage:</strong> Annual Karmayogi credits are integrated into the SPARROW Appraisal (Part-3) for career progression.
          </div>
        </div>
      </div>
    </div>

    <!-- Browse Courses Modal -->
    <div class="modal-backdrop" id="karmayogi-modal">
      <div class="modal-dialog" style="max-width: 650px;">
        <div class="modal-header">
          <div class="modal-title">
            <span>🎓</span> iGOT Karmayogi &bull; DoPT Course Catalogue
          </div>
          <button class="modal-close" id="btn-close-karmayogi-modal">&times;</button>
        </div>
        <div class="modal-body">
          <p style="font-size: 13px; color: var(--text-secondary); margin-top: 0;">
            Select a specialized competency module recommended by the Cadre Controlling Authority for Group 'A' Officers:
          </p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="padding: 12px; border: 1px solid var(--border-light); border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>Right to Information (RTI Act 2005) &amp; Record Retention</strong><br>
                <span style="font-size: 11px; color: var(--text-muted);">Provider: CIC &bull; 8 Hours &bull; +120 Credits</span>
              </div>
              <button class="btn btn-sm btn-outline" onclick="alert('Enrolled in RTI Act 2005 course! Added to your learning path.')">Enroll</button>
            </div>
            <div style="padding: 12px; border: 1px solid var(--border-light); border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>Artificial Intelligence &amp; Data Analytics in Defence Intelligence</strong><br>
                <span style="font-size: 11px; color: var(--text-muted);">Provider: DRDO / IIT Delhi &bull; 16 Hours &bull; +200 Credits</span>
              </div>
              <button class="btn btn-sm btn-outline" onclick="alert('Enrolled in AI in Defence course! Added to your learning path.')">Enroll</button>
            </div>
            <div style="padding: 12px; border: 1px solid var(--border-light); border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>Stress Resilience &amp; Raja Yoga Meditation for Senior Civil Servants</strong><br>
                <span style="font-size: 11px; color: var(--text-muted);">Provider: Morarji Desai National Institute of Yoga &bull; 6 Hours &bull; +90 Credits</span>
              </div>
              <button class="btn btn-sm btn-outline" onclick="alert('Enrolled in Stress Resilience module! Added to your learning path.')">Enroll</button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" id="btn-cancel-karmayogi-modal">Close</button>
        </div>
      </div>
    </div>
  `;

  // Attach Event Handlers
  const modal = container.querySelector('#karmayogi-modal');
  const openBtn = container.querySelector('#btn-browse-karmayogi');
  const closeBtn = container.querySelector('#btn-close-karmayogi-modal');
  const cancelBtn = container.querySelector('#btn-cancel-karmayogi-modal');

  openBtn?.addEventListener('click', () => modal?.classList.add('show'));
  closeBtn?.addEventListener('click', () => modal?.classList.remove('show'));
  cancelBtn?.addEventListener('click', () => modal?.classList.remove('show'));

  // Attach Certificate download handlers
  container.querySelectorAll('.btn-download-cert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const course = courses.find(c => c.id === btn.dataset.id);
      if (course) {
        downloadKarmayogiCertificate(user, course);
      }
    });
  });

  // Resume / Start course actions
  container.querySelectorAll('.btn-resume-course, .btn-start-course').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const course = courses.find(c => c.id === btn.dataset.id);
      if (course) {
        alert(`Launching interactive learning player for: ${course.title}\n\nProvider: ${course.provider}\nTrack your progress in real-time.`);
      }
    });
  });
}
