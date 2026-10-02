/**
 * e-HRMS 2.0 - Dynamic Organization Chart Module
 * Department of Military Affairs Hierarchy Visualization
 */

import { store } from '../state.js';

export function renderOrgChart(container) {
  const state = store.get();
  const isHi = state.language === 'HI';
  const tr = (en, hi) => isHi ? hi : en;

  // Render a CSS-based tree hierarchy
  container.innerHTML = `
    <style>
      .org-tree ul {
        padding-top: 20px;
        position: relative;
        transition: all 0.5s;
        display: flex;
        justify-content: center;
      }
      .org-tree li {
        float: left;
        text-align: center;
        list-style-type: none;
        position: relative;
        padding: 20px 5px 0 5px;
        transition: all 0.5s;
      }
      /* Lines */
      .org-tree li::before, .org-tree li::after {
        content: '';
        position: absolute;
        top: 0;
        right: 50%;
        border-top: 2px solid #94a3b8;
        width: 50%;
        height: 20px;
      }
      .org-tree li::after {
        right: auto;
        left: 50%;
        border-left: 2px solid #94a3b8;
      }
      .org-tree li:only-child::after, .org-tree li:only-child::before {
        display: none;
      }
      .org-tree li:only-child {
        padding-top: 0;
      }
      .org-tree li:first-child::before, .org-tree li:last-child::after {
        border: 0 none;
      }
      .org-tree li:last-child::before {
        border-right: 2px solid #94a3b8;
        border-radius: 0 5px 0 0;
      }
      .org-tree li:first-child::after {
        border-radius: 5px 0 0 0;
      }
      /* Connectors */
      .org-tree ul ul::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        border-left: 2px solid #94a3b8;
        width: 0;
        height: 20px;
        transform: translateX(-1px);
      }
      .org-node {
        border: 1px solid #cbd5e1;
        padding: 10px;
        border-radius: 6px;
        background-color: #ffffff;
        display: inline-block;
        min-width: 160px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        transition: all 0.2s;
        cursor: pointer;
        position: relative;
      }
      .org-node:hover {
        border-color: var(--goi-navy);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        transform: translateY(-2px);
        z-index: 10;
      }
      .org-node.apex {
        background: linear-gradient(135deg, var(--goi-navy), #0f172a);
        color: white;
        border: none;
      }
      .org-node.highlight {
        border: 2px solid #16a34a;
        background: #f0fdf4;
      }
      .org-node img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 5px;
        border: 2px solid #e2e8f0;
      }
      .org-node.apex img {
        border-color: #3b82f6;
      }
      .org-node .name {
        font-size: 13px;
        font-weight: 700;
        margin-bottom: 2px;
      }
      .org-node .title {
        font-size: 10.5px;
        color: var(--text-muted);
        line-height: 1.2;
      }
      .org-node.apex .title {
        color: #cbd5e1;
      }
      .org-node-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #dc2626;
        color: white;
        font-size: 9px;
        padding: 2px 6px;
        border-radius: 10px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(220,38,38,0.3);
      }
    </style>

    <div class="page-title-strip">
      <div class="page-title-left">
        <div class="breadcrumb">
          <a href="#dashboard">e-HRMS 2.0</a> &rsaquo; <span class="current">Hierarchy</span>
        </div>
        <h1 class="page-heading">
          🏢 Dynamic Org Chart
          <span class="page-heading-hi">/ संगठनात्मक पदानुक्रम</span>
        </h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" onclick="alert('Exporting high-resolution PDF chart...')">
          📥 Download PDF Chart
        </button>
      </div>
    </div>

    <div class="gov-card" style="overflow-x: auto; padding: 40px 20px; background: #f8fafc; min-height: 500px;">
      
      <div class="org-tree">
        <ul>
          <li>
            <div class="org-node apex" onclick="alert('Viewing profile of CDS & Secretary DMA')">
              <img src="assets/avatar.svg" alt="CDS">
              <div class="name">General Anil Chauhan</div>
              <div class="title">Chief of Defence Staff &amp;<br>Secretary, DMA</div>
            </div>
            <ul>
              <li>
                <div class="org-node" onclick="alert('Viewing profile of Additional Secretary')">
                  <img src="assets/avatar.svg" alt="AS">
                  <div class="name">Shri Shantanu</div>
                  <div class="title">Additional Secretary (AS)</div>
                </div>
                <ul>
                  <li>
                    <div class="org-node" onclick="alert('Viewing profile of JS Estt')">
                      <img src="assets/avatar.svg" alt="JS">
                      <div class="name">Shri A.K. Chhapolia</div>
                      <div class="title">Joint Secretary (Estt)</div>
                      <div class="org-node-badge">Sanctioning Auth</div>
                    </div>
                    <ul>
                      <li>
                        <div class="org-node" onclick="alert('Viewing profile of DS')">
                          <img src="assets/avatar.svg" alt="DS">
                          <div class="name">Shri Rajender Singh</div>
                          <div class="title">Deputy Secretary (DS)</div>
                          <div class="org-node-badge" style="background:#0284c7">Reporting Auth</div>
                        </div>
                        <ul>
                          <li>
                            <div class="org-node highlight" onclick="alert('This is your current position in the hierarchy')">
                              <img src="assets/avatar.svg" alt="You">
                              <div class="name">Anurag A. Bawaskar</div>
                              <div class="title">ASO-I (Establishment-I)</div>
                              <div class="org-node-badge" style="background:#16a34a">You</div>
                            </div>
                          </li>
                          <li>
                            <div class="org-node">
                              <img src="assets/avatar.svg" alt="Peer">
                              <div class="name">Shri Ramesh Kumar</div>
                              <div class="title">Section Officer (SO)</div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div class="org-node">
                          <img src="assets/avatar.svg" alt="Dir">
                          <div class="name">Smt. Sunita Sharma</div>
                          <div class="title">Director (Coordination)</div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="org-node">
                      <img src="assets/avatar.svg" alt="JS">
                      <div class="name">Maj Gen R.K. Singh</div>
                      <div class="title">Joint Secretary (Army)</div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  `;
}
