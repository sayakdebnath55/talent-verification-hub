// =============================================================================
// Social Media Analytics — Talent & Verification Hub
// Smart India Hackathon (SIH) Field Project
// Complete Single-File React + Tailwind CSS Application
// =============================================================================

import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  Search, Shield, ShieldCheck, ShieldAlert, Award, Briefcase,
  GraduationCap, CheckCircle2, XCircle, Clock, TrendingUp,
  Users, Eye, X, Linkedin, Github, Globe, Zap, Lock, Hash,
  ChevronRight, AlertTriangle, Info, Download, RefreshCw,
  Fingerprint, BadgeCheck, ExternalLink, Filter, Sparkles,
  Check, ArrowUpRight, SlidersHorizontal, PlusCircle,
  FileText, Upload, Trash2
} from "lucide-react";

// =============================================================================
// ── Section 1: Initial Mock Candidate Database ───────────────────────────────
// Pre-loaded realistic tech candidates tailored for Indian HR Screening viva
// =============================================================================
const INITIAL_CANDIDATES = [
  {
    id: "SIH-2024-001",
    name: "Rahul Sharma",
    avatar: "RS",
    avatarBg: "from-amber-500 to-rose-600",
    role: "Full Stack Web Developer",
    status: "flagged", // 'verified' | 'under_review' | 'flagged'
    trustScore: 52,
    trustLabel: "Caution Flagged",
    appliedDate: "Oct 21, 2024",
    location: "Pune, Maharashtra",

    // Education & College details
    education: {
      degree: "B.Tech in Artificial Intelligence & Machine Learning",
      college: "Alard University, Pune",
      year: "2022",
      cgpa: "7.4 / 10",
      verified: true,
      verificationSource: "DigiLocker & AICTE Database Verified",
    },

    // Total experience & company timeline
    experienceTotal: "2.5 Years Total",
    experienceTimeline: [
      {
        company: "Tata Consultancy Services (TCS)",
        role: "Software Engineer",
        duration: "1.5 Years (2023 – Present)",
        verified: true,
        source: "EPFO UAN Records Verified",
      },
      {
        company: "Wipro Technologies",
        role: "Junior Web Developer",
        duration: "1.0 Year Claimed (2022 – 2023)",
        verified: false,
        source: "Discrepancy: EPFO records indicate only 4 months active payroll tenure",
      },
    ],

    // Social digital footprint
    socialFootprint: {
      linkedin: {
        url: "linkedin.com/in/rahulsharma-dev",
        status: "Profile Active (650+ connections)",
        verified: true,
      },
      github: {
        username: "rahul-codes",
        repos: 14,
        commits: 82,
        verified: true,
      },
      portfolio: {
        url: "https://rahulsharma.dev",
        status: "Live Portfolio",
        verified: true,
      },
    },

    // Certificate vault
    certificates: [
      {
        id: "CERT-CRSA-8821",
        title: "Full Stack Web Development Specialization",
        issuer: "Coursera / Meta",
        issueDate: "Aug 2022",
        serialHash: "0x7A4F89D201B456C1",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 15, 2024",
      },
      {
        id: "CERT-NPTEL-4410",
        title: "Cloud Computing & Distributed Systems",
        issuer: "NPTEL / IIT Kharagpur",
        issueDate: "Nov 2022",
        serialHash: "0x9D2E33A198B75432",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 15, 2024",
      },
      {
        id: "CERT-IBM-9902",
        title: "Enterprise Blockchain Developer Certificate",
        issuer: "IBM Skills Network",
        issueDate: "Jan 2023",
        serialHash: "0xDEAD88BFA0129999",
        verified: false,
        verificationTimestamp: "Tampered Hash: Serial Key not found in IBM Registry",
      },
    ],

    // Specific fraud alerts detected by NLP/APIs
    fraudFlags: [
      "Experience Mismatch: Claimed 1.0 Year at Wipro, but official EPFO records confirm only 4 months tenure.",
      "Tampered Credential: IBM Certificate serial hash 0xDEAD... failed cryptographic checksum verification.",
    ],
  },

  {
    id: "SIH-2024-002",
    name: "Aarav Patel",
    avatar: "AP",
    avatarBg: "from-indigo-600 to-blue-600",
    role: "Senior Frontend Engineer",
    status: "verified",
    trustScore: 96,
    trustLabel: "Highly Trusted",
    appliedDate: "Oct 22, 2024",
    location: "Mumbai, Maharashtra",

    education: {
      degree: "B.E. in Computer Science & Engineering",
      college: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
      year: "2020",
      cgpa: "9.1 / 10",
      verified: true,
      verificationSource: "National Academic Depository (NAD) Verified",
    },

    experienceTotal: "4.0 Years Total",
    experienceTimeline: [
      {
        company: "Swiggy",
        role: "Frontend SDE-2",
        duration: "2.0 Years (2022 – Present)",
        verified: true,
        source: "Direct HR API & Corporate Email Confirmed",
      },
      {
        company: "Infosys Ltd.",
        role: "Systems Engineer",
        duration: "2.0 Years (2020 – 2022)",
        verified: true,
        source: "EPFO UAN Records Verified",
      },
    ],

    socialFootprint: {
      linkedin: {
        url: "linkedin.com/in/aaravpatel-tech",
        status: "Top Voice • 2,400+ connections",
        verified: true,
      },
      github: {
        username: "aarav-ui",
        repos: 48,
        commits: 1240,
        verified: true,
      },
      portfolio: {
        url: "https://aaravpatel.io",
        status: "Active WebGL Portfolio",
        verified: true,
      },
    },

    certificates: [
      {
        id: "CERT-META-3301",
        title: "Meta React Native Certified Professional",
        issuer: "Meta / Coursera",
        issueDate: "Jul 2022",
        serialHash: "0xB4C9E10177A8293D",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 18, 2024",
      },
      {
        id: "CERT-AWS-6612",
        title: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services (AWS)",
        issueDate: "Mar 2023",
        serialHash: "0x88F166C412E9903B",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 18, 2024",
      },
      {
        id: "CERT-NPTEL-9021",
        title: "Advanced Data Structures & Algorithms",
        issuer: "NPTEL / IIT Madras",
        issueDate: "Apr 2021",
        serialHash: "0x44D39902FF118742",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 18, 2024",
      },
      {
        id: "CERT-GOOG-1144",
        title: "Google Web Performance Optimization Masterclass",
        issuer: "Google Developers",
        issueDate: "Sep 2023",
        serialHash: "0x55E211D899AC4401",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 18, 2024",
      },
    ],

    fraudFlags: [],
  },

  {
    id: "SIH-2024-003",
    name: "Priya Sundaram",
    avatar: "PS",
    avatarBg: "from-emerald-600 to-teal-600",
    role: "Data Analyst & ML Specialist",
    status: "verified",
    trustScore: 91,
    trustLabel: "Verified Authentic",
    appliedDate: "Oct 20, 2024",
    location: "Bengaluru, Karnataka",

    education: {
      degree: "M.Sc in Data Science & Big Data",
      college: "Christ University, Bengaluru",
      year: "2021",
      cgpa: "8.8 / 10",
      verified: true,
      verificationSource: "UGC & NIRF Accredited Records Verified",
    },

    experienceTotal: "3.0 Years Total",
    experienceTimeline: [
      {
        company: "Fractal Analytics",
        role: "Data Analyst II",
        duration: "1.8 Years (2022 – Present)",
        verified: true,
        source: "EPFO & Corporate Email Confirmed",
      },
      {
        company: "Mu Sigma",
        role: "Trainee Decision Scientist",
        duration: "1.2 Years (2021 – 2022)",
        verified: true,
        source: "EPFO UAN Records Verified",
      },
    ],

    socialFootprint: {
      linkedin: {
        url: "linkedin.com/in/priyasundaram-ds",
        status: "Verified Badge • 1,800+ connections",
        verified: true,
      },
      github: {
        username: "priya-analytics",
        repos: 32,
        commits: 460,
        verified: true,
      },
      portfolio: {
        url: "https://priyadata.me",
        status: "Tableau & ML Models Live",
        verified: true,
      },
    },

    certificates: [
      {
        id: "CERT-GOOG-9912",
        title: "Google Data Analytics Professional Certificate",
        issuer: "Google / Coursera",
        issueDate: "Jan 2022",
        serialHash: "0x33A7B9915522AA10",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 19, 2024",
      },
      {
        id: "CERT-DL-4482",
        title: "DeepLearning.AI TensorFlow Developer",
        issuer: "DeepLearning.AI",
        issueDate: "Oct 2022",
        serialHash: "0x66B2C884990033FF",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 19, 2024",
      },
      {
        id: "CERT-IBM-1122",
        title: "IBM Applied AI Professional Certificate",
        issuer: "IBM",
        issueDate: "May 2023",
        serialHash: "0x11C9D443881266B0",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 19, 2024",
      },
    ],

    fraudFlags: [],
  },

  {
    id: "SIH-2024-004",
    name: "Sneha Pillai",
    avatar: "SP",
    avatarBg: "from-violet-600 to-purple-600",
    role: "DevOps & Cloud Engineer",
    status: "under_review",
    trustScore: 73,
    trustLabel: "Under Active Audit",
    appliedDate: "Oct 23, 2024",
    location: "Chennai, Tamil Nadu",

    education: {
      degree: "B.Tech in Information Technology",
      college: "SRM Institute of Science and Technology, Chennai",
      year: "2021",
      cgpa: "8.2 / 10",
      verified: true,
      verificationSource: "AICTE Portal Verified",
    },

    experienceTotal: "3.0 Years Total",
    experienceTimeline: [
      {
        company: "Cognizant",
        role: "Cloud Associate",
        duration: "1.5 Years (2023 – Present)",
        verified: true,
        source: "EPFO UAN Records Verified",
      },
      {
        company: "Capgemini",
        role: "Software Trainee",
        duration: "1.5 Years (2021 – 2023)",
        verified: false,
        source: "Pending verification response from Capgemini alumni desk",
      },
    ],

    socialFootprint: {
      linkedin: {
        url: "linkedin.com/in/snehapillai-cloud",
        status: "Active (920+ connections)",
        verified: true,
      },
      github: {
        username: "sneha-devops",
        repos: 19,
        commits: 310,
        verified: true,
      },
      portfolio: {
        url: "https://snehapillai.cloud",
        status: "Terraform & Docker Labs",
        verified: true,
      },
    },

    certificates: [
      {
        id: "CERT-AWS-9904",
        title: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services (AWS)",
        issueDate: "Dec 2022",
        serialHash: "0x77A1E9923301BC44",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 20, 2024",
      },
      {
        id: "CERT-CNCF-3301",
        title: "Certified Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation (CNCF)",
        issueDate: "Jun 2023",
        serialHash: "0x99B3F441882200DE",
        verified: false,
        verificationTimestamp: "Awaiting sync with Linux Foundation Credential API",
      },
    ],

    fraudFlags: [
      "Audit In-Progress: Capgemini service tenure awaits formal HR confirmation.",
      "Pending Sync: CKA certificate cryptographic key awaiting Linux Foundation registry acknowledgement.",
    ],
  },

  {
    id: "SIH-2024-005",
    name: "Vikramaditya Rao",
    avatar: "VR",
    avatarBg: "from-rose-600 to-red-700",
    role: "Cybersecurity Analyst",
    status: "flagged",
    trustScore: 43,
    trustLabel: "High Risk Flagged",
    appliedDate: "Oct 19, 2024",
    location: "Hyderabad, Telangana",

    education: {
      degree: "B.Sc in Computer Science",
      college: "Savitribai Phule Pune University",
      year: "2020",
      cgpa: "6.9 / 10",
      verified: true,
      verificationSource: "State University Registry Verified",
    },

    experienceTotal: "4.0 Years Total",
    experienceTimeline: [
      {
        company: "Tech Mahindra",
        role: "Senior Security Lead (Claimed)",
        duration: "2.0 Years (2022 – Present)",
        verified: false,
        source: "Designation Inconsistency: Company HR records confirm role as 'Junior Helpdesk Analyst'",
      },
      {
        company: "Zenith Cyber Solutions",
        role: "Security Associate",
        duration: "2.0 Years (2020 – 2022)",
        verified: true,
        source: "EPFO UAN Records Verified",
      },
    ],

    socialFootprint: {
      linkedin: {
        url: "linkedin.com/in/vikram-rao-sec",
        status: "Inconsistent profile history detected",
        verified: false,
      },
      github: {
        username: "vikram-sec",
        repos: 3,
        commits: 12,
        verified: false,
      },
      portfolio: {
        url: "Not provided",
        status: "No portfolio found",
        verified: false,
      },
    },

    certificates: [
      {
        id: "CERT-CEH-0001",
        title: "Certified Ethical Hacker (CEH v12)",
        issuer: "EC-Council",
        issueDate: "Aug 2022",
        serialHash: "0x0000FAKE9999DEAD",
        verified: false,
        verificationTimestamp: "Duplicate Hash: Serial Key matches another registered candidate",
      },
      {
        id: "CERT-COMP-8812",
        title: "CompTIA Security+ Certification",
        issuer: "CompTIA",
        issueDate: "Feb 2021",
        serialHash: "0x8821AA190033BC88",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 19, 2024",
      },
    ],

    fraudFlags: [
      "Role Inflation: Candidate claimed 'Senior Security Lead' role at Tech Mahindra, but official records list 'Junior Helpdesk Analyst'.",
      "Duplicate Credential: EC-Council CEH hash is identical to another candidate in the repository.",
    ],
  },

  {
    id: "SIH-2024-006",
    name: "Ananya Sen",
    avatar: "AS",
    avatarBg: "from-teal-600 to-cyan-600",
    role: "AI / NLP Research Engineer",
    status: "verified",
    trustScore: 98,
    trustLabel: "Gold Standard Verified",
    appliedDate: "Oct 22, 2024",
    location: "Kolkata, West Bengal",

    education: {
      degree: "M.Tech in Artificial Intelligence",
      college: "Indian Institute of Technology (IIT), Kharagpur",
      year: "2022",
      cgpa: "9.6 / 10",
      verified: true,
      verificationSource: "National Academic Depository (NAD) Gold Medalist Verified",
    },

    experienceTotal: "2.0 Years Total",
    experienceTimeline: [
      {
        company: "Microsoft Research India",
        role: "Applied Scientist – NLP",
        duration: "2.0 Years (2022 – Present)",
        verified: true,
        source: "Microsoft Corporate Employment API Verified",
      },
    ],

    socialFootprint: {
      linkedin: {
        url: "linkedin.com/in/ananyasen-ai",
        status: "Verified • 3,200+ followers",
        verified: true,
      },
      github: {
        username: "ananya-nlp",
        repos: 62,
        commits: 2150,
        verified: true,
      },
      portfolio: {
        url: "https://ananya-nlp.github.io",
        status: "Published ACL/EMNLP Papers Live",
        verified: true,
      },
    },

    certificates: [
      {
        id: "CERT-STAN-8832",
        title: "Natural Language Processing with Deep Learning",
        issuer: "Stanford Online",
        issueDate: "Dec 2022",
        serialHash: "0xAA118832CC778844",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 20, 2024",
      },
      {
        id: "CERT-NPTEL-9943",
        title: "Deep Learning for Natural Language Processing",
        issuer: "NPTEL / IIT Madras",
        issueDate: "Nov 2021",
        serialHash: "0xBB229943FF661100",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 20, 2024",
      },
      {
        id: "CERT-MS-0054",
        title: "Microsoft Certified: Azure AI Engineer Associate",
        issuer: "Microsoft",
        issueDate: "Aug 2023",
        serialHash: "0xCC330054AA992211",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Oct 20, 2024",
      },
    ],

    fraudFlags: [],
  },
];

// =============================================================================
// ── Section 2: Helper Functions & Scoring Utilities ──────────────────────────
// =============================================================================

// Determine styling rules based on trust score percentage
function getScoreStyles(score) {
  if (score >= 85) {
    return {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      stroke: "#10b981",
      badge: "bg-emerald-900/60 text-emerald-300 border-emerald-700/60",
      label: "Verified Authentic",
    };
  }
  if (score >= 65) {
    return {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      stroke: "#f59e0b",
      badge: "bg-amber-900/60 text-amber-300 border-amber-700/60",
      label: "Under Review",
    };
  }
  return {
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    stroke: "#f43f5e",
    badge: "bg-rose-900/60 text-rose-300 border-rose-700/60",
    label: "Flagged Claims",
  };
}

// SVG Circular Trust Meter Component
function TrustScoreGauge({ score, size = 76, strokeWidth = 6 }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const style = getScoreStyles(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={style.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-base font-black ${style.text}`}>{score}%</span>
        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Trust</span>
      </div>
    </div>
  );
}

// =============================================================================
// ── Section 3: Certificate Modal Component ───────────────────────────────────
// Modal showing official credentials, hash key serial, and live hash validator
// =============================================================================
function CertificateModal({ candidate, onClose, onUpdateCertificate }) {
  // Local state to track which certificate is currently being re-verified
  const [verifyingId, setVerifyingId] = useState(null);
  const [successNote, setSuccessNote] = useState(null);

  if (!candidate) return null;

  // Simulate real-time cryptographic hash verification
  const handleVerifyHash = (cert) => {
    setVerifyingId(cert.id);
    setSuccessNote(null);

    setTimeout(() => {
      // Deterministic check: if hash starts with '0xDEAD' or '0x0000', fail it; otherwise verify it
      const isFake = cert.serialHash.startsWith("0xDEAD") || cert.serialHash.startsWith("0x0000");
      
      const updated = {
        ...cert,
        verified: !isFake,
        verificationTimestamp: isFake
          ? "Verification Failed: Checksum Mismatch against Central Issuer Registry"
          : `Verified Authenticated: ${new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}`,
      };

      onUpdateCertificate(candidate.id, updated);
      setVerifyingId(null);
      setSuccessNote(
        isFake
          ? `Cryptographic Checksum Failed for ${cert.id}! Alerting HR audit log.`
          : `Hash ${cert.serialHash.substring(0, 8)}... matched successfully on ledger!`
      );
    }, 750);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${candidate.avatarBg} flex items-center justify-center text-white font-extrabold text-sm shadow-md`}>
              {candidate.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-base">{candidate.name}</h3>
                <span className="text-xs text-slate-500 font-mono">[{candidate.id}]</span>
              </div>
              <p className="text-xs text-indigo-400 font-medium">{candidate.role} • Credential Vault & Verification Ledger</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Quick Notice Banner */}
          {successNote && (
            <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all ${
              successNote.includes("Failed")
                ? "bg-rose-950/40 border-rose-700/60 text-rose-300"
                : "bg-emerald-950/40 border-emerald-700/60 text-emerald-300"
            }`}>
              {successNote.includes("Failed") ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
              <span className="font-medium">{successNote}</span>
            </div>
          )}

          {/* Candidate Verification Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Certificates</span>
              <p className="text-xl font-bold text-white mt-0.5">{candidate.certificates.length} Credentials</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Verified on Ledger</span>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">
                {candidate.certificates.filter((c) => c.verified).length} Authentic
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Discrepancy / Tamper Flags</span>
              <p className="text-xl font-bold text-rose-400 mt-0.5">
                {candidate.certificates.filter((c) => !c.verified).length} Detected
              </p>
            </div>
          </div>

          {/* Certificate Cards List */}
          <div className="space-y-4">
            <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Award size={14} className="text-indigo-400" />
              Earned Certifications & Cryptographic Hashes
            </h4>

            {candidate.certificates.map((cert) => (
              <div
                key={cert.id}
                className={`p-4 rounded-xl border transition-all ${
                  cert.verified
                    ? "bg-slate-800/40 border-slate-700 hover:border-emerald-500/50"
                    : "bg-rose-950/20 border-rose-800/60 hover:border-rose-600"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white">{cert.title}</span>
                      <span className="text-xs bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
                        {cert.issuer}
                      </span>
                      {cert.verified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                          <CheckCircle2 size={12} /> Authentic
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/60">
                          <XCircle size={12} /> Hash Discrepancy
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>Issued: <strong className="text-slate-300">{cert.issueDate}</strong></span>
                      <span>•</span>
                      <span>Cert ID: <code className="text-slate-300 font-mono">{cert.id}</code></span>
                    </div>

                    {/* Cryptographic Hash Bar */}
                    <div className="mt-2 flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                      <Hash size={13} className="text-indigo-400 shrink-0" />
                      <span className="text-slate-400 text-[11px]">Serial Hash:</span>
                      <span className={`font-semibold ${cert.verified ? "text-indigo-300" : "text-rose-400"}`}>
                        {cert.serialHash}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1">{cert.verificationTimestamp}</p>
                  </div>

                  {/* Verify Action Button */}
                  <div className="sm:self-center shrink-0">
                    <button
                      onClick={() => handleVerifyHash(cert)}
                      disabled={verifyingId === cert.id}
                      className={`w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        cert.verified
                          ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/40"
                      }`}
                    >
                      {verifyingId === cert.id ? (
                        <>
                          <RefreshCw size={13} className="animate-spin text-indigo-400" />
                          <span>Auditing Hash...</span>
                        </>
                      ) : (
                        <>
                          <Fingerprint size={13} />
                          <span>Verify Hash Key</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Career Timeline Review */}
          <div className="border-t border-slate-800 pt-4 space-y-3">
            <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={14} className="text-indigo-400" />
              Verified Career History & Payroll Tenure Breakdown
            </h4>

            <div className="space-y-2">
              {candidate.experienceTimeline.map((exp, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-800/40 border border-slate-800 rounded-xl p-3">
                  <div className="mt-0.5">
                    {exp.verified ? (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : (
                      <AlertTriangle size={16} className="text-rose-400" />
                    )}
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{exp.company}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{exp.duration}</span>
                    </div>
                    <p className="text-indigo-300 font-medium mt-0.5">{exp.role}</p>
                    <p className={`text-[11px] mt-1 ${exp.verified ? "text-slate-400" : "text-rose-300 font-medium"}`}>
                      {exp.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-900/90 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Lock size={12} className="text-indigo-400" /> Immutable Verification Record
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// ── Section 4: Live Footprint Authenticator Tool (Tab 2) ─────────────────────
// Real-time background simulation tool allowing HR to run instant scans
// =============================================================================
function LiveAuthenticatorTool({ onAddCandidate }) {
  // Input form state
  const [candidateName, setCandidateName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [certHash, setCertHash] = useState("");
  const [appliedRole, setAppliedRole] = useState("Full Stack Developer");

  // Uploaded certificate document state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Helper to generate a realistic mock SHA-256 cryptographic hash from file name
  const generateMockSHA256 = (filename) => {
    const chars = "0123456789ABCDEF";
    let hash = "0x";
    let seed = 0;
    for (let i = 0; i < filename.length; i++) {
      seed = (seed << 5) - seed + filename.charCodeAt(i);
      seed |= 0;
    }
    for (let i = 0; i < 32; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      const rnd = Math.floor((Math.abs(seed) / 233280) * chars.length);
      hash += chars[rnd];
    }
    return hash;
  };

  // Handler when user selects or drops a PDF / certificate file
  const handleProcessFile = (file) => {
    if (!file) return;
    const sizeStr = file.size > 1024 * 1024
      ? (file.size / (1024 * 1024)).toFixed(2) + " MB"
      : (file.size / 1024).toFixed(1) + " KB";

    const autoHash = generateMockSHA256(file.name);
    setUploadedFile({
      name: file.name,
      size: sizeStr,
      type: file.type || "Document",
    });
    setCertHash(autoHash);
  };

  // Clear uploaded file handler
  const handleClearFile = () => {
    setUploadedFile(null);
    setCertHash("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Scan simulation state
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [verifyingScanCertId, setVerifyingScanCertId] = useState(null);

  // Custom toggle to simulate invalid/tampered certificate
  const [simulateInvalidCert, setSimulateInvalidCert] = useState(false);

  // Handler to verify a specific certificate's hash inside the scan result report
  const handleVerifyScanCert = (cert) => {
    setVerifyingScanCertId(cert.id);
    setTimeout(() => {
      const isFake =
        cert.serialHash.toLowerCase().includes("dead") ||
        cert.serialHash.toLowerCase().includes("fake") ||
        cert.serialHash.toLowerCase().includes("tampered") ||
        cert.serialHash.toLowerCase().includes("wrong") ||
        (cert.id === "CERT-ML-8810" && scanResult?.isWrongCert);

      setScanResult((prev) => {
        if (!prev) return null;
        const updated = prev.certificates.map((c) =>
          c.id === cert.id
            ? {
                ...c,
                verified: !isFake,
                verificationTimestamp: isFake
                  ? "Verification Failed: Checksum Mismatch against Central Issuer Registry"
                  : `Verified on Ledger: Hash Authenticated (${new Date().toLocaleTimeString("en-IN")})`,
              }
            : c
        );
        return { ...prev, certificates: updated };
      });
      setVerifyingScanCertId(null);
    }, 700);
  };

  // Quick Preset Handlers
  const handleLoadPreset = (type) => {
    if (type === "flagged") {
      setCandidateName("Siddharth Mehra");
      setProfileUrl("https://linkedin.com/in/siddharth-mehra-dev");
      setCertHash("0xDEAD5500AA99BEEF");
      setAppliedRole("DevOps Specialist");
      setUploadedFile({
        name: "Tampered_IBM_Blockchain_Cert.pdf",
        size: "348 KB",
        type: "application/pdf",
      });
      setSimulateInvalidCert(true);
    } else if (type === "verified") {
      setCandidateName("Rhea Mukherjee");
      setProfileUrl("https://linkedin.com/in/rhea-mukherjee-ai");
      setCertHash("0x88F1AA99BB3344EE");
      setAppliedRole("AI / ML Engineer");
      setUploadedFile({
        name: "Stanford_Online_Deep_Learning.pdf",
        size: "412 KB",
        type: "application/pdf",
      });
      setSimulateInvalidCert(false);
    } else {
      setCandidateName("");
      setProfileUrl("");
      setCertHash("");
      setAppliedRole("Full Stack Developer");
      setUploadedFile(null);
      setSimulateInvalidCert(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    setScanResult(null);
  };

  // Run simulated asynchronous AI verification pipeline
  const handleRunVerification = useCallback(() => {
    if (!candidateName.trim()) return;

    setScanning(true);
    setScanResult(null);
    setScanStep(1);

    // Multi-step progress animation simulating real NLP & API calls
    setTimeout(() => setScanStep(2), 600);
    setTimeout(() => setScanStep(3), 1300);
    setTimeout(() => setScanStep(4), 2000);

    setTimeout(() => {
      // Deterministic simulation based on inputs:
      const hashLower = certHash.toLowerCase();
      const fileNameLower = (uploadedFile?.name || "").toLowerCase();
      const candidateNameLower = candidateName.toLowerCase();
      const profileUrlLower = profileUrl.toLowerCase();

      // Check if hash or file name contains keywords: 'wrong', 'fake', 'tampered', '0xdead'
      // or if custom toggle for 'Simulate Invalid Certificate' is enabled
      const invalidKeywords = ["wrong", "fake", "tampered", "0xdead", "invalid", "corrupt", "mismatch"];
      const isWrongCert =
        simulateInvalidCert ||
        invalidKeywords.some(
          (kw) => hashLower.includes(kw) || fileNameLower.includes(kw)
        );

      const isSuspiciousProfile =
        candidateNameLower.includes("siddharth") ||
        profileUrlLower.includes("fake") ||
        profileUrlLower.includes("suspicious");

      const isSuspicious = isWrongCert || isSuspiciousProfile;

      // Trust score drops (35% Trust when wrong certificate / hash discrepancy)
      let computedTrustScore = 94;
      if (isWrongCert) {
        computedTrustScore = 35;
      } else if (isSuspiciousProfile) {
        computedTrustScore = 48;
      }

      // Generate dynamic risk flags
      const flags = [];
      if (isWrongCert) {
        flags.push(
          "Cryptographic Hash Mismatch: Uploaded certificate hash failed decentralized ledger checksum verification (tampered or counterfeit document)."
        );
        flags.push(
          "Invalid Digital Signature: Certificate serial key is unverified or not registered in the official issuer repository."
        );
      }
      if (isSuspiciousProfile) {
        flags.push(
          "EPFO Service Gap: Candidate claimed 2.0 years tenure, but active contributions found for only 7 months."
        );
        flags.push(
          "GitHub Activity Anomaly: Less than 20 total commits over a claimed 3-year developer career."
        );
      }

      // Candidate's 4 verified credentials list
      const candidateCerts = [
        {
          id: "CERT-ML-8810",
          title: "Machine Learning Certification",
          issuer: "Global Credential Authority",
          issueDate: "Sep 2023",
          serialHash: certHash.trim() || "0x77A19902FF118833",
          verified: !isWrongCert,
          verificationTimestamp: isWrongCert
            ? "Tampered Hash: Serial Key not found in Issuer Registry"
            : "Verified on Ledger: Cryptographic Hash Matched (Oct 2024)",
        },
        {
          id: "CERT-PY-4402",
          title: "Advanced Python Programming",
          issuer: "Coursera / DeepLearning.AI",
          issueDate: "Aug 2022",
          serialHash: "0x7A4F89D201B456C1",
          verified: true,
          verificationTimestamp: "Verified on Ledger: Coursera Credential API Authenticated",
        },
        {
          id: "CERT-AWS-9912",
          title: "Cloud & AWS Fundamentals",
          issuer: "AWS Training",
          issueDate: "Mar 2023",
          serialHash: "0x88F1AA99BB3344EE",
          verified: true,
          verificationTimestamp: "Verified on Ledger: AWS Digital Badge Confirmed",
        },
        {
          id: "CERT-SIH-2024",
          title: "Smart India Hackathon Finalist Credential",
          issuer: "SIH 2024",
          issueDate: "Oct 2024",
          serialHash: "0xSIH2024E10177A8",
          verified: true,
          verificationTimestamp: "Verified on Ledger: MoE Innovation Cell / AICTE Depository",
        },
      ];

      setScanResult({
        candidateName: candidateName.trim(),
        profileUrl:
          profileUrl.trim() ||
          `linkedin.com/in/${candidateName.toLowerCase().replace(/\s+/g, "")}`,
        certHash: certHash.trim() || "0x77A19902FF118833",
        appliedRole: appliedRole,
        trustScore: computedTrustScore,
        isSuspicious,
        isWrongCert,
        statusLabel: isWrongCert
          ? "Flagged Claims / Hash Discrepancy"
          : isSuspiciousProfile
          ? "Flagged Claims / Profile Discrepancy"
          : "Authentic Candidate",
        workAuthStatus: isSuspiciousProfile
          ? "Discrepancy Found in EPFO Records"
          : isWrongCert
          ? "Tenure Recorded (Credentials Withheld)"
          : "100% Payroll & Tenure Verified",
        certHashStatus: isWrongCert
          ? "Cryptographic Hash Mismatch on Ledger"
          : "Cryptographic Hash Matched on Ledger",
        educationStatus: isWrongCert
          ? "Degree Claim Flagged: Transcript Checksum Failed"
          : "University Degree & AICTE Accredited",
        flags,
        certificates: candidateCerts,
        timestamp: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });

      setScanning(false);
      setScanStep(0);
    }, 2600);
  }, [candidateName, profileUrl, certHash, appliedRole, uploadedFile, simulateInvalidCert]);

  // Push scanned candidate into directory state
  const handlePushToDirectory = () => {
    if (!scanResult) return;

    const newCandidate = {
      id: `SIH-2024-00${Math.floor(Math.random() * 900) + 100}`,
      name: scanResult.candidateName,
      avatar: scanResult.candidateName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2),
      avatarBg: scanResult.isSuspicious ? "from-rose-600 to-amber-600" : "from-indigo-600 to-emerald-600",
      role: scanResult.appliedRole,
      status: scanResult.isSuspicious ? "flagged" : "verified",
      trustScore: scanResult.trustScore,
      trustLabel: scanResult.isSuspicious ? "Flagged Claims" : "Verified Authentic",
      appliedDate: "Just Now",
      location: "Verified via Live Portal",
      education: {
        degree: "B.Tech in Computer Engineering",
        college: "State Technical University",
        year: "2022",
        cgpa: "8.2 / 10",
        verified: true,
        verificationSource: "Live AICTE / UGC Database",
      },
      experienceTotal: "2.0 Years Total",
      experienceTimeline: [
        {
          company: "Tech Systems Ltd.",
          role: scanResult.appliedRole,
          duration: "2.0 Years Claimed",
          verified: !scanResult.isSuspicious,
          source: scanResult.workAuthStatus,
        },
      ],
      socialFootprint: {
        linkedin: {
          url: scanResult.profileUrl,
          status: "Audited via Live Authenticator",
          verified: !scanResult.isSuspicious,
        },
        github: {
          username: scanResult.candidateName.toLowerCase().replace(/\s+/g, "-"),
          repos: scanResult.isSuspicious ? 4 : 26,
          commits: scanResult.isSuspicious ? 18 : 650,
          verified: !scanResult.isSuspicious,
        },
        portfolio: {
          url: "Live Web Verified",
          status: "Scanned",
          verified: true,
        },
      },
      certificates: scanResult.certificates || [
        {
          id: "CERT-ML-8810",
          title: "Machine Learning Certification",
          issuer: "Global Credential Authority",
          issueDate: "2023",
          serialHash: scanResult.certHash,
          verified: !scanResult.isWrongCert,
          verificationTimestamp: scanResult.certHashStatus,
        },
      ],
      fraudFlags: scanResult.flags,
    };

    onAddCandidate(newCandidate);
    alert(`Candidate "${scanResult.candidateName}" successfully added to the active Directory!`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Tool Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Fingerprint size={18} />
              </div>
              <h2 className="text-white text-xl font-extrabold">Live Footprint Authenticator</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Simulate an instant AI-powered background check on any candidate’s LinkedIn footprint, EPFO work tenure, and digital certificate hash.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-500 font-semibold">Test Presets:</span>
            <button
              onClick={() => handleLoadPreset("flagged")}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800/60 hover:bg-rose-900/80 transition-colors"
            >
              ⚠️ Flagged Profile
            </button>
            <button
              onClick={() => handleLoadPreset("verified")}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/80 transition-colors"
            >
              ✅ Authentic Profile
            </button>
            <button
              onClick={() => handleLoadPreset("blank")}
              className="text-xs px-2 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Candidate Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="e.g., Siddharth Mehra or Rahul Sharma"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Applied Job Role</label>
            <input
              type="text"
              value={appliedRole}
              onChange={(e) => setAppliedRole(e.target.value)}
              placeholder="e.g., Full Stack Web Developer"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              LinkedIn Profile URL or GitHub Username
            </label>
            <div className="relative">
              <Linkedin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Certificate Cryptographic Hash Key
            </label>
            <div className="relative">
              <Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={certHash}
                onChange={(e) => setCertHash(e.target.value)}
                placeholder="e.g., 0x7A4F89D201B456C1 (or type 0xDEAD for fake)"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm font-mono focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Interactive PDF / Document Upload Zone */}
            <div className="mt-2.5">
              {!uploadedFile ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleProcessFile(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-indigo-400 bg-indigo-950/50 text-indigo-200 scale-[1.01]"
                      : "border-slate-700/80 hover:border-indigo-500/80 bg-slate-950/60 hover:bg-slate-950 text-slate-400"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleProcessFile(e.target.files[0]);
                      }
                    }}
                    accept=".pdf,.jpg,.png"
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shrink-0">
                      <Upload size={14} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-slate-200">
                        Upload Certificate Document <span className="text-slate-500 font-normal">(.pdf, .jpg, .png)</span>
                      </p>
                      <p className="text-[10px] text-indigo-400">
                        Click or drag & drop to auto-generate SHA-256 hash
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-700/90 rounded-xl p-3 flex items-center justify-between gap-3 shadow-md animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-rose-950/70 border border-rose-700/70 flex items-center justify-center text-rose-400 shrink-0">
                      <FileText size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-bold text-white truncate max-w-[150px] sm:max-w-[210px]">
                          {uploadedFile.name}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded-full border border-emerald-800/80 shrink-0">
                          <CheckCircle2 size={11} /> SHA-256 Generated
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {uploadedFile.size} • Hash synced to input box
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleClearFile}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/80 hover:text-rose-300 text-slate-400 text-xs font-semibold border border-slate-700 hover:border-rose-700/60 transition-colors shrink-0"
                    title="Clear File"
                  >
                    <Trash2 size={12} />
                    <span>Clear File</span>
                  </button>
                </div>
              )}
            </div>

            {/* Custom Toggle: Simulate Invalid Certificate / Tampered Hash */}
            <div className="mt-3 flex items-center justify-between p-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2.5">
                <ShieldAlert size={16} className={simulateInvalidCert ? "text-rose-400" : "text-slate-500"} />
                <div>
                  <span className="text-xs font-semibold text-slate-200">
                    Simulate Invalid Certificate / Tampered Hash
                  </span>
                  <p className="text-[10px] text-slate-500">
                    Forces cryptographic checksum failure (drops trust to 35%) for testing/demo
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={simulateInvalidCert}
                  onChange={(e) => setSimulateInvalidCert(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Verification Button */}
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-800">
          <p className="text-[11px] text-slate-500">
            Simulates automated crawling across LinkedIn, GitHub, EPFO UAN, and Blockchain credentials.
          </p>
          <button
            onClick={handleRunVerification}
            disabled={scanning || !candidateName.trim()}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-900/40 transition-all"
          >
            {scanning ? (
              <>
                <RefreshCw size={15} className="animate-spin text-white" />
                <span>Scanning Footprint...</span>
              </>
            ) : (
              <>
                <Zap size={15} />
                <span>Run Live Verification</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scanning Step Progress Display */}
      {scanning && (
        <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <RefreshCw size={18} className="animate-spin text-indigo-400" />
            <div>
              <h3 className="text-white font-bold text-sm">Real-Time Verification Engine In Progress...</h3>
              <p className="text-xs text-slate-400">Executing multi-source NLP analysis & registry checksum queries.</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs">
            {[
              "1. Scraping LinkedIn profile tenure, endorsements & GitHub commit history...",
              "2. Cross-referencing university graduation claims with DigiLocker / NAD...",
              "3. Validating employer payroll tenure & UAN continuity on EPFO servers...",
              "4. Executing cryptographic hash validation on decentralized credential registry...",
            ].map((stepText, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                  scanStep > idx + 1
                    ? "text-emerald-400 bg-emerald-950/20"
                    : scanStep === idx + 1
                    ? "text-indigo-300 bg-indigo-950/40 font-semibold"
                    : "text-slate-600"
                }`}
              >
                {scanStep > idx + 1 ? (
                  <CheckCircle2 size={14} className="text-emerald-400" />
                ) : scanStep === idx + 1 ? (
                  <RefreshCw size={14} className="animate-spin text-indigo-400" />
                ) : (
                  <Clock size={14} />
                )}
                <span>{stepText}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scan Results Report */}
      {scanResult && !scanning && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-6 shadow-2xl animate-in fade-in duration-300">
          {/* Result Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg">
                {scanResult.candidateName[0]}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-white font-black text-lg">{scanResult.candidateName}</h3>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                      scanResult.isSuspicious
                        ? "bg-rose-950/80 text-rose-300 border-rose-700 shadow-md shadow-rose-950/50"
                        : "bg-emerald-950/60 text-emerald-300 border-emerald-700"
                    }`}
                  >
                    {scanResult.isSuspicious ? (
                      <>
                        <ShieldAlert size={13} className="text-rose-400" />
                        <span>{scanResult.statusLabel || "Flagged Claims / Hash Discrepancy"}</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={13} className="text-emerald-400" />
                        <span>Authentic Candidate</span>
                      </>
                    )}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Applied: <strong className="text-slate-200">{scanResult.appliedRole}</strong> • Verified at {scanResult.timestamp}
                </p>
              </div>
            </div>

            {/* Gauge */}
            <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
              <TrustScoreGauge score={scanResult.trustScore} size={64} strokeWidth={5} />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">AI Match Score</span>
                <p className={`text-base font-extrabold ${getScoreStyles(scanResult.trustScore).text}`}>
                  {scanResult.trustScore}% Trust
                </p>
              </div>
            </div>
          </div>

          {/* Verification Audit Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Work Authenticity</span>
                {scanResult.isSuspicious ? (
                  <XCircle size={15} className="text-rose-400" />
                ) : (
                  <CheckCircle2 size={15} className="text-emerald-400" />
                )}
              </div>
              <p className={`text-xs font-bold ${scanResult.isSuspicious ? "text-rose-300" : "text-emerald-300"}`}>
                {scanResult.workAuthStatus}
              </p>
              <p className="text-[10px] text-slate-500">Cross-verified with EPFO service records</p>
            </div>

            <div className={`rounded-xl p-3.5 space-y-1 border ${
              scanResult.isWrongCert 
                ? "bg-rose-950/30 border-rose-800/80" 
                : "bg-slate-800/40 border-slate-800"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Certificate Hash</span>
                {scanResult.isWrongCert ? (
                  <XCircle size={15} className="text-rose-400" />
                ) : (
                  <CheckCircle2 size={15} className="text-emerald-400" />
                )}
              </div>
              <p className={`text-xs font-bold ${scanResult.isWrongCert ? "text-rose-400 font-extrabold" : "text-emerald-300"}`}>
                {scanResult.certHashStatus}
              </p>
              <p className="text-[10px] text-slate-500 font-mono truncate">{scanResult.certHash}</p>
              {scanResult.isWrongCert && (
                <p className="text-[10px] text-rose-300 font-medium">⚠️ Checksum Failed: Mismatch with Registry</p>
              )}
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Degree Validation</span>
                {scanResult.isWrongCert ? (
                  <AlertTriangle size={15} className="text-amber-400" />
                ) : (
                  <CheckCircle2 size={15} className="text-emerald-400" />
                )}
              </div>
              <p className={`text-xs font-bold ${scanResult.isWrongCert ? "text-amber-300" : "text-emerald-300"}`}>
                {scanResult.educationStatus}
              </p>
              <p className="text-[10px] text-slate-500">Verified via National Academic Depository</p>
            </div>
          </div>

          {/* Candidate Verification Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Certificates</span>
              <p className="text-xl font-bold text-white mt-0.5">
                {scanResult.certificates?.length || 4} Credentials
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Verified on Ledger</span>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">
                {scanResult.certificates?.filter((c) => c.verified).length ?? (scanResult.isWrongCert ? 3 : 4)} Authentic
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Discrepancy / Tamper Flags</span>
              <p className={`text-xl font-bold mt-0.5 ${scanResult.isWrongCert ? "text-rose-400" : "text-slate-400"}`}>
                {scanResult.certificates?.filter((c) => !c.verified).length ?? (scanResult.isWrongCert ? 1 : 0)} Detected
              </p>
            </div>
          </div>

          {/* Earned Certifications & Cryptographic Hashes */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs text-slate-300 font-bold uppercase tracking-wider flex items-center gap-2">
                <Award size={15} className="text-indigo-400" />
                Earned Certifications & Cryptographic Hashes ({scanResult.certificates?.length || 4})
              </h4>
              <span className="text-[10px] text-indigo-400 font-mono bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60">
                Ledger Vault Synchronized
              </span>
            </div>

            <div className="space-y-3">
              {scanResult.certificates?.map((cert) => (
                <div
                  key={cert.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    cert.verified
                      ? "bg-slate-800/40 border-slate-700/80 hover:border-emerald-500/50"
                      : "bg-rose-950/20 border-rose-800/80 hover:border-rose-600"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-white">{cert.title}</span>
                        <span className="text-xs bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
                          {cert.issuer}
                        </span>
                        {cert.verified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                            <CheckCircle2 size={12} /> Authentic
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/60">
                            <XCircle size={12} /> Hash Discrepancy
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>Issued: <strong className="text-slate-300">{cert.issueDate}</strong></span>
                        <span>•</span>
                        <span>Cert ID: <code className="text-slate-300 font-mono">{cert.id}</code></span>
                      </div>

                      {/* Cryptographic Hash Bar */}
                      <div className="mt-1.5 flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                        <Hash size={13} className="text-indigo-400 shrink-0" />
                        <span className="text-slate-400 text-[11px]">Serial Hash:</span>
                        <span className={`font-semibold ${cert.verified ? "text-indigo-300" : "text-rose-400"}`}>
                          {cert.serialHash}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-1">{cert.verificationTimestamp}</p>
                    </div>

                    {/* Verify Action Button */}
                    <div className="sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleVerifyScanCert(cert)}
                        disabled={verifyingScanCertId === cert.id}
                        className={`w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          cert.verified
                            ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/40"
                        }`}
                      >
                        {verifyingScanCertId === cert.id ? (
                          <>
                            <RefreshCw size={12} className="animate-spin text-indigo-400" />
                            <span>Auditing...</span>
                          </>
                        ) : (
                          <>
                            <Fingerprint size={12} />
                            <span>Verify Hash Key</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flagged Risk Factors (if any) */}
          {scanResult.flags.length > 0 ? (
            <div className="bg-rose-950/30 border border-rose-800/70 rounded-xl p-4 space-y-2">
              <h4 className="text-xs text-rose-300 font-bold uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle size={15} className="text-rose-400" />
                Detected Fraud & Discrepancy Risk Factors ({scanResult.flags.length})
              </h4>
              <ul className="space-y-1.5 text-xs text-rose-200/90 pl-5 list-disc">
                {scanResult.flags.map((flag, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-emerald-950/20 border border-emerald-800/50 rounded-xl p-4 flex items-center gap-3">
              <ShieldCheck size={24} className="text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-emerald-300 text-sm">Clear Background Record Verified</p>
                <p className="text-slate-400 mt-0.5">
                  Zero employment gap discrepancies, authentic certificate hash signatures, and active GitHub/LinkedIn digital footprint.
                </p>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">Would you like to persist this report into the Directory?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePushToDirectory}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow transition-colors"
              >
                <PlusCircle size={14} /> Add to Candidate Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// ── Section 5: Candidate Directory & Screening View (Tab 1) ─────────────────
// Primary working directory with search, filter tabs, and interactive cards
// =============================================================================
function CandidateDirectory({ candidates, onViewCertificates }) {
  // Real-time Search state
  const [searchQuery, setSearchQuery] = useState("");
  // Filter Tab state: 'all' | 'verified' | 'under_review' | 'flagged'
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter candidates dynamically based on search query and filter tab
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      // 1. Tab status match
      const matchesFilter =
        activeFilter === "all" ? true : candidate.status === activeFilter;

      // 2. Search query match (by Candidate Name or Role or College)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        candidate.name.toLowerCase().includes(q) ||
        candidate.role.toLowerCase().includes(q) ||
        candidate.education.college.toLowerCase().includes(q) ||
        candidate.id.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [candidates, searchQuery, activeFilter]);

  // Tab count badges
  const counts = useMemo(() => {
    return {
      all: candidates.length,
      verified: candidates.filter((c) => c.status === "verified").length,
      under_review: candidates.filter((c) => c.status === "under_review").length,
      flagged: candidates.filter((c) => c.status === "flagged").length,
    };
  }, [candidates]);

  return (
    <div className="space-y-6">
      {/* Search Bar & Filter Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate by Name, Applied Role (e.g. 'Rahul Sharma', 'Web Developer', 'IIT'), or ID..."
            className="w-full pl-11 pr-10 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs bg-slate-800 w-5 h-5 rounded-full flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Candidates", count: counts.all },
              { id: "verified", label: "Verified Profiles", count: counts.verified },
              { id: "under_review", label: "Under Review", count: counts.under_review },
              { id: "flagged", label: "Flagged Claims", count: counts.flagged },
            ].map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                      : "bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      active ? "bg-white/20 text-white" : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-300">{filteredCandidates.length}</strong> of {candidates.length} candidates
          </div>
        </div>
      </div>

      {/* Candidate Profile Cards Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <Search size={22} />
          </div>
          <h3 className="text-white font-bold text-base">No Matching Candidate Profiles Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or reset the filter tab to view all candidate records.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("all");
            }}
            className="text-xs text-indigo-400 font-semibold hover:underline mt-2 inline-block"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredCandidates.map((candidate) => {
            const scoreStyle = getScoreStyles(candidate.trustScore);

            return (
              <div
                key={candidate.id}
                className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-lg space-y-5"
              >
                {/* Card Top Row: Candidate Identity & Score Gauge */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left: Avatar + Details */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${candidate.avatarBg} flex items-center justify-center text-white font-black text-lg shadow-md shrink-0`}
                    >
                      {candidate.avatar}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-white font-black text-lg leading-snug">{candidate.name}</h3>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          {candidate.id}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${scoreStyle.badge}`}
                        >
                          {candidate.status === "verified"
                            ? "Verified Profile"
                            : candidate.status === "under_review"
                            ? "Under Review"
                            : "Flagged Claims"}
                        </span>
                      </div>

                      <p className="text-indigo-400 font-bold text-sm">{candidate.role}</p>

                      <p className="text-xs text-slate-400">
                        {candidate.location} • Applied: <span className="text-slate-300">{candidate.appliedDate}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right: AI Trust Score Meter */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 bg-slate-950/60 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-800">
                    <div className="flex items-center gap-3">
                      <TrustScoreGauge score={candidate.trustScore} size={70} strokeWidth={6} />
                      <div className="sm:text-right">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">AI Trust Match</span>
                        <p className={`text-base font-extrabold ${scoreStyle.text}`}>
                          {candidate.trustScore}% Verified
                        </p>
                        <span className="text-[11px] text-slate-400">{scoreStyle.label}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Middle: 2-Column Info Grid (Education & Work Timeline) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs pt-1">
                  {/* Column 1: College & Education Details */}
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                      <span className="flex items-center gap-1.5 text-indigo-300">
                        <GraduationCap size={15} /> Education & College Details
                      </span>
                      {candidate.education.verified && (
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[10px]">
                          <BadgeCheck size={13} /> Verified
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="text-white font-bold text-xs">{candidate.education.degree}</p>
                      <p className="text-slate-300 text-xs mt-0.5">{candidate.education.college}</p>
                      <div className="flex items-center gap-3 text-slate-400 text-[11px] mt-1.5">
                        <span>Class of {candidate.education.year}</span>
                        <span>•</span>
                        <span>CGPA: <strong className="text-slate-200">{candidate.education.cgpa}</strong></span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 italic">
                        Source: {candidate.education.verificationSource}
                      </p>
                    </div>
                  </div>

                  {/* Column 2: Total Experience Timeline */}
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                      <span className="flex items-center gap-1.5 text-indigo-300">
                        <Briefcase size={14} /> Total Experience Timeline
                      </span>
                      <span className="text-slate-200 font-extrabold text-[11px] bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60">
                        {candidate.experienceTotal}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {candidate.experienceTimeline.map((exp, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="mt-0.5 shrink-0">
                            {exp.verified ? (
                              <CheckCircle2 size={13} className="text-emerald-400" />
                            ) : (
                              <AlertTriangle size={13} className="text-rose-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-200">{exp.company}</span>
                              <span className="text-[11px] text-slate-400 font-mono">{exp.duration}</span>
                            </div>
                            <p className="text-[11px] text-slate-400">{exp.role}</p>
                            {!exp.verified && (
                              <p className="text-[10px] text-rose-300 font-medium mt-0.5">⚠️ {exp.source}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Social Footprint Badges & Certificate Vault Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                  {/* Social Footprint Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* LinkedIn Badge */}
                    <div className="flex items-center gap-1.5 text-xs bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300">
                      <Linkedin size={14} className="text-blue-400" />
                      <span className="font-medium text-[11px]">LinkedIn</span>
                      {candidate.socialFootprint.linkedin.verified && (
                        <Check size={12} className="text-emerald-400" />
                      )}
                    </div>

                    {/* GitHub Badge */}
                    <div className="flex items-center gap-1.5 text-xs bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300">
                      <Github size={14} className="text-slate-300" />
                      <span className="font-medium text-[11px]">
                        GitHub ({candidate.socialFootprint.github.repos} repos, {candidate.socialFootprint.github.commits} commits)
                      </span>
                    </div>

                    {/* Portfolio Badge */}
                    <div className="flex items-center gap-1.5 text-xs bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300">
                      <Globe size={14} className="text-indigo-400" />
                      <span className="font-medium text-[11px]">Portfolio Link</span>
                      <ArrowUpRight size={12} className="text-slate-500" />
                    </div>
                  </div>

                  {/* View Certificates & History Button */}
                  <button
                    onClick={() => onViewCertificates(candidate)}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-900/30 transition-all shrink-0"
                  >
                    <Award size={14} />
                    <span>View Certificates & History</span>
                    <span className="ml-1 bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                      {candidate.certificates.length}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// ── Section 6: Main App Layout & Header Execution ────────────────────────────
// =============================================================================
export default function App() {
  // Candidate data list (loaded from initial mock + can receive newly scanned profiles)
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);

  // Active top navigation tab: 'directory' | 'authenticator'
  const [activeTab, setActiveTab] = useState("directory");

  // Selected candidate object for the Certificate & Credential Modal
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Executive Top Metrics (calculated dynamically from candidate state)
  const executiveMetrics = useMemo(() => {
    const totalProfiles = 1248 + candidates.length;
    let totalCerts = 0;
    let verifiedCerts = 0;
    let fraudFlagsCount = 0;

    candidates.forEach((c) => {
      totalCerts += c.certificates.length;
      verifiedCerts += c.certificates.filter((cert) => cert.verified).length;
      fraudFlagsCount += c.fraudFlags.length;
    });

    return {
      totalScanned: totalProfiles.toLocaleString(),
      verifiedCerts: (3820 + verifiedCerts).toLocaleString(),
      fraudFlags: (140 + fraudFlagsCount).toLocaleString(),
      avgTimeSaved: "4.2 Hrs / Candidate",
    };
  }, [candidates]);

  // Callback to update a certificate's verification status
  const handleUpdateCertificate = (candidateId, updatedCert) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const newCerts = c.certificates.map((cert) =>
            cert.id === updatedCert.id ? updatedCert : cert
          );
          return { ...c, certificates: newCerts };
        }
        return c;
      })
    );

    // Keep the open modal in sync
    setSelectedCandidate((prev) => {
      if (prev && prev.id === candidateId) {
        const newCerts = prev.certificates.map((cert) =>
          cert.id === updatedCert.id ? updatedCert : cert
        );
        return { ...prev, certificates: newCerts };
      }
      return prev;
    });
  };

  // Callback to add a newly scanned candidate from the Live Authenticator
  const handleAddCandidate = (newCandidate) => {
    setCandidates((prev) => [newCandidate, ...prev]);
    setActiveTab("directory");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* ══════════════════════════════════════════════════════════════════════
          1. TOP NAVIGATION & EXECUTIVE METRICS BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-900/40">
                <ShieldCheck size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-none">
                  Social Media Analytics
                </h1>
                <p className="text-indigo-400 text-xs font-semibold mt-0.5 tracking-wider uppercase">
                  Talent & Verification Hub • SIH 2024
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
              <button
                onClick={() => setActiveTab("directory")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "directory"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Users size={14} />
                <span>Candidate Directory</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">
                  {candidates.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("authenticator")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "authenticator"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Fingerprint size={14} />
                <span>Live Footprint Authenticator</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            </div>
          </div>

          {/* Executive Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-3.5 border-t border-slate-800/80">
            {/* Metric 1 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-950/60 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shrink-0">
                <Users size={17} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Scanned</p>
                <p className="text-lg font-black text-white leading-tight">{executiveMetrics.totalScanned}</p>
                <span className="text-[10px] text-emerald-400 font-medium">+142 this week</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0">
                <BadgeCheck size={17} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified Certs</p>
                <p className="text-lg font-black text-emerald-300 leading-tight">{executiveMetrics.verifiedCerts}</p>
                <span className="text-[10px] text-slate-500 font-medium">96.8% integrity rate</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-950/60 border border-rose-700/60 flex items-center justify-center text-rose-400 shrink-0">
                <ShieldAlert size={17} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fraud Flags</p>
                <p className="text-lg font-black text-rose-300 leading-tight">{executiveMetrics.fraudFlags}</p>
                <span className="text-[10px] text-rose-400 font-medium">Detected & Blocked</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0">
                <Clock size={17} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Screening Time Saved</p>
                <p className="text-lg font-black text-amber-300 leading-tight">{executiveMetrics.avgTimeSaved}</p>
                <span className="text-[10px] text-slate-500 font-medium">vs manual HR audit</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          2. MAIN CONTENT AREA
      ══════════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "directory" ? (
          <CandidateDirectory
            candidates={candidates}
            onViewCertificates={(cand) => setSelectedCandidate(cand)}
          />
        ) : (
          <LiveAuthenticatorTool onAddCandidate={handleAddCandidate} />
        )}
      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          3. WORKING CERTIFICATE & CREDENTIALS MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      <CertificateModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onUpdateCertificate={handleUpdateCertificate}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          4. FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-4 px-6 text-center text-xs text-slate-500">
        <p>
          Smart India Hackathon (SIH) 2024 • AI/NLP HR Screening & Social Media Footprint Verification Dashboard
        </p>
      </footer>
    </div>
  );
}
