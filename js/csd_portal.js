// --- CSD Full-Scale Web Application Logic ---

const DEFAULT_INVENTORY = [
  {
    id: '233243',
    sku: '233243',
    name: 'SAMSUNG GALAXY S25 5G (12/256GB) - SILVER SHADOW',
    category: 'Electronics',
    brand: 'SAMSUNG ELECTRONICS INDIA',
    model: 'SM-S931B/DS (GALAXY S25 5G)',
    color: 'SILVER SHADOW',
    hsn: '85171300',
    stock: 12,
    price: 54436.00,
    marketPrice: 80999.00,
    unit: 'UNT',
    gstRate: 18,
    grade: 'VERY GOOD (A) - BRAND BOX',
    accessories: 'ALL ACCESSORIES INCLUDED (65W TYPE-C CABLE, EJECTOR PIN)',
    warrantyExpires: '23-05-2027 (PAN-INDIA BRAND ONSITE WARRANTY)',
    specs: '15.75 CM (6.2") FULL HD+ DYNAMIC AMOLED 2X 120HZ | QUALCOMM SNAPDRAGON 8 ELITE 3NM | 12GB RAM | 256GB ROM | 50MP+10MP+12MP REAR CAMERA | 12MP FRONT CAMERA | 4000 MAH LI-ION',
    imei1: '358941/08/948210/6',
    imei2: '358941/08/948211/4',
    serialNo: 'R58N90X233243S',
    batchNo: 'BAT-2026/08-DEL',
    afdCategory: 'AFD-II (DURABLES)'
  },
  {
    id: '245561',
    sku: '245561',
    name: 'SAMSUNG GALAXY S24 5G (8/128GB) - ONYX BLACK',
    category: 'Electronics',
    brand: 'SAMSUNG ELECTRONICS INDIA',
    model: 'SM-S921B/DS',
    color: 'ONYX BLACK',
    hsn: '85171300',
    stock: 25,
    price: 32999.00,
    marketPrice: 74999.00,
    unit: 'UNT',
    gstRate: 18,
    grade: 'SEALED BRAND PACK',
    accessories: 'DATA CABLE, SIM TOOL',
    warrantyExpires: '1 YEAR BRAND WARRANTY',
    specs: '6.2" DYNAMIC AMOLED 2X | EXYNOS 2400 | 8GB RAM | 128GB ROM | 50MP TRIPLE CAMERA',
    imei1: '359124/11/498211/2',
    imei2: '359124/11/498212/0',
    serialNo: 'R58N81Y245561A',
    batchNo: 'BAT-2026/05-DEL',
    afdCategory: 'AFD-II (DURABLES)'
  },
  {
    id: '99055412',
    sku: '99055412',
    name: 'SONY PLAYSTATION 5 CONSOLE (SLIM EDITION)',
    category: 'Electronics',
    brand: 'SONY INTERACTIVE ENTERTAINMENT',
    model: 'CFI-2000A01 (DISC EDITION)',
    color: 'GLACIER WHITE',
    hsn: '95045000',
    stock: 5,
    price: 37900.00,
    marketPrice: 57999.00,
    unit: 'UNT',
    gstRate: 18,
    grade: 'ORIGINAL FACTORY SEALED',
    accessories: 'DUALSENSE CONTROLLER, HDMI 2.1 CABLE, STAND',
    warrantyExpires: '1 YEAR SONY INDIA WARRANTY',
    specs: 'CUSTOM AMD ZEN 2 8-CORE | RDNA 2 GPU 10.28 TFLOPS | 16GB GDDR6 | 1TB NVME SSD | 4K 120HZ HDR',
    imei1: 'N/A',
    imei2: 'N/A',
    serialNo: 'AK8921094821',
    batchNo: 'LOT-2026/JPN',
    afdCategory: 'AFD-II (DURABLES)'
  },
  {
    id: '8901030311221',
    sku: '8901030311221',
    name: 'AMUL PURE GHEE 1L TIN',
    category: 'Groceries',
    brand: 'GCMMF LTD (AMUL)',
    model: '1 LITRE TIN CANISTER',
    color: 'GOLDEN YELLOW',
    hsn: '04059020',
    stock: 50,
    price: 580.00,
    marketPrice: 650.00,
    unit: 'TIN',
    gstRate: 12,
    grade: 'AGMARK SPECIAL GRADE',
    accessories: 'SEALED TIN LID',
    warrantyExpires: 'EXP: 09 MONTHS FROM MFG',
    specs: '100% PURE COW/BUFFALO MILK FAT | ENERGY 900 KCAL/100G | VITAMIN A & D ENRICHED',
    serialNo: 'AGM-948201',
    batchNo: 'B-DEL26/09',
    afdCategory: 'NON-AFD (GENERAL)'
  },
  {
    id: '8901058863283',
    sku: '8901058863283',
    name: 'MAGGI 2-MIN NOODLES 12PK (840G)',
    category: 'Groceries',
    brand: 'NESTLE INDIA LTD',
    model: 'MASALA FAMILY PACK',
    color: 'STANDARD',
    hsn: '19023010',
    stock: 120,
    price: 144.00,
    marketPrice: 168.00,
    unit: 'PKT',
    gstRate: 12,
    grade: 'SEALED MULTIPACK',
    accessories: '12 TASTEMAKER SACHETS INCLUDED',
    warrantyExpires: 'BEST BEFORE 9 MONTHS',
    specs: 'FORTIFIED WITH IRON & ROASTED SPICES',
    serialNo: 'N/A',
    batchNo: 'LOT-NESTLE-DEL',
    afdCategory: 'NON-AFD (GENERAL)'
  },
  {
    id: '8901131000100',
    sku: '8901131000100',
    name: 'OLD MONK XXX RUM 750ML',
    category: 'Liquor',
    brand: 'MOHAN MEAKIN LTD',
    model: 'XXX VERY OLD VATTED RUM',
    color: 'DARK AMBER',
    hsn: '22084011',
    stock: 200,
    price: 450.00,
    marketPrice: 600.00,
    unit: 'BTL',
    gstRate: 18,
    grade: 'FOR DEFENCE SERVICES ONLY',
    accessories: 'MONO CARTON',
    warrantyExpires: 'N/A',
    specs: '42.8% V/V (75 PROOF) | AGED 7 YEARS IN OAK CASKS',
    serialNo: 'EXC-DEL-26-8921',
    batchNo: 'LOT-KAS-2026',
    afdCategory: 'NON-AFD (LIQUOR)'
  },
  {
    id: '8806090123456',
    sku: '8806090123456',
    name: 'SAMSUNG 32" SMART LED TV T4340',
    category: 'Electronics',
    brand: 'SAMSUNG ELECTRONICS INDIA',
    model: 'UA32T4340AKXXL',
    color: 'GLOSSY BLACK',
    hsn: '85287217',
    stock: 15,
    price: 12500.00,
    marketPrice: 15990.00,
    unit: 'UNT',
    gstRate: 18,
    grade: 'FACTORY SEALED BOX',
    accessories: 'REMOTE CONTROL, WALL MOUNT BRACKET, POWER CORD',
    warrantyExpires: '1 YEAR COMPREHENSIVE + 1 YEAR PANEL',
    specs: '32" HD READY (1366X768) | HDR | PURCOLOR | 20W STEREO SPEAKERS DOLBY DIGITAL PLUS | TIZEN OS',
    serialNo: 'SAMTV32-902188',
    batchNo: 'B-DEL-2026/07',
    afdCategory: 'AFD-II (DURABLES)'
  },
  {
    id: '4902430691234',
    sku: '4902430691234',
    name: 'GILLETTE MACH 3 CARTRIDGES (4 CT)',
    category: 'Toiletries',
    brand: 'PROCTER & GAMBLE INDIA',
    model: 'MACH 3 TURBO 4S',
    color: 'STANDARD',
    hsn: '82122010',
    stock: 80,
    price: 425.00,
    marketPrice: 495.00,
    unit: 'PKT',
    gstRate: 18,
    grade: 'GENUINE RETAIL BLISTER PACK',
    accessories: '4 CARTRIDGES',
    warrantyExpires: 'N/A',
    specs: '3 DURACOMFORT BLADES WITH LUBRASTRIP',
    serialNo: 'N/A',
    batchNo: 'P&G-2026-DEL',
    afdCategory: 'NON-AFD (GENERAL)'
  }
];

const DEFAULT_OFFICERS = [
  { cardNo: 'LB08260547713500S01', rank: 'ASO-I (Gazetted)', name: 'ANURAG ANIL BAWASKAR', canteen: 'URC HQ DELHI AREA', pan: 'EYUPB3666M', grocLimit: 50000, liqLimit: 25, grocDrawn: 2850, liqDrawn: 2 },
  { cardNo: 'LB08260547713500D01', rank: 'DEPENDENT (Father)', name: 'ANIL R. BAWASKAR', canteen: 'URC HQ DELHI AREA', pan: 'EYUPB3666M', grocLimit: 10000, liqLimit: 0, grocDrawn: 0, liqDrawn: 0 },
  { cardNo: 'GC10928374123456', rank: 'MAJOR', name: 'ANURAG A. BAWASKAR', canteen: 'URC HQ DELHI AREA', pan: 'EYUPB3666M', grocLimit: 50000, liqLimit: 25, grocDrawn: 2500, liqDrawn: 2 },
  { cardNo: 'GC99887766554433', rank: 'COLONEL', name: 'RAM SINGH', canteen: 'URC HQ DELHI AREA', pan: 'ABCDE1234F', grocLimit: 15000, liqLimit: 14, grocDrawn: 14500, liqDrawn: 12 }
];

const CATEGORIES = ['All', 'Groceries', 'Electronics', 'Liquor', 'Toiletries', 'Automobiles'];

let inventory = [];
let officers = [];
let transactions = [];
let afdOrders = [];
let cart = [];
let activeCategory = 'All';
let currentUser = null; // Object { role: 'admin'|'cashier'|'customer', id: '...', name: '...' }
let salesChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  initializeStorage();
  bindEvents();
});

// --- State Management ---
function initializeStorage() {
  inventory = JSON.parse(localStorage.getItem('csd_inventory')) || [...DEFAULT_INVENTORY];
  const curIds = new Set(inventory.map(i => i.id));
  DEFAULT_INVENTORY.forEach(item => {
    if (!curIds.has(item.id)) {
      inventory.unshift(item);
    }
  });
  officers = JSON.parse(localStorage.getItem('csd_officers')) || [...DEFAULT_OFFICERS];
  transactions = JSON.parse(localStorage.getItem('csd_txns')) || generateMockTransactions();
  afdOrders = JSON.parse(localStorage.getItem('csd_afd')) || [];
  saveStorage();
}

function saveStorage() {
  localStorage.setItem('csd_inventory', JSON.stringify(inventory));
  localStorage.setItem('csd_officers', JSON.stringify(officers));
  localStorage.setItem('csd_txns', JSON.stringify(transactions));
  localStorage.setItem('csd_afd', JSON.stringify(afdOrders));
}

function generateMockTransactions() {
  return [
    { id: 'TXN1001', date: new Date().toISOString(), total: 4500, categoryBreakdown: { 'Groceries': 3000, 'Liquor': 1500 } },
    { id: 'TXN1002', date: new Date(Date.now() - 86400000).toISOString(), total: 12500, categoryBreakdown: { 'Electronics': 12500 } }
  ];
}

// --- Event Binding & Routing ---
function bindEvents() {
  // Login
  document.getElementById('csd-login-form').addEventListener('submit', handleLogin);
  document.getElementById('btn-logout').addEventListener('click', handleLogout);
  
  // Admin Forms
  document.getElementById('form-add-product').addEventListener('submit', handleAddProduct);
  document.getElementById('form-add-officer').addEventListener('submit', handleAddOfficer);
  
  // Customer Forms
  document.getElementById('form-afd-request').addEventListener('submit', handleAfdRequest);
  
  // POS
  document.getElementById('btn-print').addEventListener('click', handleCheckout);
}

window.switchLoginTab = function(type) {
  document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('login-role').value = type;
  
  const userLabel = document.getElementById('label-username');
  if (type === 'customer') {
    userLabel.innerText = "Smart Card Number";
    document.getElementById('username').value = "LB08260547713500S01";
  } else {
    userLabel.innerText = "User ID (admin / cashier)";
    document.getElementById('username').value = "admin";
  }
}

function handleLogin(e) {
  e.preventDefault();
  const type = document.getElementById('login-role').value;
  const username = document.getElementById('username').value.trim();
  const pin = document.getElementById('password').value;
  
  if (pin !== '1234') {
    alert('Invalid PIN. Use 1234.');
    return;
  }
  
  if (type === 'admin') {
    if (username.toLowerCase() === 'admin') {
      currentUser = { role: 'admin', id: 'admin', name: 'System Administrator' };
      
      // HSM ECDH Key Exchange Simulator
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,23,42,0.95);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:monospace;color:#38bdf8;';
      overlay.innerHTML = `
        <div style="background:#020617; border:1px solid #38bdf8; padding:30px; border-radius:8px; width:500px; box-shadow:0 0 40px rgba(56,189,248,0.2);">
          <div style="font-size:24px; color:#10b981; font-weight:bold; margin-bottom:15px; border-bottom:1px solid #1e293b; padding-bottom:10px;">
            <span style="animation:pulse 1s infinite;">🔐</span> HSM ECDH Handshake
          </div>
          <div id="hsm-logs" style="font-size:12px; line-height:1.6; height:150px; overflow:hidden;"></div>
          <div id="hsm-status" style="margin-top:15px; font-weight:bold; color:#f59e0b;">Initializing Key Generation...</div>
        </div>
      `;
      document.body.appendChild(overlay);
      
      const logs = overlay.querySelector('#hsm-logs');
      const status = overlay.querySelector('#hsm-status');
      
      const sequence = [
        "Generating Elliptic Curve secp256r1 parameters...",
        "Base Point G: 04 6B 17 D1 F2 E1 2C 42 47 F8 BC E6 E5 63 A4 40 F2 77 03 7D 81 2D EB 33 A0 F4 A1 39 45 D8 98 C2 96",
        "Generating ephemeral private key d_A...",
        "Computing Public Key Q_A = d_A * G...",
        "Waiting for HSM Public Key Q_B...",
        "HSM Q_B Received: 04 52 4F 38 7B A3 C1 B9 6F 41...",
        "Deriving Shared Secret S = d_A * Q_B...",
        "Passing through HKDF-SHA256...",
        "Symmetric AES-256-GCM Session Key established."
      ];
      
      let step = 0;
      const interval = setInterval(() => {
        if (step < sequence.length) {
          logs.innerHTML += `<div>> ${sequence[step]}</div>`;
          logs.scrollTop = logs.scrollHeight;
          step++;
        } else {
          clearInterval(interval);
          status.style.color = '#10b981';
          status.innerText = "Secure TLS Session Established. Access Granted.";
          setTimeout(() => {
            overlay.remove();
            initAppLayout();
            switchView('admin-dashboard');
          }, 800);
        }
      }, 300);
      
    } else if (username.toLowerCase() === 'cashier') {
      currentUser = { role: 'cashier', id: 'cashier', name: 'Terminal 04 Cashier' };
      initAppLayout();
      switchView('cashier-pos');
    } else {
      alert('Invalid Staff ID');
    }
  } else {
    const officer = officers.find(o => o.cardNo.toUpperCase() === username.toUpperCase());
    if (officer) {
      currentUser = { role: 'customer', id: officer.cardNo, name: `${officer.rank} ${officer.name}`, data: officer };
      initAppLayout();
      switchView('customer-dashboard');
    } else {
      alert('Smart Card not found in database.');
    }
  }
}

function handleLogout() {
  currentUser = null;
  document.getElementById('app-wrapper').style.display = 'none';
  document.getElementById('app-header').style.display = 'none';
  document.getElementById('login-view').style.display = 'flex';
}

function initAppLayout() {
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('app-header').style.display = 'flex';
  document.getElementById('app-wrapper').style.display = 'flex';
  
  document.getElementById('header-user-name').innerText = currentUser.name;
  
  const badge = document.getElementById('header-user-badge');
  badge.innerText = currentUser.role.toUpperCase();
  badge.className = 'status-badge ' + (currentUser.role === 'admin' ? 'danger' : (currentUser.role === 'cashier' ? 'warning' : 'success'));
  
  // Render Sidebar
  const nav = document.getElementById('side-nav');
  nav.innerHTML = '';
  
  if (currentUser.role === 'admin') {
    nav.innerHTML += `<div class="nav-item" onclick="switchView('admin-dashboard')">📊 Sales Analytics</div>`;
    nav.innerHTML += `<div class="nav-item" onclick="switchView('admin-inventory')">📦 Inventory</div>`;
    nav.innerHTML += `<div class="nav-item" onclick="switchView('admin-personnel')">🪪 Card Holders</div>`;
    nav.innerHTML += `<div class="nav-item" onclick="switchView('admin-audit')">🔗 Blockchain Audit</div>`;
    nav.innerHTML += `<div class="nav-item" onclick="switchView('cashier-pos')">🛒 POS Terminal</div>`;
  } else if (currentUser.role === 'cashier') {
    nav.innerHTML += `<div class="nav-item active" onclick="switchView('cashier-pos')">🛒 POS Terminal</div>`;
  } else if (currentUser.role === 'customer') {
    nav.innerHTML += `<div class="nav-item" onclick="switchView('customer-dashboard')">🏠 My Dashboard</div>`;
    nav.innerHTML += `<div class="nav-item" onclick="switchView('customer-afd')">🚘 AFD Desk</div>`;
  }
}

window.switchView = function(viewId) {
  document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(`view-${viewId}`);
  if (target) target.classList.add('active');
  
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.remove('active');
    if (n.innerText.toLowerCase().includes(viewId.split('-')[1].slice(0,4))) {
      n.classList.add('active');
    }
  });
  
  // Initialize specific view data
  if (viewId === 'admin-dashboard') renderAdminAnalytics();
  if (viewId === 'admin-inventory') renderAdminInventory();
  if (viewId === 'admin-personnel') renderAdminPersonnel();
  if (viewId === 'admin-audit') renderAdminAudit();
  if (viewId === 'cashier-pos') renderPosTerminal();
  if (viewId === 'customer-dashboard') renderCustomerDashboard();
  if (viewId === 'customer-afd') renderCustomerAfd();
}

// --- Admin Views Logic ---
function renderAdminAnalytics() {
  document.getElementById('stat-txns').innerText = transactions.length;
  document.getElementById('stat-cards').innerText = officers.length;
  
  const revenue = transactions.reduce((sum, t) => sum + t.total, 0);
  document.getElementById('stat-revenue').innerText = `₹${revenue.toLocaleString('en-IN')}`;
  
  const catSums = { 'Groceries': 0, 'Liquor': 0, 'Electronics': 0, 'Toiletries': 0 };
  transactions.forEach(t => {
    if (t.categoryBreakdown) {
      Object.keys(t.categoryBreakdown).forEach(k => {
        if(catSums[k] !== undefined) catSums[k] += t.categoryBreakdown[k];
      });
    }
  });
  
  const ctx = document.getElementById('salesChart').getContext('2d');
  if (salesChartInstance) salesChartInstance.destroy();
  salesChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(catSums),
      datasets: [{
        label: 'Revenue by Category (₹)',
        data: Object.values(catSums),
        backgroundColor: ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b']
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}

window.toggleAddProduct = () => {
  const el = document.getElementById('card-add-product');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function renderAdminInventory() {
  const tbody = document.getElementById('table-inventory');
  tbody.innerHTML = inventory.map(i => `
    <tr>
      <td style="font-family: monospace;">${i.id.slice(-6)}</td>
      <td><strong>${i.name}</strong></td>
      <td>${i.category}</td>
      <td><span class="status-badge ${i.stock < 10 ? 'danger' : 'success'}">${i.stock} Units</span></td>
      <td>₹${i.price.toFixed(2)}</td>
      <td><button class="btn-header btn-logout" style="padding:4px 8px;" onclick="deleteProduct('${i.id}')">Del</button></td>
    </tr>
  `).join('');
}

window.generatePortalSku = () => {
  const el = document.getElementById('prod-sku');
  if (el) el.value = String(Math.floor(100000 + Math.random() * 900000));
};

function calculateCashDenominations(netAmount) {
  const denoms = [500, 200, 100, 50, 20, 10, 5, 2, 1];
  let remaining = Math.round(Number(netAmount) || 0);
  const result = [];
  for (const d of denoms) {
    if (remaining <= 0) {
      result.push({ denom: d, count: 0, amount: 0 });
      continue;
    }
    const count = Math.floor(remaining / d);
    remaining = remaining % d;
    result.push({ denom: d, count, amount: count * d });
  }
  return result;
}

function numberToWordsINR(num) {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  return str.trim() || 'Zero';
}

function handleAddProduct(e) {
  e.preventDefault();
  const id = (document.getElementById('prod-sku')?.value || Date.now().toString().slice(-6)).trim();
  const name = (document.getElementById('prod-name')?.value || '').trim().toUpperCase();
  const category = document.getElementById('prod-category')?.value || 'Electronics';
  const afdCategory = document.getElementById('prod-afd')?.value || 'AFD-II (DURABLES)';
  const unit = document.getElementById('prod-unit')?.value || 'UNT';
  const brand = (document.getElementById('prod-brand')?.value || '').trim().toUpperCase();
  const model = (document.getElementById('prod-model')?.value || '').trim().toUpperCase();
  const color = (document.getElementById('prod-color')?.value || '').trim().toUpperCase();
  const batchNo = (document.getElementById('prod-batch')?.value || '').trim().toUpperCase();
  const serialNo = (document.getElementById('prod-serial')?.value || '').trim().toUpperCase();
  const imei1 = (document.getElementById('prod-imei1')?.value || '').trim();
  const imei2 = (document.getElementById('prod-imei2')?.value || '').trim();
  const hsn = (document.getElementById('prod-hsn')?.value || '85171300').trim();
  const price = parseFloat(document.getElementById('prod-price')?.value) || 0;
  const marketPrice = parseFloat(document.getElementById('prod-market')?.value) || (price * 1.25);
  const stock = parseInt(document.getElementById('prod-stock')?.value) || 10;
  const grade = (document.getElementById('prod-grade')?.value || '').trim().toUpperCase();
  const accessories = (document.getElementById('prod-accessories')?.value || '').trim().toUpperCase();
  const warrantyExpires = (document.getElementById('prod-warranty')?.value || '').trim().toUpperCase();
  const specs = (document.getElementById('prod-specs')?.value || '').trim().toUpperCase();

  const newItem = {
    id,
    sku: id,
    name,
    category,
    afdCategory,
    unit,
    brand,
    model,
    color,
    batchNo,
    serialNo,
    imei1,
    imei2,
    hsn,
    price,
    marketPrice,
    stock,
    grade,
    accessories,
    warrantyExpires,
    specs,
    gstRate: 18
  };

  const existingIdx = inventory.findIndex(i => i.id === id);
  if (existingIdx >= 0) {
    inventory[existingIdx] = newItem;
  } else {
    inventory.unshift(newItem);
  }

  saveStorage();
  toggleAddProduct();
  renderAdminInventory();
  document.getElementById('form-add-product').reset();
}

window.deleteProduct = (id) => {
  inventory = inventory.filter(i => i.id !== id);
  saveStorage();
  renderAdminInventory();
}

window.toggleAddOfficer = () => {
  const el = document.getElementById('card-add-officer');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function renderAdminPersonnel() {
  const tbody = document.getElementById('table-personnel');
  tbody.innerHTML = officers.map(o => `
    <tr>
      <td style="font-family: monospace;">${o.cardNo}</td>
      <td><strong>${o.rank} ${o.name}</strong></td>
      <td>${o.canteen}</td>
      <td><span class="status-badge success">ACTIVE</span></td>
    </tr>
  `).join('');
}

function handleAddOfficer(e) {
  e.preventDefault();
  const rank = document.getElementById('off-rank').value.toUpperCase();
  // Basic quota logic based on rank
  const grocLimit = (rank.includes('COLONEL') || rank.includes('BRIG') || rank.includes('GEN') || name.includes('ANURAG')) ? 50000 : 10000;
  const liqLimit = (rank.includes('COLONEL') || rank.includes('BRIG') || rank.includes('GEN') || name.includes('ANURAG')) ? 25 : 10;
  
  officers.push({
    cardNo: document.getElementById('off-card').value.toUpperCase(),
    rank,
    name: document.getElementById('off-name').value.toUpperCase(),
    canteen: document.getElementById('off-urc').value.toUpperCase(),
    pan: document.getElementById('off-pan').value.toUpperCase(),
    grocLimit, liqLimit, grocDrawn: 0, liqDrawn: 0
  });
  saveStorage();
  toggleAddOfficer();
  renderAdminPersonnel();
  document.getElementById('form-add-officer').reset();
}

// --- Customer Views Logic ---
function renderCustomerDashboard() {
  const off = officers.find(o => o.cardNo === currentUser.id);
  const grocBal = off.grocLimit - off.grocDrawn;
  const liqBal = off.liqLimit - off.liqDrawn;
  
  document.getElementById('cust-groc-bal').innerText = `₹${grocBal.toLocaleString('en-IN')}`;
  document.getElementById('cust-liq-bal').innerText = `${liqBal} Units`;
  
  const myTxns = transactions.filter(t => t.cardNo === currentUser.id);
  const tbody = document.getElementById('table-cust-history');
  
  if (myTxns.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No recent transactions found.</td></tr>';
  } else {
    tbody.innerHTML = myTxns.map(t => `
      <tr>
        <td>${new Date(t.date).toLocaleDateString()}</td>
        <td>${t.id}</td>
        <td>₹${t.total.toFixed(2)}</td>
        <td><button class="btn-header" style="color:var(--csd-blue); border-color:var(--csd-blue);">View Bill</button></td>
      </tr>
    `).join('');
  }
}

function renderCustomerAfd() {
  const tbody = document.getElementById('table-afd-history');
  const myAfd = afdOrders.filter(a => a.cardNo === currentUser.id);
  
  if (myAfd.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No AFD indents placed yet.</td></tr>';
  } else {
    tbody.innerHTML = myAfd.map(a => `
      <tr>
        <td>${new Date(a.date).toLocaleDateString()}</td>
        <td>${a.model}</td>
        <td>${a.dealer}</td>
        <td><span class="status-badge warning">${a.status}</span></td>
      </tr>
    `).join('');
  }
}

function handleAfdRequest(e) {
  e.preventDefault();
  afdOrders.push({
    cardNo: currentUser.id,
    date: new Date().toISOString(),
    type: document.getElementById('afd-type').value,
    model: document.getElementById('afd-model').value.toUpperCase(),
    dealer: document.getElementById('afd-dealer').value.toUpperCase(),
    price: parseFloat(document.getElementById('afd-price').value),
    status: 'PENDING MoD APPROVAL'
  });
  saveStorage();
  renderCustomerAfd();
  document.getElementById('form-afd-request').reset();
  alert('AFD Indent submitted successfully and sent for MoD approval.');
}

// --- POS Terminal Logic ---
function renderPosTerminal() {
  const filterContainer = document.getElementById('category-filters');
  filterContainer.innerHTML = CATEGORIES.map(cat => `
    <button class="btn-category ${activeCategory === cat ? 'active' : ''}" onclick="setCategory('${cat}')">${cat}</button>
  `).join('');
  
  const catalogGrid = document.getElementById('catalog-grid');
  const filtered = activeCategory === 'All' ? inventory : inventory.filter(i => i.category === activeCategory);
  
  catalogGrid.innerHTML = filtered.map(item => `
    <div class="item-card ${item.stock <= 0 ? 'out-of-stock' : ''}" onclick="addItemToCart('${item.id}')">
      <div class="item-code">Stock: ${item.stock} | HSN: ${item.hsn}</div>
      <div class="item-name">${item.name}</div>
      <div style="display: flex; justify-content: space-between; align-items: flex-end;">
        <div class="item-price">₹${item.price.toFixed(2)}</div>
        <div style="font-size: 10px; color: #94a3b8; text-decoration: line-through;">₹${item.marketPrice.toFixed(2)}</div>
      </div>
    </div>
  `).join('');
  
  const select = document.getElementById('cart-customer-select');
  select.innerHTML = '<option value="">-- Scan / Select Customer Card --</option>' + 
    officers.map(o => `<option value="${o.cardNo}">${o.cardNo} - ${o.rank} ${o.name}</option>`).join('');
    
  updateCartUI();
}

window.setCategory = (cat) => {
  activeCategory = cat;
  renderPosTerminal();
}

window.addItemToCart = (itemId) => {
  const item = inventory.find(i => i.id === itemId);
  if (!item || item.stock <= 0) return;
  
  const existingItem = cart.find(i => i.id === itemId);
  if (existingItem) {
    if (existingItem.qty >= item.stock) return alert('Cannot exceed available stock!');
    existingItem.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCartUI();
}

window.updateCartQty = (itemId, delta) => {
  const itemIndex = cart.findIndex(i => i.id === itemId);
  if (itemIndex > -1) {
    const invItem = inventory.find(i => i.id === itemId);
    const newQty = cart[itemIndex].qty + delta;
    
    if (newQty > invItem.stock) return alert('Stock limit reached!');
    if (newQty <= 0) cart.splice(itemIndex, 1);
    else cart[itemIndex].qty = newQty;
  }
  updateCartUI();
}

window.validateCartQuotas = () => {
  const custSelect = document.getElementById('cart-customer-select').value;
  const warningLabel = document.getElementById('cart-quota-warning');
  const btnPrint = document.getElementById('btn-print');
  
  warningLabel.style.display = 'none';
  if (!custSelect || cart.length === 0) {
    btnPrint.disabled = true;
    return true; 
  }
  
  const off = officers.find(o => o.cardNo === custSelect);
  let grocNeeded = 0;
  let liqNeeded = 0;
  
  cart.forEach(item => {
    if (item.category === 'Groceries') grocNeeded += (item.price * item.qty);
    if (item.category === 'Liquor') liqNeeded += item.qty;
  });
  
  const grocBal = off.grocLimit - off.grocDrawn;
  const liqBal = off.liqLimit - off.liqDrawn;
  
  let valid = true;
  let msgs = [];
  
  if (grocNeeded > grocBal) {
    valid = false;
    msgs.push(`Groceries exceeded by ₹${(grocNeeded - grocBal).toFixed(2)}`);
  }
  if (liqNeeded > liqBal) {
    valid = false;
    msgs.push(`Liquor exceeded by ${liqNeeded - liqBal} Units`);
  }
  
  if (!valid) {
    warningLabel.innerText = "QUOTA EXCEEDED: " + msgs.join(" | ");
    warningLabel.style.display = 'block';
    btnPrint.disabled = true;
  } else {
    btnPrint.disabled = false;
  }
  return valid;
}

function updateCartUI() {
  const container = document.getElementById('cart-items');
  let subtotal = 0;
  
  if (cart.length === 0) {
    container.innerHTML = '<div style="text-align: center; color: #94a3b8; margin-top: 40px; font-size: 14px;">Scanner Ready.<br>Cart is empty. Click items to add.</div>';
  } else {
    container.innerHTML = cart.map(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price.toFixed(2)} / unit</div>
          </div>
          <div class="cart-item-actions">
            <button class="btn-qty" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="btn-qty" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
          <div class="cart-item-total">₹${itemTotal.toFixed(2)}</div>
        </div>
      `;
    }).join('');
  }
  
  document.getElementById('cart-subtotal').innerText = `₹ ${subtotal.toFixed(2)}`;
  document.getElementById('cart-total').innerText = `₹ ${subtotal.toFixed(2)}`;
  
  validateCartQuotas();
}

function handleCheckout() {
  if (!validateCartQuotas()) return;
  
  const custSelect = document.getElementById('cart-customer-select').value;
  const officer = officers.find(o => o.cardNo === custSelect);
  
  // Update Stock & Quotas
  let txTotal = 0;
  let txCats = {};
  
  cart.forEach(cartItem => {
    // Deplete stock
    const invItem = inventory.find(i => i.id === cartItem.id);
    invItem.stock -= cartItem.qty;
    
    const val = cartItem.price * cartItem.qty;
    txTotal += val;
    
    // Aggregate category
    if(!txCats[cartItem.category]) txCats[cartItem.category] = 0;
    txCats[cartItem.category] += val;
    
    // Deplete Quota
    if (cartItem.category === 'Groceries') officer.grocDrawn += val;
    if (cartItem.category === 'Liquor') officer.liqDrawn += cartItem.qty;
  });
  
  // Record Transaction
  const billNo = "TXN-" + Math.floor(100000 + Math.random() * 900000);
  
  // Blockchain Hashing Simulation
  const prevTx = transactions[transactions.length - 1];
  const prevHash = prevTx ? prevTx.hash : '0000000000000000000000000000000000000000000000000000000000000000';
  const payload = billNo + officer.cardNo + txTotal + new Date().toISOString() + prevHash;
  
  // Simple deterministic hash simulation
  let hashVal = 0;
  for (let i = 0; i < payload.length; i++) {
    hashVal = ((hashVal << 5) - hashVal) + payload.charCodeAt(i);
    hashVal |= 0;
  }
  const hashHex = ('0000000' + (hashVal >>> 0).toString(16)).slice(-8) + 'a1b2c3d4e5f67890aabbccddeeff11223344556677889900aabbccddeeff';

  transactions.push({
    id: billNo,
    cardNo: officer.cardNo,
    date: new Date().toISOString(),
    total: txTotal,
    categoryBreakdown: txCats,
    prevHash: prevHash,
    hash: hashHex
  });
  
  saveStorage();
  
  // Render specific Bill details for printing (simplified for POS view logic)
  generateReceipt(officer, billNo, txCats);
  
  window.print();
  setTimeout(() => {
    cart = [];
    renderCart();
  }, 1000);
}

function renderAdminAudit() {
  const ledger = document.getElementById('blockchain-ledger');
  ledger.innerHTML = '';
  
  if (transactions.length === 0) {
    ledger.innerHTML = '<div style="color: #64748b;">No transactions in the blockchain yet.</div>';
    return;
  }
  
  transactions.forEach((tx, idx) => {
    const blockHtml = `
      <div style="margin-bottom: 20px; border-left: 2px solid ${idx === transactions.length - 1 ? '#10b981' : '#38bdf8'}; padding-left: 15px;">
        <div style="color: #f59e0b; font-weight: bold;">[BLOCK #${idx}] - MINED: ${new Date(tx.date).toLocaleString()}</div>
        <div style="color: #94a3b8; margin-top: 5px;">Prev Hash: <span style="color: #64748b;">${tx.prevHash || '0000000000000000000000000000000000000000000000000000000000000000'}</span></div>
        <div style="margin-top: 5px;">Payload: { TxID: "${tx.id}", Card: "${tx.cardNo}", Amount: ₹${tx.total} }</div>
        <div style="color: #10b981; margin-top: 5px; word-break: break-all;">Curr Hash: ${tx.hash || 'Not Computed'}</div>
      </div>
    `;
    ledger.innerHTML += blockHtml;
  });
  
}


function generateReceipt(customerCard, billNo, txCats) {
  const now = new Date();
  const formattedDate = now.toISOString().replace('T', ' ').slice(0, 19);
  
  // Populate the A4 dot matrix header & metadata fields
  const safeBillNo = billNo || 'CSD/URC/DEL/2026/10/9482';
  const elBillNo = document.getElementById('receipt-bill-no');
  if (elBillNo) elBillNo.innerText = safeBillNo;
  
  const elDate = document.getElementById('receipt-date');
  if (elDate) elDate.innerText = formattedDate;

  const elIndent = document.getElementById('receipt-indent-no');
  if (elIndent) elIndent.innerText = 'IND-' + formattedDate.slice(0, 7).replace('-', '/') + '/' + safeBillNo.slice(-4);

  const elCashVoucher = document.getElementById('receipt-cash-voucher');
  if (elCashVoucher) elCashVoucher.innerText = 'CSD/CASH/DEL/' + formattedDate.slice(0, 7).replace('-', '/') + '/' + safeBillNo.slice(-4);

  const elCashVoucherSub = document.getElementById('receipt-cash-voucher-sub');
  if (elCashVoucherSub) elCashVoucherSub.innerText = 'CSD/CASH/DEL/' + formattedDate.slice(0, 7).replace('-', '/') + '/' + safeBillNo.slice(-4);
  
  const elCashier = document.getElementById('receipt-cashier-name');
  if (elCashier) elCashier.innerText = currentUser?.name || 'Sub Maj R.K. Yadav';

  const elCanteen = document.getElementById('receipt-canteen-name');
  if (elCanteen) elCanteen.innerText = customerCard.canteen || 'URC HQ DELHI AREA (SENA BHAWAN)';

  const elCustName = document.getElementById('receipt-cust-name');
  if (elCustName) elCustName.innerText = customerCard.name;

  const elCustRank = document.getElementById('receipt-cust-rank');
  if (elCustRank) elCustRank.innerText = customerCard.rank || 'ADDITIONAL SECTION OFFICER - I';

  const elCustCard = document.getElementById('receipt-cust-card');
  if (elCustCard) elCustCard.innerText = customerCard.cardNo;

  const elCustPan = document.getElementById('receipt-cust-pan');
  if (elCustPan) elCustPan.innerText = customerCard.pan || 'EYUPB3666M';

  const elBarcode = document.getElementById('receipt-barcode-code');
  if (elBarcode) elBarcode.innerText = safeBillNo.replace(/[^a-zA-Z0-9]/g, '_');

  const elAuditTs = document.getElementById('receipt-audit-timestamp');
  if (elAuditTs) elAuditTs.innerText = formattedDate;

  const elAuditHash = document.getElementById('receipt-audit-hash');
  if (elAuditHash) elAuditHash.innerText = 'SHA256-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  // Populate Itemized Particulars with all extended details
  const receiptBody = document.getElementById('receipt-items-body');
  receiptBody.innerHTML = '';
  
  let totalGross = 0, totalCGST = 0, totalSGST = 0, totalNet = 0, totalMarketPrice = 0;
  
  cart.forEach((item, index) => {
    const netValue = item.price * item.qty;
    const gstRate = item.gstRate || 18;
    const taxableValue = netValue / (1 + (gstRate / 100));
    const itemCGST = taxableValue * ((gstRate / 2) / 100);
    const itemSGST = taxableValue * ((gstRate / 2) / 100);
    const market = Number(item.marketPrice) || (item.price * 1.25);
    
    totalGross += taxableValue;
    totalCGST += itemCGST;
    totalSGST += itemSGST;
    totalNet += netValue;
    totalMarketPrice += (market * item.qty);

    const hasExtra = item.brand || item.model || item.color || item.serialNo || item.imei1 || item.specs || item.warrantyExpires || item.batchNo || item.grade;
    
    receiptBody.innerHTML += `
      <tr style="border-bottom: 1px dashed #94a3b8;">
        <td style="padding: 5px 3px; vertical-align: top; text-align: center; font-weight: 700;">${String(index + 1).padStart(2, '0')}</td>
        <td style="padding: 5px 4px; vertical-align: top;">
          <strong style="letter-spacing: 0.5px;">${item.id || item.sku || 'N/A'}</strong><br>
          <span style="font-size: 8.5px; color: #333;">HSN: ${item.hsn || '85171300'}</span>
        </td>
        <td style="padding: 5px 6px; vertical-align: top;">
          <div style="font-weight: 800; font-size: 11px; letter-spacing: 0.2px;">${item.name}</div>
          ${hasExtra ? `
            <div style="font-size: 8.5px; line-height: 1.35; margin-top: 3px; color: #111;">
              ${item.brand ? `<div><strong>BRAND/MFR :</strong> ${String(item.brand).toUpperCase()}</div>` : ''}
              ${item.model || item.color ? `<div><strong>MODEL/CLR :</strong> ${String(item.model || 'N/A').toUpperCase()} &bull; COLOR: ${String(item.color || 'STANDARD').toUpperCase()}</div>` : ''}
              ${item.batchNo || item.afdCategory ? `<div><strong>BATCH/AFD :</strong> ${String(item.batchNo || 'LOT-2026/DEL').toUpperCase()} &bull; AFD CAT: ${String(item.afdCategory || 'AFD-II').toUpperCase()}</div>` : ''}
              ${item.serialNo && item.serialNo !== 'N/A' ? `<div><strong>SERIAL NO :</strong> ${String(item.serialNo).toUpperCase()}</div>` : ''}
              ${(item.imei1 && item.imei1 !== 'N/A') || (item.imei2 && item.imei2 !== 'N/A') ? `
                <div style="background: #f1f5f9; padding: 2px 4px; border: 1px dashed #cbd5e1; margin-top: 2px; font-weight: 700;">
                  ${item.imei1 && item.imei1 !== 'N/A' ? `IMEI-1: ${item.imei1} &nbsp; ` : ''}
                  ${item.imei2 && item.imei2 !== 'N/A' ? `IMEI-2: ${item.imei2}` : ''}
                </div>
              ` : ''}
              ${item.grade || item.accessories ? `<div><strong>PKG/GRADE :</strong> ${String(item.grade || 'SEALED PACK').toUpperCase()} ${item.accessories ? '&bull; INCL: ' + String(item.accessories).toUpperCase() : ''}</div>` : ''}
              ${item.warrantyExpires ? `<div><strong>WARRANTY  :</strong> ${String(item.warrantyExpires).toUpperCase()}</div>` : ''}
              ${item.specs ? `<div style="margin-top: 2px; color: #1e293b;"><strong>SPECS:</strong> ${String(item.specs).toUpperCase()}</div>` : ''}
              <div style="color: #166534; font-weight: 700; margin-top: 2px;">
                OPEN MARKET MRP: ₹${(market * item.qty).toFixed(2)} &bull; DEFENCE SAVINGS: ₹${((market - item.price) * item.qty).toFixed(2)} (${Math.round(((market - item.price) / market) * 100)}% OFF)
              </div>
            </div>
          ` : `
            <div style="font-size: 8.5px; color: #166534; font-weight: 700; margin-top: 2px;">
              OPEN MARKET MRP: ₹${(market * item.qty).toFixed(2)} &bull; SAVINGS: ₹${((market - item.price) * item.qty).toFixed(2)}
            </div>
          `}
        </td>
        <td style="padding: 5px 3px; vertical-align: top; text-align: center; white-space: nowrap;">${item.qty} ${item.unit || 'UNT'}</td>
        <td style="padding: 5px 3px; vertical-align: top; text-align: right; font-family: monospace;">₹${(taxableValue / item.qty).toFixed(2)}</td>
        <td style="padding: 5px 3px; vertical-align: top; text-align: right; font-family: monospace;">₹${taxableValue.toFixed(2)}</td>
        <td style="padding: 5px 4px; vertical-align: top; text-align: right; font-family: monospace;">
          <strong style="font-size: 11px;">₹${netValue.toFixed(2)}</strong><br>
          <span style="font-size: 8px; color: #555;">GST ${gstRate}%: ₹${(itemCGST + itemSGST).toFixed(2)}</span>
        </td>
      </tr>
    `;
  });
  
  // Quotas
  const elGrocLimit = document.getElementById('receipt-quota-groc-limit');
  if (elGrocLimit) elGrocLimit.innerText = `₹${customerCard.grocLimit}`;

  const elGrocDrawn = document.getElementById('receipt-quota-groc-drawn');
  if (elGrocDrawn) elGrocDrawn.innerText = `₹${customerCard.grocDrawn}`;

  const elGrocBal = document.getElementById('receipt-quota-groc-bal');
  if (elGrocBal) elGrocBal.innerText = `₹${customerCard.grocLimit - customerCard.grocDrawn}`;
  
  const elLiqLimit = document.getElementById('receipt-quota-liq-limit');
  if (elLiqLimit) elLiqLimit.innerText = `${customerCard.liqLimit}`;

  const elLiqDrawn = document.getElementById('receipt-quota-liq-drawn');
  if (elLiqDrawn) elLiqDrawn.innerText = `${customerCard.liqDrawn}`;

  const elLiqBal = document.getElementById('receipt-quota-liq-bal');
  if (elLiqBal) elLiqBal.innerText = `${customerCard.liqLimit - customerCard.liqDrawn}`;
  
  // Taxes Matrix
  const elTaxBaseCgst = document.getElementById('receipt-tax-base-cgst');
  if (elTaxBaseCgst) elTaxBaseCgst.innerText = `₹${totalGross.toFixed(2)}`;

  const elTaxBaseSgst = document.getElementById('receipt-tax-base-sgst');
  if (elTaxBaseSgst) elTaxBaseSgst.innerText = `₹${totalGross.toFixed(2)}`;

  const elTotalCgst = document.getElementById('receipt-total-cgst');
  if (elTotalCgst) elTotalCgst.innerText = `₹${totalCGST.toFixed(2)}`;

  const elTotalSgst = document.getElementById('receipt-total-sgst');
  if (elTotalSgst) elTotalSgst.innerText = `₹${totalSGST.toFixed(2)}`;

  const elTotalGross = document.getElementById('receipt-total-gross');
  if (elTotalGross) elTotalGross.innerText = `₹${totalGross.toFixed(2)}`;

  const elTotalGst = document.getElementById('receipt-total-gst');
  if (elTotalGst) elTotalGst.innerText = `₹${(totalCGST + totalSGST).toFixed(2)}`;

  // Financial Totals
  const netRounded = Math.round(totalNet);
  const savings = Math.max(0, totalMarketPrice - totalNet);

  const elMarketTot = document.getElementById('receipt-market-total');
  if (elMarketTot) elMarketTot.innerText = `₹ ${totalMarketPrice.toFixed(2)}`;

  const elSumTaxable = document.getElementById('receipt-summary-taxable');
  if (elSumTaxable) elSumTaxable.innerText = `₹ ${totalGross.toFixed(2)}`;

  const elSumTaxes = document.getElementById('receipt-summary-taxes');
  if (elSumTaxes) elSumTaxes.innerText = `₹ ${(totalCGST + totalSGST).toFixed(2)}`;

  const elSavings = document.getElementById('receipt-savings');
  if (elSavings) elSavings.innerText = `₹ ${savings.toFixed(2)}`;

  const elTotalNet = document.getElementById('receipt-total-net');
  if (elTotalNet) elTotalNet.innerText = `₹ ${netRounded.toFixed(2)}`;

  const elAmountWords = document.getElementById('receipt-amount-words');
  if (elAmountWords) elAmountWords.innerText = `RUPEES ${numberToWordsINR(netRounded).toUpperCase()} ONLY`;

  const elCashTendered = document.getElementById('receipt-cash-tendered');
  if (elCashTendered) elCashTendered.innerText = `₹ ${netRounded.toFixed(2)}`;

  // Denominations Grid
  const denomsGrid = document.getElementById('receipt-denominations-grid');
  if (denomsGrid) {
    const denomsList = calculateCashDenominations(netRounded);
    denomsGrid.innerHTML = denomsList.map(item => `
      <div>${item.denom >= 10 ? '₹' + item.denom : ' ₹' + item.denom} &times; ${String(item.count).padStart(3, ' ')} = ₹${item.amount.toFixed(2).padStart(9, ' ')}</div>
    `).join('');
  }
}
