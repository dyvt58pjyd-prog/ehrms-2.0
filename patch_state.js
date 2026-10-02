const fs = require('fs');
const path = require('path');

const statePath = path.join(__dirname, 'js/state.js');
let content = fs.readFileSync(statePath, 'utf8');

const newData = `
  // AEBAS (Biometric Attendance)
  aebasRecords: [
    { date: '2026-09-08', inTime: '08:55 AM', outTime: '--:--', status: 'Present', location: 'Sena Bhawan Gate 2' },
    { date: '2026-09-07', inTime: '09:02 AM', outTime: '05:40 PM', status: 'Present', location: 'South Block Gate 4' },
    { date: '2026-09-06', inTime: '--:--', outTime: '--:--', status: 'Sunday', location: '-' },
    { date: '2026-09-05', inTime: '--:--', outTime: '--:--', status: 'Saturday', location: '-' },
    { date: '2026-09-04', inTime: '09:15 AM', outTime: '05:30 PM', status: 'Late', location: 'Sena Bhawan Gate 1' },
    { date: '2026-09-03', inTime: '08:50 AM', outTime: '06:05 PM', status: 'Present', location: 'Sena Bhawan Gate 2' }
  ],
  aebasStats: {
    avgInTime: '09:01 AM',
    avgOutTime: '05:45 PM',
    lateDays: 1,
    leavesTaken: 0,
    totalWorkingDays: 22
  },

  // CGHS Medical Claims
  cghsClaims: [
    { id: 'CGHS-DEL-2026-9011', patient: 'Shri Anil Ramkrishna Bawaskar (Father)', treatment: 'Cardiac Consultation', hospital: 'Army Hospital (R&R), Delhi Cantt', amount: 4500, status: 'Settled', date: '12-Aug-2026' },
    { id: 'CGHS-DEL-2026-8422', patient: 'Anurag Anil Bawaskar (Self)', treatment: 'Dental Extraction', hospital: 'CGHS Wellness Centre, RK Puram', amount: 1200, status: 'Pending Scrutiny', date: '04-Sep-2026' }
  ],

  // Deputation & Training
  deputationCirculars: [
    { id: 'CSS-2026-09', title: 'Foreign Training Program at LKY School of Public Policy, Singapore', department: 'DoPT', deadline: '25-Sep-2026', type: 'Training' },
    { id: 'DEP-2026-14', title: 'Vacancy for Under Secretary in Ministry of External Affairs', department: 'MEA', deadline: '30-Sep-2026', type: 'Deputation' },
    { id: 'TRG-2026-41', title: 'Mandatory Mid-Career Training Programme (Phase-III) for CSS Officers', department: 'ISTM', deadline: '15-Oct-2026', type: 'Training' }
  ],

  // e-Awas (Quarter Allotment)
  eAwasStatus: {
    appliedFor: 'Type-IV',
    preferredLocality: ['New Moti Bagh', 'RK Puram', 'Kidwai Nagar'],
    waitingListNo: 142,
    applicationDate: '15-Jan-2025',
    status: 'Waitlisted',
    entitlement: 'Eligible for Type-IV'
  },

  // e-Office File Tracking System (FTS)
  eOfficeData: {
    inbox: [
      { fileNo: 'MoD/DMA/Proc/2026/89', subject: 'Procurement of High-Altitude Drones for Northern Command', from: 'Col. Amit Sharma, Director (Acq)', date: '08-Sep-2026', type: 'File', priority: 'Immediate' },
      { fileNo: 'MoD/DMA/Pol/2026/12', subject: 'Agnipath Scheme: Review of Implementation Guidelines', from: 'Shri Rajender Singh, DS (Estt)', date: '07-Sep-2026', type: 'File', priority: 'High' },
      { fileNo: 'Receipt-10492-2026', subject: 'Representation regarding Pay Fixation Anomaly', from: 'Sena Bhawan Dak Section', date: '08-Sep-2026', type: 'Receipt', priority: 'Normal' }
    ],
    sent: [
      { fileNo: 'MoD/DMA/Estt/2026/41', subject: 'Posting & Transfer of Group B Officers', to: 'Shri Rajender Singh, DS (Estt)', date: '06-Sep-2026', type: 'File' },
      { fileNo: 'MoD/DMA/Trg/2026/08', subject: 'Nomination for National Defence College (NDC) Course', to: 'Gen. N.S. Raja Subramani, CDS', date: '01-Sep-2026', type: 'File' }
    ],
    activeFile: {
      fileNo: 'MoD/DMA/Proc/2026/89',
      subject: 'Procurement of High-Altitude Drones for Northern Command',
      notes: [
        { noteNo: 1, text: 'The proposal for procurement of 50 High-Altitude Drones has been received from Northern Command. The estimated cost is ₹120 Crores. Financial concurrence is required.', author: 'Col. Amit Sharma, Director (Acq)', date: '06-Sep-2026 10:15 AM' },
        { noteNo: 2, text: 'File forwarded to ASO-I (DMA) for initial scrutiny and linking of relevant Financial Powers Rules.', author: 'Shri Rajender Singh, DS (Estt)', date: '07-Sep-2026 14:30 PM' }
      ]
    }
  },

`;

content = content.replace('notifications: [', newData + 'notifications: [');

fs.writeFileSync(statePath, content);
console.log("state.js patched successfully.");
