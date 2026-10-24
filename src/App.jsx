// =============================================================================
// Social Media Analytics — Talent & Verification Hub
// Smart India Hackathon (SIH) Field Project
// Complete Single-File React + Tailwind CSS Application
// =============================================================================

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
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

  {
    id: "SNU2029904",
    name: "Dhiraj Vaidya",
    avatar: "DV",
    avatarBg: "from-emerald-600 via-teal-600 to-indigo-700",
    role: "B.Tech AIML Specialist — ALARD University Pune",
    headline: "Pune City, Maharashtra, India | Professional Profile",
    about:
      "I am a B-Tech student specializing in Artificial Intelligence and Machine Learning at ALARD University Pune · Education: ALARD University Pune · Location: Pune City · 314 connections on LinkedIn. View Dhiraj Vaidya’s profile on LinkedIn, a professional community of 1 billion members.",
    status: "verified",
    trustScore: 99,
    trustLabel: "Yes, Authenticated Profile",
    appliedDate: "July 06, 2026",
    location: "Pune City, Maharashtra, India",

    education: {
      degree: "B.Tech in Artificial Intelligence and Machine Learning (AIML)",
      college: "ALARD University Pune (ALARD School of Engineering & Technology)",
      year: "2026",
      verified: true,
      verificationSource: "ALARD University Pune & AICTE Verified (profile-linkedin-profile.txt)",
    },

    experienceTotal: "ServiceNow & AICTE Certified",
    experienceTimeline: [
      {
        company: "ServiceNow University • AICTE • SmartBridge",
        role: "Virtual Internship Program (CSA & Agentic AI)",
        duration: "Completed July 06, 2026 (Cert ID: SNU2029904)",
        verified: true,
        source: "Yes, that is authenticated — ServiceNow & AICTE Official Registry",
      },
      {
        company: "ALARD School of Engineering & Technology, Pune",
        role: "AI & Machine Learning Research Specialist",
        duration: "B.Tech AIML Cohort (Pune City)",
        verified: true,
        source: "Verified via ALARD University Academic Records",
      },
    ],

    socialFootprint: {
      linkedin: {
        url: "https://www.linkedin.com/in/dhiraj-vaidya-529726423",
        status: "314 connections on LinkedIn • Pune City",
        verified: true,
      },
      github: {
        username: "dhiraj-vaidya",
        repos: 4,
        commits: 45,
        verified: true,
      },
      portfolio: {
        url: "https://www.linkedin.com/in/dhiraj-vaidya-529726423",
        status: "Verified LinkedIn Profile (profile.txt)",
        verified: true,
      },
    },

    certificates: [
      {
        id: "SNU2029904",
        title: "Virtual Internship Program — Certificate of Completion",
        issuer: "ServiceNow University • AICTE • SmartBridge",
        issueDate: "July 06, 2026",
        serialHash: "0xSNU2029904A7F9E2D188C4",
        verified: true,
        verificationTimestamp: "Verified on Ledger: ServiceNow University & AICTE Official Registry (Cert ID: SNU2029904)",
      },
    ],

    fraudFlags: [],
  },

  {
    id: "25ET2021033",
    name: "Sayak Debnath",
    avatar: "SD",
    avatarBg: "from-indigo-600 via-blue-600 to-cyan-600",
    role: "B.Tech AIML Specialist — ALARD University Pune",
    headline: "Pune City, Maharashtra, India | B.Tech AI & Data Science",
    about:
      "B.Tech student specializing in Artificial Intelligence and Machine Learning at ALARD School of Engineering & Technology, ALARD University, Pune (Enrollment: 25ET2021033).",
    status: "verified",
    trustScore: 98,
    trustLabel: "Verified Authentic",
    appliedDate: "Aug 03, 2026",
    location: "Pune City, Maharashtra, India",

    education: {
      degree: "B.Tech in Artificial Intelligence and Machine Learning (AIML)",
      college: "ALARD University Pune (ALARD School of Engineering & Technology)",
      year: "2026",
      verified: true,
      verificationSource: "ALARD University Pune Academic Registry Verified",
    },

    experienceTotal: "Microsoft & ALARD Certified",
    experienceTimeline: [
      {
        company: "ALARD School of Engineering & Technology, Pune",
        role: "Social Media Analytics Framework Lead Researcher",
        duration: "A.Y. 2026–27 (Roll No: 25ET2021033)",
        verified: true,
        source: "Verified by Department of Engineering, ALARD University",
      },
    ],

    socialFootprint: {
      linkedin: {
        url: "https://www.linkedin.com/in/sayak-debnath",
        status: "Verified LinkedIn Profile • Pune City",
        verified: true,
      },
      github: {
        username: "sayakdebnath55",
        repos: 3,
        commits: 140,
        verified: true,
      },
      portfolio: {
        url: "https://github.com/sayakdebnath55",
        status: "Live GitHub Profile",
        verified: true,
      },
    },

    certificates: [
      {
        id: "MSFT-GENAI-2026",
        title: "Introduction to generative AI and agents",
        issuer: "Microsoft (Signed by Satya Narayana Nadella)",
        issueDate: "August 03, 2026",
        serialHash: "0xMSFT2026AUG03SAYAK99A1",
        verified: true,
        verificationTimestamp: "Verified on Ledger: Official Microsoft Credential Registry",
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

  // Simulate real-time cryptographic hash verification (Always Authenticated Mode for Demo)
  const handleVerifyHash = (cert) => {
    setVerifyingId(cert.id);
    setSuccessNote(null);

    setTimeout(() => {
      const updated = {
        ...cert,
        verified: true,
        verificationTimestamp: `Yes, that is authenticated — Verified on Official Ledger (${new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })})`,
      };

      onUpdateCertificate(candidate.id, updated);
      setVerifyingId(null);
      setSuccessNote(
        `✅ Yes, that is authenticated! Certificate "${cert.title}" (${cert.id}) is 100% verified on the ledger.`
      );
    }, 500);
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
                      {cert.documentNote && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-indigo-950/90 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700/60 shadow-sm">
                          <FileText size={11} className="text-indigo-400" />
                          <span>Uploaded Document: {cert.documentNote}</span>
                        </span>
                      )}
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

// Helper 1: Extract clean GitHub username from a handle or full GitHub URL
// e.g., "sayakdebnath55" or "https://github.com/sayakdebnath55" -> "sayakdebnath55"
function extractGitHubUsername(rawInput) {
  if (!rawInput || typeof rawInput !== "string") return "";
  const trimmed = rawInput.trim();
  if (!trimmed) return "";

  // If the user pasted a LinkedIn URL here by mistake, return empty for GitHub
  if (trimmed.toLowerCase().includes("linkedin.com")) return "";

  try {
    if (trimmed.toLowerCase().includes("github.com")) {
      const normalized = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
      const urlObj = new URL(normalized);
      const parts = urlObj.pathname.split("/").filter(Boolean);
      return parts[0] ? parts[0].replace(/^@/, "") : "";
    }
  } catch {
    // Fallback regex parsing if URL constructor fails
  }

  return trimmed
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/^@/, "")
    .split("/")[0]
    .split("?")[0]
    .trim();
}

// Helper 2: Clean and parse any LinkedIn URL input strictly from user input (no hardcoded fallbacks)
function parseLinkedInUrl(rawInput, matchedCandidate) {
  const source = (rawInput || "").trim();

  if (!source || source.toLowerCase().includes("github.com")) {
    return {
      isLinked: false,
      handle: "",
      cleanUrl: "",
      statusBadge: "No LinkedIn URL Provided",
      headline: null,
      about: null,
      connectionsText: null,
    };
  }

  // Extract slug after /in/ if present
  const handle = source
    .replace(/^https?:\/\/(www\.|[a-z]{2}\.)?linkedin\.com\/in\//i, "")
    .replace(/^https?:\/\/(www\.|[a-z]{2}\.)?linkedin\.com\//i, "")
    .split("/")[0]
    .split("?")[0]
    .trim();

  if (!handle) {
    return {
      isLinked: false,
      handle: "",
      cleanUrl: "",
      statusBadge: "No LinkedIn URL Provided",
      headline: null,
      about: null,
      connectionsText: null,
    };
  }

  const cleanUrl = `https://www.linkedin.com/in/${handle}`;

  return {
    isLinked: true,
    handle,
    cleanUrl,
    statusBadge: "LinkedIn Profile Linked",
    headline:
      matchedCandidate?.headline || "Verified LinkedIn Professional Profile",
    about: matchedCandidate?.about || null,
    connectionsText:
      matchedCandidate?.socialFootprint?.linkedin?.status ||
      "LinkedIn Profile Linked",
  };
}

// Helper 3: Universal Dynamic Certificate Fallback for Any Candidate Search
// - Whenever any candidate name is typed or LinkedIn URL is pasted, automatically generates 4 professional verified certificates.
// - Never returns 0 credentials.
// - Primary Upload Priority: If a user uploads a PDF certificate file, places that file at Index #0 as the
//   #1 Primary Certificate at the top, followed by the 3 generated certificates (4 total).
function generateProfileCertificates({
  candidateName,
  appliedRole,
  linkedinUrl,
  certHash,
  uploadedFile,
  isWrongCert,
  candidates = [],
}) {
  const cleanName = (candidateName || "Candidate").trim();
  const nameLower = cleanName.toLowerCase();
  const cleanRole = (
    appliedRole || "B.Tech AIML — ALARD University Pune"
  ).trim();

  // Deterministic short hex builder so each candidate gets realistic, consistent hashes
  const makeCandidateHash = (suffixSeed) => {
    const str = `${nameLower}-${suffixSeed}`;
    const hexChars = "0123456789ABCDEF";
    let seed = 0;
    for (let i = 0; i < str.length; i++) {
      seed = (seed << 5) - seed + str.charCodeAt(i);
      seed |= 0;
    }
    let out = "0x";
    for (let i = 0; i < 16; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      const idx = Math.floor((Math.abs(seed) / 233280) * hexChars.length);
      out += hexChars[idx];
    }
    return out;
  };

  // 1. Check if candidate matches an existing preset/database record
  const matchedCandidate =
    nameLower.length > 0
      ? candidates.find(
          (c) =>
            c.name.toLowerCase() === nameLower ||
            (nameLower.length > 3 && c.name.toLowerCase().includes(nameLower))
        )
      : null;

  // 2. Universal 4 professional verified certificates mapped to the candidate
  const generatedCerts = [
    {
      id: `CERT-PY-${Math.abs(cleanName.length * 137 + 101)}`,
      title: "Python for Data Science",
      issuer: "Coursera • IBM Skills Network",
      issueDate: "Verified 2026",
      serialHash: makeCandidateHash("python-data-science"),
      verified: true,
      verificationTimestamp: `Verified on Ledger: Mapped to ${cleanName}${
        linkedinUrl ? " via LinkedIn Profile" : ""
      }`,
    },
    {
      id: `CERT-AICTE-${Math.abs(cleanName.length * 251 + 202)}`,
      title: "AICTE Virtual Internship",
      issuer: "AICTE • National Internship Portal",
      issueDate: "2026 Cohort",
      serialHash: makeCandidateHash("aicte-virtual-internship"),
      verified: true,
      verificationTimestamp: `Verified on Ledger: ${cleanRole}`,
    },
    {
      id: `CERT-ML-${Math.abs(cleanName.length * 389 + 303)}`,
      title: "Machine Learning Foundations",
      issuer: "Stanford Online • DeepLearning.AI",
      issueDate: "Verified 2025",
      serialHash: makeCandidateHash("ml-foundations"),
      verified: true,
      verificationTimestamp: "Verified on DeepLearning.AI Credential Registry",
    },
    {
      id: `CERT-CLD-${Math.abs(cleanName.length * 463 + 404)}`,
      title: "Cloud Computing Credential",
      issuer: "Amazon Web Services (AWS) Training",
      issueDate: "Verified 2025",
      serialHash: makeCandidateHash("cloud-computing-credential"),
      verified: true,
      verificationTimestamp: "Verified on Decentralized Credential Ledger",
    },
  ];

  // Build candidate's 4 base certificates (combining any record certificates + universal generated certificates)
  let candidateCertList = [];
  if (
    matchedCandidate &&
    Array.isArray(matchedCandidate.certificates) &&
    matchedCandidate.certificates.length > 0
  ) {
    candidateCertList = [
      ...matchedCandidate.certificates,
      ...generatedCerts.filter(
        (g) =>
          !matchedCandidate.certificates.some((m) => m.title === g.title)
      ),
    ].slice(0, 4);
  } else {
    candidateCertList = [...generatedCerts];
  }

  // 3. Primary Upload Priority: If user explicitly uploads a PDF/image file,
  // place that file at Index #0 as the #1 Primary Certificate, followed by the 3 generated certificates
  if (uploadedFile && uploadedFile.name) {
    const parsedFileTitle = uploadedFile.name
      .replace(/\.(pdf|png|jpg|jpeg|docx)$/i, "")
      .replace(/[_-]+/g, " ")
      .trim();

    const primaryUploadedCert = {
      id: `CERT-PRIMARY-${uploadedFile.name.length}01`,
      title: parsedFileTitle || uploadedFile.name,
      issuer: `Primary Uploaded Document (${cleanRole})`,
      issueDate: "Uploaded Document",
      serialHash: certHash?.trim() || makeCandidateHash(uploadedFile.name),
      verified: !isWrongCert,
      documentNote: uploadedFile.name,
      verificationTimestamp: isWrongCert
        ? "Cryptographic Hash Mismatch on Ledger"
        : `Verified on Ledger: #1 Primary Certificate (${uploadedFile.name})`,
    };

    const threeGeneratedCerts = candidateCertList.slice(0, 3).map((c) => ({
      ...c,
      verified: true,
    }));

    return [primaryUploadedCert, ...threeGeneratedCerts];
  }

  // 4. When no file is uploaded, return the 4 verified certificates
  return candidateCertList.map((cert, idx) => {
    const isPrimaryFlagged = isWrongCert && idx === 0;
    return {
      ...cert,
      serialHash:
        idx === 0 && certHash?.trim() ? certHash.trim() : cert.serialHash,
      verified: isPrimaryFlagged ? false : true,
      verificationTimestamp: isPrimaryFlagged
        ? "Cryptographic Hash Mismatch on Ledger"
        : cert.verificationTimestamp,
    };
  });
}

function LiveAuthenticatorTool({ candidates = [], onAddCandidate }) {
  // Clean initial state — no hardcoded fallback values injected when typing
  const [candidateName, setCandidateName] = useState("");
  const [appliedRole, setAppliedRole] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [githubInput, setGithubInput] = useState("");
  const [certHash, setCertHash] = useState("");

  // Uploaded certificate document state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Pop-up modal state
  const [authPopupData, setAuthPopupData] = useState(null);

  // Scan simulation state
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [verifyingScanCertId, setVerifyingScanCertId] = useState(null);

  // Custom toggle to simulate invalid/tampered certificate
  const [simulateInvalidCert, setSimulateInvalidCert] = useState(false);

  // Helper to generate a realistic SHA-256 cryptographic hash from file name
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

  // Async function to fetch live public profile data from https://api.github.com/users/{username}
  const fetchLiveGitHubData = useCallback(async (rawGithubHandle) => {
    const cleanUsername = extractGitHubUsername(rawGithubHandle);
    if (!cleanUsername) {
      return null;
    }

    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(cleanUsername)}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        return {
          status: "fallback",
          username: cleanUsername,
          displayName: cleanUsername,
          avatarUrl: null,
          publicRepos: 0,
          followers: 0,
          following: 0,
          bio:
            response.status === 404
              ? `GitHub handle "@${cleanUsername}" was not found on the public registry. Showing safe fallback state.`
              : "GitHub Public API rate limit reached — displaying safe fallback state without interruption.",
          htmlUrl: `https://github.com/${cleanUsername}`,
          errorMessage:
            response.status === 404
              ? "Handle Not Found (Fallback State)"
              : `API Status ${response.status} (Fallback State)`,
        };
      }

      const data = await response.json();
      return {
        status: "live",
        username: data.login || cleanUsername,
        displayName: data.name || data.login || cleanUsername,
        avatarUrl: data.avatar_url || null,
        publicRepos: typeof data.public_repos === "number" ? data.public_repos : 0,
        followers: typeof data.followers === "number" ? data.followers : 0,
        following: typeof data.following === "number" ? data.following : 0,
        bio:
          data.bio ||
          "Active developer profile verified via GitHub Public REST API (no custom bio text set).",
        htmlUrl: data.html_url || `https://github.com/${cleanUsername}`,
        errorMessage: null,
      };
    } catch {
      return {
        status: "fallback",
        username: cleanUsername,
        displayName: cleanUsername,
        avatarUrl: null,
        publicRepos: 0,
        followers: 0,
        following: 0,
        bio: "Network / Rate-limit fallback: Unable to reach api.github.com right now. Displaying safe fallback profile state.",
        htmlUrl: `https://github.com/${cleanUsername}`,
        errorMessage: "Offline / Rate Limit Fallback State",
      };
    }
  }, []);

  // Handler when user selects or drops a PDF / certificate file
  const handleProcessFile = (file) => {
    if (!file) return;
    const sizeStr =
      file.size > 1024 * 1024
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

  // Evaluate whether current inputs indicate an invalid/tampered certificate
  const computeIsWrongCert = useCallback(
    (hashVal, fileObj, simToggle) => {
      const hashLower = (hashVal || "").toLowerCase();
      const fileNameLower = (fileObj?.name || "").toLowerCase();
      const invalidKeywords = [
        "wrong",
        "fake",
        "tampered",
        "0xdead",
        "invalid",
        "corrupt",
        "mismatch",
      ];
      return (
        simToggle ||
        invalidKeywords.some(
          (kw) => hashLower.includes(kw) || fileNameLower.includes(kw)
        )
      );
    },
    []
  );

  // Helper to construct a clean firstname-lastname handle from a candidate name or LinkedIn slug
  const buildDefaultGithubHandle = useCallback((rawName, rawLinkedinUrl) => {
    const baseName = (rawName || "").trim();
    if (baseName) {
      return baseName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }
    const slug = (rawLinkedinUrl || "")
      .replace(/^https?:\/\/(www\.|[a-z]{2}\.)?linkedin\.com\/in\//i, "")
      .split("/")[0]
      .split("?")[0]
      .replace(/-[0-9a-f]{6,}$/i, "")
      .trim();
    return slug || "candidate-profile";
  }, []);

  // Helper to extract a readable candidate name from a LinkedIn URL if Candidate Name is blank
  const extractNameFromLinkedInUrl = useCallback((rawUrl) => {
    const trimmed = (rawUrl || "").trim();
    if (!trimmed.toLowerCase().includes("linkedin.com/in/")) return "";
    const slug = trimmed
      .replace(/^https?:\/\/(www\.|[a-z]{2}\.)?linkedin\.com\/in\//i, "")
      .split("/")[0]
      .split("?")[0]
      .replace(/-[0-9a-z]*\d+[0-9a-z]*$/i, "")
      .trim();
    if (!slug) return "";
    return slug
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }, []);

  // LinkedIn URL change handler: if a full LinkedIn URL is pasted and Name/Role/GitHub are blank, smart-populate them
  const handleLinkedInUrlChange = (val) => {
    setProfileUrl(val);
    if (val.toLowerCase().includes("linkedin.com/in/")) {
      const derivedName = extractNameFromLinkedInUrl(val);
      if (derivedName && !candidateName.trim()) {
        setCandidateName(derivedName);
      }
      if (!appliedRole.trim()) {
        setAppliedRole("B.Tech AIML — ALARD University Pune");
      }
      if (!githubInput.trim() && (candidateName.trim() || derivedName)) {
        setGithubInput(
          buildDefaultGithubHandle(candidateName.trim() || derivedName, val)
        );
      }
    }
  };

  // Keep scanResult synced when 'Simulate Invalid Certificate' toggle changes
  useEffect(() => {
    setScanResult((prev) => {
      if (!prev) return null;
      const isWrongCert = computeIsWrongCert(
        certHash,
        uploadedFile,
        simulateInvalidCert
      );
      const isSuspicious = isWrongCert;
      const effectiveRole =
        appliedRole.trim() ||
        prev.appliedRole ||
        "B.Tech AIML — ALARD University Pune";

      const updatedCerts = generateProfileCertificates({
        candidateName: candidateName.trim() || prev.candidateName,
        appliedRole: effectiveRole,
        linkedinUrl: profileUrl.trim() || prev.profileUrl,
        certHash: certHash.trim(),
        uploadedFile,
        isWrongCert,
        candidates,
      });

      const flags = isWrongCert
        ? [
            "Cryptographic Hash Mismatch on Ledger: Certificate hash failed decentralized registry checksum verification.",
            "Invalid Digital Signature: Primary credential serial key flagged as tampered or unverified.",
          ]
        : [];

      const computedTrustScore = isWrongCert ? 35 : 94;

      return {
        ...prev,
        appliedRole: effectiveRole,
        educationStatus: effectiveRole,
        certHash:
          certHash.trim() ||
          updatedCerts[0]?.serialHash ||
          prev.certHash ||
          "0x7A4F89D201B456C1",
        trustScore: computedTrustScore,
        isSuspicious,
        isWrongCert,
        statusLabel: isWrongCert
          ? "Flagged Claims / Hash Discrepancy"
          : "Authentic Candidate",
        certHashStatus: isWrongCert
          ? "Cryptographic Hash Mismatch on Ledger"
          : "Cryptographic Hash Matched on Ledger",
        flags,
        certificates: updatedCerts,
      };
    });
  }, [
    simulateInvalidCert,
    certHash,
    uploadedFile,
    candidateName,
    appliedRole,
    profileUrl,
    candidates,
    computeIsWrongCert,
  ]);

  // Handler for Simulate Invalid Certificate / Tampered Hash toggle
  const handleToggleSimulateInvalid = (checked) => {
    setSimulateInvalidCert(checked);
  };

  // Handler to verify a specific certificate's hash inside the scan result report
  const handleVerifyScanCert = (cert) => {
    setVerifyingScanCertId(cert.id);
    setTimeout(() => {
      const isPrimaryTampered =
        scanResult?.isWrongCert &&
        cert.id === scanResult?.certificates[0]?.id;
      const isFake =
        cert.serialHash.toLowerCase().includes("dead") ||
        cert.serialHash.toLowerCase().includes("fake") ||
        cert.serialHash.toLowerCase().includes("tampered") ||
        cert.serialHash.toLowerCase().includes("wrong") ||
        isPrimaryTampered;

      setScanResult((prev) => {
        if (!prev) return null;
        const updated = prev.certificates.map((c) =>
          c.id === cert.id
            ? {
                ...c,
                verified: !isFake,
                verificationTimestamp: isFake
                  ? "Cryptographic Hash Mismatch on Ledger"
                  : `Verified on Ledger: Hash Authenticated (${new Date().toLocaleTimeString(
                      "en-IN"
                    )})`,
              }
            : c
        );
        return { ...prev, certificates: updated };
      });
      setVerifyingScanCertId(null);

      if (!isFake) {
        setAuthPopupData({
          title: cert.title,
          fileName: cert.documentNote || cert.title,
          candidateName: scanResult?.candidateName || candidateName,
          issuer: cert.issuer,
          certId: cert.id,
          issueDate: cert.issueDate,
          serialHash: cert.serialHash,
        });
      }
    }, 500);
  };

  // Preset Button Isolation:
  // Clicking a preset sets ONLY that candidate's specific details.
  // Clicking 'Clear' resets everything to a completely blank state.
  const handleLoadPreset = (type) => {
    if (type === "dhiraj") {
      setCandidateName("Dhiraj Vaidya");
      setAppliedRole("B.Tech AIML — ALARD University Pune");
      setProfileUrl("https://www.linkedin.com/in/dhiraj-vaidya-529726423");
      setGithubInput("dhiraj-vaidya");
      setCertHash("0xSNU2029904A7F9E2D188C4");
      setUploadedFile(null);
      setSimulateInvalidCert(false);
    } else if (type === "sayak") {
      setCandidateName("Sayak Debnath");
      setAppliedRole("B.Tech AIML — ALARD University Pune");
      setProfileUrl("https://www.linkedin.com/in/sayak-debnath");
      setGithubInput("sayakdebnath55");
      setCertHash("0xMSFT2026AUG03SAYAK99A1");
      setUploadedFile(null);
      setSimulateInvalidCert(false);
    } else if (type === "flagged") {
      setCandidateName("Rahul Sharma");
      setAppliedRole("B.Tech AIML — ALARD University Pune");
      setProfileUrl("https://www.linkedin.com/in/rahulsharma-dev");
      setGithubInput("rahul-codes");
      setCertHash("0xDEAD88BFA0129999");
      setUploadedFile(null);
      setSimulateInvalidCert(true);
    } else {
      setCandidateName("");
      setAppliedRole("");
      setProfileUrl("");
      setGithubInput("");
      setCertHash("");
      setUploadedFile(null);
      setSimulateInvalidCert(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    setScanResult(null);
  };

  // Run live verification pipeline with smart fallbacks for Role, GitHub Handle, and LinkedIn Certificates
  const handleRunVerification = useCallback(async () => {
    const derivedName =
      candidateName.trim() || extractNameFromLinkedInUrl(profileUrl);
    if (!derivedName) return;

    if (!candidateName.trim() && derivedName) {
      setCandidateName(derivedName);
    }

    const cleanName = derivedName;
    const nameLower = cleanName.toLowerCase();
    const matchedCandidate = candidates.find(
      (c) =>
        c.name.toLowerCase() === nameLower ||
        (nameLower.length > 3 && c.name.toLowerCase().includes(nameLower))
    );

    // 1. Academic Role Smart Fallback: Automatically set to 'B.Tech AIML — ALARD University Pune' if left blank
    const effectiveRole =
      appliedRole.trim() ||
      matchedCandidate?.role ||
      "B.Tech AIML — ALARD University Pune";
    if (!appliedRole.trim()) {
      setAppliedRole(effectiveRole);
    }

    // 2. GitHub Box Smart Fallback: Set default search handle (firstname-lastname) if left blank
    const effectiveGithubRaw =
      githubInput.trim() ||
      matchedCandidate?.socialFootprint?.github?.username ||
      buildDefaultGithubHandle(cleanName, profileUrl);
    if (!githubInput.trim()) {
      setGithubInput(effectiveGithubRaw);
    }

    const effectiveLinkedinRaw = profileUrl.trim();

    setScanning(true);
    setScanResult(null);
    setScanStep(1);

    const step2Timer = setTimeout(() => setScanStep(2), 350);
    const step3Timer = setTimeout(() => setScanStep(3), 750);
    const step4Timer = setTimeout(() => setScanStep(4), 1100);

    // Fetch live GitHub profile data using the entered or smart-fallback handle
    const [liveGithubProfile] = await Promise.all([
      fetchLiveGitHubData(effectiveGithubRaw),
      new Promise((resolve) => setTimeout(resolve, 1200)),
    ]);

    clearTimeout(step2Timer);
    clearTimeout(step3Timer);
    clearTimeout(step4Timer);

    // Parse LinkedIn URL
    const parsedLinkedIn = parseLinkedInUrl(
      effectiveLinkedinRaw,
      matchedCandidate
    );

    // Evaluate certificate validity
    const isWrongCert = computeIsWrongCert(
      certHash,
      uploadedFile,
      simulateInvalidCert
    );
    const isSuspicious = isWrongCert;
    const computedTrustScore = isWrongCert ? 35 : 94;

    const flags = [];
    if (isWrongCert) {
      flags.push(
        "Cryptographic Hash Mismatch on Ledger: Uploaded certificate hash failed decentralized ledger checksum verification."
      );
      flags.push(
        "Invalid Digital Signature: Certificate serial key is unverified or not registered in the official issuer repository."
      );
    }

    // Dynamic Certificate Generator (4 verified certificates, or 5 with Uploaded PDF at Index #0)
    const candidateCerts = generateProfileCertificates({
      candidateName: cleanName,
      appliedRole: effectiveRole,
      linkedinUrl: parsedLinkedIn.cleanUrl || effectiveLinkedinRaw,
      certHash: certHash.trim(),
      uploadedFile,
      isWrongCert,
      candidates,
    });

    const actualEducationText =
      appliedRole.trim() ||
      (matchedCandidate?.education
        ? `${matchedCandidate.education.degree} — ${matchedCandidate.education.college}`
        : "B.Tech AIML — ALARD University Pune");

    const resolvedPrimaryHash =
      certHash.trim() ||
      candidateCerts[0]?.serialHash ||
      "0x7A4F89D201B456C1";

    setScanResult({
      candidateName: cleanName,
      profileUrl: parsedLinkedIn.cleanUrl || effectiveLinkedinRaw,
      linkedinProfile: parsedLinkedIn,
      githubProfile: liveGithubProfile,
      matchedCandidate,
      certHash: resolvedPrimaryHash,
      appliedRole: effectiveRole,
      trustScore: computedTrustScore,
      isSuspicious,
      isWrongCert,
      statusLabel: isWrongCert
        ? "Flagged Claims / Hash Discrepancy"
        : "Authentic Candidate",
      workAuthStatus:
        matchedCandidate?.experienceTotal ||
        "Verified LinkedIn & Academic Profile Record",
      certHashStatus: isWrongCert
        ? "Cryptographic Hash Mismatch on Ledger"
        : "Cryptographic Hash Matched on Ledger",
      educationStatus: actualEducationText,
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
  }, [
    candidateName,
    profileUrl,
    githubInput,
    certHash,
    appliedRole,
    uploadedFile,
    simulateInvalidCert,
    candidates,
    fetchLiveGitHubData,
    computeIsWrongCert,
    buildDefaultGithubHandle,
    extractNameFromLinkedInUrl,
  ]);

  // Push scanned candidate into directory state using only accurate data (no fake CGPA)
  const handlePushToDirectory = () => {
    if (!scanResult) return;

    const matched = scanResult.matchedCandidate;
    const newCandidate = {
      id: matched?.id || `SIH-2026-${Math.floor(Math.random() * 900) + 100}`,
      name: scanResult.candidateName,
      avatar: scanResult.candidateName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2),
      avatarBg: scanResult.isSuspicious
        ? "from-rose-600 to-amber-600"
        : "from-indigo-600 to-emerald-600",
      role: scanResult.appliedRole,
      status: scanResult.isSuspicious ? "flagged" : "verified",
      trustScore: scanResult.trustScore,
      trustLabel: scanResult.isSuspicious
        ? "Flagged Claims / Hash Discrepancy"
        : "Authentic Candidate",
      appliedDate: "Just Now",
      location:
        matched?.location || "Pune City, Maharashtra, India",
      education: matched?.education || {
        degree: scanResult.appliedRole,
        college: "ALARD University Pune",
        year: "2026",
        verified: !scanResult.isWrongCert,
        verificationSource: "Verified via Live Footprint Authenticator",
      },
      experienceTotal: matched?.experienceTotal || "Verified Record",
      experienceTimeline: matched?.experienceTimeline || [
        {
          company: "Verified Profile Record",
          role: scanResult.appliedRole,
          duration: "Current",
          verified: !scanResult.isSuspicious,
          source: scanResult.workAuthStatus,
        },
      ],
      socialFootprint: {
        linkedin: {
          url: scanResult.linkedinProfile?.cleanUrl || scanResult.profileUrl,
          status:
            scanResult.linkedinProfile?.connectionsText ||
            "LinkedIn Profile Linked",
          verified: Boolean(scanResult.linkedinProfile?.isLinked),
        },
        github: {
          username:
            scanResult.githubProfile?.username ||
            extractGitHubUsername(githubInput) ||
            "unlinked",
          repos: scanResult.githubProfile?.publicRepos ?? 0,
          commits: (scanResult.githubProfile?.publicRepos ?? 0) * 15,
          verified: scanResult.githubProfile?.status === "live",
        },
        portfolio: {
          url:
            scanResult.githubProfile?.htmlUrl ||
            scanResult.linkedinProfile?.cleanUrl ||
            "Verified",
          status: "Live Footprint Scanned",
          verified: true,
        },
      },
      certificates: scanResult.certificates || [],
      fraudFlags: scanResult.flags,
    };

    onAddCandidate(newCandidate);
    alert(
      `Candidate "${scanResult.candidateName}" successfully synced to the active Directory!`
    );
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
              <h2 className="text-white text-xl font-extrabold">
                Live Footprint Authenticator
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time GitHub REST API integration, LinkedIn profile parser, and cryptographic certificate hash authenticator.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-500 font-semibold">
              Presets:
            </span>
            <button
              type="button"
              onClick={() => handleLoadPreset("dhiraj")}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-blue-950/70 text-blue-300 border border-blue-800/70 hover:bg-blue-900/80 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🎓</span> Dhiraj Vaidya
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset("sayak")}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/80 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>💻</span> Sayak Debnath
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset("flagged")}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800/60 hover:bg-rose-900/80 transition-colors"
            >
              ⚠️ Tampered Hash Demo
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset("blank")}
              className="text-xs px-2 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Input Form — Strictly controlled by user input with zero auto-injected fallbacks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Candidate Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter candidate name"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Academic Specialization / Role
            </label>
            <input
              type="text"
              value={appliedRole}
              onChange={(e) => setAppliedRole(e.target.value)}
              placeholder="B.Tech AIML — ALARD University Pune"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              LinkedIn Profile URL
            </label>
            <div className="relative">
              <Linkedin
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-400"
              />
              <input
                type="text"
                value={profileUrl}
                onChange={(e) => handleLinkedInUrlChange(e.target.value)}
                placeholder="https://www.linkedin.com/in/username"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              GitHub Username or GitHub Profile URL{" "}
              <span className="text-[10px] text-emerald-400 font-normal">
                (Live API: api.github.com)
              </span>
            </label>
            <div className="relative">
              <Github
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300"
              />
              <input
                type="text"
                value={githubInput}
                onChange={(e) => setGithubInput(e.target.value)}
                placeholder="e.g., firstname-lastname or https://github.com/username"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Certificate Cryptographic Hash Key
            </label>
            <div className="relative">
              <Hash
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={certHash}
                onChange={(e) => setCertHash(e.target.value)}
                placeholder="e.g., 0x7A4F89D201B456C1 (or 0xDEAD for invalid hash test)"
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
                        Upload Certificate Document{" "}
                        <span className="text-slate-500 font-normal">
                          (.pdf, .jpg, .png)
                        </span>
                      </p>
                      <p className="text-[10px] text-indigo-400">
                        Click or drag & drop to set as #1 Primary Certificate and generate SHA-256 hash
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
                        <p className="text-xs font-bold text-white truncate max-w-[180px] sm:max-w-[260px]">
                          {uploadedFile.name}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded-full border border-emerald-800/80 shrink-0">
                          <CheckCircle2 size={11} /> SHA-256 Generated
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {uploadedFile.size} • Set as #1 Primary Document
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
                <ShieldAlert
                  size={16}
                  className={
                    simulateInvalidCert ? "text-rose-400" : "text-slate-500"
                  }
                />
                <div>
                  <span className="text-xs font-semibold text-slate-200">
                    Simulate Invalid Certificate / Tampered Hash
                  </span>
                  <p className="text-[10px] text-slate-500">
                    Syncs live: ON drops trust score to 35% (Flagged), OFF restores 94% Trust while preserving all inputs & certificates
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={simulateInvalidCert}
                  onChange={(e) =>
                    handleToggleSimulateInvalid(e.target.checked)
                  }
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
            Fetches live GitHub REST API data, parses LinkedIn URL, and validates candidate credentials.
          </p>
          <button
            type="button"
            onClick={handleRunVerification}
            disabled={scanning || (!candidateName.trim() && !profileUrl.trim())}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-900/40 transition-all"
          >
            {scanning ? (
              <>
                <RefreshCw size={15} className="animate-spin text-white" />
                <span>Fetching Live Footprint...</span>
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
              <h3 className="text-white font-bold text-sm">
                Real-Time Verification & GitHub API Fetch In Progress...
              </h3>
              <p className="text-xs text-slate-400">
                Querying api.github.com/users/{extractGitHubUsername(githubInput) || "user"}, parsing LinkedIn URL, and verifying certificate ledger.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs">
            {[
              `1. Fetching live GitHub profile from https://api.github.com/users/${extractGitHubUsername(githubInput) || "handle"}...`,
              "2. Parsing LinkedIn URL & matching candidate academic profile records...",
              "3. Mapping actual candidate credentials & primary uploaded certificate...",
              "4. Executing SHA-256 cryptographic hash checksum validation...",
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
              {scanResult.githubProfile?.avatarUrl ? (
                <img
                  src={scanResult.githubProfile.avatarUrl}
                  alt={scanResult.candidateName}
                  className="w-12 h-12 rounded-xl object-cover border border-indigo-500/50 shadow"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg">
                  {scanResult.candidateName[0]}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-white font-black text-lg">
                    {scanResult.candidateName}
                  </h3>
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
                        <span>
                          {scanResult.statusLabel ||
                            "Flagged Claims / Hash Discrepancy"}
                        </span>
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
                  Role: <strong className="text-slate-200">{scanResult.appliedRole}</strong> • Verified at {scanResult.timestamp}
                </p>
              </div>
            </div>

            {/* Gauge */}
            <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
              <TrustScoreGauge
                score={scanResult.trustScore}
                size={64}
                strokeWidth={5}
              />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  AI Match Score
                </span>
                <p
                  className={`text-base font-extrabold ${
                    getScoreStyles(scanResult.trustScore).text
                  }`}
                >
                  {scanResult.trustScore}% Trust
                </p>
              </div>
            </div>
          </div>

          {/* =================================================================
              DEDICATED 'DEVELOPER SOCIAL & CODE FOOTPRINT' CARD
              (Live GitHub Public API + Parsed LinkedIn Profile Badge)
          ================================================================= */}
          <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-xs text-indigo-300 font-extrabold uppercase tracking-wider flex items-center gap-2">
                <Github size={15} className="text-indigo-400" />
                Developer Social & Code Footprint (Live API & LinkedIn Parser)
              </h4>

              <div className="flex items-center gap-2 flex-wrap">
                {scanResult.linkedinProfile?.isLinked && (
                  <a
                    href={scanResult.linkedinProfile.cleanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-sky-950/80 hover:bg-sky-900/80 text-sky-300 px-3 py-1 rounded-full border border-sky-700/60 transition-colors"
                  >
                    <Linkedin size={12} className="text-sky-400" />
                    <span>LinkedIn Profile Linked</span>
                    <ExternalLink size={11} />
                  </a>
                )}

                {scanResult.githubProfile ? (
                  scanResult.githubProfile.status === "live" ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-700/60">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span>Live GitHub API Connected</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-amber-950/70 text-amber-300 px-3 py-1 rounded-full border border-amber-700/60">
                      <Info size={12} className="text-amber-400" />
                      <span>{scanResult.githubProfile.errorMessage}</span>
                    </span>
                  )
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left 7 Cols: Live GitHub Public Profile Card */}
              <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-4">
                {scanResult.githubProfile ? (
                  <>
                    <div className="flex items-start gap-3.5">
                      {scanResult.githubProfile.avatarUrl ? (
                        <img
                          src={scanResult.githubProfile.avatarUrl}
                          alt={scanResult.githubProfile.username}
                          className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-500/40 shrink-0 shadow-md"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                          <Github size={24} />
                        </div>
                      )}

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div>
                            <h5 className="text-sm font-extrabold text-white truncate">
                              {scanResult.githubProfile.displayName}
                            </h5>
                            <p className="text-xs font-mono text-indigo-400">
                              @{scanResult.githubProfile.username}
                            </p>
                          </div>

                          <a
                            href={scanResult.githubProfile.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                          >
                            <Github size={12} />
                            <span>Official GitHub Link</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed pt-1">
                          {scanResult.githubProfile.bio}
                        </p>
                      </div>
                    </div>

                    {/* Live Public Repos & Followers Counters */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                      <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                            Public Repositories
                          </span>
                          <span className="text-lg font-black text-white">
                            {scanResult.githubProfile.publicRepos}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">
                          public_repos
                        </span>
                      </div>

                      <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                            GitHub Followers
                          </span>
                          <span className="text-lg font-black text-emerald-400">
                            {scanResult.githubProfile.followers}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                          followers
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-xs text-slate-400 py-4 text-center">
                    No GitHub handle provided for this scan. Enter a GitHub username above to fetch live repositories & followers.
                  </div>
                )}
              </div>

              {/* Right 5 Cols: Parsed LinkedIn Profile & Actual Profile Text Info */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <Linkedin size={13} /> LinkedIn Profile Verification
                    </span>
                    {scanResult.linkedinProfile?.isLinked && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-700/50">
                        Verified Handle
                      </span>
                    )}
                  </div>

                  {scanResult.linkedinProfile?.isLinked ? (
                    <>
                      <p className="text-xs font-bold text-white">
                        Handle: <code className="text-sky-300 font-mono">{scanResult.linkedinProfile.handle}</code>
                      </p>
                      {scanResult.linkedinProfile.headline && (
                        <p className="text-[11px] text-slate-300 font-medium">
                          {scanResult.linkedinProfile.headline}
                        </p>
                      )}
                      {scanResult.linkedinProfile.about && (
                        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                          {scanResult.linkedinProfile.about}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-slate-400">
                      No LinkedIn URL provided.
                    </p>
                  )}
                </div>

                {scanResult.linkedinProfile?.isLinked && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {scanResult.linkedinProfile.connectionsText}
                    </span>
                    <a
                      href={scanResult.linkedinProfile.cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 underline"
                    >
                      <span>Open LinkedIn</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Verification Audit Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">
                  Profile & Internship Record
                </span>
                {scanResult.isSuspicious ? (
                  <XCircle size={15} className="text-rose-400" />
                ) : (
                  <CheckCircle2 size={15} className="text-emerald-400" />
                )}
              </div>
              <p
                className={`text-xs font-bold ${
                  scanResult.isSuspicious ? "text-rose-300" : "text-emerald-300"
                }`}
              >
                {scanResult.workAuthStatus}
              </p>
              <p className="text-[10px] text-slate-500">
                Mapped from candidate profile record
              </p>
            </div>

            <div
              className={`rounded-xl p-3.5 space-y-1 border ${
                scanResult.isWrongCert
                  ? "bg-rose-950/30 border-rose-800/80"
                  : "bg-slate-800/40 border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">
                  Certificate Hash
                </span>
                {scanResult.isWrongCert ? (
                  <XCircle size={15} className="text-rose-400" />
                ) : (
                  <CheckCircle2 size={15} className="text-emerald-400" />
                )}
              </div>
              <p
                className={`text-xs font-bold ${
                  scanResult.isWrongCert
                    ? "text-rose-400 font-extrabold"
                    : "text-emerald-300"
                }`}
              >
                {scanResult.certHashStatus}
              </p>
              <p className="text-[10px] text-slate-500 font-mono truncate">
                {scanResult.certHash}
              </p>
              {scanResult.isWrongCert && (
                <p className="text-[10px] text-rose-300 font-medium">
                  ⚠️ Checksum Failed: Mismatch with Registry
                </p>
              )}
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">
                  Academic Institution
                </span>
                {scanResult.isWrongCert ? (
                  <AlertTriangle size={15} className="text-amber-400" />
                ) : (
                  <CheckCircle2 size={15} className="text-emerald-400" />
                )}
              </div>
              <p
                className={`text-xs font-bold ${
                  scanResult.isWrongCert
                    ? "text-amber-300"
                    : "text-emerald-300"
                }`}
              >
                {scanResult.educationStatus}
              </p>
              <p className="text-[10px] text-slate-500">
                Verified from candidate profile (No fake CGPA)
              </p>
            </div>
          </div>

          {/* Candidate Verification Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                Total Certificates
              </span>
              <p className="text-xl font-bold text-white mt-0.5">
                {scanResult.certificates?.length || 0}{" "}
                {(scanResult.certificates?.length || 0) === 1
                  ? "Credential"
                  : "Credentials"}
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                Verified on Ledger
              </span>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">
                {scanResult.certificates?.filter((c) => c.verified).length ?? 0}{" "}
                Authentic
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                Discrepancy / Tamper Flags
              </span>
              <p
                className={`text-xl font-bold mt-0.5 ${
                  scanResult.isWrongCert ? "text-rose-400" : "text-slate-400"
                }`}
              >
                {scanResult.certificates?.filter((c) => !c.verified).length ??
                  0}{" "}
                Detected
              </p>
            </div>
          </div>

          {/* Earned Certifications & Cryptographic Hashes */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs text-slate-300 font-bold uppercase tracking-wider flex items-center gap-2">
                <Award size={15} className="text-indigo-400" />
                Earned Certifications & Cryptographic Hashes (
                {scanResult.certificates?.length || 0})
              </h4>
              <span className="text-[10px] text-indigo-400 font-mono bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60">
                Ledger Vault Synchronized
              </span>
            </div>

            <div className="max-h-[480px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
              {(scanResult.certificates || []).map((cert, idx) => (
                <div
                  key={cert.id + idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    cert.verified
                      ? "bg-slate-800/40 border-slate-700/80 hover:border-emerald-500/50"
                      : "bg-rose-950/20 border-rose-800/80 hover:border-rose-600"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-white">
                          {cert.title}
                        </span>
                        <span className="text-xs bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
                          {cert.issuer}
                        </span>
                        {cert.documentNote && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-indigo-950/90 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700/60 shadow-sm">
                            <FileText size={11} className="text-indigo-400" />
                            <span>
                              #1 Primary Certificate: {cert.documentNote}
                            </span>
                          </span>
                        )}
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
                        <span>
                          Issued:{" "}
                          <strong className="text-slate-300">
                            {cert.issueDate}
                          </strong>
                        </span>
                        <span>•</span>
                        <span>
                          Cert ID:{" "}
                          <code className="text-slate-300 font-mono">
                            {cert.id}
                          </code>
                        </span>
                      </div>

                      {/* Cryptographic Hash Bar */}
                      <div className="mt-1.5 flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                        <Hash
                          size={13}
                          className="text-indigo-400 shrink-0"
                        />
                        <span className="text-slate-400 text-[11px]">
                          Serial Hash:
                        </span>
                        <span
                          className={`font-semibold ${
                            cert.verified ? "text-indigo-300" : "text-rose-400"
                          }`}
                        >
                          {cert.serialHash}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-1">
                        {cert.verificationTimestamp}
                      </p>
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
                            <RefreshCw
                              size={12}
                              className="animate-spin text-indigo-400"
                            />
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
                Detected Fraud & Discrepancy Risk Factors (
                {scanResult.flags.length})
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
                <p className="font-bold text-emerald-300 text-sm">
                  Clear Background & Live Social Footprint Verified
                </p>
                <p className="text-slate-400 mt-0.5">
                  Authentic certificate hash signatures, verified LinkedIn handle, and live GitHub repository telemetry confirmed.
                </p>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              Would you like to persist this live report into the Directory?
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePushToDirectory}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow transition-colors"
              >
                <PlusCircle size={14} /> Add to Candidate Directory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP MODAL: "Yes, that is authenticated" */}
      {authPopupData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in"
          onClick={() => setAuthPopupData(null)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border-2 border-emerald-500/80 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-100 block">
                    Official Certificate Verification Result
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Yes, that is authenticated
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAuthPopupData(null)}
                className="w-8 h-8 rounded-lg bg-slate-950/30 hover:bg-slate-950/60 flex items-center justify-center text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-emerald-950/50 border border-emerald-500/50 rounded-2xl p-4 flex items-center gap-3">
                <BadgeCheck size={28} className="text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-extrabold text-emerald-300">
                    ✅ Yes, that is authenticated — 100% Verified Credential
                  </p>
                  <p className="text-slate-300 mt-0.5">
                    The certificate has been verified against the official issuer registry & cryptographic hash ledger.
                  </p>
                </div>
              </div>

              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Verdict:</span>
                  <strong className="text-emerald-400">
                    Yes, that is authenticated
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Candidate Name:</span>
                  <strong className="text-white">
                    {authPopupData.candidateName}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Certificate:</span>
                  <strong className="text-indigo-300 text-right">
                    {authPopupData.title}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Issuer:</span>
                  <strong className="text-slate-200 text-right">
                    {authPopupData.issuer}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Certificate ID:</span>
                  <strong className="text-amber-300 font-mono">
                    {authPopupData.certId}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SHA-256 Hash:</span>
                  <strong className="text-emerald-300 font-mono truncate max-w-[220px]">
                    {authPopupData.serialHash}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAuthPopupData(null)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg"
              >
                OK — Confirmed Authenticated
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
                        <span>Batch / Cohort: <strong className="text-slate-200">{candidate.education.year}</strong></span>
                        <span>•</span>
                        <span>Location: <strong className="text-slate-200">{candidate.location}</strong></span>
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
          <LiveAuthenticatorTool candidates={candidates} onAddCandidate={handleAddCandidate} />
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
