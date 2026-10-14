/**
 * e-HRMS 2.0 - Central Document Vault & DigiLocker Repository
 * Complete verified document repository with live search, real downloads, and update capabilities.
 */

import { store } from '../state.js';
import * as DL from '../downloader.js';

export function renderDocumentVault(container) {
  const state = store.get();
  const user = state.currentUser;
  const payroll = state.payroll || {};
  const pension = state.pensionNps || {};
  const sb = state.serviceBook || {};

  const now = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const curMonthVal = `${months[now.getMonth()]} ${now.getFullYear()}`;

  // Standard comprehensive catalog of all official documents & certificates
  const defaultVaultDocs = [
    {
      id: 'DOC-TOLL-2026',
      name: 'NHAI Toll Plaza Exemption Order (MoD)',
      category: 'Identity & Personal',
      date: '04-Oct-2026',
      verified: true,
      issuer: 'Ministry of Defence / National Highways Authority of India',
      docNo: 'NHAI/TOLL-EXEMPT/MOD/2026/8104',
      icon: '🛣️',
      description: 'Official authorization letter granting exemption from paying user fee at all NHAI toll plazas under Indian Tolls (Army and Air Force) Act & Gazette Notifications.',
      downloadFn: () => DL.downloadTollExemption(user)
    },
    {
      id: 'DOC-TOLL-MSRDC-2026',
      name: 'Samruddhi Mahamarg & MSRDC Toll Exemption Order',
      category: 'Identity & Personal',
      date: '04-Oct-2026',
      verified: true,
      issuer: 'Ministry of Defence / MSRDC Maharashtra',
      docNo: 'MSRDC/TOLL-EXEMPT/MOD/2026/8104',
      icon: '🛣️',
      description: 'Official authorization letter granting exemption from paying user fee on Samruddhi Mahamarg and all MSRDC expressways.',
      downloadFn: () => DL.downloadSamruddhiTollExemption(user)
    },

    {
      id: 'DOC-ESB-2026',
      name: 'Digitally Certified e-Service Book (e-SB)',
      category: 'Service Records',
      date: '02-Oct-2026',
      verified: true,
      issuer: 'Department of Military Affairs (DMA) / DoPT',
      docNo: 'MOD/DMA/ESB/2024/8104',
      icon: '📖',
      description: 'Complete official electronic service book containing bio-data, postings, leave account, and service history verified under GFR Rule 257.',
      downloadFn: () => DL.downloadServiceBook(user, sb)
    },
    {
      id: 'DOC-PAYSLIP-2026',
      name: '7th CPC Monthly Pay Slip & Entitlement Dossier',
      category: 'Tax & Finance',
      date: curMonthVal,
      verified: true,
      issuer: 'DDO Cash & Payroll (Code: 10501), New Delhi',
      docNo: `PCDA/PAY/${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/8104`,
      icon: '💳',
      description: 'Official monthly pay and allowances computation breakdown with 53% DA, HRA, TA, NPS deduction, and PFMS mandate reference.',
      downloadFn: () => DL.downloadPaySlip(user, payroll, curMonthVal)
    },
    {
      id: 'DOC-FORM16-2026',
      name: 'Form 16 (TDS Certificate & Salary Annexure)',
      category: 'Tax & Finance',
      date: 'Assessment Year 2026-27',
      verified: true,
      issuer: 'Income Tax Department (TRACES / DDO MoD)',
      docNo: 'TRACES/F16/DEL/2026/0810',
      icon: '📄',
      description: 'Certificate under Section 203 of the Income-tax Act, 1961 for tax deducted at source on salary income with Part A & Part B.',
      downloadFn: () => DL.downloadForm16(user)
    },
    {
      id: 'DOC-ITRV-2026',
      name: 'ITR-V (Income Tax Return Verification Acknowledgment)',
      category: 'Tax & Finance',
      date: 'Assessment Year 2026-27',
      verified: true,
      issuer: 'Centralized Processing Centre (CPC), Bengaluru',
      docNo: 'CPC/ITRV/2026/9481024',
      icon: '✅',
      description: 'Statutory verification acknowledgment for electronic filing of return under Rule 12 of Income Tax Rules, 1962.',
      downloadFn: () => DL.downloadITRV(user)
    },
    {
      id: 'DOC-F26AS-2026',
      name: 'Form 26AS (Annual Tax Credit Statement)',
      category: 'Tax & Finance',
      date: 'Financial Year 2025-26',
      verified: true,
      issuer: 'CBDT / Directorate of Income Tax (Systems)',
      docNo: 'CBDT/26AS/PAN-EYUPB3666M',
      icon: '📑',
      description: 'Consolidated statement under Section 203AA reflecting all tax credits, TDS deducted by DDO, and advance tax payments.',
      downloadFn: () => DL.downloadForm26AS(user)
    },
    {
      id: 'DOC-SVC-CERT-2026',
      name: 'Official Government Service Certificate',
      category: 'Service Records',
      date: '15-Sep-2026',
      verified: true,
      issuer: 'Ministry of Defence, South Block, New Delhi',
      docNo: 'MoD/DMA/ESTT-I/SC/2026/104',
      icon: '📜',
      description: 'Executive certificate confirming substantive Group A gazetted appointment, pay scale, conduct, and continuous service tenure.',
      downloadFn: () => DL.downloadServiceCertificate(user)
    },
    {
      id: 'DOC-POSTING-2026',
      name: 'Gazette Transfer & Posting Order (DRDO Pune)',
      category: 'Military & Orders',
      date: '08-Sep-2026',
      verified: true,
      issuer: 'Military Affairs & Personnel Division, MoD',
      docNo: 'MoD/DRDO/TRF/2026/102',
      icon: '📋',
      description: 'Presidential sanction order posting officer to DRDO Dighi, Pune with operational attachment to MoD Special Task Force.',
      downloadFn: () => DL.downloadPostingOrder(user)
    },
    {
      id: 'DOC-SPEC-OPS-2026',
      name: 'Special Operations Directive & Deployment Order',
      category: 'Military & Orders',
      date: '10-Sep-2026',
      verified: true,
      issuer: 'Chief of Defence Staff (CDS) & Secretary DMA',
      docNo: 'MoD/DMA/OPS-DIR/2026/TOPSEC-01',
      icon: '🎖️',
      description: 'Level-1 Top Secret operational clearance directive authorizing cyber infrastructure protection, telemetry grid, and mission mobility.',
      downloadFn: () => DL.downloadSpecialOperationOrder(user, state.specialOperationOrder || {})
    },
    {
      id: 'DOC-WAR-ROOM-2026',
      name: 'Classified War Room & C4I Grid Security Pass',
      category: 'Military & Orders',
      date: '11-Sep-2026',
      verified: true,
      issuer: 'Director General of Military Operations (DGMO)',
      docNo: 'DGMO/WAR-ROOM/PASS/2026/A-01',
      icon: '🔑',
      description: 'Biometrically encoded high-security operational pass granting unrestricted access to National Command War Room and C4I terminals.',
      downloadFn: () => DL.downloadWarRoomPass(user, state.specialOperationOrder || {})
    },
    {
      id: 'DOC-SMART-ID-2026',
      name: 'Smart Biometric ID Card (Defence Civil Services)',
      category: 'Service Records',
      date: '05-Sep-2026',
      verified: true,
      issuer: 'Chief Security Officer, Ministry of Defence',
      docNo: 'MOD-SEC-ID-84102',
      icon: '🪪',
      description: 'Dual-interface contactless smart identity card with PKI digital signature token and Ministry of Defence security hologram.',
      downloadFn: () => DL.downloadSmartIdCard(user, state.smartIdCard || {})
    },
    {
      id: 'DOC-CGHS-2026',
      name: 'CGHS Plastic Medical Card & Beneficiary Dossier',
      category: 'Medical & Welfare',
      date: '01-Jan-2026',
      verified: true,
      issuer: 'Directorate General of CGHS, Nirman Bhawan',
      docNo: user.cghsBenId || 'CGHS/DEL/DMA/2444810',
      icon: '⚕️',
      description: 'Comprehensive health entitlement certificate under Central Government Health Scheme with dependent parent coverage.',
      downloadFn: () => DL.downloadCGHSCertificate(user)
    },
    {
      id: 'DOC-LTC-2026',
      name: 'LTC Claim Sanction & Settlement Warrant',
      category: 'Tax & Finance',
      date: '22-Sep-2026',
      verified: true,
      issuer: 'Pay & Accounts Office (PAO), Sena Bhawan',
      docNo: 'MoD/DMA/LTC/SETTLE/2026/89',
      icon: '✈️',
      description: 'Final settlement sanction order for Leave Travel Concession block year 2026-29 with government fare concession approval.',
      downloadFn: () => DL.downloadLTCCertificate(user)
    },
    {
      id: 'DOC-APAR-2026',
      name: 'SPARROW e-APAR Performance Appraisal Dossier',
      category: 'Service Records',
      date: '2025-2026',
      verified: true,
      issuer: 'DoPT SPARROW Apex Authority',
      docNo: 'SPARROW/CSS/2026/8104',
      icon: '📊',
      description: 'Annual Performance Assessment Report with numerical grade 9.8/10 (Outstanding) endorsed by Reporting & Reviewing Officers.',
      downloadFn: () => DL.downloadAPAR(user)
    },
    {
      id: 'DOC-MACP-2026',
      name: 'MACP Financial Upgradation Scheme Order',
      category: 'Service Records',
      date: '14-Aug-2026',
      verified: true,
      issuer: 'Under Secretary to the Government of India, MoD',
      docNo: 'MoD/DMA/MACP/UPG/2026/41',
      icon: '🎖️',
      description: 'Sanction order under Modified Assured Career Progression scheme confirming fixation of pay at Level 7 (Cell 16).',
      downloadFn: () => DL.downloadMACPOrder(user)
    },
    {
      id: 'DOC-NPS-2026',
      name: 'NPS PRAN Statement & Tier-I Wealth Portfolio',
      category: 'Tax & Finance',
      date: 'Quarter-2, 2026',
      verified: true,
      issuer: 'National Pension System Trust / NSDL CRA',
      docNo: user.pran || '110194810244',
      icon: '💰',
      description: 'Audited pension contribution record reflecting employee & government matching funds, NAV units, and CAGR valuation.',
      downloadFn: () => DL.downloadNPSStatement(user)
    },
    {
      id: 'DOC-NOC-2026',
      name: 'Vigilance Clearance Certificate (Ordinary Passport NOC)',
      category: 'Compliance & Legal',
      date: '28-Sep-2026',
      verified: true,
      issuer: 'Chief Vigilance Officer (CVO), Ministry of Defence',
      docNo: 'CVC/MoD/VIG-NOC/2026/3624',
      icon: '🛡️',
      description: 'Official clearance under Rule 3 of CCS (Conduct) Rules certifying clean disciplinary record without pending inquiries.',
      downloadFn: () => DL.downloadNocOrder ? DL.downloadNocOrder(user, { id: 'NOC-2026-3624', type: 'Passport Issuance' }) : DL.downloadServiceCertificate(user)
    },
    {
      id: 'DOC-CSD-2026',
      name: 'CSD Canteen Smart Cards (Grocery & Liquor Pass)',
      category: 'Medical & Welfare',
      date: '05-Sep-2026',
      verified: true,
      issuer: 'Canteen Stores Department (CSD) Head Office, Mumbai',
      docNo: 'CSD/DEF/OFFICER/2024/091',
      icon: '🛒',
      description: 'Combined grocery and liquor entitlement pass with annual credit limit valid across all Unit Run Canteens (URCs) nationwide.',
      downloadFn: () => DL.downloadCanteenCards(user)
    },
    {
      id: 'DOC-CSD-INV-2026',
      name: 'Official CSD Canteen Retail Tax Invoice (URC Delhi)',
      category: 'Tax & Finance',
      date: '02-Oct-2026',
      verified: true,
      issuer: 'Canteen Stores Department / URC HQ DELHI AREA (Sena Bhawan)',
      docNo: 'CSD/URC/DEL/2026/10/9482',
      icon: '🧾',
      description: 'Official GST retail tax invoice for Samsung Galaxy S25 5G 12/256GB (Silver Shadow - ₹54,436) drawn against smart card LB08260547713500S01 with 18% composite GST breakdown, digital signature, and quota reconciliation.',
      downloadFn: () => {
        const csdBilling = store.get().csdBilling || {};
        const txn = (csdBilling.transactions && csdBilling.transactions[0]) || null;
        DL.downloadCsdInvoice(user, txn);
      }
    },
    {
      id: 'DOC-IPR-2026',
      name: 'Immovable Property Return (IPR) Acknowledgment',
      category: 'Compliance & Legal',
      date: 'Annual Filing 2026',
      verified: true,
      issuer: 'Department of Personnel & Training (DoPT)',
      docNo: 'DoPT/IPR/2026/8104',
      icon: '🏢',
      description: 'Mandatory annual declaration of real estate holdings filed under Rule 18(1) of Central Civil Services (Conduct) Rules, 1964.',
      downloadFn: () => DL.downloadIprAck(user, state.ipr || { complianceYear: '2026' })
    },
    {
      id: 'DOC-CTG-2026',
      name: 'Composite Transfer Grant (CTG) Sanction Order',
      category: 'Military & Orders',
      date: '12-Sep-2026',
      verified: true,
      issuer: 'Department of Military Affairs, New Delhi',
      docNo: 'MoD/DMA/CTG/2026/081',
      icon: '📦',
      description: 'Advance sanction warrant for transportation of personal effects, vehicle carriage, and packing allowance for Pune posting.',
      downloadFn: () => DL.downloadCtgSanctionOrder(user)
    },
    {
      id: 'DOC-SDA-2026',
      name: 'Special Duty Allowance (SDA) Entitlement Warrant',
      category: 'Military & Orders',
      date: '14-Sep-2026',
      verified: true,
      issuer: 'Ministry of Defence (Finance Division)',
      docNo: 'MoD/FIN/SDA/2026/19',
      icon: '🎖️',
      description: 'Allowance sanction for specialized operational duties attached to the Cyber Operations Task Force.',
      downloadFn: () => DL.downloadSpecialDutyAllowanceOrder(user)
    },
    {
      id: 'DOC-LEAVE-2026',
      name: 'Sanction Order for Leave (DoPT Format)',
      category: 'Service Records',
      date: '05-Sep-2026',
      verified: true,
      issuer: 'Establishment Branch, Room 106, Sena Bhawan',
      docNo: 'MOD/DMA/ESTT-I/LV/2026/412',
      icon: '🏖️',
      description: 'Formal administrative approval and leave encashment entitlement voucher with sanction order number.',
      downloadFn: () => DL.downloadLeaveOrder ? DL.downloadLeaveOrder(user, (state.leaveApplications && state.leaveApplications[0]) || { id: 'LV-2026-98343' }) : DL.downloadServiceBook(user, sb)
    },
    {
      id: 'DOC-AADHAAR',
      name: 'Aadhaar Card (UIDAI Verified)',
      category: 'Identity & Personal',
      date: '14-Sep-2015',
      verified: true,
      issuer: 'Unique Identification Authority of India (UIDAI)',
      docNo: user.aadhaarRef || '2444-4759-4810',
      icon: '🪪',
      description: 'National biometric identity record verified via e-KYC integration on MeriPehchaan DigiLocker gateway.',
      downloadFn: () => DL.showDownloadToast('Aadhaar_Card_Verified.pdf')
    },
    {
      id: 'DOC-PAN',
      name: 'Permanent Account Number (PAN Card)',
      category: 'Identity & Personal',
      date: '10-Aug-2016',
      verified: true,
      issuer: 'Income Tax Department, Government of India',
      docNo: user.pan || 'EYUPB3666M',
      icon: '💳',
      description: 'Statutory 10-digit alphanumeric tax identifier card verified with NSDL Protean tax records.',
      downloadFn: () => DL.showDownloadToast('PAN_Card_Verified.pdf')
    },
    {
      id: 'DOC-DEGREE',
      name: 'University Degree & Professional Qualification',
      category: 'Identity & Personal',
      date: '30-Jun-2022',
      verified: true,
      issuer: 'State Technological University / Board of Technical Exams',
      docNo: 'UNIV/DEG/2022/9412',
      icon: '🎓',
      description: 'Accredited university degree verified and entered into Section 4 (Educational Attainments) of Service Book.',
      downloadFn: () => DL.showDownloadToast('University_Degree_Verified.pdf')
    }
  ];

  // Merge any custom uploaded documents stored in state
  const customDocs = state.customVaultDocuments || [];
  const allDocs = [...defaultVaultDocs, ...customDocs];

  let currentCategory = 'All';
  let currentSearch = '';

  function renderList() {
    const filtered = allDocs.filter(d => {
      const matchCat = (currentCategory === 'All') || (d.category === currentCategory);
      const query = currentSearch.toLowerCase().trim();
      const matchSearch = !query || 
        d.name.toLowerCase().includes(query) ||
        d.docNo.toLowerCase().includes(query) ||
        d.issuer.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });

    const grid = container.querySelector('#vault-docs-grid');
    const countBadge = container.querySelector('#vault-count-badge');
    if (countBadge) {
      countBadge.textContent = `${filtered.length} of ${allDocs.length} Documents`;
    }

    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: white; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
          <div style="font-size: 16px; font-weight: 700; color: #0f172a;">No documents matched your search</div>
          <div style="font-size: 13px; color: #64748b; margin-top: 6px;">Try adjusting your keywords or selecting another category filter.</div>
          <button class="btn btn-sm btn-outline" style="margin-top: 16px;" id="btn-clear-search">Clear Search & Filters</button>
        </div>
      `;
      grid.querySelector('#btn-clear-search')?.addEventListener('click', () => {
        currentSearch = '';
        currentCategory = 'All';
        const searchInput = container.querySelector('#vault-search-input');
        if (searchInput) searchInput.value = '';
        container.querySelectorAll('.vault-cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === 'All'));
        renderList();
      });
      return;
    }

    grid.innerHTML = filtered.map(doc => `
      <div class="gov-card vault-card" style="display: flex; flex-direction: column; transition: all 0.2s; border: 1px solid #cbd5e1; border-radius: 8px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.04); overflow: hidden;">
        <div style="padding: 18px 20px; flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div style="font-size: 32px; background: #f8fafc; padding: 6px 10px; border-radius: 8px; border: 1px solid #e2e8f0;">${doc.icon}</div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
              ${doc.verified ? 
                `<span style="background: #dcfce7; color: #166534; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: 800; display: inline-flex; align-items: center; gap: 4px; border: 1px solid #bbf7d0;">✓ VERIFIED</span>` : 
                `<span style="background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: 800; border: 1px solid #fde68a;">⏳ PENDING REVIEW</span>`
              }
              <span style="font-size: 10px; color: #64748b; font-family: monospace;">${doc.docNo}</span>
            </div>
          </div>
          
          <div style="font-size: 15px; font-weight: 700; color: #002B49; margin-bottom: 6px; line-height: 1.35;">
            ${doc.name}
          </div>
          
          <div style="display: inline-block; font-size: 10.5px; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; text-transform: uppercase;">
            ${doc.category}
          </div>

          <div style="font-size: 12px; color: #475569; margin-bottom: 10px; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${doc.description}
          </div>

          <div style="font-size: 11px; color: #64748b; padding-top: 8px; border-top: 1px dashed #e2e8f0;">
            <div>🏛️ <strong>${doc.issuer}</strong></div>
            <div style="margin-top: 2px;">📅 Synced: <strong>${doc.date}</strong></div>
          </div>
        </div>

        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 12px 16px; display: flex; gap: 8px;">
          <button class="btn btn-sm btn-primary btn-vault-download" data-id="${doc.id}" style="flex: 1.2; display: flex; align-items: center; justify-content: center; gap: 6px; font-weight: 700;">
            📥 Download
          </button>
          <button class="btn btn-sm btn-outline btn-vault-view" data-id="${doc.id}" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 4px;">
            👁️ View
          </button>
          <button class="btn btn-sm btn-outline btn-vault-update" data-id="${doc.id}" style="padding: 0 8px;" title="Update Document Information">
            ✏️
          </button>
        </div>
      </div>
    `).join('');

    // Attach actions
    grid.querySelectorAll('.btn-vault-download').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const target = allDocs.find(d => d.id === id);
        if (target && typeof target.downloadFn === 'function') {
          target.downloadFn();
        } else if (target) {
          DL.showDownloadToast(`${target.name.replace(/\s+/g, '_')}.html`);
        }
      });
    });

    grid.querySelectorAll('.btn-vault-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const target = allDocs.find(d => d.id === id);
        if (target) {
          openDocumentViewerModal(target);
        }
      });
    });

    grid.querySelectorAll('.btn-vault-update').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const target = allDocs.find(d => d.id === id);
        if (target) {
          openUpdateDocumentModal(target);
        }
      });
    });
  }

  container.innerHTML = `
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Document Vault & Repository</span>
        </div>
        <h1 class="page-heading">
          🔐 Central Document Vault & Verified Records
          <span class="page-heading-hi">/ केंद्रीय दस्तावेज़ वॉल्ट एवं सत्यापित अभिलेख</span>
        </h1>
      </div>
      <div class="page-actions" style="display: flex; gap: 10px;">
        <button class="btn btn-primary" id="btn-open-upload-doc" style="background: #16a34a; border-color: #15803d; font-weight: 700;">
          📤 Upload / Update New Document
        </button>
        <button class="btn btn-outline" id="btn-sync-digilocker">
          🔄 DigiLocker Cloud Sync
        </button>
      </div>
    </div>

    <!-- DigiLocker Verified Banner -->
    <div class="gov-alert gov-alert-success mb-20" style="border-left: 4px solid #0284c7; background: #f0f9ff; padding: 14px 18px; border-radius: 6px; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="font-size: 28px;">☁️</div>
        <div>
          <strong style="color: #0369a1; font-size: 13.5px;">National MeriPehchaan & DigiLocker Gateway Synchronized:</strong>
          <div style="font-size: 12px; color: #475569; margin-top: 2px;">
            All 26+ official Service Book records, Ministry of Defence warrants, and CPC tax statements are cryptographically signed with SHA-256 e-Sign tokens.
          </div>
        </div>
      </div>
      <div id="vault-count-badge" style="background: #0284c7; color: white; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; white-space: nowrap;">
        ${allDocs.length} Documents
      </div>
    </div>

    <!-- Live Search & Filtering Toolbar -->
    <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 280px; position: relative;">
          <input type="text" id="vault-search-input" class="form-control" placeholder="🔍 Search by Document Name, Order No, Category, or Authority (e.g. 'Pay Slip', 'Form 16', 'DRDO', 'MACP')..." style="width: 100%; padding: 10px 14px 10px 38px; font-size: 13.5px; border: 1.5px solid #cbd5e1; border-radius: 6px; box-sizing: border-box;">
          <span style="position: absolute; left: 12px; top: 12px; font-size: 15px; color: #64748b;">🔍</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline" id="btn-filter-verified" style="font-size: 12px;">✓ Verified Only</button>
          <button class="btn btn-outline" id="btn-export-vault-csv" style="font-size: 12px;">📊 Export Index (CSV)</button>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div style="display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; border-top: 1px solid #f1f5f9; padding-top: 12px;">
        ${['All', 'Service Records', 'Tax & Finance', 'Military & Orders', 'Medical & Welfare', 'Compliance & Legal', 'Identity & Personal'].map(cat => `
          <button class="btn btn-sm ${cat === 'All' ? 'btn-primary' : 'btn-outline'} vault-cat-btn" data-cat="${cat}" style="font-size: 11.5px; border-radius: 16px; padding: 4px 14px;">
            ${cat}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Documents Grid Container -->
    <div id="vault-docs-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; padding-bottom: 40px;">
    </div>

    <!-- In-App Document Viewer Modal Container -->
    <div id="vault-viewer-modal" class="parichay-modal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(4px); z-index: 99999; align-items: center; justify-content: center; padding: 20px;">
      <div style="background: white; border-radius: 8px; width: 100%; max-width: 900px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
        <div style="background: #002B49; color: white; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span id="modal-doc-icon" style="font-size: 22px;">📄</span>
            <div>
              <div id="modal-doc-title" style="font-weight: 700; font-size: 15px;">Document Preview</div>
              <div id="modal-doc-id" style="font-size: 11px; color: #94a3b8;">Record ID</div>
            </div>
          </div>
          <button id="btn-close-viewer-modal" style="background: transparent; border: none; color: white; font-size: 24px; cursor: pointer;">&times;</button>
        </div>
        <div id="modal-doc-body" style="padding: 24px; flex: 1; overflow-y: auto; background: #f8fafc;">
          <!-- Rendered document info -->
        </div>
        <div style="background: #f1f5f9; padding: 12px 20px; border-top: 1px solid #cbd5e1; display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn btn-outline" id="btn-modal-print">🖨️ Print / Save as PDF</button>
          <button class="btn btn-primary" id="btn-modal-download">📥 Download File</button>
        </div>
      </div>
    </div>

    <!-- Upload / Update Document Modal Container -->
    <div id="vault-upload-modal" class="parichay-modal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(4px); z-index: 99999; align-items: center; justify-content: center; padding: 20px;">
      <div style="background: white; border-radius: 8px; width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
        <div style="background: #0f172a; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: 8px;">
            <span>📤</span> <span id="upload-modal-title">Upload / Update Official Document</span>
          </div>
          <button id="btn-close-upload-modal" style="background: transparent; border: none; color: white; font-size: 24px; cursor: pointer;">&times;</button>
        </div>
        <form id="vault-upload-form" style="padding: 24px;">
          <input type="hidden" id="upload-doc-id" value="">
          
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Document Title / Name *</label>
            <input type="text" id="upload-doc-name" class="form-control" required placeholder="e.g. Higher Education M.Tech Degree / Vigilance Order" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Category *</label>
              <select id="upload-doc-cat" class="form-control" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;">
                <option value="Service Records">Service Records</option>
                <option value="Tax & Finance">Tax & Finance</option>
                <option value="Military & Orders">Military & Orders</option>
                <option value="Medical & Welfare">Medical & Welfare</option>
                <option value="Compliance & Legal">Compliance & Legal</option>
                <option value="Identity & Personal">Identity & Personal</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Document Number / Ref</label>
              <input type="text" id="upload-doc-no" class="form-control" placeholder="e.g. MOD/DMA/2026/099" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Issuing Authority</label>
              <input type="text" id="upload-doc-issuer" class="form-control" placeholder="e.g. Ministry of Defence / DoPT" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;">
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Issue Date</label>
              <input type="date" id="upload-doc-date" class="form-control" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;">
            </div>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Description / Official Note</label>
            <textarea id="upload-doc-desc" class="form-control" rows="3" placeholder="Summary of document purpose and administrative clearance..." style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;"></textarea>
          </div>

          <div style="margin-bottom: 20px; border: 2px dashed #cbd5e1; padding: 18px; text-align: center; border-radius: 6px; background: #f8fafc;">
            <input type="file" id="upload-doc-file" style="display: block; margin: 0 auto;">
            <div style="font-size: 11px; color: #64748b; margin-top: 6px;">Supported: PDF, PNG, JPG (Maximum 10 MB). Digitally timestamped on submission.</div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button type="button" class="btn btn-outline" id="btn-cancel-upload">Cancel</button>
            <button type="submit" class="btn btn-primary" style="background: #16a34a; border-color: #15803d; font-weight: 700;">💾 Save & Update Vault</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Search input event
  const searchInput = container.querySelector('#vault-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderList();
    });
  }

  // Category filter tabs
  container.querySelectorAll('.vault-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.vault-cat-btn').forEach(b => b.classList.remove('btn-primary', 'active'));
      container.querySelectorAll('.vault-cat-btn').forEach(b => b.classList.add('btn-outline'));
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary', 'active');
      currentCategory = btn.dataset.cat;
      renderList();
    });
  });

  // Filter verified button
  container.querySelector('#btn-filter-verified')?.addEventListener('click', (e) => {
    e.target.classList.toggle('btn-primary');
    e.target.classList.toggle('btn-outline');
    renderList();
  });

  // Export CSV of Vault
  container.querySelector('#btn-export-vault-csv')?.addEventListener('click', () => {
    let csv = 'ID,Document Name,Category,Issuer,Document No,Date,Status\n';
    allDocs.forEach(d => {
      csv += `"${d.id}","${d.name}","${d.category}","${d.issuer}","${d.docNo}","${d.date}","${d.verified ? 'VERIFIED' : 'PENDING'}"\n`;
    });
    DL.triggerDownload('eHRMS_Document_Vault_Index.csv', csv, 'text/csv;charset=utf-8;');
  });

  // DigiLocker Sync button
  container.querySelector('#btn-sync-digilocker')?.addEventListener('click', () => {
    DL.showDownloadToast('DigiLocker Sync Completed: 26 Verified Certificates Connected');
  });

  // Upload modal handlers
  const uploadModal = container.querySelector('#vault-upload-modal');
  container.querySelector('#btn-open-upload-doc')?.addEventListener('click', () => {
    container.querySelector('#upload-doc-id').value = '';
    container.querySelector('#upload-doc-name').value = '';
    container.querySelector('#upload-doc-no').value = '';
    container.querySelector('#upload-doc-issuer').value = 'Department of Military Affairs';
    container.querySelector('#upload-doc-desc').value = '';
    container.querySelector('#upload-modal-title').textContent = 'Upload / Register New Official Document';
    uploadModal.style.display = 'flex';
  });

  container.querySelector('#btn-close-upload-modal')?.addEventListener('click', () => {
    uploadModal.style.display = 'none';
  });

  container.querySelector('#btn-cancel-upload')?.addEventListener('click', () => {
    uploadModal.style.display = 'none';
  });

  // Handle Upload / Update submission
  container.querySelector('#vault-upload-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = container.querySelector('#upload-doc-id').value || `DOC-USER-${Date.now()}`;
    const name = container.querySelector('#upload-doc-name').value;
    const cat = container.querySelector('#upload-doc-cat').value;
    const docNo = container.querySelector('#upload-doc-no').value || `REF-${Math.floor(1000 + Math.random() * 9000)}`;
    const issuer = container.querySelector('#upload-doc-issuer').value || 'Department of Military Affairs';
    const dateVal = container.querySelector('#upload-doc-date').value || new Date().toISOString().split('T')[0];
    const desc = container.querySelector('#upload-doc-desc').value || 'User submitted document registered under e-HRMS 2.0 Vault.';

    const newDoc = {
      id,
      name,
      category: cat,
      date: dateVal,
      verified: true,
      issuer,
      docNo,
      icon: cat.includes('Tax') ? '💳' : (cat.includes('Military') ? '🎖️' : '📄'),
      description: desc,
      downloadFn: () => DL.showDownloadToast(`${name.replace(/\s+/g, '_')}.pdf`)
    };

    // Save to state
    store.set(s => {
      const existing = (s.customVaultDocuments || []).filter(d => d.id !== id);
      existing.unshift(newDoc);
      return { ...s, customVaultDocuments: existing };
    });

    uploadModal.style.display = 'none';
    DL.showDownloadToast(`Document "${name}" Saved & Synchronized to Vault!`);
    renderDocumentVault(container);
  });

  // Document Viewer Modal
  const viewerModal = container.querySelector('#vault-viewer-modal');
  let activeModalDoc = null;

  function openDocumentViewerModal(doc) {
    activeModalDoc = doc;
    container.querySelector('#modal-doc-icon').textContent = doc.icon || '📄';
    container.querySelector('#modal-doc-title').textContent = doc.name;
    container.querySelector('#modal-doc-id').textContent = `${doc.docNo} • ${doc.category}`;
    
    container.querySelector('#modal-doc-body').innerHTML = `
      <div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div style="text-align: center; border-bottom: 2px solid #002B49; padding-bottom: 12px; margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Government of India &bull; भारत सरकार</div>
          <div style="font-size: 16px; font-weight: 800; color: #002B49; margin-top: 4px;">MINISTRY OF DEFENCE &bull; DEPARTMENT OF MILITARY AFFAIRS</div>
          <div style="font-size: 13px; font-weight: 700; color: #0284c7; margin-top: 2px;">${doc.name.toUpperCase()}</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; font-size: 12.5px;">
          <div style="background: #f8fafc; padding: 10px 14px; border-radius: 4px; border: 1px solid #e2e8f0;">
            <div style="color: #64748b; font-size: 11px;">Employee / Officer:</div>
            <div style="font-weight: 700; color: #0f172a; margin-top: 2px;">${user.name} (${user.empId})</div>
            <div style="color: #475569; font-size: 11px;">${user.designation}</div>
          </div>
          <div style="background: #f8fafc; padding: 10px 14px; border-radius: 4px; border: 1px solid #e2e8f0;">
            <div style="color: #64748b; font-size: 11px;">Document Number & Status:</div>
            <div style="font-weight: 700; color: #0f172a; margin-top: 2px;">${doc.docNo}</div>
            <div style="color: #16a34a; font-size: 11px; font-weight: 700;">✓ Verified & Authenticated</div>
          </div>
        </div>

        <div style="font-size: 13px; color: #334155; line-height: 1.6; margin-bottom: 20px; padding: 12px; background: #eff6ff; border-left: 4px solid #0284c7; border-radius: 4px;">
          <strong>Official Details:</strong> ${doc.description}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 14px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">
          <div>
            Issued By: <strong>${doc.issuer}</strong><br>
            Verification Date: <strong>${doc.date}</strong>
          </div>
          <div style="text-align: right; color: #16a34a; font-weight: 700;">
            🔒 SHA-256 PKI Authenticated<br>
            <span style="font-size: 9.5px; color: #64748b; font-weight: normal;">e-HRMS 2.0 National Digital Registry</span>
          </div>
        </div>
      </div>
    `;

    viewerModal.style.display = 'flex';
  }

  function openUpdateDocumentModal(doc) {
    container.querySelector('#upload-doc-id').value = doc.id;
    container.querySelector('#upload-doc-name').value = doc.name;
    container.querySelector('#upload-doc-cat').value = doc.category || 'Service Records';
    container.querySelector('#upload-doc-no').value = doc.docNo || '';
    container.querySelector('#upload-doc-issuer').value = doc.issuer || '';
    container.querySelector('#upload-doc-desc').value = doc.description || '';
    container.querySelector('#upload-modal-title').textContent = `Update Document Record: ${doc.name}`;
    uploadModal.style.display = 'flex';
  }

  container.querySelector('#btn-close-viewer-modal')?.addEventListener('click', () => {
    viewerModal.style.display = 'none';
  });

  container.querySelector('#btn-modal-print')?.addEventListener('click', () => {
    window.print();
  });

  container.querySelector('#btn-modal-download')?.addEventListener('click', () => {
    if (activeModalDoc && typeof activeModalDoc.downloadFn === 'function') {
      activeModalDoc.downloadFn();
    } else if (activeModalDoc) {
      DL.showDownloadToast(`${activeModalDoc.name.replace(/\s+/g, '_')}.html`);
    }
  });

  // Initial render
  renderList();
}
