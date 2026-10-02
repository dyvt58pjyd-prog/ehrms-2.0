/**
 * e-HRMS 2.0 - CSD Canteen Smart Cards Provision
 * Highly authentic replication of the official URC Canteen Cards.
 */

import { store } from '../state.js';
import { downloadCanteenCards } from '../downloader.js';

export function renderCanteenCards(container) {
  const state = store.get();
  const user = state.currentUser;

  // Derive dependent name (Father)
  const dependentName = 'SHRI ANIL RAMKRISHNA BAWASKAR';
  const dependentRelation = 'Father';

  container.innerHTML = `
    <!-- Top Header Strip -->
    <div class="page-title-strip">
      <div>
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: var(--goi-navy); display: flex; align-items: center; gap: 8px;">
          <span>🛒</span> Official CSD Canteen Cards &bull; Unit Run Canteen (URC)
        </h2>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
          Canteen Stores Department (CSD) &bull; Primary &amp; Dependent Smart Cards
        </div>
      </div>
      <div>
        <button class="btn btn-sm btn-primary" id="btn-download-canteen">
          📥 Download CSD Cards (PDF)
        </button>
      </div>
    </div>

    <!-- Cards Layout -->
    <div style="display: flex; flex-direction: column; gap: 40px; margin-bottom: 40px;">
      
      <!-- PRIMARY CARD SECTION -->
      <div>
        <h3 style="font-size: 16px; color: var(--goi-navy); margin-bottom: 16px; border-bottom: 2px solid var(--border-light); padding-bottom: 6px;">
          1. Primary Canteen Card (Serving Personnel)
        </h3>
        
        <div style="display: flex; gap: 30px; flex-wrap: wrap;">
          <!-- Primary Card Front -->
          ${renderCardFront(
            user.name, 
            'ASO-I', 
            'SERVING', 
            'GROCERY & LIQUOR CARD', 
            'LB08260547713500S01', 
            'assets/anurag_photo.jpg', 
            'D 1710 1998'
          )}

          <!-- Primary Card Back -->
          ${renderCardBack('5012423002107316')}
        </div>
      </div>

      <!-- DEPENDENT CARD SECTION -->
      <div>
        <h3 style="font-size: 16px; color: var(--goi-navy); margin-bottom: 16px; border-bottom: 2px solid var(--border-light); padding-bottom: 6px;">
          2. Dependent Canteen Card (${dependentRelation})
        </h3>
        
        <div style="display: flex; gap: 30px; flex-wrap: wrap;">
          <!-- Dependent Card Front -->
          ${renderCardFront(
            dependentName, 
            'DEPENDENT', 
            'DEPENDENT', 
            'GROCERY CARD', 
            'LB08260547713500D01', 
            'assets/father_photo.jpg', 
            'D 1710 1976'
          )}

          <!-- Dependent Card Back -->
          ${renderCardBack('5012423002107317')}
        </div>
      </div>

    </div>
  `;

  // Bind Download Action
  const btnDownload = container.querySelector('#btn-download-canteen');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      downloadCanteenCards(user);
    });
  }
}

/**
 * Generates the highly authentic HTML for the Front of the Canteen Card
 */
function renderCardFront(name, rank, status, cardType, idNum, photoSrc, dNum) {
  return `
    <div style="width: 420px; height: 260px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 10px 20px rgba(0,0,0,0.15); overflow: hidden; position: relative; background: #ffffff;">
      
      <!-- Faded Map / Tricolor Gradient Background -->
      <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255, 153, 51, 0.25) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(19, 136, 8, 0.2) 100%);"></div>
      
      <!-- Watermark Emblem -->
      <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.15;">
        <img src="assets/emblem.png" style="height: 200px;" alt="Watermark">
      </div>

      <!-- Red Right Border Stripe -->
      <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 6px; background: #dc2626;"></div>

      <!-- Content Container -->
      <div style="position: relative; z-index: 10; padding: 16px 24px; height: 100%; display: flex; flex-direction: column;">
        
        <!-- Header Row -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <!-- MoD Red Logo Circle -->
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #b91c1c; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
              <img src="assets/emblem.png" style="height: 24px; filter: brightness(0) invert(1) sepia(100%) hue-rotate(35deg) saturate(300%);" alt="MoD">
            </div>
            
            <div style="display: flex; flex-direction: column;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 20px; font-weight: 800; color: #1e3a8a; letter-spacing: 0.5px;">कैन्टीन स्मार्ट कार्ड</span>
                <span style="font-family: 'Courier New', monospace; font-size: 16px; font-weight: 800; color: #334155;">5077</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 2px;">
                <span style="font-size: 14px; font-weight: 800; color: #0f172a;">${status}</span>
                <span style="font-size: 14px; font-weight: 800; color: #0f172a; margin-left: 20px;">${cardType}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Middle Section: Ministry, ID, Smart Chip -->
        <div style="margin-top: 10px; display: flex; align-items: flex-start;">
          
          <!-- Left: Smart Chip -->
          <div style="width: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 20px;">
            <div style="width: 44px; height: 34px; background: linear-gradient(135deg, #d4d4d8, #a1a1aa); border-radius: 6px; border: 1px solid #71717a; box-shadow: inset 0 1px 3px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.1); position: relative; overflow: hidden;">
              <!-- Chip Lines -->
              <div style="position: absolute; top: 6px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.2);"></div>
              <div style="position: absolute; top: 16px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.2);"></div>
              <div style="position: absolute; top: 26px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.2);"></div>
              <div style="position: absolute; left: 14px; top: 0; bottom: 0; width: 1px; background: rgba(0,0,0,0.2);"></div>
              <div style="position: absolute; right: 14px; top: 0; bottom: 0; width: 1px; background: rgba(0,0,0,0.2);"></div>
            </div>
          </div>

          <!-- Center: Details -->
          <div style="flex: 1; padding-left: 20px; display: flex; flex-direction: column;">
            <div style="font-size: 14px; font-weight: 700; color: #1e3a8a;">रक्षा मंत्रालय (MoD)</div>
            <div style="font-size: 15.5px; font-family: Arial, sans-serif; font-weight: 800; color: #000000; letter-spacing: 0.5px; margin-top: 1px;">
              ${idNum}
            </div>
            <div style="font-size: 13.5px; font-weight: 700; color: #0f172a; margin-top: 4px; text-transform: uppercase;">
              ${name}
            </div>
            <div style="font-size: 12.5px; font-weight: 700; color: #334155;">
              ${rank}
            </div>
            <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 10px;">
              ${dNum}
            </div>
            <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 6px;">
              Expiry On: 11/02/2033
            </div>
          </div>
        </div>

        <!-- Bottom Section: Signature & Photo -->
        <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 4px; padding-right: 14px;">
          
          <!-- Holder Signature -->
          <div style="text-align: center; margin-left: 10px;">
            <div style="font-family: 'Brush Script MT', cursive; font-size: 22px; color: #0f172a; transform: rotate(-8deg); margin-bottom: -5px;">${name.split(' ')[0]}</div>
            <div style="font-size: 9.5px; font-weight: 700; color: #000; border-top: 1px solid #000; padding-top: 2px;">Holder's Signature</div>
          </div>

          <!-- Photo & Issuing Authority -->
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: 70px; height: 85px; border-radius: 4px; border: 1px solid #cbd5e1; overflow: hidden; background: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
              <img src="${photoSrc}" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%;" alt="Photo">
            </div>
            <div style="font-size: 8px; font-weight: 700; color: #000; margin-top: 4px; white-space: nowrap;">
              ISSUING AUTHORITY: MoD (DMA)
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

/**
 * Generates the highly authentic HTML for the Back of the Canteen Card
 */
function renderCardBack(serialNo) {
  return `
    <div style="width: 420px; height: 260px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 10px 20px rgba(0,0,0,0.15); overflow: hidden; position: relative; background: #ffffff;">
      
      <!-- Faded Map / Tricolor Gradient Background -->
      <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255, 153, 51, 0.2) 0%, rgba(255, 255, 255, 0.6) 40%, rgba(19, 136, 8, 0.15) 100%);"></div>

      <!-- Content Container -->
      <div style="position: relative; z-index: 10; padding: 18px 24px; height: 100%; display: flex; flex-direction: column;">
        
        <div style="text-align: center; color: #dc2626; font-size: 15px; font-weight: 800; line-height: 1.2;">
          INSTRUCTIONS<br>
          NOT VALID TO GAIN ENTRY INTO<br>SECURITY SENSITIVE ZONES
        </div>

        <div style="font-size: 9.5px; font-weight: 700; color: #1e293b; text-align: justify; margin-top: 14px; line-height: 1.45;">
          Provide Access and Interoperable in all URCs. Not Operable without PIN Number. If Lost or Damaged inform nearest URC. If found handover to nearest Military / Police Station / Post to Issuing Authority. Non Transferable. Liquor / Grocery monetary limits applied as per rank and status.
        </div>

        <div style="margin-top: 14px; font-size: 9px; color: #0f172a; display: grid; grid-template-columns: 140px 1fr; gap: 4px 10px; font-weight: 700;">
          <div style="grid-column: 1 / -1; margin-bottom: 2px;">वैधता / VALIDITY</div>
          
          <div style="display: flex; align-items: flex-start; gap: 4px;">
            <div style="width: 4px; height: 4px; background: #000; border-radius: 50%; margin-top: 4px;"></div>
            <div>कार्यरत सैनिक / Defence Personnel:</div>
          </div>
          <div>सेवानिवृत्ति की तिथि तक / Upto Date of Retirement</div>

          <div style="display: flex; align-items: flex-start; gap: 4px;">
            <div style="width: 4px; height: 4px; background: #000; border-radius: 50%; margin-top: 4px;"></div>
            <div>भूतपूर्व सैनिक / असैनिक कर्मचारी / Ex-servicemen / Defence Civilians:</div>
          </div>
          <div>जारी होने / नवीनीकरण की तिथि से एक वर्ष तक / One year from the Date of Issue or Renewal</div>

          <div style="display: flex; align-items: flex-start; gap: 4px;">
            <div style="width: 4px; height: 4px; background: #000; border-radius: 50%; margin-top: 4px;"></div>
            <div>आश्रित / Dependents:</div>
          </div>
          <div>वार्षिक नवीनीकरण, प्राथमिक कार्ड के साथ / Yearly Renewal along with Primary Card</div>
        </div>

        <div style="margin-top: 8px; font-size: 9px; font-weight: 700; color: #0f172a;">
          नवीनीकरण केवल कैंटीन प्रबंधक द्वारा / Renewal by Canteen Manager Only
        </div>

        <!-- Footer Row with Serial -->
        <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end;">
          <div style="font-size: 13.5px; font-weight: 800; color: #0f172a; letter-spacing: -0.2px;">
            Above instructions not applicable for Special Cards.
          </div>
          <div style="font-family: 'Courier New', monospace; font-size: 12px; font-weight: 800; color: #ea580c; letter-spacing: 0.5px;">
            ${serialNo}
          </div>
        </div>

      </div>
    </div>
  `;
}
