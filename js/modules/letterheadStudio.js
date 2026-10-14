/**
 * e-HRMS 2.0 - Official Government Letterhead & Correspondence Studio
 * Ministry of Defence • Defence Research & Development Organisation (DRDO)
 * Office of Shri Anurag A. Bawaskar, Group 'A' Gazetted Officer
 */

import { store } from '../state.js';
import { downloadOfficialLetterhead } from '../downloader.js';

export function renderLetterheadStudio(container) {
  const state = store.get();
  const user = state.currentUser || {
    name: 'Anurag A. Bawaskar',
    fullName: 'ANURAG A. BAWASKAR',
    hindiName: 'अनुराग अ. बावस्कर',
    designation: 'ADDITIONAL SECTION OFFICER',
    hindiDesignation: 'अपर अनुभाग अधिकारी',
    email: 'anurag.bawaskar.6328@gov.in',
    phone: '23092020, 23092443',
    telefax: '23092546',
    empId: 'MOD-DMA-2024-8104'
  };

  // Pre-configured Official Communication Templates
  const TEMPLATES = {
    do_director: {
      name: '🛡️ D.O. Letter to Director, DRDO Dighi, Pune',
      fileNo: 'MoD/DRDO/ASO-I/2026/F-8104',
      date: '10-September-2026',
      classification: 'DEMI-OFFICIAL (D.O.)',
      recipient: `Dr. Chandrashekhar R. Vyas, Sc. 'H' / Outstanding Scientist
Director, Armament Research & Development Establishment (ARDE)
Defence Research & Development Organisation (DRDO)
Dighi, Pune - 411015`,
      subject: 'Advance Intimation regarding Assumption of Substantive Charge as Additional Section Officer - I / Lead Cyber Security Specialist & Operational Lab Mobilization',
      salutation: 'Respected Sir,',
      body: `<p>Kindly refer to Ministry of Defence Gazette Notification No. <code>MoD/DRDO/TRF/2026/102</code> dated 08-Sep-2026 regarding my permanent posting to the Defence Research &amp; Development Organisation (DRDO), Dighi, Pune formation.</p>

<p>I have the honour to submit that pursuant to the completion of formal relieving formalities at the President's Secretariat / Cabinet Secretariat, Rashtrapati Bhavan, New Delhi and the grant of Apex Level-1 Top Secret Security Clearance by the Directorate General of Defence Intelligence Agency (DIA), I shall be reporting to DRDO Dighi on <strong>14-September-2026 (Forenoon)</strong> to assume substantive charge as <strong>Chief Information Security Specialist / Additional Section Officer - I (Group 'A' Gazetted Cadre)</strong>.</p>

<p>In accordance with the operational directive for <strong>Operation VAJRA-SHAKTI</strong>, the advance technical deployment manifest, encrypted hardware telemetry protocols, and requisite cryptographic authorizations have been transmitted via secure military WAN (SEC-MIL-NET-DEL-01). Requisite residential accommodation requisition under Type-V entitlement has also been submitted through the Estate Management Unit (EMU), DRDO Pashan Road, Pune.</p>

<p>I assure you of my highest dedication to the strategic mission of the Armament and Combat Engineering Cluster and look forward to working under your valued leadership.</p>`,
      signOff: 'Yours sincerely,',
      copyTo: `1. Office of the Chief of Defence Staff (CDS), South Block, New Delhi
2. Joint Secretary (Estt & Personnel), Ministry of Defence, New Delhi
3. Directorate of Cyber Security & Cryptography, DRDO Bhawan, New Delhi
4. Personal File & Official Dispatch Register 2026`,
      crestStyle: 'golden',
      showWatermark: true,
      showBarcode: true
    },

    directive_cds: {
      name: '🚨 Strategic Note to Chief of Defence Staff (CDS)',
      fileNo: 'MoD/DoD/OPS-SPL/2026/8104-N-01',
      date: '10-September-2026',
      classification: 'TOP SECRET // OPERATIONAL IMMEDIATE',
      recipient: `General Anil Chauhan, PVSM, UYSM, AVSM, SM, VSM
Chief of Defence Staff & Secretary, Department of Military Affairs
Apex Command War Room, South Block, New Delhi - 110011`,
      subject: 'Tactical Technical Preparedness & C4I Terminal Hardening for Special Joint Task Force Deployment (Operation VAJRA-SHAKTI)',
      salutation: 'Respected Chief,',
      body: `<p>In compliance with Ministry of Defence Directive No. <code>MoD/DoD/OPS-SPL/2026/8104-SEC</code>, the 15-Member Strategic Joint Task Force technical chain of command has been mobilized on full operational standby effective 12-September-2026 (06:00 Hrs IST).</p>

<p>As Lead Technical Operations Officer, I have audited the cryptographic key management systems and secure automated satellite failover links connecting South Block, Sena Bhawan, and the forward DRDO Pune facilities. Zero-trust architectural protocols have been deployed across all operational C4I endpoints.</p>

<p>All 15 designated officers have completed biometric verification and received their SSO Level-1 Security Movement Passes. I shall be presenting the comprehensive In-Camera Technical Threat Telemetry during the Apex Briefing scheduled for <strong>12-September-2026 at 14:00 Hrs</strong> at the South Block War Room.</p>`,
      signOff: 'Respectfully submitted,',
      copyTo: `1. Office of the Defence Secretary, Ministry of Defence
2. Vice Chief of the Army Staff (VCOAS), Sena Bhawan, New Delhi
3. Director General, Defence Intelligence Agency (DIA)
4. Joint Operations Command War Room Archives`,
      crestStyle: 'dual',
      showWatermark: true,
      showBarcode: true
    },

    relieving_handover: {
      name: '🏢 Relieving & Handover Intimation Note',
      fileNo: 'MoD/ESTT/REL-INT/2026/8104',
      date: '08-September-2026',
      classification: 'CONFIDENTIAL',
      recipient: `Shri Anil Kumar Chhapolia<br>Joint Secretary to the Government of India<br>Establishment-I Branch, Ministry of Defence<br>South Block, New Delhi - 110011`,
      subject: 'Formal Handover of Classified Cyber Infrastructure Files & Relieving from Rashtrapati Bhavan Deployment',
      salutation: 'Sir,',
      body: `<p>With reference to Official Gazette Transfer Order No. <code>MoD/DRDO/TRF/2026/102</code> dated 08-Sep-2026, I have the honour to state that I have handed over complete charge of the classified cyber infrastructure dossiers, biometric registers, and network administration tokens to Shri Prateek Sengupta, ASO-II on this day (08-Sep-2026 afternoon).</p>
<p>No vigilance or disciplinary proceedings are pending or contemplated against the undersigned. I request that my formal Last Pay Certificate (LPC) and digitized e-Service Book be transmitted electronically to the Pay &amp; Accounts Office (PAO), DRDO Accounts Pune.</p>`,
      signOff: 'Yours faithfully,',
      crestStyle: 'golden',
      showWatermark: true,
      showBarcode: true
    },

    transfer_order: {
      name: '📜 Official Transfer / Posting Order',
      fileNo: 'MoD/DMA/ESTT-A/2026/T-114',
      date: '22-September-2026',
      classification: '[None / Standard Stationery]',
      recipient: `The Pay & Accounts Officer (PAO)<br>Ministry of Defence (Civil)<br>South Block, New Delhi - 110011`,
      subject: 'Transfer and Posting of Group A Gazetted Officers - Regarding',
      salutation: 'Sir/Madam,',
      body: `<p>I am directed to convey the approval of the Competent Authority for the transfer and posting of the following Group 'A' Gazetted Officer with immediate effect and until further orders:</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 10px; font-size: 11px;" border="1">
  <tr style="background-color: #f1f5f9; font-weight: bold;">
    <td style="padding: 5px;">S.No</td>
    <td style="padding: 5px;">Name & Designation</td>
    <td style="padding: 5px;">From</td>
    <td style="padding: 5px;">To</td>
  </tr>
  <tr>
    <td style="padding: 5px; text-align: center;">1.</td>
    <td style="padding: 5px;">Shri Anurag A. Bawaskar, ASO-I</td>
    <td style="padding: 5px;">President's Secretariat, Rashtrapati Bhavan</td>
    <td style="padding: 5px;">DRDO Headquarters, Pune</td>
  </tr>
</table>
<p>The officer is entitled to Joining Time and Transfer TA/DA as per the provisions of CCS (Joining Time) Rules, 1979 and SR 116 respectively. The expenditure on this account will be met from the sanctioned budget grant of the respective directorate.</p>`,
      signOff: 'Yours faithfully,',
      crestStyle: 'goi_logo',
      showWatermark: true,
      showBarcode: true
    },

    leave_sanction: {
      name: '🏝️ Leave Sanction Order (Earned Leave)',
      fileNo: 'MoD/DRDO/ADMIN/LEAVE/2026/89',
      date: '22-September-2026',
      classification: '[None / Standard Stationery]',
      recipient: `Shri Anurag A. Bawaskar<br>Additional Section Officer - I<br>Cyber Security Cell, DRDO Pune`,
      subject: 'Sanction of Earned Leave (EL)',
      salutation: 'Sir,',
      body: `<p>With reference to your leave application submitted via e-HRMS 2.0 portal, I am directed to convey the sanction of the Competent Authority for <strong>14 days of Earned Leave (EL)</strong> from <strong>01-Oct-2026 to 14-Oct-2026</strong> along with permission to prefix and suffix public holidays.</p>
<p>It is certified under SR-43 that the officer is likely to return to the same post and station from which they are proceeding on leave.</p>`,
      signOff: 'Yours faithfully,',
      crestStyle: 'bw',
      showWatermark: false,
      showBarcode: true
    },

    show_cause: {
      name: '⚠️ Show Cause Notice (Disciplinary)',
      fileNo: 'MoD/VIGILANCE/SCN/2026/11',
      date: '22-September-2026',
      classification: 'CONFIDENTIAL',
      recipient: `[Name of Defaulter Officer]<br>[Designation]<br>[Department/Section]`,
      subject: 'Show Cause Notice for Violation of Conduct Rules',
      salutation: 'Sir/Madam,',
      body: `<p>It has been brought to the notice of the undersigned that you have willfully violated the provisions of Rule 3(1)(i) and 3(1)(ii) of the Central Civil Services (Conduct) Rules, 1964 by [Insert Specific Incident Details Here].</p>
<p>You are hereby directed to submit a written explanation within <strong>07 days</strong> from the date of receipt of this notice, showing cause as to why disciplinary action should not be initiated against you under the CCS (CCA) Rules, 1965.</p>
<p>In the event of failure to submit a reply within the stipulated timeframe, it will be presumed that you have nothing to say in your defence, and ex-parte action will be taken as per extant rules.</p>`,
      signOff: 'Yours faithfully,',
      crestStyle: 'golden',
      showWatermark: true,
      showBarcode: true
    },

    tech_sanction: {
      name: '🔬 Technical Requisition & Security Directive',
      fileNo: 'MoD/DRDO/TECH-REQ/2026/044',
      date: '09-September-2026',
      classification: 'RESTRICTED',
      recipient: `The Director
Directorate of Technical Coordination & Materials Management
DRDO Headquarters, DRDO Bhawan, New Delhi - 110011`,
      subject: 'Requisition of High-Grade Hardware Security Modules (HSM) & Quantum Cryptographic Evaluation Equipment for DRDO Dighi Pune Cluster',
      salutation: 'Sir,',
      body: `<p>Under the operational mandate of Project KAVACH-II and the Strategic Deployment Directive 2026, sanction is requested for the immediate procurement and air dispatch of 4 units of FIPS 140-3 Level 4 Hardware Security Modules (HSM) and associated secure fiber cryptographic multiplexers to the DRDO Dighi campus.</p>

<p>The requisite expenditure shall be debitable under Major Head 2076, Minor Head 104 (Research &amp; Development Schemes). Technical specifications vetted by the Directorate General of Defence Intelligence &amp; Security are annexed herewith.</p>`,
      signOff: 'Yours sincerely,',
      copyTo: `1. Integrated Financial Adviser (IFA Defence R&D), South Block
2. Head of Department, Cyber Physical Systems, DRDO Dighi, Pune
3. Guard File • Strategic Technical Requisitions 2026`,
      crestStyle: 'dual',
      showWatermark: true,
      showBarcode: true
    },

    blank: {
      name: '📄 Blank Official Stationery (Word Match)',
      fileNo: '',
      date: '',
      classification: '',
      recipient: '',
      subject: '',
      salutation: '',
      body: `<p style="margin: 0; min-height: 24px;">|</p>`,
      signOff: 'Yours sincerely,',
      copyTo: '',
      crestStyle: 'golden',
      showWatermark: false,
      showBarcode: false
    }
  };

  // Active state for letterhead composer
  let currentTemplateKey = 'do_director';
  let activeLetter = JSON.parse(JSON.stringify(TEMPLATES.do_director));

  // Render main studio layout
  container.innerHTML = `
    <!-- Letterhead Studio Main Header Strip -->
    <div class="page-title-strip" style="background: linear-gradient(135deg, #7f1d1d 0%, #990000 50%, #580000 100%); color: white; padding: 20px 24px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 14px rgba(153, 0, 0, 0.25);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; font-size: 11.5px; font-weight: 700; color: #fca5a5; letter-spacing: 1px; text-transform: uppercase;">
            <span>🇮🇳</span> GOVERNMENT OF INDIA &bull; MINISTRY OF DEFENCE &bull; DRDO
          </div>
          <h1 style="margin: 4px 0 6px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.3px;">
            Official Letterhead &amp; Correspondence Studio
          </h1>
          <div style="font-size: 12.5px; color: #fee2e2;">
            Authentic Bilingual Government Stationery for <strong>${user.name || 'Anurag A. Bawaskar'}</strong> (${user.designation} &bull; Group 'A' Gazetted)
          </div>
        </div>

        <!-- Master Action Buttons in Header -->
        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <button class="btn" id="btn-studio-download-pdf" style="background: #ffffff; color: #990000; border: none; font-weight: 800; font-size: 12.5px; padding: 9px 18px; border-radius: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 7px; cursor: pointer;">
            <span>📥</span> Download Official Letter (PDF/HTML)
          </button>
          <button class="btn" id="btn-studio-download-doc" style="background: #1e3a8a; color: #ffffff; border: 1px solid #3b82f6; font-weight: 700; font-size: 12px; padding: 9px 16px; border-radius: 5px; display: flex; align-items: center; gap: 6px; cursor: pointer;" title="Export as native Word-compatible document">
            <span>📄</span> Export to Word (.doc)
          </button>
          <button class="btn" id="btn-studio-print-letter" style="background: #fee2e2; color: #7f1d1d; border: 1px solid #fca5a5; font-weight: 700; font-size: 12px; padding: 9px 16px; border-radius: 5px; display: flex; align-items: center; gap: 6px; cursor: pointer;">
            <span>🖨️</span> Print Letterhead (A4)
          </button>
        </div>
      </div>
    </div>

    <!-- Letterhead Workspace Grid -->
    <div style="display: grid; grid-template-columns: 320px 1fr; gap: 24px; align-items: flex-start;" id="letterhead-workspace">
      
      <!-- Left Controls & Customization Panel -->
      <div class="gov-card" style="padding: 18px; position: sticky; top: 80px;">
        <h3 style="margin: 0 0 14px 0; font-size: 14px; font-weight: 800; color: #002B49; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
          <span>⚙️</span> Letterhead Studio Controls
        </h3>

        <!-- Preset Template Chooser -->
        <div class="form-group mb-16">
          <label class="form-label" style="font-size: 11.5px; font-weight: 700; color: #334155; margin-bottom: 5px; display: block;">
            Select Official Template / Preset:
          </label>
          <select id="select-template-preset" class="form-control" style="width: 100%; padding: 8px 10px; font-size: 12px; border: 1.5px solid #cbd5e1; border-radius: 5px; font-weight: 600;">
            <option value="do_director">🛡️ D.O. Letter to Director, DRDO Pune</option>
            <option value="directive_cds">🚨 Strategic Directive to Task Force (CDS)</option>
            <option value="relieving_handover">🏢 Relieving &amp; Handover Intimation</option>
            <option value="tech_sanction">🔬 Technical Requisition Note</option>
            <option value="blank">📄 Blank Official Stationery (Word Match)</option>
          </select>
        </div>

        <!-- Header Crest Style Selector -->
        <div class="form-group mb-16">
          <label class="form-label" style="font-size: 11.5px; font-weight: 700; color: #334155; margin-bottom: 5px; display: block;">
            Header Crest Display:
          </label>
          <select id="select-crest-style" class="form-control" style="width: 100%; padding: 8px 10px; font-size: 12px; border: 1.5px solid #cbd5e1; border-radius: 5px; font-weight: 600;">
            <option value="golden">👑 Golden Ashoka Emblem (Exact Word Match)</option>
            <option value="dual">🛡️ Dual: Golden Emblem + DRDO Roundel Seal</option>
            <option value="drdo">🎖️ DRDO Official Roundel Seal</option>
            <option value="monochrome">🇮🇳 State Lion Emblem (Monochrome)</option>
            <option value="goi_logo">🏛️ Government of India (Official Layout)</option>
          </select>
        </div>

        <!-- Security Classification Selector -->
        <div class="form-group mb-16">
          <label class="form-label" style="font-size: 11.5px; font-weight: 700; color: #334155; margin-bottom: 5px; display: block;">
            Security Classification Header:
          </label>
          <select id="select-classification" class="form-control" style="width: 100%; padding: 8px 10px; font-size: 12px; border: 1.5px solid #cbd5e1; border-radius: 5px; font-weight: 600;">
            <option value="DEMI-OFFICIAL (D.O.)">DEMI-OFFICIAL (D.O.)</option>
            <option value="TOP SECRET // OPERATIONAL IMMEDIATE">TOP SECRET // OPERATIONAL IMMEDIATE</option>
            <option value="CONFIDENTIAL">CONFIDENTIAL</option>
            <option value="RESTRICTED">RESTRICTED</option>
            <option value="OFFICIAL GAZETTE">OFFICIAL GAZETTE</option>
            <option value="URGENT // DISPATCH IMMEDIATE">URGENT // DISPATCH IMMEDIATE</option>
            <option value="">[None / Standard Stationery]</option>
          </select>
        </div>

        <!-- File Number Input -->
        <div class="form-group mb-16">
          <label class="form-label" style="font-size: 11.5px; font-weight: 700; color: #334155; margin-bottom: 5px; display: block;">
            File Reference Number:
          </label>
          <input type="text" id="input-file-no" class="form-control" value="${activeLetter.fileNo}" style="width: 100%; padding: 7px 10px; font-size: 12px; font-family: monospace; border: 1.5px solid #cbd5e1; border-radius: 5px;">
        </div>

        <!-- Date Input -->
        <div class="form-group mb-16">
          <label class="form-label" style="font-size: 11.5px; font-weight: 700; color: #334155; margin-bottom: 5px; display: block;">
            Promulgation / Dispatch Date:
          </label>
          <input type="text" id="input-letter-date" class="form-control" value="${activeLetter.date}" style="width: 100%; padding: 7px 10px; font-size: 12px; border: 1.5px solid #cbd5e1; border-radius: 5px;">
        </div>

        <!-- AI Document Generator -->
        <div style="background: #e0e7ff; border: 1px solid #818cf8; border-radius: 6px; padding: 12px; margin-bottom: 16px;">
          <div style="font-size: 11.5px; font-weight: 800; color: #3730a3; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <span>✨</span> Titan AI Generator
          </div>
          <textarea id="ai-prompt-input" class="form-control" rows="3" style="width: 100%; padding: 6px; font-size: 11px; border: 1px solid #a5b4fc; border-radius: 4px; margin-bottom: 8px;" placeholder="Describe the letter you want to draft (e.g. 'Draft a transfer order for...')..."></textarea>
          <button class="btn" id="btn-generate-ai" style="width: 100%; font-size: 11px; font-weight: 700; background: #4f46e5; color: white; border: none; padding: 8px; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
            <span id="ai-btn-icon">⚡</span> <span id="ai-btn-text">Generate Official Draft</span>
          </button>
        </div>

        <!-- Official Security Toggles -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; margin-bottom: 16px;">
          <div style="font-size: 11.5px; font-weight: 700; color: #002B49; margin-bottom: 8px;">
            Security &amp; Authenticity Features:
          </div>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #334155; margin-bottom: 8px; cursor: pointer;">
            <input type="checkbox" id="toggle-signature" checked style="width: 16px; height: 16px; cursor: pointer;">
            <span>Digital e-Sign DSC Signature Box</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #334155; margin-bottom: 8px; cursor: pointer;">
            <input type="checkbox" id="toggle-watermark" checked style="width: 16px; height: 16px; cursor: pointer;">
            <span>Subtle Emblem Watermark</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #334155; cursor: pointer;">
            <input type="checkbox" id="toggle-barcode" checked style="width: 16px; height: 16px; cursor: pointer;">
            <span>NIC Security Barcode Token</span>
          </label>
        </div>

        <!-- Additional Utility Buttons -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="btn btn-outline" id="btn-copy-text" style="width: 100%; font-size: 11.5px; font-weight: 700; padding: 8px 12px; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>📋</span> Copy Letter Body Text
          </button>
          <button class="btn btn-outline" id="btn-save-dispatch" style="width: 100%; font-size: 11.5px; font-weight: 700; padding: 8px 12px; display: flex; align-items: center; justify-content: center; gap: 6px; color: #166534; border-color: #86efac;">
            <span>💾</span> Save to e-Office Dispatch Diary
          </button>
          <button class="btn btn-outline" id="btn-reset-letter" style="width: 100%; font-size: 11px; color: #64748b; padding: 6px 10px;">
            🔄 Reset to Default Template
          </button>
        </div>

        <!-- Tip Box -->
        <div style="margin-top: 16px; font-size: 11px; color: #64748b; line-height: 1.4; border-top: 1px solid #e2e8f0; padding-top: 12px;">
          💡 <em>Tip: You can click directly on the paper to type or edit recipient, subject, and body text.</em>
        </div>
      </div>

      <!-- Right Master Paper Preview Container (A4 Proportions) -->
      <div id="letterhead-paper-container" style="background: #e2e8f0; padding: 20px; border-radius: 8px; box-shadow: inset 0 2px 6px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center; gap: 12px;">
        
        <!-- Interactive Formatting Toolbar -->
        <div class="no-print" style="width: 100%; max-width: 820px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <span style="font-size: 11px; font-weight: 700; color: #64748b; margin-right: 4px;">Tools:</span>
          <button type="button" class="btn-tool" data-cmd="bold" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; font-weight: bold; cursor: pointer;" title="Bold">B</button>
          <button type="button" class="btn-tool" data-cmd="italic" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; font-style: italic; cursor: pointer;" title="Italic">I</button>
          <button type="button" class="btn-tool" data-cmd="underline" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; text-decoration: underline; cursor: pointer;" title="Underline">U</button>
          <button type="button" class="btn-tool" data-cmd="strikeThrough" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; text-decoration: line-through; cursor: pointer;" title="Strikethrough">S</button>
          <span style="border-left: 1px solid #cbd5e1; height: 18px;"></span>
          <button type="button" class="btn-tool" data-cmd="insertUnorderedList" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; cursor: pointer;" title="Bulleted List">&bull; List</button>
          <button type="button" class="btn-tool" data-cmd="insertOrderedList" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; cursor: pointer;" title="Numbered List">1. List</button>
          <span style="border-left: 1px solid #cbd5e1; height: 18px;"></span>
          <button type="button" class="btn-tool" data-cmd="removeFormat" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; font-size: 11px; color: #dc2626; cursor: pointer;" title="Clear Formatting">🧹 Clear</button>
        </div>

        <!-- Physical A4 Sheet Representation (Exact Word Match) -->
        <div id="letterhead-sheet" style="width: 100%; max-width: 820px; background: #ffffff; border: 1px solid #cbd5e1; box-shadow: 0 6px 24px rgba(0,0,0,0.12); padding: 36px 44px; position: relative; font-family: 'Times New Roman', Times, serif; color: #111827; line-height: 1.5; border-radius: 2px;">
          
          <!-- Subtle Background Watermark -->
          <div id="paper-watermark" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.04; pointer-events: none; z-index: 0; display: block;">
            <img src="assets/emblem_golden.png" style="width: 320px; height: auto;" alt="Watermark">
          </div>

          <!-- Classification Header Pill & eOffice Number -->
          <div id="paper-classification-wrap" style="text-align: center; margin-bottom: 12px; position: relative; z-index: 1; min-height: 20px;">
            <div style="position: absolute; left: 0; top: 0; font-size: 10px; font-weight: bold; color: #64748b; text-align: left;">
              eOffice Computer No:<br><span style="color: #0f172a;">E-3498234</span>
            </div>
            <span id="paper-classification-pill" style="display: inline-block; background: #c00000; color: #ffffff; font-size: 10.5px; font-weight: 800; letter-spacing: 2px; padding: 2px 14px; border-radius: 3px; text-transform: uppercase;">
              ${activeLetter.classification}
            </span>
          </div>

          <!-- Master Official Bilingual Header (Authentic Crimson #c00000 - Center-Aligned Columns) -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; position: relative; z-index: 1;">
            
            <!-- Left Side: Officer Designation & Credentials (Centered) -->
            <div style="width: 36%; text-align: center; font-size: 11px; line-height: 1.35; color: #c00000;">
              <div style="font-size: 15px; font-weight: 800; color: #c00000; font-family: 'Kokila', 'Mangal', 'Segoe UI', Arial, sans-serif;">${user.hindiName || 'अनुराग अ. बावस्कर'}</div>
              <div style="font-size: 11.5px; font-weight: 700; color: #c00000; margin-bottom: 2px;">${user.hindiDesignation || 'अपर अनुभाग अधिकारी'}</div>
              <div style="font-size: 14px; font-weight: 800; color: #c00000;">${user.name || 'Anurag A. Bawaskar'}</div>
              <div style="font-size: 10.5px; font-weight: 700; color: #c00000; text-transform: uppercase;">${user.designation || 'ADDITIONAL SECTION OFFICER'}</div>
              <div style="font-size: 9.5px; margin-top: 6px; line-height: 1.45;">
                <div><span style="color: #0066cc; text-decoration: underline;">E-mail :</span> <a href="mailto:${user.email || 'anurag.bawaskar.6328@gov.in'}" style="color: #c00000; text-decoration: none;">${user.email || 'anurag.bawaskar.6328@gov.in'}</a></div>
                <div><span style="color: #0066cc; text-decoration: underline;">Website :</span> <a href="https://www.mod.gov.in" target="_blank" style="color: #c00000; text-decoration: none;">www.mod.gov.in</a></div>
              </div>
            </div>

            <!-- Center: Crest Display Area (Golden Emblem / DRDO) -->
            <div id="paper-crest-center" style="width: 28%; text-align: center;">
              <img id="paper-emblem-img" src="assets/emblem_golden.png" alt="State Emblem of India" style="width: 50px; height: 76px; object-fit: contain; margin: 0 auto; display: block; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));">
            </div>

            <!-- Right Side: Ministry of Defence & DRDO Headquarters (Centered) -->
            <div style="width: 36%; text-align: center; font-size: 11px; line-height: 1.35; color: #c00000;">
              <div style="font-size: 13.5px; font-weight: 800; color: #c00000;">भारत सरकार</div>
              <div style="font-size: 12px; font-weight: 700; color: #c00000;">रक्षा मंत्रालय</div>
              <div style="font-size: 12px; font-weight: 700; color: #c00000; margin-bottom: 4px;">डी.आर.डी.ओ.</div>
              <div style="font-size: 12.5px; font-weight: 700; color: #c00000;">Government of India</div>
              <div style="font-size: 11.5px; font-weight: 700; color: #c00000;">Ministry of Defence</div>
              <div style="font-size: 11.5px; font-weight: 800; color: #c00000;">DRDO</div>
              <div style="font-size: 9.5px; color: #c00000; margin-top: 3px; line-height: 1.35;">
                <div>डी.आर.डी.ओ. भवन, नई दिल्ली-110011</div>
                <div>DRDO Bhawan, New Delhi-110011</div>
                <div><span style="color: #0066cc; text-decoration: underline;">Tel. :</span> <span style="color: #c00000;">${user.phone || '23092020, 23092443'}</span></div>
                <div><span style="color: #0066cc; text-decoration: underline;">Telefax :</span> <span style="color: #c00000;">${user.telefax || '23092546'}</span></div>
              </div>
            </div>

          </div>

          <!-- File Number and Date Separator Table (Exact 75%/25% split from Word Reference) -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; border: 1.5px solid #000000; position: relative; z-index: 1;">
            <tr>
              <td style="width: 75%; padding: 6px 12px; font-size: 12px; border-right: 1.5px solid #000000; background: #ffffff; vertical-align: middle;">
                <strong>FILE NO :</strong> <span id="paper-file-no" contenteditable="true" style="font-size: 12px; font-weight: 700; color: #000000; margin-left: 6px; outline: none;" title="Click to edit File Reference">${activeLetter.fileNo}</span>
              </td>
              <td style="width: 25%; padding: 6px 12px; font-size: 12px; background: #ffffff; text-align: left; vertical-align: middle;">
                <strong>DATE -</strong> <span id="paper-letter-date" contenteditable="true" style="color: #000000; margin-left: 4px; outline: none;" title="Click to edit Date">${activeLetter.date}</span>
              </td>
            </tr>
          </table>

          <!-- Letter Body Content Container (Directly editable on paper) -->
          <div style="position: relative; z-index: 1; min-height: 380px;">
            
            <!-- Recipient (To) -->
            <div id="paper-recipient-wrap" style="font-size: 12.5px; line-height: 1.5; margin-bottom: 14px; ${activeLetter.recipient ? '' : 'display: none;'}">
              <div style="font-weight: 700; margin-bottom: 2px;">To,</div>
              <div id="paper-recipient" contenteditable="true" style="padding: 4px 8px; border-radius: 3px; outline: none; white-space: pre-line; background: rgba(248, 250, 252, 0.5); border: 1px dashed transparent;" title="Click to edit recipient">
                ${activeLetter.recipient}
              </div>
            </div>

            <!-- Subject Line -->
            <div id="paper-subject-wrap" style="margin: 14px 0 16px 0; font-size: 13px; font-weight: 700; color: #002B49; border-left: 4px solid #8b0000; padding: 6px 12px; background: #fdf2f2; line-height: 1.45; ${activeLetter.subject ? '' : 'display: none;'}">
              SUBJECT: <span id="paper-subject" contenteditable="true" style="text-decoration: underline; outline: none;" title="Click to edit subject">${activeLetter.subject}</span>
            </div>

            <!-- Salutation -->
            <div id="paper-salutation" contenteditable="true" style="font-size: 12.5px; font-weight: 700; margin-bottom: 12px; outline: none; ${activeLetter.salutation ? '' : 'display: none;'}" title="Click to edit salutation">
              ${activeLetter.salutation}
            </div>

            <!-- Main Operative Body -->
            <div id="paper-body" contenteditable="true" style="font-size: 12.5px; line-height: 1.8; text-align: justify; color: #1e293b; margin-bottom: 28px; outline: none; min-height: 200px; padding: 4px;" title="Click to compose text directly">
              ${activeLetter.body}
            </div>

            <!-- Sign-Off Block (Clean Digital Signature without Stamp) -->
            <div id="paper-sign-block" style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 28px; ${activeLetter.recipient || activeLetter.subject ? '' : 'display: none;'}">
              
              <!-- Copy to / Distribution (Removed by User Request) -->
              <div style="max-width: 52%;">
              </div>

              <!-- Official Digital Signature Box (Authentic GoI Stamp) -->
              <div style="text-align: right;">
                <div id="paper-sign-off" contenteditable="true" style="font-size: 11.5px; color: #64748b; margin-bottom: 6px; outline: none;">
                  ${activeLetter.signOff}
                </div>
                
                <div style="display: inline-block; border: 2px solid #16a34a; border-radius: 4px; padding: 6px 12px; font-family: Arial, sans-serif; text-align: left; background: rgba(22, 163, 74, 0.05); min-width: 230px; box-shadow: inset 0 0 0 1px rgba(22,163,74,0.2);">
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <div style="font-size: 30px; color: #16a34a; line-height: 1;">☑</div>
                    <div>
                      <div style="font-size: 12px; font-weight: bold; color: #166534; border-bottom: 1px dotted #16a34a; padding-bottom: 2px; margin-bottom: 4px;">Signature Valid</div>
                      <div style="font-size: 10px; color: #15803d; line-height: 1.4;">
                        Digitally signed by <strong>${user.fullName || user.name}</strong><br>
                        Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST<br>
                        Reason: Approved<br>
                        Location: New Delhi
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style="margin-top: 6px;">
                  <strong style="font-size: 11px; color: #002B49;">(${user.fullName || user.name})</strong><br>
                  <span style="font-size: 9.5px; color: #475569;">${user.designation}</span><br>
                  <span style="font-size: 8.5px; color: #64748b;">Ministry of Defence &bull; DRDO</span>
                </div>
              </div>

            </div>

            <!-- Authentic eOffice Footer -->
            <div id="paper-barcode-wrap" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #cbd5e1; margin-top: 28px; padding-top: 6px; font-size: 9px; color: #475569;">
              <div style="text-align: left;"><strong>eOffice Receipt No:</strong> E-3498234 / 2026 / DRDO-HQ</div>
              <div style="text-align: right;">Generated via NIC eOffice System &bull; Page 1 of 1</div>
            </div>
            
            <!-- Bottom Classification Banner -->
            <div style="text-align: center; margin-top: 12px;">
              <span id="paper-classification-pill-bottom" style="display: inline-block; background: #c00000; color: #ffffff; font-size: 10.5px; font-weight: 800; letter-spacing: 2px; padding: 2px 14px; border-radius: 3px; text-transform: uppercase;">
                ${activeLetter.classification}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;

  // Interactive Event Handlers
  const selectPreset = container.querySelector('#select-template-preset');
  const selectCrest = container.querySelector('#select-crest-style');
  const selectClass = container.querySelector('#select-classification');
  const inputFileNo = container.querySelector('#input-file-no');
  const inputDate = container.querySelector('#input-letter-date');
  const toggleSignature = container.querySelector('#toggle-signature');
  const toggleWatermark = container.querySelector('#toggle-watermark');
  const toggleBarcode = container.querySelector('#toggle-barcode');

  const paperCrestCenter = container.querySelector('#paper-crest-center');
  const paperClassWrap = container.querySelector('#paper-classification-wrap');
  const paperClassPill = container.querySelector('#paper-classification-pill');
  const paperClassPillBottom = container.querySelector('#paper-classification-pill-bottom');
  const paperFileNo = container.querySelector('#paper-file-no');
  const paperDate = container.querySelector('#paper-letter-date');
  const paperRecipientWrap = container.querySelector('#paper-recipient-wrap');
  const paperRecipient = container.querySelector('#paper-recipient');
  const paperSubjectWrap = container.querySelector('#paper-subject-wrap');
  const paperSubject = container.querySelector('#paper-subject');
  const paperSalutation = container.querySelector('#paper-salutation');
  const paperBody = container.querySelector('#paper-body');
  const paperSignBlock = container.querySelector('#paper-sign-block');
  const paperSignOff = container.querySelector('#paper-sign-off');
  const paperWatermark = container.querySelector('#paper-watermark');
  const paperBarcodeWrap = container.querySelector('#paper-barcode-wrap');

  // Update Crest Center on paper
  function updateCrestCenter(style) {
    if (style === 'goi_logo') {
      paperCrestCenter.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <img src="assets/emblem_golden.png" alt="Government of India" style="height: 55px; width: auto; object-fit: contain; margin: 0 auto 4px; display: block;">
          <span style="font-size: 12px; font-weight: 800; color: #c00000; letter-spacing: 1px;">GOVERNMENT OF INDIA</span>
        </div>
      `;
    } else if (style === 'bw') {
      paperCrestCenter.innerHTML = `
        <img src="assets/emblem.png" alt="State Emblem of India" style="width: 44px; height: 70px; object-fit: contain; margin: 0 auto 2px; display: block; filter: grayscale(100%) brightness(0); opacity: 0.8;">
        <div style="font-size: 8.5px; color: #c00000; font-weight: bold;">सत्यमेव जयते</div>
      `;
    } else if (style === 'dual') {
      paperCrestCenter.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin: 0 auto 3px;">
          <img src="assets/emblem_golden.png" alt="State Emblem of India" style="width: 44px; height: 68px; object-fit: contain; display: block; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));">
        </div>
        <div style="font-size: 8.5px; font-weight: 800; color: #c00000; letter-spacing: 0.8px;">सत्यमेव जयते &bull; बलस्य मूलं विज्ञानम्</div>
      `;
    } else if (style === 'drdo') {
      paperCrestCenter.innerHTML = `
        <div style="font-size: 8.5px; font-weight: 800; color: #c00000; letter-spacing: 0.8px;">बलस्य मूलं विज्ञानम्</div>
      `;
    } else if (style === 'monochrome') {
      paperCrestCenter.innerHTML = `
        <img src="assets/emblem.png" alt="State Emblem of India" style="width: 44px; height: 70px; object-fit: contain; margin: 0 auto 3px; display: block; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));">
        <div style="font-size: 8.5px; font-weight: 800; color: #c00000; letter-spacing: 0.8px;">सत्यमेव जयते</div>
      `;
    } else {
      // Golden (Exact Word Screenshot Match)
      paperCrestCenter.innerHTML = `
        <img src="assets/golden_emblem_big.png" alt="State Emblem of India" style="width: 90px; height: auto; object-fit: contain; margin: 0 auto; display: block; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));">
      `;
    }
  }

  // Load a preset template
  function loadTemplate(key) {
    if (!TEMPLATES[key]) return;
    currentTemplateKey = key;
    activeLetter = JSON.parse(JSON.stringify(TEMPLATES[key]));

    selectClass.value = activeLetter.classification || '';
    inputFileNo.value = activeLetter.fileNo;
    inputDate.value = activeLetter.date;
    toggleWatermark.checked = activeLetter.showWatermark !== false;
    toggleBarcode.checked = activeLetter.showBarcode !== false;
    if (toggleSignature) {
      toggleSignature.checked = key !== 'blank';
    }
    if (selectCrest) selectCrest.value = activeLetter.crestStyle || 'golden';

    paperFileNo.innerText = activeLetter.fileNo;
    paperDate.innerText = activeLetter.date;
    paperRecipient.innerText = activeLetter.recipient;
    paperSubject.innerText = activeLetter.subject;
    paperSalutation.innerText = activeLetter.salutation;
    paperBody.innerHTML = activeLetter.body;
    paperSignOff.innerText = activeLetter.signOff;

    if (activeLetter.recipient) {
      paperRecipientWrap.style.display = 'block';
    } else {
      paperRecipientWrap.style.display = 'none';
    }

    if (activeLetter.subject) {
      paperSubjectWrap.style.display = 'block';
    } else {
      paperSubjectWrap.style.display = 'none';
    }

    if (activeLetter.salutation) {
      paperSalutation.style.display = 'block';
    } else {
      paperSalutation.style.display = 'none';
    }

    if (key === 'blank' || (toggleSignature && !toggleSignature.checked)) {
      paperSignBlock.style.display = 'none';
    } else {
      paperSignBlock.style.display = 'flex';
    }

    if (activeLetter.classification) {
      paperClassPill.style.visibility = 'visible';
      if (paperClassPillBottom) paperClassPillBottom.style.visibility = 'visible';
      paperClassPill.innerText = activeLetter.classification;
      if (paperClassPillBottom) paperClassPillBottom.innerText = activeLetter.classification;
    } else {
      paperClassPill.style.visibility = 'hidden';
      if (paperClassPillBottom) paperClassPillBottom.style.visibility = 'hidden';
    }

    paperWatermark.style.display = activeLetter.showWatermark !== false ? 'block' : 'none';
    paperBarcodeWrap.style.display = activeLetter.showBarcode !== false ? 'flex' : 'none';

    updateCrestCenter(activeLetter.crestStyle || 'golden');
  }

  // Preset selector
  selectPreset.addEventListener('change', (e) => {
    loadTemplate(e.target.value);
  });

  // Crest Style selector
  selectCrest.addEventListener('change', (e) => {
    activeLetter.crestStyle = e.target.value;
    updateCrestCenter(e.target.value);
  });

  // Classification selector
  selectClass.addEventListener('change', (e) => {
    activeLetter.classification = e.target.value;
    if (e.target.value) {
      paperClassPill.style.visibility = 'visible';
      if (paperClassPillBottom) paperClassPillBottom.style.visibility = 'visible';
      paperClassPill.innerText = e.target.value;
      if (paperClassPillBottom) paperClassPillBottom.innerText = e.target.value;
    } else {
      paperClassPill.style.visibility = 'hidden';
      if (paperClassPillBottom) paperClassPillBottom.style.visibility = 'hidden';
    }
  });

  // File No & Date inputs bi-directional sync with paper table
  inputFileNo.addEventListener('input', (e) => {
    paperFileNo.innerText = e.target.value;
    activeLetter.fileNo = e.target.value;
  });

  paperFileNo.addEventListener('input', (e) => {
    inputFileNo.value = paperFileNo.innerText;
    activeLetter.fileNo = paperFileNo.innerText;
  });

  inputDate.addEventListener('input', (e) => {
    paperDate.innerText = e.target.value;
    activeLetter.date = e.target.value;
  });

  paperDate.addEventListener('input', (e) => {
    inputDate.value = paperDate.innerText;
    activeLetter.date = paperDate.innerText;
  });

  if (toggleSignature) {
    toggleSignature.addEventListener('change', (e) => {
      paperSignBlock.style.display = e.target.checked ? 'flex' : 'none';
      activeLetter.showSignature = e.target.checked;
    });
  }

  toggleWatermark.addEventListener('change', (e) => {
    paperWatermark.style.display = e.target.checked ? 'block' : 'none';
    activeLetter.showWatermark = e.target.checked;
  });

  toggleBarcode.addEventListener('change', (e) => {
    paperBarcodeWrap.style.display = e.target.checked ? 'flex' : 'none';
    activeLetter.showBarcode = e.target.checked;
  });

  // Rich Formatting Toolbar Actions
  container.querySelectorAll('.btn-tool').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cmd = btn.getAttribute('data-cmd');
      document.execCommand(cmd, false, null);
      paperBody.focus();
    });
  });

  // Live contenteditable sync back into activeLetter
  paperRecipient.addEventListener('input', () => { activeLetter.recipient = paperRecipient.innerText; });
  paperSubject.addEventListener('input', () => { activeLetter.subject = paperSubject.innerText; });
  paperSalutation.addEventListener('input', () => { activeLetter.salutation = paperSalutation.innerText; });
  paperBody.addEventListener('input', () => { activeLetter.body = paperBody.innerHTML; });
  paperSignOff.addEventListener('input', () => { activeLetter.signOff = paperSignOff.innerText; });

  // Download PDF / HTML Button
  const btnDownload = container.querySelector('#btn-studio-download-pdf');
  btnDownload.addEventListener('click', () => {
    const exportData = {
      fileNo: inputFileNo.value || activeLetter.fileNo,
      date: inputDate.value || activeLetter.date,
      classification: selectClass.value || activeLetter.classification,
      recipient: paperRecipient.innerText.trim(),
      subject: paperSubject.innerText.trim(),
      salutation: paperSalutation.innerText.trim(),
      body: paperBody.innerHTML,
      signOff: paperSignOff.innerText.trim(),
      crestStyle: selectCrest.value || 'golden',
      showSignature: toggleSignature ? toggleSignature.checked : true,
      showWatermark: toggleWatermark.checked,
      showBarcode: toggleBarcode.checked
    };
    downloadOfficialLetterhead(user, exportData);
  });

  // Export to Word (.doc) Button
  const btnExportDoc = container.querySelector('#btn-studio-download-doc');
  btnExportDoc.addEventListener('click', () => {
    const fileNo = inputFileNo.value || activeLetter.fileNo || 'Draft';
    const cleanFileName = `Official_Letter_${fileNo.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    
    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${fileNo}</title>
        <style>
          @page Section1 { size:595.3pt 841.9pt; margin:42.5pt 54.0pt 42.5pt 54.0pt; mso-header-margin:36.0pt; mso-footer-margin:36.0pt; mso-paper-source:0; }
          div.Section1 { page:Section1; font-family:'Times New Roman', serif; font-size:11.5pt; color:#111827; }
          table { width:100%; border-collapse:collapse; }
        </style>
      </head>
      <body>
        <div class="Section1">
          <!-- Top Classification & eOffice No -->
          <table style="width: 100%; margin-bottom: 12pt;">
            <tr>
              <td style="width: 30%; font-size: 9pt; font-weight: bold; color: #64748b; vertical-align: top;">
                eOffice Computer No:<br><span style="color: #0f172a;">E-3498234</span>
              </td>
              <td style="width: 40%; text-align: center; vertical-align: top;">
                <strong style="color: #c00000; font-size: 12pt; text-transform: uppercase; letter-spacing: 2pt;">${activeLetter.classification}</strong>
              </td>
              <td style="width: 30%;"></td>
            </tr>
          </table>
          <table style="width:100%; margin-bottom:12pt; padding-bottom:8pt;">
            <tr>
              <td style="width:36%; color:#c00000; text-align:center; vertical-align:top; font-size:10.5pt; line-height:1.35;">
                <strong style="font-size:13pt; color:#c00000;">${user.hindiName || 'अनुराग अ. बावस्कर'}</strong><br>
                <strong style="font-size:10pt; color:#c00000;">${user.hindiDesignation || 'अपर अनुभाग अधिकारी'}</strong><br>
                <strong style="font-size:12pt; color:#c00000;">${user.name || 'Anurag A. Bawaskar'}</strong><br>
                <strong style="font-size:9.5pt; color:#c00000;">${user.designation || 'ADDITIONAL SECTION OFFICER'}</strong><br>
                <span style="font-size:9pt; color:#0066cc; text-decoration:underline;">E-mail :</span> <span style="font-size:9pt; color:#c00000;">${user.email || 'anurag.bawaskar.6328@gov.in'}</span><br>
                <span style="font-size:9pt; color:#0066cc; text-decoration:underline;">Website :</span> <span style="font-size:9pt; color:#c00000;">www.mod.gov.in</span>
              </td>
              <td style="width:28%; text-align:center; vertical-align:top;">
                ${activeLetter.crestStyle === 'goi_logo' ? `
                  <strong style="font-size:11pt; color:#c00000;">GOVERNMENT OF INDIA</strong>
                ` : `
                  <strong style="font-size:11pt; color:#c00000;">भारत सरकार / GOVT. OF INDIA</strong><br>
                  <strong style="font-size:9pt; color:#c00000;">सत्यमेव जयते</strong>
                `}
              </td>
              <td style="width:36%; text-align:center; color:#c00000; vertical-align:top; font-size:10.5pt; line-height:1.35;">
                <strong style="font-size:12pt; color:#c00000;">भारत सरकार</strong><br>
                <strong style="color:#c00000;">रक्षा मंत्रालय</strong><br>
                <strong style="color:#c00000;">डी.आर.डी.ओ.</strong><br>
                <strong style="font-size:11.5pt; color:#c00000;">Government of India</strong><br>
                <strong style="color:#c00000;">Ministry of Defence</strong><br>
                <strong style="color:#c00000;">DRDO</strong><br>
                <span style="font-size:9pt; color:#c00000;">डी.आर.डी.ओ. भवन, नई दिल्ली-110011</span><br>
                <span style="font-size:9pt; color:#c00000;">DRDO Bhawan, New Delhi-110011</span><br>
                <span style="font-size:9pt; color:#0066cc; text-decoration:underline;">Tel. :</span> <span style="font-size:9pt; color:#c00000;">${user.phone || '23092020, 23092443'}</span><br>
                <span style="font-size:9pt; color:#0066cc; text-decoration:underline;">Telefax :</span> <span style="font-size:9pt; color:#c00000;">${user.telefax || '23092546'}</span>
              </td>
            </tr>
          </table>

          <table style="width:100%; border:1.5pt solid #000000; margin-bottom:14pt;">
            <tr>
              <td style="width:75%; padding:5pt 10pt; border-right:1.5pt solid #000000; font-size:11pt;">
                <strong>FILE NO :</strong> ${inputFileNo.value || activeLetter.fileNo || ''}
              </td>
              <td style="width:25%; padding:5pt 10pt; text-align:left; font-size:11pt;">
                <strong>DATE -</strong> ${inputDate.value || activeLetter.date || ''}
              </td>
            </tr>
          </table>

          ${paperRecipient.innerText ? `
            <div style="margin-bottom:12pt; font-size:11pt;">
              <strong>To,</strong><br>
              <div style="margin-left:14pt; white-space:pre-line;">${paperRecipient.innerText}</div>
            </div>
          ` : ''}

          ${paperSubject.innerText ? `
            <div style="margin:12pt 0; font-size:11.5pt; font-weight:bold; color:#002B49;">
              SUBJECT: <span style="text-decoration:underline;">${paperSubject.innerText}</span>
            </div>
          ` : ''}

          ${paperSalutation.innerText ? `
            <div style="margin-bottom:10pt; font-size:11pt; font-weight:bold;">
              ${paperSalutation.innerText}
            </div>
          ` : ''}

          <div style="font-size:11pt; line-height:1.6; text-align:justify; margin-bottom:24pt;">
            ${paperBody.innerHTML}
          </div>

          ${(toggleSignature ? toggleSignature.checked : true) && (paperRecipient.innerText || paperSubject.innerText || paperSignOff.innerText) ? `
            <table style="width:100%; margin-top:20pt;">
              <tr>
                <td style="width:55%; vertical-align:bottom; font-size:9.5pt; color:#475569;">
                  <!-- Removed copy forwarded block -->
                </td>
                <td style="width:45%; text-align:right; vertical-align:bottom;">
                  <div style="font-size:10.5pt; color:#64748b; margin-bottom:6pt;">${paperSignOff.innerText}</div>
                  
                  <table style="width: 250px; border: 2pt solid #16a34a; background: #f0fdf4; margin-left: auto; border-collapse: collapse;">
                    <tr>
                      <td style="width: 40px; text-align: center; vertical-align: top; padding: 6px; font-size: 24pt; color: #16a34a; font-family: sans-serif;">☑</td>
                      <td style="padding: 6px; font-family: sans-serif; text-align: left;">
                        <div style="font-size: 10pt; font-weight: bold; color: #166534; border-bottom: 1pt dotted #16a34a; margin-bottom: 4px; padding-bottom: 2px;">Signature Valid</div>
                        <div style="font-size: 8pt; color: #15803d; line-height: 1.4;">
                          Digitally signed by <strong>${user.fullName || user.name}</strong><br>
                          Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST<br>
                          Reason: Approved<br>
                          Location: New Delhi
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <div style="margin-top: 8pt;">
                    <strong style="font-size:11pt; color:#002B49;">(${user.fullName || user.name})</strong><br>
                    <span style="font-size:9.5pt; color:#475569;">${user.designation}</span><br>
                    <span style="font-size:8.5pt; color:#64748b;">Ministry of Defence &bull; DRDO</span>
                  </div>
                </td>
              </tr>
            </table>
          ` : ''}

          <!-- Authentic eOffice Bottom Footer -->
          <div style="text-align: center; margin-top: 24pt; padding-top: 12pt; border-top: 1pt dashed #cbd5e1;">
            <strong style="color: #c00000; font-size: 12pt; text-transform: uppercase; letter-spacing: 2pt;">${activeLetter.classification}</strong>
            <table style="width: 100%; margin-top: 8pt; font-size: 9pt; color: #475569;">
              <tr>
                <td style="text-align: left;"><strong>eOffice Receipt No:</strong> E-3498234 / 2026 / DRDO-HQ</td>
                <td style="text-align: right;">Generated via NIC eOffice System &bull; Page 1 of 1</td>
              </tr>
            </table>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([wordContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = cleanFileName;
    a.click();
    URL.revokeObjectURL(url);
  });

  // AI Document Generator Logic (Gemini API)
  const btnGenerateAi = container.querySelector('#btn-generate-ai');
  const aiPromptInput = container.querySelector('#ai-prompt-input');
  
  if (btnGenerateAi && aiPromptInput) {
    btnGenerateAi.addEventListener('click', async () => {
      const prompt = aiPromptInput.value.trim();
      if (!prompt) {
        alert("Please enter a prompt for the AI to generate.");
        return;
      }
      
      const icon = container.querySelector('#ai-btn-icon');
      const text = container.querySelector('#ai-btn-text');
      icon.innerText = "⏳";
      text.innerText = "Processing via Titan AI...";
      btnGenerateAi.style.background = "#6366f1";
      btnGenerateAi.disabled = true;
      
      try {
        const apiKey = "AIzaSyDmuGktyOTVGfBdka1vp73hlU2HSxIgN44";
        const systemPrompt = `You are an expert Government of India official drafting formal correspondence. 
Based on the user's prompt, generate an official letter. 
Return a JSON object with exactly three fields:
"recipient": HTML formatted address block for the 'To' field (use <br> for new lines).
"subject": Plain text subject line.
"body": HTML formatted body of the letter (use <p> for paragraphs, keep it highly professional, bureaucratic, and formal).
Do not use markdown blocks around the JSON output, return raw valid JSON.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt + "\\n\\nUser Prompt: " + prompt }] }]
          })
        });

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
          let aiText = data.candidates[0].content.parts[0].text;
          
          // Foolproof JSON extraction
          const startIndex = aiText.indexOf('{');
          const endIndex = aiText.lastIndexOf('}');
          if (startIndex === -1 || endIndex === -1) {
            throw new Error("Could not parse JSON from AI response");
          }
          
          const result = JSON.parse(aiText.substring(startIndex, endIndex + 1));
          
          if (result.recipient) {
            paperRecipientWrap.style.display = 'block';
            paperRecipient.innerHTML = result.recipient;
          }
          if (result.subject) {
            paperSubjectWrap.style.display = 'block';
            paperSubject.innerText = result.subject;
          }
          if (result.body) {
            paperSalutation.style.display = 'block';
            paperSalutation.innerText = "Respected Sir/Madam,";
            paperBody.innerHTML = result.body;
          }
          
          // Trigger sync to activeLetter
          activeLetter.recipient = paperRecipient.innerText;
          activeLetter.subject = paperSubject.innerText;
          activeLetter.body = paperBody.innerHTML;
        } else {
          throw new Error("Invalid AI response");
        }
      } catch (err) {
        console.error("AI Generation Error:", err);
        alert("Titan AI Error: " + err.message);
      } finally {
        icon.innerText = "⚡";
        text.innerText = "Generate Official Draft";
        btnGenerateAi.style.background = "#4f46e5";
        btnGenerateAi.disabled = false;
      }
    });
  }

  // Print Letter Button
  const btnPrint = container.querySelector('#btn-studio-print-letter');
  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // Copy Text Button
  const btnCopy = container.querySelector('#btn-copy-text');
  btnCopy.addEventListener('click', () => {
    const textToCopy = `FILE NO: ${inputFileNo.value}\nDATE: ${inputDate.value}\n\nTo,\n${paperRecipient.innerText}\n\nSUBJECT: ${paperSubject.innerText}\n\n${paperSalutation.innerText}\n\n${paperBody.innerText}\n\n${paperSignOff.innerText}\n(${user.fullName || user.name})\n${user.designation}\nMinistry of Defence • DRDO`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      btnCopy.innerHTML = '<span>✅</span> Copied to Clipboard!';
      setTimeout(() => {
        btnCopy.innerHTML = '<span>📋</span> Copy Letter Body Text';
      }, 2500);
    });
  });

  // Save to Dispatch Diary
  const btnSave = container.querySelector('#btn-save-dispatch');
  btnSave.addEventListener('click', () => {
    btnSave.innerHTML = '<span>✅</span> Saved in e-Office FTS Diary!';
    setTimeout(() => {
      btnSave.innerHTML = '<span>💾</span> Save to e-Office Dispatch Diary';
    }, 2500);
  });

  // Reset to Default
  const btnReset = container.querySelector('#btn-reset-letter');
  btnReset.addEventListener('click', () => {
    if (confirm('Reset letterhead to original template content?')) {
      loadTemplate(selectPreset.value);
    }
  });
}
