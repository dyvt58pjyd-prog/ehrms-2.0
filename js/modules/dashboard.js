/**
 * e-HRMS 2.0 - Role-Adaptive Executive Dashboard Module
 * Department of Military Affairs • Ministry of Defence
 * Department of Personnel & Training (DoPT), Government of India
 */

import { store, OFFICIAL_PERSONAS } from '../state.js';
import { downloadSpecialOperationOrder, downloadTransferOrder } from '../downloader.js';

export function renderDashboard(container) {
  const state = store.get();
  const activeRole = state.activeRole || 'EMPLOYEE';
  const currentPersona = OFFICIAL_PERSONAS[activeRole] || OFFICIAL_PERSONAS.EMPLOYEE;
  const user = state.currentUser;
  const leaves = state.leaveBalances;

  // Calculate years of service and superannuation countdown for Anurag
  const doj = new Date(user.dojGov);
  const now = new Date();
  const serviceYearsDiff = (now - doj) / (1000 * 60 * 60 * 24 * 365.25);
  const serviceYears = serviceYearsDiff < 2 ? `${serviceYearsDiff.toFixed(1)} Yrs` : `${Math.floor(serviceYearsDiff)} Yrs`;
  const superDate = new Date(user.superannuationDate);
  const yearsToRetire = Math.floor((superDate - now) / (1000 * 60 * 60 * 24 * 365.25));

  // Count pending approvals
  const pendingLeaves = state.leaveApplications.filter(l => l.status === 'PENDING').length;
  const pendingTours = state.tours.filter(t => t.status === 'PENDING_APPROVAL').length;
  const pendingClaims = state.claims.filter(c => c.status === 'PENDING').length;
  const totalPending = pendingLeaves + pendingTours + pendingClaims;

  container.innerHTML = `
    <!-- Top Officer Banner / Identity Card (Adapts to Active e-HRMS 2.0 Persona) -->
    <div class="officer-banner-card mb-20">
      <div class="officer-details-left">
        <div class="officer-photo-frame">
          <img src="${currentPersona.avatar || 'assets/avatar.svg'}" alt="${currentPersona.name}">
        </div>
        <div class="officer-info">
          <h2>${state.language === 'HI' ? currentPersona.hindiName : currentPersona.name}</h2>
          <div class="designation">${state.language === 'HI' ? currentPersona.hindiDesignation : currentPersona.designation}</div>
          <div class="officer-tags">
            <span class="officer-tag"><i class="tag-icon">🏛</i> ${currentPersona.department}</span>
            <span class="officer-tag" style="background: rgba(30, 64, 175, 0.1); color: #1d4ed8; font-weight: 700; border: 1px solid #bfdbfe;">
              <i class="tag-icon">⭐</i> ${currentPersona.classification || currentPersona.roleTitle}
            </span>
            <span class="officer-tag"><i class="tag-icon">🆔</i> ID: ${currentPersona.empId}</span>
            ${currentPersona.pan ? `<span class="officer-tag"><i class="tag-icon">💳</i> PAN: ${currentPersona.pan}</span>` : ''}
            ${currentPersona.mobile ? `<span class="officer-tag"><i class="tag-icon">📱</i> Mob: ${currentPersona.mobile}</span>` : ''}
            ${currentPersona.ddoCode ? `<span class="officer-tag" style="background: #fef3c7; color: #92400e; font-weight: 700;"><i class="tag-icon">🏛</i> DDO Code: ${currentPersona.ddoCode}</span>` : ''}
            ${activeRole === 'EMPLOYEE' ? `<span class="officer-tag"><i class="tag-icon">📊</i> Pay: ${user.payLevel} (Net: ₹${(state.payroll?.netSalary || 118232).toLocaleString('en-IN')})</span>` : ''}
            ${activeRole === 'EMPLOYEE' ? `<span class="officer-tag" style="background: #eef2ff; color: #4338ca; border: 1px solid #c7d2fe;"><i class="tag-icon">🎓</i> iGOT: ${state.karmayogi?.learningHours || 48.5} Hrs • ${state.karmayogi?.cbsCredits || 620} Credits</span>` : ''}
            ${activeRole === 'EMPLOYEE' ? `<span class="officer-tag" style="background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0;"><i class="tag-icon">🛡️</i> PRAN: 110194810244</span>` : ''}
            <span class="officer-tag"><i class="tag-icon">📍</i> ${currentPersona.office}</span>
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: center; padding: 0 16px;">
        <img src="assets/emblem.png" alt="State Emblem of India" style="width: 44px; height: 70px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));" title="State Emblem of India &bull; Government of India">
      </div>
      <div class="officer-stats-right">
        ${renderPersonaStatPill(activeRole, serviceYears, yearsToRetire, totalPending, state)}
      </div>
    </div>

    <!-- Active Persona Mode Indicator Strip -->
    <div style="background: #f1f5f9; border-left: 4px solid var(--goi-navy); padding: 8px 16px; border-radius: 4px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 12px; color: var(--goi-navy); font-weight: 600;">
        📌 Active e-HRMS 2.0 Desk: <strong>${currentPersona.roleTitle}</strong> &bull; Delegated Jurisdiction: <strong>${currentPersona.department}, ${currentPersona.ministry}</strong>
      </div>
      <a href="#login" class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 8px; color: #dc2626; border-color: #fca5a5; font-weight: 600;">🔐 Sign Out</a>
    </div>

    <!-- Special Operational Deployment Directive (Ministry of Defence, New Delhi) -->
    ${renderSpecialOperationBanner(state)}

    <!-- Main Dynamic Content based on Active Officer Role -->
    ${renderRoleSpecificBody(activeRole, state, user, leaves, totalPending)}

    <!-- Special Operation Official Order Interactive Modal -->
    ${renderSpecialOrderModal(state, user)}
  `;

  // Attach interactive events
  attachDashboardEvents(container, state);
}

function renderPersonaStatPill(role, serviceYears, yearsToRetire, totalPending, state) {
  switch (role) {
    case 'EMPLOYEE':
      return `
        <div class="stat-pill">
          <div class="val">${serviceYears}</div>
          <div class="lbl">${state.language === 'HI' ? 'कुल सेवा काल' : 'Service Completed'}</div>
        </div>
        <div class="stat-pill">
          <div class="val">${yearsToRetire} Yrs</div>
          <div class="lbl">${state.language === 'HI' ? 'अधिवर्षिता शेष' : 'To Superannuation'}</div>
        </div>
      `;
    case 'APPROVER':
      return `
        <div class="stat-pill">
          <div class="val">42</div>
          <div class="lbl">Staff In-Command</div>
        </div>
        <div class="stat-pill" style="border-color: #f59e0b;">
          <div class="val" style="color: #b45309;">${totalPending}</div>
          <div class="lbl">MSS Sanctions Pending</div>
        </div>
      `;
    case 'BRANCH_OFFICER':
      return `
        <div class="stat-pill">
          <div class="val">7</div>
          <div class="lbl">Files in Scrutiny</div>
        </div>
        <div class="stat-pill">
          <div class="val">4</div>
          <div class="lbl">e-SB Attestations (GFR 257)</div>
        </div>
      `;
    case 'DDO':
      return `
        <div class="stat-pill">
          <div class="val">10501</div>
          <div class="lbl">DDO Code (DMA)</div>
        </div>
        <div class="stat-pill" style="border-color: #10b981;">
          <div class="val" style="color: #047857;">₹1.40 Cr</div>
          <div class="lbl">Aug 2026 DBT Disbursed</div>
        </div>
      `;
    case 'ADMIN':
      return `
        <div class="stat-pill">
          <div class="val">1,280</div>
          <div class="lbl">Sanctioned Cadre</div>
        </div>
        <div class="stat-pill">
          <div class="val">98.8%</div>
          <div class="lbl">SPARROW Finalized</div>
        </div>
      `;
    default:
      return '';
  }
}

function renderRoleSpecificBody(role, state, user, leaves, totalPending) {
  switch (role) {
    case 'APPROVER':
      return renderApproverDashboard(state, totalPending);
    case 'BRANCH_OFFICER':
      return renderBranchOfficerDashboard(state);
    case 'DDO':
      return renderDdoDashboard(state, user);
    case 'ADMIN':
      return renderAdminDashboard(state);
    case 'EMPLOYEE':
    default:
      return renderEmployeeDashboard(state, user, leaves);
  }
}

// 1. Employee ESS Dashboard (Anurag Anil Bawaskar)
function renderEmployeeDashboard(state, user, leaves) {
  return `
    <div class="dashboard-grid">
      <!-- Left Column (8 cols): Leave Summary & Quick Actions -->
      <div class="col-8">
        
        <!-- Leave Balances Section -->
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">🌴 ${state.language === 'HI' ? 'अवकाश शेष सारांश (CCS अवकाश नियम, 1972)' : 'Leave Ledger Balances (CCS Leave Rules, 1972)'}</span>
            <button class="btn btn-sm btn-primary" id="btn-quick-apply-leave">+ ${state.language === 'HI' ? 'अवकाश आवेदन' : 'Apply Leave'}</button>
          </div>
          <div class="gov-card-body">
            <div class="leave-balance-grid">
              <div class="leave-metric-card cl">
                <div class="leave-code">CL</div>
                <div class="leave-val">${leaves.CL.balance}</div>
                <div class="leave-name">${state.language === 'HI' ? 'आकस्मिक' : 'Casual Leave'}</div>
              </div>
              <div class="leave-metric-card rh">
                <div class="leave-code">RH</div>
                <div class="leave-val">${leaves.RH.balance}</div>
                <div class="leave-name">${state.language === 'HI' ? 'प्रतिबंधित' : 'Restricted Hol.'}</div>
              </div>
              <div class="leave-metric-card el">
                <div class="leave-code">EL</div>
                <div class="leave-val">${leaves.EL.balance}</div>
                <div class="leave-name">${state.language === 'HI' ? 'अर्जित अवकाश' : 'Earned Leave'}</div>
              </div>
              <div class="leave-metric-card hpl">
                <div class="leave-code">HPL</div>
                <div class="leave-val">${leaves.HPL.balance}</div>
                <div class="leave-name">${state.language === 'HI' ? 'अर्ध वेतन' : 'Half Pay Leave'}</div>
              </div>
              <div class="leave-metric-card">
                <div class="leave-code">COMM</div>
                <div class="leave-val">${leaves.COMMUTED.balance}</div>
                <div class="leave-name">${state.language === 'HI' ? 'रूपांतरित' : 'Commuted'}</div>
              </div>
            </div>
            <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 12px; text-align: right;">
              * Maximum EL accumulation cap: 300 days. Half-year advance credit updated on 01-Jul-2026.
            </div>
          </div>
        </div>

        <!-- Quick Access Services Grid -->
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">⚡ ${state.language === 'HI' ? 'त्वरित ई-सेवाएं' : 'Quick Employee Self Services'}</span>
          </div>
          <div class="gov-card-body">
            <div class="action-tiles-grid">
              <div class="action-tile" onclick="window.location.hash='#service-book'">
                <div class="tile-icon">📖</div>
                <div class="tile-label">${state.language === 'HI' ? 'ई-सेवा पुस्तिका' : 'e-Service Book'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#salary'">
                <div class="tile-icon">💳</div>
                <div class="tile-label">${state.language === 'HI' ? `वेतन पर्ची (₹${(state.payroll?.netSalary || 118232).toLocaleString('en-IN')})` : 'Monthly Pay Slip'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#apar'">
                <div class="tile-icon">🎯</div>
                <div class="tile-label">${state.language === 'HI' ? 'अपार (SPARROW)' : 'APAR Appraisal'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#ipr'">
                <div class="tile-icon">🏡</div>
                <div class="tile-label">${state.language === 'HI' ? 'अचल संपत्ति विवरण' : 'Property (IPR)'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#tour'">
                <div class="tile-icon">✈️</div>
                <div class="tile-label">${state.language === 'HI' ? 'आधिकारिक दौरा' : 'Tour & TA/DA'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#ltc'">
                <div class="tile-icon">🚆</div>
                <div class="tile-label">${state.language === 'HI' ? 'एलटीसी सुविधा' : 'LTC Portal'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#claims'">
                <div class="tile-icon">🧾</div>
                <div class="tile-label">${state.language === 'HI' ? 'दावे व प्रतिपूर्ति' : 'Claims & CEA'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#karmayogi'">
                <div class="tile-icon">🎓</div>
                <div class="tile-label">${state.language === 'HI' ? 'आईगॉट कर्मयोगी' : 'iGOT Karmayogi'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#id-card'">
                <div class="tile-icon">🪪</div>
                <div class="tile-label">${state.language === 'HI' ? 'डिजिटल पहचान पत्र' : 'Smart ID Card'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#canteen'">
                <div class="tile-icon">🛒</div>
                <div class="tile-label">${state.language === 'HI' ? 'कैंटीन व बिलिंग पोर्टल' : 'CSD Canteen & Billing'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#letterhead'">
                <div class="tile-icon">📝</div>
                <div class="tile-label">${state.language === 'HI' ? 'लेटरहेड स्टूडियो' : 'Letterhead Studio'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#pension'">
                <div class="tile-icon">🛡️</div>
                <div class="tile-label">${state.language === 'HI' ? 'एनपीएस पेंशन कोष' : 'NPS PRAN Wealth'}</div>
              </div>
              <div class="action-tile" onclick="window.location.hash='#grievances'">
                <div class="tile-icon">⚖️</div>
                <div class="tile-label">${state.language === 'HI' ? 'सीपीग्राम्स शिकायतें' : 'CPGRAMS Desk'}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Application Activity -->
        <div class="gov-card">
          <div class="gov-card-header">
            <span class="gov-card-title">🕒 ${state.language === 'HI' ? 'हाल की आवेदन गतिविधियां' : 'Recent Application Trackers'}</span>
            <a href="#leave" class="btn btn-sm btn-outline">${state.language === 'HI' ? 'सभी देखें' : 'View All'} &rarr;</a>
          </div>
          <div class="gov-table-container">
            <table class="gov-table">
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Module</th>
                  <th>Details / Period</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${state.leaveApplications.slice(0, 3).map(app => `
                  <tr>
                    <td style="font-weight: 700; color: var(--goi-blue);">${app.id}</td>
                    <td>Leave (${app.typeName})</td>
                    <td>${app.startDate} to ${app.endDate} (${app.days} days)</td>
                    <td>${app.appliedOn}</td>
                    <td><span class="status-badge badge-${app.status.toLowerCase()}">${app.status}</span></td>
                  </tr>
                `).join('')}
                ${state.claims.slice(0, 1).map(clm => `
                  <tr>
                    <td style="font-weight: 700; color: var(--goi-blue);">${clm.id}</td>
                    <td>Allowance Claim</td>
                    <td>${clm.category} (₹${clm.amountClaimed.toLocaleString('en-IN')})</td>
                    <td>${clm.appliedOn}</td>
                    <td><span class="status-badge badge-${clm.status.toLowerCase()}">${clm.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Right Column (4 cols): Compliance Health & Notices -->
      <div class="col-4">
        
        <!-- Annual Compliance Status Widget -->
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">📋 Compliance Health</span>
          </div>
          <div class="gov-card-body" style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
              <div>
                <div style="font-weight: 600; font-size: 13px;">IPR (Rule 18 CCS Rules)</div>
                <div style="font-size: 11px; color: var(--text-muted);">Filed for Year 2025</div>
              </div>
              <span class="status-badge badge-sanctioned">Completed</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
              <div>
                <div style="font-weight: 600; font-size: 13px;">SPARROW APAR 2024-25</div>
                <div style="font-size: 11px; color: var(--text-muted);">Grade: 9.5 / 10.0</div>
              </div>
              <span class="status-badge badge-sanctioned">Finalized</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
              <div>
                <div style="font-weight: 600; font-size: 13px;">Vigilance Status</div>
                <div style="font-size: 11px; color: var(--text-muted);">CVO MoD / DMA Clearance</div>
              </div>
              <span class="status-badge badge-clear">Clear</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
              <div>
                <div style="font-weight: 600; font-size: 13px;">Mission Karmayogi iGOT</div>
                <div style="font-size: 11px; color: var(--text-muted);">${state.karmayogi?.learningHours || 48.5} Hrs &bull; ${state.karmayogi?.cbsCredits || 620} Credits</div>
              </div>
              <a href="#karmayogi" class="status-badge badge-info" style="text-decoration: none; cursor: pointer;">View Hub</a>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
              <div>
                <div style="font-weight: 600; font-size: 13px;">NPS PRAN Tier-I</div>
                <div style="font-size: 11px; color: var(--text-muted);">Corpus: ₹${(state.pensionNps?.totalCorpus || 318640).toLocaleString('en-IN')}</div>
              </div>
              <a href="#pension" class="status-badge badge-sanctioned" style="text-decoration: none; cursor: pointer;">Active</a>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 600; font-size: 13px;">CPGRAMS Grievances</div>
                <div style="font-size: 11px; color: var(--text-muted);">${state.grievances?.records?.length || 1} Dockets Active</div>
              </div>
              <a href="#grievances" class="status-badge badge-clear" style="text-decoration: none; cursor: pointer;">Redressal</a>
            </div>
          </div>
        </div>

        <!-- Official Circulars & Office Memorandums (OMs) -->
        ${renderCircularsCard(state)}

        <!-- Titan AI HR Assistant -->
        <div class="gov-card mb-20" style="border: 2px solid #8b5cf6; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);">
          <div class="gov-card-header" style="background: linear-gradient(135deg, #f5f3ff, #ede9fe); border-bottom: 1px solid #ddd6fe;">
            <span class="gov-card-title" style="color: #6d28d9; display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">🤖</span> Titan AI HR Assistant
            </span>
          </div>
          <div class="gov-card-body" style="padding: 16px;">
            <div id="ai-chat-history" style="max-height: 200px; overflow-y: auto; margin-bottom: 12px; font-size: 12px; color: #475569; display: flex; flex-direction: column; gap: 8px;">
              <div style="background: #f1f5f9; padding: 8px 12px; border-radius: 8px; border-bottom-left-radius: 0;">
                Hello <strong>${user.name}</strong>, I am your smart HR Assistant powered by Gemini. Ask me about CCS Leave Rules, Pay Fixation, or TA/DA guidelines!
              </div>
            </div>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="ai-chat-input" class="form-control" placeholder="E.g. What is the limit for Earned Leave?" style="font-size: 12px;">
              <button class="btn btn-primary" id="btn-ai-send" style="background: #7c3aed; border-color: #6d28d9; padding: 6px 12px;">Ask</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// 2. Approver / MSS Dashboard (Shri Anil Kumar Chhapolia, Director)
function renderApproverDashboard(state, totalPending) {
  const pendingLeaves = state.leaveApplications.filter(l => l.status === 'PENDING');
  const pendingTours = state.tours.filter(t => t.status === 'PENDING_APPROVAL');
  const pendingClaims = state.claims.filter(c => c.status === 'PENDING');

  return `
    <!-- Executive Approver Alert -->
    <div class="gov-alert gov-alert-warning mb-20" style="cursor: pointer;" onclick="window.location.hash='#approvals'">
      <div style="font-size: 26px;">⚖️</div>
      <div style="flex: 1;">
        <div style="font-size: 14px; font-weight: 800; color: #92400e;">
          Manager Self Service (MSS) - Pending Executive Queue (${totalPending} Requests)
        </div>
        <div style="font-size: 12.5px; color: #78350f; margin-top: 2px;">
          You have delegated administrative powers to sanction Leaves, Tours, and Reimbursements under Ministry of Defence Delegation of Financial Powers (DFP).
        </div>
      </div>
      <a href="#approvals" class="btn btn-sm btn-primary" style="background: #b45309; border-color: #92400e;">Open MSS Inbox &rarr;</a>
    </div>

    <div class="dashboard-grid">
      <!-- Left Column: Pending Sanctions & SPARROW Appraisals -->
      <div class="col-8">
        
        <!-- Pending MSS Sanctions Card -->
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">📋 Pending Applications Awaiting Your Sanction</span>
            <a href="#approvals" class="btn btn-sm btn-outline">Full Inbox (${totalPending}) &rarr;</a>
          </div>
          <div class="gov-table-container">
            <table class="gov-table">
              <thead>
                <tr>
                  <th>Officer Name</th>
                  <th>Request Category</th>
                  <th>Details / Period</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${pendingLeaves.map(app => `
                  <tr>
                    <td><strong>Anurag Anil Bawaskar</strong><br><span style="font-size: 11px; color: var(--text-muted);">ASO-I (MOD-DMA-2024-8104)</span></td>
                    <td>🌴 Leave (${app.typeName})</td>
                    <td>${app.startDate} to ${app.endDate} (${app.days} days)<br><span style="font-size: 11px; color: #475569;">"${app.reason}"</span></td>
                    <td>
                      <a href="#approvals" class="btn btn-sm btn-primary" style="font-size: 11px; padding: 3px 8px;">Aadhaar e-Sign</a>
                    </td>
                  </tr>
                `).join('')}
                ${pendingTours.map(t => `
                  <tr>
                    <td><strong>Anurag Anil Bawaskar</strong><br><span style="font-size: 11px; color: var(--text-muted);">ASO-I (MOD-DMA-2024-8104)</span></td>
                    <td>✈️ Official Tour</td>
                    <td>${t.purpose} (${t.startDate} to ${t.endDate})</td>
                    <td>
                      <a href="#approvals" class="btn btn-sm btn-primary" style="font-size: 11px; padding: 3px 8px;">Sanction</a>
                    </td>
                  </tr>
                `).join('')}
                ${pendingClaims.map(c => `
                  <tr>
                    <td><strong>Anurag Anil Bawaskar</strong><br><span style="font-size: 11px; color: var(--text-muted);">ASO-I (MOD-DMA-2024-8104)</span></td>
                    <td>🧾 Allowance Claim</td>
                    <td>${c.category} (₹${c.amountClaimed.toLocaleString('en-IN')})</td>
                    <td>
                      <a href="#approvals" class="btn btn-sm btn-primary" style="font-size: 11px; padding: 3px 8px;">Pass Claim</a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- SPARROW Reporting Officer Desk -->
        <div class="gov-card">
          <div class="gov-card-header">
            <span class="gov-card-title">🎯 SPARROW APAR Reporting Officer Evaluation Desk</span>
            <a href="#apar" class="btn btn-sm btn-outline">SPARROW Portal &rarr;</a>
          </div>
          <div class="gov-card-body">
            <div style="background: #f8fafc; border: 1px solid var(--border-medium); border-radius: 6px; padding: 14px; margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 700; color: var(--goi-navy); font-size: 13px;">
                    APAR Cycle 2025-26 &bull; ASO-I Anurag Anil Bawaskar (MOD-DMA-2024-8104)
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">
                    Self-Appraisal submitted on 14-Apr-2026 &bull; Work Accomplishment: 100% Target Completion & Digitization
                  </div>
                </div>
                <span class="status-badge badge-pending">Pending Grading</span>
              </div>
              <div style="margin-top: 10px; display: flex; gap: 8px;">
                <button class="btn btn-sm btn-primary" onclick="window.location.hash='#apar'">Record Pen-Picture & Grade &rarr;</button>
                <button class="btn btn-sm btn-outline" onclick="window.location.hash='#service-book'">Inspect Officer e-SB</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column: Statutory Delegations & Cadre Scope -->
      <div class="col-4">
        
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">⚖️ Statutory Powers (DFP 2021)</span>
          </div>
          <div class="gov-card-body" style="font-size: 12px; line-height: 1.6; color: var(--text-secondary);">
            <div style="margin-bottom: 10px;">
              <strong>Sanctioning Authority:</strong> Joint Secretary (Establishment & Coordination), Department of Military Affairs.
            </div>
            <div style="margin-bottom: 10px;">
              <strong>Financial Powers:</strong> Contingent expenditure up to ₹50,000 per case; TA/DA and Travel claims sanction.
            </div>
            <div>
              <strong>Leave Rules:</strong> Competent to grant Earned Leave, Half Pay Leave, and Commuted Leave up to 120 days.
            </div>
          </div>
        </div>

        ${renderCircularsCard(state)}

      </div>
    </div>
  `;
}

// 3. Branch Controlling Officer Dashboard (Shri Rajender Singh, DS Estt)
function renderBranchOfficerDashboard(state) {
  return `
    <div class="dashboard-grid">
      <div class="col-8">
        
        <!-- Scrutiny Desk Card -->
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">🔍 First-Line Administrative Scrutiny & Rule Check Desk</span>
            <span class="status-badge badge-info">Establishment-I Branch</span>
          </div>
          <div class="gov-card-body">
            <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 14px;">
              Scrutinize requests under Central Civil Services (CCS) Rules and GFR 2017 before forwarding to Director for final sanction.
            </p>

            <div style="border: 1px solid var(--border-medium); border-radius: 6px; padding: 14px; margin-bottom: 12px; background: #f8fafc;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 700; color: var(--goi-navy); font-size: 13px;">
                    1. ASO-I Anurag Anil Bawaskar &bull; Leave Admissibility Verification
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">
                    Earned Leave for 5 days &bull; Verified EL Balance: 30 Days in Credit &bull; Rule 26 CCS (Leave) Rules
                  </div>
                </div>
                <span class="status-badge badge-sanctioned">Admissible</span>
              </div>
              <div style="margin-top: 10px; display: flex; gap: 8px;">
                <button class="btn btn-sm btn-primary" onclick="alert('Scrutiny Verified: Forwarded with positive recommendation to Director (Estt & Joint Staff).')">✅ Recommend to Director</button>
                <button class="btn btn-sm btn-outline" onclick="alert('Query raised on leave application.')">❓ Seek Clarification</button>
              </div>
            </div>

            <div style="border: 1px solid var(--border-medium); border-radius: 6px; padding: 14px; background: #f8fafc;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 700; color: var(--goi-navy); font-size: 13px;">
                    2. Children Education Allowance (CEA) Claim Scrutiny
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">
                    Claim Ref: DMA/CLM/2026/0541 &bull; School Fee Receipt & Bonafide Certificate checked under DoPT OM
                  </div>
                </div>
                <span class="status-badge badge-pending">Under Verification</span>
              </div>
              <div style="margin-top: 10px; display: flex; gap: 8px;">
                <button class="btn btn-sm btn-primary" onclick="alert('CEA verification passed: Forwarded to SAO / DDO for payment voucher generation.')">✅ Verify & Forward to DDO</button>
              </div>
            </div>

          </div>
        </div>

        <!-- Rule 257 GFR e-Service Book Verification Desk -->
        <div class="gov-card">
          <div class="gov-card-header">
            <span class="gov-card-title">📖 GFR Rule-257 Annual Service Verification Desk</span>
            <a href="#service-book" class="btn btn-sm btn-outline">Open Service Books &rarr;</a>
          </div>
          <div class="gov-card-body">
            <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 10px;">
              Under Rule 257 of General Financial Rules (GFR), 2017, the Service Books of Government servants must be annually verified and attested by the Head of Office.
            </p>
            <div style="display: flex; gap: 10px;">
              <button class="btn btn-sm btn-primary" onclick="window.location.hash='#service-book'">Attest Anurag Anil Bawaskar's e-SB (2025-26)</button>
            </div>
          </div>
        </div>

      </div>

      <div class="col-4">
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">📌 Establishment-I Roster</span>
          </div>
          <div class="gov-card-body" style="font-size: 12px; line-height: 1.6;">
            <div><strong>Controlling Officer:</strong> Shri Rajender Singh, US</div>
            <div><strong>Branch:</strong> Estt-I (Civilian Officers & Secretariats)</div>
            <div><strong>Total Active Files:</strong> 18 Files</div>
            <div><strong>SLA Turnaround:</strong> 48 Hours max</div>
          </div>
        </div>

        ${renderCircularsCard(state)}
      </div>
    </div>
  `;
}

// 4. DDO / Treasury Dashboard (Shri Pradeep Kumar, SAO, DDO Code: 10501)
function renderDdoDashboard(state, user) {
  const d = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const shorts = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const curMonthName = months[d.getMonth()];
  const curShortMon = shorts[d.getMonth()];
  const curYear = d.getFullYear();
  const curMonthNum = String(d.getMonth() + 1).padStart(2, '0');

  return `
    <div class="dashboard-grid">
      <div class="col-8">
        
        <!-- 7th CPC Payroll Bill & Treasury Disbursement Card -->
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">💰 7th CPC Payroll & Major Head 2052 Disbursement Desk</span>
            <span class="badge-tag-gov" style="background: #10b981; color: white;">DDO Code: 10501</span>
          </div>
          <div class="gov-card-body">
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 14px; margin-bottom: 16px;">
              <div style="font-size: 13px; font-weight: 700; color: #166534;">
                ${curMonthName} ${curYear} Monthly Salary Bill Disbursed Successfully via PFMS Direct Benefit Transfer (DBT)
              </div>
              <div style="font-size: 11.5px; color: #15803d; margin-top: 4px;">
                Bill Ref: <strong>DMA/ESTT-I/SAL-${curShortMon}-${curYear}/0412</strong> &bull; Token No: <strong>TK-10501-${curYear}-${curMonthNum}</strong> &bull; PAO: <strong>001488 (MoD Secretariat)</strong>
              </div>
            </div>

            <!-- Featured Officer Record: Anurag Anil Bawaskar -->
            <div style="border: 1px solid var(--border-medium); border-radius: 6px; padding: 16px; background: #ffffff; box-shadow: var(--shadow-sm);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-light); padding-bottom: 10px; margin-bottom: 12px;">
                <div>
                  <div style="font-size: 14px; font-weight: 800; color: var(--goi-navy);">
                    ANURAG ANIL BAWASKAR &bull; Group 'A' (Gazetted)
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">
                    Additional Section Officer - I &bull; ID: <strong>MOD-DMA-2024-8104</strong> &bull; PAN: <strong>${user.pan}</strong> &bull; Mobile: <strong>${user.mobile}</strong>
                  </div>
                </div>
                <span class="status-badge badge-sanctioned" style="font-size: 11px; padding: 3px 8px;">PFMS Disbursed</span>
              </div>

              <!-- Salary breakdown row -->
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center; margin-bottom: 14px;">
                <div style="background: #f8fafc; padding: 8px; border-radius: 4px;">
                  <div style="font-size: 11px; color: var(--text-muted);">Basic Pay</div>
                  <div style="font-size: 14px; font-weight: 700; color: var(--goi-navy);">₹${(state.payroll?.basicPay || 70000).toLocaleString('en-IN')}</div>
                </div>
                <div style="background: #f8fafc; padding: 8px; border-radius: 4px;">
                  <div style="font-size: 11px; color: var(--text-muted);">DA (53%)</div>
                  <div style="font-size: 14px; font-weight: 700; color: var(--goi-navy);">₹${Math.round((state.payroll?.basicPay || 70000) * (state.payroll?.daRate || 0.53)).toLocaleString('en-IN')}</div>
                </div>
                <div style="background: #f8fafc; padding: 8px; border-radius: 4px;">
                  <div style="font-size: 11px; color: var(--text-muted);">Gross Earnings</div>
                  <div style="font-size: 14px; font-weight: 700; color: #166534;">₹${(state.payroll?.grossSalary || 133608).toLocaleString('en-IN')}</div>
                </div>
                <div style="background: #ecfdf5; padding: 8px; border-radius: 4px; border: 1px solid #a7f3d0;">
                  <div style="font-size: 11px; color: #047857; font-weight: 700;">Take-Home Net Salary</div>
                  <div style="font-size: 16px; font-weight: 800; color: #065f46;">₹${(state.payroll?.netSalary || 118232).toLocaleString('en-IN')}</div>
                </div>
              </div>

              <!-- Bank Account Detail for Direct Credit -->
              <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 4px; padding: 10px 12px; font-size: 12px; margin-bottom: 12px;">
                <div><strong>Disbursed To Account:</strong> 39189241534 (${user.bankDetails.accountHolder})</div>
                <div><strong>Bank & Branch:</strong> ${user.bankDetails.bankName}, ${user.bankDetails.branch} (IFSC: ${user.bankDetails.ifsc})</div>
                <div style="color: #047857; font-weight: 600; margin-top: 2px;">✓ PFMS UTR: SBIN2624491823 &bull; DSP (Defence Salary Package) Mandate Verified</div>
              </div>

              <div style="display: flex; gap: 10px;">
                <button class="btn btn-sm btn-primary" onclick="window.location.hash='#salary'">💳 View & Download 7th CPC Pay Slip &rarr;</button>
                <button class="btn btn-sm btn-outline" onclick="alert('PFMS Bill Schedule 0412 for DDO Code 10501 downloaded.')">📥 Download PFMS Schedule (PDF)</button>
              </div>
            </div>

          </div>
        </div>

        <!-- Contingent Bills & Voucher Passing Desk -->
        <div class="gov-card">
          <div class="gov-card-header">
            <span class="gov-card-title">🧾 Contingent Claims & CEA Passing Desk</span>
            <span class="status-badge badge-pending">3 Claims Pending</span>
          </div>
          <div class="gov-card-body">
            <table class="gov-table">
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Officer</th>
                  <th>Nature of Claim</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>DMA/CLM/2026/0541</strong></td>
                  <td>Anurag Anil Bawaskar (ASO-I)</td>
                  <td>Children Education Allowance (CEA)</td>
                  <td style="font-weight: 700; color: #166534;">₹18,000</td>
                  <td>
                    <button class="btn btn-sm btn-primary" style="font-size: 11px;" onclick="window.openDscModal ? window.openDscModal() : alert('DDO Sanction Token Issued')">Issue DDO Token</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Right Column: DDO Treasury Metadata -->
      <div class="col-4">
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">🏦 DDO 10501 Accounting Ledger</span>
          </div>
          <div class="gov-card-body" style="font-size: 12px; line-height: 1.6;">
            <div><strong>DDO Code:</strong> 10501 (Dept of Military Affairs)</div>
            <div><strong>PAO Code:</strong> 001488 (MoD Secretariat)</div>
            <div><strong>Major Head:</strong> 2052 (Secretariat General)</div>
            <div><strong>Disbursing Bank:</strong> State Bank of India</div>
            <div><strong>TDS TAN:</strong> DELD01824A</div>
            <div><strong>Form 16 Quarter:</strong> Q1 (Apr-Jun 2026) Filed</div>
          </div>
        </div>

        ${renderCircularsCard(state)}
      </div>
    </div>
  `;
}

// 5. Admin / CCA Dashboard (Lieutenant General N.S. Raja Subramani, CDS & Secy)
function renderAdminDashboard(state) {
  return `
    <div class="dashboard-grid">
      <div class="col-8">
        
        <!-- Departmental Cadre Governance Card -->
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">👑 Department of Military Affairs - Cadre Controlling Authority (CCA)</span>
            <a href="#analytics" class="btn btn-sm btn-primary">DMA Cadre Directory & Analytics &rarr;</a>
          </div>
          <div class="gov-card-body">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; text-align: center; margin-bottom: 16px;">
              <div style="background: #f8fafc; border: 1px solid var(--border-medium); border-radius: 6px; padding: 12px;">
                <div style="font-size: 24px; font-weight: 800; color: var(--goi-navy);">1,280</div>
                <div style="font-size: 11.5px; color: var(--text-muted); text-transform: uppercase;">Total Sanctioned Posts</div>
              </div>
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 12px;">
                <div style="font-size: 24px; font-weight: 800; color: #166534;">1,142</div>
                <div style="font-size: 11.5px; color: #15803d; text-transform: uppercase;">In-Position Officers</div>
              </div>
              <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px;">
                <div style="font-size: 24px; font-weight: 800; color: #dc2626;">138</div>
                <div style="font-size: 11.5px; color: #b91c1c; text-transform: uppercase;">Direct / Deputation Vacancies</div>
              </div>
            </div>

            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
              <div style="flex: 1; background: #ffffff; border: 1px solid var(--border-medium); border-radius: 6px; padding: 12px; height: 250px; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <canvas id="cadre-chart"></canvas>
              </div>
              <div style="flex: 1; background: #ffffff; border: 1px solid var(--border-medium); border-radius: 6px; padding: 12px; height: 250px; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <canvas id="leave-chart"></canvas>
              </div>
            </div>

            <div style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.6;">
              As the Cadre Controlling Authority, you oversee the recruitment, confirmation, cadre restructuring, and annual performance appraisal (SPARROW) for all Defence Civil Services and Central Secretariat personnel in the Department of Military Affairs.
            </div>

            <div style="margin-top: 14px; display: flex; gap: 10px;">
              <button class="btn btn-primary" onclick="window.location.hash='#analytics'">📊 View Full 1,280 Cadre Analytics</button>
              <button class="btn btn-outline" onclick="window.location.hash='#apar'">🎯 SPARROW Reviewing Officer Endorsements</button>
            </div>
          </div>
        </div>

        <!-- e-HRMS 2.0 Security & Role Delegations -->
        <div class="gov-card">
          <div class="gov-card-header">
            <span class="gov-card-title">🛡️ System Security, Parichay SSO & Audit Logs</span>
            <span class="badge-tag-gov" style="background: #0284c7; color: white;">NIC Live</span>
          </div>
          <div class="gov-card-body">
            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12px;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
                <span>Parichay (MeriPehchaan) SSO Gateway</span>
                <span style="color: #166534; font-weight: 700;">Active (2FA Enforced)</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
                <span>DDO Code 10501 PFMS Integration Status</span>
                <span style="color: #166534; font-weight: 700;">Connected (PAO 001488)</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>C-DAC Aadhaar e-Sign 3.0 ESP Health</span>
                <span style="color: #166534; font-weight: 700;">Operational (99.99% SLA)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-4">
        <div class="gov-card mb-20">
          <div class="gov-card-header">
            <span class="gov-card-title">🏛️ Executive Secretariat</span>
          </div>
          <div class="gov-card-body" style="font-size: 12px; line-height: 1.6;">
            <div><strong>Officer:</strong> Lieutenant General N.S. Raja Subramani, CDS</div>
            <div><strong>Office:</strong> Room 199-C, South Block</div>
            <div><strong>Secretary:</strong> General Anil Chauhan, CDS</div>
            <div><strong>Addl Secretary:</strong> Vice Admiral Atul Anand</div>
          </div>
        </div>

        ${renderCircularsCard(state)}
      </div>
    </div>
  `;
}

// Reusable Circulars Card
function renderCircularsCard(state) {
  const topCirculars = (state.circulars || []).slice(0, 4);
  const totalCount = (state.circulars || []).length;

  return `
    <div class="gov-card">
      <div class="gov-card-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="gov-card-title">📢 Official Circulars &amp; Gazette Orders</span>
          <span class="badge-tag-gov" style="font-size: 10px;">${totalCount} Active</span>
        </div>
        <a href="#orders-circulars" class="btn btn-sm btn-outline" style="font-size: 11.5px; padding: 3px 10px; font-weight: 700; color: #002B49; border-color: #cbd5e1;">
          Archive Repository &rsaquo;
        </a>
      </div>
      <div class="gov-card-body">
        <div class="notice-list">
          ${topCirculars.map(cir => `
            <div class="notice-item ${cir.isNew ? 'new-notice' : ''}" style="${cir.isSpecialOperation ? 'background: #fff1f2; border-left: 4px solid #dc2626;' : (cir.isTransferOrder ? 'background: #f0fdf4; border-left: 4px solid #16a34a;' : '')}">
              <div class="notice-info">
                <div class="notice-title" style="${cir.isSpecialOperation ? 'color: #991b1b; font-weight: 700;' : (cir.isTransferOrder ? 'color: #166534; font-weight: 700;' : '')}">
                  ${cir.isSpecialOperation ? '<span style="background: #dc2626; color: white; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 3px; margin-right: 4px;">TOP SECRET</span>' : (cir.isTransferOrder ? '<span style="background: #16a34a; color: white; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 3px; margin-right: 4px;">GAZETTE ORDER</span>' : (cir.isNew ? '<span style="color: #dc2626; font-size: 10px; font-weight: 800; margin-right: 4px;">[NEW]</span>' : ''))}
                  ${cir.title}
                </div>
                ${cir.subject ? `<div style="font-size: 11px; color: #334155; margin-top: 3px; line-height: 1.45;">${cir.subject}</div>` : ''}
                <div class="notice-meta" style="margin-top: 4px;">📅 ${cir.date} &bull; Ref: <code>${cir.id}</code></div>
              </div>
              ${cir.isSpecialOperation ? `
                <div style="display: flex; gap: 4px; flex-shrink: 0; align-self: flex-start; margin-top: 4px;">
                  <button class="btn btn-sm btn-danger" style="background: #dc2626; color: white; border: none; font-size: 11px; padding: 3px 8px; font-weight: 700;" id="btn-view-special-order-cir">👁️ View</button>
                  <button class="btn btn-sm btn-primary" style="font-size: 11px; padding: 3px 8px; font-weight: 700;" id="btn-download-special-order-cir">📥 PDF</button>
                </div>
              ` : (cir.isTransferOrder ? `
                <div style="display: flex; gap: 4px; flex-shrink: 0; align-self: flex-start; margin-top: 4px;">
                  <button class="btn btn-sm btn-primary" style="background: #16a34a; border-color: #15803d; font-size: 11px; padding: 4px 10px; font-weight: 700;" id="btn-download-transfer-cir">📥 Transfer Order</button>
                </div>
              ` : `
                <button class="btn btn-sm btn-outline" style="flex-shrink: 0; align-self: flex-start; margin-top: 4px;" onclick="alert('Viewing Office Memorandum ${cir.id}:\\n\\nSubject: ${cir.subject}\\nDocument: ${cir.file}')">PDF</button>
              `)}
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 14px; padding-top: 10px; border-top: 1px dashed #cbd5e1; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <span style="font-size: 11.5px; color: #64748b;">Showing 4 latest directives of ${totalCount} official repository records</span>
          <div style="display: flex; gap: 8px; align-items: center;">
            <a href="#letterhead" class="btn btn-outline" style="font-size: 12px; font-weight: 700; padding: 6px 14px; color: #990000; border-color: #fca5a5; background: #fff5f5;">
              ✍️ Compose on Official Letterhead &rsaquo;
            </a>
            <a href="#orders-circulars" class="btn btn-primary" style="font-size: 12px; font-weight: 700; padding: 6px 16px; background: #002B49; border-color: #002B49;">
              📜 Open Full Archive (${totalCount}) &rsaquo;
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Special Operational Directive Banner
function renderSpecialOperationBanner(state) {
  const order = state.specialOperationOrder;
  if (!order) return '';

  return `
    <div class="gov-card mb-20" style="background: linear-gradient(135deg, #fff1f2 0%, #ffffff 50%, #fef2f2 100%); border-left: 5px solid #dc2626; border-right: 1px solid #fecaca; border-top: 1px solid #fecaca; border-bottom: 1px solid #fecaca; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.08); padding: 18px 20px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
        <div style="flex: 1; min-width: 320px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <span class="status-badge" style="background: #dc2626; color: white; font-weight: 800; font-size: 11px; letter-spacing: 0.5px; padding: 3px 8px;">
              🚨 TOP SECRET // OPERATIONAL IMMEDIATE
            </span>
            <span style="font-size: 12px; font-weight: 700; color: #991b1b;">
              GOVERNMENT OF INDIA &bull; MINISTRY OF DEFENCE, NEW DELHI
            </span>
          </div>

          <h3 style="margin: 0 0 6px 0; color: #002B49; font-size: 16px; font-weight: 800; line-height: 1.4;">
            Special Operation Directive: ${order.operationCodename}
          </h3>

          <div style="font-size: 12.5px; color: #334155; line-height: 1.6; margin-bottom: 10px;">
            <div><strong>Order No:</strong> <code>${order.orderNo}</code> &bull; <strong>Dated:</strong> ${order.orderDate} &bull; <strong>Commencement:</strong> <span style="color: #166534; font-weight: 700;">${order.effectiveDate}</span> &bull; <strong>Duration:</strong> <span style="color: #b45309; font-weight: 700;">${order.endDate}</span></div>
            <div style="margin-top: 3px;">
              <strong>Operational Location:</strong> 
              <span style="background: #fef2f2; color: #dc2626; font-weight: 800; padding: 2px 6px; border: 1px solid #fca5a5; border-radius: 4px; font-size: 11px;">
                🔒 ${order.locationStatus}
              </span>
              <span style="color: #64748b; font-size: 11.5px; margin-left: 6px;">
                (To be revealed in the Apex In-Camera Meeting scheduled for <strong>12-Sep-2026 at 14:00 Hrs &bull; Day after Tomorrow</strong> at South Block War Room)
              </span>
            </div>
            <div style="margin-top: 4px; font-size: 11.5px; color: #475569;">
              <strong>Joint Strategic Task Force (15-Member Chain of Command):</strong> General Anil Chauhan (CDS, L-17), Lt Gen N.S. Raja Subramani (VCOAS, L-17), Shri Anil Kumar Chhapolia (JS, L-14), Col. Devashish Sharma (Director, L-13), Shri Rajender Singh (DS, L-12), Smt. Meenakshi Sundaram (US, L-11), Shri Vikramaditya Rathore (SO, L-8/10), <strong>Shri Anurag Anil Bawaskar (Group 'A' Gazetted / Lead Tech Ops, L-7)</strong>, Shri Prateek Sengupta (ASO-II, L-7), Kumari Shweta Deshmukh (ASO, L-7), Shri Harish Chandra Joshi (STA, L-6), Shri Rakesh Kumar Meena (SSA, L-4), Kumari Priya Nair (SSA, L-4), Shri Sandeep Verma (JSA, L-2), Shri Mohammad Tariq Khan (JSA, L-2).
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-end;">
          <button class="btn btn-primary" id="btn-view-special-order-banner" style="background: #dc2626; border-color: #b91c1c; font-weight: 700; font-size: 12.5px; display: flex; align-items: center; gap: 6px; padding: 8px 16px;">
            <span>👁️</span> View Full Order &amp; Directives
          </button>
          <button class="btn btn-outline" id="btn-download-special-order-banner" style="font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 6px; padding: 6px 14px; background: white;">
            <span>📥</span> Download Certified Order (PDF)
          </button>
        </div>
      </div>
    </div>
  `;
}

// Special Operation Order Full Modal
function renderSpecialOrderModal(state, user) {
  const order = state.specialOperationOrder;
  if (!order) return '';

  return `
    <div class="modal-backdrop" id="special-order-modal">
      <div class="modal-dialog" style="max-width: 860px; max-height: 90vh; display: flex; flex-direction: column;">
        <div class="modal-header" style="background: #991b1b; color: white; padding: 12px 20px;">
          <div class="modal-title" style="color: white; font-weight: 800; display: flex; align-items: center; gap: 8px; font-size: 14px;">
            <span>🔒</span> OFFICIAL DIRECTIVE &bull; TOP SECRET // OPERATIONAL IMMEDIATE
          </div>
          <button class="modal-close" id="btn-close-special-order-modal" style="color: white; font-size: 24px; opacity: 0.9;">&times;</button>
        </div>

        <div class="modal-body" style="overflow-y: auto; padding: 20px; background: #ffffff;">
          <!-- Top Header Strip with Emblem -->
          <div style="text-align: center; border-bottom: 2px solid #002B49; padding-bottom: 8px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 6px;">
              <img src="assets/emblem.png" style="height: 48px; object-fit: contain;" alt="National Emblem">
            </div>
            <div style="font-size: 13.5px; font-weight: 800; color: #002B49; letter-spacing: 0.5px;">GOVERNMENT OF INDIA &bull; भारत सरकार</div>
            <div style="font-size: 12px; font-weight: 700; color: #334155;">MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</div>
            <div style="font-size: 11px; font-weight: 700; color: #006699;">DEPARTMENT OF DEFENCE &bull; रक्षा विभाग &bull; SOUTH BLOCK, NEW DELHI - 110011</div>
            <div style="margin-top: 6px; background: #002B49; color: white; padding: 5px 12px; font-size: 12px; font-weight: 800; border-radius: 4px;">
              OFFICIAL MOVEMENT &amp; DEPLOYMENT DIRECTIVE &bull; ORDER NO: ${order.orderNo}
            </div>
          </div>

          <!-- Metadata Table -->
          <table class="gov-table mb-20" style="font-size: 11.5px;">
            <tbody>
              <tr>
                <td style="background: #f8fafc; font-weight: 700; width: 22%;">Order Reference</td>
                <td><code>${order.orderNo}</code></td>
                <td style="background: #f8fafc; font-weight: 700; width: 22%;">Date of Issue</td>
                <td><strong>${order.orderDate}</strong> (New Delhi)</td>
              </tr>
              <tr>
                <td style="background: #f8fafc; font-weight: 700;">Operation Codename</td>
                <td><strong style="color: #b91c1c;">${order.operationCodename}</strong></td>
                <td style="background: #f8fafc; font-weight: 700;">Issuing Ministry</td>
                <td>${order.ministry}, New Delhi</td>
              </tr>
              <tr>
                <td style="background: #f8fafc; font-weight: 700;">Commencement</td>
                <td><strong style="color: #166534;">${order.effectiveDate}</strong></td>
                <td style="background: #f8fafc; font-weight: 700;">End Date / Duration</td>
                <td><strong style="color: #b45309;">${order.endDate}</strong></td>
              </tr>
              <tr>
                <td style="background: #f8fafc; font-weight: 700;">Operational Location</td>
                <td colspan="3">
                  <span style="background: #fef2f2; color: #dc2626; font-weight: 800; padding: 3px 8px; border: 1px solid #fca5a5; border-radius: 4px;">
                    🔒 ${order.locationStatus}
                  </span>
                  <div style="font-size: 11px; color: #475569; margin-top: 4px;">
                    ${order.locationDisclosureNote}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Subject Banner -->
          <div style="background: #f8fafc; border-left: 4px solid #002B49; padding: 10px 14px; margin-bottom: 14px; font-size: 12px; line-height: 1.5;">
            <strong>SUBJECT:</strong> ${order.subject}
          </div>

          <!-- Operative Directives Narrative -->
          <div style="font-size: 11.5px; line-height: 1.7; color: #1e293b; text-align: justify; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0;">
              <strong>1. EXECUTIVE SANCTION:</strong> The President of India, through the Ministry of Defence, conveys operational sanction for the immediate constitution, mobilization, and deployment of a High-Level Strategic Joint Operational Task Force. The Task Force shall spearhead critical defence network hardening, tactical cyber intelligence operations, and tri-services command coordination under the direct oversight of the Chief of Defence Staff (CDS).
            </p>
            <p style="margin: 0 0 8px 0;">
              <strong>2. PERIOD &amp; DURATION:</strong> The operational deployment shall commence with immediate effect from <strong>${order.effectiveDate}</strong> and shall continue <strong>${order.endDate}</strong> until formal de-induction directives are promulgated by the Competent Authority.
            </p>
            <p style="margin: 0 0 8px 0;">
              <strong>3. RESTRICTED LOCATION DISCLOSURE MANDATE:</strong> In accordance with statutory provisions under the <em>Official Secrets Act, 1923</em>, <strong>the operational location coordinates and tactical objectives shall remain strictly classified</strong>. They will be revealed exclusively during the <strong>Apex Strategic In-Camera Briefing Meeting scheduled for 12-September-2026 at 14:00 Hrs (Day after Tomorrow) at Apex War Room, South Block, Ministry of Defence, New Delhi</strong> under the Chairmanship of General Anil Chauhan, CDS.
            </p>
          </div>

          <!-- Nominated Genuine Officers Table -->
          <div style="font-size: 12px; font-weight: 800; color: #002B49; margin-bottom: 6px;">
            👥 4. NOMINATED TASK FORCE OFFICERS &amp; OPERATIONAL CADRE:
          </div>

          <div class="gov-table-container mb-20">
            <table class="gov-table" style="font-size: 11px;">
              <thead>
                <tr>
                  <th style="width: 5%;">#</th>
                  <th style="width: 32%;">Officer Name &amp; Designation</th>
                  <th style="width: 33%;">Operational Role &amp; Assignment</th>
                  <th style="width: 30%;">Ministry / Department &amp; Station</th>
                </tr>
              </thead>
              <tbody>
                ${order.officers.map((off, idx) => `
                  <tr style="${off.empId === user.empId ? 'background: #eff6ff; font-weight: 700;' : ''}">
                    <td style="text-align: center; font-weight: 700;">${idx + 1}</td>
                    <td>
                      <strong style="color: #002B49;">${off.name}</strong><br>
                      <span style="font-size: 10px; color: #475569;">${off.designation}</span>
                      ${off.payLevel ? `<span style="display: inline-block; font-size: 9px; color: #1e3a8a; background: #e0f2fe; padding: 1px 5px; border-radius: 3px; margin-left: 4px; font-weight: 700;">${off.payLevel}</span>` : ''}
                    </td>
                    <td>
                      ${off.cadreLevel ? `<div style="font-size: 9.5px; font-weight: 700; color: #002B49; margin-bottom: 2px;">${off.cadreLevel}</div>` : ''}
                      <span style="color: #0f172a; font-weight: 600;">${off.roleInOperation}</span>
                    </td>
                    <td>
                      <span>${off.department}</span><br>
                      <span style="font-size: 10px; color: #64748b;">📍 ${off.station}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Signatures Box -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 10px; border-top: 1px solid #cbd5e1; margin-top: 10px;">
            <div style="font-size: 10px; color: #475569; line-height: 1.4;">
              <strong>Distribution List:</strong><br>
              1. All Nominated Task Force Officers<br>
              2. Chief of Defence Staff (CDS) Secretariat<br>
              3. Defence Secretary, Ministry of Defence<br>
              4. Cabinet Secretariat (Military Wing)<br>
              5. Prime Minister's Office (PMO)<br>
              6. Official Service Book of Shri Anurag Anil Bawaskar<br>
              7. Guard File &bull; Operation VAJRA-SHAKTI 2026
            </div>

            <div style="display: flex; gap: 14px; align-items: center; text-align: center;">
              
              <div style="border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 4px; background: #fafafa;">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 18px; color: #002B49;">Anil Chauhan</div>
                <strong style="font-size: 10px; color: #002B49;">General Anil Chauhan</strong><br>
                <span style="font-size: 9px; color: #475569;">Chief of Defence Staff (CDS)</span><br>
                <span style="color: #166534; font-size: 8.5px; font-weight: 800;">[COUNTERSIGNED]</span>
              </div>
              <div style="border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 4px; background: #fafafa;">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 18px; color: #002B49;">A. K. Chhapolia</div>
                <strong style="font-size: 10px; color: #002B49;">Shri Anil Kumar Chhapolia</strong><br>
                <span style="font-size: 9px; color: #475569;">Joint Secretary to Govt of India</span><br>
                <span style="color: #059669; font-size: 8.5px; font-weight: 800;">[DIGITALLY SANCTIONED]</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer" style="padding: 12px 20px; background: #f8fafc; border-top: 1px solid #cbd5e1; display: flex; justify-content: space-between;">
          <button class="btn btn-outline" id="btn-cancel-special-order-modal">Close</button>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-primary" id="btn-download-special-order-modal" style="display: flex; align-items: center; gap: 6px;">
              <span>📥</span> Download Certified Order (PDF / HTML)
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function attachDashboardEvents(container, state) {
  const user = state.currentUser;
  const order = state.specialOperationOrder;

  // Quick apply leave event if present
  const quickLeaveBtn = container.querySelector('#btn-quick-apply-leave');
  if (quickLeaveBtn) {
    quickLeaveBtn.addEventListener('click', () => {
      window.location.hash = '#leave';
      setTimeout(() => {
        const applyBtn = document.getElementById('btn-open-leave-modal');
        if (applyBtn) applyBtn.click();
      }, 100);
    });
  }

  // Special Operation Modal open/close events
  const modal = container.querySelector('#special-order-modal');
  const openBannerBtn = container.querySelector('#btn-view-special-order-banner');
  const openCirBtn = container.querySelector('#btn-view-special-order-cir');
  const closeBtn = container.querySelector('#btn-close-special-order-modal');
  const cancelBtn = container.querySelector('#btn-cancel-special-order-modal');

  const openModal = () => {
    if (modal) modal.classList.add('show');
  };
  const closeModal = () => {
    if (modal) modal.classList.remove('show');
  };

  if (openBannerBtn) openBannerBtn.addEventListener('click', openModal);
  if (openCirBtn) openCirBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  // Download Order PDF/HTML actions
  const triggerDownloadAction = () => {
    downloadSpecialOperationOrder(user, order);
  };

  const dlBannerBtn = container.querySelector('#btn-download-special-order-banner');
  const dlCirBtn = container.querySelector('#btn-download-special-order-cir');
  const dlModalBtn = container.querySelector('#btn-download-special-order-modal');
  const dlTransferBtn = container.querySelector('#btn-download-transfer-cir');

  if (dlBannerBtn) dlBannerBtn.addEventListener('click', triggerDownloadAction);
  if (dlCirBtn) dlCirBtn.addEventListener('click', triggerDownloadAction);
  if (dlModalBtn) dlModalBtn.addEventListener('click', triggerDownloadAction);
  if (dlTransferBtn) dlTransferBtn.addEventListener('click', () => downloadTransferOrder(user));

  // Initialize Dashboard Analytics Charts if Admin Role is active
  if (state.activeRole === 'ADMIN' && typeof document !== 'undefined' && document.getElementById) {
    setTimeout(() => {
      const cadreCtx = document.getElementById('cadre-chart');
      if (cadreCtx && window.Chart) {
        new Chart(cadreCtx, {
          type: 'doughnut',
          data: {
            labels: ['In-Position', 'Vacancies'],
            datasets: [{
              data: [1142, 138],
              backgroundColor: ['#166534', '#dc2626'],
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' },
              title: { display: true, text: 'Cadre Strength (Total 1,280)' }
            }
          }
        });
      }

      const leaveCtx = document.getElementById('leave-chart');
      if (leaveCtx && window.Chart) {
        new Chart(leaveCtx, {
          type: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              label: 'Leave Applications Processed',
              data: [320, 410, 290, 500],
              backgroundColor: '#0284c7'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: { display: true, text: 'Quarterly Leave Utilization Trend' }
            }
          }
        });
      }
    }, 200);
  }

  // Titan AI Chat Assistant Logic
  const aiInput = container.querySelector('#ai-chat-input');
  const aiSendBtn = container.querySelector('#btn-ai-send');
  const aiHistory = container.querySelector('#ai-chat-history');
  if (aiInput && aiSendBtn && aiHistory) {
    const handleAskAi = async () => {
      const query = aiInput.value.trim();
      if (!query) return;
      aiInput.value = '';
      
      aiHistory.innerHTML += `<div style="background: #eff6ff; padding: 8px 12px; border-radius: 8px; border-bottom-right-radius: 0; align-self: flex-end; color: #1e40af; margin-left: 20px;">${query}</div>`;
      aiHistory.scrollTop = aiHistory.scrollHeight;
      
      const typingId = 'typing-' + Date.now();
      aiHistory.innerHTML += `<div id="${typingId}" style="background: #f1f5f9; padding: 8px 12px; border-radius: 8px; border-bottom-left-radius: 0; color: #64748b; font-style: italic;">Titan AI is scanning GoI guidelines...</div>`;
      aiHistory.scrollTop = aiHistory.scrollHeight;

      try {
        const apiKey = localStorage.getItem('gemini_api_key') || 'AIzaSyDmuGktyOTVGfBdka1vp73hlU2HSxIgN44';
        const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            contents: [{
              parts: [{ text: "You are Titan AI, an official HR assistant for the Government of India, Ministry of Defence (e-HRMS 2.0). Answer concisely and professionally as a central government virtual assistant. Provide factual answers based on CCS Rules if applicable. User query: " + query }]
            }]
          })
        });
        
        const data = await res.json();
        document.getElementById(typingId)?.remove();
        
        let responseText = "Sorry, I could not process that request.";
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          responseText = data.candidates[0].content.parts[0].text;
        } else if (data.error) {
          responseText = "API Error: " + data.error.message;
        }
        
        responseText = responseText.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>').replace(/\\n/g, '<br>');
        
        aiHistory.innerHTML += `<div style="background: #f1f5f9; padding: 8px 12px; border-radius: 8px; border-bottom-left-radius: 0; margin-right: 20px; line-height: 1.4;">${responseText}</div>`;
        aiHistory.scrollTop = aiHistory.scrollHeight;
      } catch (e) {
        document.getElementById(typingId)?.remove();
        aiHistory.innerHTML += `<div style="background: #fef2f2; padding: 8px 12px; border-radius: 8px; border-bottom-left-radius: 0; color: #991b1b;">Connection Error: Could not reach AI service.</div>`;
        aiHistory.scrollTop = aiHistory.scrollHeight;
      }
    };

    aiSendBtn.addEventListener('click', handleAskAi);
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleAskAi();
    });
  }
}

