const path = require('path');
const fs = require('fs');

let DatabaseSync;
try {
  ({ DatabaseSync } = require('node:sqlite'));
} catch (e) {
  console.warn('node:sqlite not found, trying sqlite3 fallback:', e.message);
}

const DB_PATH = path.join(__dirname, 'database.sqlite');

class DatabaseManager {
  constructor() {
    this.db = null;
    this.init();
  }

  init() {
    if (!DatabaseSync) {
      throw new Error('SQLite DatabaseSync is not available in this Node runtime.');
    }
    this.db = new DatabaseSync(DB_PATH);
    this.db.exec('PRAGMA journal_mode = WAL;');
    this.db.exec('PRAGMA foreign_keys = ON;');
    this.createTables();
    this.seedInitialData();
  }

  createTables() {
    // 1. App State table (Snapshot persistence)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS app_state (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    // 2. CSD Inventory table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS csd_inventory (
        id TEXT PRIMARY KEY,
        sku TEXT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        afd_category TEXT,
        unit TEXT,
        brand TEXT,
        model TEXT,
        color TEXT,
        hsn TEXT,
        price REAL NOT NULL,
        market_price REAL,
        stock INTEGER NOT NULL DEFAULT 0,
        grade TEXT,
        accessories TEXT,
        warranty_expires TEXT,
        specs TEXT,
        serial_no TEXT,
        imei1 TEXT,
        imei2 TEXT,
        batch_no TEXT,
        gst_rate REAL DEFAULT 18,
        updated_at TEXT NOT NULL
      );
    `);

    // 3. CSD Transactions table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS csd_transactions (
        id TEXT PRIMARY KEY,
        bill_no TEXT NOT NULL,
        indent_no TEXT,
        date TEXT NOT NULL,
        canteen TEXT,
        terminal TEXT,
        cashier TEXT,
        manager TEXT,
        payment_mode TEXT,
        payment_type TEXT,
        items_json TEXT NOT NULL,
        total_taxable REAL,
        total_cgst REAL,
        total_sgst REAL,
        total_net REAL NOT NULL,
        total_savings REAL,
        card_no TEXT,
        rank TEXT,
        groc_limit REAL,
        groc_drawn REAL,
        liq_limit REAL,
        liq_drawn REAL,
        status TEXT,
        cash_tendered REAL,
        cash_change REAL,
        cash_voucher_no TEXT,
        cash_receipt_no TEXT,
        created_at TEXT NOT NULL
      );
    `);

    // 4. CSD Officers & Smart Card Holders
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS csd_officers (
        card_no TEXT PRIMARY KEY,
        rank TEXT,
        name TEXT NOT NULL,
        canteen TEXT,
        pan TEXT,
        groc_limit REAL DEFAULT 50000,
        liq_limit REAL DEFAULT 25,
        groc_drawn REAL DEFAULT 0,
        liq_drawn REAL DEFAULT 0,
        updated_at TEXT NOT NULL
      );
    `);

    // 5. CSD AFD Indents
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS csd_afd_orders (
        id TEXT PRIMARY KEY,
        card_no TEXT NOT NULL,
        date TEXT NOT NULL,
        type TEXT,
        model TEXT,
        dealer TEXT,
        price REAL,
        status TEXT,
        created_at TEXT NOT NULL
      );
    `);
  }

  seedInitialData() {
    const STATE_FILE = path.join(__dirname, 'state.json');
    let state = this.getState();

    if (!state && fs.existsSync(STATE_FILE)) {
      try {
        const raw = fs.readFileSync(STATE_FILE, 'utf8');
        state = JSON.parse(raw);
        console.log('✅ SQLite loaded initial state snapshot from state.json');
      } catch (err) {
        console.error('Failed to parse state.json:', err.message);
      }
    }

    if (!state) {
      state = { csdBilling: {} };
    }
    if (!state.csdBilling) state.csdBilling = {};
    if (!Array.isArray(state.csdBilling.inventory)) state.csdBilling.inventory = [];
    if (!Array.isArray(state.csdBilling.transactions)) state.csdBilling.transactions = [];

    // Core default inventory items to guarantee SQLite catalog completeness
    const DEFAULT_CATALOG = [
      {
        id: '281948',
        sku: '281948',
        name: 'APPLE IPHONE 17 PRO MAX (256GB) - TITANIUM TEAL',
        category: 'Electronics',
        brand: 'APPLE INC / APPLE INDIA PVT LTD',
        model: 'A3398 / IPHONE 17 PRO MAX (256GB)',
        color: 'TITANIUM TEAL',
        hsn: '85171300',
        stock: 15,
        price: 114900.00,
        marketPrice: 144900.00,
        unit: 'UNT',
        gstRate: 18,
        grade: 'VERY GOOD (A) - FACTORY SEALED BRAND BOX',
        accessories: '100W TYPE-C BRAIDED FAST CABLE, SIM EJECTOR PIN, APPLE STICKERS',
        warrantyExpires: '28-10-2027 (1 YEAR PAN-INDIA APPLE LIMITED ONSITE WARRANTY)',
        specs: '17.5 CM (6.9") SUPER RETINA XDR PROMOTION 120HZ OLED (3000 NITS) | APPLE A19 PRO 2NM BIONIC SILICON | 12GB RAM | 256GB NVME | TRIPLE 48MP FUSION (WIDE + ULTRA-WIDE + 10X PERISCOPE TELEPHOTO) | 24MP FRONT | 5200 MAH BATTERY | 45W WIRED & 25W MAGSAFE | TITANIUM GRADE 5 CHASSIS',
        imei1: '359810/24/849201/8',
        imei2: '359810/24/849202/6',
        serialNo: 'G6TF9027IPHONE17',
        batchNo: 'BAT-2026/09-DEL-A17',
        afdCategory: 'AFD-II (DURABLES)'
      },
      {
        id: '281949',
        sku: '281949',
        name: 'APPLE IPHONE 17 (256GB) - ULTRAVIOLET',
        category: 'Electronics',
        brand: 'APPLE INC / APPLE INDIA PVT LTD',
        model: 'A3391 / IPHONE 17',
        color: 'ULTRAVIOLET',
        hsn: '85171300',
        stock: 20,
        price: 68900.00,
        marketPrice: 89900.00,
        unit: 'UNT',
        gstRate: 18,
        grade: 'SEALED BRAND NEW RETAIL PACK',
        accessories: 'TYPE-C WOVEN CHARGING CABLE, SIM TRAY PIN, MANUAL',
        warrantyExpires: '1 YEAR APPLE PAN-INDIA LIMITED WARRANTY',
        specs: '15.75 CM (6.2") SUPER RETINA XDR OLED 120HZ PROMOTION | APPLE A19 BIONIC 2NM CHIP | 8GB RAM | 256GB ROM | DUAL 48MP FUSION + 48MP ULTRA WIDE CAMERA | 4200 MAH BATTERY',
        serialNo: 'G6TQ8121IP17UV',
        imei1: '359822/15/901284/3',
        imei2: '359822/15/901285/0',
        batchNo: 'BAT-2026/10-DEL',
        afdCategory: 'AFD-II (DURABLES)'
      },
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
        id: '606820',
        sku: '606820',
        name: 'APPLE MACBOOK PRO 16 M4 MAX (48GB/1TB)',
        category: 'Electronics',
        brand: 'APPLE INC / INDIA',
        model: 'A3185 (MACBOOK PRO 16)',
        color: 'SPACE BLACK',
        hsn: '85171300',
        stock: 9,
        price: 319900.00,
        marketPrice: 349900.00,
        unit: 'UNT',
        gstRate: 18,
        grade: 'Brand New Sealed Box (Grade A)',
        accessories: 'All Original Accessories Included (140W USB-C Adapter, Braided MagSafe 3 Cable)',
        warrantyExpires: '1 Year Official Brand Warranty Pan-India',
        specs: '16.2" LIQUID RETINA XDR 120HZ | 16-CORE CPU | 40-CORE GPU | 48GB UNIFIED MEMORY | 1TB NVME SSD | 140W MAGSAFE 3',
        serialNo: 'C02TM8921APPLE',
        imei1: 'N/A',
        imei2: 'N/A',
        batchNo: 'BAT-2026/10-DEL',
        afdCategory: 'AFD-II (Electronics / Two-Wheelers)'
      }
    ];

    DEFAULT_CATALOG.forEach(item => {
      this.saveCsdInventoryItem(item);
      const existingIdx = state.csdBilling.inventory.findIndex(i => i.id === item.id);
      if (existingIdx === -1) {
        state.csdBilling.inventory.unshift(item);
      } else {
        state.csdBilling.inventory[existingIdx] = { ...state.csdBilling.inventory[existingIdx], ...item };
      }
    });

    // Default Officers
    const DEFAULT_OFFICERS = [
      { cardNo: 'LB08260547713500S01', rank: 'ASO-I (Gazetted)', name: 'ANURAG ANIL BAWASKAR', canteen: 'URC HQ DELHI AREA (SENA BHAWAN)', pan: 'EYUPB3666M', grocLimit: 50000, liqLimit: 25, grocDrawn: 2850, liqDrawn: 2 },
      { cardNo: 'LB08260547713500D01', rank: 'DEPENDENT (Father)', name: 'ANIL R. BAWASKAR', canteen: 'URC HQ DELHI AREA', pan: 'EYUPB3666M', grocLimit: 10000, liqLimit: 0, grocDrawn: 0, liqDrawn: 0 },
      { cardNo: 'GC10928374123456', rank: 'MAJOR', name: 'ANURAG A. BAWASKAR', canteen: 'URC HQ DELHI AREA', pan: 'EYUPB3666M', grocLimit: 50000, liqLimit: 25, grocDrawn: 2500, liqDrawn: 2 },
      { cardNo: 'GC99887766554433', rank: 'COLONEL', name: 'RAM SINGH', canteen: 'URC HQ DELHI AREA', pan: 'ABCDE1234F', grocLimit: 15000, liqLimit: 14, grocDrawn: 14500, liqDrawn: 12 }
    ];
    DEFAULT_OFFICERS.forEach(off => this.saveCsdOfficer(off));

    // Default iPhone 17 Pro Max Transaction
    const DEFAULT_IPHONE17_TXN = {
      id: 'CSD-TXN-2026-1015',
      billNo: 'CSD/URC/DEL/2026/10/9842',
      indentNo: 'IND-2026/10/9842',
      date: '2026-10-15 10:30:00',
      canteen: 'URC HQ DELHI AREA (SENA BHAWAN)',
      terminal: 'POS-01 / IP: 192.168.1.101',
      cashier: 'Sub Maj R.K. Yadav',
      manager: 'Sub Maj R.K. Yadav',
      paymentMode: 'HARD CURRENCY CASH ONLY (COUNTER 01)',
      paymentType: 'CASH',
      items: [
        {
          id: '281948',
          sku: '281948',
          name: 'APPLE IPHONE 17 PRO MAX (256GB) - TITANIUM TEAL',
          category: 'Electronics',
          brand: 'APPLE INC / APPLE INDIA PVT LTD',
          model: 'A3398 / IPHONE 17 PRO MAX (256GB)',
          color: 'TITANIUM TEAL',
          hsn: '85171300',
          qty: 1,
          unit: 'UNT',
          price: 114900.00,
          marketPrice: 144900.00,
          grade: 'VERY GOOD (A) - FACTORY SEALED BRAND BOX',
          accessories: '100W TYPE-C BRAIDED FAST CABLE, SIM EJECTOR PIN, APPLE STICKERS',
          warrantyExpires: '28-10-2027 (1 YEAR PAN-INDIA APPLE LIMITED ONSITE WARRANTY)',
          specs: '17.5 CM (6.9") SUPER RETINA XDR PROMOTION 120HZ OLED (3000 NITS) | APPLE A19 PRO 2NM BIONIC SILICON | 12GB RAM | 256GB NVME | TRIPLE 48MP FUSION (WIDE + ULTRA-WIDE + 10X PERISCOPE TELEPHOTO) | 24MP FRONT | 5200 MAH BATTERY | 45W WIRED & 25W MAGSAFE | TITANIUM GRADE 5 CHASSIS',
          imei1: '359810/24/849201/8',
          imei2: '359810/24/849202/6',
          serialNo: 'G6TF9027IPHONE17',
          batchNo: 'BAT-2026/09-DEL-A17',
          afdCategory: 'AFD-II (DURABLES)'
        }
      ],
      totalTaxable: 97372.88,
      totalCgst: 8763.56,
      totalSgst: 8763.56,
      totalNet: 114900.00,
      totalSavings: 30000.00,
      cardNo: 'LB08260547713500S01',
      rank: 'ASO-I (Group A Gazetted)',
      grocLimit: 50000,
      grocDrawn: 2850,
      liqLimit: 25,
      liqDrawn: 2,
      status: 'COMPLETED',
      cashTendered: 114900.00,
      cashChange: 0.00,
      cashVoucherNo: 'CSD/CASH/DEL/2026/10/9842',
      cashReceiptNo: 'RCPT-CSD-2026-9842'
    };
    this.saveCsdTransaction(DEFAULT_IPHONE17_TXN);

    const existingTxnIdx = state.csdBilling.transactions.findIndex(t => t.id === DEFAULT_IPHONE17_TXN.id);
    if (existingTxnIdx === -1) {
      state.csdBilling.transactions.unshift(DEFAULT_IPHONE17_TXN);
    } else {
      state.csdBilling.transactions[existingTxnIdx] = { ...state.csdBilling.transactions[existingTxnIdx], ...DEFAULT_IPHONE17_TXN };
    }

    // Persist unified state to SQLite and write file backup
    this.saveState(state);
    try {
      fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
    } catch {}

    console.log('✅ SQLite database initialized and verified with latest iPhone 17 & CSD relational records');
  }

  // --- App State Methods ---
  getState() {
    const row = this.db.prepare('SELECT value FROM app_state WHERE key = ?').get('main');
    if (!row) return null;
    try {
      return JSON.parse(row.value);
    } catch {
      return null;
    }
  }

  getStateRaw() {
    const row = this.db.prepare('SELECT value FROM app_state WHERE key = ?').get('main');
    return row ? row.value : null;
  }

  saveState(stateObjOrString) {
    let jsonString = '';
    let parsed = null;

    if (typeof stateObjOrString === 'string') {
      jsonString = stateObjOrString;
      try { parsed = JSON.parse(stateObjOrString); } catch {}
    } else {
      parsed = stateObjOrString;
      jsonString = JSON.stringify(stateObjOrString, null, 2);
    }

    const now = new Date().toISOString();
    const stmt = this.db.prepare(`
      INSERT INTO app_state (key, value, updated_at)
      VALUES ('main', ?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
    `);
    stmt.run(jsonString, now);

    // If csdBilling is inside state, synchronize SQLite relational tables
    if (parsed && parsed.csdBilling) {
      if (Array.isArray(parsed.csdBilling.inventory)) {
        parsed.csdBilling.inventory.forEach(item => this.saveCsdInventoryItem(item));
      }
      if (Array.isArray(parsed.csdBilling.transactions)) {
        parsed.csdBilling.transactions.forEach(txn => this.saveCsdTransaction(txn));
      }
    }

    return true;
  }

  // --- CSD Inventory Methods ---
  getCsdInventory() {
    const rows = this.db.prepare('SELECT * FROM csd_inventory ORDER BY price DESC').all();
    return rows.map(r => ({
      id: r.id,
      sku: r.sku || r.id,
      name: r.name,
      category: r.category,
      afdCategory: r.afd_category,
      unit: r.unit,
      brand: r.brand,
      model: r.model,
      color: r.color,
      hsn: r.hsn,
      price: r.price,
      marketPrice: r.market_price,
      stock: r.stock,
      grade: r.grade,
      accessories: r.accessories,
      warrantyExpires: r.warranty_expires,
      specs: r.specs,
      serialNo: r.serial_no,
      imei1: r.imei1,
      imei2: r.imei2,
      batchNo: r.batch_no,
      gstRate: r.gst_rate
    }));
  }

  saveCsdInventoryItem(item) {
    if (!item || !item.id) return;
    const now = new Date().toISOString();
    const stmt = this.db.prepare(`
      INSERT INTO csd_inventory (
        id, sku, name, category, afd_category, unit, brand, model, color, hsn,
        price, market_price, stock, grade, accessories, warranty_expires,
        specs, serial_no, imei1, imei2, batch_no, gst_rate, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        sku = excluded.sku,
        name = excluded.name,
        category = excluded.category,
        afd_category = excluded.afd_category,
        unit = excluded.unit,
        brand = excluded.brand,
        model = excluded.model,
        color = excluded.color,
        hsn = excluded.hsn,
        price = excluded.price,
        market_price = excluded.market_price,
        stock = excluded.stock,
        grade = excluded.grade,
        accessories = excluded.accessories,
        warranty_expires = excluded.warranty_expires,
        specs = excluded.specs,
        serial_no = excluded.serial_no,
        imei1 = excluded.imei1,
        imei2 = excluded.imei2,
        batch_no = excluded.batch_no,
        gst_rate = excluded.gst_rate,
        updated_at = excluded.updated_at
    `);

    stmt.run(
      String(item.id),
      String(item.sku || item.id),
      String(item.name || ''),
      String(item.category || 'Electronics'),
      String(item.afdCategory || item.afd_category || 'AFD-II (DURABLES)'),
      String(item.unit || 'UNT'),
      String(item.brand || ''),
      String(item.model || ''),
      String(item.color || ''),
      String(item.hsn || '85171300'),
      Number(item.price) || 0,
      Number(item.marketPrice || item.market_price) || (Number(item.price || 0) * 1.25),
      Number(item.stock) || 0,
      String(item.grade || ''),
      String(item.accessories || ''),
      String(item.warrantyExpires || item.warranty_expires || ''),
      String(item.specs || ''),
      String(item.serialNo || item.serial_no || ''),
      String(item.imei1 || ''),
      String(item.imei2 || ''),
      String(item.batchNo || item.batch_no || ''),
      Number(item.gstRate || item.gst_rate) || 18,
      now
    );
  }

  deleteCsdInventoryItem(id) {
    if (!id) return;
    this.db.prepare('DELETE FROM csd_inventory WHERE id = ?').run(String(id));
  }

  // --- CSD Transactions Methods ---
  getCsdTransactions() {
    const rows = this.db.prepare('SELECT * FROM csd_transactions ORDER BY date DESC').all();
    return rows.map(r => {
      let items = [];
      try { items = JSON.parse(r.items_json); } catch {}
      return {
        id: r.id,
        billNo: r.bill_no,
        indentNo: r.indent_no,
        date: r.date,
        canteen: r.canteen,
        terminal: r.terminal,
        cashier: r.cashier,
        manager: r.manager,
        paymentMode: r.payment_mode,
        paymentType: r.payment_type,
        items: items,
        totalTaxable: r.total_taxable,
        totalCgst: r.total_cgst,
        totalSgst: r.total_sgst,
        totalNet: r.total_net,
        totalSavings: r.total_savings,
        cardNo: r.card_no,
        rank: r.rank,
        grocLimit: r.groc_limit,
        grocDrawn: r.groc_drawn,
        liqLimit: r.liq_limit,
        liqDrawn: r.liq_drawn,
        status: r.status,
        cashTendered: r.cash_tendered,
        cashChange: r.cash_change,
        cashVoucherNo: r.cash_voucher_no,
        cashReceiptNo: r.cash_receipt_no
      };
    });
  }

  saveCsdTransaction(txn) {
    if (!txn || !txn.id) return;
    const now = new Date().toISOString();
    const itemsJson = JSON.stringify(txn.items || []);

    const stmt = this.db.prepare(`
      INSERT INTO csd_transactions (
        id, bill_no, indent_no, date, canteen, terminal, cashier, manager,
        payment_mode, payment_type, items_json, total_taxable, total_cgst,
        total_sgst, total_net, total_savings, card_no, rank, groc_limit,
        groc_drawn, liq_limit, liq_drawn, status, cash_tendered, cash_change,
        cash_voucher_no, cash_receipt_no, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        bill_no = excluded.bill_no,
        indent_no = excluded.indent_no,
        date = excluded.date,
        canteen = excluded.canteen,
        terminal = excluded.terminal,
        cashier = excluded.cashier,
        manager = excluded.manager,
        payment_mode = excluded.payment_mode,
        payment_type = excluded.payment_type,
        items_json = excluded.items_json,
        total_taxable = excluded.total_taxable,
        total_cgst = excluded.total_cgst,
        total_sgst = excluded.total_sgst,
        total_net = excluded.total_net,
        total_savings = excluded.total_savings,
        card_no = excluded.card_no,
        rank = excluded.rank,
        groc_limit = excluded.groc_limit,
        groc_drawn = excluded.groc_drawn,
        liq_limit = excluded.liq_limit,
        liq_drawn = excluded.liq_drawn,
        status = excluded.status,
        cash_tendered = excluded.cash_tendered,
        cash_change = excluded.cash_change,
        cash_voucher_no = excluded.cash_voucher_no,
        cash_receipt_no = excluded.cash_receipt_no
    `);

    stmt.run(
      String(txn.id),
      String(txn.billNo || txn.bill_no || 'CSD-BILL'),
      String(txn.indentNo || txn.indent_no || ''),
      String(txn.date || now),
      String(txn.canteen || 'URC HQ DELHI AREA (SENA BHAWAN)'),
      String(txn.terminal || 'POS-01'),
      String(txn.cashier || 'Sub Maj R.K. Yadav'),
      String(txn.manager || 'Sub Maj R.K. Yadav'),
      String(txn.paymentMode || txn.payment_mode || 'HARD CURRENCY CASH ONLY (COUNTER 01)'),
      String(txn.paymentType || txn.payment_type || 'CASH'),
      itemsJson,
      Number(txn.totalTaxable || txn.total_taxable) || 0,
      Number(txn.totalCgst || txn.total_cgst) || 0,
      Number(txn.totalSgst || txn.total_sgst) || 0,
      Number(txn.totalNet || txn.total_net) || 0,
      Number(txn.totalSavings || txn.total_savings) || 0,
      String(txn.cardNo || txn.card_no || 'LB08260547713500S01'),
      String(txn.rank || 'ASO-I (Group A Gazetted)'),
      Number(txn.grocLimit || txn.groc_limit) || 50000,
      Number(txn.grocDrawn || txn.groc_drawn) || 0,
      Number(txn.liqLimit || txn.liq_limit) || 25,
      Number(txn.liqDrawn || txn.liq_drawn) || 0,
      String(txn.status || 'COMPLETED'),
      Number(txn.cashTendered || txn.cash_tendered) || (Number(txn.totalNet) || 0),
      Number(txn.cashChange || txn.cash_change) || 0,
      String(txn.cashVoucherNo || txn.cash_voucher_no || ''),
      String(txn.cashReceiptNo || txn.cash_receipt_no || ''),
      now
    );
  }

  // --- CSD Officers Methods ---
  getCsdOfficers() {
    return this.db.prepare('SELECT * FROM csd_officers ORDER BY rank ASC').all().map(r => ({
      cardNo: r.card_no,
      rank: r.rank,
      name: r.name,
      canteen: r.canteen,
      pan: r.pan,
      grocLimit: r.groc_limit,
      liqLimit: r.liq_limit,
      grocDrawn: r.groc_drawn,
      liqDrawn: r.liq_drawn
    }));
  }

  saveCsdOfficer(officer) {
    if (!officer || !officer.cardNo) return;
    const now = new Date().toISOString();
    const stmt = this.db.prepare(`
      INSERT INTO csd_officers (
        card_no, rank, name, canteen, pan, groc_limit, liq_limit, groc_drawn, liq_drawn, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(card_no) DO UPDATE SET
        rank = excluded.rank,
        name = excluded.name,
        canteen = excluded.canteen,
        pan = excluded.pan,
        groc_limit = excluded.groc_limit,
        liq_limit = excluded.liq_limit,
        groc_drawn = excluded.groc_drawn,
        liq_drawn = excluded.liq_drawn,
        updated_at = excluded.updated_at
    `);

    stmt.run(
      String(officer.cardNo),
      String(officer.rank || ''),
      String(officer.name || ''),
      String(officer.canteen || 'URC HQ DELHI AREA'),
      String(officer.pan || ''),
      Number(officer.grocLimit || officer.groc_limit) || 50000,
      Number(officer.liqLimit || officer.liq_limit) || 25,
      Number(officer.grocDrawn || officer.groc_drawn) || 0,
      Number(officer.liqDrawn || officer.liq_drawn) || 0,
      now
    );
  }

  // --- Database Stats Diagnostic ---
  getStats() {
    const statSize = fs.existsSync(DB_PATH) ? fs.statSync(DB_PATH).size : 0;
    const countState = this.db.prepare('SELECT COUNT(*) as count FROM app_state').get().count;
    const countInv = this.db.prepare('SELECT COUNT(*) as count FROM csd_inventory').get().count;
    const countTxn = this.db.prepare('SELECT COUNT(*) as count FROM csd_transactions').get().count;
    const countOff = this.db.prepare('SELECT COUNT(*) as count FROM csd_officers').get().count;

    return {
      engine: 'SQLite (node:sqlite DatabaseSync)',
      databasePath: DB_PATH,
      fileSizeBytes: statSize,
      fileSizeKb: (statSize / 1024).toFixed(2),
      tables: {
        app_state: countState,
        csd_inventory: countInv,
        csd_transactions: countTxn,
        csd_officers: countOff
      },
      healthy: true,
      timestamp: new Date().toISOString()
    };
  }
}

const dbManager = new DatabaseManager();
module.exports = dbManager;
