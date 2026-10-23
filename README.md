# Talent & Verification Hub 🛡️
### AI/NLP HR Candidate Verification & Social Media Footprint Analysis (SIH 2024)

A production-ready React & Tailwind CSS dashboard for HR recruiters to screen candidate digital footprints, verify college backgrounds via DigiLocker/AICTE, audit past work tenure against EPFO records, and validate credential authenticity via cryptographic serial hashes.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Open your terminal inside this folder (`talent-verification-hub`):
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 📁 Project Structure

```
talent-verification-hub/
├── index.html              # HTML Entry Point
├── package.json            # Project dependencies & scripts (named talent-verification-hub)
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── src/
│   ├── main.jsx            # React root mount
│   ├── index.css           # Tailwind base styles & smooth scrollbars
│   └── App.jsx             # Complete, single-file Interactive Hub
└── README.md
```

---

## 🎯 Key Features Included

1. **Executive Metrics Bar:** Real-time KPI counters (Total Profiles Scanned, Verified Certificates, Fraud Flags Detected, Avg Screening Time Saved).
2. **Interactive Candidate Directory:**
   - Real-time instant search by Candidate Name, Role, or College.
   - Filter tabs: *All Candidates*, *Verified Profiles*, *Under Review*, *Flagged Claims*.
   - Rich Profile Cards with AI Trust Match Circular Meter, College Details, Work Experience Timeline, and Social Footprint Badges.
3. **Working Certificate & Credentials Modal:**
   - Pop-up modal displaying digital credentials, issuing bodies, and cryptographic hash keys.
   - Live **"Verify Hash Key"** button that runs a real-time cryptographic ledger audit.
4. **Live Footprint Authenticator Tool (Tab 2):**
   - Simulated background verification sandbox with test presets.
   - Multi-step scanning progress (LinkedIn, DigiLocker, EPFO, Blockchain).
   - Generates Trust Score, Authenticity Breakdown, and Fraud Flags with an "Add to Directory" action.
