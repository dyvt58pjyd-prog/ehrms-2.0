import re

with open('js/downloader.js', 'r', encoding='utf-8') as f:
    dl = f.read()

# 1. Update downloadPaySlip header to include DRDO logo & Defence details
old_payslip_hdr = """    <div class="doc-header">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS, SOUTH BLOCK, NEW DELHI</h4>"""
new_payslip_hdr = """    <div class="doc-header">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; DRDO PUNE ESTABLISHMENT</h4>"""

if old_payslip_hdr in dl:
    dl = dl.replace(old_payslip_hdr, new_payslip_hdr)
    print("Updated downloadPaySlip header")

# 2. Update downloadPaySlip signature to include MoD Stamp
old_payslip_sig2 = """      <div class="sig-box">
        <strong style="color: #002B49;">${user.disbursingOfficer.name}</strong><br>
        ${user.disbursingOfficer.designation} (DDO Code: ${user.ddoCode || '10501'})<br>
        Department of Military Affairs, MoD &bull; <span style="color: #059669; font-weight: 700;">[DIGITALLY SIGNED VIA DSC]</span>
      </div>"""
new_payslip_sig2 = """      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="MoD Department Stamp">
        <div class="sig-box">
          <strong style="color: #002B49;">${user.disbursingOfficer.name}</strong><br>
          ${user.disbursingOfficer.designation} (DDO Code: ${user.ddoCode || '10501'})<br>
          Department of Military Affairs, MoD &bull; <span style="color: #059669; font-weight: 700;">[DIGITALLY SIGNED VIA DSC]</span>
        </div>
      </div>"""

if old_payslip_sig2 in dl:
    dl = dl.replace(old_payslip_sig2, new_payslip_sig2)
    print("Updated downloadPaySlip signature with MoD stamp")

# 3. Update downloadServiceBook header & verification block
old_sb_hdr = """    <div class="doc-header">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS</h4>"""
new_sb_hdr = """    <div class="doc-header">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; DRDO PUNE FORMATION</h4>"""

if old_sb_hdr in dl:
    dl = dl.replace(old_sb_hdr, new_sb_hdr)
    print("Updated downloadServiceBook header")

old_sb_sig = """    <div class="sig-block">
      <div>This e-Service Book is an authenticated digital record maintained under Supplementary Rules (SR 199).</div>
      <div class="sig-box">
        <strong style="color: #002B49;">Cadre Controlling Authority</strong><br>
        Under Secretary (Estt), MoD<br>
        <span style="color: #059669; font-weight: 700;">[DIGITALLY CERTIFIED ELECTRONIC RECORD]</span>
      </div>
    </div>"""
new_sb_sig = """    <div class="sig-block">
      <div>This e-Service Book is an authenticated digital record maintained under Supplementary Rules (SR 199).</div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="MoD Department Stamp">
        <div class="sig-box">
          <strong style="color: #002B49;">Cadre Controlling Authority</strong><br>
          Under Secretary (Estt), MoD<br>
          <span style="color: #059669; font-weight: 700;">[DIGITALLY CERTIFIED ELECTRONIC RECORD]</span>
        </div>
      </div>
    </div>"""

if old_sb_sig in dl:
    dl = dl.replace(old_sb_sig, new_sb_sig)
    print("Updated downloadServiceBook signature with MoD stamp")

# 4. Update downloadAparDossier header & seal
old_apar_hdr = """    <div class="doc-header">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS</h4>
      <div class="doc-title-strip">
        ANNUAL PERFORMANCE ASSESSMENT REPORT (APAR) &bull; REPORTING YEAR: 2025-2026
      </div>"""
new_apar_hdr = """    <div class="doc-header">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; DRDO PUNE CADRE</h4>
      <div class="doc-title-strip">
        ANNUAL PERFORMANCE ASSESSMENT REPORT (APAR) &bull; REPORTING YEAR: 2025-2026
      </div>"""

if old_apar_hdr in dl:
    dl = dl.replace(old_apar_hdr, new_apar_hdr)
    print("Updated downloadAparDossier header")

old_apar_sig = """    <div class="sig-block">
      <div>SPARROW Digital Verification ID: <code>SPARROW-MOD-2026-948102-ACPT</code></div>
      <div class="sig-box">
        <strong style="color: #002B49;">Accepting Authority</strong><br>
        Joint Secretary (Estt), MoD<br>
        <span style="color: #059669; font-weight: 700;">[DIGITALLY RECORDED &amp; SEALED]</span>
      </div>
    </div>"""
new_apar_sig = """    <div class="sig-block">
      <div>SPARROW Digital Verification ID: <code>SPARROW-MOD-2026-948102-ACPT</code></div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="MoD Department Stamp">
        <div class="sig-box">
          <strong style="color: #002B49;">Accepting Authority</strong><br>
          Joint Secretary (Estt), MoD<br>
          <span style="color: #059669; font-weight: 700;">[DIGITALLY RECORDED &amp; SEALED]</span>
        </div>
      </div>
    </div>"""

if old_apar_sig in dl:
    dl = dl.replace(old_apar_sig, new_apar_sig)
    print("Updated downloadAparDossier signature with MoD stamp")

# 5. Update downloadIprAck header & seal
old_ipr_hdr = """    <div class="doc-header">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <div class="doc-title-strip">
        ACKNOWLEDGEMENT &bull; IMMOVABLE PROPERTY RETURN (IPR) FOR THE CALENDAR YEAR 2025
      </div>"""
new_ipr_hdr = """    <div class="doc-header">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <div class="doc-title-strip">
        ACKNOWLEDGEMENT &bull; IMMOVABLE PROPERTY RETURN (IPR) FOR THE CALENDAR YEAR 2025
      </div>"""

if old_ipr_hdr in dl:
    dl = dl.replace(old_ipr_hdr, new_ipr_hdr)
    print("Updated downloadIprAck header")

old_ipr_sig = """    <div class="sig-block">
      <div>Filed under Rule 18(1) of Central Civil Services (Conduct) Rules, 1964.</div>
      <div class="sig-box">
        <strong style="color: #002B49;">Chief Vigilance Officer (CVO)</strong><br>
        Ministry of Defence, New Delhi<br>
        <span style="color: #059669; font-weight: 700;">[DIGITALLY RECORDED &amp; ACKNOWLEDGED]</span>
      </div>
    </div>"""
new_ipr_sig = """    <div class="sig-block">
      <div>Filed under Rule 18(1) of Central Civil Services (Conduct) Rules, 1964.</div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="MoD Department Stamp">
        <div class="sig-box">
          <strong style="color: #002B49;">Chief Vigilance Officer (CVO)</strong><br>
          Ministry of Defence, New Delhi<br>
          <span style="color: #059669; font-weight: 700;">[DIGITALLY RECORDED &amp; ACKNOWLEDGED]</span>
        </div>
      </div>
    </div>"""

if old_ipr_sig in dl:
    dl = dl.replace(old_ipr_sig, new_ipr_sig)
    print("Updated downloadIprAck signature with MoD stamp")

# 6. Update downloadLeaveOrder header & seal
old_leave_hdr = """    <div class="doc-header">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS</h4>
      <div class="doc-title-strip">
        SANCTION ORDER &bull; LEAVE APPLICATION NO: ${app.id}
      </div>"""
new_leave_hdr = """    <div class="doc-header">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; DRDO PUNE</h4>
      <div class="doc-title-strip">
        SANCTION ORDER &bull; LEAVE APPLICATION NO: ${app.id}
      </div>"""

if old_leave_hdr in dl:
    dl = dl.replace(old_leave_hdr, new_leave_hdr)
    print("Updated downloadLeaveOrder header")

# 7. Update downloadClaimOrder header & seal
old_claim_hdr = """    <div class="doc-header">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS</h4>
      <div class="doc-title-strip">
        SETTLEMENT &bull; ALLOWANCE CLAIM NO: ${claim.id}
      </div>"""
new_claim_hdr = """    <div class="doc-header">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF MILITARY AFFAIRS &bull; DRDO PUNE</h4>
      <div class="doc-title-strip">
        SETTLEMENT &bull; ALLOWANCE CLAIM NO: ${claim.id}
      </div>"""

if old_claim_hdr in dl:
    dl = dl.replace(old_claim_hdr, new_claim_hdr)
    print("Updated downloadClaimOrder header")

old_claim_sig = """    <div class="sig-block">
      <div>Audited and passed for payment under Central Treasury Rules.</div>
      <div class="sig-box">
        <strong style="color: #002B49;">Pay &amp; Accounts Officer (PAO)</strong><br>
        MoD, South Block, New Delhi<br>
        <span style="color: #059669; font-weight: 700;">[AUDITED &amp; DISBURSED]</span>
      </div>
    </div>"""
new_claim_sig = """    <div class="sig-block">
      <div>Audited and passed for payment under Central Treasury Rules.</div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="MoD Department Stamp">
        <div class="sig-box">
          <strong style="color: #002B49;">Pay &amp; Accounts Officer (PAO)</strong><br>
          MoD, South Block, New Delhi<br>
          <span style="color: #059669; font-weight: 700;">[AUDITED &amp; DISBURSED]</span>
        </div>
      </div>
    </div>"""

if old_claim_sig in dl:
    dl = dl.replace(old_claim_sig, new_claim_sig)
    print("Updated downloadClaimOrder signature with MoD stamp")

# 8. Update downloadSpecialOperationOrder: add stamp between signature blocks
old_special_sig_block = """      <div style="display: flex; gap: 20px; align-items: flex-end;">
        <!-- Countersignature of CDS -->
        <div class="sig-box" style="text-align: center; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 4px; background: #fafafa;">"""
new_special_sig_block = """      <div style="display: flex; gap: 16px; align-items: center;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" style="width: 78px; height: 78px;" alt="Ministry of Defence Official Seal">
        <!-- Countersignature of CDS -->
        <div class="sig-box" style="text-align: center; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 4px; background: #fafafa;">"""

if old_special_sig_block in dl:
    dl = dl.replace(old_special_sig_block, new_special_sig_block)
    print("Updated downloadSpecialOperationOrder signature with MoD stamp")

with open('js/downloader.js', 'w', encoding='utf-8') as f:
    f.write(dl)

print("downloader.js patch completed successfully.")
