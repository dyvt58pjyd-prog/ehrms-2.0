import re

# 1. Update ordersCirculars.js
with open('js/modules/ordersCirculars.js', 'r', encoding='utf-8') as f:
    oc = f.read()

# Update import to include base64 assets
old_import = """import {
  downloadSpecialOperationOrder,
  downloadTransferOrder,
  downloadSecurityClearanceCertificate,
  downloadCtgSanctionOrder,
  downloadSpecialDutyAllowanceOrder,
  downloadWarRoomPass
} from '../downloader.js';"""

new_import = """import {
  downloadSpecialOperationOrder,
  downloadTransferOrder,
  downloadSecurityClearanceCertificate,
  downloadCtgSanctionOrder,
  downloadSpecialDutyAllowanceOrder,
  downloadWarRoomPass,
  EMBLEM_BASE64,
  DRDO_LOGO_BASE64,
  MOD_STAMP_BASE64
} from '../downloader.js';"""

if old_import in oc:
    oc = oc.replace(old_import, new_import)
    print("Updated ordersCirculars.js imports")

# Update downloadGenericGazetteOrder
old_generic_doc = """      <div class="doc-header">
        <img src="assets/emblem.png" class="doc-emblem" alt="Emblem" style="width: 48px;">
        <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
        <h3>${cir.authority.toUpperCase()}</h3>
        <div class="doc-title-strip">
          OFFICIAL GAZETTE MEMORANDUM &bull; ORDER REF NO: ${cir.id}
        </div>
      </div>"""

new_generic_doc = """      <div class="doc-header">
        <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 6px;">
          <img src="${EMBLEM_BASE64}" class="doc-emblem" alt="National Emblem" style="height: 52px; width: auto; margin: 0; object-fit: contain;">
          <img src="${DRDO_LOGO_BASE64}" alt="DRDO Logo" style="height: 50px; width: auto; object-fit: contain;">
        </div>
        <h2>GOVERNMENT OF INDIA &bull; भारत सरकार</h2>
        <h3>MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</h3>
        <h4>${cir.authority.toUpperCase()}</h4>
        <div class="doc-title-strip" style="background: linear-gradient(90deg, #002B49, #004b80); color: #ffffff; padding: 6px 12px; margin-top: 8px; font-weight: 800; font-size: 11.5px;">
          OFFICIAL GAZETTE NOTIFICATION &bull; ORDER REF NO: ${cir.id}
        </div>
      </div>"""

if old_generic_doc in oc:
    oc = oc.replace(old_generic_doc, new_generic_doc)
    print("Updated downloadGenericGazetteOrder header")

old_generic_sig = """      <div class="sig-block" style="margin-top: 20px;">
        <div>Archived in Central e-HRMS 2.0 Repository &bull; Certified True Copy</div>
        <div class="sig-box">
          <strong style="color: #002B49;">Competent Authority</strong><br>
          ${cir.authority}<br>
          <span style="color: #059669; font-weight: 700;">[DIGITALLY SIGNED VIA NIC-DSC]</span>
        </div>
      </div>"""

new_generic_sig = """      <div class="sig-block" style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 12px;">
        <div style="font-size: 10px; color: #64748b; line-height: 1.5;">
          Archived in Central e-HRMS 2.0 Repository &bull; Certified True Copy<br>
          Official Secrets Act 1923 &bull; Digital Token: <code>eHRMS-MOD-GAZETTE-SEC</code>
        </div>
        <div style="display: flex; align-items: center; gap: 14px;">
          <img src="${MOD_STAMP_BASE64}" alt="Ministry of Defence Official Seal" style="width: 76px; height: 76px; object-fit: contain; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));">
          <div class="sig-box" style="text-align: center; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 4px; background: #fafafa;">
            <strong style="color: #002B49; font-size: 11px;">Competent Authority</strong><br>
            <span style="font-size: 9.5px; color: #475569;">${cir.authority}</span><br>
            <span style="color: #059669; font-weight: 700; font-size: 9px;">[DIGITALLY SIGNED VIA NIC-DSC]</span>
          </div>
        </div>
      </div>"""

if old_generic_sig in oc:
    oc = oc.replace(old_generic_sig, new_generic_sig)
    print("Updated downloadGenericGazetteOrder signature with MoD stamp")

# Update openGazetteModal
old_modal_hdr = """      <div style="text-align: center; border-bottom: 2px solid #002B49; padding-bottom: 12px; margin-bottom: 16px;">
        <img src="assets/emblem.png" alt="Emblem" style="width: 44px; height: 68px; object-fit: contain; margin-bottom: 4px;"><br>
        <div style="font-size: 13px; font-weight: 800; color: #002B49; letter-spacing: 0.5px;">GOVERNMENT OF INDIA &bull; भारत सरकार</div>
        <div style="font-size: 12px; font-weight: 700; color: #475569;">${cir.authority.toUpperCase()}</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 2px;">CENTRAL SECRETARIAT / SOUTH BLOCK, NEW DELHI</div>
      </div>"""

new_modal_hdr = """      <div style="text-align: center; border-bottom: 2px solid #002B49; padding-bottom: 12px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 6px;">
          <img src="assets/emblem.png" alt="State Emblem of India" style="width: 44px; height: 68px; object-fit: contain;">
          <img src="assets/drdo_logo_small.png" alt="DRDO Logo" style="height: 52px; width: auto; object-fit: contain;">
        </div>
        <div style="font-size: 13px; font-weight: 800; color: #002B49; letter-spacing: 0.5px;">GOVERNMENT OF INDIA &bull; भारत सरकार</div>
        <div style="font-size: 12px; font-weight: 700; color: #475569;">MINISTRY OF DEFENCE &bull; रक्षा मंत्रालय</div>
        <div style="font-size: 11px; font-weight: 600; color: #006699;">${cir.authority.toUpperCase()}</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 2px;">CENTRAL SECRETARIAT / SOUTH BLOCK, NEW DELHI</div>
      </div>"""

if old_modal_hdr in oc:
    oc = oc.replace(old_modal_hdr, new_modal_hdr)
    print("Updated openGazetteModal header with DRDO logo")

old_modal_ftr = """      <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; color: #64748b;">
        <div>
          Promulgated: ${cir.date}<br>
          Digitally Authenticated via e-HRMS 2.0 Central Repository
        </div>
        <div style="text-align: center; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 4px; background: #fafafa;">
          <strong style="color: #002B49;">Competent Authority</strong><br>
          <span style="color: #059669; font-weight: 700;">[DIGITALLY SANCTIONED]</span>
        </div>
      </div>"""

new_modal_ftr = """      <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #64748b;">
        <div>
          Promulgated: ${cir.date}<br>
          Digitally Authenticated via e-HRMS 2.0 Central Repository &bull; MoD
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="assets/mod_stamp.png" alt="Department Stamp" style="width: 68px; height: 68px; object-fit: contain; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.15));">
          <div style="text-align: center; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 4px; background: #fafafa;">
            <strong style="color: #002B49;">Competent Authority</strong><br>
            <span style="font-size: 9.5px; color: #475569;">${cir.authority}</span><br>
            <span style="color: #059669; font-weight: 700;">[DIGITALLY SANCTIONED]</span>
          </div>
        </div>
      </div>"""

if old_modal_ftr in oc:
    oc = oc.replace(old_modal_ftr, new_modal_ftr)
    print("Updated openGazetteModal footer with MoD stamp")

with open('js/modules/ordersCirculars.js', 'w', encoding='utf-8') as f:
    f.write(oc)

print("ordersCirculars.js successfully updated!")

# 2. Update salaryPaySlip.js
with open('js/modules/salaryPaySlip.js', 'r', encoding='utf-8') as f:
    sp = f.read()

old_sp_hdr = """      <div class="payslip-header-center">
        <img src="assets/emblem.png" alt="State Emblem of India" style="width: 48px; height: 76px; margin-bottom: 8px; object-fit: contain;">"""
new_sp_hdr = """      <div class="payslip-header-center">
        <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 8px;">
          <img src="assets/emblem.png" alt="State Emblem of India" style="width: 48px; height: 76px; object-fit: contain;">
          <img src="assets/drdo_logo_small.png" alt="DRDO Logo" style="height: 56px; width: auto; object-fit: contain;">
        </div>"""

if old_sp_hdr in sp:
    sp = sp.replace(old_sp_hdr, new_sp_hdr)
    print("Updated salaryPaySlip.js header with DRDO logo")

old_sp_sig = """      <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 11.5px; color: var(--text-muted);">
        <div>
          Certified that the government servant named above was on duty during the entire billing period.<br>
          Generated through Centralized e-HRMS 2.0 &bull; Public Financial Management System (PFMS), Ministry of Finance.
        </div>
        <div style="text-align: center; border-top: 1px dashed #94a3b8; padding-top: 6px; width: 260px;">"""

new_sp_sig = """      <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--text-muted);">
        <div>
          Certified that the government servant named above was on duty during the entire billing period.<br>
          Generated through Centralized e-HRMS 2.0 &bull; Public Financial Management System (PFMS), Ministry of Finance.
        </div>
        <div style="display: flex; align-items: center; gap: 14px;">
          <img src="assets/mod_stamp.png" alt="Department Stamp" style="width: 72px; height: 72px; object-fit: contain; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.15));">
          <div style="text-align: center; border-top: 1px dashed #94a3b8; padding-top: 6px; width: 260px;">"""

if old_sp_sig in sp:
    sp = sp.replace(old_sp_sig, new_sp_sig)
    sp = sp.replace("""          <span style="color: var(--goi-green); font-weight: bold;"><i class="fa-solid fa-certificate"></i> [DIGITALLY SIGNED VIA e-SIGN DSC]</span>
        </div>
      </div>
    </div>""", """          <span style="color: var(--goi-green); font-weight: bold;"><i class="fa-solid fa-certificate"></i> [DIGITALLY SIGNED VIA e-SIGN DSC]</span>
          </div>
        </div>
      </div>
    </div>""")
    print("Updated salaryPaySlip.js signature with MoD stamp")

with open('js/modules/salaryPaySlip.js', 'w', encoding='utf-8') as f:
    f.write(sp)

print("salaryPaySlip.js successfully updated!")

# 3. Update dashboard.js special order modal
with open('js/modules/dashboard.js', 'r', encoding='utf-8') as f:
    db = f.read()

old_db_modal_hdr = """          <!-- Top Header Strip with Emblem -->
          <div style="text-align: center; border-bottom: 2px solid #002B49; padding-bottom: 8px; margin-bottom: 12px;">
            <img src="assets/emblem.png" style="height: 48px; margin-bottom: 4px;" alt="National Emblem">"""
new_db_modal_hdr = """          <!-- Top Header Strip with Emblem -->
          <div style="text-align: center; border-bottom: 2px solid #002B49; padding-bottom: 8px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 6px;">
              <img src="assets/emblem.png" style="height: 48px; object-fit: contain;" alt="National Emblem">
              <img src="assets/drdo_logo_small.png" style="height: 46px; object-fit: contain;" alt="DRDO Logo">
            </div>"""

if old_db_modal_hdr in db:
    db = db.replace(old_db_modal_hdr, new_db_modal_hdr)
    print("Updated dashboard.js modal header with DRDO logo")

old_db_modal_sig = """            <div style="display: flex; gap: 14px; text-align: center;">
              <div style="border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 4px; background: #fafafa;">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 18px; color: #002B49;">Anil Chauhan</div>"""
new_db_modal_sig = """            <div style="display: flex; gap: 14px; align-items: center; text-align: center;">
              <img src="assets/mod_stamp.png" alt="Department Stamp" style="width: 72px; height: 72px; object-fit: contain; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.15));">
              <div style="border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 4px; background: #fafafa;">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 18px; color: #002B49;">Anil Chauhan</div>"""

if old_db_modal_sig in db:
    db = db.replace(old_db_modal_sig, new_db_modal_sig)
    print("Updated dashboard.js modal signature with MoD stamp")

with open('js/modules/dashboard.js', 'w', encoding='utf-8') as f:
    f.write(db)

print("dashboard.js successfully updated!")
