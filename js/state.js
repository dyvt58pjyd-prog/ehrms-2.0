/**
 * e-HRMS 2.0 Central Data Store & State Management
 * Government of India - Ministry of Defence / Department of Military Affairs
 */

const STORAGE_KEY = 'ehrms_2_0_portal_state_v22';

const INITIAL_DATA = {
  currentUser: {
    empId: '41028104',
    pran: '110194810244',
    gpfNpsNo: 'NPS/DMA/DEL/2024/0810',
    name: 'ANURAG ANIL BAWASKAR',
    hindiName: 'अनुराग अनिल बावस्कर',
    fatherName: 'Shri Anil Ramkrishna Bawaskar',
    motherName: 'Smt. Manisha Anil Bawaskar',
    designation: 'ADDITIONAL SECTION OFFICER - I',
    hindiDesignation: 'अपर अनुभाग अधिकारी - I',
    classification: "Central Civil Services - Group 'A' (Gazetted)",
    group: "Group 'A'",
    gazettedStatus: "Gazetted Officer (Class-I / Group 'A')",
    serviceStatus: "Regular / Commissioned (Group 'A' Gazetted)",
    cadre: 'Central Secretariat Service (CSS) / Defence Civil Services (DMA)',
    ministry: 'Ministry of Defence',
    department: 'Department of Military Affairs (DMA)',
    office: 'South Block, New Delhi - 110011',
    payLevel: 'Level 7 (₹44,900 - ₹1,42,400)',
    currentBasicPay: 70000,
    cell: 'Cell 16',
    dob: '2001-12-08',
    dojGov: '2024-11-13',
    dojCurrentPost: '2025-12-16',
    superannuationDate: '2061-12-31',
    email: 'anurag.bawaskar@gov.in',
    mobile: '+91 84599 62390',
    ddoCode: '201140',
    pan: 'EYUPB3666M',
    aadhaarRef: '2444-4759-4810',
    bloodGroup: 'O+ve',
    maritalStatus: 'Single',
    gender: 'Male',
    homeState: 'Maharashtra',
    homeTown: 'Nashik',
    cghsBenId: 'CGHS/DEL/DMA/2444810',
    avatar: 'assets/avatar.svg',

    // Official Bank Particulars (PFMS Integrated)
    bankDetails: {
      accountNo: '39189241534',
      accountHolder: 'Anurag Anil Bawaskar',
      accountType: 'Savings Account (Defence Salary Package - DSP)',
      bankName: 'SBI (State Bank of India)',
      branch: 'DEFENCE BANKING BRANCH, AFS, BAREILLY',
      ifsc: 'SBIN0001818',
      micr: '243002018',
      branchCode: '01818',
      pfmsSchemeCode: 'PFMS-DEF-CIV-2024',
      pfmsStatus: 'PFMS Mandate Active & Beneficiary Verified'
    },

    // Authentic Hierarchy & Workflow Route in Department of Military Affairs
    controllingOfficer: {
      name: 'Shri Rajender Singh',
      designation: 'Deputy Secretary (Establishment)',
      department: 'Department of Military Affairs',
      email: 'ds-estt.dma@gov.in',
      empId: 'MOD-DMA-DS-204',
      room: 'Room 106, Sena Bhawan, New Delhi'
    },
    reportingOfficer: {
      name: 'Shri Anil Kumar Chhapolia',
      designation: 'Joint Secretary (Establishment & Coordination)',
      department: 'Department of Military Affairs',
      email: 'ak.chhapolia@nic.in',
      empId: 'MOD-DMA-JS-01',
      room: 'Room 214, Sena Bhawan / South Block, New Delhi'
    },
    reviewingOfficer: {
      name: 'Lieutenant General N.S. Raja Subramani',
      designation: 'Chief of Defence Staff & Secretary DMA',
      department: 'Department of Military Affairs',
      email: 'cds.dma@gov.in',
      empId: 'MOD-DMA-CDS-01',
      room: 'Room 199-C, South Block, New Delhi'
    },
    disbursingOfficer: {
      name: 'Shri R. K. Sharma, SAO',
      designation: 'Senior Accounts Officer (DDO)',
      department: 'Department of Military Affairs',
      ddoCode: '201140',
      paoCode: '001488',
      email: 'ddo-dma@gov.in',
      empId: 'MOD-DMA-DDO-04',
      room: 'Room 102, Sena Bhawan, New Delhi'
    }
  },

  // Genuine Department of Military Affairs (DMA) Officers Directory
  dmaOfficersDirectory: [
    {
      name: 'General Anil Chauhan, PVSM, UYSM, AVSM, SM, VSM',
      designation: 'Chief of Defence Staff (CDS) & Secretary, DMA',
      wing: 'Apex Command & Executive Leadership',
      office: 'Room 183-A, South Block, New Delhi',
      email: 'cds.dma@gov.in',
      phone: '011-23011800',
      roleType: 'Secretary'
    },
    {
      name: 'Vice Admiral Atul Anand, AVSM, VSM',
      designation: 'Additional Secretary, DMA',
      wing: 'Executive & Tri-Services Integration',
      office: 'Room 185, South Block, New Delhi',
      email: 'as-dma@gov.in',
      phone: '011-23012111',
      roleType: 'Additional Secretary'
    },
    {
      name: 'Lieutenant General N.S. Raja Subramani',
      designation: 'Chief of Defence Staff & Secretary DMA',
      wing: 'Civil Establishment, Cadre Administration & Inter-Ministerial Coord',
      office: 'Room 199-C, South Block, New Delhi',
      email: 'cds.dma@gov.in',
      phone: '011-23013890',
      roleType: 'Joint Secretary (Cadre Admin)'
    },
    {
      name: 'Shri Kumar Ravi Kant Singh, IAS',
      designation: 'Joint Secretary (Works & Parliament)',
      wing: 'Defence Works, Infrastructure & Parliamentary Business',
      office: 'Room 189-B, South Block, New Delhi',
      email: 'krk.singh@ias.nic.in',
      phone: '011-23014120',
      roleType: 'Joint Secretary'
    },
    {
      name: 'Maj Gen G. S. Choudhry',
      designation: 'Joint Secretary (Army & Territorial Army)',
      wing: 'Indian Army Affairs & Territorial Army Administration',
      office: 'Room 188-A, South Block, New Delhi',
      email: 'js-army.dma@gov.in',
      phone: '011-23012980',
      roleType: 'Joint Secretary'
    },
    {
      name: 'Rear Admiral Kunal Singh Rajkumar',
      designation: 'Joint Secretary (Navy & Defence Staff)',
      wing: 'Indian Navy Affairs & Joint Operations Staff',
      office: 'Room 190, South Block, New Delhi',
      email: 'js-navy.dma@gov.in',
      phone: '011-23013440',
      roleType: 'Joint Secretary'
    },
    {
      name: 'Air Vice Marshal Vikram Gaur',
      designation: 'Joint Secretary (Air & Staff Duties)',
      wing: 'Indian Air Force Affairs & Strategic Staff Duties',
      office: 'Room 192, South Block, New Delhi',
      email: 'js-air.dma@gov.in',
      phone: '011-23014550',
      roleType: 'Joint Secretary'
    },
    {
      name: 'Shri Anil Kumar Chhapolia',
      designation: 'Joint Secretary (Establishment & Coordination)',
      wing: 'Establishment-I, Civil-Military Staffing & Service Records',
      office: 'Room 214, Sena Bhawan, New Delhi',
      email: 'ak.chhapolia@nic.in',
      phone: '011-23019812',
      roleType: 'Director (Reporting Officer for ASO-I)'
    },
    {
      name: 'Shri Rajender Singh',
      designation: 'Deputy Secretary (Establishment)',
      wing: 'Section Officer / ASO Cadre Management, Leaves & Scrutiny',
      office: 'Room 106, Sena Bhawan, New Delhi',
      email: 'ds-estt.dma@gov.in',
      phone: '011-23015523',
      roleType: 'Under Secretary (Branch Officer)'
    },
    {
      name: 'Shri Pradeep Kumar, SAO',
      designation: 'Drawing & Disbursing Officer (DDO)',
      wing: 'Cash & Accounts Branch (DDO Code: 10501)',
      office: 'Room 102, Sena Bhawan, New Delhi',
      email: 'ddo-dma@gov.in',
      phone: '011-23017789',
      roleType: 'DDO'
    }
  ],

  activeRole: 'EMPLOYEE', // 'EMPLOYEE' | 'APPROVER' | 'BRANCH_OFFICER' | 'DDO' | 'ADMIN'
  language: 'EN', // 'EN' | 'HI'
  highContrast: false,
  fontSize: 'NORMAL', // 'SMALL' | 'NORMAL' | 'LARGE'

  // Central Civil Services (CCS Leave Rules, 1972)
  leaveBalances: {
    CL: { name: 'Casual Leave', hindi: 'आकस्मिक अवकाश', opening: 8, credited: 8, availed: 2, balance: 6, unit: 'days' },
    RH: { name: 'Restricted Holiday', hindi: 'प्रतिबंधित अवकाश', opening: 2, credited: 2, availed: 0, balance: 2, unit: 'days' },
    EL: { name: 'Earned Leave', hindi: 'अर्जित अवकाश', opening: 30, credited: 15, availed: 3, balance: 42, max: 300, unit: 'days' },
    HPL: { name: 'Half Pay Leave', hindi: 'अर्ध वेतन अवकाश', opening: 20, credited: 10, availed: 0, balance: 30, unit: 'days' },
    COMMUTED: { name: 'Commuted Leave', hindi: 'रूपांतरित अवकाश', balance: 15, unit: 'days' },
    CCL: { name: 'Child Care Leave', hindi: 'बाल देखरेख अवकाश', opening: 0, availed: 0, balance: 0, unit: 'days' },
    PATERNITY: { name: 'Paternity Leave', hindi: 'पितृत्व अवकाश', availed: 0, balance: 0, unit: 'days' }
  },

  leaveApplications: [
    {
      id: 'LV-2026-98343',
      type: 'EL',
      typeName: 'Earned Leave',
      startDate: '2026-09-21',
      endDate: '2026-09-23',
      days: 3,
      reason: 'For Outdoor Work, of My Sister regarding her MBA Admission Counselling.',
      stationLeave: true,
      stationLeaveAddress: 'Bawaskar Niwas, Ramdaspeth, Nashik (Maharashtra)',
      emergencyContact: '+91 9822453218',
      status: 'SANCTIONED',
      appliedOn: '2026-09-08',
      approvedBy: 'Shri Anil Kumar Chhapolia (Joint Secretary - Estt & Coord, DMA)',
      approvedOn: '2026-09-08',
      sanctionOrderNo: 'MOD/DMA/ESTT-I/LV/2026/412',
      workflowRoute: [
        { role: 'Applicant', officer: 'Anurag Anil Bawaskar (ASO-I)', action: 'Application Submitted', date: '08-Sep-2026 08:15' },
        { role: 'Branch Officer', officer: 'Shri Rajender Singh (Deputy Secretary, Estt)', action: 'Scrutinized & Recommended', date: '08-Sep-2026 08:15' },
        { role: 'Sanctioning Authority', officer: 'Shri Anil Kumar Chhapolia (Joint Secretary, DMA)', action: 'Sanctioned via Aadhaar e-Sign', date: '08-Sep-2026 08:16' }
      ]
    },
    {
      id: 'LV-2026-00412',
      type: 'CL',
      typeName: 'Casual Leave',
      startDate: '2026-09-15',
      endDate: '2026-09-16',
      days: 2,
      reason: 'Urgent family domestic commitment and personal paperwork at hometown Nashik',
      stationLeave: true,
      stationLeaveAddress: 'Bawaskar Niwas, Ramdaspeth, Nashik (Maharashtra)',
      emergencyContact: '+91 9822453218',
      status: 'SANCTIONED',
      appliedOn: '2026-09-01',
      approvedBy: 'Shri Anil Kumar Chhapolia (Joint Secretary - Estt & Coord, DMA)',
      approvedOn: '2026-09-02',
      sanctionOrderNo: 'MoD/DMA/Estt-I/LV/2026/412',
      workflowRoute: [
        { role: 'Applicant', officer: 'Anurag Anil Bawaskar (ASO-I)', action: 'Application Submitted', date: '01-Sep-2026 10:15' },
        { role: 'Branch Officer', officer: 'Shri Rajender Singh (Deputy Secretary, Estt)', action: 'Scrutinized & Recommended', date: '01-Sep-2026 14:30' },
        { role: 'Sanctioning Authority', officer: 'Shri Anil Kumar Chhapolia (Joint Secretary, DMA)', action: 'Sanctioned via Aadhaar e-Sign', date: '02-Sep-2026 11:00' }
      ]
    },
    {
      id: 'LV-2026-00455',
      type: 'RH',
      typeName: 'Restricted Holiday',
      startDate: '2026-09-22',
      endDate: '2026-09-22',
      days: 1,
      reason: 'Festive observance (Anant Chaturdashi)',
      stationLeave: false,
      status: 'PENDING',
      appliedOn: '2026-09-03',
      approvedBy: null,
      approvedOn: null,
      sanctionOrderNo: null,
      workflowRoute: [
        { role: 'Applicant', officer: 'Anurag Anil Bawaskar (ASO-I)', action: 'Application Submitted', date: '03-Sep-2026 11:20' },
        { role: 'Branch Officer', officer: 'Shri Rajender Singh (Deputy Secretary, Estt)', action: 'Forwarded for Sanction', date: '03-Sep-2026 15:45' },
        { role: 'Sanctioning Authority', officer: 'Shri Anil Kumar Chhapolia (Joint Secretary, DMA)', action: 'Awaiting Sanction & e-Sign', date: 'Pending' }
      ]
    }
  ],

  // e-Service Book records (25+ service sub-books)
  serviceBook: {
    education: [
      { degree: 'B.Tech in Computer Science & Cyber Security', inst: 'Indian Institute of Technology (IIT) Delhi / NFSU', year: '2023', grade: 'First Class with Distinction (9.1 CGPA)' },
      { degree: 'Senior Secondary Certificate (Class XII - Science)', inst: 'Central Board of Secondary Education (CBSE)', year: '2019', grade: 'First Division (94.6%)' },
      { degree: 'Secondary School Examination (Class X)', inst: 'Central Board of Secondary Education (CBSE)', year: '2017', grade: 'First Division (95.2%)' }
    ],
    family: [
      { name: 'Shri Anil Ramkrishna Bawaskar', relationship: 'Father', dob: '1976-10-17', bloodGroup: 'O+ve', cghsCardNo: 'CGHS/DEL/DMA/2444810-01', dependent: true, occupation: 'Reserved Police Sub-Inspector (RSI)' },
      { name: 'Smt. Manisha Anil Bawaskar', relationship: 'Mother', dob: '1981-06-01', bloodGroup: 'Blood Group not known', cghsCardNo: 'CGHS/DEL/DMA/2444810-02', dependent: true, occupation: 'House Wife' },
      { name: 'Kumari Rohini Anil Bawaskar', relationship: 'Sister', dob: '2004-05-26', bloodGroup: 'Blood Group not known', cghsCardNo: 'CGHS/DEL/DMA/2444810-03', dependent: true, occupation: 'Bachelor of Science' }
    ],
    nominations: [
      { type: 'Death-cum-Retirement Gratuity (DCRG)', nominee: 'Shri Anil Ramkrishna Bawaskar (Father)', share: '50%', altNominee: 'Smt. Manisha Anil Bawaskar (Mother - 50%)', regDate: '2024-11-20' },
      { type: 'National Pension System (NPS)', nominee: 'Smt. Manisha Anil Bawaskar (Mother)', share: '50%', altNominee: 'Shri Anil Ramkrishna Bawaskar (Father - 50%)', regDate: '2024-11-20' },
      { type: 'Central Govt Employees Group Insurance (CGEGIS) - Group A Scheme', nominee: 'Smt. Manisha Anil Bawaskar (Mother)', share: '100%', altNominee: 'Shri Anil Ramkrishna Bawaskar (Father)', regDate: '2024-11-20' }
    ],
    serviceHistory: [
      {
        post: 'Lead Technical Operations Specialist (Special Operation Task Force)',
        dept: 'Department of Defence & DMA, Ministry of Defence, South Block, New Delhi',
        payLevel: 'Level 7',
        from: '2026-09-12',
        to: 'Till Further Orders',
        orderNo: 'MoD/DoD/OPS-SPL/2026/8104-SEC',
        remarks: 'Special Combined Operational Deployment (Task Force VAJRA-SHAKTI). Location Classified (To be disclosed at Apex Briefing on 12-Sep-2026). Attached to Special Operations Task Force.'
      },
      {
        post: 'Chief Information Security Officer',
        dept: 'Ministry of Electronics and Information Technology (MeitY), Electronics Niketan, New Delhi',
        payLevel: 'Level 7',
        from: '2024-11-13',
        to: '2025-05-31',
        orderNo: 'MeitY/CISO/Direct-Appt/2024/781',
        remarks: 'Initial Commissioning / Appointment from 13 November 2024; Critical IT Infrastructure Security & CERT-In Coordination'
      },
      {
        post: 'Deputy Security Analyst',
        dept: 'Ministry of Home Affairs (MHA) & Cabinet Secretariat, Rashtrapati Bhavan / North Block',
        payLevel: 'Level 7',
        from: '2025-06-01',
        to: '2025-12-15',
        orderNo: 'CabSec/MHA/Sec-Analyst/2025/104',
        remarks: 'Strategic Threat Intelligence Analysis, Cabinet Briefings & National Security Operations'
      },
      {
        post: 'Additional Section Officer - I',
        dept: 'Defence Research & Development Organisation (DRDO), Dighi, Pune',
        payLevel: 'Level 7',
        from: '2026-09-08',
        to: 'Present',
        orderNo: 'MoD/DRDO/Estt/2026/102',
        remarks: 'Transferred from Rashtrapati Bhawan, New Delhi. Joint Staff Coordination & Defence Cyber Infrastructure'
      },
      {
        post: 'Additional Section Officer - I',
        dept: 'Department of Military Affairs, Ministry of Defence, South Block, New Delhi',
        payLevel: 'Level 7',
        from: '2025-12-16',
        to: '2026-09-07',
        orderNo: 'MoD/DMA/Estt-I/2025/892',
        remarks: 'Tri-Services Military Administration, Joint Staff Coordination & Defence Cyber Infrastructure'
      }
    ],
    payFixation: [
      {
        date: '2026-07-01',
        event: 'Pay Fixation under FR 22(I)(a)(1) & Cyber Security Cadre Rationalization',
        basicPay: 70000,
        level: 'Level 7',
        cell: 'Cell 16',
        orderNo: 'MoD/DMA/Pay-Fix/2026/118',
        sanctionDate: '2026-06-25',
        ruleReference: 'FR 22(I)(a)(1) read with DoPT OM No. 12/3/2009-Pay-I',
        remarks: 'Sanctioned by Joint Secretary (Estt & Coord, DMA). Protects previous emoluments drawn as CISO (MeitY) & Deputy Security Analyst (Cabinet Secretariat). Next increment due 01.07.2027 (Cell 17: ₹72,100).'
      },
      {
        date: '2025-07-01',
        event: 'Annual Increment under Rule 10 of CCS (RP) Rules, 2016',
        basicPay: 46200,
        level: 'Level 7',
        cell: 'Cell 2',
        orderNo: 'CabSec/MHA/Pay-Inc/2025/33',
        sanctionDate: '2025-06-20',
        ruleReference: 'Rule 10 of CCS (Revised Pay) Rules, 2016',
        remarks: 'Granted upon completing 6 months qualifying service in Cabinet Secretariat / MHA. Next increment on 01.07.2026.'
      },
      {
        date: '2024-11-13',
        event: 'Initial Commissioning & Entry Pay Fixation',
        basicPay: 44900,
        level: 'Level 7',
        cell: 'Cell 1',
        orderNo: 'MeitY/Estt-I/Direct-Appt/2024/081',
        sanctionDate: '2024-11-13',
        ruleReference: 'Rule 8 of CCS (RP) Rules, 2016',
        remarks: 'Commissioned into Central Service as Chief Information Security Officer (MeitY) at entry pay of Pay Level 7.'
      }
    ],
    trainings: [
      { course: 'Advanced Military Cyber Defense & Tactical InfoSec', inst: 'Defense Institute of Advanced Technology (DIAT) / DRDO, Pune', duration: '3 Weeks', completedOn: '2026-02-18', status: 'Completed', igotCertified: true },
      { course: 'National Cyber Security Policy & Crisis Management (CERT-In)', inst: 'CERT-In / MeitY, New Delhi', duration: '2 Weeks', completedOn: '2025-01-20', status: 'Completed', igotCertified: true },
      { course: 'General Financial Rules (GFR 2017) & Defence Procurement Procedures', inst: 'AJNIFM / Ministry of Defence', duration: '1 Week', completedOn: '2026-05-12', status: 'Completed', igotCertified: true },
      { course: 'e-Office 7.0 and e-HRMS 2.0 Paperless Workflow Master Trainer', inst: 'NIC / DoPT, New Delhi', duration: '3 Days', completedOn: '2024-12-05', status: 'Completed', igotCertified: true }
    ],
    vigilanceStatus: {
      status: 'CLEAR',
      lastClearanceDate: '2026-01-15',
      issuingAuthority: 'Lieutenant General N.S. Raja Subramani, Chief of Defence Staff, Department of Military Affairs',
      disciplinaryInquiries: 'NIL / Clear & Exemplary Record',
      penaltyImposed: 'NIL'
    }
  },

  // Tour Management (TA/DA Requisition & Claims)
  tours: [
    {
      id: 'TOUR-2026-OPS-09',
      purpose: 'Special Combined Operational Deployment (Task Force VAJRA-SHAKTI). Strategic Cyber Defence, Secure Communications & Joint Operations.',
      origin: 'Ministry of Defence, New Delhi',
      destination: 'RESTRICTED / CLASSIFIED (To be disclosed at Apex Briefing on 12-Sep-2026)',
      startDate: '2026-09-12',
      endDate: 'Till Further Orders',
      mode: 'Special Operational Military Air / Tactical Movement',
      estimatedCost: 85000,
      advanceRequested: 60000,
      advanceSanctioned: 60000,
      status: 'SANCTIONED',
      appliedOn: '2026-09-10',
      sanctionOrder: 'MoD/DoD/OPS-SPL/2026/8104-SEC',
      workflowRoute: [
        { role: 'Apex Sanctioning Authority', officer: 'General Anil Chauhan (Chief of Defence Staff)', action: 'Operational Movement Sanctioned', date: '10-Sep-2026 11:00' },
        { role: 'Controlling Authority', officer: 'Shri Anil Kumar Chhapolia (Joint Secretary, MoD)', action: 'Movement Warrant & Pass Issued', date: '10-Sep-2026 14:30' }
      ]
    },
    {
      id: 'TOUR-2026-081',
      purpose: 'Tri-Services Cyber Command Integration & Review at HQ Western Command',
      origin: 'New Delhi',
      destination: 'Chandimandir / Chandigarh',
      startDate: '2026-09-24',
      endDate: '2026-09-27',
      mode: 'Air (Economy) / Vande Bharat Executive',
      estimatedCost: 18500,
      advanceRequested: 15000,
      advanceSanctioned: 15000,
      status: 'PENDING_APPROVAL',
      appliedOn: '2026-09-02',
      sanctionOrder: null,
      workflowRoute: [
        { role: 'Applicant', officer: 'Anurag Anil Bawaskar (ASO-I)', action: 'Requisition Submitted', date: '02-Sep-2026' },
        { role: 'Controlling Officer', officer: 'Shri Anil Kumar Chhapolia (Joint Secretary, DMA)', action: 'Awaiting Advance Sanction', date: 'Pending' }
      ]
    },
    {
      id: 'TOUR-2026-042',
      purpose: 'National Strategic Security and Defense Information Symposium',
      origin: 'New Delhi',
      destination: 'Pune, Maharashtra',
      startDate: '2026-06-15',
      endDate: '2026-06-18',
      mode: 'Air (Economy)',
      estimatedCost: 24200,
      advanceRequested: 20000,
      advanceSanctioned: 20000,
      status: 'SETTLED',
      appliedOn: '2026-05-20',
      settledAmount: 23900,
      sanctionOrder: 'MoD/DMA/TA-DA/2026/042'
    }
  ],

  // LTC Module (Leave Travel Concession)
  ltc: {
    currentBlock: '2022-2025 (Grace Period up to Dec 2026)',
    entitlement: 'Economy Air / 2nd AC Train (CCS LTC Rules Level 7)',
    encashmentAvailedLifetime: 0,
    requests: [
      {
        id: 'LTC-2025-019',
        type: 'Home Town Concession',
        declaredDestination: 'Nashik, Maharashtra',
        familyMembersCovered: ['Self (Anurag Anil Bawaskar)', 'Shri Anil Ramkrishna Bawaskar (Father)', 'Smt. Manisha Anil Bawaskar (Mother)', 'Kumari Rohini Anil Bawaskar (Sister)'],
        travelDates: '2025-10-20 to 2025-10-27',
        elEncashmentDays: 0,
        advanceRequested: 35000,
        advanceSanctioned: 35000,
        status: 'SETTLED',
        totalClaimSettled: 38400,
        sanctionOrder: 'MoD/DMA/LTC/2025/081'
      }
    ]
  },

  // Claims & Reimbursements
  claims: [
    {
      id: 'CLM-2026-0044',
      category: 'Medical Reimbursement (CGHS)',
      description: 'Specialist Consultation & Diagnostic Tests at Base Hospital Delhi Cantt (CGHS Empanelled)',
      amountClaimed: 4250,
      amountAdmissible: 4250,
      status: 'APPROVED',
      appliedOn: '2026-07-15',
      sanctionedOn: '2026-07-28',
      remarks: 'Admissible as per CGHS Delhi rate card'
    },
    {
      id: 'CLM-2025-0102',
      category: 'Briefcase Allowance',
      description: 'Official Executive Bag / Briefcase (Triennial entitlement for Pay Level 7 - ₹5,000)',
      amountClaimed: 4999,
      amountAdmissible: 4999,
      status: 'APPROVED',
      appliedOn: '2025-11-10',
      sanctionedOn: '2025-11-20',
      remarks: 'GST Invoice verified for Pay Level 7'
    },
    {
      id: 'CLM-2026-0120',
      category: 'Telephone & Broadband Allowance',
      description: 'Monthly residential broadband & official mobile reimbursement for August 2026 (Max ₹1,500 + GST)',
      amountClaimed: 1650,
      amountAdmissible: 1650,
      status: 'APPROVED',
      appliedOn: '2026-09-01',
      sanctionedOn: '2026-09-03',
      remarks: 'Eligible as per MoD E.Coord guidelines'
    }
  ],

  // Annual Performance Appraisal Report (APAR / SPARROW)
  apar: {
    cycles: [
      {
        year: '2024-2025',
        reportingPeriod: '13/11/2024 to 31/03/2025',
        status: 'FINALIZED',
        selfAppraisalSubmitted: '2025-04-18',
        reportingScore: 9.6,
        reviewingScore: 9.7,
        gradingText: 'Outstanding',
        reportingOfficer: 'Shri Anil Kumar Chhapolia (Joint Secretary - Estt & Coord, DMA)',
        reviewingOfficer: 'Lieutenant General N.S. Raja Subramani (CDS & Secy, DMA)',
        resumeOfWork: 'Commissioned into Central Civil Service on 13 November 2024. Successfully spearheaded critical vulnerability assessments and cyber defensive hardening for defense networks and central ministerial databases.',
        reportingRemarks: 'An exceptionally brilliant officer with rare technical acuity, high integrity, prompt execution under crisis, and thorough administrative discipline.',
        reviewingRemarks: 'Firmly agree. Shri Bawaskar represents modern civil-military administrative excellence.'
      },
      {
        year: '2025-2026',
        reportingPeriod: '01/04/2025 to 31/03/2026',
        status: 'IN_PROGRESS',
        currentStage: 'Self-Appraisal Draft',
        deadline: '30 April 2026',
        selfAppraisalSubmitted: null,
        reportingScore: null,
        reviewingScore: null,
        gradingText: 'Awaiting Submission',
        reportingOfficer: 'Shri Anil Kumar Chhapolia, Joint Secretary (DMA)',
        reviewingOfficer: 'Lieutenant General N.S. Raja Subramani, CDS (DMA)',
        resumeOfWork: 'Coordinating joint defence information security protocols and electronic service records automation across DMA wings.',
        reportingRemarks: '',
        reviewingRemarks: ''
      }
    ]
  },

  // Immovable Property Returns (IPR - Rule 18(1) CCS Conduct Rules)
  ipr: {
    complianceYear: '2025 (Filing Period: Jan 2026)',
    status: 'SUBMITTED_AND_ACKNOWLEDGED',
    ackNo: 'IPR/DMA/2025/481024',
    filedOn: '2026-01-12',
    properties: [
      {
        id: 1,
        propertyType: 'Agricultural Land (Ancestral Family Share)',
        description: 'Undivided ancestral agricultural plot (0.8 Acres), Ramdaspeth / Umred, District Nashik, Maharashtra',
        presentValue: '₹ 24,00,000',
        acquiredInName: 'Jointly with Father (Shri Anil Bawaskar)',
        relationship: 'Self & Father',
        modeOfAcquisition: 'Ancestral Inheritance / Family Property',
        acquisitionDate: '2016-04-10',
        annualIncome: '₹ 36,000',
        priorSanctionObtained: 'Inherited - Formally notified to Cadre upon Commissioning in Nov 2024'
      }
    ]
  },

  // Salary & 7th CPC Pay Slip (Authenticated under CCS RP Rules, 2016)
  payroll: {
    basicPay: 70000, // Pay Level 7, Cell 16 (ASO-I)
    daRate: 0.53, // 53% DA as per MoF OM (₹37,100)
    hraRate: 0.30, // 30% for X Class City (Delhi) when DA >= 50% (₹21,000)
    transportAllowance: 3600, // Level 7 rate in Delhi (₹3,600)
    daOnTaRate: 0.53, // 53% DA on TA (₹1,908)
    grossSalary: 133608, // ₹70,000 + ₹37,100 + ₹21,000 + ₹3,600 + ₹1,908
    npsDeductionRate: 0.10, // 10% of (Basic + DA) = ₹10,710
    cghsDeduction: 650, // Statutory Level 7 CGHS rate (MoHFW OM S.11011/11/2016-CGHS)
    cgegisDeduction: 120, // Group 'A' Gazetted Scheme (CGEGIS 1980 rules: Gr A ₹120)
    incomeTaxTds: 3696, // Monthly TDS u/s 192 (New Tax Regime Section 115BAC calibrated)
    professionalTax: 200, // Statutory State Professional Tax (PT)
    totalDeductions: 15376, // ₹10,710 (NPS) + ₹650 (CGHS) + ₹120 (CGEGIS) + ₹3,696 (TDS) + ₹200 (PT) = ₹15,376
    netSalary: 118232, // ₹1,18,232 Net Take-Home Disbursed Salary
    govtNpsContribution: 14994, // 14% of (Basic + DA) co-contributed to PRAN
    govtCgegisContribution: 84, // Govt insurance portion for Group 'A'
    totalCostToGovt: 148886, // ₹1,33,608 + ₹15,078 + ₹200
    classification: "Central Civil Services - Group 'A' (Gazetted)",
    taxRegime: 'New Tax Regime (Section 115BAC)',
    pan: 'EYUPB3666M',
    pran: '110194810244',
    ytd: {
      financialYear: '2026-2027',
      period: 'April 2026 - August 2026 (5 Months)',
      grossPaid: 668040,
      totalDeductions: 76880,
      netDisbursed: 591160,
      employeeNps: 53550,
      govtNps: 74970,
      tdsPaid: 18480
    },
    accounting: {
      majorHead: '2052 - Secretariat-General Services',
      minorHead: '090 - Secretariat',
      subHead: '02 - Department of Military Affairs',
      detailedHead: '02.00.01 - Salaries (7th CPC)',
      billNo: 'DMA/ESTT-I/SAL-AUG-2026/0412',
      billDate: '28-Aug-2026',
      tokenNo: 'PAO/MOD/DEL/2026/0941',
      tokenDate: '29-Aug-2026',
      voucherNo: 'PAO-DMA-VR-2026-08104',
      voucherDate: '31-Aug-2026',
      ddoCode: '10501 (DDO, Department of Military Affairs)',
      paoCode: '001488 (PAO, Ministry of Defence, South Block)',
      pfmsSanctionId: 'PFMS-MOD-DMA-2026-AUG-8104',
      utr: 'SBIN0001818948102'
    }
  },

  // Official Office Memorandums (OMs) & Gazette Circulars
  circulars: [
    {
      id: 'MHA/CIS/2026/89',
      date: '28-09-2026',
      title: 'MHA Directive on Physical Security Audits & Biometric Access Control for Critical Installations',
      subject: 'Mandatory directive from Ministry of Home Affairs requiring immediate physical security audits, perimeter access control reinforcement, and transition to Aadhaar-enabled Biometric Access Control (AEBAS) for all High-Security zones in South Block.',
      category: 'Security & Vigilance',
      authority: 'Ministry of Home Affairs (MHA), Internal Security Div',
      classification: 'RESTRICTED',
      file: 'MHA_Security_Directive_2026.pdf',
      isNew: true
    },
    {
      id: 'DMA/AFHQ/2026/41',
      date: '25-09-2026',
      title: 'Rationalization of Armed Forces Headquarters Civil Service (AFHQ CS) Cadre',
      subject: 'Department of Military Affairs order outlining the optimization of Group A and B posts within the AFHQ Civil Service, including the merger of redundant sections and the introduction of a new Digital Transformation task force.',
      category: 'Service Rules & Welfare',
      authority: 'Department of Military Affairs (DMA.gov.in)',
      classification: 'OFFICIAL GAZETTE',
      file: 'DMA_AFHQ_Rationalization_2026.pdf',
      isNew: true
    },
    {
      id: 'MOD/ESTT/2026/OM-12',
      date: '20-09-2026',
      title: 'Implementation of SPARROW for all MoD Civilian Employees (Group B & C)',
      subject: 'Official Memorandum from MoD Establishment mandating the transition of all Group B and C civilian personnel to the Smart Performance Appraisal Report Recording Online Window (SPARROW) system for APAR recording for the current cycle.',
      category: 'Service Rules & Welfare',
      authority: 'Ministry of Defence (MoD.gov.in)',
      classification: 'PUBLIC OM',
      file: 'MOD_SPARROW_Implementation.pdf',
      isNew: true
    },
    {
      id: 'MoD/DoD/OPS-SPL/2026/8104-SEC',
      date: '10-09-2026',
      title: '🚨 TOP SECRET: Operational Directive for Special Task Force (Apex Command to Group \'A\' Gazetted Cadre)',
      subject: 'Constitution and Mobilization of 15-Member Strategic Joint Task Force under Ministry of Defence, New Delhi effective 12-Sep-2026 (Duration: Till Further Orders) including Shri Anurag Anil Bawaskar, Group \'A\' Gazetted Officer (Lead Technical Operations). Operational location strictly classified; disclosure at Apex In-Camera Meeting on 12-Sep-2026 at South Block War Room.',
      category: 'Special Operations & Defence',
      authority: 'Ministry of Defence / Department of Military Affairs',
      classification: 'TOP SECRET',
      file: 'Order_MoD_DoD_OPS_SPL_2026_8104.pdf',
      isNew: true,
      isSpecialOperation: true,
      downloadType: 'specialOrder'
    },
    {
      id: 'MoD/DRDO/TRF/2026/102',
      date: '08-09-2026',
      title: 'Gazette Transfer & Posting Order: Shri Anurag Anil Bawaskar, Group \'A\' Gazetted Officer, from Rashtrapati Bhavan, New Delhi to DRDO Dighi, Pune',
      subject: 'Official Gazette Transfer Order No. MoD/DRDO/TRF/2026/102: Relieving Shri Anurag Anil Bawaskar, Group \'A\' Gazetted Officer (Additional Section Officer - I / Chief Information Security Specialist) from President\'s Secretariat / Cabinet Secretariat, Rashtrapati Bhavan, New Delhi and posting to Defence Research & Development Organisation (DRDO), Dighi, Pune - 411015 with operational attachment to MoD Special Task Force.',
      category: 'Postings & Transfers',
      authority: 'Department of Defence / DRDO Establishment Wing',
      classification: 'OFFICIAL GAZETTE',
      file: 'Transfer_Order_Anurag_Bawaskar_GroupA_DRDO_Pune.pdf',
      isNew: true,
      isTransferOrder: true,
      downloadType: 'transferOrder'
    },
    {
      id: 'MoD/SEC-VET/2026/A-01',
      date: '09-09-2026',
      title: 'Apex Level-1 Top Secret Security Vetting & Clearance Certificate: Shri Anurag Anil Bawaskar',
      subject: 'National Security Multi-Agency Vetting by DIA & IB: Grant of Level-1 Top Secret Compartmented Clearance for cryptographic systems, C4I networks, and War Room operational intelligence under Operation VAJRA-SHAKTI.',
      category: 'Security & Vigilance',
      authority: 'Directorate General of Defence Intelligence & Security (DIA/IB)',
      classification: 'TOP SECRET',
      file: 'Security_Clearance_Level1_Bawaskar.pdf',
      isNew: true,
      downloadType: 'securityClearance'
    },
    {
      id: 'MoD/DRDO/CTG/2026/44',
      date: '09-09-2026',
      title: 'Sanction Order: Composite Transfer Grant (CTG) & Transportation of Personal Effects (₹1,16,000)',
      subject: 'Financial Sanction under Supplementary Rule (SR 114) for Composite Transfer Grant (80% of Basic Pay = ₹56,000) and containerized relocation allowances (₹60,000) on permanent transfer from Delhi to DRDO Dighi, Pune.',
      category: 'Pay & Allowances',
      authority: 'Department of Defence Finance & Accounts',
      classification: 'FINANCIAL SANCTION',
      file: 'CTG_Sanction_Order_2026_44.pdf',
      isNew: true,
      downloadType: 'ctgOrder'
    },
    {
      id: 'MoD/FIN/SDA/2026/89',
      date: '10-09-2026',
      title: 'Special Cyber Warfare & Mission Hardship Allowance Sanction Order (20% of Basic Pay - ₹14,000/pm)',
      subject: 'Concurrence of Integrated Financial Adviser (IFA Defence) under DFPDS Rule 8(2) for monthly Special Cyber Risk Allowance of ₹14,000 admissible to Task Force Lead Technical Officers during operational deployment.',
      category: 'Pay & Allowances',
      authority: 'Financial Adviser (Defence Services), Ministry of Defence',
      classification: 'FINANCIAL SANCTION',
      file: 'Special_Duty_Allowance_SDA_89.pdf',
      isNew: true,
      downloadType: 'specialDutyAllowance'
    },
    {
      id: 'DoPT/OM/2026/DA-53',
      date: '15-07-2026',
      title: 'Grant of Dearness Allowance (DA) to Central Government Employees Revised to 53% effective 01.07.2026',
      subject: 'Ministry of Finance Department of Expenditure OM conveying President\'s sanction for enhancing Dearness Allowance from 50% to 53% of Basic Pay for all Central Civil Services and Defence Civilian Personnel.',
      category: 'Pay & Allowances',
      authority: 'Department of Expenditure, Ministry of Finance',
      classification: 'PUBLIC OM',
      file: 'OM_DA_Revision_53pct_July2026.pdf',
      isNew: false
    },
    {
      id: 'DoPT/OM/2026/8CPC-TOR',
      date: '28-08-2026',
      title: 'Preparatory Data Gathering & Pre-Commission Terms of Reference for 8th Central Pay Commission',
      subject: 'Cabinet Secretariat directive on compilation of employee cadre distributions, DA merger thresholds, allowances rationalization, and pension indexation models for Central Civil Services.',
      category: 'Pay & Allowances',
      authority: 'Department of Personnel & Training (DoPT)',
      classification: 'POLICY DIRECTIVE',
      file: '8th_CPC_Terms_of_Reference_Advisory.pdf',
      isNew: true
    },
    {
      id: 'MOD/CYBER/2026/44',
      date: '28-06-2026',
      title: 'Enhanced Cyber Hygiene & Defence Network Security Guidelines for MoD Personnel',
      subject: 'Mandatory protocols for Information Security, multi-factor authentication, cryptographic key rotation, and zero-trust intranet architecture across all Department of Military Affairs formations.',
      category: 'Security & Vigilance',
      authority: 'Department of Military Affairs (Cyber Command)',
      classification: 'RESTRICTED',
      file: 'MOD_Cyber_Directive_2026.pdf',
      isNew: false
    },
    {
      id: 'DoPT/OM/2026/eSB-MANDATE',
      date: '02-09-2026',
      title: 'Mandatory Maintenance of Electronic Service Book (e-SB) on e-HRMS 2.0 without Physical Duplication',
      subject: 'Statutory OM under Rule 257 of GFR 2017: Discontinuation of physical Service Books and transitioning to tamper-evident cryptographic e-Service Books across all Ministries and Departments.',
      category: 'Service Rules & Welfare',
      authority: 'Department of Personnel & Training (DoPT)',
      classification: 'STATUTORY OM',
      file: 'OM_eSB_Mandatory_Sept2026.pdf',
      isNew: true
    },
    {
      id: 'MoD/DRDO/PUNE-EXP/2026/18',
      date: '04-09-2026',
      title: 'Operational Expansion & High-Performance Computing Cyber Lab Setup at DRDO Dighi, Pune',
      subject: 'Administrative approval and financial sanction for state-of-the-art Quantum Cryptographic Research Lab and Secure Telemetry Grid at DRDO Dighi campus under Chief Information Security Specialist oversight.',
      category: 'Special Operations & Defence',
      authority: 'Defence Research & Development Organisation (DRDO)',
      classification: 'RESTRICTED',
      file: 'DRDO_Pune_Cyber_Expansion_2026.pdf',
      isNew: true
    },
    {
      id: 'DoHFW/CGHS/PUNE/2026/71',
      date: '20-08-2026',
      title: 'Empanelment of Super-Specialty Hospitals & Wellness Centres under CGHS Pune & New Delhi',
      subject: 'Extension of cashless inpatient treatment facilities for Central Government beneficiaries across Pune city (including Ruby Hall Clinic, Jehangir Hospital, Command Hospital) and Delhi NCR.',
      category: 'Service Rules & Welfare',
      authority: 'Ministry of Health & Family Welfare (CGHS Wing)',
      classification: 'PUBLIC OM',
      file: 'CGHS_Pune_Empanelled_Hospitals_2026.pdf',
      isNew: false
    },
    {
      id: 'DoPT/CEA/2026/09',
      date: '12-08-2026',
      title: 'Revision of Children Education Allowance (CEA) & Hostel Subsidy Rates Pursuant to 50% DA Threshold',
      subject: 'Automatic 25% upward revision of Children Education Allowance from ₹2,250 to ₹2,812.50 per month per child and Hostel Subsidy from ₹6,750 to ₹8,437.50 per month consequent upon DA crossing 50%.',
      category: 'Pay & Allowances',
      authority: 'Department of Personnel & Training (DoPT)',
      classification: 'PUBLIC OM',
      file: 'CEA_Hostel_Subsidy_Revision_2026.pdf',
      isNew: false
    },
    {
      id: 'MoD/SEC/OSA-1923/2026',
      date: '01-09-2026',
      title: 'Enforcement Directives under Official Secrets Act 1923: Operations Security & Social Media Silence',
      subject: 'Strict directives issued by Cabinet Secretariat & MoD mandating total social media silence, geolocation masking, and secure communication channels for personnel attached to strategic task forces.',
      category: 'Security & Vigilance',
      authority: 'Ministry of Defence / Cabinet Secretariat',
      classification: 'CONFIDENTIAL',
      file: 'OSA_1923_Compliance_Directive_2026.pdf',
      isNew: false
    },
    {
      id: 'DoPT/LEAVE/2026/11',
      date: '18-07-2026',
      title: 'Comprehensive Guidelines on Special Casual Leave (SCL) for Operational Readiness & Field Exercises',
      subject: 'Provisions for grant of up to 30 days Special Casual Leave for civilian technical specialists participating in tri-services war-games, high-altitude acclimatization, and tactical mobilization drills.',
      category: 'Service Rules & Welfare',
      authority: 'Department of Personnel & Training (DoPT)',
      classification: 'PUBLIC OM',
      file: 'DoPT_SCL_Operational_Rules_2026.pdf',
      isNew: false
    },
    {
      id: 'MoD/DMA/ESTT/2026/41',
      date: '06-09-2026',
      title: 'Comprehensive Cadre Rationalization & Inter-Branch Rotational Postings of Group \'A\' Officers',
      subject: 'Establishment-I Branch rotational transfer and attachment directives for Group \'A\' Gazetted Officers across Department of Military Affairs, DRDO headquarters, and Integrated Defence Staff formations.',
      category: 'Postings & Transfers',
      authority: 'Department of Military Affairs, MoD',
      classification: 'OFFICIAL GAZETTE',
      file: 'MoD_DMA_Rotational_Postings_2026.pdf',
      isNew: true
    },
    {
      id: 'DoPT/CSS/DEP-2026/14',
      date: '30-08-2026',
      title: 'Central Staffing Scheme (CSS): Inviting Nominations for Group \'A\' Officers for Foreign & Inter-Ministry Deputations',
      subject: 'Circulation of executive vacancies for Deputy Secretary / Under Secretary levels in Ministry of External Affairs, Cabinet Secretariat, and National Technical Research Organisation (NTRO).',
      category: 'Postings & Transfers',
      authority: 'DoPT / Office of Establishment Officer',
      classification: 'PUBLIC CIRCULAR',
      file: 'CSS_Deputation_Circular_August2026.pdf',
      isNew: false
    },
    {
      id: 'MoD/C4I/COMM-GRID/2026/03',
      date: '05-09-2026',
      title: 'Tri-Services Secure C4I Terminal Protocols & Cryptographic Key Management Directive',
      subject: 'Standard Operating Procedure (SOP) for Level-1 encrypted tactical communications, automated satellite failover, and hardware security modules (HSM) across forward military formations.',
      category: 'Special Operations & Defence',
      authority: 'Integrated Defence Staff / Joint Communications Electronics Staff',
      classification: 'TOP SECRET',
      file: 'C4I_Terminal_Crypto_Directive_2026.pdf',
      isNew: true
    },
    {
      id: 'PFRDA/NPS/2026/CRA-08',
      date: '22-08-2026',
      title: 'Streamlined Online Partial Withdrawal Guidelines under NPS & UPS Options for Central Government Servants',
      subject: 'Master Circular from PFRDA on Protean CRA/NSDL online instant partial withdrawal for higher education, critical illness, and house purchase without mandatory physical nodal verification.',
      category: 'Service Rules & Welfare',
      authority: 'Pension Fund Regulatory and Development Authority (PFRDA)',
      classification: 'PUBLIC CIRCULAR',
      file: 'PFRDA_NPS_Partial_Withdrawal_Master_2026.pdf',
      isNew: false
    },
    {
      id: 'MoD/DRDO/RD-PROJECT/2026/18',
      date: '07-09-2026',
      title: 'Sanction of Project KAVACH-II: Advanced Quantum & Cyber-Physical Defence Grid at DRDO ARDE / R&DE(E) Pune',
      subject: 'Administrative approval and financial sanction of ₹42.8 Crore for implementation of Quantum Key Distribution (QKD) and secure tactical intranet architecture under DRDO Armament and Combat Engineering Cluster, Dighi, Pune.',
      category: 'Special Operations & Defence',
      authority: 'Defence Research & Development Organisation (DRDO)',
      classification: 'RESTRICTED',
      file: 'DRDO_Project_Kavach_Sanction_2026.pdf',
      isNew: true
    },
    {
      id: 'MoD/ESTT/HOUSING/2026/71',
      date: '08-09-2026',
      title: 'Priority Allotment of Type-V Government Residential Accommodation at DRDO Officers Enclave, Pashan Road, Pune',
      subject: 'Directorate of Estates & DRDO Estate Management Unit (EMU) sanction for priority transit & permanent allotment of Type-V residential quarters to Group \'A\' Gazetted Officers on operational transfer to DRDO Pune.',
      category: 'Service Rules & Welfare',
      authority: 'DRDO Estate Management Unit (EMU) & Directorate of Estates',
      classification: 'OFFICIAL GAZETTE',
      file: 'DRDO_Pune_Housing_Allotment_71.pdf',
      isNew: true
    },
    {
      id: 'DoPT/LTC/2026/33',
      date: '02-09-2026',
      title: 'Air Travel Entitlement on Official Transfer & All-India Leave Travel Concession (AILTC) for Group \'A\' Officers',
      subject: 'Guidelines regarding booking of air tickets through authorized travel agents (Balmer Lawrie, Ashoka Travels, IRCTC) and entitlement of Economy/Premium Economy class for Level 7 to Level 14 officers on permanent posting.',
      category: 'Pay & Allowances',
      authority: 'Department of Personnel & Training (DoPT) & Ministry of Civil Aviation',
      classification: 'PUBLIC OM',
      file: 'DoPT_LTC_Air_Entitlement_2026.pdf',
      isNew: false
    }
  ],

  // Notifications
  
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
      { fileNo: 'MoD/DMA/Estt/2026/41', subject: 'Posting & Transfer of Group A Gazetted Officers', to: 'Shri Rajender Singh, DS (Estt)', date: '06-Sep-2026', type: 'File' },
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

notifications: [
    { id: 99, title: '🚨 TOP SECRET: Special Operation Order Issued', message: 'MoD Order No. MoD/DoD/OPS-SPL/2026/8104-SEC issued for Special Operation effective 12-Sep-2026 until further orders. Detailed location classified; to be revealed in Apex Briefing on 12-Sep-2026 at South Block.', type: 'warning', timestamp: 'Just now' },
    { id: 1, title: 'Restricted Holiday Request', message: 'Restricted Holiday (RH) for 22-Sep-2026 is pending review with Shri Anil Kumar Chhapolia, Joint Secretary (Estt & Coord, DMA).', type: 'info', timestamp: '2 hours ago' },
    { id: 2, title: 'Casual Leave Sanctioned', message: 'CL for 15-16 Sep 2026 sanctioned by Shri Anil Kumar Chhapolia via Order MoD/DMA/Estt-I/LV/2026/412.', type: 'success', timestamp: 'Yesterday' },
    { id: 3, title: 'Vigilance Clearance Verified', message: 'Top Secret Defence Security Vetting validated by Lieutenant General N.S. Raja Subramani, CDS.', type: 'success', timestamp: '3 days ago' },
    { id: 4, title: 'Salary Disbursed', message: 'Pay Level 7 Cell 16 August 2026 salary credited (Net: ₹1,18,232) to SBI A/C 39189241534 (Defence Banking Branch, AFS Bareilly, IFSC: SBIN0001818).', type: 'success', timestamp: '31 Aug 2026' }
  ],

  // Mission Karmayogi (iGOT Capacity Building & Training)
  karmayogi: {
    totalHours: 48.5,
    learningHours: 48.5,
    cbsCredits: 620,
    completedCoursesCount: 4,
    enrolledCoursesCount: 6,
    hubLevel: "Level 4 - Advanced Practitioner (DoPT Framework)",
    courses: [
      {
        id: 'IGOT-DMA-01',
        title: "Code of Conduct & Ethics for Group 'A' Gazetted Civil Services",
        provider: 'DoPT / ISTM New Delhi',
        duration: '12 Hours',
        status: 'COMPLETED',
        completedDate: '15-Aug-2026',
        score: '96%',
        grade: 'A+',
        cbsCredits: 150,
        certificateNo: 'IGOT-CERT-2026-08104'
      },
      {
        id: 'IGOT-DMA-02',
        title: 'Cyber Security & Information Assurance in Defence Establishments',
        provider: 'DMA / CERT-In',
        duration: '10 Hours',
        status: 'COMPLETED',
        completedDate: '20-Aug-2026',
        score: '92%',
        grade: 'A',
        cbsCredits: 140,
        certificateNo: 'IGOT-CERT-2026-08142'
      },
      {
        id: 'IGOT-DMA-03',
        title: 'GFR 2017 & Public Procurement through GeM 4.0',
        provider: 'Ministry of Finance / NIFM',
        duration: '8 Hours',
        status: 'COMPLETED',
        completedDate: '28-Aug-2026',
        score: '98%',
        grade: 'A+',
        cbsCredits: 120,
        certificateNo: 'IGOT-CERT-2026-08199'
      },
      {
        id: 'IGOT-DMA-04',
        title: 'Public Financial Management System (PFMS) & Electronic DBT',
        provider: 'Controller General of Accounts (CGA)',
        duration: '6 Hours',
        status: 'COMPLETED',
        completedDate: '02-Sep-2026',
        score: '90%',
        grade: 'A',
        cbsCredits: 110,
        certificateNo: 'IGOT-CERT-2026-08221'
      },
      {
        id: 'IGOT-DMA-05',
        title: 'Defence Acquisition Procedure (DAP 2020) & Indigenous Modernisation',
        provider: 'Department of Defence Production (DDP)',
        duration: '14 Hours',
        status: 'IN_PROGRESS',
        progress: 75,
        cbsCredits: 100
      },
      {
        id: 'IGOT-DMA-06',
        title: 'Preventive Vigilance & Public Interest Disclosure (PIDPI)',
        provider: 'Central Vigilance Commission (CVC)',
        duration: '6 Hours',
        status: 'ENROLLED',
        progress: 10,
        cbsCredits: 80
      }
    ]
  },

  // Official MoD Smart Identity Card & Security Access Pass
  smartIdCard: {
    cardNo: 'MOD-ID-2024-8104',
    securityAccessZone: 'ZONE-3 (DRDO / RESEARCH FACILITIES)',
    accessClearance: 'Top Secret / Sensitive Defence Documents',
    issuedDate: '13-Nov-2024',
    validUpto: '12-Nov-2029 (5 Years)',
    issuingAuthority: 'Shri Anil Kumar Chhapolia, Joint Secretary (Establishment & Coordination), DMA',
    bloodGroup: 'O+ve',
    emergencyContact: '+91 9822453218 (Shri Anil Ramkrishna Bawaskar, Father - RSI)',
    smartChipUid: 'IND-MOD-7F89B241',
    rfidAccessId: 'DMA-GATE-SOUTH-08104'
  },

  // Official CSD Canteen & Retail Billing System
  csdBilling: {
    cardNo: 'LB08260547713500S01',
    dependentCardNo: 'LB08260547713500D01',
    canteen: 'URC HQ DELHI AREA (Sena Bhawan)',
    pin: '1234',
    rank: 'ASO-I (Group A Gazetted)',
    name: 'ANURAG ANIL BAWASKAR',
    pan: 'EYUPB3666M',
    entitlements: {
      groceriesLimit: 10000,
      groceriesDrawn: 2850,
      groceriesBalance: 7150,
      liquorLimit: 10,
      liquorDrawn: 2,
      liquorBalance: 8,
      afdEligibility: 'ELIGIBLE (Tier-1 Officer / Four Wheeler & White Goods)'
    },
    inventory: [
      { 
        id: '233243', 
        name: 'SAMSUNG GALAXY S25 5G (12/256GB) - SILVER SHADOW', 
        category: 'Electronics', 
        hsn: '8517', 
        stock: 12, 
        price: 54436.00, 
        marketPrice: 80999.00, 
        unit: 'Unit',
        specs: '15.75 cm (6.2\") FHD+ | Qualcomm Snapdragon 8 Elite (3nm) | 12GB RAM | 256GB ROM | 50MP+10MP+12MP Rear | 4000mAh | Brand Box with All Accessories | Brand Warranty till 23-05-2027 (Condition: Very Good A)'
      },
      { id: '8901030311221', name: 'AMUL PURE GHEE 1L TIN', category: 'Groceries', hsn: '0405', stock: 50, price: 580.00, marketPrice: 650.00, unit: 'Tin' },
      { id: '8901058863283', name: 'MAGGI 2-MIN NOODLES 12PK', category: 'Groceries', hsn: '1902', stock: 120, price: 144.00, marketPrice: 168.00, unit: 'Pack' },
      { id: '8901131000100', name: 'OLD MONK XXX RUM 750ML', category: 'Liquor', hsn: '2208', stock: 200, price: 450.00, marketPrice: 600.00, unit: 'Bottle' },
      { id: '8806090123456', name: 'SAMSUNG 32" SMART LED TV', category: 'Electronics', hsn: '8528', stock: 15, price: 12500.00, marketPrice: 15990.00, unit: 'Unit' },
      { id: '4902430691234', name: 'GILLETTE MACH 3 (4 CT)', category: 'Toiletries', hsn: '8212', stock: 80, price: 425.00, marketPrice: 495.00, unit: 'Pack' },
      { id: '8901725181223', name: 'TATA TEA GOLD 1KG POUCH', category: 'Groceries', hsn: '0902', stock: 95, price: 460.00, marketPrice: 540.00, unit: 'Pack' },
      { id: '8901030012224', name: 'DAWAT BASMATI RICE 5KG', category: 'Groceries', hsn: '1006', stock: 65, price: 485.00, marketPrice: 590.00, unit: 'Bag' },
      { id: '8901207011400', name: 'CADBURY CELEBRATIONS BOX', category: 'Groceries', hsn: '1806', stock: 110, price: 195.00, marketPrice: 250.00, unit: 'Box' },
      { id: '8901063140120', name: 'COLGATE TOTAL 150G (2PK)', category: 'Toiletries', hsn: '3306', stock: 140, price: 210.00, marketPrice: 260.00, unit: 'Pack' },
      { id: '8901505001011', name: 'JOHNNIE WALKER BLACK LABEL 750ML', category: 'Liquor', hsn: '2208', stock: 45, price: 2650.00, marketPrice: 3800.00, unit: 'Bottle' }
    ],
    transactions: [
      {
        id: 'CSD-TXN-2026-1002',
        billNo: 'CSD/URC/DEL/2026/10/9482',
        indentNo: 'IND-2026/10/9482',
        date: '2026-10-02 18:45:10',
        canteen: 'URC HQ DELHI AREA (Sena Bhawan)',
        terminal: 'POS-01 / IP: 192.168.1.101',
        cashier: 'Sub Maj R.K. Yadav',
        manager: 'Sub Maj R.K. Yadav',
        paymentMode: 'SBI DSP Defence Salary Package Card (Auth: 894102)',
        items: [
          { 
            id: '233243', 
            name: 'SAMSUNG GALAXY S25 5G (12/256GB) - SILVER SHADOW', 
            category: 'Electronics', 
            hsn: '8517', 
            qty: 1, 
            price: 54436.00, 
            marketPrice: 80999.00 
          }
        ],
        totalTaxable: 46132.20,
        totalCgst: 4151.90,
        totalSgst: 4151.90,
        totalNet: 54436.00,
        totalSavings: 26563.00,
        cardNo: 'LB08260547713500S01',
        rank: 'ASO-I (Group A Gazetted)',
        grocLimit: 10000,
        grocDrawn: 2850,
        liqLimit: 10,
        liqDrawn: 2,
        status: 'COMPLETED'
      },
      {
        id: 'CSD-TXN-2026-0901',
        billNo: 'CSD/URC/DEL/2026/09/8812',
        indentNo: 'IND-2026/09/8812',
        date: '2026-09-24 11:32:15',
        canteen: 'URC HQ DELHI AREA (Sena Bhawan)',
        terminal: 'POS-04 / IP: 192.168.1.104',
        cashier: 'Havildar Rajesh Kumar',
        manager: 'Sub Maj R.K. Yadav',
        paymentMode: 'SBI DSP Defence Debit Card (Auth: 891244)',
        items: [
          { id: '8901030311221', name: 'AMUL PURE GHEE 1L TIN', category: 'Groceries', hsn: '0405', qty: 2, price: 580.00, marketPrice: 650.00 },
          { id: '8901725181223', name: 'TATA TEA GOLD 1KG POUCH', category: 'Groceries', hsn: '0902', qty: 1, price: 460.00, marketPrice: 540.00 },
          { id: '4902430691234', name: 'GILLETTE MACH 3 (4 CT)', category: 'Toiletries', hsn: '8212', qty: 1, price: 425.00, marketPrice: 495.00 }
        ],
        totalTaxable: 1733.05,
        totalCgst: 155.98,
        totalSgst: 155.98,
        totalNet: 2045.00,
        totalSavings: 290.00,
        status: 'COMPLETED'
      },
      {
        id: 'CSD-TXN-2026-0814',
        billNo: 'CSD/URC/DEL/2026/08/6421',
        indentNo: 'IND-2026/08/6421',
        date: '2026-08-18 16:45:00',
        canteen: 'URC HQ DELHI AREA (Sena Bhawan)',
        terminal: 'POS-02 / IP: 192.168.1.102',
        cashier: 'Naik S.K. Sharma',
        manager: 'Sub Maj R.K. Yadav',
        paymentMode: 'UPI / BharatPe CSD Merchant (Txn: 429188201)',
        items: [
          { id: '8901030012224', name: 'DAWAT BASMATI RICE 5KG', category: 'Groceries', hsn: '1006', qty: 2, price: 485.00, marketPrice: 590.00 },
          { id: '8901058863283', name: 'MAGGI 2-MIN NOODLES 12PK', category: 'Groceries', hsn: '1902', qty: 2, price: 144.00, marketPrice: 168.00 }
        ],
        totalTaxable: 1066.10,
        totalCgst: 95.95,
        totalSgst: 95.95,
        totalNet: 1258.00,
        totalSavings: 258.00,
        status: 'COMPLETED'
      }
    ],
    afdOrders: [
      {
        id: 'AFD-2026-0041',
        date: '2026-09-10',
        itemType: 'Four Wheeler (Car)',
        model: 'Maruti Suzuki Grand Vitara Zeta AT',
        dealer: 'Rana Motors CSD Depot, Rama Road, New Delhi',
        csdPrice: 1435000,
        civilPrice: 1625000,
        savings: 190000,
        status: 'SANCTIONED & P.O. GENERATED',
        sanctionAuthority: 'Quartermaster General (QMG) Branch / CSD AFD Cell'
      }
    ]
  },

  // Special Combined Operational Deployment Task Force Order (Govt of India, Ministry of Defence)
  specialOperationOrder: {
    orderNo: 'MoD/DoD/OPS-SPL/2026/8104-SEC',
    orderDate: '10-Sep-2026',
    effectiveDate: '12-Sep-2026 (06:00 Hrs IST)',
    endDate: 'Till Further Orders (TFO) / Indefinite Operational Mandate',
    ministry: 'Ministry of Defence',
    department: 'Department of Defence & Department of Military Affairs',
    headquarters: 'South Block / Sena Bhawan, New Delhi - 110011',
    classification: 'TOP SECRET // OPERATIONAL IMMEDIATE // RESTRICTED',
    operationCodename: 'OPERATION VAJRA-SHAKTI (SPECIAL COMBINED DEPLOYMENT)',
    subject: 'Constitution and Deployment of High-Level Strategic Joint Operation Task Force for Critical Defence Infrastructure, Cyber Warfare Systems & Tri-Services Integration',
    locationStatus: 'RESTRICTED / CLASSIFIED (GRID-SEC-ALPHA)',
    locationDisclosureNote: 'Specific theatre coordinates, forward operational sectors, and ground deployment positions are strictly classified under the Official Secrets Act, 1923. The operational location, sector mandates, and tactical objectives shall be revealed exclusively during the Apex In-Camera Strategic Briefing on 12-September-2026 at 14:00 Hrs (Day after Tomorrow) at Apex War Room, South Block, New Delhi.',
    briefingMeeting: {
      date: '12-Sep-2026',
      time: '14:00 Hrs IST (Day after Tomorrow)',
      venue: 'Apex Command War Room, South Block, Ministry of Defence, New Delhi',
      chair: 'General Anil Chauhan, PVSM, UYSM, AVSM, SM, VSM (Chief of Defence Staff)'
    },
    officers: [
      {
        name: 'General Anil Chauhan, PVSM, UYSM, AVSM, SM, VSM',
        designation: 'Chief of Defence Staff (CDS) & Secretary, DMA',
        payLevel: 'Level 17 (Apex)',
        cadreLevel: 'Apex Leadership (CDS / MoD)',
        roleInOperation: 'Apex Operational Commander & Chairman of Joint Chiefs Committee',
        department: 'Department of Military Affairs / Ministry of Defence',
        station: 'South Block, New Delhi',
        contact: 'cds.dma@gov.in'
      },
      {
        name: 'Lieutenant General N.S. Raja Subramani, PVSM, AVSM, SM, VSM',
        designation: 'Vice Chief of Army Staff / Special Operations Lead',
        payLevel: 'Level 17',
        cadreLevel: 'Apex Formations Command',
        roleInOperation: 'Executive Field Formations & Tactical Operations Commander',
        department: 'Integrated Defence Staff / Indian Army',
        station: 'Sena Bhawan / South Block, New Delhi',
        contact: 'raja.subramani@gov.in'
      },
      {
        name: 'Shri Anil Kumar Chhapolia',
        designation: 'Joint Secretary (Establishment & Coordination)',
        payLevel: 'Level 14',
        cadreLevel: 'Senior Administrative Grade (SAG)',
        roleInOperation: 'Civil-Military Administrative Controller & Inter-Agency Protocol Lead',
        department: 'Department of Military Affairs, MoD',
        station: 'Room 214, Sena Bhawan / South Block, New Delhi',
        contact: 'ak.chhapolia@nic.in'
      },
      {
        name: 'Col. Devashish Sharma, SM',
        designation: 'Director (Military Operations & Special Projects)',
        payLevel: 'Level 13',
        cadreLevel: 'Director / Military Operations Cadre',
        roleInOperation: 'Tactical Operations Director & Ground Forces Liaison In-Charge',
        department: 'Department of Defence, South Block, MoD',
        station: 'South Block, New Delhi',
        contact: 'dir-ops.mod@gov.in'
      },
      {
        name: 'Shri Rajender Singh',
        designation: 'Deputy Secretary (Establishment & Field Scrutiny)',
        payLevel: 'Level 12',
        cadreLevel: 'Junior Administrative Grade (JAG)',
        roleInOperation: 'Rapid Mobilization Logistics & Personnel Deployment Scrutiny Officer',
        department: 'Department of Military Affairs, MoD',
        station: 'Room 106, Sena Bhawan, New Delhi',
        contact: 'ds-estt.dma@gov.in'
      },
      {
        name: 'Smt. Meenakshi Sundaram',
        designation: 'Under Secretary (Cyber Security & Defence Network Assurance)',
        payLevel: 'Level 11',
        cadreLevel: 'Under Secretary Cadre (Branch In-Charge)',
        roleInOperation: 'Branch Supervisory Officer & Operational Information Clearance Lead',
        department: 'Department of Defence / Cyber Command, MoD',
        station: 'South Block, New Delhi',
        contact: 'us-cyber.mod@gov.in'
      },
      {
        name: 'Shri Vikramaditya Rathore',
        designation: 'Section Officer (Estt-I / Cyber Operations Desk)',
        payLevel: 'Level 8/10',
        cadreLevel: 'Section Officer Cadre (Group B Gazetted)',
        roleInOperation: 'Section In-Charge & Operational File Routing / Executive Supervisor',
        department: 'Department of Military Affairs, MoD',
        station: 'Room 208, Sena Bhawan, New Delhi',
        contact: 'so-estt1.dma@gov.in'
      },
      {
        name: 'Shri Anurag Anil Bawaskar',
        hindiName: 'अनुराग अनिल बावस्कर',
        designation: 'Additional Section Officer - I / Chief Information Security Specialist',
        payLevel: 'Level 7 (Cell 16)',
        cadreLevel: "Group 'A' Gazetted Officer (Class-I / Defence Civil Services)",
        roleInOperation: 'Lead Technical Operations, Cyber Infrastructure Protection & Secure Communications Grid Controller',
        department: 'Ministry of Defence / DRDO',
        empId: '41028104',
        station: 'DRDO, Dighi, Pune (Attached to Special Task Force, MoD New Delhi)',
        contact: 'anurag.bawaskar@gov.in'
      },
      {
        name: 'Shri Prateek Sengupta',
        designation: 'Additional Section Officer - II (Tri-Services Logistics & Movement)',
        payLevel: 'Level 7',
        cadreLevel: 'Additional Section Officer (Group B Gazetted)',
        roleInOperation: 'Tactical Deployment Logistics, Movement Warrants & Air Passages Officer',
        department: 'Department of Military Affairs, MoD',
        empId: 'MOD-DMA-2024-8119',
        station: 'Sena Bhawan, New Delhi',
        contact: 'prateek.sengupta@gov.in'
      },
      {
        name: 'Kumari Shweta Deshmukh',
        designation: 'Additional Section Officer (Signals Intelligence & Cryptography)',
        payLevel: 'Level 7',
        cadreLevel: 'Additional Section Officer (Group B Gazetted)',
        roleInOperation: 'Encrypted Communications Protocol & C4I Terminal Security Analyst',
        department: 'Ministry of Defence / DRDO',
        empId: 'MOD-DMA-2024-8140',
        station: 'South Block, New Delhi',
        contact: 'shweta.deshmukh@gov.in'
      },
      {
        name: 'Shri Harish Chandra Joshi',
        designation: 'Senior Technical Assistant (Cyber Forensics & Threat Telemetry)',
        payLevel: 'Level 6',
        cadreLevel: 'Technical Cadre (Group B Non-Gazetted)',
        roleInOperation: 'Field Hardware Forensics, Secure Hardware Deployment & Diagnostics',
        department: 'DRDO / Department of Defence, MoD',
        empId: 'MOD-DRDO-2025-4102',
        station: 'DRDO Bhawan, New Delhi',
        contact: 'hc.joshi@gov.in'
      },
      {
        name: 'Shri Rakesh Kumar Meena',
        designation: 'Senior Secretariat Assistant (SSA / Senior Clerk)',
        payLevel: 'Level 4',
        cadreLevel: 'Senior Secretariat Assistant (CSCS)',
        roleInOperation: 'Classified Field Dossiers, Movement Verification & Secretariat Register',
        department: 'Department of Military Affairs, MoD',
        empId: 'MOD-DMA-2023-9041',
        station: 'Sena Bhawan, New Delhi',
        contact: 'rk.meena@gov.in'
      },
      {
        name: 'Kumari Priya Nair',
        designation: 'Senior Secretariat Assistant (SSA / Data Processing Assistant)',
        payLevel: 'Level 4',
        cadreLevel: 'Senior Secretariat Assistant (CSCS)',
        roleInOperation: 'Real-time Tele-Traffic Log Ingestion & Secure Field Manifest Processing',
        department: 'Ministry of Defence',
        empId: 'MOD-DMA-2023-9088',
        station: 'South Block, New Delhi',
        contact: 'priya.nair@gov.in'
      },
      {
        name: 'Shri Sandeep Verma',
        designation: 'Junior Secretariat Assistant (JSA / Communications Dispatch Clerk)',
        payLevel: 'Level 2',
        cadreLevel: 'Junior Secretariat Assistant (CSCS)',
        roleInOperation: 'Classified Signal Dispatch, Secure Telegrams & Camp Office Records',
        department: 'Department of Military Affairs, MoD',
        empId: 'MOD-DMA-2025-1104',
        station: 'Sena Bhawan, New Delhi',
        contact: 'sandeep.verma@gov.in'
      },
      {
        name: 'Shri Mohammad Tariq Khan',
        designation: 'Junior Secretariat Assistant (JSA / Secure Movement Courier)',
        payLevel: 'Level 2',
        cadreLevel: 'Junior Secretariat Assistant (CSCS)',
        roleInOperation: 'VVIP Document Protocol, Physical Secure Courier & Field Camp Logistics',
        department: 'Ministry of Defence',
        empId: 'MOD-DMA-2025-1120',
        station: 'South Block, New Delhi',
        contact: 'tariq.khan@gov.in'
      }
    ],
    directives: [
      'All named officers shall report on immediate operational alert status effective 12th September 2026, 06:00 Hrs IST.',
      'Movement warrants, communication protocols, and mission security passes shall be governed under Level-1 Top Secret Clearance.',
      'Strict radio and electronic data silence shall be maintained regarding deployment coordinates until formal disclosure at the Apex Meeting.',
      'All operational and travel expenses are admissible as Special Operational Sanction under Rule 8(2) of Delegation of Financial Powers to Defence Services (DFPDS).'
    ],
    sanctioningAuthority: {
      name: 'Shri Anil Kumar Chhapolia',
      designation: 'Joint Secretary to the Government of India',
      ministry: 'Ministry of Defence, New Delhi',
      countersignedBy: 'General Anil Chauhan, CDS & Secretary DMA'
    }
  },

  // NPS PRAN Pension Wealth (Protean CRA / NSDL Ledger)
  pensionNps: {
    pran: '110194810244',
    cra: 'Protean eGov Technologies (NSDL CRA)',
    totalCorpus: 318640,
    monthlyTotal: 25704,
    employeeTotalContributed: 139230,
    govtTotalContributed: 179410,
    overallReturnRate: '12.8% CAGR',
    tier1AccountStatus: 'ACTIVE & KYC VERIFIED',
    tier2AccountStatus: 'INACTIVE',
    fundManagers: [
      { name: 'SBI Pension Funds Pvt. Ltd.', share: '40%', nav: '₹48.62', units: '2,621.5' },
      { name: 'LIC Pension Fund Ltd.', share: '35%', nav: '₹46.18', units: '2,415.2' },
      { name: 'UTI Retirement Solutions Ltd.', share: '25%', nav: '₹47.89', units: '1,663.4' }
    ],
    assetClasses: [
      { code: 'Scheme E', name: 'Equity (Nifty/Sensex Index)', percentage: 50 },
      { code: 'Scheme C', name: 'Corporate Bonds / Debentures', percentage: 30 },
      { code: 'Scheme G', name: 'Central & State Government Securities', percentage: 20 }
    ],
    nominations: [
      { nominee: 'Smt. Manisha Anil Bawaskar', relation: 'Mother', share: '50%' },
      { nominee: 'Shri Anil Ramkrishna Bawaskar', relation: 'Father', share: '50%' }
    ]
  },

  // CPGRAMS & Employee Grievances Desk
  grievances: [
    {
      docketNo: 'DMA/E/2026/00142',
      category: 'CGHS Plastic Health Cards',
      subject: 'Issue & Dispatch of CGHS Plastic Cards for Dependent Parents',
      dateLodged: '2026-08-10',
      slaDays: 30,
      status: 'RESOLVED',
      currentStage: 'Resolved - Speed Post Consignment Tracking No. ED841029148IN delivered to Sena Bhawan',
      nodalOfficer: 'Shri Rajender Singh, DS (Estt)',
      resolutionNotes: 'CGHS cards verified and handed over. Records updated in Sub-Book 3.'
    }
  ]
};

class StateManager {
  constructor() {
    this.subscribers = [];
    this.data = this.loadState();
    this.syncFromServer();
  }

  async syncFromServer() {
    try {
      const res = await fetch('/api/state?ts=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const remoteData = await res.json();
        if (remoteData && remoteData.currentUser) {
          // If remote is different from local, adopt remote and force re-render
          if (JSON.stringify(remoteData) !== JSON.stringify(this.data)) {
            this.set(remoteData);
            if (window.ehrmsApp) {
              window.ehrmsApp.route();
            }
          }
        }
      }
    } catch (e) {
      console.warn('Backend sync failed, relying on localStorage', e);
    }
  }

  loadState() {
    try {
      let stored = null;
      if (typeof localStorage !== 'undefined') {
        stored = localStorage.getItem(STORAGE_KEY);
      }
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.currentUser?.email === INITIAL_DATA.currentUser.email && parsed?.dmaOfficersDirectory) {
          // Always ensure core official circulars, orders and Group A classification are refreshed
          parsed.specialOperationOrder = JSON.parse(JSON.stringify(INITIAL_DATA.specialOperationOrder));
          parsed.circulars = JSON.parse(JSON.stringify(INITIAL_DATA.circulars));
          parsed.serviceHistory = JSON.parse(JSON.stringify(INITIAL_DATA.serviceHistory));
          parsed.currentUser.classification = INITIAL_DATA.currentUser.classification;
          parsed.currentUser.group = INITIAL_DATA.currentUser.group;
          parsed.currentUser.gazettedStatus = INITIAL_DATA.currentUser.gazettedStatus;
          parsed.currentUser.serviceStatus = INITIAL_DATA.currentUser.serviceStatus;
          parsed.currentUser.office = INITIAL_DATA.currentUser.office;
          parsed.currentUser.department = INITIAL_DATA.currentUser.department;

          // Ensure all features from INITIAL_DATA are merged if missing in stored state
          for (const key of Object.keys(INITIAL_DATA)) {
            if (parsed[key] === undefined || parsed[key] === null) {
              parsed[key] = JSON.parse(JSON.stringify(INITIAL_DATA[key]));
            }
          }

          // Ensure LV-2026-98343 and any recently submitted applications have today's accurate date
          const now = new Date();
          const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const todayFormatted = `${String(now.getDate()).padStart(2, '0')}-${months[now.getMonth()]}-${now.getFullYear()}`;

          if (Array.isArray(parsed.leaveApplications)) {
            let found98343 = false;
            parsed.leaveApplications = parsed.leaveApplications.map(app => {
              if (app.id === 'LV-2026-98343' || app.reason?.includes('MBA Admission Counselling') || (app.appliedOn === '2026-09-05' && !['LV-2026-00412', 'LV-2026-00455'].includes(app.id))) {
                found98343 = true;
                return {
                  ...app,
                  appliedOn: todayIso,
                  approvedOn: app.approvedOn ? todayIso : app.approvedOn,
                  sanctionOrderNo: app.sanctionOrderNo || 'MOD/DMA/ESTT-I/LV/2026/412',
                  workflowRoute: (app.workflowRoute || []).map(step => {
                    if (step.date && step.date.includes('05-Sep-2026')) {
                      return { ...step, date: step.date.replace('05-Sep-2026', todayFormatted) };
                    }
                    return step;
                  })
                };
              }
              return app;
            });

            if (!found98343) {
              const def = INITIAL_DATA.leaveApplications.find(a => a.id === 'LV-2026-98343');
              if (def) parsed.leaveApplications.unshift(def);
            }
          }

          if (!parsed.csdBilling) {
            parsed.csdBilling = JSON.parse(JSON.stringify(INITIAL_DATA.csdBilling));
          } else {
            // Ensure newly added inventory items like Samsung Galaxy S25 are present
            const curIds = new Set((parsed.csdBilling.inventory || []).map(i => i.id));
            (INITIAL_DATA.csdBilling.inventory || []).forEach(item => {
              if (!curIds.has(item.id)) {
                parsed.csdBilling.inventory.unshift(item);
              }
            });

            // Ensure newly added transactions are present
            const curTxnIds = new Set((parsed.csdBilling.transactions || []).map(t => t.id));
            (INITIAL_DATA.csdBilling.transactions || []).forEach(txn => {
              if (!curTxnIds.has(txn.id)) {
                parsed.csdBilling.transactions.unshift(txn);
              }
            });
          }

          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load stored state, falling back to defaults:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  saveState() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        // Cross-sync with standalone CSD Portal keys
        if (this.data.csdBilling) {
          if (this.data.csdBilling.transactions) {
            localStorage.setItem('csd_txns', JSON.stringify(this.data.csdBilling.transactions));
          }
          if (this.data.csdBilling.inventory) {
            localStorage.setItem('csd_inventory', JSON.stringify(this.data.csdBilling.inventory));
          }
          if (this.data.csdBilling.afdOrders) {
            localStorage.setItem('csd_afd', JSON.stringify(this.data.csdBilling.afdOrders));
          }
        }
      }
      // Silently sync to backend for permanent storage
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data)
      }).catch(e => e);
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }

  get() {
    return this.data;
  }

  set(updater) {
    if (typeof updater === 'function') {
      this.data = updater(this.data);
    } else {
      this.data = { ...this.data, ...updater };
    }
    this.saveState();
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => {
      try {
        cb(this.data);
      } catch (err) {
        console.error('Subscriber error:', err);
      }
    });
  }

  resetToDefaults() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.saveState();
    this.notify();
  }
}

export const store = new StateManager();
export { INITIAL_DATA };

export const OFFICIAL_PERSONAS = {
  EMPLOYEE: {
    id: 'EMPLOYEE',
    userId: 'anurag.bawaskar',
    password: 'Anurag@2026',
    allowedIdentifiers: ['anurag.bawaskar', '8459962390', 'anurag.bawaskar@gov.in', 'mod-dma-2024-8104', 'eyupb3666m'],
    name: 'ANURAG ANIL BAWASKAR',
    hindiName: 'अनुराग अनिल बावस्कर',
    designation: 'ADDITIONAL SECTION OFFICER - I',
    hindiDesignation: 'अपर अनुभाग अधिकारी - I',
    roleTitle: 'Employee Self Service (ESS)',
    classification: "Central Civil Services - Group 'A' (Gazetted)",
    department: 'Department of Military Affairs',
    ministry: 'Ministry of Defence',
    office: 'Room 216, Sena Bhawan / South Block, New Delhi',
    email: 'anurag.bawaskar@gov.in',
    mobile: '8459962390',
    pan: 'EYUPB3666M',
    ddoCode: '10501',
    empId: '41028104',
    avatar: 'assets/avatar.svg',
    defaultRoute: 'dashboard',
    badgeClass: 'badge-sanctioned'
  },
  APPROVER: {
    id: 'APPROVER',
    userId: 'anil.chhapolia',
    password: 'Director@2026',
    allowedIdentifiers: ['anil.chhapolia', '9811024012', 'ak.chhapolia@nic.in', 'mod-dma-dir-2021', 'anil.chhapolia'],
    name: 'Shri Anil Kumar Chhapolia',
    hindiName: 'कर्नल देवाशीष शर्मा',
    designation: 'Joint Secretary (Establishment & Coordination)',
    hindiDesignation: 'निदेशक (स्थापना एवं संयुक्त स्टाफ)',
    roleTitle: 'Manager Self Service (MSS Reporting Officer)',
    classification: 'Armed Forces / Joint Secretary, DMA',
    department: 'Department of Military Affairs',
    ministry: 'Ministry of Defence',
    office: 'Room 214, Sena Bhawan, New Delhi',
    email: 'ak.chhapolia@nic.in',
    mobile: '9811024012',
    empId: 'MOD-DMA-JS-01',
    avatar: 'assets/avatar.svg',
    defaultRoute: 'approvals',
    badgeClass: 'badge-warning'
  },
  BRANCH_OFFICER: {
    id: 'BRANCH_OFFICER',
    userId: 'manoj.sinha',
    password: 'Scrutiny@2026',
    allowedIdentifiers: ['manoj.sinha', '9868133452', 'ds-estt.dma@gov.in', 'mod-dma-us-108'],
    name: 'Shri Rajender Singh',
    hindiName: 'श्री मनोज कुमार सिन्हा',
    designation: 'Deputy Secretary (Establishment)',
    hindiDesignation: 'अवर सचिव (स्थापना-I)',
    roleTitle: 'Branch Controlling Officer (Scrutiny)',
    classification: "Central Secretariat Service - Group 'A' (Gazetted)",
    department: 'Department of Military Affairs',
    ministry: 'Ministry of Defence',
    office: 'Room 106, Sena Bhawan, New Delhi',
    email: 'ds-estt.dma@gov.in',
    mobile: '9868133452',
    empId: 'MOD-DMA-DS-204',
    avatar: 'assets/avatar.svg',
    defaultRoute: 'approvals',
    badgeClass: 'badge-info'
  },
  DDO: {
    id: 'DDO',
    userId: 'ddo.10501',
    password: 'DDO@10501',
    allowedIdentifiers: ['ddo.10501', '10501', 'pradeep.kumar', 'ddo-dma@gov.in', 'mod-dma-ddo-04', '011-23017789', '01123017789'],
    name: 'Shri Pradeep Kumar, SAO',
    hindiName: 'श्री प्रदीप कुमार, व.ले.अ.',
    designation: 'Drawing & Disbursing Officer (DDO)',
    hindiDesignation: 'आहरण एवं संवितरण अधिकारी',
    roleTitle: 'DDO Cash & Payroll Disbursement',
    classification: 'Senior Accounts Officer / Defence Accounts Department',
    department: 'Department of Military Affairs',
    ministry: 'Ministry of Defence',
    office: 'Room 102, Sena Bhawan, New Delhi',
    email: 'ddo-dma@gov.in',
    phone: '011-23017789',
    ddoCode: '10501',
    paoCode: '001488',
    empId: 'MOD-DMA-DDO-04',
    avatar: 'assets/avatar.svg',
    defaultRoute: 'salary',
    badgeClass: 'badge-clear'
  },
  ADMIN: {
    id: 'ADMIN',
    userId: 'raja.subramani',
    password: 'Admin@2026',
    allowedIdentifiers: ['raja.subramani', '9810144901', 'cds.dma@gov.in', 'mod-dma-js-01', 'admin'],
    name: 'Lieutenant General N.S. Raja Subramani',
    hindiName: 'श्री अनिल कुमार छपोलिया',
    designation: 'Chief of Defence Staff & Secretary DMA',
    hindiDesignation: 'संयुक्त सचिव (स्थापना एवं समन्वय)',
    roleTitle: 'Cadre Controlling Authority (CCA)',
    classification: 'Joint Secretary / Senior Executive',
    department: 'Department of Military Affairs',
    ministry: 'Ministry of Defence',
    office: 'Room 199-C, South Block, New Delhi',
    email: 'cds.dma@gov.in',
    mobile: '9810144901',
    empId: 'MOD-DMA-CDS-01',
    avatar: 'assets/avatar.svg',
    defaultRoute: 'analytics',
    badgeClass: 'badge-primary'
  }
};
