/**
 * e-HRMS 2.0 - Application Controller & Router
 * Department of Personnel & Training (DoPT), Government of India
 */

import { store, OFFICIAL_PERSONAS } from './state.js';
import { renderLoginScreen } from './auth.js';
import { renderDashboard } from './modules/dashboard.js';
import { renderServiceBook } from './modules/serviceBook.js';
import { renderLeaveManagement } from './modules/leaveManagement.js';
import { renderTourTravel } from './modules/tourTravel.js';
import { renderLtcModule } from './modules/ltcModule.js';
import { renderClaimsAllowances } from './modules/claimsAllowances.js';
import { renderAparSparrow } from './modules/aparSparrow.js';
import { renderIprFiling } from './modules/iprFiling.js';
import { renderSalaryPaySlip } from './modules/salaryPaySlip.js';
import { renderApprovals } from './modules/approvals.js';
import { renderAnalyticsReports } from './modules/analyticsReports.js';
import { renderIgotKarmayogi } from './modules/igotKarmayogi.js';
import { renderCanteenCards } from './modules/canteenCards.js';
import { renderSmartIdCard } from './modules/smartIdCard.js';
import { renderPensionPortfolio } from './modules/pensionPortfolio.js';
import { renderGrievances } from './modules/grievances.js';
import { renderVigilanceNoc } from './modules/vigilanceNoc.js';
import { renderBhavishyaPension } from './modules/bhavishyaPension.js';
import { renderOrgChart } from './modules/orgChart.js';
import { renderDocumentVault } from './modules/documentVault.js';

import { renderEOffice } from './modules/eoffice.js';
import { renderAEBAS } from './modules/aebas.js';
import { renderCGHS } from './modules/cghs.js';
import { renderDeputation } from './modules/deputation.js';
import { renderEAwas } from './modules/eAwas.js';
import { renderOrdersCirculars } from './modules/ordersCirculars.js';
import { renderLetterheadStudio } from './modules/letterheadStudio.js';

class EhrmsApp {
  constructor() {
    this.appContainer = document.getElementById('app-content');
    this.currentRoute = window.location.hash.slice(1) || 'dashboard';

    // If initial route is login, start as unauthenticated
    if (this.currentRoute === 'login') {
      store.set({ isAuthenticated: false });
    }

    this.initAccessibility();
    this.initLogout();
    this.initNavigation();
    this.initBilingual();
    this.initCacheReset();
    this.initGlobalSearch();

    // Subscribe to central store updates
    store.subscribe((state) => {
      this.updateBadges(state);
      this.updateHeaderAuth(state);
    });

    // Hash router
    window.addEventListener('hashchange', () => {
      this.currentRoute = window.location.hash.slice(1) || 'dashboard';
      this.route();
    });

    // Initial render
    this.updateHeaderAuth(store.get());
    this.updateBadges(store.get());
    this.route();
  }

  initAccessibility() {
    const btnNormal = document.getElementById('font-normal');
    const btnSmall = document.getElementById('font-small');
    const btnLarge = document.getElementById('font-large');
    const btnContrast = document.getElementById('toggle-contrast');

    if (btnNormal) {
      btnNormal.addEventListener('click', () => {
        document.body.classList.remove('font-small', 'font-large');
        this.setActiveFontBtn(btnNormal);
      });
    }

    if (btnSmall) {
      btnSmall.addEventListener('click', () => {
        document.body.classList.remove('font-large');
        document.body.classList.add('font-small');
        this.setActiveFontBtn(btnSmall);
      });
    }

    if (btnLarge) {
      btnLarge.addEventListener('click', () => {
        document.body.classList.remove('font-small');
        document.body.classList.add('font-large');
        this.setActiveFontBtn(btnLarge);
      });
    }

    if (btnContrast) {
      btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
      });
    }
  }

  setActiveFontBtn(activeBtn) {
    document.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  initBilingual() {
    const btnLang = document.getElementById('lang-toggle');
    if (btnLang) {
      btnLang.addEventListener('click', () => {
        const state = store.get();
        const nextLang = state.language === 'EN' ? 'HI' : 'EN';
        store.set({ language: nextLang });
        btnLang.textContent = nextLang === 'EN' ? 'हिन्दी' : 'English';
        this.route(); // re-render current view with language changes
      });
    }
  }

  initLogout() {
    const btnLogout = document.getElementById('btn-header-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        store.set({ isAuthenticated: false });
        this.currentRoute = 'login';
        this.updateHeaderAuth(store.get());
        window.location.hash = '#login';
      });
    }
  }

  initCacheReset() {
    const btnReset = document.getElementById('btn-reset-cache');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Clear local browser cache and reload fresh portal state?')) {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = window.location.origin + window.location.pathname + '?ts=' + Date.now() + '#dashboard';
        }
      });
    }
  }

  updateHeaderAuth(state) {
    const userProfileEl = document.getElementById('header-user-profile') || document.querySelector('.user-profile-header');
    const btnLogout = document.getElementById('btn-header-logout');
    const authBadge = document.getElementById('header-auth-badge');
    const navBar = document.querySelector('.portal-nav');

    const isLogin = this.currentRoute === 'login';
    const isAuth = state.isAuthenticated !== false && !isLogin;

    if (document.body) {
      document.body.classList.toggle('login-view', isLogin || !isAuth);
    }

    if (!isAuth) {
      if (userProfileEl) userProfileEl.style.display = 'none';
      if (btnLogout) btnLogout.style.display = 'none';
      if (navBar) navBar.style.display = 'none';
      if (authBadge) authBadge.style.display = 'flex';
    } else {
      if (userProfileEl) userProfileEl.style.display = 'flex';
      if (btnLogout) btnLogout.style.display = 'inline-flex';
      if (navBar) navBar.style.display = 'block';
      if (authBadge) authBadge.style.display = 'none';
      this.updateUserHeader(state);
    }
  }

  updateUserHeader(state) {
    const userNameEl = document.getElementById('header-user-name');
    const userRoleEl = document.getElementById('header-user-role');
    const persona = OFFICIAL_PERSONAS[state.activeRole] || OFFICIAL_PERSONAS.EMPLOYEE;

    if (userNameEl) {
      userNameEl.textContent = state.language === 'HI' ? persona.hindiName : persona.name;
    }
    if (userRoleEl) {
      userRoleEl.textContent = state.language === 'HI' 
        ? `${persona.hindiDesignation}` 
        : `${persona.designation} (${persona.roleTitle})`;
    }
  }

  updateBadges(state) {
    const pendingCount = state.leaveApplications.filter(l => l.status === 'PENDING').length +
                         state.tours.filter(t => t.status === 'PENDING_APPROVAL').length +
                         state.claims.filter(c => c.status === 'PENDING').length;

    const badge = document.getElementById('approvals-nav-badge');
    if (badge) {
      badge.textContent = pendingCount;
      badge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
    }
  }

  initNavigation() {
    // Nav items active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  route() {
    try {
      const state = store.get();

      // Security Gate: If not authenticated and attempting to access protected route, redirect to #login
      if (state.isAuthenticated === false && this.currentRoute !== 'login') {
        this.currentRoute = 'login';
        this.updateHeaderAuth(state);
        window.location.hash = '#login';
        return;
      }

      this.updateHeaderAuth(state);

      // Handle Login route
      if (this.currentRoute === 'login') {
        renderLoginScreen(this.appContainer, (targetRoute = 'dashboard') => {
          store.set({ isAuthenticated: true });
          this.currentRoute = targetRoute;
          this.updateHeaderAuth(store.get());
          window.location.hash = '#' + targetRoute;
        });
        return;
      }

      // Highlight active nav item
      const navLinks = document.querySelectorAll('.nav-item');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${this.currentRoute}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Route dispatch
      switch (this.currentRoute) {
        case 'dashboard':
          renderDashboard(this.appContainer);
          break;
        case 'orders-circulars':
          renderOrdersCirculars(this.appContainer);
          break;
        case 'letterhead':
          renderLetterheadStudio(this.appContainer);
          break;
        case 'service-book':
          renderServiceBook(this.appContainer);
          break;
        case 'leave':
          renderLeaveManagement(this.appContainer);
          break;
        case 'tour':
          renderTourTravel(this.appContainer);
          break;
        case 'ltc':
          renderLtcModule(this.appContainer);
          break;
        case 'claims':
          renderClaimsAllowances(this.appContainer);
          break;
        case 'apar':
          renderAparSparrow(this.appContainer);
          break;
        case 'ipr':
          renderIprFiling(this.appContainer);
          break;
        case 'vigilance':
          renderVigilanceNoc(this.appContainer);
          break;
        case 'salary':
          renderSalaryPaySlip(this.appContainer);
          break;
        case 'approvals':
          renderApprovals(this.appContainer);
          break;
        case 'analytics':
          renderAnalyticsReports(this.appContainer);
          break;
        case 'karmayogi':
          renderIgotKarmayogi(this.appContainer);
          break;
        case 'id-card':
          renderSmartIdCard(this.appContainer);
          break;
        case 'canteen':
        case 'csd':
        case 'csd-billing':
          renderCanteenCards(this.appContainer);
          break;
        case 'pension':
          renderPensionPortfolio(this.appContainer);
          break;
        case 'bhavishya':
          renderBhavishyaPension(this.appContainer);
          break;
        case 'orgchart':
          renderOrgChart(this.appContainer);
          break;
        case 'vault':
        case 'documents':
        case 'document-vault':
          renderDocumentVault(this.appContainer);
          break;
        case 'grievances':
          renderGrievances(this.appContainer);
          break;
        case 'eoffice':
          renderEOffice(this.appContainer);
          break;
        case 'aebas':
          renderAEBAS(this.appContainer);
          break;
        case 'cghs':
          renderCGHS(this.appContainer);
          break;
        case 'deputation':
          renderDeputation(this.appContainer);
          break;
        case 'eawas':
          renderEAwas(this.appContainer);
          break;
        default:
          renderDashboard(this.appContainer);
          break;
      }

      // Scroll smoothly to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Critical rendering error in route:", err);
      if (this.appContainer) {
        this.appContainer.innerHTML = `
          <div style="max-width: 650px; margin: 40px auto; padding: 28px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); text-align: center;">
            <div style="font-size: 40px; margin-bottom: 12px;">🔄</div>
            <h2 style="color: #002b49; font-size: 18px; margin-bottom: 8px;">Synchronizing Portal State</h2>
            <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
              A browser cache discrepancy occurred: <code>${err.message || err}</code>.<br>
              Click below to restore fresh e-HRMS 2.0 authentic state.
            </p>
            <button id="btn-emergency-reset" class="btn btn-primary" style="padding: 10px 24px; font-weight: 700;">
              🧹 Clear Cache & Reload
            </button>
          </div>
        `;
        const emReset = document.getElementById('btn-emergency-reset');
        if (emReset) {
          emReset.addEventListener('click', () => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = window.location.origin + window.location.pathname + '?ts=' + Date.now() + '#dashboard';
          });
        }
      }
    }
  }

  initGlobalSearch() {
    const input = document.getElementById('global-search-input');
    const dropdown = document.getElementById('global-search-dropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        return;
      }

      const state = store.get();
      const docs = [
        { title: 'Digitally Certified e-Service Book (e-SB)', route: 'service-book', icon: '📖', type: 'Official Document' },
        { title: '7th CPC Monthly Pay Slip & Salary Breakdown', route: 'salary', icon: '💳', type: 'Tax & Finance' },
        { title: 'Form 16 (TDS Certificate & Detailed Annexure)', route: 'salary', icon: '📄', type: 'Tax & Finance' },
        { title: 'ITR-V (Income Tax Return Verification)', route: 'salary', icon: '✅', type: 'Tax & Finance' },
        { title: 'Form 26AS (Tax Credit Statement)', route: 'service-book', icon: '📑', type: 'Tax & Finance' },
        { title: 'Official Government Service Certificate', route: 'service-book', icon: '📜', type: 'Service Record' },
        { title: 'Gazette Transfer & Posting Order (DRDO Pune)', route: 'service-book', icon: '📋', type: 'Orders & Directives' },
        { title: 'Special Operations Directive Order (TOP SECRET)', route: 'dashboard', icon: '🎖️', type: 'Orders & Directives' },
        { title: 'CGHS Beneficiary Plastic Card & Medical Dossier', route: 'cghs', icon: '⚕️', type: 'Medical & Welfare' },
        { title: 'LTC Claim Sanction & Settlement Warrant', route: 'ltc', icon: '✈️', type: 'Tax & Finance' },
        { title: 'SPARROW e-APAR Performance Appraisal Dossier', route: 'apar', icon: '📊', type: 'Service Record' },
        { title: 'MACP Scheme Sanction Order', route: 'service-book', icon: '🎖️', type: 'Service Record' },
        { title: 'NPS PRAN Statement & Tier-I Wealth Portfolio', route: 'pension', icon: '💰', type: 'Pension & Wealth' },
        { title: 'Smart Biometric ID Card (Defence Civil Services)', route: 'id-card', icon: '🪪', type: 'Identity Proof' },
        { title: 'CSD Canteen Smart Cards (Grocery & Liquor Pass)', route: 'canteen', icon: '🛒', type: 'Welfare Cards' },
        { title: 'CSD Retail POS Billing Terminal & Quotas', route: 'canteen', icon: '🧾', type: 'CSD Retail Billing' },
        { title: 'CSD Retail Tax Invoices & Cash Receipts', route: 'canteen', icon: '📄', type: 'Tax & Finance' },
        { title: 'CSD AFD Booking Desk (Cars & White Goods)', route: 'canteen', icon: '🚗', type: 'Welfare Schemes' },
        { title: 'Immovable Property Return (IPR) Acknowledgment', route: 'ipr', icon: '🏢', type: 'Compliance & Legal' },
        { title: 'Vigilance Clearance Certificate (Ordinary Passport NOC)', route: 'vigilance', icon: '🛡️', type: 'Compliance & Legal' },
        { title: 'Leave Management & Sanction Orders', route: 'leave', icon: '🏖️', type: 'Service Record' },
        { title: 'Central Document Vault & DigiLocker Repository', route: 'vault', icon: '🔐', type: 'Document Repository' }
      ];

      const matchedDocs = docs.filter(d => 
        d.title.toLowerCase().includes(q) || 
        d.type.toLowerCase().includes(q) || 
        d.route.toLowerCase().includes(q)
      );

      const circulars = (state.circulars || []).filter(c => 
        (c.title && c.title.toLowerCase().includes(q)) || 
        (c.orderNo && c.orderNo.toLowerCase().includes(q))
      );

      let html = '';
      if (matchedDocs.length > 0) {
        html += `<div style="padding: 8px 12px; background: #f8fafc; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Documents & Records (${matchedDocs.length})</div>`;
        matchedDocs.slice(0, 6).forEach(d => {
          html += `
            <div class="search-result-item" data-route="${d.route}" style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9; cursor: pointer; display: flex; align-items: center; gap: 10px;" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='white'">
              <span style="font-size: 18px;">${d.icon}</span>
              <div style="flex: 1;">
                <div style="font-size: 12.5px; font-weight: 700; color: #002B49;">${d.title}</div>
                <div style="font-size: 10.5px; color: #64748b;">${d.type} &bull; Click to Open</div>
              </div>
              <span style="font-size: 11px; color: #0284c7; font-weight: 600;">Open &rarr;</span>
            </div>
          `;
        });
      }

      if (circulars.length > 0) {
        html += `<div style="padding: 8px 12px; background: #f8fafc; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Orders & Circulars (${circulars.length})</div>`;
        circulars.slice(0, 3).forEach(c => {
          html += `
            <div class="search-result-item" data-route="orders-circulars" style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9; cursor: pointer; display: flex; align-items: center; gap: 10px;" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='white'">
              <span style="font-size: 18px;">📜</span>
              <div style="flex: 1;">
                <div style="font-size: 12px; font-weight: 700; color: #002B49;">${c.title}</div>
                <div style="font-size: 10px; color: #64748b;">${c.orderNo || ''} &bull; ${c.date || ''}</div>
              </div>
              <span style="font-size: 11px; color: #0284c7; font-weight: 600;">View &rarr;</span>
            </div>
          `;
        });
      }

      if (!html) {
        html = `<div style="padding: 20px; text-align: center; color: #64748b; font-size: 12px;">No matching documents or records found for "<strong>${q}</strong>".</div>`;
      }

      dropdown.innerHTML = html;
      dropdown.style.display = 'block';

      dropdown.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('mousedown', (evt) => {
          evt.preventDefault();
          const targetRoute = item.dataset.route;
          if (targetRoute) {
            window.location.hash = '#' + targetRoute;
            dropdown.style.display = 'none';
            input.value = '';
          }
        });
      });
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.style.display = 'none';
      } else if (e.key === 'Enter') {
        const first = dropdown.querySelector('.search-result-item');
        if (first) {
          const targetRoute = first.dataset.route;
          if (targetRoute) {
            window.location.hash = '#' + targetRoute;
            dropdown.style.display = 'none';
            input.value = '';
          }
        }
      }
    });

    // Close on blur with small delay
    input.addEventListener('blur', () => {
      setTimeout(() => {
        dropdown.style.display = 'none';
      }, 250);
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.ehrmsApp = new EhrmsApp();
});
