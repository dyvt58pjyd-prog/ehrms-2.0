/**
 * e-Awas Quarter Allotment Module
 */
import { store } from '../state.js';

export function renderEAwas(container) {
  const state = store.get();
  const awas = state.eAwasStatus;
  const user = state.currentUser;

  container.innerHTML = `
    <div class="page-title-strip">
      <div class="page-title-left">
        <h1 class="page-heading">
          🏡 e-Awas (Government Residential Accommodation)
        </h1>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
          Directorate of Estates, Ministry of Housing and Urban Affairs
        </div>
      </div>
    </div>

    <!-- Entitlement Card -->
    <div class="card" style="margin-bottom: 20px; padding: 20px; background: #f8fafc; border: 1px solid var(--border-medium); display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; gap: 20px; align-items: center;">
        <div style="width: 50px; height: 50px; border-radius: 8px; background: var(--goi-navy); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px;">
          🏛️
        </div>
        <div>
          <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Basic Pay: ₹${user.currentBasicPay.toLocaleString()}</div>
          <div style="font-size: 16px; font-weight: 800; color: var(--goi-navy); margin-top: 4px;">Entitlement: ${awas.entitlement}</div>
          <div style="font-size: 12px; color: var(--text-main); margin-top: 4px;">Priority Date: ${user.dojGov}</div>
        </div>
      </div>
    </div>

    <!-- Application Status -->
    <div class="card">
      <div style="padding: 15px; border-bottom: 1px solid var(--border-light); font-weight: 700; color: var(--goi-navy);">
        📍 Current Application Status
      </div>
      <div style="padding: 20px;">
        <div style="display: flex; gap: 40px; margin-bottom: 20px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 700;">Application ID</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--goi-navy); margin-top: 4px;">AWAS-DEL-2025-4412</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 700;">Pool</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--goi-navy); margin-top: 4px;">General Pool Residential Accommodation (GPRA)</div>
          </div>
        </div>

        <div style="background: #fef08a; padding: 15px; border-radius: 8px; border-left: 4px solid #ca8a04; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <div style="font-size: 14px; font-weight: 800; color: #854d0e;">Status: ${awas.status}</div>
            <div style="font-size: 12px; color: #713f12; margin-top: 4px;">You are currently at <strong>Waiting List Position #${awas.waitingListNo}</strong> for ${awas.appliedFor}.</div>
            <div style="font-size: 12px; color: #713f12; margin-top: 2px;">Preferred Localities: ${awas.preferredLocality.join(', ')}</div>
          </div>
          <div style="font-size: 32px; opacity: 0.8;">⏳</div>
        </div>
      </div>
    </div>
  `;
}
