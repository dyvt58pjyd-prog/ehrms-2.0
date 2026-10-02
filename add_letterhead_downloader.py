with open('js/downloader.js', 'r', encoding='utf-8') as f:
    dl = f.read()

letterhead_func = """
/**
 * 19. Download Official Government Letterhead Document
 * Ministry of Defence - DRDO - Office of Anurag A. Bawaskar, ASO-I
 */
export function downloadOfficialLetterhead(user, letter) {
  if (!user) {
    user = {
      name: 'ANURAG A. BAWASKAR',
      hindiName: 'अनुराग अ. बावस्कर',
      designation: 'ADDITIONAL SECTION OFFICER',
      hindiDesignation: 'अपर अनुभाग अधिकारी',
      email: 'anurag.bawaskar.6328@gov.in',
      phone: '011-23092020, 23092443',
      telefax: '011-23092546',
      empId: 'MOD-DMA-2024-8104'
    };
  }

  if (!letter) {
    letter = {
      fileNo: 'MoD/DRDO/ASO-I/2026/F-8104',
      date: '10-September-2026',
      classification: 'DEMI-OFFICIAL (D.O.)',
      recipient: 'Dr. Chandrashekhar R. Vyas, Sc. \\'H\\' / Outstanding Scientist\\nDirector, Armament Research & Development Establishment (ARDE)\\nDefence Research & Development Organisation (DRDO), Dighi, Pune - 411015',
      subject: 'Operational Readiness of Secure Cryptographic Network & High-Performance Computing Laboratory at DRDO Dighi, Pune - Advance Intimation regarding Joining',
      salutation: 'Respected Sir,',
      body: `<p>Kindly refer to Ministry of Defence Gazette Notification No. <code>MoD/DRDO/TRF/2026/102</code> dated 08-Sep-2026 and Special Operational Movement Directives under Operation VAJRA-SHAKTI.</p>
<p>I have the honour to submit that pursuant to the comprehensive multi-agency security vetting and Level-1 Top Secret clearance accorded by the Directorate General of Defence Intelligence & Security (DIA), I have completed the formal handover protocols at the President\\'s Secretariat / Cabinet Secretariat, Rashtrapati Bhavan, New Delhi.</p>
<p>As per the orders of the Competent Authority, I shall be reporting to the Defence Research & Development Organisation (DRDO), Dighi, Pune formation on 14-September-2026 (Forenoon) to assume substantive charge as <strong>Chief Information Security Specialist / Additional Section Officer - I (Group \\'A\\' Gazetted Cadre)</strong>.</p>
<p>The advance deployment manifest, encrypted hardware telemetry protocols, and requisite cryptographic authorizations have been transmitted through secure military WAN (SEC-MIL-NET-DEL-01). Requisite residential accommodation requisition under Type-V entitlement has also been initiated through the Estate Management Unit (EMU), DRDO Pashan Road, Pune.</p>
<p>I assure you of my utmost dedication to the strategic mandate of the Armament and Combat Engineering Cluster and look forward to your valued guidance.</p>`,
      signOff: 'Yours sincerely,',
      copyTo: '1. Office of the Chief of Defence Staff (CDS), South Block, New Delhi\\n2. Joint Secretary (Estt & Personnel), Ministry of Defence, New Delhi\\n3. Directorate of Cyber Security & Cryptography, DRDO Bhawan, New Delhi\\n4. Personal File & Guard Register 2026',
      showStamp: true,
      showWatermark: true,
      showBarcode: true
    };
  }

  const stampHtml = letter.showStamp !== false ? `
    <img src="${MOD_STAMP_BASE64}" style="width: 82px; height: 82px; object-fit: contain; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.15));" alt="MoD Stamp">
  ` : '';

  const watermarkHtml = letter.showWatermark !== false ? `
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.045; pointer-events: none; z-index: 0;">
      <img src="${EMBLEM_BASE64}" style="width: 320px; height: auto;" alt="Watermark">
    </div>
  ` : '';

  const classPill = letter.classification ? `
    <div style="text-align: center; margin-bottom: 6px;">
      <span style="display: inline-block; background: #990000; color: #ffffff; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; padding: 2px 10px; border-radius: 3px; text-transform: uppercase;">
        ${letter.classification}
      </span>
    </div>
  ` : '';

  const barcodeHtml = letter.showBarcode !== false ? `
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #cbd5e1; margin-top: 24px; padding-top: 6px; font-size: 8.5px; color: #64748b;">
      <div>Sec-Hash: <code>*MOD-DRDO-2026-F-8104-ALPHA*</code> &bull; Verified u/s 5 IT Act 2000</div>
      <div>Official Communications Repository &bull; National Informatics Centre (NIC) &bull; Page 1 of 1</div>
    </div>
  ` : '';

  const bodyContent = `
    <div style="position: relative; font-family: 'Times New Roman', Times, 'Segoe UI', serif; color: #111827; line-height: 1.6; padding: 10px 14px;">
      ${watermarkHtml}
      ${classPill}

      <!-- Master Government Letterhead Header (Authentic Bilingual Red Print) -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #8b0000; padding-bottom: 10px; margin-bottom: 8px;">
        
        <!-- Left: Officer Identity (Red Ink) -->
        <div style="width: 38%; font-size: 11px; line-height: 1.35; color: #990000;">
          <div style="font-size: 14.5px; font-weight: 800; color: #990000; font-family: 'Segoe UI', Arial, sans-serif;">${user.hindiName || 'अनुराग अ. बावस्कर'}</div>
          <div style="font-size: 11px; font-weight: 700; color: #990000; margin-bottom: 4px;">${user.hindiDesignation || 'अपर अनुभाग अधिकारी'}</div>
          <div style="font-size: 13.5px; font-weight: 800; color: #990000; letter-spacing: 0.5px;">${user.name || 'ANURAG A. BAWASKAR'}</div>
          <div style="font-size: 10.5px; font-weight: 700; color: #990000; text-transform: uppercase;">${user.designation || 'ADDITIONAL SECTION OFFICER'}</div>
          <div style="font-size: 9.5px; margin-top: 5px; color: #1e40af; line-height: 1.4;">
            <div>E-mail : <a href="mailto:${user.email || 'anurag.bawaskar.6328@gov.in'}" style="color: #1e40af; text-decoration: none;">${user.email || 'anurag.bawaskar.6328@gov.in'}</a></div>
            <div>Website : <a href="https://www.mod.gov.in" target="_blank" style="color: #1e40af; text-decoration: none;">www.mod.gov.in</a> &bull; <a href="https://drdo.gov.in" target="_blank" style="color: #1e40af; text-decoration: none;">drdo.gov.in</a></div>
          </div>
        </div>

        <!-- Center: State Emblem of India (Gold/Emblem) -->
        <div style="width: 22%; text-align: center;">
          <img src="${EMBLEM_BASE64}" style="width: 44px; height: 68px; object-fit: contain; margin: 0 auto 2px; display: block;" alt="State Emblem of India">
          <div style="font-size: 8.5px; font-weight: 700; color: #990000; letter-spacing: 0.5px;">सत्यमेव जयते</div>
        </div>

        <!-- Right: Ministry & DRDO Head Office (Red Ink) -->
        <div style="width: 38%; text-align: right; font-size: 11px; line-height: 1.35; color: #990000;">
          <div style="font-size: 13px; font-weight: 800; color: #990000;">भारत सरकार</div>
          <div style="font-size: 11.5px; font-weight: 700; color: #990000;">रक्षा मंत्रालय</div>
          <div style="font-size: 11.5px; font-weight: 700; color: #990000; margin-bottom: 4px;">डी.आर.डी.ओ.</div>
          <div style="font-size: 12.5px; font-weight: 800; color: #990000;">Government of India</div>
          <div style="font-size: 11px; font-weight: 700; color: #990000;">Ministry of Defence</div>
          <div style="font-size: 11px; font-weight: 800; color: #990000;">DRDO</div>
          <div style="font-size: 9.5px; color: #990000; margin-top: 4px; line-height: 1.35;">
            <div>डी.आर.डी.ओ. भवन, नई दिल्ली-110011</div>
            <div>DRDO Bhawan, New Delhi - 110011</div>
            <div>Tel. : ${user.phone || '011-23092020, 23092443'}</div>
            <div>Telefax : ${user.telefax || '011-23092546'}</div>
          </div>
        </div>

      </div>

      <!-- File Number & Date Horizontal Grid Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; border: 1.5px solid #002B49;">
        <tr>
          <td style="width: 58%; padding: 6px 10px; font-size: 11.5px; border-right: 1.5px solid #002B49; background: #f8fafc;">
            <strong>FILE NO :</strong> <code style="font-size: 12px; font-weight: 800; color: #002B49;">${letter.fileNo}</code>
          </td>
          <td style="width: 42%; padding: 6px 10px; font-size: 11.5px; background: #f8fafc; text-align: right;">
            <strong>DATE :</strong> <strong style="color: #002B49;">${letter.date}</strong>
          </td>
        </tr>
      </table>

      <!-- Recipient (To) -->
      ${letter.recipient ? `
        <div style="font-size: 12px; line-height: 1.5; margin-bottom: 14px; color: #0f172a;">
          <div style="font-weight: 700; margin-bottom: 2px;">To,</div>
          <div style="padding-left: 14px; white-space: pre-line;">${letter.recipient}</div>
        </div>
      ` : ''}

      <!-- Subject Line -->
      ${letter.subject ? `
        <div style="margin: 12px 0 14px 0; font-size: 12.5px; font-weight: 700; color: #002B49; border-left: 4px solid #8b0000; padding: 4px 10px; background: #fdf2f2; line-height: 1.45;">
          SUBJECT: <span style="text-decoration: underline;">${letter.subject}</span>
        </div>
      ` : ''}

      <!-- Salutation -->
      <div style="font-size: 12px; font-weight: 700; margin-bottom: 10px;">
        ${letter.salutation || 'Sir / Madam,'}
      </div>

      <!-- Letter Body Paragraphs -->
      <div style="font-size: 12px; line-height: 1.75; text-align: justify; color: #1e293b; margin-bottom: 24px;">
        ${letter.body}
      </div>

      <!-- Sign-off & Official Stamp Block -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 20px; page-break-inside: avoid;">
        <div style="max-width: 50%;">
          ${letter.copyTo ? `
            <div style="font-size: 9.5px; color: #475569; line-height: 1.4;">
              <strong>Copy forwarded for information &amp; record to:</strong><br>
              <div style="white-space: pre-line; margin-top: 2px;">${letter.copyTo}</div>
            </div>
          ` : ''}
        </div>

        <div style="display: flex; align-items: center; gap: 14px; text-align: center;">
          ${stampHtml}
          <div style="border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 4px; background: #fafafa; min-width: 170px;">
            <div style="font-size: 11px; color: #64748b; margin-bottom: 4px;">${letter.signOff || 'Yours sincerely,'}</div>
            <div style="font-family: 'Brush Script MT', cursive; font-size: 20px; color: #002B49; line-height: 1;">Anurag Bawaskar</div>
            <strong style="font-size: 11px; color: #002B49; display: block; margin-top: 4px;">(${user.name})</strong>
            <span style="font-size: 9.5px; color: #475569;">${user.designation}</span><br>
            <span style="font-size: 8.5px; color: #64748b;">Ministry of Defence &bull; DRDO</span><br>
            <span style="color: #059669; font-size: 8px; font-weight: 800;">[DIGITALLY SIGNED VIA e-SIGN DSC]</span>
          </div>
        </div>
      </div>

      ${barcodeHtml}
    </div>
  `;

  const doc = wrapGovDocument(`Official_Letter_${letter.fileNo.replace(/[^a-zA-Z0-9]/g, '_')}`, bodyContent, false);
  triggerDownload(`Official_Letter_${letter.fileNo.replace(/[^a-zA-Z0-9]/g, '_')}.html`, doc);
}
"""

if 'downloadOfficialLetterhead' not in dl:
    dl = dl.rstrip() + "\n\n" + letterhead_func.strip() + "\n"
    with open('js/downloader.js', 'w', encoding='utf-8') as f:
        f.write(dl)
    print("Added downloadOfficialLetterhead to js/downloader.js successfully!")
else:
    print("downloadOfficialLetterhead already present in downloader.js")
