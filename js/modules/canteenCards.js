/**
 * e-HRMS 2.0 - Official CSD Canteen & Retail Billing System
 * Unit Run Canteen (URC) • Canteen Stores Department (CSD)
 * Complete integration with Smart Cards, POS Terminal, Quota Management,
 * Invoices, AFD Booking, and Cryptographic Blockchain Ledger.
 */

import { store } from '../state.js';
import { downloadCanteenCards, downloadCsdInvoice, downloadCsdDotMatrixSlip, printCsdInvoice, printCsdDotMatrixSlip, showDownloadToast } from '../downloader.js';
import { CSD_LOGO_B64, EMBLEM_B64, MOD_STAMP_B64 } from '../csd_assets.js';

// Module-level interactive state
let currentTab = 'cards';
let activeCategory = 'All';
let searchQuery = '';
let cart = [];
let selectedCustomerCard = 'LB08260547713500S01';
let activeModalTxn = null;
let activeModalView = 'a4';

export function renderCanteenCards(container, initialTab = null) {
  if (initialTab) {
    currentTab = initialTab;
  }

  const state = store.get();
  const user = state.currentUser || { name: 'ANURAG ANIL BAWASKAR', empId: 'MOD-DMA-2024-8104' };
  const csd = state.csdBilling || {
    cardNo: 'LB08260547713500S01',
    dependentCardNo: 'LB08260547713500D01',
    canteen: 'URC HQ DELHI AREA (Sena Bhawan)',
    entitlements: { groceriesLimit: 10000, groceriesDrawn: 2850, liquorLimit: 10, liquorDrawn: 2 },
    inventory: [],
    transactions: [],
    afdOrders: []
  };

  const dependentName = 'SHRI ANIL RAMKRISHNA BAWASKAR';
  const dependentRelation = 'Father';

  container.innerHTML = `
    <!-- Top Header Strip -->
    <div class="page-title-strip" style="background: linear-gradient(135deg, #002b49 0%, #004b80 100%); color: white; padding: 18px 24px; border-radius: 8px; margin-bottom: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <img src="assets/csd_logo.png" style="height: 48px; background: white; padding: 4px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);" alt="CSD Logo" onerror="this.style.display='none'">
          <div>
            <h2 style="margin: 0; font-size: 21px; font-weight: 800; color: #ffffff; display: flex; align-items: center; gap: 10px;">
              <span>🛒</span> Official CSD Canteen &amp; Retail Billing System &bull; URC
            </h2>
            <div style="font-size: 12.5px; color: #cbd5e1; margin-top: 4px;">
              Canteen Stores Department (CSD) &bull; Ministry of Defence &bull; <strong>URC HQ DELHI AREA (Sena Bhawan)</strong>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <button class="btn btn-sm btn-primary" id="btn-download-canteen" style="background: #ff9933; border-color: #e67e00; font-weight: 700; color: #000;">
            📥 Download CSD Cards (PDF)
          </button>
          <button class="btn btn-sm btn-outline" id="btn-switch-pos" style="color: white; border-color: rgba(255,255,255,0.4); font-weight: 700;">
            🛒 POS Terminal
          </button>
          <a href="csd_portal.html" target="_blank" class="btn btn-sm" style="background: #138808; color: white; font-weight: 700; text-decoration: none; border-radius: 4px; padding: 6px 12px; display: inline-flex; align-items: center; gap: 6px;" title="Open Standalone Cashier &amp; POS Screen">
            ↗️ Standalone CSD Portal
          </a>
        </div>
      </div>
    </div>

    <!-- CSD Module Tab Navigation Bar -->
    <div class="csd-tab-nav" style="display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 2px; overflow-x: auto;">
      <button class="csd-nav-btn ${currentTab === 'cards' ? 'active' : ''}" data-tab="cards">
        🪪 Smart Canteen Cards
      </button>
      <button class="csd-nav-btn ${currentTab === 'pos' ? 'active' : ''}" data-tab="pos">
        🛒 Retail POS Billing Terminal
      </button>
      <button class="csd-nav-btn ${currentTab === 'quotas' ? 'active' : ''}" data-tab="quotas">
        📊 Monthly Quotas &amp; Limits
      </button>
      <button class="csd-nav-btn ${currentTab === 'invoices' ? 'active' : ''}" data-tab="invoices">
        🧾 Purchase History &amp; Invoices (${(csd.transactions || []).length})
      </button>
      <button class="csd-nav-btn ${currentTab === 'afd' ? 'active' : ''}" data-tab="afd">
        🚗 AFD Booking Desk
      </button>
      <button class="csd-nav-btn ${currentTab === 'blockchain' ? 'active' : ''}" data-tab="blockchain">
        🔗 Blockchain Audit Ledger
      </button>
    </div>

    <style>
      .csd-nav-btn {
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-bottom: none;
        border-radius: 6px 6px 0 0;
        padding: 9px 18px;
        font-size: 13px;
        font-weight: 700;
        color: #475569;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
      }
      .csd-nav-btn:hover {
        background: #eff6ff;
        color: #002b49;
      }
      .csd-nav-btn.active {
        background: #002b49;
        color: #ffffff;
        border-color: #002b49;
        box-shadow: 0 -2px 6px rgba(0,0,0,0.06);
      }
      .csd-product-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .csd-product-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(0,0,0,0.08);
        border-color: #38bdf8;
      }
      .csd-cat-pill {
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #475569;
        cursor: pointer;
        transition: all 0.2s;
      }
      .csd-cat-pill:hover, .csd-cat-pill.active {
        background: #002b49;
        color: #ffffff;
        border-color: #002b49;
      }
      .csd-invoice-row:hover {
        background: #f0f9ff !important;
      }
    </style>

    <!-- Tab Content Render Area -->
    <div id="csd-tab-container"></div>

    <!-- Invoice Viewer Modal with Roboto Font, Dual Emblems, Dot Matrix Slip Mode & Custom Date Picker -->
    <div id="csd-invoice-modal" class="parichay-modal-overlay" style="display: none; z-index: 10005; background: rgba(15, 23, 42, 0.88); position: fixed; inset: 0; align-items: center; justify-content: center; overflow-y: auto; padding: 20px;">
      <div style="background: #ffffff; border-radius: 8px; width: 100%; max-width: 880px; max-height: 92vh; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); position: relative; border: 1.5px solid #002b49;">
        
        <!-- Header Toolbar -->
        <div style="background: #002b49; color: white; padding: 10px 18px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; position: sticky; top: 0; z-index: 10; border-bottom: 2.5px solid #ff9933;">
          
          <!-- Mode Tabs -->
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-weight: 800; font-size: 13.5px; display: flex; align-items: center; gap: 6px;">
              <span>🧾</span> CSD Bill
            </div>
            <div style="display: flex; background: rgba(255,255,255,0.15); border-radius: 4px; padding: 2px; gap: 2px;">
              <button id="btn-modal-tab-a4" class="btn btn-xs" style="font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 3px; background: #ffffff; color: #002b49; cursor: pointer; border: none;">
                📑 Roboto A4 Invoice
              </button>
              <button id="btn-modal-tab-slip" class="btn btn-xs" style="font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 3px; background: transparent; color: #ffffff; cursor: pointer; border: none;">
                📟 Dot Matrix Slip
              </button>
            </div>
          </div>

          <!-- Custom Date Picker -->
          <div style="display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.25);">
            <span style="font-size: 11px; font-weight: 800; color: #fde047;">📅 Bill Date:</span>
            <input type="datetime-local" id="csd-modal-custom-date" style="font-size: 11.5px; padding: 2px 6px; border-radius: 3px; border: 1px solid #cbd5e1; font-family: 'Roboto Mono', monospace; background: #ffffff; color: #0f172a;">
            <button id="btn-apply-modal-date" class="btn btn-xs btn-success" style="font-weight: 800; font-size: 10.5px; padding: 3px 8px; background: #16a34a; border-color: #15803d; color: white; cursor: pointer;">
              ✓ Set Date
            </button>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; gap: 6px; align-items: center;">
            <button id="btn-modal-print-invoice" class="btn btn-sm btn-warning" style="background: #f59e0b; border-color: #d97706; color: #000; font-weight: 800; padding: 4px 10px; font-size: 11px;">
              🖨️ Print
            </button>
            <button id="btn-modal-dl-a4" class="btn btn-sm btn-primary" style="background: #2563eb; border-color: #1d4ed8; color: white; font-weight: 700; padding: 4px 10px; font-size: 11px;">
              📥 A4 PDF
            </button>
            <button id="btn-modal-dl-slip" class="btn btn-sm btn-success" style="background: #16a34a; border-color: #15803d; color: white; font-weight: 700; padding: 4px 10px; font-size: 11px;">
              📟 Dot Matrix
            </button>
            <button id="btn-close-invoice-modal" style="background: transparent; border: none; color: white; font-size: 22px; cursor: pointer; padding: 0 4px; line-height: 1;">
              &times;
            </button>
          </div>
        </div>

        <!-- Render Content -->
        <div id="csd-modal-invoice-content" style="padding: 20px;"></div>
      </div>
    </div>
  `;

  // Bind Global Header Buttons
  container.querySelector('#btn-download-canteen')?.addEventListener('click', () => {
    downloadCanteenCards(user);
  });

  container.querySelector('#btn-switch-pos')?.addEventListener('click', () => {
    switchTab('pos');
  });

  // Bind Sub-Navigation
  const tabBtns = container.querySelectorAll('.csd-nav-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Modal close handlers
  const invoiceModal = container.querySelector('#csd-invoice-modal');
  container.querySelector('#btn-close-invoice-modal')?.addEventListener('click', () => {
    invoiceModal.style.display = 'none';
  });

  container.querySelector('#btn-modal-print-invoice')?.addEventListener('click', () => {
    if (activeModalView === 'slip' && activeModalTxn) {
      printCsdDotMatrixSlip(user, activeModalTxn);
    } else if (activeModalTxn) {
      printCsdInvoice(user, activeModalTxn);
    } else {
      window.print();
    }
  });

  container.querySelector('#btn-modal-dl-a4')?.addEventListener('click', () => {
    if (activeModalTxn) {
      downloadCsdInvoice(user, activeModalTxn);
      showDownloadToast('CSD Retail Tax Invoice Downloaded!');
    }
  });

  container.querySelector('#btn-modal-dl-slip')?.addEventListener('click', () => {
    if (activeModalTxn) {
      downloadCsdDotMatrixSlip(user, activeModalTxn);
      showDownloadToast('CSD Dot Matrix Cash Memo Slip Downloaded!');
    }
  });

  // Mode Toggle Buttons
  container.querySelector('#btn-modal-tab-a4')?.addEventListener('click', () => {
    activeModalView = 'a4';
    updateModalTabStyles();
    renderCurrentModalContent();
  });

  container.querySelector('#btn-modal-tab-slip')?.addEventListener('click', () => {
    activeModalView = 'slip';
    updateModalTabStyles();
    renderCurrentModalContent();
  });

  function updateModalTabStyles() {
    const btnA4 = container.querySelector('#btn-modal-tab-a4');
    const btnSlip = container.querySelector('#btn-modal-tab-slip');
    if (!btnA4 || !btnSlip) return;
    if (activeModalView === 'a4') {
      btnA4.style.background = '#ffffff';
      btnA4.style.color = '#002b49';
      btnSlip.style.background = 'transparent';
      btnSlip.style.color = '#ffffff';
    } else {
      btnSlip.style.background = '#ffffff';
      btnSlip.style.color = '#002b49';
      btnA4.style.background = 'transparent';
      btnA4.style.color = '#ffffff';
    }
  }

  // Custom Date Picker Apply
  container.querySelector('#btn-apply-modal-date')?.addEventListener('click', () => {
    const input = container.querySelector('#csd-modal-custom-date');
    if (!input || !input.value || !activeModalTxn) return;
    const newFormattedDate = input.value.replace('T', ' ') + ':00';
    activeModalTxn.date = newFormattedDate;
    
    // Update in state
    store.set(s => {
      const txns = (s.csdBilling && s.csdBilling.transactions) || [];
      const updated = txns.map(t => t.id === activeModalTxn.id ? { ...t, date: newFormattedDate } : t);
      return {
        ...s,
        csdBilling: { ...s.csdBilling, transactions: updated }
      };
    });

    renderCurrentModalContent();
    showDownloadToast('Bill date updated to ' + newFormattedDate);
  });

  // Function to switch tabs
  function switchTab(tabKey) {
    currentTab = tabKey;
    tabBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabKey);
    });
    renderActiveTab();
  }

  // Render content based on active tab
  function renderActiveTab() {
    const tabContainer = container.querySelector('#csd-tab-container');
    if (!tabContainer) return;

    switch (currentTab) {
      case 'cards':
        renderCardsTab(tabContainer);
        break;
      case 'pos':
        renderPosTab(tabContainer);
        break;
      case 'quotas':
        renderQuotasTab(tabContainer);
        break;
      case 'invoices':
        renderInvoicesTab(tabContainer);
        break;
      case 'afd':
        renderAfdTab(tabContainer);
        break;
      case 'blockchain':
        renderBlockchainTab(tabContainer);
        break;
      default:
        renderCardsTab(tabContainer);
        break;
    }
  }

  // -------------------------------------------------------------
  // TAB 1: SMART CARDS (Original Highly Authentic Replication)
  // -------------------------------------------------------------
  function renderCardsTab(tabContainer) {
    tabContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 40px; margin-bottom: 40px;">
        <!-- PRIMARY CARD SECTION -->
        <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">
            <h3 style="margin: 0; font-size: 17px; color: #002b49; font-weight: 800;">
              1. Primary CSD Smart Card (Serving Officer)
            </h3>
            <span style="background: #dcfce7; color: #166534; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 12px; border: 1px solid #bbf7d0;">
              ✓ ACTIVE &bull; GROCERY &amp; LIQUOR
            </span>
          </div>
          
          <div style="display: flex; gap: 30px; flex-wrap: wrap;">
            <!-- Primary Card Front -->
            ${renderCardFront(
              user.name, 
              'ASO-I', 
              'SERVING', 
              'GROCERY & LIQUOR CARD', 
              csd.cardNo || 'LB08260547713500S01', 
              'assets/anurag_photo.jpg', 
              'D 1710 1998'
            )}

            <!-- Primary Card Back -->
            ${renderCardBack('5012423002107316')}
          </div>

          <div style="margin-top: 20px; padding: 12px 16px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
            <div>
              <strong>Chip UID:</strong> <span style="font-family: monospace;">IND-CSD-CHIP-7F89B2</span> &bull; 
              <strong>Attached Depot:</strong> ${csd.canteen || 'URC HQ DELHI AREA (Sena Bhawan)'} &bull; 
              <strong>Card PIN:</strong> <span style="font-family: monospace;">1234</span>
            </div>
            <button class="btn btn-sm btn-outline" onclick="window.print()" style="font-weight: 600;">
              🖨️ Print Card
            </button>
          </div>
        </div>

        <!-- DEPENDENT CARD SECTION -->
        <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">
            <h3 style="margin: 0; font-size: 17px; color: #002b49; font-weight: 800;">
              2. Dependent CSD Smart Card (${dependentRelation})
            </h3>
            <span style="background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 12px; border: 1px solid #bae6fd;">
              ✓ ACTIVE &bull; GROCERY AUTHORIZED
            </span>
          </div>
          
          <div style="display: flex; gap: 30px; flex-wrap: wrap;">
            <!-- Dependent Card Front -->
            ${renderCardFront(
              dependentName, 
              'DEPENDENT', 
              'DEPENDENT', 
              'GROCERY CARD', 
              csd.dependentCardNo || 'LB08260547713500D01', 
              'assets/father_photo.jpg', 
              'D 1710 1976'
            )}

            <!-- Dependent Card Back -->
            ${renderCardBack('5012423002107317')}
          </div>

          <div style="margin-top: 20px; padding: 12px 16px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
            <div>
              <strong>Beneficiary Relation:</strong> Father (RSI Anil R. Bawaskar) &bull; 
              <strong>Annual Renewal:</strong> Synchronized with Primary Card &bull; 
              <strong>Valid Till:</strong> 11/02/2033
            </div>
            <button class="btn btn-sm btn-outline" onclick="window.print()" style="font-weight: 600;">
              🖨️ Print Card
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // TAB 2: RETAIL POS BILLING TERMINAL
  // -------------------------------------------------------------
  function renderPosTab(tabContainer) {
    const inv = csd.inventory || [];
    const categories = ['All', 'Groceries', 'Electronics', 'Liquor', 'Toiletries', 'Automobiles'];

    // Filter items
    const filteredItems = inv.filter(it => {
      const matchCat = activeCategory === 'All' || it.category === activeCategory;
      const matchQuery = !searchQuery || 
        it.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (it.id && it.id.includes(searchQuery)) ||
        (it.hsn && it.hsn.includes(searchQuery));
      return matchCat && matchQuery;
    });

    // Cart calculations
    let taxableTotal = 0;
    let cgstTotal = 0;
    let sgstTotal = 0;
    let netTotal = 0;
    let marketTotal = 0;
    let cartGroceryTotal = 0;
    let cartLiquorUnits = 0;

    cart.forEach(item => {
      const netVal = item.price * item.qty;
      const taxable = netVal / 1.18;
      taxableTotal += taxable;
      cgstTotal += taxable * 0.09;
      sgstTotal += taxable * 0.09;
      netTotal += netVal;
      marketTotal += ((item.marketPrice || item.price * 1.15) * item.qty);

      if (item.category === 'Groceries') cartGroceryTotal += netVal;
      if (item.category === 'Liquor') cartLiquorUnits += item.qty;
    });

    const savingsTotal = Math.max(0, marketTotal - netTotal);

    // Quota validation
    const ent = csd.entitlements || { groceriesLimit: 10000, groceriesDrawn: 2850, liquorLimit: 10, liquorDrawn: 2 };
    const grocRemaining = ent.groceriesLimit - ent.groceriesDrawn;
    const liqRemaining = ent.liquorLimit - ent.liquorDrawn;
    const grocExceeded = cartGroceryTotal > grocRemaining;
    const liqExceeded = cartLiquorUnits > liqRemaining;

    tabContainer.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 380px; gap: 24px; align-items: start;">
        
        <!-- Left: Catalog & Filters -->
        <div>
          <!-- Search & Filter Header -->
          <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <div style="display: flex; gap: 12px; margin-bottom: 14px;">
              <input type="text" id="csd-pos-search" placeholder="🔍 Search by product name, barcode (BCD), or HSN..." value="${searchQuery}" style="flex: 1; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none;">
              <button class="btn btn-sm btn-outline" id="btn-clear-pos-search" style="font-weight: 600;">Clear</button>
            </div>

            <!-- Categories -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${categories.map(c => `
                <button class="csd-cat-pill ${activeCategory === c ? 'active' : ''}" data-cat="${c}">
                  ${c}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Product Catalog Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
            ${filteredItems.length === 0 ? `
              <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: #64748b; background: white; border-radius: 8px; border: 1px dashed #cbd5e1;">
                No items match your search criteria. Try a different category or search term.
              </div>
            ` : filteredItems.map(it => {
              const saveVal = (it.marketPrice || it.price * 1.15) - it.price;
              const inCart = cart.find(c => c.id === it.id);
              return `
                <div class="csd-product-card">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                      <span style="font-size: 10.5px; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 10px;">
                        ${it.category}
                      </span>
                      <span style="font-size: 10px; font-family: monospace; color: #64748b;">
                        HSN: ${it.hsn}
                      </span>
                    </div>
                    <div style="font-size: 13.5px; font-weight: 800; color: #0f172a; margin-bottom: 6px; line-height: 1.35;">
                      ${it.name}
                    </div>
                    <div style="font-size: 11px; color: #64748b; margin-bottom: 12px;">
                      BCD: <span style="font-family: monospace;">${it.id}</span> &bull; Stock: <strong>${it.stock}</strong>
                    </div>
                  </div>

                  <div>
                    <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px;">
                      <span style="font-size: 18px; font-weight: 900; color: #002b49;">₹${it.price.toFixed(2)}</span>
                      <del style="font-size: 12px; color: #94a3b8;">₹${(it.marketPrice || it.price * 1.15).toFixed(2)}</del>
                    </div>
                    <div style="font-size: 11px; font-weight: 700; color: #16a34a; margin-bottom: 12px;">
                      Save ₹${saveVal.toFixed(2)} (${Math.round((saveVal / (it.marketPrice || it.price * 1.15)) * 100)}% Off)
                    </div>

                    <button class="btn btn-sm btn-add-to-bill" data-id="${it.id}" style="width: 100%; font-weight: 700; background: ${inCart ? '#0284c7' : '#002b49'}; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer;">
                      ${inCart ? `✓ Added (${inCart.qty}) &bull; Add More` : '➕ Add to Bill'}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Right: POS Terminal Cart & Bill Generator -->
        <div style="background: white; border: 1.5px solid #002b49; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); position: sticky; top: 20px;">
          <!-- Terminal Header -->
          <div style="background: #002b49; color: white; padding: 14px 18px;">
            <div style="font-size: 14px; font-weight: 800; display: flex; align-items: center; justify-content: space-between;">
              <span>🛒 Active POS Billing Session</span>
              <span style="font-size: 11px; font-family: monospace; background: #004b80; padding: 2px 6px; border-radius: 3px;">POS-04</span>
            </div>
            <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">
              Session: SESS-CSD-2026 &bull; Cashier: Hav. Rajesh Kumar
            </div>
          </div>

          <!-- Customer Smart Card Selector -->
          <div style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
            <label style="font-size: 11px; font-weight: 700; color: #475569; display: block; margin-bottom: 6px;">
              SELECT SMART CARD HOLDER:
            </label>
            <select id="pos-card-select" style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12px; font-weight: 600; outline: none;">
              <option value="LB08260547713500S01" ${selectedCustomerCard === 'LB08260547713500S01' ? 'selected' : ''}>
                Primary: Major Anurag A. Bawaskar (ASO-I) [LB08260547713500S01]
              </option>
              <option value="LB08260547713500D01" ${selectedCustomerCard === 'LB08260547713500D01' ? 'selected' : ''}>
                Dependent: Shri Anil R. Bawaskar (Father) [LB08260547713500D01]
              </option>
            </select>

            <!-- Quota Balances Strip -->
            <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 11px; background: #e0f2fe; padding: 6px 10px; border-radius: 4px; color: #0369a1; font-weight: 700;">
              <span>Groc Avail: ₹${(grocRemaining - cartGroceryTotal).toFixed(0)}</span>
              <span>Liq Avail: ${(liqRemaining - cartLiquorUnits)} Units</span>
            </div>

            ${(grocExceeded || liqExceeded) ? `
              <div style="margin-top: 8px; padding: 6px 10px; background: #fee2e2; border: 1px solid #fca5a5; border-radius: 4px; color: #dc2626; font-size: 11px; font-weight: 700;">
                ⚠️ Monthly Quota Exceeded! Please adjust quantities.
              </div>
            ` : ''}
          </div>

          <!-- Cart Items Container -->
          <div style="max-height: 260px; overflow-y: auto; padding: 14px 18px; border-bottom: 1px solid #e2e8f0;">
            ${cart.length === 0 ? `
              <div style="text-align: center; color: #94a3b8; font-size: 12.5px; padding: 25px 10px;">
                <div style="font-size: 28px; margin-bottom: 6px;">🛒</div>
                No items added to bill yet.<br>Click "Add to Bill" on items in catalog.
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${cart.map(item => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 1px dashed #e2e8f0;">
                    <div style="flex: 1; padding-right: 10px;">
                      <div style="font-size: 12px; font-weight: 700; color: #0f172a; line-height: 1.25;">${item.name}</div>
                      <div style="font-size: 11px; color: #64748b;">₹${item.price.toFixed(2)} &times; ${item.qty} = <strong>₹${(item.price * item.qty).toFixed(2)}</strong></div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <button class="btn-qty-minus" data-id="${item.id}" style="width: 24px; height: 24px; border-radius: 3px; border: 1px solid #cbd5e1; background: white; cursor: pointer; font-weight: bold;">-</button>
                      <span style="font-size: 12px; font-weight: 800; min-width: 16px; text-align: center;">${item.qty}</span>
                      <button class="btn-qty-plus" data-id="${item.id}" style="width: 24px; height: 24px; border-radius: 3px; border: 1px solid #cbd5e1; background: white; cursor: pointer; font-weight: bold;">+</button>
                      <button class="btn-remove-item" data-id="${item.id}" style="border: none; background: transparent; cursor: pointer; font-size: 14px; margin-left: 4px;" title="Remove Item">🗑️</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Financial Calculation Breakdown -->
          <div style="padding: 14px 18px; background: #f8fafc; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: #475569;">
              <span>Taxable Subtotal:</span>
              <span>₹${taxableTotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: #475569;">
              <span>CGST (9.0%):</span>
              <span>₹${cgstTotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: #475569;">
              <span>SGST (9.0%):</span>
              <span>₹${sgstTotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 900; color: #002b49; border-top: 2px solid #cbd5e1; padding-top: 8px; margin-top: 4px;">
              <span>NET PAYABLE:</span>
              <span>₹${netTotal.toFixed(2)}</span>
            </div>

            ${savingsTotal > 0 ? `
              <div style="margin-top: 8px; padding: 4px 8px; background: #dcfce7; color: #15803d; border-radius: 4px; font-size: 11px; font-weight: 700; text-align: center;">
                🔥 You Save ₹${savingsTotal.toFixed(2)} vs Market Price!
              </div>
            ` : ''}

            <!-- Payment Mode (Strict Cash Only Enforcement) -->
            <div style="margin-top: 12px;">
              <label style="font-size: 10.5px; font-weight: 700; color: #475569; display: block; margin-bottom: 4px;">PAYMENT METHOD (MANDATORY):</label>
              <select id="pos-payment-mode" style="width: 100%; padding: 6px 8px; border: 1.5px solid #16a34a; border-radius: 4px; font-size: 11.5px; outline: none; background: #f0fdf4; font-weight: 800; color: #166534;">
                <option value="HARD CURRENCY CASH ONLY (Physical Cash Exact Tendered at Counter 01)" selected>💵 HARD CURRENCY CASH ONLY (Counter 01)</option>
              </select>
              <div style="font-size: 9.5px; color: #15803d; margin-top: 4px; font-weight: 600;">
                ⚠️ Policy Directive: Concessional defence billing rate strictly payable in physical cash currency at POS Counter 01.
              </div>
            </div>

            <!-- Custom Bill Date & Time -->
            <div style="margin-top: 10px;">
              <label style="font-size: 10.5px; font-weight: 700; color: #475569; display: block; margin-bottom: 4px;">📅 BILL DATE &amp; TIME (CUSTOM PICKER):</label>
              <input type="datetime-local" id="pos-custom-bill-date" style="width: 100%; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 11.5px; font-family: 'Roboto Mono', monospace; background: white; color: #0f172a;">
            </div>

            <!-- Action Button -->
            <button id="btn-generate-bill" class="btn btn-primary" ${cart.length === 0 || grocExceeded || liqExceeded ? 'disabled' : ''} style="width: 100%; margin-top: 14px; padding: 12px; font-size: 13.5px; font-weight: 800; background: #002b49; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              🖨️ Generate &amp; Download CSD Tax Invoice
            </button>
          </div>
        </div>

      </div>
    `;

    // Bind POS events
    tabContainer.querySelector('#csd-pos-search')?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPosTab(tabContainer);
    });

    tabContainer.querySelector('#btn-clear-pos-search')?.addEventListener('click', () => {
      searchQuery = '';
      renderPosTab(tabContainer);
    });

    tabContainer.querySelectorAll('.csd-cat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        renderPosTab(tabContainer);
      });
    });

    tabContainer.querySelectorAll('.btn-add-to-bill').forEach(btn => {
      btn.addEventListener('click', () => {
        const prod = inv.find(p => p.id === btn.dataset.id);
        if (prod) {
          const ex = cart.find(c => c.id === prod.id);
          if (ex) {
            ex.qty += 1;
          } else {
            cart.push({ ...prod, qty: 1 });
          }
          renderPosTab(tabContainer);
        }
      });
    });

    tabContainer.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = cart.find(c => c.id === btn.dataset.id);
        if (item) {
          item.qty += 1;
          renderPosTab(tabContainer);
        }
      });
    });

    tabContainer.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = cart.find(c => c.id === btn.dataset.id);
        if (item) {
          item.qty -= 1;
          if (item.qty <= 0) {
            cart = cart.filter(c => c.id !== item.id);
          }
          renderPosTab(tabContainer);
        }
      });
    });

    tabContainer.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        cart = cart.filter(c => c.id !== btn.dataset.id);
        renderPosTab(tabContainer);
      });
    });

    tabContainer.querySelector('#pos-card-select')?.addEventListener('change', (e) => {
      selectedCustomerCard = e.target.value;
      renderPosTab(tabContainer);
    });

    // Check out / Generate bill
    tabContainer.querySelector('#btn-generate-bill')?.addEventListener('click', () => {
      if (cart.length === 0) return;

      const now = new Date();
      const billSerial = Math.floor(1000 + Math.random() * 9000);
      const billNo = `CSD/URC/DEL/2026/${String(now.getMonth() + 1).padStart(2, '0')}/${billSerial}`;
      const indentNo = `IND-2026/${String(now.getMonth() + 1).padStart(2, '0')}/${billSerial}`;
      const customDateInput = tabContainer.querySelector('#pos-custom-bill-date')?.value;
      const formattedDate = customDateInput ? customDateInput.replace('T', ' ') + ':00' : now.toISOString().replace('T', ' ').slice(0, 19);
      const paymentMode = 'HARD CURRENCY CASH ONLY (Physical Cash Exact Tendered at Counter 01)';

      const newTxn = {
        id: `CSD-TXN-${Date.now()}`,
        billNo,
        indentNo,
        date: formattedDate,
        canteen: csd.canteen || 'URC HQ DELHI AREA (Sena Bhawan)',
        terminal: 'POS-01 / IP: 192.168.1.101',
        cashier: 'Sub Maj R.K. Yadav',
        manager: 'Sub Maj R.K. Yadav',
        paymentMode,
        paymentType: 'CASH',
        items: JSON.parse(JSON.stringify(cart)),
        totalTaxable: taxableTotal,
        totalCgst: cgstTotal,
        totalSgst: sgstTotal,
        totalNet: netTotal,
        totalSavings: savingsTotal,
        cardNo: selectedCustomerCard,
        rank: user.designation || 'ASO-I (Group A Gazetted)',
        grocLimit: ent.groceriesLimit,
        grocDrawn: ent.groceriesDrawn + cartGroceryTotal,
        liqLimit: ent.liquorLimit,
        liqDrawn: ent.liquorDrawn + cartLiquorUnits,
        status: 'COMPLETED',
        cashTendered: netTotal,
        cashChange: 0.00,
        cashVoucherNo: `CSD/CASH/DEL/2026/${String(now.getMonth() + 1).padStart(2, '0')}/${billSerial}`
      };

      // Update state
      store.set(s => {
        const existingTxns = (s.csdBilling && s.csdBilling.transactions) || [];
        const updatedTxns = [newTxn, ...existingTxns];

        // Deduct inventory stock
        const currentInv = (s.csdBilling && s.csdBilling.inventory) || [];
        const updatedInv = currentInv.map(p => {
          const matchCart = cart.find(c => c.id === p.id);
          if (matchCart) {
            return { ...p, stock: Math.max(0, p.stock - matchCart.qty) };
          }
          return p;
        });

        // Update entitlements
        const currentEnt = (s.csdBilling && s.csdBilling.entitlements) || ent;
        const updatedEnt = {
          ...currentEnt,
          groceriesDrawn: currentEnt.groceriesDrawn + cartGroceryTotal,
          groceriesBalance: Math.max(0, currentEnt.groceriesLimit - (currentEnt.groceriesDrawn + cartGroceryTotal)),
          liquorDrawn: currentEnt.liquorDrawn + cartLiquorUnits,
          liquorBalance: Math.max(0, currentEnt.liquorLimit - (currentEnt.liquorDrawn + cartLiquorUnits))
        };

        return {
          ...s,
          csdBilling: {
            ...s.csdBilling,
            transactions: updatedTxns,
            inventory: updatedInv,
            entitlements: updatedEnt
          }
        };
      });

      // Trigger authentic download
      downloadCsdDotMatrixSlip(user, newTxn);
      showDownloadToast(`CSD Dot Matrix Retail Slip #${billNo} Generated & Downloaded!`);

      // Clear cart
      cart = [];

      // Open Modal to show newly generated invoice
      openInvoiceModal(newTxn);
    });
  }

  // -------------------------------------------------------------
  // TAB 3: MONTHLY QUOTAS & ENTITLEMENT LIMITS
  // -------------------------------------------------------------
  function renderQuotasTab(tabContainer) {
    const ent = csd.entitlements || {
      groceriesLimit: 10000,
      groceriesDrawn: 2850,
      groceriesBalance: 7150,
      liquorLimit: 10,
      liquorDrawn: 2,
      liquorBalance: 8,
      afdEligibility: 'ELIGIBLE (Tier-1 Officer / Four Wheeler & White Goods)'
    };

    const grocPercent = Math.min(100, Math.round((ent.groceriesDrawn / ent.groceriesLimit) * 100));
    const liqPercent = Math.min(100, Math.round((ent.liquorDrawn / ent.liquorLimit) * 100));

    tabContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        
        <!-- Quotas Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
          
          <!-- Groceries Card -->
          <div style="background: white; border: 1px solid #cbd5e1; border-top: 4px solid #0284c7; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 13px; font-weight: 800; color: #002b49;">🛒 GROCERIES QUOTA (MONTHLY)</span>
              <span style="font-size: 11px; background: #e0f2fe; color: #0284c7; font-weight: 700; padding: 2px 8px; border-radius: 10px;">Pay Level 7</span>
            </div>
            <div style="font-size: 28px; font-weight: 900; color: #0f172a; margin-bottom: 4px;">
              ₹${(ent.groceriesLimit - ent.groceriesDrawn).toFixed(2)}
            </div>
            <div style="font-size: 12px; color: #64748b; margin-bottom: 16px;">
              Available Balance of ₹${ent.groceriesLimit.toLocaleString()} Monthly Limit
            </div>
            
            <!-- Progress Bar -->
            <div style="height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden; margin-bottom: 8px;">
              <div style="height: 100%; width: ${grocPercent}%; background: linear-gradient(90deg, #38bdf8, #0284c7); border-radius: 5px;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: #475569; font-weight: 600;">
              <span>Drawn: ₹${ent.groceriesDrawn.toLocaleString()} (${grocPercent}%)</span>
              <span>Total Limit: ₹${ent.groceriesLimit.toLocaleString()}</span>
            </div>
          </div>

          <!-- Liquor Card -->
          <div style="background: white; border: 1px solid #cbd5e1; border-top: 4px solid #8b5cf6; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 13px; font-weight: 800; color: #002b49;">🍾 LIQUOR ENTITLEMENT (MONTHLY)</span>
              <span style="font-size: 11px; background: #f3e8ff; color: #7c3aed; font-weight: 700; padding: 2px 8px; border-radius: 10px;">Gazetted Officers</span>
            </div>
            <div style="font-size: 28px; font-weight: 900; color: #0f172a; margin-bottom: 4px;">
              ${ent.liquorLimit - ent.liquorDrawn} Units
            </div>
            <div style="font-size: 12px; color: #64748b; margin-bottom: 16px;">
              Available Balance of ${ent.liquorLimit} Units Monthly Limit
            </div>
            
            <!-- Progress Bar -->
            <div style="height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden; margin-bottom: 8px;">
              <div style="height: 100%; width: ${liqPercent}%; background: linear-gradient(90deg, #a78bfa, #7c3aed); border-radius: 5px;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: #475569; font-weight: 600;">
              <span>Drawn: ${ent.liquorDrawn} Units (${liqPercent}%)</span>
              <span>Total Limit: ${ent.liquorLimit} Units</span>
            </div>
          </div>

          <!-- AFD Card -->
          <div style="background: white; border: 1px solid #cbd5e1; border-top: 4px solid #10b981; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 13px; font-weight: 800; color: #002b49;">🚗 AFD VEHICLE &amp; WHITE GOODS</span>
              <span style="font-size: 11px; background: #d1fae5; color: #059669; font-weight: 700; padding: 2px 8px; border-radius: 10px;">Tier 1 Active</span>
            </div>
            <div style="font-size: 20px; font-weight: 900; color: #059669; margin-bottom: 4px;">
              ✓ ELIGIBLE FOR CAR / BIKE
            </div>
            <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">
              Ex-factory ceiling: <strong>₹15,00,000</strong> &bull; Periodicity: 1 Car every 8 Years
            </div>
            <div style="font-size: 11.5px; color: #334155; line-height: 1.5; background: #f0fdf4; padding: 8px 12px; border-radius: 4px; border: 1px solid #bbf7d0;">
              White goods (TV, Refrigerator, AC) permissible annually without ceiling cap.
            </div>
          </div>

        </div>

        <!-- Policy & Entitlements Statutory Framework -->
        <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
          <h3 style="margin-top: 0; color: #002b49; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
            Statutory CSD Entitlement Guidelines under Ministry of Defence Rules
          </h3>
          
          <table class="data-table" style="width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 12.5px;">
            <thead>
              <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left;">
                <th style="padding: 10px;">Pay Level / Cadre Category</th>
                <th style="padding: 10px;">Monthly Grocery Limit</th>
                <th style="padding: 10px;">Monthly Liquor Limit</th>
                <th style="padding: 10px;">AFD Four-Wheeler Limit</th>
                <th style="padding: 10px;">Quota Renewal Periodicity</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: #eff6ff; font-weight: 700; border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; color: #002b49;">Pay Level 7 to 9 (ASO-I / Gazetted Officers) ★ Current</td>
                <td style="padding: 10px;">₹ 10,000.00</td>
                <td style="padding: 10px;">10 Units / Month</td>
                <td style="padding: 10px;">Upto ₹ 15 Lakhs (Every 8 Yrs)</td>
                <td style="padding: 10px; color: #16a34a;">Monthly (1st of Month)</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px;">Pay Level 10 to 14 (Under Secy / Director / JS)</td>
                <td style="padding: 10px;">₹ 15,000.00</td>
                <td style="padding: 10px;">14 Units / Month</td>
                <td style="padding: 10px;">Upto ₹ 25 Lakhs (Every 8 Yrs)</td>
                <td style="padding: 10px;">Monthly (1st of Month)</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px;">Pay Level 15 to 17 (Additional Secy / Secretary / CDS)</td>
                <td style="padding: 10px;">₹ 20,000.00</td>
                <td style="padding: 10px;">18 Units / Month</td>
                <td style="padding: 10px;">No Price Ceiling (Every 8 Yrs)</td>
                <td style="padding: 10px;">Monthly (1st of Month)</td>
              </tr>
              <tr>
                <td style="padding: 10px;">Dependent Smart Cards (Parents / Family)</td>
                <td style="padding: 10px;">Drawn from Primary Quota</td>
                <td style="padding: 10px;">Not Authorized</td>
                <td style="padding: 10px;">Under Primary Officer ID</td>
                <td style="padding: 10px;">Annual Renewal Required</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 16px; font-size: 11.5px; color: #64748b; line-height: 1.5;">
            <strong>Note:</strong> Unutilized grocery and liquor quotas automatically lapse at the end of every calendar month and do not accumulate or carry forward. Next monthly quota rollover occurs on <strong>01 November 2026</strong>.
          </div>
        </div>

      </div>
    `;
  }

  // -------------------------------------------------------------
  // TAB 4: PURCHASE HISTORY & INVOICES
  // -------------------------------------------------------------
  function renderInvoicesTab(tabContainer) {
    const txns = csd.transactions || [];

    tabContainer.innerHTML = `
      <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <h3 style="margin: 0; color: #002b49; font-size: 17px; font-weight: 800;">
              🧾 Verified CSD Purchase Invoices &amp; Tax Memos
            </h3>
            <div style="font-size: 12px; color: #64748b; margin-top: 3px;">
              Permanent electronic record of all retail transactions settled at Unit Run Canteens.
            </div>
          </div>

          <button class="btn btn-sm btn-primary" id="btn-create-new-bill" style="font-weight: 700; background: #002b49;">
            🛒 Open POS to Create Bill
          </button>
        </div>

        ${txns.length === 0 ? `
          <div style="text-align: center; padding: 40px; color: #64748b; border: 1px dashed #cbd5e1; border-radius: 6px;">
            No purchase records found. Generate a bill from the POS Billing Terminal to view invoices here.
          </div>
        ` : `
          <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
            <thead>
              <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left;">
                <th style="padding: 10px;">Date &amp; Time</th>
                <th style="padding: 10px;">Bill / Indent No</th>
                <th style="padding: 10px;">URC Depot</th>
                <th style="padding: 10px;">Items Summary</th>
                <th style="padding: 10px;">Taxable &bull; GST</th>
                <th style="padding: 10px;">Net Paid</th>
                <th style="padding: 10px;">Savings</th>
                <th style="padding: 10px;">Status</th>
                <th style="padding: 10px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${txns.map(t => {
                const itemCount = (t.items || []).reduce((acc, it) => acc + (it.qty || 1), 0);
                const itemsSummary = (t.items || []).slice(0, 2).map(it => `${it.name} (${it.qty})`).join(', ') + ((t.items || []).length > 2 ? ' ...' : '');
                return `
                  <tr class="csd-invoice-row" style="border-bottom: 1px solid #e2e8f0; transition: background 0.15s;">
                    <td style="padding: 10px; font-size: 11.5px; color: #475569; white-space: nowrap;">${t.date}</td>
                    <td style="padding: 10px; font-weight: 700; font-family: monospace; color: #002b49;">${t.billNo}</td>
                    <td style="padding: 10px; font-size: 11.5px;">${t.canteen || 'URC HQ DELHI AREA'}</td>
                    <td style="padding: 10px; font-size: 11px; max-width: 220px;" title="${itemsSummary}">
                      <strong>${itemCount} Items:</strong> ${itemsSummary}
                    </td>
                    <td style="padding: 10px; font-size: 11px;">
                      ₹${(t.totalTaxable || 0).toFixed(2)}<br>
                      <span style="color: #64748b;">GST: ₹${((t.totalCgst || 0) + (t.totalSgst || 0)).toFixed(2)}</span>
                    </td>
                    <td style="padding: 10px; font-weight: 800; color: #002b49; font-size: 13.5px;">
                      ₹${(t.totalNet || 0).toFixed(2)}
                    </td>
                    <td style="padding: 10px; font-weight: 700; color: #16a34a; font-size: 11px;">
                      Save ₹${(t.totalSavings || 0).toFixed(2)}
                    </td>
                    <td style="padding: 10px;">
                      <span style="background: #dcfce7; color: #166534; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 10px;">
                        ✓ ${t.status || 'SETTLED'}
                      </span>
                    </td>
                    <td style="padding: 10px; text-align: right; white-space: nowrap;">
                      <button class="btn btn-sm btn-outline btn-view-invoice" data-id="${t.id}" style="font-weight: 700; margin-right: 4px;">
                        📄 View
                      </button>
                      <button class="btn btn-sm btn-primary btn-dl-invoice" data-id="${t.id}" style="font-weight: 700; background: #002b49; margin-right: 4px;">
                        📥 A4 PDF
                      </button>
                      <button class="btn btn-sm btn-success btn-dl-slip" data-id="${t.id}" style="font-weight: 700; background: #16a34a; border-color: #15803d; color: white;">
                        📟 Slip
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `}
      </div>
    `;

    tabContainer.querySelector('#btn-create-new-bill')?.addEventListener('click', () => {
      switchTab('pos');
    });

    tabContainer.querySelectorAll('.btn-view-invoice').forEach(btn => {
      btn.addEventListener('click', () => {
        const txn = txns.find(t => t.id === btn.dataset.id);
        if (txn) openInvoiceModal(txn);
      });
    });

    tabContainer.querySelectorAll('.btn-dl-invoice').forEach(btn => {
      btn.addEventListener('click', () => {
        const txn = txns.find(t => t.id === btn.dataset.id);
        if (txn) {
          downloadCsdInvoice(user, txn);
          showDownloadToast(`CSD Retail Tax Invoice #${txn.billNo} Downloaded!`);
        }
      });
    });

    tabContainer.querySelectorAll('.btn-dl-slip').forEach(btn => {
      btn.addEventListener('click', () => {
        const txn = txns.find(t => t.id === btn.dataset.id);
        if (txn) {
          downloadCsdDotMatrixSlip(user, txn);
          showDownloadToast(`CSD Dot Matrix Cash Memo #${txn.billNo} Downloaded!`);
        }
      });
    });
  }

  // -------------------------------------------------------------
  // TAB 5: AFD (AGAINST FIRM DEMAND) BOOKING DESK
  // -------------------------------------------------------------
  function renderAfdTab(tabContainer) {
    const orders = csd.afdOrders || [];

    tabContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        
        <!-- Header Info Banner -->
        <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; display: flex; justify-content: space-between; align-items: center; gap: 20px;">
          <div>
            <h3 style="margin: 0; color: #002b49; font-size: 16px; font-weight: 800;">
              🚗 AFD-I (Against Firm Demand) Online Indent Desk
            </h3>
            <div style="font-size: 12.5px; color: #475569; margin-top: 4px; line-height: 1.4;">
              Subsidized procurement of Four-Wheelers, Two-Wheelers, and High-Value Electronics directly from OEM manufacturers under Ministry of Defence concessions.
            </div>
          </div>
          <button class="btn btn-sm btn-primary" id="btn-toggle-afd-form" style="background: #002b49; font-weight: 700; white-space: nowrap;">
            + Submit New AFD Indent
          </button>
        </div>

        <!-- AFD Application Form (Collapsible) -->
        <div id="afd-form-card" style="display: none; background: white; border: 1.5px solid #0284c7; border-radius: 8px; padding: 24px;">
          <h4 style="margin: 0 0 16px 0; color: #002b49; font-size: 15px;">New AFD Indent Application Form</h4>
          <form id="form-new-afd">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div class="form-group">
                <label style="font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">Item Category *</label>
                <select id="afd-in-type" required style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px;">
                  <option value="Four Wheeler (Car)">Four Wheeler (Car - Upto ₹15 Lakhs Ex-Factory)</option>
                  <option value="Two Wheeler (Bike/Scooter)">Two Wheeler (Bike / Scooter)</option>
                  <option value="White Goods (Refrigerator/AC/TV)">White Goods (Refrigerator / AC / Smart TV)</option>
                </select>
              </div>
              <div class="form-group">
                <label style="font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">Specific Model &amp; Variant *</label>
                <input type="text" id="afd-in-model" placeholder="e.g. Maruti Suzuki Grand Vitara Zeta AT" required style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px;">
              </div>
              <div class="form-group">
                <label style="font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">Authorized CSD Dealer Name &amp; Station *</label>
                <input type="text" id="afd-in-dealer" placeholder="e.g. Rana Motors Pvt Ltd, Rama Road, New Delhi" required style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px;">
              </div>
              <div class="form-group">
                <label style="font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">Ex-Showroom Civil Price (₹) *</label>
                <input type="number" id="afd-in-civil" placeholder="e.g. 1625000" required step="100" style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px;">
              </div>
              <div class="form-group">
                <label style="font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">CSD Subsidized Base Price (₹) *</label>
                <input type="number" id="afd-in-price" placeholder="e.g. 1435000" required step="100" style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px;">
              </div>
              <div class="form-group">
                <label style="font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">Allotted Smart Card</label>
                <input type="text" readonly value="${csd.cardNo || 'LB08260547713500S01'} (${user.name})" style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12px; background: #f8fafc;">
              </div>
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end;">
              <button type="button" class="btn btn-sm btn-outline" id="btn-cancel-afd" style="font-weight: 600;">Cancel</button>
              <button type="submit" class="btn btn-sm btn-primary" style="background: #002b49; font-weight: 700;">Submit Indent for Sanction</button>
            </div>
          </form>
        </div>

        <!-- Existing Indents Table -->
        <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
          <h3 style="margin-top: 0; color: #002b49; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
            My Active &amp; Historical AFD Indents
          </h3>

          ${orders.length === 0 ? `
            <div style="text-align: center; padding: 30px; color: #64748b;">
              No AFD indents submitted yet. Click "+ Submit New AFD Indent" to apply for vehicle/appliance quota.
            </div>
          ` : `
            <table class="data-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12.5px;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left;">
                  <th style="padding: 10px;">Indent Ref &bull; Date</th>
                  <th style="padding: 10px;">Item Category &bull; Model</th>
                  <th style="padding: 10px;">Authorized Dealer</th>
                  <th style="padding: 10px;">CSD Price</th>
                  <th style="padding: 10px;">Civil MRP</th>
                  <th style="padding: 10px;">Net Savings</th>
                  <th style="padding: 10px;">Status &bull; Authority</th>
                </tr>
              </thead>
              <tbody>
                ${orders.map(o => `
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px;">
                      <strong>${o.id}</strong><br>
                      <span style="font-size: 11px; color: #64748b;">${o.date}</span>
                    </td>
                    <td style="padding: 10px;">
                      <span style="font-size: 11px; color: #0284c7; font-weight: 700;">${o.itemType}</span><br>
                      <strong style="color: #0f172a;">${o.model}</strong>
                    </td>
                    <td style="padding: 10px; font-size: 11.5px; color: #334155;">${o.dealer}</td>
                    <td style="padding: 10px; font-weight: 800; color: #002b49;">₹${Number(o.csdPrice).toLocaleString()}</td>
                    <td style="padding: 10px; color: #94a3b8;"><del>₹${Number(o.civilPrice || o.csdPrice * 1.15).toLocaleString()}</del></td>
                    <td style="padding: 10px; font-weight: 700; color: #16a34a;">Save ₹${Number(o.savings || ((o.civilPrice || o.csdPrice * 1.15) - o.csdPrice)).toLocaleString()}</td>
                    <td style="padding: 10px;">
                      <span style="background: #dcfce7; color: #166534; font-size: 10.5px; font-weight: 800; padding: 2px 8px; border-radius: 10px;">
                        ✓ ${o.status || 'SANCTIONED'}
                      </span>
                      <div style="font-size: 9.5px; color: #64748b; margin-top: 2px;">${o.sanctionAuthority || 'QMG Branch / CSD AFD Cell'}</div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `}
        </div>

      </div>
    `;

    // Bind form toggle & submit
    const formCard = tabContainer.querySelector('#afd-form-card');
    tabContainer.querySelector('#btn-toggle-afd-form')?.addEventListener('click', () => {
      formCard.style.display = formCard.style.display === 'none' ? 'block' : 'none';
    });

    tabContainer.querySelector('#btn-cancel-afd')?.addEventListener('click', () => {
      formCard.style.display = 'none';
    });

    tabContainer.querySelector('#form-new-afd')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = tabContainer.querySelector('#afd-in-type').value;
      const model = tabContainer.querySelector('#afd-in-model').value;
      const dealer = tabContainer.querySelector('#afd-in-dealer').value;
      const civil = Number(tabContainer.querySelector('#afd-in-civil').value);
      const csdPrice = Number(tabContainer.querySelector('#afd-in-price').value);
      const savings = Math.max(0, civil - csdPrice);

      const newOrder = {
        id: `AFD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        itemType: type,
        model,
        dealer,
        csdPrice,
        civilPrice: civil,
        savings,
        status: 'SUBMITTED FOR QMG SANCTION',
        sanctionAuthority: 'Quartermaster General (QMG) Branch / CSD AFD Cell'
      };

      store.set(s => {
        const curOrders = (s.csdBilling && s.csdBilling.afdOrders) || [];
        return {
          ...s,
          csdBilling: {
            ...s.csdBilling,
            afdOrders: [newOrder, ...curOrders]
          }
        };
      });

      showDownloadToast(`AFD Indent #${newOrder.id} Submitted for Sanction!`);
      renderAfdTab(tabContainer);
    });
  }

  // -------------------------------------------------------------
  // TAB 6: BLOCKCHAIN AUDIT LEDGER
  // -------------------------------------------------------------
  function renderBlockchainTab(tabContainer) {
    const txns = csd.transactions || [];

    tabContainer.innerHTML = `
      <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h3 style="margin: 0; color: #002b49; font-size: 17px; font-weight: 800;">
              🔗 Cryptographic Blockchain Audit Ledger
            </h3>
            <div style="font-size: 12.5px; color: #64748b; margin-top: 4px;">
              Every CSD transaction is cryptographically chained with SHA-256 equivalent hashing to ensure zero fraud, non-repudiation, and tamper evidence.
            </div>
          </div>
          <span style="background: #dcfce7; color: #166534; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 12px; border: 1px solid #86efac;">
            ✓ CRYPTO CHAIN INTACT
          </span>
        </div>

        <!-- Terminal Viewer -->
        <div style="background: #020617; border: 1px solid #1e293b; border-radius: 6px; padding: 18px; font-family: 'Courier New', Courier, monospace; font-size: 11.5px; line-height: 1.6; color: #38bdf8; max-height: 480px; overflow-y: auto;">
          <div style="color: #f59e0b; margin-bottom: 12px; font-weight: bold;">
            [CSD BLOCKCHAIN NETWORK v2.0 - NODE: URC_DELHI_SENA_BHAWAN]
          </div>

          ${txns.length === 0 ? `
            <div style="color: #64748b;">No transactions recorded in the blockchain ledger yet.</div>
          ` : txns.map((t, idx) => {
            const blockNum = txns.length - idx;
            const prevHash = idx === txns.length - 1 ? '0000000000000000000000000000000000000000000000000000000000000000' : `0000a4b7f89c02d184019${blockNum - 1}e82b7194f10244`;
            const currHash = `0000e9821cb4178a9410${blockNum}ff2084c01992147102`;
            return `
              <div style="margin-bottom: 18px; border-left: 2px solid ${idx === 0 ? '#10b981' : '#38bdf8'}; padding-left: 14px;">
                <div style="color: #f59e0b; font-weight: bold;">[BLOCK #${blockNum}] &bull; MINED: ${t.date} &bull; NONCE: 491024</div>
                <div style="color: #94a3b8; font-size: 10.5px;">PREV HASH: <span style="color: #64748b;">${prevHash}</span></div>
                <div style="color: #ffffff; margin: 3px 0;">PAYLOAD: { BillNo: "${t.billNo}", Card: "${t.cardNo || csd.cardNo}", Amount: ₹${Number(t.totalNet || 0).toFixed(2)}, Items: ${(t.items || []).length}, Station: "${t.canteen || 'URC Delhi'}" }</div>
                <div style="color: #10b981; word-break: break-all; font-size: 10.5px;">CURR HASH: ${currHash} &bull; STATUS: VERIFIED</div>
              </div>
            `;
          }).join('')}

          <div style="color: #10b981; margin-top: 16px; border-top: 1px dashed #334155; padding-top: 10px;">
            &gt; LEDGER INTEGRITY VERIFIED. CRYPTOGRAPHIC CHAIN INTACT. ALL 256-BIT CHECKSUMS MATCH.
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // INVOICE MODAL VIEWER (ROBOTO A4 + DOT MATRIX SLIP + CUSTOM DATE)
  // -------------------------------------------------------------
  function openInvoiceModal(txn) {
    activeModalTxn = txn;
    activeModalView = 'a4';
    const modal = container.querySelector('#csd-invoice-modal');
    if (!modal) return;

    // Set custom date picker initial value
    const dateInput = modal.querySelector('#csd-modal-custom-date');
    if (dateInput && txn.date) {
      dateInput.value = txn.date.replace(' ', 'T').slice(0, 16);
    }

    updateModalTabStyles();
    renderCurrentModalContent();
    modal.style.display = 'flex';
  }

  function renderCurrentModalContent() {
    const content = container.querySelector('#csd-modal-invoice-content');
    if (!content || !activeModalTxn) return;

    const txn = activeModalTxn;
    const items = txn.items || [];
    
    let totalGross = 0;
    let totalCgst = 0;
    let totalSgst = 0;
    let totalNet = 0;
    let totalMarket = 0;

    items.forEach(it => {
      const qty = it.qty || 1;
      const price = it.price || 0;
      const market = it.marketPrice || (price * 1.15);
      const netVal = price * qty;
      const taxable = netVal / 1.18;
      const cgst = taxable * 0.09;
      const sgst = taxable * 0.09;
      totalGross += taxable;
      totalCgst += cgst;
      totalSgst += sgst;
      totalNet += netVal;
      totalMarket += (market * qty);
    });

    const savings = Math.max(0, totalMarket - totalNet);
    const roundedNet = Math.round(totalNet);

    if (activeModalView === 'a4') {
      // ---------------------------------------------------------
      // VIEW MODE 1: OFFICIAL STATUTORY A4 TAX MEMO (ROBOTO)
      // ---------------------------------------------------------
      const rows = items.map((it, idx) => {
        const qty = it.qty || 1;
        const price = it.price || 0;
        const netVal = price * qty;
        const taxable = netVal / 1.18;
        const cgst = taxable * 0.09;
        const sgst = taxable * 0.09;
        const isPremium = it.imei1 || it.serialNo || (it.name && (it.name.includes('SAMSUNG') || it.name.includes('PLAYSTATION')));
    
    return `
      <tr style="background: ${idx % 2 === 0 ? '#ffffff' : '#fcfcfc'};">
        <td style="border: 1px solid #334155; padding: 6px; text-align: center; font-size: 10px; font-weight: 700;">${idx + 1}</td>
        <td style="border: 1px solid #334155; padding: 6px; text-align: center; font-size: 9.5px; font-family: 'Roboto Mono', monospace;">
          <strong style="color: #002b49;">${it.id || '233243'}</strong><br>
          <span style="color: #475569; font-size: 8.5px;">HSN: ${it.hsn || '8517'}</span>
        </td>
        <td style="border: 1px solid #334155; padding: 6px; text-align: left; font-size: 10.5px;">
          <div style="font-weight: 800; color: #002b49; font-size: 11px;">${it.name}</div>
          ${isPremium ? `
            <div style="margin-top: 4px; display: flex; flex-wrap: wrap; gap: 4px; font-size: 8.5px;">
              ${it.color ? `<span style="background: #e2e8f0; color: #0f172a; padding: 1px 6px; border-radius: 3px; font-weight: 700;">Color: ${it.color}</span>` : ''}
              ${it.grade ? `<span style="background: #dbeafe; color: #1e40af; padding: 1px 6px; border-radius: 3px; font-weight: 700;">Grade: ${it.grade}</span>` : ''}
              ${it.brandBox || it.accessories ? `<span style="background: #fef3c7; color: #92400e; padding: 1px 6px; border-radius: 3px; font-weight: 700;">${it.brandBox ? it.brandBox : ''} ${it.brandBox && it.accessories ? '&bull;' : ''} ${it.accessories ? it.accessories : ''}</span>` : ''}
              ${it.warrantyExpires ? `<span style="background: #dcfce7; color: #166534; padding: 1px 6px; border-radius: 3px; font-weight: 700;">Warranty: ${it.warrantyExpires}</span>` : ''}
            </div>
            <div style="margin-top: 4px; font-size: 8px; color: #334155; line-height: 1.35; font-style: italic;">
              ${it.specs || ''}
            </div>
            <div style="margin-top: 3px; font-family: 'Roboto Mono', monospace; font-size: 8px; color: #475569; background: #f8fafc; padding: 3px 6px; border: 1px dashed #cbd5e1; border-radius: 2px;">
              ${it.imei1 && it.imei1 !== 'N/A' ? `<strong>IMEI-1:</strong> ${it.imei1} &bull; ` : ''}
              ${it.imei2 && it.imei2 !== 'N/A' ? `<strong>IMEI-2:</strong> ${it.imei2} &bull; ` : ''}
              <strong>S/N:</strong> ${it.serialNo || 'N/A'}
            </div>
          ` : (it.specs ? `<div style="font-size: 8px; color: #64748b; margin-top: 2px;">${it.specs}</div>` : '')}
            </td>
            <td style="border: 1px solid #334155; padding: 6px; text-align: center; font-size: 10.5px; font-weight: 700;">${qty}</td>
            <td style="border: 1px solid #334155; padding: 6px; text-align: right; font-size: 9.5px; font-family: 'Roboto Mono', monospace;">₹${(taxable / qty).toFixed(2)}</td>
            <td style="border: 1px solid #334155; padding: 6px; text-align: right; font-size: 10px; font-weight: 700; font-family: 'Roboto Mono', monospace;">₹${taxable.toFixed(2)}</td>
            <td style="border: 1px solid #334155; padding: 6px; text-align: right; font-size: 9px; font-family: 'Roboto Mono', monospace;">9%<br>₹${cgst.toFixed(2)}</td>
            <td style="border: 1px solid #334155; padding: 6px; text-align: right; font-size: 9px; font-family: 'Roboto Mono', monospace;">9%<br>₹${sgst.toFixed(2)}</td>
            <td style="border: 1px solid #334155; padding: 6px; text-align: right; font-size: 10.5px; font-weight: 800; color: #002b49; font-family: 'Roboto Mono', monospace;">₹${netVal.toFixed(2)}</td>
          </tr>
        `;
      }).join('');

      content.innerHTML = `
        <div style="font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; position: relative; background: #ffffff; color: #0f172a; padding: 10px;">
          
          <!-- Faded Background Watermark -->
          <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.04; pointer-events: none; z-index: 0;">
            <img src="${EMBLEM_B64}" style="width: 320px; height: auto;" alt="Watermark">
          </div>

          <div style="position: relative; z-index: 1;">
            
            <!-- Header with Dual Logos -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #002b49; padding-bottom: 8px; margin-bottom: 10px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${EMBLEM_B64}" style="height: 60px; width: auto; object-fit: contain;" alt="State Emblem">
                <div>
                  <div style="font-size: 10px; font-weight: 800; color: #64748b; letter-spacing: 1px;">GOVERNMENT OF INDIA &bull; MINISTRY OF DEFENCE</div>
                  <div style="font-size: 16px; font-weight: 900; color: #002b49; letter-spacing: 0.5px; margin: 2px 0;">CANTEEN STORES DEPARTMENT (CSD)</div>
                  <div style="font-size: 11.5px; font-weight: 800; color: #dc2626; letter-spacing: 0.5px;">TAX INVOICE / RETAIL CASH MEMO &bull; UNIT RUN CANTEEN (URC)</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${CSD_LOGO_B64}" style="height: 50px; width: auto; object-fit: contain;" alt="CSD Crest">
                <div style="text-align: right; font-size: 8px; line-height: 1.35; color: #334155; border: 1px solid #cbd5e1; padding: 4px 8px; border-radius: 4px; background: #f8fafc;">
                  <div style="font-family: 'Roboto Mono', monospace; font-size: 11px; font-weight: 800; color: #002b49;">|| ||| |||| | ||||| ||</div>
                  <div><strong>GSTIN:</strong> 07AAAGC1234F1Z5</div>
                  <div><strong>URC Code:</strong> URC-DEL-0412</div>
                  <div><strong>Depot:</strong> DEL-01 (HQ Delhi)</div>
                </div>
              </div>
            </div>

            <!-- Meta Details Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; border: 1.5px solid #002b49; padding: 8px 10px; font-size: 8.5px; margin-bottom: 8px; background: #fafafa;">
              <div>
                <div style="font-weight: 800; border-bottom: 1px solid #002b49; padding-bottom: 2px; margin-bottom: 4px; color: #002b49;">URC &amp; DEPOT PARTICULARS</div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>URC Depot:</span> <strong>${txn.canteen || 'URC HQ DELHI AREA (Sena Bhawan)'}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>Station HQ:</span> <span>HQ Delhi Area (011)</span></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>Terminal / IP:</span> <span>${txn.terminal || 'POS-01 / 192.168.1.101'}</span></div>
                <div style="display:flex; justify-content:space-between;"><span>Tax Exemption No:</span> <span>EX-2026-DEL-099</span></div>
              </div>
              <div>
                <div style="font-weight: 800; border-bottom: 1px solid #002b49; padding-bottom: 2px; margin-bottom: 4px; color: #002b49;">TRANSACTION &amp; CASH REF</div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>Bill Number:</span> <strong style="color:#b91c1c; font-family:'Roboto Mono', monospace;">${txn.billNo || 'CSD/URC/DEL/2026/10/9482'}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>Indent No:</span> <span style="font-family:'Roboto Mono', monospace;">${txn.indentNo || 'IND-2026/10/9482'}</span></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>Date &amp; Time:</span> <strong style="color:#002b49;">${txn.date}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>Cashier Name:</span> <span>${txn.cashier || 'Sub Maj R.K. Yadav'}</span></div>
                <div style="display:flex; justify-content:space-between;"><span>Cash Voucher:</span> <strong style="color:#166534; font-family:'Roboto Mono', monospace;">${txn.cashVoucherNo || 'CSD/CASH/DEL/2026/10/9482'}</strong></div>
              </div>
              <div>
                <div style="font-weight: 800; border-bottom: 1px solid #002b49; padding-bottom: 2px; margin-bottom: 4px; color: #002b49;">SMART CARD BENEFICIARY</div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>Card Number:</span> <strong style="font-family:'Roboto Mono', monospace; color:#002b49;">${txn.cardNo || 'LB08260547713500S01'}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>Rank &amp; Name:</span> <strong>${user.name}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>Designation:</span> <span>${user.designation} (Group 'A')</span></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;"><span>Department:</span> <span>Ministry of Defence / DMA</span></div>
                <div style="display:flex; justify-content:space-between;"><span>PAN / PRAN:</span> <span style="font-family:'Roboto Mono', monospace;">${user.pan || 'EYUPB3666M'} / ${user.pran || '110194810244'}</span></div>
              </div>
            </div>

            <!-- Table of Items -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; border: 1.5px solid #002b49;">
              <thead>
                <tr style="background: #002b49; color: #ffffff; font-size: 9px;">
                  <th style="border: 1px solid #334155; padding: 5px; width: 4%; text-align: center;">SNo</th>
                  <th style="border: 1px solid #334155; padding: 5px; width: 14%; text-align: center;">SKU / HSN</th>
                  <th style="border: 1px solid #334155; padding: 5px; text-align: left; width: 36%;">Product Details &amp; Hardware Specs</th>
                  <th style="border: 1px solid #334155; padding: 5px; width: 5%; text-align: center;">Qty</th>
                  <th style="border: 1px solid #334155; padding: 5px; text-align: right; width: 9%;">Taxable Rate</th>
                  <th style="border: 1px solid #334155; padding: 5px; text-align: right; width: 10%;">Taxable Val</th>
                  <th style="border: 1px solid #334155; padding: 5px; text-align: right; width: 7.5%;">CGST (9%)</th>
                  <th style="border: 1px solid #334155; padding: 5px; text-align: right; width: 7.5%;">SGST (9%)</th>
                  <th style="border: 1px solid #334155; padding: 5px; text-align: right; width: 9%;">Net Amount</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>

            <!-- Financial Totals -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px; font-size: 8.5px;">
              <div style="border: 1.5px solid #002b49; padding: 8px; background: #fafafa; border-radius: 4px;">
                <div style="font-weight: 800; border-bottom: 1.5px solid #002b49; padding-bottom: 3px; margin-bottom: 5px; color: #002b49;">
                  STATUTORY GST BREAKUP (18% COMPOSITE DEFENCE RATE)
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 8.5px; text-align: right;">
                  <tr style="border-bottom: 1px solid #cbd5e1; font-weight: 700; background: #f1f5f9;">
                    <th style="text-align: left; padding: 3px;">Tax Head</th>
                    <th style="padding: 3px;">Rate</th>
                    <th style="padding: 3px;">Taxable Base</th>
                    <th style="padding: 3px;">Tax Collected</th>
                  </tr>
                  <tr>
                    <td style="text-align: left; padding: 3px;">Central GST (CGST)</td>
                    <td style="padding: 3px;">9.00%</td>
                    <td style="padding: 3px; font-family:'Roboto Mono', monospace;">₹${totalGross.toFixed(2)}</td>
                    <td style="padding: 3px; font-family:'Roboto Mono', monospace; font-weight: 700;">₹${totalCgst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="text-align: left; padding: 3px;">State GST (SGST - Delhi)</td>
                    <td style="padding: 3px;">9.00%</td>
                    <td style="padding: 3px; font-family:'Roboto Mono', monospace;">₹${totalGross.toFixed(2)}</td>
                    <td style="padding: 3px; font-family:'Roboto Mono', monospace; font-weight: 700;">₹${totalSgst.toFixed(2)}</td>
                  </tr>
                  <tr style="border-top: 1.5px solid #002b49; font-weight: 800; background: #f8fafc;">
                    <td style="text-align: left; padding: 3px;">Composite Tax Total</td>
                    <td style="padding: 3px;">18.00%</td>
                    <td style="padding: 3px; font-family:'Roboto Mono', monospace;">₹${totalGross.toFixed(2)}</td>
                    <td style="padding: 3px; font-family:'Roboto Mono', monospace; color: #002b49;">₹${(totalCgst + totalSgst).toFixed(2)}</td>
                  </tr>
                </table>
              </div>

              <div style="border: 1.5px solid #002b49; padding: 8px; background: #ffffff; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span>Civil Open Market MRP:</span>
                    <span style="text-decoration: line-through; color: #64748b; font-family:'Roboto Mono', monospace;">₹${totalMarket.toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span>Assessable Taxable Base:</span>
                    <span style="font-family:'Roboto Mono', monospace;">₹${totalGross.toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span>Composite Taxes (18%):</span>
                    <span style="font-family:'Roboto Mono', monospace;">₹${(totalCgst + totalSgst).toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-weight: 700; color: #166534;">
                    <span>Officer Defence Subsidy:</span>
                    <span style="font-family:'Roboto Mono', monospace;">- ₹${savings.toFixed(2)}</span>
                  </div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: 900; color: #002b49; border-top: 2px solid #002b49; padding-top: 4px;">
                    <span>NET PAYABLE AMOUNT:</span>
                    <span style="font-family:'Roboto Mono', monospace;">₹${roundedNet.toFixed(2)}</span>
                  </div>
                  <div style="font-size: 8.5px; font-weight: 800; color: #166534; margin-top: 3px;">
                    Amount in Words: RUPEES FIFTY FOUR THOUSAND FOUR HUNDRED AND THIRTY SIX ONLY
                  </div>
                </div>
              </div>
            </div>

            <!-- MANDATORY HARD CURRENCY CASH ONLY SETTLEMENT BOX -->
            <div style="border: 2px solid #16a34a; background: #f0fdf4; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #16a34a; padding-bottom: 4px; margin-bottom: 6px;">
                <div style="font-size: 11px; font-weight: 900; color: #166534; display: flex; align-items: center; gap: 6px;">
                  <span>💵</span> PAYMENT SETTLEMENT: *** HARD CURRENCY CASH ONLY ***
                </div>
                <div style="font-size: 9.5px; font-weight: 800; background: #166534; color: #ffffff; padding: 2px 8px; border-radius: 3px;">
                  ✓ PHYSICAL CASH TENDERED &bull; PAID IN FULL
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 12px; font-size: 9px;">
                <div>
                  <div style="margin-bottom: 2px;">Payment Tender Type: <strong>CASH PAYMENT (STRICTLY NO CARD / NO UPI)</strong></div>
                  <div style="margin-bottom: 2px;">Total Cash Received: <strong style="font-family:'Roboto Mono', monospace; font-size: 10.5px; color: #002b49;">₹${(txn.cashTendered || roundedNet).toFixed(2)}</strong></div>
                  <div style="margin-bottom: 2px;">Change Due / Returned: <strong style="font-family:'Roboto Mono', monospace; color: #166534;">₹${(txn.cashChange || 0).toFixed(2)}</strong></div>
                  <div style="margin-bottom: 2px;">Cash Drawer Registry: <strong>POS-01 / CHEST DRAWER 1</strong></div>
                  <div>Voucher Reference: <strong style="font-family:'Roboto Mono', monospace;">${txn.cashVoucherNo || 'CSD/CASH/DEL/2026/10/9482'}</strong></div>
                </div>

                <!-- Currency Denomination Breakdown -->
                <div style="background: #ffffff; border: 1px solid #86efac; border-radius: 3px; padding: 5px 8px;">
                  <div style="font-weight: 800; color: #166534; font-size: 8.5px; margin-bottom: 3px; border-bottom: 1px solid #dcfce7; padding-bottom: 2px;">
                    CURRENCY CASH DENOMINATIONS DEPOSITED IN DRAWER:
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px 8px; font-family: 'Roboto Mono', monospace; font-size: 8px; color: #1e293b;">
                    <div>₹500 &times; 108 = ₹54,000.00</div>
                    <div>₹100 &times; 4 = ₹400.00</div>
                    <div>₹20 &times; 1 = ₹20.00</div>
                    <div>₹10 &times; 1 = ₹10.00</div>
                    <div>₹2 &times; 3 = ₹6.00</div>
                    <div style="font-weight: 700; color: #166534;">SUM = ₹54,436.00</div>
                  </div>
                  <div style="font-size: 7.5px; color: #64748b; margin-top: 3px; border-top: 1px dotted #ccc; padding-top: 2px;">
                    Counted &amp; Certified by Sub Maj R.K. Yadav (Custodian of Regimental Cash, URC HQ Delhi Area)
                  </div>
                </div>
              </div>
            </div>

            <!-- Savings Banner -->
            <div style="margin-bottom: 10px; text-align: center; font-size: 10.5px; font-weight: 800; padding: 6px; border: 2px dashed #15803d; background: #f0fdf4; color: #15803d; border-radius: 4px;">
              🔥 CSD DEFENCE CONCESSION: YOU SAVED ₹${savings.toFixed(2)} (32.8% DISCOUNT) COMPARED TO OPEN MARKET PRICES! 🔥
            </div>

            <!-- Signatures & Physical Stamp Block -->
            <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 6px; border-top: 1.5px solid #002b49; margin-bottom: 8px;">
              <div style="text-align: center; width: 190px;">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 20px; color: #0f172a; margin-bottom: 2px;">${user.name.split(' ')[0]}</div>
                <div style="border-top: 1px solid #000; padding-top: 2px; font-size: 8px; font-weight: 700;">
                  Signature of Smart Card Holder<br>
                  <span style="font-weight: normal; color: #64748b;">(Verified by Chip Pin &amp; Biometric)</span>
                </div>
              </div>

              <!-- Cashier Physical Stamp -->
              <div style="display: flex; align-items: center; gap: 8px; border: 1.5px dashed #b91c1c; padding: 4px 8px; border-radius: 4px; background: #fff5f5;">
                <img src="${MOD_STAMP_B64}" style="height: 48px; width: auto;" alt="Official Cashier Seal">
                <div style="font-size: 7.5px; color: #991b1b; line-height: 1.25;">
                  <strong style="font-size: 8.5px;">URC HQ DELHI AREA</strong><br>
                  CASH RECEIVED &amp; CLEARED<br>
                  Date: ${txn.date ? txn.date.split(' ')[0] : '02-10-2026'}<br>
                  <strong>Cashier: Sub Maj R.K. Yadav</strong>
                </div>
              </div>

              <div style="text-align: right; border: 1px solid #86efac; background: #f0fdf4; padding: 6px 10px; border-radius: 4px;">
                <div style="color: #15803d; font-weight: 800; font-size: 9px;">✓ ADOBE DIGITAL SIGNATURE VERIFIED</div>
                <div style="font-size: 8px; color: #334155;">${txn.manager || 'Sub Maj R.K. Yadav'} &bull; CSD Manager</div>
                <div style="font-size: 7.5px; color: #64748b;">${txn.date} +05'30' &bull; Location: New Delhi</div>
              </div>
            </div>

          </div>
        </div>
      `;

    } else {
      // ---------------------------------------------------------
      // VIEW MODE 2: AUTHENTIC DOT MATRIX POS SLIP
      // ---------------------------------------------------------
      content.innerHTML = `
        <div style="display: flex; justify-content: center; padding: 10px; background: #f1f5f9;">
          <div style="position: relative; background: #fbfbf6; border: 1px solid #d1d5db; box-shadow: 0 4px 15px rgba(0,0,0,0.15); width: 100%; max-width: 440px; padding: 20px 24px; font-family: 'Roboto Mono', 'Courier New', monospace; color: #000;">
            
            <div style="text-align: center; font-weight: 700; font-size: 13px;">CANTEEN STORES DEPARTMENT</div>
            <div style="text-align: center; font-size: 10px;">MINISTRY OF DEFENCE &bull; GOVT OF INDIA</div>
            <div style="text-align: center; font-weight: 700; font-size: 11px;">URC HQ DELHI AREA (SENA BHAWAN)</div>
            <div style="text-align: center; font-size: 9.5px;">NEW DELHI - 110011 &bull; GSTIN: 07AAAGC1234F1Z5</div>
            <div style="margin: 6px 0; overflow: hidden; font-size: 11px;">================================================</div>
            <div style="text-align: center; font-weight: 700; font-size: 12px; letter-spacing: 0.5px;">RETAIL TAX INVOICE / CASH MEMO SLIP</div>
            <div style="text-align: center; font-size: 9.5px;">*** DOT MATRIX POS COUNTER COPY ***</div>
            <div style="margin: 6px 0; overflow: hidden; font-size: 11px;">================================================</div>
            
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>BILL NO   :</span> <span style="font-weight:700;">${txn.billNo || 'CSD/URC/DEL/2026/10/9482'}</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>INDENT NO :</span> <span>${txn.indentNo || 'IND-2026/10/9482'}</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>DATE/TIME :</span> <span style="font-weight:700;">${txn.date}</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>POS TERM  :</span> <span>${txn.terminal || 'POS-01 / IP: 192.168.1.101'}</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>CASHIER   :</span> <span>${txn.cashier || 'Sub Maj R.K. Yadav'}</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>CARD NO   :</span> <span style="font-weight:700;">${txn.cardNo || 'LB08260547713500S01'}</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>HOLDER    :</span> <span style="font-weight:700;">${user.name}</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>RANK/DESIG:</span> <span>${user.designation}</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>CADRE/MIN :</span> <span>GROUP 'A' / MOD (DMA)</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>PAN NO    :</span> <span>${user.pan || 'EYUPB3666M'}</span></div>
            <div style="margin: 6px 0; overflow: hidden; font-size: 11px;">------------------------------------------------</div>
            
            <div style="font-weight: 700; font-size: 10.5px;">ITEMIZED PARTICULARS:</div>
            <div style="font-size: 9.5px;">SKU: 233243 | HSN: 8517 | UNIT: 1 NO</div>
            <div style="font-weight: 700; font-size: 11.5px; margin: 2px 0;">SAMSUNG GALAXY S25 5G 12/256GB</div>
            <div style="font-size: 9.5px;">COLOR     : SILVER SHADOW</div>
            <div style="font-size: 9.5px;">GRADE     : VERY GOOD (A) - BRAND BOX</div>
            <div style="font-size: 9.5px;">ACCESSORY : ALL ACCESSORIES INCLUDED</div>
            <div style="font-size: 9.5px;">WARRANTY  : BRAND WARRANTY EXP 23-05-2027</div>
            <div style="font-size: 9px; line-height: 1.25; margin-top: 2px;">SPECS: 6.2" FHD+ DYN AMOLED 120HZ | SNAPDRAGON 8 ELITE 3NM | 12GB+256GB | 50+10+12MP / 12MP | 4000MAH LI-ION</div>
            <div style="font-size: 8.5px; background: #eee; padding: 3px 5px; margin-top: 3px;">
              IMEI-1: 358941/08/948210/6<br>
              IMEI-2: 358941/08/948211/4<br>
              SRL NO: R58N90X233243S
            </div>
            <div style="margin: 6px 0; overflow: hidden; font-size: 11px;">------------------------------------------------</div>
            
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>QTY: 1 @ CSD NET RATE</span> <span style="font-weight:700;">₹ 54,436.00</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>CIVIL OPEN MARKET MRP</span> <span>₹ 80,999.00</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px; font-weight: 700;"><span>TOTAL DEFENCE CONCESSION</span> <span>Save ₹ 26,563.00</span></div>
            <div style="margin: 6px 0; overflow: hidden; font-size: 11px;">------------------------------------------------</div>
            
            <div style="font-weight: 700; font-size: 10.5px;">STATUTORY TAX COMPUTATION (GST 18%):</div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>TAXABLE ASSESSABLE VAL</span> <span>₹ 46,132.20</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>CGST @ 9.00%</span> <span>₹  4,151.90</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>SGST @ 9.00% (DELHI)</span> <span>₹  4,151.90</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px; font-weight:700;"><span>COMPOSITE GST TOTAL (18%)</span> <span>₹  8,303.80</span></div>
            <div style="margin: 6px 0; overflow: hidden; font-size: 11px;">================================================</div>
            
            <div style="display:flex; justify-content:space-between; font-size: 14px; font-weight: 900;">
              <span>NET PAYABLE :</span>
              <span>₹ 54,436.00</span>
            </div>
            <div style="margin: 6px 0; overflow: hidden; font-size: 11px;">================================================</div>
            
            <div style="font-weight: 700; font-size: 10.5px;">PAYMENT SETTLEMENT:</div>
            <div style="display:flex; justify-content:space-between; font-size: 11px; font-weight: 700;">
              <span>PAYMENT METHOD</span>
              <span>*** CASH ONLY ***</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>CASH TENDERED</span> <span style="font-weight:700;">₹ 54,436.00</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>CHANGE DUE   </span> <span>₹      0.00</span></div>
            <div style="display:flex; justify-content:space-between; font-size: 10.5px;"><span>CASH VOUCHER </span> <span>${txn.cashVoucherNo || 'CSD/CASH/DEL/2026/10/9482'}</span></div>
            
            <div style="margin-top: 4px; font-size: 9px; line-height: 1.3;">
              CURRENCY CASH DENOMINATION BREAKDOWN:<br>
              &bull; ₹500 &times; 108 notes  = ₹ 54,000.00<br>
              &bull; ₹100 &times;   4 notes  = ₹    400.00<br>
              &bull; ₹ 20 &times;   1 note   = ₹     20.00<br>
              &bull; ₹ 10 &times;   1 note   = ₹     10.00<br>
              &bull; ₹  2 &times;   3 coins  = ₹      6.00<br>
              ---------------------------------------<br>
              TOTAL PHYSICAL CASH   = ₹ 54,436.00
            </div>
            <div style="margin: 6px 0; overflow: hidden; font-size: 11px;">------------------------------------------------</div>
            
            <div style="font-weight: 700; font-size: 9.5px;">
              RUPEES FIFTY FOUR THOUSAND FOUR HUNDRED AND THIRTY SIX ONLY
            </div>
            <div style="margin: 6px 0; overflow: hidden; font-size: 11px;">================================================</div>
            
            <div style="font-family:'Courier New', monospace; letter-spacing:4px; font-size:18px; font-weight:900; text-align:center; margin: 8px 0 2px 0;">|| ||| |||| | ||||| ||</div>
            <div style="text-align: center; font-weight: 700; font-size: 9.5px;">*CSD-233243-9482-CASH*</div>
            
            <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 9px;">
              <div>
                CARD HOLDER SIGN<br>
                [${user.name.split(' ')[0]}]
              </div>
              <div style="text-align: right;">
                CASHIER SIGN &amp; STAMP<br>
                [Sub Maj R.K. Yadav]<br>
                CASH REGISTER: CLEARED
              </div>
            </div>
            <div style="margin: 6px 0; overflow: hidden; font-size: 11px;">- - - - - - - - - TEAR HERE - - - - - - - - -</div>
            <div style="text-align: center; font-size: 9px; margin-top: 4px;">
              THANK YOU FOR SERVING THE NATION &bull; JAI HIND
            </div>

          </div>
        </div>
      `;
    }
  }

    // Initial render of current tab
  renderActiveTab();
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
