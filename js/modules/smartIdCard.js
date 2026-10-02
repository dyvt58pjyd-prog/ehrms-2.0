/**
 * e-HRMS 2.0 - Ministry of Defence Smart Digital Identity Card & Security Pass
 * Government of India - Department of Military Affairs
 */

import { store } from '../state.js';
import { downloadSmartIdCard } from '../downloader.js';

export function renderSmartIdCard(container) {
  const state = store.get();
  const user = state.currentUser;
  const card = state.smartIdCard;

  container.innerHTML = `
    <!-- Top Header Strip -->
    <div class="page-title-strip">
      <div>
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: var(--goi-navy); display: flex; align-items: center; gap: 8px;">
          <span>🪪</span> Official Smart Identity Card &bull; ${user.ministry}
        </h2>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
          ${user.office} &bull; Security Pass &bull; ${card.securityAccessZone}
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-sm btn-outline" id="btn-flip-card">
          🔄 Flip Card (Front / Back)
        </button>
        <button class="btn btn-sm btn-primary" id="btn-download-id-card">
          📥 Download Official Smart Card (PDF)
        </button>
      </div>
    </div>

    <!-- Security Information Banner -->
    <div class="gov-card mb-20" style="background: linear-gradient(135deg, #f0fdf4, #e0f2fe); border-left: 4px solid #059669; padding: 12px 18px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; gap: 10px;">
        <div>
          <strong style="color: #065f46; font-size: 13.5px;">✓ Legally Certified Identity Credential u/s Official Secrets Act &amp; IT Act 2000</strong><br>
          <span style="font-size: 11.5px; color: #047857;">
            Card No: <strong>${card.cardNo}</strong> &bull; Chip UID: <code>${card.smartChipUid}</code> &bull; RFID Access: <code>${card.rfidAccessId}</code>
          </span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span class="status-badge badge-sanctioned" style="font-size: 11.5px; padding: 4px 10px;">
            ${card.securityAccessZone}
          </span>
        </div>
      </div>
    </div>

    <!-- Interactive 3D Card Display Wrapper -->
    <div style="display: flex; justify-content: center; margin-bottom: 30px;">
      <div id="id-card-perspective-container" style="-webkit-perspective: 1000px; perspective: 1000px; width: 340px; margin: 0 auto; user-select: none;">
        <div id="id-card-inner" style="transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); -webkit-transform-style: preserve-3d; transform-style: preserve-3d; position: relative; width: 340px; height: 540px; cursor: pointer;" title="Click card or button to flip">
          
          <!-- FRONT OF CARD -->
          <div id="card-front" style="width: 340px; height: 540px; background: #ffffff; border-radius: 16px; box-shadow: 0 15px 35px rgba(0, 43, 73, 0.25); position: absolute; top: 0; left: 0; border: 1px solid #cbd5e1; -webkit-backface-visibility: hidden; backface-visibility: hidden; -webkit-transform: rotateY(0deg) translateZ(1px); transform: rotateY(0deg) translateZ(1px); z-index: 2;">
            <div style="width: 100%; height: 100%; border-radius: 16px; overflow: hidden; position: relative; display: flex; flex-direction: column; align-items: center; background: #ffffff;">
            
            <!-- Guilloche Micro-pattern Background -->
            <div style="position: absolute; inset: 0; opacity: 0.04; background-image: repeating-radial-gradient(circle at 0 0, transparent 0, #002B49 10px), repeating-linear-gradient(#005691, #005691); z-index: 0; pointer-events: none;"></div>

            <!-- Lanyard punch hole -->
            <div style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 60px; height: 12px; background: #f1f5f9; border-radius: 10px; box-shadow: inset 0 2px 5px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,1); z-index: 10;"></div>
            
            <!-- Tricolor Band -->
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 35px; background: linear-gradient(to right, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%); box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>

            <!-- Background Watermark -->
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.06; pointer-events: none; z-index: 1;">
              <img src="assets/emblem.png" style="width: 240px; filter: grayscale(100%);" alt="Watermark">
            </div>

            <!-- Card Content -->
            <div style="margin-top: 42px; text-align: center; width: 100%; z-index: 2;">
              <img src="assets/emblem.png" style="height: 52px; margin-bottom: 4px;" alt="Emblem">
              <div style="font-size: 13.5px; font-weight: 800; color: #b91c1c; letter-spacing: 0.5px; font-family: Arial, sans-serif;">GOVERNMENT OF INDIA</div>
              <div style="font-size: 16px; font-weight: 800; color: #002B49; margin-top: 1px; letter-spacing: 0.2px; font-family: Arial, sans-serif;">${user.ministry.toUpperCase()}</div>
              <div style="font-size: 10.5px; font-weight: 700; color: #166534; margin-top: 1px;">${user.department.toUpperCase()}</div>
              
              <!-- Photo Area -->
              <div style="margin: 16px auto; width: 135px; height: 165px; border-radius: 8px; border: 3px solid #002B49; overflow: hidden; box-shadow: 0 6px 12px rgba(0,0,0,0.2); background: #f8fafc; position: relative;">
                <img src="assets/anurag_photo.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%;" alt="Officer Photo">
                <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: #FF9933;"></div>
              </div>

              <!-- Smart Chip -->
              <div style="position: absolute; right: 25px; top: 185px; width: 38px; height: 28px; background: linear-gradient(135deg, #fef08a, #ca8a04); border-radius: 5px; border: 1px solid #a16207; box-shadow: inset 0 1px 3px rgba(255,255,255,0.7), 0 2px 4px rgba(0,0,0,0.1);">
                <div style="position: absolute; top: 5px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.25);"></div>
                <div style="position: absolute; top: 13px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.25);"></div>
                <div style="position: absolute; top: 21px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.25);"></div>
                <div style="position: absolute; left: 12px; top: 0; bottom: 0; width: 1px; background: rgba(0,0,0,0.25);"></div>
                <div style="position: absolute; right: 12px; top: 0; bottom: 0; width: 1px; background: rgba(0,0,0,0.25);"></div>
              </div>

              <div style="font-size: 21px; font-weight: 800; color: #002B49; letter-spacing: -0.3px; text-transform: uppercase;">${user.name}</div>
              <div style="font-size: 13.5px; color: #b45309; font-weight: 700;">${user.hindiName}</div>
              
              <div style="background: linear-gradient(90deg, #001a2c, #003b66); color: #ffffff; padding: 7px 10px; margin: 12px 20px 8px 20px; border-radius: 6px; font-size: 13px; font-weight: 700; box-shadow: 0 4px 6px rgba(0,0,0,0.15);">
                ${user.designation}
                <div style="font-size: 10px; font-weight: 600; color: #93c5fd; margin-top: 2px;">${user.classification}</div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; text-align: left; padding: 0 35px; margin-top: 12px; font-size: 11.5px; color: #1e293b; row-gap: 5px;">
                <div><strong>Emp ID:</strong> ${user.empId}</div>
                <div><strong>Blood Grp:</strong> <span style="color: #dc2626; font-weight: 800; font-size: 12px;">${card.bloodGroup}</span></div>
                <div><strong>DOB:</strong> 17-10-1998</div>
                <div><strong>Issued:</strong> 08-SEP-2026</div>
              </div>

              <!-- Hologram & Signature -->
              <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 30px; margin-top: 12px; width: 100%;">
                <!-- Hologram Seal -->
                <div style="width: 44px; height: 44px; border-radius: 50%; background: conic-gradient(from 0deg, #fcd34d, #f59e0b, #d97706, #fcd34d); border: 1px dashed #78350f; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3); position: relative; overflow: hidden;">
                  <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.4) 100%);"></div>
                  <img src="assets/emblem.png" style="height: 26px; opacity: 0.85; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.5));" alt="Holo">
                </div>
                
                <!-- Signature -->
                <div style="text-align: center;">
                  <div style="font-family: 'Brush Script MT', cursive; font-size: 20px; color: #002B49; margin-bottom: 2px; transform: rotate(-3deg);">D. Sharma</div>
                  <div style="font-size: 9px; font-weight: 700; color: #475569; border-top: 1px solid #94a3b8; padding-top: 3px; min-width: 100px;">Issuing Authority</div>
                </div>
              </div>

              <!-- Bottom Bar -->
              <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 16px; background: linear-gradient(to right, #b91c1c, #991b1b);"></div>
            </div>
            </div>
          </div>

          <!-- BACK OF CARD -->
          <div id="card-back" style="width: 340px; height: 540px; background: #ffffff; border-radius: 16px; box-shadow: 0 15px 35px rgba(0, 43, 73, 0.25); position: absolute; top: 0; left: 0; border: 1px solid #cbd5e1; -webkit-backface-visibility: hidden; backface-visibility: hidden; -webkit-transform: rotateY(180deg) translateZ(1px); transform: rotateY(180deg) translateZ(1px); z-index: 1; visibility: hidden;">
            <div style="width: 100%; height: 100%; border-radius: 16px; overflow: hidden; position: relative; display: flex; flex-direction: column; background: #ffffff;">
            <!-- Lanyard punch hole -->
            <div style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 60px; height: 12px; background: #f1f5f9; border-radius: 10px; box-shadow: inset 0 2px 5px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,1); z-index: 10;"></div>

            <!-- Magnetic Stripe -->
            <div style="margin-top: 45px; width: 100%; height: 55px; background: linear-gradient(to bottom, #0f172a, #1e293b, #0f172a); box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>

            <div style="padding: 24px 20px; font-size: 11px; color: #334155; line-height: 1.5; flex: 1; display: flex; flex-direction: column;">
              <div style="text-align: center; font-weight: 800; color: #002B49; font-size: 13.5px; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                TERMS &amp; CONDITIONS OF USE
              </div>
              
              <ul style="padding-left: 18px; margin-bottom: 16px; font-size: 10.5px; color: #475569;">
                <li style="margin-bottom: 4px;">This card is the property of the Government of India.</li>
                <li style="margin-bottom: 4px;">It is issued for official use only and is strictly non-transferable.</li>
                <li style="margin-bottom: 4px;">Must be displayed at all times while in the Ministry premises.</li>
                <li style="margin-bottom: 4px;">Loss of this card must be reported immediately to the Security Office, MoD.</li>
              </ul>

              <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #cbd5e1; margin-bottom: 16px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                <div style="color: #002B49; font-weight: 700; margin-bottom: 2px;">Residential Address:</div>
                <div style="margin-bottom: 8px;">Bawaskar Niwas, Ramdaspeth,<br>Nashik (Maharashtra)</div>
                <div style="color: #002B49; font-weight: 700; margin-bottom: 2px;">Emergency Contact:</div>
                <div>${card.emergencyContact}</div>
              </div>

              <!-- Barcode Box -->
              <div style="text-align: center; margin-top: auto; padding-bottom: 10px;">
                <div style="display: inline-block; padding: 12px; background: #ffffff; border: 1px solid #94a3b8; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <!-- Simulated High-Density Barcode -->
                  <div style="height: 40px; width: 240px; background: repeating-linear-gradient(to right, #000, #000 3px, #fff 3px, #fff 5px, #000 5px, #000 6px, #fff 6px, #fff 9px, #000 9px, #000 13px, #fff 13px, #fff 15px, #000 15px, #000 17px, #fff 17px, #fff 20px);"></div>
                  <div style="font-family: 'Courier New', Courier, monospace; font-size: 12.5px; font-weight: 800; letter-spacing: 2px; margin-top: 6px; color: #0f172a;">
                    ${card.cardNo}
                  </div>
                </div>
              </div>

            </div>

            <div style="background: #e2e8f0; padding: 14px; text-align: center; font-size: 9.5px; font-weight: 600; color: #475569; border-top: 1px solid #cbd5e1;">
              If found, please drop in any post box or return to:<br>
              <strong style="color: #002B49; font-size: 10px; display: block; margin-top: 3px;">Director (Security), ${user.department},<br>${user.office}</strong>
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Official Access Privileges Table -->
    <div class="gov-card">
      <div class="gov-card-header">
        <span class="gov-card-title">🔐 Central Defence Access Privileges &amp; Gate Authorisation</span>
        <span class="status-badge badge-sanctioned">Active Access Card</span>
      </div>
      <div class="gov-table-container">
        <table class="gov-table">
          <thead>
            <tr>
              <th>Complex / Facility</th>
              <th>Gate &amp; Access Point</th>
              <th>Permitted Hours</th>
              <th>Security Clearance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${user.office.split(',')[0]}</strong></td>
              <td>Main Security Gate &bull; Biometric Access</td>
              <td>24x7 Official Duty Access</td>
              <td><span style="color: #166534; font-weight: 700;">${card.accessClearance}</span></td>
              <td><span class="status-badge badge-sanctioned">✓ Active</span></td>
            </tr>
            <tr>
              <td><strong>National Cyber Defence Centre / DRDO</strong></td>
              <td>Biometric + RFID Turnstiles</td>
              <td>Designated Information Node</td>
              <td><span style="color: #0284c7; font-weight: 700;">Cyber Security Clearance</span></td>
              <td><span class="status-badge badge-sanctioned">✓ Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Bind Flip Action
  const btnFlip = container.querySelector('#btn-flip-card');
  const cardInner = container.querySelector('#id-card-inner');
  const cardFront = container.querySelector('#card-front');
  const cardBack = container.querySelector('#card-back');
  let isFront = true;
  let flipTimer = null;

  function handleFlip() {
    isFront = !isFront;
    if (flipTimer) clearTimeout(flipTimer);

    // Ensure both faces are temporarily visible during 3D rotation
    if (cardFront?.style) cardFront.style.visibility = 'visible';
    if (cardBack?.style) cardBack.style.visibility = 'visible';

    if (isFront) {
      if (cardInner?.style) cardInner.style.transform = 'rotateY(0deg)';
      if (btnFlip) btnFlip.textContent = '🔄 Flip Card (Front / Back)';
      
      // Halfway through 0.6s rotation (at 280ms when card is edge-on at 90deg), hide reverse face and set z-index
      flipTimer = setTimeout(() => {
        if (isFront) {
          if (cardBack?.style) {
            cardBack.style.visibility = 'hidden';
            cardBack.style.zIndex = '1';
          }
          if (cardFront?.style) cardFront.style.zIndex = '2';
        }
      }, 280);
    } else {
      if (cardInner?.style) cardInner.style.transform = 'rotateY(180deg)';
      if (btnFlip) btnFlip.textContent = '🔄 Flip to Front View';

      // Halfway through 0.6s rotation (at 280ms when card is edge-on at 90deg), hide front face and set z-index
      flipTimer = setTimeout(() => {
        if (!isFront) {
          if (cardFront?.style) {
            cardFront.style.visibility = 'hidden';
            cardFront.style.zIndex = '1';
          }
          if (cardBack?.style) cardBack.style.zIndex = '2';
        }
      }, 280);
    }
  }

  // Initial state setup
  if (cardFront?.style) cardFront.style.zIndex = '2';
  if (cardBack?.style) {
    cardBack.style.zIndex = '1';
    cardBack.style.visibility = 'hidden';
  }

  btnFlip?.addEventListener('click', handleFlip);
  cardInner?.addEventListener('click', handleFlip);

  // Bind Download Action
  container.querySelector('#btn-download-id-card')?.addEventListener('click', () => {
    downloadSmartIdCard(user, card);
  });
}
