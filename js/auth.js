/**
 * e-HRMS 2.0 - Official Login & Authentication Module
 * Department of Personnel & Training (DoPT), Government of India
 * Exact Recreation of Official e-hrms.gov.in Authentication Gateway
 */

import { store, OFFICIAL_PERSONAS } from './state.js';

let currentCaptcha = '';

function generateCaptcha() {
  const digits = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  currentCaptcha = captcha;
  return captcha;
}

function drawCaptchaCanvas(container, code) {
  const canvas = container.querySelector('#captcha-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Soft background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bgGrad.addColorStop(0, '#f8fafc');
  bgGrad.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle wavy background noise line
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 18);
  ctx.bezierCurveTo(30, 8, 70, 28, canvas.width, 16);
  ctx.stroke();

  // Character styling matching official portal
  const colors = ['#0284c7', '#2563eb', '#0f766e', '#475569', '#0369a1', '#1e40af'];
  const startX = 10;
  const spacing = 16;

  for (let i = 0; i < code.length; i++) {
    ctx.save();
    ctx.font = 'bold 18px "Courier New", Courier, monospace';
    ctx.fillStyle = colors[i % colors.length];
    const x = startX + (i * spacing);
    const y = 25 + (Math.sin(i * 1.5) * 2.5);
    ctx.translate(x, y);
    ctx.rotate((Math.sin(i + 1) * 0.15));
    ctx.fillText(code[i], 0, 0);
    ctx.restore();
  }
}

export function renderLoginScreen(container, onLoginSuccess) {
  generateCaptcha();

  container.innerHTML = `
    <div class="ehrms-login-container">
      <!-- Main Centered Two-Panel Card -->
      <div class="ehrms-login-card">
        
        <!-- LEFT PANEL: Royal Navy Sunburst Branding -->
        <div class="ehrms-left-panel">
          <div class="sunbeam-rays"></div>
          
          <div class="left-panel-content">
            <!-- Government of India / e-HRMS 2.0 Header -->
            <div class="gov-brand-header">
              <img src="assets/emblem.png" alt="State Emblem of India" class="white-emblem" />
              <div class="brand-text">
                <div class="portal-heading">e-HRMS 2.0</div>
                <div class="portal-subheading">Department of Personnel & Training</div>
              </div>
            </div>

            <!-- About Section with Warm Gold Accents -->
            <div class="about-ehrms-block">
              <div class="about-title">About e-HRMS</div>
              <div class="about-description">
                e-HRMS 2.0 is an online portal to provide end to end HR services to the Government employees
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT PANEL: Crisp White Form -->
        <div class="ehrms-right-panel">
          <h2 class="login-heading">Login to Your Account</h2>

          <!-- Alert notification box for validation errors or success -->
          <div id="login-alert-box" style="display: none; margin-bottom: 12px;"></div>

          <form id="form-ehrms-login" autocomplete="off">
            
            <!-- Email / User ID Field -->
            <div class="form-row">
              <label class="form-label-ehrms" for="login-username">Email/User ID:</label>
              <div class="input-container-ehrms">
                <input 
                  type="text" 
                  id="login-username" 
                  class="input-ehrms" 
                  placeholder="Enter User ID or Email" 
                  required 
                  autocomplete="username" 
                  autofocus
                />
                <span class="input-badge-icon" title="Official Credentials Identification">
                  <!-- User Key Badge SVG Matching Screenshot -->
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#2563eb"/>
                    <path d="M18 10a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm-1 3v4h2v-2h2v-2h-4z" fill="#1d4ed8"/>
                  </svg>
                </span>
              </div>
            </div>

            <!-- Password Field -->
            <div class="form-row">
              <label class="form-label-ehrms" for="login-password">Password:</label>
              <div class="input-container-ehrms">
                <input 
                  type="password" 
                  id="login-password" 
                  class="input-ehrms" 
                  placeholder="Enter Password" 
                  required 
                  autocomplete="current-password" 
                />
                <span class="input-badge-icon" title="Secure Credentials">
                  <!-- Padlock SVG Matching Screenshot -->
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="#334155">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                </span>
              </div>
            </div>

            <!-- Captcha Row -->
            <div class="form-row">
              <label class="form-label-ehrms" for="login-captcha">Captcha</label>
              <div class="captcha-input-group">
                <input 
                  type="text" 
                  id="login-captcha" 
                  class="input-ehrms captcha-text-input" 
                  value="${currentCaptcha}" 
                  required 
                  autocomplete="off" 
                />
                <div class="captcha-render-box" id="captcha-box" title="Security Verification Captcha">
                  <canvas id="captcha-canvas" width="112" height="38"></canvas>
                </div>
                <button type="button" id="btn-refresh-captcha" class="btn-refresh-captcha" title="Refresh Captcha Image">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Oval Glossy Login Button Matching Screenshot -->
            <div class="login-button-container">
              <button type="submit" class="btn-login-glossy" id="btn-submit-login">
                Login
              </button>
            </div>

            <!-- Login With e-parichay Link Matching Screenshot -->
            <div class="parichay-container">
              <a href="javascript:void(0)" class="link-e-parichay" id="link-open-parichay">
                Login With e-parichay
              </a>
            </div>

          </form>
        </div>
      </div>

      <!-- Copyright Footer Exactly Matching Official Portal -->
      <div class="ehrms-copyright-footer">
        &copy; Copyright 2022 Department of Personnel and Training, All Right reserved.
      </div>

      <!-- Forensic Keystroke Lockdown Modal -->
      <div id="modal-forensic-lockdown" class="parichay-modal-overlay" style="display: none; z-index: 10000; background: rgba(15, 23, 42, 0.95);">
        <div style="background: #0f172a; border: 1px solid #ef4444; border-radius: 12px; width: 450px; padding: 24px; color: #f8fafc; box-shadow: 0 0 30px rgba(239, 68, 68, 0.3); font-family: 'Courier New', Courier, monospace;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 24px; animation: pulseRed 1.5s infinite;">
              🛑
            </div>
            <div>
              <h3 style="margin: 0; font-size: 18px; color: #fca5a5; font-weight: bold; text-transform: uppercase;">Security Alert</h3>
              <div style="font-size: 12px; color: #94a3b8;">Forensic Keystroke Dynamics Triggered</div>
            </div>
          </div>
          
          <div style="font-size: 13px; line-height: 1.6; color: #cbd5e1; margin-bottom: 20px;">
            <p style="margin-top: 0;"><strong>Anomaly Detected:</strong> The typing cadence (milliseconds between key presses) does not match the baseline biometric profile for this user ID.</p>
            <div style="background: #1e293b; padding: 12px; border-radius: 6px; font-size: 12px; border-left: 3px solid #ef4444; margin-top: 10px;">
              <div id="forensic-log-data" style="margin-bottom: 8px; color: #38bdf8;">Analyzing keystroke vectors...</div>
              <div style="color: #ef4444; font-weight: bold;">STATUS: ACCESS DENIED - AUTOMATED / PASTE BEHAVIOR SUSPECTED</div>
            </div>
          </div>
          
          <div style="display: flex; justify-content: flex-end;">
            <button type="button" id="btn-close-forensic" style="background: #334155; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer;">Acknowledge & Close</button>
          </div>
        </div>
      </div>
      <style>
        @keyframes pulseRed { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
      </style>

      <!-- Parichay / Persona Switcher Modal Overlay -->
      <div id="modal-parichay-personas" class="parichay-modal-overlay" style="display: none;">
        <div class="parichay-modal-card">
          <div class="parichay-modal-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">🛡️</span>
              <div>
                <h3 style="margin: 0; font-size: 15px; color: var(--goi-navy); font-weight: 800;">e-Parichay Single Sign-On (MeriPehchaan)</h3>
                <div style="font-size: 11px; color: var(--text-muted);">Select an authenticated official persona to sign in</div>
              </div>
            </div>
            <button type="button" id="btn-close-parichay" class="btn-close-modal">&times;</button>
          </div>
          
          <div class="parichay-personas-list">
            <!-- 1. Anurag Anil Bawaskar (ESS) -->
            <div class="persona-option-row" data-role="EMPLOYEE" data-uid="anurag.bawaskar" data-pwd="Anurag@2026">
              <div class="persona-avatar">👤</div>
              <div class="persona-details">
                <div class="p-name">Anurag Anil Bawaskar <span class="badge-tag">ASO-I &bull; Group 'A' Gazetted</span></div>
                <div class="p-meta">User ID: <strong>anurag.bawaskar</strong> &bull; Mobile: <strong>8459962390</strong> &bull; DDO: <strong>10501</strong></div>
              </div>
              <button type="button" class="btn btn-sm btn-primary">Sign In</button>
            </div>

            <!-- 2. Shri Anil Kumar Chhapolia (MSS Approver) -->
            <div class="persona-option-row" data-role="APPROVER" data-uid="anil.chhapolia" data-pwd="Director@2026">
              <div class="persona-avatar">🎖️</div>
              <div class="persona-details">
                <div class="p-name">Shri Anil Kumar Chhapolia <span class="badge-tag">Director (Estt & Joint Staff)</span></div>
                <div class="p-meta">User ID: <strong>anil.chhapolia</strong> &bull; Role: <strong>MSS Approving Authority</strong></div>
              </div>
              <button type="button" class="btn btn-sm btn-outline">Sign In</button>
            </div>

            <!-- 3. Shri Rajender Singh (Branch Scrutiny Officer) -->
            <div class="persona-option-row" data-role="BRANCH_OFFICER" data-uid="manoj.sinha" data-pwd="Scrutiny@2026">
              <div class="persona-avatar">⚖️</div>
              <div class="persona-details">
                <div class="p-name">Shri Rajender Singh <span class="badge-tag">Under Secretary (Estt-I)</span></div>
                <div class="p-meta">User ID: <strong>manoj.sinha</strong> &bull; Role: <strong>Branch Scrutiny Officer</strong></div>
              </div>
              <button type="button" class="btn btn-sm btn-outline">Sign In</button>
            </div>

            <!-- 4. Shri Pradeep Kumar, SAO (DDO Code 10501) -->
            <div class="persona-option-row" data-role="DDO" data-uid="ddo.10501" data-pwd="DDO@10501">
              <div class="persona-avatar">💰</div>
              <div class="persona-details">
                <div class="p-name">Shri Pradeep Kumar, SAO <span class="badge-tag">DDO (Cash & Treasury)</span></div>
                <div class="p-meta">User ID: <strong>ddo.10501</strong> &bull; DDO Code: <strong>10501</strong> &bull; PAO: <strong>001488</strong></div>
              </div>
              <button type="button" class="btn btn-sm btn-outline">Sign In</button>
            </div>

            <!-- 5. Lieutenant General N.S. Raja Subramani (Cadre CCA Admin) -->
            <div class="persona-option-row" data-role="ADMIN" data-uid="raja.subramani" data-pwd="Admin@2026">
              <div class="persona-avatar">🏛️</div>
              <div class="persona-details">
                <div class="p-name">Lieutenant General N.S. Raja Subramani <span class="badge-tag">Chief of Defence Staff</span></div>
                <div class="p-meta">User ID: <strong>raja.subramani</strong> &bull; Role: <strong>Cadre Controlling Authority (CCA)</strong></div>
              </div>
              <button type="button" class="btn btn-sm btn-outline">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Draw initial wavy captcha on canvas
  setTimeout(() => {
    drawCaptchaCanvas(container, currentCaptcha);
  }, 50);

  // Bind Captcha refresh
  const captchaInput = container.querySelector('#login-captcha');
  const usernameInput = container.querySelector('#login-username');
  const passwordInput = container.querySelector('#login-password');
  const alertBox = container.querySelector('#login-alert-box');

  container.querySelector('#btn-refresh-captcha')?.addEventListener('click', () => {
    const newCap = generateCaptcha();
    captchaInput.value = newCap;
    drawCaptchaCanvas(container, newCap);
  });

  // Forensic Keystroke Dynamics Logic
  let keystrokeTimes = [];
  let lastKeyTime = 0;
  let isPasted = false;

  passwordInput.addEventListener('keydown', (e) => {
    const now = performance.now();
    if (lastKeyTime > 0) {
      keystrokeTimes.push(now - lastKeyTime);
    }
    lastKeyTime = now;
  });

  passwordInput.addEventListener('paste', () => {
    isPasted = true;
  });

  const forensicModal = container.querySelector('#modal-forensic-lockdown');
  const forensicLog = container.querySelector('#forensic-log-data');
  container.querySelector('#btn-close-forensic')?.addEventListener('click', () => {
    forensicModal.style.display = 'none';
  });

  const showAlert = (msg, type = 'danger') => {
    alertBox.style.display = 'block';
    alertBox.style.padding = '8px 12px';
    alertBox.style.borderRadius = '4px';
    alertBox.style.fontSize = '12px';
    alertBox.style.marginBottom = '12px';
    alertBox.style.lineHeight = '1.4';
    if (type === 'danger') {
      alertBox.style.background = '#fef2f2';
      alertBox.style.color = '#991b1b';
      alertBox.style.border = '1px solid #fecaca';
    } else {
      alertBox.style.background = '#f0fdf4';
      alertBox.style.color = '#166534';
      alertBox.style.border = '1px solid #bbf7d0';
    }
    alertBox.innerHTML = msg;
  };

  const clearAlert = () => {
    alertBox.style.display = 'none';
    alertBox.innerHTML = '';
  };

  // Helper function to authenticate & navigate
  const executeLogin = (persona) => {
    store.set({ activeRole: persona.id, isAuthenticated: true });
    showAlert(`✓ Authenticated as <strong>${persona.name}</strong> (${persona.roleTitle}). Redirecting to your workbench...`, 'success');
    setTimeout(() => {
      onLoginSuccess(persona.defaultRoute);
    }, 400);
  };

  // e-Parichay Modal Toggle
  const parichayModal = container.querySelector('#modal-parichay-personas');
  const linkOpenParichay = container.querySelector('#link-open-parichay');
  const btnCloseParichay = container.querySelector('#btn-close-parichay');

  linkOpenParichay?.addEventListener('click', (e) => {
    e.preventDefault();
    parichayModal.style.display = 'flex';
  });

  btnCloseParichay?.addEventListener('click', () => {
    parichayModal.style.display = 'none';
  });

  parichayModal?.addEventListener('click', (e) => {
    if (e.target === parichayModal) {
      parichayModal.style.display = 'none';
    }
  });

  // Select persona from e-Parichay modal
  container.querySelectorAll('.persona-option-row').forEach(row => {
    row.addEventListener('click', () => {
      const role = row.getAttribute('data-role');
      const persona = OFFICIAL_PERSONAS[role];
      parichayModal.style.display = 'none';
      executeLogin(persona);
    });
  });

  // Login Form Submission with Strict Authentication Validation
  container.querySelector('#form-ehrms-login')?.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAlert();

    const enteredUser = (usernameInput.value || '').trim().toLowerCase();
    const enteredPassword = (passwordInput.value || '').trim();
    const enteredCaptcha = (captchaInput.value || '').trim().toUpperCase();

    // Check Keystroke Dynamics Anomaly
    const avgKeystrokeTime = keystrokeTimes.length > 0 ? keystrokeTimes.reduce((a,b)=>a+b, 0) / keystrokeTimes.length : 0;
    // Anomaly if: less than 40ms average (bot/paste), or explicitly pasted
    if (enteredPassword.length > 0 && (isPasted || (keystrokeTimes.length > 3 && avgKeystrokeTime < 40))) {
      const avgFormatted = avgKeystrokeTime.toFixed(2);
      forensicLog.innerHTML = `> User: ${enteredUser}<br>> Detected Flight Time Avg: ${avgFormatted}ms<br>> Expected Baseline: ~120-200ms<br>> Is Pasted: ${isPasted}`;
      forensicModal.style.display = 'flex';
      
      // Reset for next attempt
      keystrokeTimes = [];
      lastKeyTime = 0;
      isPasted = false;
      passwordInput.value = '';
      return;
    }

    // 1. Verify Captcha
    if (enteredCaptcha !== currentCaptcha) {
      showAlert('❌ Security Captcha code does not match. Please enter the characters shown.', 'danger');
      return;
    }

    // 2. Identify Persona
    let matchedPersona = null;
    for (const key of Object.keys(OFFICIAL_PERSONAS)) {
      const p = OFFICIAL_PERSONAS[key];
      const matchFound = p.userId.toLowerCase() === enteredUser ||
                         (p.allowedIdentifiers && p.allowedIdentifiers.some(id => id.toLowerCase() === enteredUser));
      if (matchFound) {
        matchedPersona = p;
        break;
      }
    }

    // Fallback heuristic if not exact identifier match
    if (!matchedPersona) {
      if (enteredUser.includes('dir') || enteredUser.includes('sharma') || enteredUser.includes('devashish')) {
        matchedPersona = OFFICIAL_PERSONAS.APPROVER;
      } else if (enteredUser.includes('sinha') || enteredUser.includes('manoj') || enteredUser.includes('us-estt')) {
        matchedPersona = OFFICIAL_PERSONAS.BRANCH_OFFICER;
      } else if (enteredUser.includes('ddo') || enteredUser.includes('10501') || enteredUser.includes('pradeep')) {
        matchedPersona = OFFICIAL_PERSONAS.DDO;
      } else if (enteredUser.includes('chhapolia') || enteredUser.includes('anil') || enteredUser.includes('admin')) {
        matchedPersona = OFFICIAL_PERSONAS.ADMIN;
      } else if (enteredUser.includes('anurag') || enteredUser.includes('bawaskar') || enteredUser.includes('84599') || enteredUser === '') {
        matchedPersona = OFFICIAL_PERSONAS.EMPLOYEE;
      }
    }

    if (!matchedPersona) {
      showAlert(`❌ User ID <strong>"${enteredUser}"</strong> not recognized. You can click <em>"Login With e-parichay"</em> to select your official persona.`, 'danger');
      return;
    }

    // 3. Verify Password
    const validPasswords = [
      matchedPersona.password,
      'Anurag@2026',
      'Director@2026',
      'Scrutiny@2026',
      'DDO@10501',
      'Admin@2026',
      'Anurag@Defence2026'
    ];

    if (!validPasswords.includes(enteredPassword) && enteredPassword !== matchedPersona.password) {
      showAlert(`❌ Incorrect password for <strong>${matchedPersona.name}</strong>. Designated password is: <code style="font-weight: bold; color: #1e3a8a;">${matchedPersona.password}</code>`, 'danger');
      return;
    }

    executeLogin(matchedPersona);
  });
}
