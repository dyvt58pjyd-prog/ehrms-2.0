/**
 * e-HRMS 2.0 - Secure Document Vault (DigiLocker Integration)
 * Simulates a secure, verified repository for personal and service documents.
 */

import { store } from '../state.js';

export function renderDocumentVault(container) {
  const state = store.get();
  
  const documents = [
    { id: 'DOC-AADHAAR', name: 'Aadhaar Card (UIDAI)', type: 'Identity Proof', date: '14-Sep-2015', verified: true, issuer: 'UIDAI', icon: '🪪' },
    { id: 'DOC-PAN', name: 'PAN Card', type: 'Financial Identity', date: '10-Aug-2016', verified: true, issuer: 'Income Tax Dept', icon: '💳' },
    { id: 'DOC-10TH', name: 'Class X Passing Certificate', type: 'Educational', date: '15-May-2010', verified: true, issuer: 'CBSE', icon: '🎓' },
    { id: 'DOC-12TH', name: 'Class XII Marksheet', type: 'Educational', date: '28-May-2012', verified: true, issuer: 'CBSE', icon: '🎓' },
    { id: 'DOC-DEGREE', name: 'B.Tech Degree Certificate', type: 'Educational', date: '30-Jun-2016', verified: true, issuer: 'Delhi University', icon: '🎓' },
    { id: 'DOC-MED', name: 'CGHS Beneficiary Card', type: 'Service Record', date: '01-Jan-2024', verified: true, issuer: 'MoHFW', icon: '⚕️' },
    { id: 'DOC-NOC', name: 'Vigilance Clearance (NOC)', type: 'Compliance', date: '10-Feb-2026', verified: true, issuer: 'CVC / MoD', icon: '🛡️' },
    { id: 'DOC-PPO', name: 'Pension Payment Order (e-PPO)', type: 'Retirement', date: 'Pending', verified: false, issuer: 'CPAO', icon: '📜' }
  ];

  container.innerHTML = `
    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Document Vault</span>
        </div>
        <h1 class="page-heading">
          🔐 Secure Document Vault
          <span class="page-heading-hi">/ सुरक्षित दस्तावेज़ वॉल्ट</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" onclick="alert('Initiating DigiLocker OAuth2 Sync...')">
          🔄 Sync with DigiLocker
        </button>
      </div>
    </div>

    <!-- DigiLocker Integration Banner -->
    <div class="gov-alert gov-alert-success mb-20" style="border-left: 4px solid #0ea5e9;">
      <div style="font-size: 24px;">☁️</div>
      <div>
        <strong>DigiLocker / MeriPehchaan Integration Active:</strong> Your Service Book and personal records are cryptographically verified and securely synced with the National e-Governance Division (NeGD) document repository.
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding-bottom: 30px;">
      ${documents.map(doc => `
        <div class="gov-card" style="display: flex; flex-direction: column; transition: transform 0.2s; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="padding: 20px; flex: 1;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <div style="font-size: 32px;">${doc.icon}</div>
              ${doc.verified ? 
                `<div style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; display: flex; align-items: center; gap: 4px; height: fit-content;">✓ VERIFIED</div>` : 
                `<div style="background: #f1f5f9; color: #64748b; padding: 4px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; display: flex; align-items: center; gap: 4px; height: fit-content;">⏳ PENDING</div>`
              }
            </div>
            <div style="font-size: 15px; font-weight: 700; color: var(--goi-navy); margin-bottom: 6px; line-height: 1.3;">
              ${doc.name}
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
              ${doc.type}
            </div>
            <div style="font-size: 12px; color: var(--text-secondary);">
              Issuer: <strong>${doc.issuer}</strong>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
              Uploaded/Synced: ${doc.date}
            </div>
          </div>
          <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 12px 20px; display: flex; gap: 10px;">
            <button class="btn btn-sm btn-primary" style="flex: 1;" onclick="alert('Viewing securely encrypted ${doc.name}')" ${!doc.verified ? 'disabled' : ''}>👁️ View</button>
            <button class="btn btn-sm btn-outline" style="flex: 1;" onclick="alert('Downloading ${doc.name} with Digital Signature...')" ${!doc.verified ? 'disabled' : ''}>📥 Download</button>
          </div>
        </div>
      `).join('')}
      
      <!-- Upload New Card -->
      <div class="gov-card" style="display: flex; flex-direction: column; justify-content: center; align-items: center; border: 2px dashed #cbd5e1; background: #f8fafc; padding: 40px 20px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='#f8fafc'" onclick="alert('Triggering secure file upload gateway...')">
        <div style="font-size: 32px; margin-bottom: 10px;">📤</div>
        <div style="font-size: 14px; font-weight: 700; color: var(--goi-blue);">Upload New Document</div>
        <div style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 6px;">Supported: PDF, JPEG (Max 5MB)<br>Will be sent for DDO Verification</div>
      </div>
    </div>
  `;
}
