/**
 * e-HRMS 2.0 - Official Gazette Orders & Central Circulars Archive Module
 * Government of India - Department of Personnel & Training (DoPT) & Ministry of Defence
 */

import { store } from '../state.js';
import {
  downloadSpecialOperationOrder,
  downloadTransferOrder,
  downloadSecurityClearanceCertificate,
  downloadCtgSanctionOrder,
  downloadSpecialDutyAllowanceOrder,
  downloadWarRoomPass,
  EMBLEM_BASE64,
  DRDO_LOGO_BASE64,
  wrapGovDocument,
  generateESignature
} from '../downloader.js';

export function renderOrdersCirculars(container) {
  const state = store.get();
  const user = state.currentUser;
  const circulars = state.circulars || [];
  const order = state.specialOperationOrder;

  container.innerHTML = `
    <!-- Page Header Strip -->
    <div class="page-title-strip" style="background: linear-gradient(135deg, #002B49 0%, #004b80 100%); color: white; padding: 20px 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0, 43, 73, 0.15);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; gap: 18px; align-items: center;">
          <img src="${EMBLEM_BASE64}" alt="Satyameva Jayate" style="height: 75px; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4)) brightness(0) invert(1);">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 11.5px; font-weight: 700; color: #93c5fd; letter-spacing: 1px; text-transform: uppercase;">
              GOVERNMENT OF INDIA &bull; OFFICIAL REPOSITORY
            </div>
            <h1 style="margin: 4px 0 6px 0; font-size: 22px; font-weight: 800; color: #ffffff;">
              Gazette Orders &amp; Central Circulars Archive
            </h1>
            <div style="font-size: 12.5px; color: #e2e8f0;">
              Promulgated Directives, Relieving &amp; Posting Orders, Financial Sanctions, and Security Protocols for <strong>${user.name}</strong> (${user.classification})
            </div>
          </div>
        </div>

        <!-- Quick Download War Room Pass & Letterhead -->
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <a href="#letterhead" class="btn" style="background: #990000; color: white; border: none; font-weight: 700; font-size: 12px; padding: 8px 14px; display: flex; align-items: center; gap: 6px; border-radius: 4px; box-shadow: 0 2px 6px rgba(153, 0, 0, 0.4); text-decoration: none;">
            <span>✍️</span> Official Letterhead Studio
          </a>
          <button class="btn" id="btn-quick-war-room-pass" style="background: #dc2626; color: white; border: none; font-weight: 700; font-size: 12px; padding: 8px 14px; display: flex; align-items: center; gap: 6px; border-radius: 4px; box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4);">
            <span>🎫</span> Apex War Room Pass (12-Sep)
          </button>
          <button class="btn" id="btn-quick-security-clearance" style="background: #166534; color: white; border: none; font-weight: 700; font-size: 12px; padding: 8px 14px; display: flex; align-items: center; gap: 6px; border-radius: 4px;">
            <span>🛡️</span> Level-1 Clearance
          </button>
        </div>
      </div>

      <!-- Live Metadata Metric Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 18px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.15);">
        <div style="background: rgba(255, 255, 255, 0.08); padding: 10px 14px; border-radius: 6px;">
          <div style="font-size: 11px; color: #cbd5e1;">Total Promulgated Orders</div>
          <div style="font-size: 20px; font-weight: 800; color: #ffffff; margin-top: 2px;">${circulars.length} Documents</div>
        </div>
        <div style="background: rgba(255, 255, 255, 0.08); padding: 10px 14px; border-radius: 6px;">
          <div style="font-size: 11px; color: #cbd5e1;">Special Ops &amp; Defence</div>
          <div style="font-size: 20px; font-weight: 800; color: #fca5a5; margin-top: 2px;">
            ${circulars.filter(c => c.category === 'Special Operations & Defence').length} Directives
          </div>
        </div>
        <div style="background: rgba(255, 255, 255, 0.08); padding: 10px 14px; border-radius: 6px;">
          <div style="font-size: 11px; color: #cbd5e1;">Postings &amp; Transfers</div>
          <div style="font-size: 20px; font-weight: 800; color: #86efac; margin-top: 2px;">
            ${circulars.filter(c => c.category === 'Postings & Transfers').length} Gazette Orders
          </div>
        </div>
        <div style="background: rgba(255, 255, 255, 0.08); padding: 10px 14px; border-radius: 6px;">
          <div style="font-size: 11px; color: #cbd5e1;">Pay &amp; Allowances</div>
          <div style="font-size: 20px; font-weight: 800; color: #fde047; margin-top: 2px;">
            ${circulars.filter(c => c.category === 'Pay & Allowances').length} Sanctions
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Category Filters Bar -->
    <div class="gov-card mb-20" style="padding: 16px 20px;">
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 14px;">
        <div style="flex: 1; min-width: 280px; position: relative;">
          <input type="text" id="orders-search-input" class="form-control" placeholder="🔍 Search by Order No, keywords, subject, authority (e.g. 'DRDO', 'Pune', 'Bawaskar', 'DA', '53%')..." style="width: 100%; padding: 10px 14px; font-size: 13px; border: 1px solid #cbd5e1; border-radius: 6px;">
        </div>
        <div style="min-width: 200px;">
          <select id="orders-classification-filter" class="form-control" style="width: 100%; padding: 10px 12px; font-size: 12.5px; border: 1px solid #cbd5e1; border-radius: 6px;">
            <option value="ALL">All Classifications</option>
            <option value="TOP SECRET">TOP SECRET</option>
            <option value="OFFICIAL GAZETTE">OFFICIAL GAZETTE</option>
            <option value="FINANCIAL SANCTION">FINANCIAL SANCTION</option>
            <option value="RESTRICTED">RESTRICTED</option>
            <option value="PUBLIC OM">PUBLIC OM / CIRCULAR</option>
          </select>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="category-pills-container">
        <button class="btn btn-sm btn-category-pill active" data-category="ALL" style="border-radius: 20px; padding: 5px 14px; font-weight: 700; font-size: 12px;">
          All Directives (${circulars.length})
        </button>
        <button class="btn btn-sm btn-category-pill" data-category="Special Operations & Defence" style="border-radius: 20px; padding: 5px 14px; font-weight: 700; font-size: 12px;">
          🚨 Special Operations &amp; Defence (${circulars.filter(c => c.category === 'Special Operations & Defence').length})
        </button>
        <button class="btn btn-sm btn-category-pill" data-category="Postings & Transfers" style="border-radius: 20px; padding: 5px 14px; font-weight: 700; font-size: 12px;">
          🔄 Postings &amp; Transfers (${circulars.filter(c => c.category === 'Postings & Transfers').length})
        </button>
        <button class="btn btn-sm btn-category-pill" data-category="Pay & Allowances" style="border-radius: 20px; padding: 5px 14px; font-weight: 700; font-size: 12px;">
          💼 Pay &amp; Allowances (${circulars.filter(c => c.category === 'Pay & Allowances').length})
        </button>
        <button class="btn btn-sm btn-category-pill" data-category="Security & Vigilance" style="border-radius: 20px; padding: 5px 14px; font-weight: 700; font-size: 12px;">
          🛡️ Security &amp; Vigilance (${circulars.filter(c => c.category === 'Security & Vigilance').length})
        </button>
        <button class="btn btn-sm btn-category-pill" data-category="Service Rules & Welfare" style="border-radius: 20px; padding: 5px 14px; font-weight: 700; font-size: 12px;">
          🌴 Service Rules &amp; Welfare (${circulars.filter(c => c.category === 'Service Rules & Welfare').length})
        </button>
      </div>
    </div>

    <!-- Orders Cards Feed Container -->
    <div id="orders-feed-container" style="display: flex; flex-direction: column; gap: 14px;">
      <!-- Populated dynamically via renderOrdersFeed() -->
    </div>

    <!-- Gazette Document Reading Modal -->
    <div class="modal-backdrop" id="gazette-order-view-modal">
      <div class="modal-dialog" style="max-width: 820px; max-height: 90vh; display: flex; flex-direction: column;">
        <div class="modal-header" style="background: #002B49; color: white; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-weight: 800; font-size: 14px; display: flex; align-items: center; gap: 8px;">
            <span>🏛️</span> OFFICIAL GAZETTE NOTIFICATION &bull; GOVERNMENT OF INDIA
          </div>
          <button type="button" class="modal-close" id="btn-close-gazette-modal" style="color: white; background: transparent; border: none; font-size: 20px; cursor: pointer;">&times;</button>
        </div>

        <div class="modal-body" id="gazette-modal-content" style="padding: 24px 28px; overflow-y: auto; background: #ffffff;">
          <!-- Dynamically populated -->
        </div>

        <div class="modal-footer" style="background: #f8fafc; padding: 12px 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <button class="btn btn-outline" id="btn-print-gazette-modal" style="font-weight: 700; font-size: 12px;">
            🖨️ Print Gazette Notice
          </button>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" id="btn-dismiss-gazette-modal">Close</button>
            <button class="btn btn-primary" id="btn-download-from-gazette-modal" style="font-weight: 700; font-size: 12px;">
              📥 Download Certified Document
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // State filtering logic
  let activeCategory = 'ALL';
  let activeClassification = 'ALL';
  let searchQuery = '';
  let activeOrderForModal = null;

  const feedContainer = container.querySelector('#orders-feed-container');
  const searchInput = container.querySelector('#orders-search-input');
  const classFilter = container.querySelector('#orders-classification-filter');
  const categoryPills = container.querySelectorAll('.btn-category-pill');

  function getBadgeColor(classification) {
    switch (classification) {
      case 'TOP SECRET':
        return { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' };
      case 'OFFICIAL GAZETTE':
        return { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' };
      case 'FINANCIAL SANCTION':
        return { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' };
      case 'RESTRICTED':
        return { bg: '#fef3c7', text: '#b45309', border: '#fde68a' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
    }
  }

  function renderOrdersFeed() {
    const filtered = circulars.filter(cir => {
      // Category filter
      if (activeCategory !== 'ALL' && cir.category !== activeCategory) {
        return false;
      }
      // Classification filter
      if (activeClassification !== 'ALL' && cir.classification !== activeClassification) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (cir.title || '').toLowerCase().includes(q);
        const matchSubject = (cir.subject || '').toLowerCase().includes(q);
        const matchId = (cir.id || '').toLowerCase().includes(q);
        const matchAuth = (cir.authority || '').toLowerCase().includes(q);
        const matchCat = (cir.category || '').toLowerCase().includes(q);
        if (!matchTitle && !matchSubject && !matchId && !matchAuth && !matchCat) {
          return false;
        }
      }
      return true;
    });

    if (filtered.length === 0) {
      feedContainer.innerHTML = `
        <div style="background: white; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 40px; text-align: center; color: #64748b;">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <strong style="font-size: 15px; color: #334155;">No Gazette Orders Found</strong>
          <p style="margin: 4px 0 0 0; font-size: 12.5px;">No orders matched your search criteria ("${searchQuery}"). Try clearing the search or switching category filters.</p>
        </div>
      `;
      return;
    }

    feedContainer.innerHTML = filtered.map(cir => {
      const badge = getBadgeColor(cir.classification);
      return `
        <div class="gov-card" style="padding: 16px 20px; transition: all 0.2s; border-left: 5px solid ${cir.isSpecialOperation ? '#dc2626' : (cir.isTransferOrder ? '#16a34a' : '#002B49')};" id="card-${cir.id.replace(/[^a-zA-Z0-9]/g, '-')}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
            <div style="flex: 1; min-width: 300px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                <span style="background: ${badge.bg}; color: ${badge.text}; border: 1px solid ${badge.border}; font-size: 9.5px; font-weight: 800; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.5px;">
                  ${cir.classification}
                </span>
                <span style="font-size: 11px; font-weight: 700; color: #002B49; background: #f8fafc; border: 1px solid #e2e8f0; padding: 2px 8px; border-radius: 4px;">
                  📂 ${cir.category}
                </span>
                <span style="font-size: 11px; color: #64748b;">
                  🏛️ ${cir.authority}
                </span>
                ${cir.isNew ? '<span style="color: #dc2626; font-size: 10px; font-weight: 800;">[NEW]</span>' : ''}
              </div>

              <h3 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 800; color: ${cir.isSpecialOperation ? '#991b1b' : '#002B49'}; line-height: 1.4;">
                ${cir.title}
              </h3>

              <div style="font-size: 12px; color: #334155; line-height: 1.55; margin-bottom: 8px; text-align: justify;">
                ${cir.subject}
              </div>

              <div style="display: flex; gap: 14px; font-size: 11px; color: #64748b; flex-wrap: wrap;">
                <span>📅 Promulgated: <strong>${cir.date}</strong></span>
                <span>Order Ref: <code style="font-weight: 700; color: #002B49;">${cir.id}</code></span>
                <span>Document: <code>${cir.file}</code></span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-end; flex-shrink: 0;">
              <button class="btn btn-sm btn-outline btn-view-gazette" data-id="${cir.id}" style="font-size: 11.5px; padding: 5px 12px; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                <span>👁️</span> Read Notice
              </button>
              <button class="btn btn-sm btn-primary btn-download-gazette" data-id="${cir.id}" data-download="${cir.downloadType || ''}" style="font-size: 11.5px; padding: 5px 12px; font-weight: 700; display: flex; align-items: center; gap: 6px; background: ${cir.isSpecialOperation ? '#dc2626' : (cir.isTransferOrder ? '#16a34a' : '#002B49')}; border-color: ${cir.isSpecialOperation ? '#b91c1c' : (cir.isTransferOrder ? '#15803d' : '#002B49')};">
                <span>📥</span> Certified Order
              </button>
              ${cir.isSpecialOperation ? `
                <button class="btn btn-sm btn-outline btn-pass-quick" style="font-size: 10.5px; padding: 4px 10px; font-weight: 700; color: #991b1b; border-color: #fca5a5;">
                  🎫 War Room Pass
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    attachFeedEventListeners();
  }

  function attachFeedEventListeners() {
    // Read Gazette View Modal
    feedContainer.querySelectorAll('.btn-view-gazette').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const found = circulars.find(c => c.id === id);
        if (found) openGazetteModal(found);
      });
    });

    // Certified Download Buttons
    feedContainer.querySelectorAll('.btn-download-gazette').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const downloadType = btn.getAttribute('data-download');
        triggerDocumentDownload(id, downloadType);
      });
    });

    // War room pass buttons
    feedContainer.querySelectorAll('.btn-pass-quick').forEach(btn => {
      btn.addEventListener('click', () => downloadWarRoomPass(user, order));
    });
  }

  function triggerDocumentDownload(orderId, downloadType) {
    if (downloadType === 'specialOrder' || orderId === 'MoD/DoD/OPS-SPL/2026/8104-SEC') {
      downloadSpecialOperationOrder(user, order);
    } else if (downloadType === 'transferOrder' || orderId === 'MoD/DRDO/TRF/2026/102') {
      downloadTransferOrder(user);
    } else if (downloadType === 'securityClearance' || orderId === 'MoD/SEC-VET/2026/A-01') {
      downloadSecurityClearanceCertificate(user);
    } else if (downloadType === 'ctgOrder' || orderId === 'MoD/DRDO/CTG/2026/44') {
      downloadCtgSanctionOrder(user);
    } else if (downloadType === 'specialDutyAllowance' || orderId === 'MoD/FIN/SDA/2026/89') {
      downloadSpecialDutyAllowanceOrder(user);
    } else {
      // Generic certified Gazette OM HTML generation
      const cir = circulars.find(c => c.id === orderId);
      if (!cir) return;
      downloadGenericGazetteOrder(user, cir);
    }
  }

  function downloadGenericGazetteOrder(user, cir) {
    let ministryStr = 'MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय';
    if (cir.authority.toLowerCase().includes('home affairs')) {
      ministryStr = 'MINISTRY OF HOME AFFAIRS &bull; गृह मंत्रालय';
    } else if (cir.authority.toLowerCase().includes('personnel')) {
      ministryStr = 'MINISTRY OF PERSONNEL &bull; कार्मिक मंत्रालय';
    }
    
    const body = `
      <div class="doc-header">
        <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 6px;">
          <img src="${EMBLEM_BASE64}" alt="State Emblem of India" style="width: 44px; height: 68px; object-fit: contain;">
        </div>
        <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
        <h3>${ministryStr}</h3>
        <h4>${cir.authority.toUpperCase()}</h4>
        <div class="doc-title-strip" style="background: linear-gradient(90deg, #002B49, #004b80); color: #ffffff; padding: 6px 12px; margin-top: 8px; font-weight: 800; font-size: 11.5px;">
          OFFICIAL GAZETTE NOTIFICATION &bull; ORDER REF NO: ${cir.id}
        </div>
      </div>

      <table class="meta-table" style="margin-top: 10px;">
        <tr>
          <td class="meta-label">Reference No:</td>
          <td class="meta-val"><code>${cir.id}</code></td>
          <td class="meta-label">Date of Promulgation:</td>
          <td class="meta-val"><strong>${cir.date}</strong></td>
        </tr>
        <tr>
          <td class="meta-label">Subject:</td>
          <td class="meta-val" colspan="3"><strong>${cir.title}</strong></td>
        </tr>
        <tr>
          <td class="meta-label">Classification:</td>
          <td class="meta-val"><strong>${cir.classification}</strong></td>
          <td class="meta-label">Issuing Authority:</td>
          <td class="meta-val">${cir.authority}</td>
        </tr>
      </table>

      <div style="font-size: 12px; line-height: 1.8; margin: 16px 0; color: #1e293b; text-align: justify;">
        <p style="margin: 0 0 10px 0;"><strong>OPERATIVE SANCTION &amp; NOTIFICATION:</strong></p>
        <p style="margin: 0 0 10px 0;">${cir.subject}</p>
        <p style="margin: 0 0 10px 0;">
          All concerned Ministries, Attached Formations, and Officers are directed to comply with the stipulations contained herein with immediate effect.
        </p>
      </div>

      <div class="sig-block" style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 12px;">
        <div style="font-size: 10px; color: #64748b; line-height: 1.5;">
          Archived in Central e-HRMS 2.0 Repository &bull; Certified True Copy<br>
          Official Secrets Act 1923 &bull; Digital Token: <code>eHRMS-MOD-GAZETTE-SEC</code>
        </div>
        <div style="display: flex; align-items: center; gap: 14px;">
          <div class="sig-box">
            <strong style="color: #002B49; font-size: 11px;">Competent Authority</strong><br>
            <span style="font-size: 9.5px; color: #475569;">${cir.authority}</span><br>
            <span style="color: #059669; font-weight: 700; font-size: 9px;">[DIGITALLY SIGNED VIA NIC-DSC]</span>
          </div>
        </div>
      </div>
    `;

    const fullHtml = wrapGovDocument(cir.id, body, false);
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Gazette_Order_${cir.id.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Modal Open Handler
  const modalEl = container.querySelector('#gazette-order-view-modal');
  const modalContentEl = container.querySelector('#gazette-modal-content');
  const btnCloseModal = container.querySelector('#btn-close-gazette-modal');
  const btnDismissModal = container.querySelector('#btn-dismiss-gazette-modal');
  const btnDownloadModal = container.querySelector('#btn-download-from-gazette-modal');
  const btnPrintModal = container.querySelector('#btn-print-gazette-modal');

  function openGazetteModal(cir) {
    activeOrderForModal = cir;
    const badge = getBadgeColor(cir.classification);

    modalContentEl.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid #002B49; padding-bottom: 12px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 8px;">
          <img src="assets/emblem.png" alt="National Emblem" style="height: 58px; width: auto; object-fit: contain;">
        </div>
        <div style="font-size: 13px; font-weight: 800; color: #002B49; letter-spacing: 0.5px;">GOVERNMENT OF INDIA &bull; भारत सरकार</div>
        <div style="font-size: 12px; font-weight: 700; color: #475569;">MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</div>
        <div style="font-size: 11px; font-weight: 600; color: #006699;">${cir.authority.toUpperCase()}</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 2px;">CENTRAL SECRETARIAT / SOUTH BLOCK, NEW DELHI</div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
        <div>
          <span style="font-size: 11px; color: #64748b;">ORDER REFERENCE:</span><br>
          <code style="font-size: 14px; font-weight: 800; color: #002B49;">${cir.id}</code>
        </div>
        <div>
          <span style="background: ${badge.bg}; color: ${badge.text}; border: 1px solid ${badge.border}; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 4px;">
            ${cir.classification}
          </span>
        </div>
      </div>

      <div style="background: #f8fafc; border-left: 4px solid #002B49; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; line-height: 1.5;">
        <strong>SUBJECT:</strong> ${cir.title}
      </div>

      <div style="font-size: 12px; line-height: 1.75; color: #1e293b; text-align: justify; margin-bottom: 20px;">
        <p style="margin: 0 0 10px 0;"><strong>1. OPERATIVE DIRECTIVE:</strong></p>
        <p style="margin: 0 0 10px 0;">${cir.subject}</p>
        <p style="margin: 0 0 10px 0;">
          <strong>2. APPLICABILITY &amp; STATUTORY COMPLIANCE:</strong> All provisions under this directive are promulgated under the Central Civil Services Rules and Ministry of Defence Security Protocols. Shri Anurag Anil Bawaskar (Group 'A' Gazetted Officer) and associated cadre controllers shall ensure compliance.
        </p>
      </div>

      <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #64748b;">
        <div>
          Promulgated: ${cir.date}<br>
          Digitally Authenticated via e-HRMS 2.0 Central Repository &bull; MoD
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          
          ${generateESignature('Competent Authority', cir.authority)}
        </div>
      </div>
    `;

    if (modalEl) modalEl.classList.add('show');
  }

  function closeGazetteModal() {
    if (modalEl) modalEl.classList.remove('show');
    activeOrderForModal = null;
  }

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeGazetteModal);
  if (btnDismissModal) btnDismissModal.addEventListener('click', closeGazetteModal);
  if (btnDownloadModal) {
    btnDownloadModal.addEventListener('click', () => {
      if (activeOrderForModal) {
        triggerDocumentDownload(activeOrderForModal.id, activeOrderForModal.downloadType);
      }
    });
  }
  if (btnPrintModal) {
    btnPrintModal.addEventListener('click', () => {
      window.print();
    });
  }

  // Quick action buttons in title strip
  const btnQuickWarRoom = container.querySelector('#btn-quick-war-room-pass');
  if (btnQuickWarRoom) {
    btnQuickWarRoom.addEventListener('click', () => downloadWarRoomPass(user, order));
  }
  const btnQuickSecurity = container.querySelector('#btn-quick-security-clearance');
  if (btnQuickSecurity) {
    btnQuickSecurity.addEventListener('click', () => downloadSecurityClearanceCertificate(user));
  }

  // Filter interaction listeners
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => {
        p.classList.remove('active');
        p.style.background = '';
        p.style.color = '';
      });
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderOrdersFeed();
    });
  });

  if (classFilter) {
    classFilter.addEventListener('change', (e) => {
      activeClassification = e.target.value;
      renderOrdersFeed();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderOrdersFeed();
    });
  }

  // Initial render of orders
  renderOrdersFeed();
}
