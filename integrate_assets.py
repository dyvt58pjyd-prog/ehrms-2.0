import base64
import os

with open('assets/drdo_logo_small.png', 'rb') as f:
    drdo_b64 = base64.b64encode(f.read()).decode('ascii')

with open('assets/mod_stamp.png', 'rb') as f:
    stamp_b64 = base64.b64encode(f.read()).decode('ascii')

print(f"Loaded DRDO logo: {len(drdo_b64)} chars")
print(f"Loaded MoD stamp: {len(stamp_b64)} chars")

with open('js/downloader.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add exports for DRDO_LOGO_BASE64 and MOD_STAMP_BASE64 if not already present
if 'DRDO_LOGO_BASE64' not in content:
    target = "export const EMBLEM_BASE64 = "
    idx = content.find(target)
    if idx != -1:
        # Find end of that line
        end_idx = content.find('\n', idx)
        new_exports = f"\nexport const DRDO_LOGO_BASE64 = 'data:image/png;base64,{drdo_b64}';\nexport const MOD_STAMP_BASE64 = 'data:image/png;base64,{stamp_b64}';\n"
        content = content[:end_idx] + new_exports + content[end_idx:]
        print("Added DRDO_LOGO_BASE64 and MOD_STAMP_BASE64 exports")

# 2. Add CSS classes to wrapGovDocument styles
css_snippet = """    .doc-emblem-pair {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin: 0 auto 4px;
    }
    .doc-logo-drdo {
      height: 52px;
      width: auto;
      object-fit: contain;
      display: inline-block;
    }
    .doc-stamp-mod {
      width: 80px;
      height: 80px;
      object-fit: contain;
      display: inline-block;
      filter: drop-shadow(0 1px 3px rgba(0,0,0,0.15));
      vertical-align: middle;
    }"""

if '.doc-emblem-pair' not in content:
    content = content.replace('    .doc-emblem {', f'{css_snippet}\n    .doc-emblem {{')
    print("Added CSS classes for emblem pair, DRDO logo, and MoD stamp")

# 3. Update downloadTransferOrder: header and signature block
old_transfer_header = """    <div class="doc-header" style="position: relative;">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">"""
new_transfer_header = """    <div class="doc-header" style="position: relative;">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>"""

if old_transfer_header in content:
    content = content.replace(old_transfer_header, new_transfer_header)
    print("Updated downloadTransferOrder header with DRDO logo")

old_transfer_sig = """      <div style="display: flex; gap: 20px; align-items: flex-end;">
        <div class="sig-box">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 20px; color: #002B49;">Rajender Singh</div>"""
new_transfer_sig = """      <div style="display: flex; gap: 16px; align-items: center;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="Ministry of Defence Official Seal">
        <div class="sig-box">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 20px; color: #002B49;">Rajender Singh</div>"""

if old_transfer_sig in content:
    content = content.replace(old_transfer_sig, new_transfer_sig)
    print("Updated downloadTransferOrder signature with MoD stamp")

# 4. Update downloadSpecialOperationOrder: header and signature
old_special_header = """    <div class="doc-header" style="position: relative;">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF DEFENCE &bull; JOINT SPECIAL OPERATIONS COMMAND</h4>"""
new_special_header = """    <div class="doc-header" style="position: relative;">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF DEFENCE &bull; JOINT SPECIAL OPERATIONS COMMAND &bull; DRDO</h4>"""

if old_special_header in content:
    content = content.replace(old_special_header, new_special_header)
    print("Updated downloadSpecialOperationOrder header with DRDO logo")

old_special_sig = """        <div class="sig-box" style="text-align: center; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 4px; background: #fafafa;">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 18px; color: #002B49;">Rajeev Ranjan</div>"""
new_special_sig = """        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="Ministry of Defence Official Seal">
        <div class="sig-box" style="text-align: center; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 4px; background: #fafafa;">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 18px; color: #002B49;">Rajeev Ranjan</div>"""

if old_special_sig in content:
    content = content.replace(old_special_sig, new_special_sig)
    print("Updated downloadSpecialOperationOrder signature with MoD stamp")

# 5. Update downloadSecurityClearanceCertificate: header and countersignature
old_vetting_header = """    <div class="doc-header" style="position: relative;">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DIRECTORATE GENERAL OF DEFENCE INTELLIGENCE &amp; SECURITY</h4>"""
new_vetting_header = """    <div class="doc-header" style="position: relative;">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DIRECTORATE GENERAL OF DEFENCE INTELLIGENCE &amp; SECURITY &bull; DRDO WING</h4>"""

if old_vetting_header in content:
    content = content.replace(old_vetting_header, new_vetting_header)
    print("Updated downloadSecurityClearanceCertificate header with DRDO logo")

old_vetting_sig = """      <div style="display: flex; gap: 20px; align-items: flex-end;">
        <div class="sig-box">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 18px; color: #002B49;">Anil Chauhan</div>"""
new_vetting_sig = """      <div style="display: flex; gap: 16px; align-items: center;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="Ministry of Defence Official Seal">
        <div class="sig-box">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 18px; color: #002B49;">Anil Chauhan</div>"""

if old_vetting_sig in content:
    content = content.replace(old_vetting_sig, new_vetting_sig)
    print("Updated downloadSecurityClearanceCertificate countersignature with MoD stamp")

# 6. Update downloadCtgSanctionOrder
old_ctg_header = """    <div class="doc-header">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF DEFENCE &bull; FINANCE &amp; ESTABLISHMENT WING</h4>"""
new_ctg_header = """    <div class="doc-header">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF DEFENCE &bull; DRDO FINANCE &amp; ESTABLISHMENT WING</h4>"""

if old_ctg_header in content:
    content = content.replace(old_ctg_header, new_ctg_header)
    print("Updated downloadCtgSanctionOrder header with DRDO logo")

old_ctg_sig = """    <div class="sig-block">
      <div>Copy to: PAO (DDO 10501), DRDO Accounts Pune, Service Book</div>
      <div class="sig-box">"""
new_ctg_sig = """    <div class="sig-block">
      <div>Copy to: PAO (DDO 10501), DRDO Accounts Pune, Service Book</div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="MoD Stamp">
        <div class="sig-box">"""

if old_ctg_sig in content:
    content = content.replace(old_ctg_sig, new_ctg_sig)
    content = content.replace("""        <span style="color: #059669; font-weight: 700;">[SANCTIONED &amp; DISBURSED]</span>
      </div>
    </div>""", """        <span style="color: #059669; font-weight: 700;">[SANCTIONED &amp; DISBURSED]</span>
        </div>
      </div>
    </div>""")
    print("Updated downloadCtgSanctionOrder signature with MoD stamp")

# 7. Update downloadSpecialDutyAllowanceOrder
old_sda_header = """    <div class="doc-header">
      <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="Emblem">
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF DEFENCE &bull; DEFENCE FINANCIAL SERVICES</h4>"""
new_sda_header = """    <div class="doc-header">
      <div class="doc-emblem-pair">
        <img src="${EMBLEM_BASE64}" class="doc-emblem" style="margin:0; height:52px;" alt="National Emblem">
        <img src="${DRDO_LOGO_BASE64}" class="doc-logo-drdo" alt="DRDO Logo">
      </div>
      <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
      <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
      <h4>DEPARTMENT OF DEFENCE &bull; DEFENCE FINANCIAL SERVICES &bull; DRDO</h4>"""

if old_sda_header in content:
    content = content.replace(old_sda_header, new_sda_header)
    print("Updated downloadSpecialDutyAllowanceOrder header with DRDO logo")

old_sda_sig = """    <div class="sig-block">
      <div>Sanction conveyed with concurrence of Integrated Financial Adviser (IFA Defence)</div>
      <div class="sig-box">"""
new_sda_sig = """    <div class="sig-block">
      <div>Sanction conveyed with concurrence of Integrated Financial Adviser (IFA Defence)</div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="MoD Stamp">
        <div class="sig-box">"""

if old_sda_sig in content:
    content = content.replace(old_sda_sig, new_sda_sig)
    content = content.replace("""        <span style="color: #059669; font-weight: 700;">[FINANCIAL CONCURRENCE CONVEYED]</span>
      </div>
    </div>
  `;""", """        <span style="color: #059669; font-weight: 700;">[FINANCIAL CONCURRENCE CONVEYED]</span>
        </div>
      </div>
    </div>
  `;""")
    print("Updated downloadSpecialDutyAllowanceOrder signature with MoD stamp")

# 8. Update downloadWarRoomPass
old_warroom_header = """      <div style="text-align: center; border-bottom: 2px solid #7f1d1d; padding-bottom: 8px;">
        <img src="${EMBLEM_BASE64}" style="width: 38px; height: 58px;" alt="Emblem"><br>"""
new_warroom_header = """      <div style="text-align: center; border-bottom: 2px solid #7f1d1d; padding-bottom: 8px;">
        <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 4px;">
          <img src="${EMBLEM_BASE64}" style="width: 38px; height: 58px;" alt="National Emblem">
          <img src="${DRDO_LOGO_BASE64}" style="height: 48px; width: auto;" alt="DRDO Logo">
        </div>"""

if old_warroom_header in content:
    content = content.replace(old_warroom_header, new_warroom_header)
    print("Updated downloadWarRoomPass header with DRDO logo")

old_warroom_sig = """      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 12px; font-size: 9px; color: #64748b;">
        <div>SSO Security Barcode: <code>*MOD-WAR-ROOM-08104*</code></div>
        <div style="text-align: right;">
          <strong style="color: #002B49;">Chief Security Officer (CSO)</strong><br>
          Ministry of Defence, South Block
        </div>
      </div>"""
new_warroom_sig = """      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 9px; color: #64748b;">
        <div>SSO Security Barcode: <code>*MOD-WAR-ROOM-08104*</code><br>Electronic Stamp Verified</div>
        <img src="${MOD_STAMP_BASE64}" style="width: 62px; height: 62px; object-fit: contain;" alt="MoD Stamp">
        <div style="text-align: right;">
          <strong style="color: #002B49;">Chief Security Officer (CSO)</strong><br>
          Ministry of Defence, South Block
        </div>
      </div>"""

if old_warroom_sig in content:
    content = content.replace(old_warroom_sig, new_warroom_sig)
    print("Updated downloadWarRoomPass signature with MoD stamp")

# 9. Update downloadPaySlip DDO signature block
old_payslip_sig = """    <div class="sig-block">
      <div>Generated via Centralized e-HRMS 2.0 &bull; PFMS Integrated System</div>
      <div class="sig-box">
        <strong style="color: #002B49;">Drawing &amp; Disbursing Officer (DDO)</strong><br>"""
new_payslip_sig = """    <div class="sig-block">
      <div>Generated via Centralized e-HRMS 2.0 &bull; PFMS Integrated System</div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="Department Stamp">
        <div class="sig-box">
          <strong style="color: #002B49;">Drawing &amp; Disbursing Officer (DDO)</strong><br>"""

if old_payslip_sig in content:
    content = content.replace(old_payslip_sig, new_payslip_sig)
    content = content.replace("""        <span style="color: #059669; font-weight: 700;">[DIGITALLY SIGNED VIA e-SIGN DSC]</span>
      </div>
    </div>
  `;
  const doc = wrapGovDocument(`Payslip_${month}_${user.name.replace(/\\s+/g, '_')}`, body, true);""", """        <span style="color: #059669; font-weight: 700;">[DIGITALLY SIGNED VIA e-SIGN DSC]</span>
        </div>
      </div>
    </div>
  `;
  const doc = wrapGovDocument(`Payslip_${month}_${user.name.replace(/\\s+/g, '_')}`, body, true);""")
    print("Updated downloadPaySlip signature with MoD stamp")

# 10. Update downloadLeaveOrder signature
old_leave_sig = """    <div class="sig-block">
      <div>Sanctioned under Central Civil Services (Leave) Rules, 1972</div>
      <div class="sig-box">
        <strong style="color: #002B49;">Competent Sanctioning Authority</strong><br>"""
new_leave_sig = """    <div class="sig-block">
      <div>Sanctioned under Central Civil Services (Leave) Rules, 1972</div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${MOD_STAMP_BASE64}" class="doc-stamp-mod" alt="Department Stamp">
        <div class="sig-box">
          <strong style="color: #002B49;">Competent Sanctioning Authority</strong><br>"""

if old_leave_sig in content:
    content = content.replace(old_leave_sig, new_leave_sig)
    content = content.replace("""        <span style="color: #059669; font-weight: 700;">[DIGITALLY SANCTIONED]</span>
      </div>
    </div>
  `;
  const doc = wrapGovDocument(`Leave_Sanction_Order_${app.id}`, body, true);""", """        <span style="color: #059669; font-weight: 700;">[DIGITALLY SANCTIONED]</span>
        </div>
      </div>
    </div>
  `;
  const doc = wrapGovDocument(`Leave_Sanction_Order_${app.id}`, body, true);""")
    print("Updated downloadLeaveOrder with MoD stamp")

with open('js/downloader.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated js/downloader.js with DRDO logo and MoD stamp!")
