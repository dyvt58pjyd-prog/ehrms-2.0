// --- CSD Full-Scale Web Application Logic ---

const DEFAULT_INVENTORY = [
  { id: '245561', name: 'SAMSUNG GALAXY S24 5G (8/128GB) - ONYX BLACK', category: 'Electronics', hsn: '8517', stock: 25, price: 32999.00, marketPrice: 74999.00 },
  { id: '99055412', name: 'SONY PLAYSTATION 5 CONSOLE', category: 'Electronics', hsn: '9504', stock: 5, price: 37900.00, marketPrice: 57999.00 },
  { id: '233243', name: 'SAMSUNG GALAXY S25 5G (12/256GB) - SILVER SHADOW', category: 'Electronics', hsn: '8517', stock: 12, price: 54436.00, marketPrice: 80999.00 },
  { id: '8901030311221', name: 'AMUL PURE GHEE 1L TIN', category: 'Groceries', hsn: '0405', stock: 50, price: 580.00, marketPrice: 650.00 },
  { id: '8901058863283', name: 'MAGGI 2-MIN NOODLES 12PK', category: 'Groceries', hsn: '1902', stock: 120, price: 144.00, marketPrice: 168.00 },
  { id: '8901131000100', name: 'OLD MONK XXX RUM 750ML', category: 'Liquor', hsn: '2208', stock: 200, price: 450.00, marketPrice: 600.00 },
  { id: '8806090123456', name: 'SAMSUNG 32" SMART LED TV', category: 'Electronics', hsn: '8528', stock: 15, price: 12500.00, marketPrice: 15990.00 },
  { id: '4902430691234', name: 'GILLETTE MACH 3 (4 CT)', category: 'Toiletries', hsn: '8212', stock: 80, price: 425.00, marketPrice: 495.00 }
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

function handleAddProduct(e) {
  e.preventDefault();
  const id = Date.now().toString().slice(-13);
  inventory.push({
    id,
    name: document.getElementById('prod-name').value.toUpperCase(),
    category: document.getElementById('prod-category').value,
    hsn: document.getElementById('prod-hsn').value,
    stock: parseInt(document.getElementById('prod-stock').value),
    price: parseFloat(document.getElementById('prod-price').value),
    marketPrice: parseFloat(document.getElementById('prod-market').value)
  });
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
  
  // Populate the extreme A4 invoice fields exactly as requested before
  document.getElementById('receipt-bill-no').innerText = billNo;
  document.getElementById('receipt-date').innerText = now.toLocaleString();
  document.getElementById('receipt-csd-index').innerText = "BD" + Math.floor(10000 + Math.random() * 90000);
  
  // Auth Details
  document.getElementById('receipt-cashier-name').innerText = currentUser.name;
  document.getElementById('receipt-canteen-name').innerText = customerCard.canteen;
  document.getElementById('receipt-cust-name').innerText = `${customerCard.rank} ${customerCard.name}`;
  document.getElementById('receipt-cust-card').innerText = customerCard.cardNo;
  document.getElementById('receipt-cust-pan').innerText = customerCard.pan;
  
  // Extreme Mock Fields
  document.getElementById('receipt-station-hq').innerText = 'HQ Delhi Area (011)';
  document.getElementById('receipt-supply-depot').innerText = 'Base Supply Depot 1';
  document.getElementById('receipt-state-tin').innerText = 'TIN-07882931';
  document.getElementById('receipt-tax-exemption-no').innerText = 'EX-2026-DEL-099';
  document.getElementById('receipt-fms-id').innerText = 'FMS-889922';
  document.getElementById('receipt-fiscal-year').innerText = '2026-2027';
  document.getElementById('receipt-pos-terminal-ip').innerText = '192.168.1.100';
  document.getElementById('receipt-pos-mac').innerText = 'A1:B2:C3:D4:E5:F6';
  document.getElementById('receipt-indent-no').innerText = 'IND-2026/09/111';
  document.getElementById('receipt-session-id').innerText = 'SESS-99999';
  document.getElementById('receipt-software-version').innerText = 'CSD-POS v10.0 (SPA)';
  document.getElementById('receipt-audit-hash').innerText = 'SHA256-ABCD1234EFGH';
  document.getElementById('receipt-manager-name').innerText = 'Sub Maj R.K. Yadav';
  document.getElementById('receipt-central-tin').innerText = 'CTIN-29384756';
  document.getElementById('receipt-barcode-data').innerText = '|| ||| |||| | ||||| ||';
  document.getElementById('receipt-card-status').innerText = 'ACTIVE-VERIFIED';
  document.getElementById('receipt-card-expiry').innerText = '31-DEC-2029';
  document.getElementById('receipt-cust-blood-group').innerText = 'O+';
  document.getElementById('receipt-cust-dob').innerText = '12-MAY-1980';
  document.getElementById('receipt-cust-dependents').innerText = '3 (Reg)';
  document.getElementById('receipt-afd-status').innerText = 'ELIGIBLE (Tier 1)';
  document.getElementById('receipt-last-purchase').innerText = new Date().toLocaleDateString();
  document.getElementById('receipt-qr-hash').innerText = 'QR-0x992384';
  
  const receiptBody = document.getElementById('receipt-items-body');
  receiptBody.innerHTML = '';
  
  let totalGross = 0, totalCGST = 0, totalSGST = 0, totalNet = 0, totalMarketPrice = 0;
  
  cart.forEach((item, index) => {
    const netValue = item.price * item.qty;
    const taxableValue = netValue / 1.18;
    const itemCGST = taxableValue * 0.09;
    const itemSGST = taxableValue * 0.09;
    
    totalGross += taxableValue;
    totalCGST += itemCGST;
    totalSGST += itemSGST;
    totalNet += netValue;
    totalMarketPrice += (item.marketPrice * item.qty);
    
    receiptBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.id.slice(-6)}<br>${item.hsn}</td>
        <td class="text-left">${item.name}</td>
        <td>${item.qty}</td>
        <td>${(taxableValue / item.qty).toFixed(2)}</td>
        <td>${taxableValue.toFixed(2)}</td>
        <td>9%<br>${itemCGST.toFixed(2)}</td>
        <td>9%<br>${itemSGST.toFixed(2)}</td>
      </tr>
    `;
  });
  
  // Quotas (Post-purchase balances)
  document.getElementById('receipt-quota-groc-limit').innerText = `₹${customerCard.grocLimit}`;
  document.getElementById('receipt-quota-groc-drawn').innerText = `₹${customerCard.grocDrawn}`;
  document.getElementById('receipt-quota-groc-bal').innerText = `₹${customerCard.grocLimit - customerCard.grocDrawn}`;
  
  document.getElementById('receipt-quota-liq-limit').innerText = `${customerCard.liqLimit}`;
  document.getElementById('receipt-quota-liq-drawn').innerText = `${customerCard.liqDrawn}`;
  document.getElementById('receipt-quota-liq-bal').innerText = `${customerCard.liqLimit - customerCard.liqDrawn}`;
  
  // Category Summary
  const catSummary = document.getElementById('receipt-category-summary');
  catSummary.innerHTML = Object.keys(txCats).map(cat => 
    `<div style="display:flex; justify-content:space-between; margin-bottom:2px;">
      <span>${cat}:</span> <strong>₹${txCats[cat].toFixed(2)}</strong>
    </div>`
  ).join('');
  
  // Taxes
  document.getElementById('receipt-tax-summary-body').innerHTML = `
    <tr><td>18%</td><td>${totalGross.toFixed(2)}</td><td>${totalCGST.toFixed(2)}</td><td>${totalSGST.toFixed(2)}</td></tr>
  `;

  document.getElementById('receipt-total-gross').innerText = `₹${totalGross.toFixed(2)}`;
  document.getElementById('receipt-total-cgst').innerText = `₹${totalCGST.toFixed(2)}`;
  document.getElementById('receipt-total-sgst').innerText = `₹${totalSGST.toFixed(2)}`;
  
  const netRounded = Math.round(totalNet);
  document.getElementById('receipt-total-net').innerText = `₹${netRounded.toFixed(2)}`;
  document.getElementById('receipt-amount-words').innerText = "RUPEES " + netRounded + " ONLY";
  
  const savings = totalMarketPrice - totalNet;
  document.getElementById('receipt-savings').innerText = `₹${savings.toFixed(2)}`;
}
