/**
 * e-Office File Tracking System (FTS) Module - Interactive Version
 */
import { store } from '../state.js';

export function renderEOffice(container) {
  let state = store.get();
  let data = state.eOfficeData;
  let user = state.currentUser;

  // Local component state
  let currentTab = 'inbox'; // inbox, sent
  let activeFileId = data.inbox.length > 0 ? data.inbox[0].fileNo : null;
  if (!activeFileId && data.sent.length > 0) activeFileId = data.sent[0].fileNo;
  let activeFile = getFileById(activeFileId);

  let draftNoteText = '';
  let showESignModal = false;
  let showSendModal = false;
  let eSignStep = 1; // 1: Input, 2: OTP/PIN, 3: Success
  let rightPanelTab = 'correspondence'; // correspondence, history
  let eSignMode = 'aadhaar'; // aadhaar, usb

  function getFileById(id) {
    if (!id) return null;
    if (data.activeFile && data.activeFile.fileNo === id) return data.activeFile;
    const fromInbox = data.inbox.find(f => f.fileNo === id);
    const fromSent = data.sent.find(f => f.fileNo === id);
    if (fromInbox && fromInbox.type === 'File') {
      // Create a mock active file structure if missing
      return { ...fromInbox, notes: [{ noteNo: 1, text: 'File initiated.', author: fromInbox.from, date: fromInbox.date }] };
    }
    if (fromSent && fromSent.type === 'File') {
      return { ...fromSent, notes: [{ noteNo: 1, text: 'File sent.', author: user.name, date: fromSent.date }] };
    }
    return data.activeFile; // fallback
  }

  function reRender() {
    state = store.get();
    data = state.eOfficeData;
    activeFile = getFileById(activeFileId);

    const isReadOnly = currentTab === 'sent';
    const isHi = state.language === 'HI';
    const tr = (en, hi) => isHi ? hi : en;

    container.innerHTML = `
      <div class="page-title-strip" style="background: linear-gradient(90deg, #f0fdf4 0%, #ffffff 100%); border-bottom: 2px solid #16a34a; z-index: 10;">
        <div class="page-title-left">
          <h1 class="page-heading" style="color: #16a34a;">
            📁 ${tr('e-Office File Tracking System (FTS)', 'ई-ऑफिस फाइल ट्रैकिंग सिस्टम (FTS)')}
          </h1>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
            ${tr('National Informatics Centre (NIC) - Authentic Simulation', 'राष्ट्रीय सूचना विज्ञान केंद्र (NIC) - प्रामाणिक सिमुलेशन')}
          </div>
        </div>
        <div class="page-actions" style="display: flex; gap: 10px;">
          <button class="btn" style="background: #ffffff; border: 1px solid #cbd5e1; color: var(--text-main); font-weight: 600;">
            📥 ${tr('Receipts', 'प्राप्तियां')}
          </button>
          <button class="btn btn-primary" style="background: #16a34a; border-color: #16a34a;">
            + ${tr('Create New File', 'नई फ़ाइल बनाएं')}
          </button>
        </div>
      </div>

      <div style="display: flex; gap: 20px; height: calc(100vh - 140px); overflow: hidden;">
        
        <!-- Left Sidebar: Inbox / Sent -->
        <div style="width: 320px; flex-shrink: 0; background: #ffffff; border: 1px solid var(--border-color); border-radius: 8px; display: flex; flex-direction: column;">
          <div style="padding: 15px; border-bottom: 1px solid var(--border-light); background: #f8fafc; font-weight: 700; color: var(--goi-navy);">
            🗂️ ${tr('FTS Folders', 'FTS फ़ोल्डर')}
          </div>
          <div style="padding: 10px; display: flex; flex-direction: column; gap: 5px;">
            <div id="btn-tab-inbox" style="padding: 10px; ${currentTab === 'inbox' ? 'background: #e0f2fe; color: #0284c7;' : 'color: var(--text-main);'} font-weight: 700; border-radius: 6px; cursor: pointer; display: flex; justify-content: space-between;">
              <span>${tr('Inbox', 'इनबॉक्स')}</span>
              <span style="${currentTab === 'inbox' ? 'background: #0284c7; color: white;' : 'background: var(--border-medium); color: var(--text-main);'} padding: 2px 8px; border-radius: 12px; font-size: 11px;">${data.inbox.length}</span>
            </div>
            <div id="btn-tab-sent" style="padding: 10px; ${currentTab === 'sent' ? 'background: #e0f2fe; color: #0284c7;' : 'color: var(--text-main);'} font-weight: 600; border-radius: 6px; cursor: pointer; display: flex; justify-content: space-between;">
              <span>${tr('Sent', 'भेजा गया')}</span>
              <span style="${currentTab === 'sent' ? 'background: #0284c7; color: white;' : 'background: var(--border-medium); color: var(--text-main);'} padding: 2px 8px; border-radius: 12px; font-size: 11px;">${data.sent.length}</span>
            </div>
          </div>

          <div style="padding: 15px; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); background: #f8fafc; font-weight: 700; color: var(--goi-navy); margin-top: auto;">
            📬 ${currentTab === 'inbox' ? tr('Inbox Items', 'इनबॉक्स आइटम') : tr('Sent Items', 'भेजे गए आइटम')}
          </div>
          <div style="flex: 1; overflow-y: auto;">
            ${(currentTab === 'inbox' ? data.inbox : data.sent).map((item) => `
              <div class="file-list-item" data-id="${item.fileNo}" style="padding: 12px 15px; border-bottom: 1px solid var(--border-light); cursor: pointer; ${activeFileId === item.fileNo ? 'background: #f0fdf4; border-left: 3px solid #16a34a;' : 'background: #ffffff;'}">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-size: 10px; font-weight: 700; color: ${item.priority === 'Immediate' ? '#dc2626' : 'var(--goi-blue)'}; background: ${item.priority === 'Immediate' ? '#fecaca' : '#e0f2fe'}; padding: 2px 6px; border-radius: 4px;">${item.priority || 'Normal'}</span>
                  <span style="font-size: 10px; color: var(--text-muted);">${item.date}</span>
                </div>
                <div style="font-size: 12px; font-weight: 700; color: var(--goi-navy); margin-bottom: 4px; word-break: break-word;">
                  ${item.fileNo}
                </div>
                <div style="font-size: 11.5px; color: var(--text-main); margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${item.subject}
                </div>
                <div style="font-size: 10px; color: var(--text-muted);">
                  ${currentTab === 'inbox' ? 'From: ' + item.from : 'To: ' + item.to}
                </div>
              </div>
            `).join('')}
            ${(currentTab === 'inbox' ? data.inbox : data.sent).length === 0 ? `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 12px;">${tr('Folder Empty', 'फ़ोल्डर खाली है')}</div>` : ''}
          </div>
        </div>

        <!-- Right Main Area: Split Screen File Viewer -->
        <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden;">
          
          ${activeFile ? `
            <!-- File Header -->
            <div style="padding: 15px; border-bottom: 1px solid var(--border-light); background: #f8fafc; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 16px; font-weight: 800; color: var(--goi-navy); margin-bottom: 4px;">
                  ${activeFile.fileNo}
                </div>
                <div style="font-size: 13px; color: var(--text-main);">
                  ${activeFile.subject}
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-outline" style="font-size: 12px; padding: 6px 12px;">📎 ${tr('Attach Receipt', 'रसीद संलग्न करें')}</button>
                ${!isReadOnly ? `
                  <button id="btn-open-send-modal" class="btn btn-primary" style="font-size: 12px; padding: 6px 12px; background: #16a34a; border-color: #16a34a;">➡️ ${tr('Dispatch File', 'फ़ाइल भेजें')}</button>
                ` : ''}
              </div>
            </div>

            <!-- Split Screen View -->
            <div style="flex: 1; display: flex; overflow: hidden;">
              
              <!-- Green Notesheet Side (Left) -->
              <div style="flex: 1; border-right: 2px solid var(--border-color); display: flex; flex-direction: column; background: #f0fdf4;">
                <div style="padding: 8px 15px; background: #dcfce7; border-bottom: 1px solid #bbf7d0; font-weight: 700; color: #166534; font-size: 12px; text-transform: uppercase;">
                  📝 ${tr('Noting Side (Green Note)', 'नोटिंग पक्ष (ग्रीन नोट)')}
                </div>
                <div style="flex: 1; padding: 20px; overflow-y: auto; font-family: 'Times New Roman', serif; font-size: 15px; line-height: 1.6;" id="noting-area">
                  ${activeFile.notes.map(n => `
                    <div style="margin-bottom: 25px;">
                      <div style="font-weight: bold; text-decoration: underline; margin-bottom: 8px;">Note #${n.noteNo}</div>
                      <div style="text-align: justify; margin-bottom: 15px;">${n.text.replace(/\\n/g, '<br>')}</div>
                      <div style="text-align: right; font-weight: bold; color: #166534;">
                        ${n.author}<br>
                        <span style="font-size: 12px; font-weight: normal; color: #15803d;">${n.date}</span>
                      </div>
                      ${n.eSigned ? `
                        <div style="display: flex; justify-content: flex-end; margin-top: 15px;">
                          <div style="border: 2px solid #16a34a; border-radius: 2px; padding: 6px 10px; font-family: Arial, sans-serif; text-align: left; background: rgba(22, 163, 74, 0.05); min-width: 200px; box-shadow: inset 0 0 0 1px rgba(22,163,74,0.2);">
                            <div style="display: flex; gap: 8px; align-items: flex-start;">
                              <div style="font-size: 28px; color: #16a34a; line-height: 1;">☑</div>
                              <div>
                                <div style="font-size: 11px; font-weight: bold; color: #166534; border-bottom: 1px dotted #16a34a; padding-bottom: 2px; margin-bottom: 4px;">Signature Valid</div>
                                <div style="font-size: 9px; color: #15803d; line-height: 1.4;">
                                  Digitally signed by <strong>${n.author.split(',')[0]}</strong><br>
                                  Date: ${n.date} IST<br>
                                  Reason: e-Office Approval<br>
                                  Location: New Delhi
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}

                  ${draftNoteText ? `
                    <div style="margin-bottom: 25px; padding: 15px; background: #fef08a; border-left: 4px solid #ca8a04;">
                      <div style="font-weight: bold; color: #854d0e; margin-bottom: 8px;">[DRAFT NOTE]</div>
                      <div style="text-align: justify; margin-bottom: 15px;">${draftNoteText.replace(/\\n/g, '<br>')}</div>
                      <div style="text-align: right; font-weight: bold; color: #854d0e;">
                        ${user.name}<br>
                        <span style="font-size: 12px; font-weight: normal;">Pending e-Sign</span>
                      </div>
                    </div>
                  ` : ''}

                  <!-- Add New Note Area (only if not sent) -->
                  ${!isReadOnly ? `
                    <div style="margin-top: 40px; border: 1px dashed #22c55e; padding: 15px; border-radius: 8px; background: #ffffff;">
                      <textarea id="draft-textarea" style="width: 100%; border: none; outline: none; resize: none; background: transparent; font-family: 'Times New Roman', serif; font-size: 15px;" rows="4" placeholder="${tr('Draft a new green note...', 'नया ग्रीन नोट ड्राफ्ट करें...')}"></textarea>
                      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
                        <button id="btn-save-draft" class="btn btn-outline" style="font-size: 12px; padding: 4px 10px; color: #16a34a; border-color: #16a34a;">💾 ${tr('Save Draft', 'ड्राफ्ट सहेजें')}</button>
                        <button id="btn-open-esign" class="btn btn-primary" style="font-size: 12px; padding: 4px 10px; background: #16a34a; border-color: #16a34a;">✍️ ${tr('Digital Signature', 'डिजिटल हस्ताक्षर')}</button>
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- Right Panel: Correspondence / History -->
              <div style="flex: 1; display: flex; flex-direction: column; background: #f8fafc; border-left: 2px solid var(--border-color);">
                <div style="display: flex; background: #e2e8f0; border-bottom: 1px solid #cbd5e1;">
                  <div id="btn-tab-corr" style="flex: 1; text-align: center; padding: 8px 15px; font-weight: 700; color: ${rightPanelTab === 'correspondence' ? '#0f172a' : '#64748b'}; font-size: 12px; text-transform: uppercase; cursor: pointer; ${rightPanelTab === 'correspondence' ? 'background: #ffffff; border-bottom: 2px solid #0284c7;' : ''}">
                    📄 ${tr('Correspondence', 'पत्राचार')}
                  </div>
                  <div id="btn-tab-hist" style="flex: 1; text-align: center; padding: 8px 15px; font-weight: 700; color: ${rightPanelTab === 'history' ? '#0f172a' : '#64748b'}; font-size: 12px; text-transform: uppercase; cursor: pointer; ${rightPanelTab === 'history' ? 'background: #ffffff; border-bottom: 2px solid #0284c7;' : ''}">
                    🕒 ${tr('Audit Trail', 'ऑडिट ट्रेल')}
                  </div>
                </div>
                
                ${rightPanelTab === 'correspondence' ? `
                  <div style="flex: 1; padding: 20px; overflow-y: auto; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center; color: var(--text-muted); background: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid var(--border-light); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                      <div style="font-size: 40px; margin-bottom: 15px;">📜</div>
                      <div style="font-weight: 700; margin-bottom: 5px; color: var(--goi-navy);">${tr('Linked Receipt & Annexures', 'संलग्न रसीद और अनुलग्नक')}</div>
                      <div style="font-size: 12px; margin-bottom: 15px;">${tr('DFA (Draft for Approval) and supporting PUC attached.', 'अनुमोदन के लिए ड्राफ्ट (DFA) और PUC संलग्न है।')}</div>
                      <button class="btn btn-outline" style="font-size: 12px;">${tr('View PDF Document', 'पीडीएफ दस्तावेज़ देखें')}</button>
                    </div>
                  </div>
                ` : `
                  <div style="flex: 1; padding: 20px; overflow-y: auto;">
                    <h4 style="color: var(--goi-navy); margin-bottom: 15px; font-size: 14px;">${tr('File Movement History (FTS)', 'फ़ाइल मूवमेंट इतिहास')}</h4>
                    <div style="position: relative; border-left: 2px solid #cbd5e1; padding-left: 15px; margin-left: 8px;">
                      
                      <div style="margin-bottom: 20px; position: relative;">
                        <div style="position: absolute; left: -21px; top: 0; width: 10px; height: 10px; border-radius: 50%; background: #16a34a; border: 2px solid white;"></div>
                        <div style="font-size: 11px; color: var(--text-muted); font-weight: 600;">${activeFile.date || '05-Sep-2026'}</div>
                        <div style="font-size: 13px; font-weight: 700; color: var(--goi-navy); margin-top: 2px;">File Created</div>
                        <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">By: ${activeFile.notes && activeFile.notes.length > 0 ? activeFile.notes[0].author : 'Anurag Anil Bawaskar, ASO-I'}</div>
                        <div style="font-size: 11.5px; color: #0f172a; margin-top: 2px;">Action: File Initiated</div>
                      </div>

                      <div style="margin-bottom: 20px; position: relative;">
                        <div style="position: absolute; left: -21px; top: 0; width: 10px; height: 10px; border-radius: 50%; background: #0284c7; border: 2px solid white;"></div>
                        <div style="font-size: 11px; color: var(--text-muted); font-weight: 600;">${activeFile.date || '06-Sep-2026'}</div>
                        <div style="font-size: 13px; font-weight: 700; color: var(--goi-navy); margin-top: 2px;">Dispatched</div>
                        <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">From: ${activeFile.from || 'Anurag A Bawaskar'} &rarr; To: ${activeFile.to || 'Shri Rajender Singh, DS (Estt)'}</div>
                        <div style="font-size: 11.5px; color: #0f172a; margin-top: 2px;">Action: For Approval</div>
                      </div>

                      ${isReadOnly ? `
                        <div style="position: relative;">
                          <div style="position: absolute; left: -21px; top: 0; width: 10px; height: 10px; border-radius: 50%; background: #f59e0b; border: 2px solid white;"></div>
                          <div style="font-size: 11px; color: var(--text-muted); font-weight: 600;">Currently Active</div>
                          <div style="font-size: 13px; font-weight: 700; color: var(--goi-navy); margin-top: 2px;">Pending Action</div>
                          <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">With: ${activeFile.to}</div>
                        </div>
                      ` : `
                        <div style="position: relative;">
                          <div style="position: absolute; left: -21px; top: 0; width: 10px; height: 10px; border-radius: 50%; background: #16a34a; border: 2px solid white;"></div>
                          <div style="font-size: 11px; color: var(--text-muted); font-weight: 600;">Currently Active</div>
                          <div style="font-size: 13px; font-weight: 700; color: var(--goi-navy); margin-top: 2px;">In Inbox</div>
                          <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">With: ${user.name}</div>
                        </div>
                      `}
                    </div>
                  </div>
                `}
              </div>

            </div>
          ` : `
            <div style="flex: 1; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
              <div>${tr('Select a file from the folders to view it.', 'इसे देखने के लिए फ़ोल्डरों में से एक फ़ाइल चुनें।')}</div>
            </div>
          `}
        </div>

      </div>

      <!-- Modals -->

      <!-- Digital Signature (e-Sign & USB) Modal -->
      <div class="modal-backdrop ${showESignModal ? 'show' : ''}" id="modal-esign">
        <div class="modal-dialog" style="width: 400px;">
          <div class="modal-header">
            <div class="modal-title"><span>${eSignMode === 'usb' ? '🗝️ DSC Token (Class-3)' : '🔒 C-DAC Aadhaar e-Sign'}</span></div>
            <button class="modal-close" id="btn-close-esign">&times;</button>
          </div>
          <div class="modal-body" style="padding: 25px; text-align: center;">
            <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px;">
              <button id="btn-esign-mode-aadhaar" class="btn ${eSignMode === 'aadhaar' ? 'btn-primary' : 'btn-outline'}" style="flex: 1;">Aadhaar e-Sign</button>
              <button id="btn-esign-mode-usb" class="btn ${eSignMode === 'usb' ? 'btn-primary' : 'btn-outline'}" style="flex: 1;">USB DSC Token</button>
            </div>

            ${eSignMode === 'aadhaar' ? `
              ${eSignStep === 1 ? `
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png" style="height: 40px; margin-bottom: 15px; opacity: 0.8;" onerror="this.style.display='none'">
                <div style="font-weight: 700; margin-bottom: 10px; color: var(--goi-navy);">Aadhaar Biometric Authentication</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 15px;">Place your finger on the biometric device to digitally sign via UIDAI.</div>
                <button id="btn-request-otp" class="btn btn-primary" style="width: 100%;">Initialize Scanner</button>
              ` : eSignStep === 2 ? `
                <div style="font-weight: 700; margin-bottom: 10px; color: var(--goi-navy);">Scanning Biometrics...</div>
                <div style="position: relative; width: 120px; height: 120px; margin: 0 auto 20px auto; overflow: hidden; border: 2px solid #cbd5e1; border-radius: 12px; background: #f8fafc;">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="#94a3b8" stroke-width="2" style="opacity: 0.5;">
                    <path d="M50 10c-15 0-25 10-25 25v10c0 15 10 25 25 25s25-10 25-25V35C75 20 65 10 50 10z"/>
                    <path d="M40 30c0 5 4 10 10 10s10-5 10-10"/>
                    <path d="M35 45c0 8 6 15 15 15s15-7 15-15"/>
                    <path d="M42 60c0 4 3 8 8 8s8-4 8-8"/>
                  </svg>
                  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: #16a34a; box-shadow: 0 0 10px #16a34a; animation: scanAnim 1.5s infinite alternate;"></div>
                </div>
                <style>@keyframes scanAnim { 0% { top: 0; } 100% { top: 115px; } }</style>
                <div style="font-family: monospace; font-size: 11px; color: #16a34a; margin-bottom: 15px; background: #f0fdf4; padding: 5px; border-radius: 4px;">VERIFYING UIDAI HASH...</div>
                <button id="btn-verify-otp" class="btn btn-primary" style="width: 100%; background: #16a34a; border-color: #16a34a;">Authenticate Biometrics</button>
              ` : `
                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                <div style="font-weight: 700; color: #16a34a; font-size: 16px;">Document e-Signed Successfully</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 5px;">Your digital signature has been affixed via UIDAI Biometric e-Hastakshar.</div>
              `}
            ` : `
              ${eSignStep === 1 ? `
                <div style="font-size: 40px; margin-bottom: 15px;">🗝️</div>
                <div style="font-weight: 700; margin-bottom: 10px; color: var(--goi-navy);">Class-3 Crypto Token Detected</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 15px; padding: 10px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px;">
                  Token: <strong>e-Pass 2003 Auto</strong><br>
                  Issued To: <strong>${user.name}</strong>
                </div>
                <button id="btn-request-otp" class="btn btn-primary" style="width: 100%;">Prompt for PIN</button>
              ` : eSignStep === 2 ? `
                <div style="font-weight: 700; margin-bottom: 10px; color: var(--goi-navy);">Enter Crypto Token PIN</div>
                <input type="password" id="esign-otp-input" class="form-control" placeholder="****" style="text-align: center; font-size: 18px; letter-spacing: 4px; margin-bottom: 15px;">
                <button id="btn-verify-otp" class="btn btn-primary" style="width: 100%; background: #16a34a; border-color: #16a34a;">Authenticate & Sign</button>
              ` : `
                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                <div style="font-weight: 700; color: #16a34a; font-size: 16px;">Digitally Signed Successfully</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 5px;">Hardware DSC Token successfully verified.</div>
              `}
            `}
          </div>
        </div>
      </div>

      <!-- Dispatch/Send File Modal -->
      <div class="modal-backdrop ${showSendModal ? 'show' : ''}" id="modal-send">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title"><span>➡️ ${tr('Dispatch / Forward File', 'फ़ाइल भेजें / आगे बढ़ाएं')}</span></div>
            <button class="modal-close" id="btn-close-send">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">${tr('To Officer', 'अधिकारी को')}</label>
              <select id="send-to-officer" class="form-control">
                <option value="Shri Rajender Singh, Deputy Secretary (Estt)">Shri Rajender Singh, Deputy Secretary (Estt)</option>
                <option value="Shri Anil Kumar Chhapolia, Joint Secretary (Estt & Coord)">Shri Anil Kumar Chhapolia, Joint Secretary (Estt & Coord)</option>
                <option value="Lieutenant General N.S. Raja Subramani, CDS">Lieutenant General N.S. Raja Subramani, Chief of Defence Staff</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Action / Remarks', 'कार्रवाई / टिप्पणी')}</label>
              <select id="send-action" class="form-control">
                <option value="For Approval">For Approval</option>
                <option value="For Information">For Information</option>
                <option value="For Signature">For Signature</option>
                <option value="Please Discuss">Please Discuss</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${tr('Priority', 'प्राथमिकता')}</label>
              <select id="send-priority" class="form-control">
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Immediate">Immediate / Top Secret</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button id="btn-execute-send" class="btn btn-primary" style="width: 100%; background: #16a34a; border-color: #16a34a;">${tr('Dispatch File Now', 'अभी फ़ाइल भेजें')}</button>
          </div>
        </div>
      </div>
    `;

    attachEventHandlers();
  }

  function attachEventHandlers() {
    const doc = container;
    
    // Tab Switching
    doc.querySelector('#btn-tab-inbox')?.addEventListener('click', () => { 
      currentTab = 'inbox'; 
      activeFileId = data.inbox.length > 0 ? data.inbox[0].fileNo : null;
      draftNoteText = ''; 
      reRender(); 
    });
    doc.querySelector('#btn-tab-sent')?.addEventListener('click', () => { 
      currentTab = 'sent'; 
      activeFileId = data.sent.length > 0 ? data.sent[0].fileNo : null;
      draftNoteText = ''; 
      reRender(); 
    });

    // Right Panel Tabs
    doc.querySelector('#btn-tab-corr')?.addEventListener('click', () => {
      rightPanelTab = 'correspondence';
      reRender();
    });
    doc.querySelector('#btn-tab-hist')?.addEventListener('click', () => {
      rightPanelTab = 'history';
      reRender();
    });

    // eSign Mode Switching
    doc.querySelector('#btn-esign-mode-aadhaar')?.addEventListener('click', () => {
      if (eSignMode !== 'aadhaar') {
        eSignMode = 'aadhaar';
        eSignStep = 1;
        reRender();
      }
    });
    doc.querySelector('#btn-esign-mode-usb')?.addEventListener('click', () => {
      if (eSignMode !== 'usb') {
        eSignMode = 'usb';
        eSignStep = 1;
        reRender();
      }
    });

    // File Selection
    doc.querySelectorAll('.file-list-item').forEach(el => {
      el.addEventListener('click', () => {
        activeFileId = el.getAttribute('data-id');
        draftNoteText = '';
        reRender();
      });
    });

    // Save Draft
    doc.querySelector('#btn-save-draft')?.addEventListener('click', () => {
      const text = doc.querySelector('#draft-textarea').value.trim();
      if (text) {
        draftNoteText = text;
        reRender();
      }
    });

    // e-Sign Modal Flow
    doc.querySelector('#btn-open-esign')?.addEventListener('click', () => {
      const text = doc.querySelector('#draft-textarea').value.trim();
      if (!draftNoteText && !text) {
        alert("Please draft a note first.");
        return;
      }
      if (text && !draftNoteText) draftNoteText = text;
      showESignModal = true;
      eSignStep = 1;
      reRender();
    });

    doc.querySelector('#btn-close-esign')?.addEventListener('click', () => { showESignModal = false; reRender(); });
    
    doc.querySelector('#btn-request-otp')?.addEventListener('click', () => {
      eSignStep = 2;
      reRender();
    });

    doc.querySelector('#btn-verify-otp')?.addEventListener('click', () => {
      const otpInput = doc.querySelector('#esign-otp-input');
      if (eSignMode === 'usb') {
        if (!otpInput || otpInput.value.length === 0) {
          alert("Enter PIN for USB Token");
          return;
        }
      }

      // Success! Add note to active file
      eSignStep = 3;
      reRender();
      
      setTimeout(() => {
        // Officially mutate state
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}-Sep-2026 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
        
        const newNote = {
          noteNo: activeFile.notes.length + 1,
          text: draftNoteText,
          author: `${user.name}, ${user.designation}`,
          date: dateStr,
          eSigned: true,
          isUsbToken: eSignMode === 'usb'
        };

        store.set(curr => {
          const newInbox = curr.eOfficeData.inbox.map(f => {
            if (f.fileNo === activeFileId) {
              return { ...f, notes: [...f.notes, newNote] };
            }
            return f;
          });
          return {
            ...curr,
            eOfficeData: { ...curr.eOfficeData, inbox: newInbox, activeFile: { ...activeFile, notes: [...activeFile.notes, newNote] } }
          };
        });

        draftNoteText = '';
        showESignModal = false;
        eSignMode = 'aadhaar'; // reset
        reRender();
      }, 1500);
    });

    // Send Modal Flow
    doc.querySelector('#btn-open-send-modal')?.addEventListener('click', () => {
      showSendModal = true;
      reRender();
    });

    doc.querySelector('#btn-close-send')?.addEventListener('click', () => {
      showSendModal = false;
      reRender();
    });

    doc.querySelector('#btn-execute-send')?.addEventListener('click', () => {
      const toOfficer = doc.querySelector('#send-to-officer').value;
      const priority = doc.querySelector('#send-priority').value;
      const action = doc.querySelector('#send-action').value;

      // Mutate state: Move from Inbox to Sent
      store.set(curr => {
        const fileToMove = curr.eOfficeData.inbox.find(f => f.fileNo === activeFileId);
        const newInbox = curr.eOfficeData.inbox.filter(f => f.fileNo !== activeFileId);
        
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}-Sep-2026`;

        const sentFile = {
          ...fileToMove,
          to: toOfficer,
          date: dateStr,
          priority: priority,
          actionRemark: action
        };

        return {
          ...curr,
          eOfficeData: {
            ...curr.eOfficeData,
            inbox: newInbox,
            sent: [sentFile, ...curr.eOfficeData.sent],
            activeFile: null
          }
        };
      });

      showSendModal = false;
      currentTab = 'sent';
      activeFileId = activeFileId; // Keeps the file selected, but now it's viewed from sent
      reRender();
    });
  }

  // Initial render
  reRender();
}
