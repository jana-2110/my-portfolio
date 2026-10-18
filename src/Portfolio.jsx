import React, { useEffect, useRef, useState } from 'react';
import profileImage from './assets/jana.jpg';
import {
  ArrowDownRight,
  Cloud,
  Database,
  Server,
  Code,
  GitBranch,
  Workflow,
  ShieldCheck,
  FileJson,
  Settings2,
  Linkedin,
  Github,
  Mail,
  User,
  Terminal,
  MousePointer2,
  Container,
  Zap,
  Cpu,
  Bot,
  Blocks,
  FileCode,
  Globe,
  Trophy,
  Award,
  Star,
  Lock,
  Menu,
  X,
  Sparkles,
  MessageSquare,
  Send,
  Loader2,
  Smartphone,
  Home,
  Briefcase,
  Layers,
  ExternalLink,
  MapPin,
  Phone,
  Filter,
  ArrowLeft,
  Search,
  Instagram,
  MoreVertical
} from 'lucide-react';

// --- API Configuration ---
// 🔴 IMPORTANT: Replace with your API Key.
const apiKey = "";

// --- Portfolio Data Context for AI ---
const PORTFOLIO_CONTEXT = `
You are an AI assistant for S. Janarthanan's Portfolio.
Candidate: S. Janarthanan
Current Role: 3rd Year B.E. CSE Student
Institution: Annamalai University
Background: Diploma in Mechanical Engineering (DME)
Location: Salem/Trichy, India

Professional Summary:
Aspiring Computer Science and Engineering student with strong interest in Blockchain, Cloud Computing, and Full-Stack Development. Enjoys building real-world applications that combine smart contract technology, cloud platforms, and secure authentication systems. Focuses on solving problems through clean architecture, secure design, and user-friendly interfaces.

Technical Skills:
- Cloud: Azure Data Factory, Azure SQL, Blob Storage
- Blockchain: Solidity, Smart Contracts, Decentralized Apps (Voting System)
- Dev: Big Data Analytics, Full-Stack Development, App Development, Python, SQL
- Infra: Docker, Linux, Hadoop,API

Key Projects:
1. Automated Ingestion Pipeline (ADF)
2. Blockchain Online Voting System (Ethereum/Solidity)
3. Schema Drift Handling (Data Flows)

Achievements:
- NPTEL Certification in Cybersecurity & Privacy
- Idea Hackathon Winner (Blockchain Voting System)
- Certified Azure Data Engineer (DP-203)
- Diploma Completed (Mechanical Engineering) with distinction.
- Cyber Security Workshop Resource Person.

Tone: Professional, enthusiastic, and technical. Keep answers concise and helpful.
`;

// --- Styles & Animation Constants ---
const styles = {
  // THEME: Holographic Cyber-Void
  page: 'bg-[#030014] text-slate-200 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden md:cursor-none min-h-screen',
  accentText: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500',
  accentBorder: 'border-cyan-500/50',
  accentBg: 'bg-cyan-500',
  glassNav: 'bg-[#030014]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/10',
  card: 'bg-[#0f0c29]/60 backdrop-blur-md border border-white/5 relative overflow-hidden transition-all duration-500 group',
  techGrid: {
    backgroundSize: '40px 40px',
    maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)'
  }
};

// --- Data: Extended Projects List ---
const ALL_PROJECTS = [
  {
    id: 1,
    title: "Automated Ingestion Pipeline",
    desc: "End-to-end pipeline ingesting daily sales logs. Features metadata validation and Logic Apps integration.",
    icon: Settings2,
    tags: ["ADF", "Logic Apps", "JSON"],
    category: "Cloud",
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    id: 2,
    title: "Schema Drift Handling",
    desc: "Advanced Mapping Data Flows to manage dynamic schema changes automatically. Auto-cleans NULLs.",
    icon: Database,
    tags: ["Data Flow", "Schema Drift", "ETL"],
    category: "Data",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    desc: "Decentralized voting application using Ethereum smart contracts to ensure tamper-proof election results.",
    icon: Blocks,
    tags: ["Solidity", "Web3", "React"],
    category: "Blockchain",
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    id: 4,
    title: "Secure Cloud Auth System",
    desc: "Implemented OAuth2.0 authentication service using Node.js and Azure Active Directory.",
    icon: ShieldCheck,
    tags: ["Security", "Azure AD", "Node.js"],
    category: "Cloud",
    color: "text-red-400",
    bg: "bg-red-400/10"
  },
  {
    id: 5,
    title: "Big Data Log Analyzer",
    desc: "Hadoop-based log analysis tool processing 50GB+ daily server logs for anomaly detection.",
    icon: Server,
    tags: ["Hadoop", "Python", "Big Data"],
    category: "Data",
    color: "text-orange-400",
    bg: "bg-orange-400/10"
  },
  {
    id: 6,
    title: "DeFi Token Exchange",
    desc: "A simple decentralized exchange (DEX) for swapping ERC-20 tokens on the Goerli testnet.",
    icon: Zap,
    tags: ["Solidity", "DeFi", "DApp"],
    category: "Blockchain",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  },
  {
    id: 7,
    title: "AI Refund Fraud Detection",
    desc: "AI-powered system to detect fraudulent refund claims by analyzing patterns in generated validation images.",
    icon: Bot,
    tags: ["AI", "Python", "Computer Vision"],
    category: "AI",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    link: "https://github.com/jana-2110/AI-Based-Detection-of-Refund-Fraud-Using-Generated-Images-in-Food-Delivery-Platforms"
  },
  {
    id: 8,
    title: "Attendance System Frontend",
    desc: "Modern and responsive user interface for a smart attendance management system.",
    icon: Code,
    tags: ["React", "UI/UX", "Frontend"],
    category: "Dev",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    link: "https://github.com/jana-2110/projects/tree/main/attendace"
  }
];

// --- Moving Objects (Floating Background Elements) ---
const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
      <div className="absolute top-[40%] right-[20%] w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen"></div>
      <div className="absolute bottom-[20%] left-[30%] w-80 h-80 bg-pink-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen"></div>
    </div>
  );
};

// --- Particle Field ---
const ParticleField = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 10 + 20}s`,
    color: Math.random() > 0.5 ? 'rgba(6,182,212,0.4)' : 'rgba(168,85,247,0.4)'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full animate-drift"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: `0 0 ${parseInt(p.size) * 2}px ${p.color}`
          }}
        />
      ))}
    </div>
  );
};

// --- Custom Cursor ---
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trailer = trailerRef.current;
    let animationFrameId;

    let mouseX = 0;
    let mouseY = 0;
    let trailerX = 0;
    let trailerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const animateTrailer = () => {
      const factor = 0.15;
      trailerX += (mouseX - trailerX) * factor;
      trailerY += (mouseY - trailerY) * factor;

      if (trailer) {
        const rotation = performance.now() * 0.1;
        trailer.style.transform = `translate3d(${trailerX - 24}px, ${trailerY - 24}px, 0) rotate(${rotation}deg)`;
      }

      animationFrameId = requestAnimationFrame(animateTrailer);
    };

    window.addEventListener('mousemove', onMouseMove);
    animationFrameId = requestAnimationFrame(animateTrailer);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference`}
        style={{ marginTop: '-4px', marginLeft: '-4px' }}
      />
      <div
        ref={trailerRef}
        className={`fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9998] opacity-50`}
        style={{
          border: '1px dashed rgba(6,182,212,0.8)',
          boxShadow: '0 0 20px rgba(6,182,212,0.2)'
        }}
      />
    </div>
  );
};

// --- Typewriter Effect Component ---
const Typewriter = ({ text, speed = 150, className }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={`${className} inline-block`}>
      {displayText}
      <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-[#39FF14] align-middle"></span>
    </span>
  );
};

// --- AI Terminal ---
const AiTerminal = ({ isOpen, setIsOpen }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { role: 'system', text: "HOLOGRAPHIC ASSISTANT ONLINE. Initialize query about Candidate S. Janarthanan..." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMessage = query;
    setQuery("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
          systemInstruction: { parts: [{ text: PORTFOLIO_CONTEXT }] }
        })
      });
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Signal lost. Reconnecting...";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error: Uplink failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-6 z-50 flex flex-col items-end">
      <div className={`
        mb-4 w-[90vw] sm:w-80 md:w-96 bg-[#0a0a12]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.2)] 
        transition-all duration-300 origin-bottom-right overflow-hidden flex flex-col
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none h-0'}
      `} style={{ maxHeight: '500px' }}>
        <div className={`p-4 border-b border-white/5 bg-white/5 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-white font-bold tracking-widest">AI_COMPANION</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[300px] font-mono text-xs md:text-sm">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              <div className={`max-w-[85%] p-3 rounded-xl ${msg.role === 'user' ? `bg-cyan-500/20 text-cyan-100 border border-cyan-500/30` : `bg-white/5 text-gray-300 border border-white/10`}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && <div className="flex justify-start"><Loader2 size={16} className="animate-spin text-cyan-400" /></div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t border-white/5 bg-black/50 flex gap-2">
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about skills or projects..."
            className={`flex-1 bg-transparent border-none text-sm text-white focus:ring-0 placeholder-gray-600 font-mono`}
          />
          <button onClick={handleSend} className={`p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/40 transition-colors`}>
            <Send size={16} />
          </button>
        </div>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className={`group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-110 transition-all duration-300`}>
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
      </button>
    </div>
  );
};

// --- Section Title ---
const SectionTitle = ({ number, title }) => (
  <h2 className={`font-mono text-3xl md:text-5xl font-bold text-white/90 mb-16 flex items-center justify-center gap-6 reveal opacity-80 group cursor-default`}>
    <div className="h-px bg-gradient-to-r from-transparent to-cyan-500/50 w-12 md:w-24"></div>
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:animate-glitch">{number}</span>
    <span className="text-2xl md:text-4xl tracking-tight group-hover:text-cyan-200 transition-colors">{title}</span>
    <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent w-12 md:w-24"></div>
  </h2>
);

// --- Navigation Dock (UPDATED) ---
const Nav = ({ currentView, setView, setIsAiOpen, isAiOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Cpu, label: 'Skills' },
    { id: 'experience', icon: Briefcase, label: 'Exp' },
    { id: 'work', icon: Layers, label: 'Work' },
    { id: 'achievements', icon: Trophy, label: 'Awards' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  const handleNavClick = (item) => {
    if (item.id === 'work') {
      setView('projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.id === 'home') {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={`fixed z-50 transition-all duration-300
      top-6 
      w-full px-4 animate-fade-in-up flex justify-center`}>

      {/* Desktop Nav */}
      <nav className={`${styles.glassNav} hidden md:flex rounded-2xl px-4 py-2 justify-center items-center gap-5 border border-white/10`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.id === 'work' ? undefined : `#${item.id}`}
            onClick={(e) => {
              if (item.id === 'work' || item.id === 'home') e.preventDefault();
              handleNavClick(item);
            }}
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
          >
            <item.icon size={18} className="group-hover:scale-110 transition-transform" />
            <span className="font-mono font-medium relative">
              {item.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full ${(currentView === 'projects' && item.id === 'work') ? 'w-full' : ''}`}></span>
            </span>
          </a>
        ))}
      </nav>

      {/* Mobile Nav (Right Aligned 3-Dot Button) */}
      <div className="md:hidden w-full flex justify-end pr-2">
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-3 rounded-full border border-white/10 transition-all duration-300 shadow-lg ${isMenuOpen ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-[#0a0a12]/80 text-gray-400 hover:text-white'}`}
          >
            {isMenuOpen ? <X size={20} /> : <MoreVertical size={20} />}
          </button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-3 w-[200px] bg-[#0a0a12]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col gap-1 shadow-2xl animate-fade-in origin-top-right">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.id === 'work' ? undefined : `#${item.id}`}
                  onClick={(e) => {
                    if (item.id === 'work' || item.id === 'home') e.preventDefault();
                    handleNavClick(item);
                  }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 text-gray-300 hover:text-cyan-400 transition-all"
                >
                  <item.icon size={18} />
                  <span className="font-mono text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

// --- COMPONENTS FOR HOME VIEW ---

const Hero = ({ onViewWork }) => (
  <header id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-32">
    <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1 flex flex-col items-start relative z-10">

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 md:mb-10 reveal">
          <div>
            <div className={`font-mono text-xs ${styles.accentText} mb-2 tracking-widest`}>// SYSTEM_USER</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
              Hi, I'm <Typewriter text="S. JANARTHANAN" speed={100} className="underline decoration-[#39FF14] decoration-2 underline-offset-4 text-[#39FF14]" />
            </h2>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded mb-6 reveal delay-100">
          <span className={`w-2 h-2 ${styles.accentBg} rounded-full animate-pulse`}></span>
          <span className={`font-mono text-xs ${styles.accentText} tracking-wide typing-effect`}>SYSTEM ONLINE_</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-tight text-white mb-6 reveal delay-200">
          DATA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient">ENGINEER</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-xl leading-relaxed mb-10 reveal delay-200">
          To build a career as a Data Engineer where I can apply my skills in data pipelines, databases, and cloud technologies to design scalable data architectures, ensure efficient data flow, and support analytics and business intelligence solutions.
        </p>

        <div className="flex flex-wrap gap-6 mb-8 text-sm font-mono text-cyan-400/80 reveal delay-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
            <MapPin size={16} /> <span>Chennai, India</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
            <Phone size={16} /> <span>+91 96776 99402</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
            <Mail size={16} /> <span>janarthanan2626@gmail.com</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 reveal delay-400">
          <button onClick={onViewWork} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            View Work <ArrowDownRight size={18} />
          </button>
          <a href="#contact" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:border-cyan-500/50 transition-all backdrop-blur-md active:scale-95">
            Get in Touch
          </a>
        </div>

        <div className="flex gap-5 mt-8 reveal delay-500">
          <a href="https://www.linkedin.com/in/janarthanan-s-769a96356/" className="p-3 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 group">
            <Linkedin size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          </a>
          <a href="https://github.com/jana-2110" className="p-3 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 group">
            <Github size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          </a>
          <a href="mailto:janarthanan2626@gmail.com" className="p-3 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 group">
            <Mail size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          </a>
          <a href="https://www.instagram.com/_.thereal_batman/" target="_blank" rel="noreferrer" className="p-3 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 group">
            <Instagram size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          </a>
        </div>
      </div>
      <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative reveal delay-500">
        <div className="relative w-56 h-56 md:w-80 md:h-80 group">
          <div className="absolute inset-0 border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]"></div>
          <div className="absolute inset-4 border border-purple-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse] group-hover:animate-[spin_3s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl z-10 flex items-center justify-center bg-black">
            <img
              src={profileImage}
              alt="Profile"
              className={`w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100`}
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const TechTicker = () => {
  const techs = [
    { icon: Cloud, label: 'ADF' }, { icon: Database, label: 'SQL' }, { icon: Server, label: 'Blob' }, { icon: Code, label: 'Python' },
    { icon: Zap, label: 'n8n' }, { icon: Bot, label: 'Auto' }, { icon: Smartphone, label: 'Apps' }, { icon: Container, label: 'Docker' },
    { icon: Terminal, label: 'Linux' }, { icon: Blocks, label: 'Web3' }, { icon: Cpu, label: 'Hadoop' }, { icon: GitBranch, label: 'Git' }, { icon: FileJson, label: 'API Testing' }
  ];
  const infiniteTechs = [...techs, ...techs, ...techs];
  return (
    <div id="skills" className="py-12 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10"></div>
      <div className="flex animate-scroll w-max hover:pause-scroll">
        {infiniteTechs.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-8 group cursor-default transition-all duration-300 hover:scale-110">
            <t.icon className="text-gray-500 group-hover:text-cyan-400 transition-colors" size={24} />
            <span className="font-mono text-lg text-gray-500 group-hover:text-white transition-colors font-bold">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  const terminalData = [
    { cmd: 'whoami', res: 'S. Janarthanan (Data Engineer)' },
    { cmd: 'cat education.txt', res: '1. Diploma in Mech. Eng. (Completed)\n2. B.E. CSE, Annamalai Univ. (Pursuing)' },
    { cmd: 'cat focus.json', res: '{ "primary": ["Big Data", "Blockchain"], "style": "Secure & Clean" }' },
    { cmd: './init_innovation.sh', res: 'RUNNING...' }
  ];
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionTitle title="ABOUT ME" />
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal space-y-6 text-lg text-gray-400 leading-relaxed">
          <p>I am an aspiring <b>Computer Science and Engineering</b> student with strong interest in <b>Blockchain</b>, <b>Cloud Computing</b>, and <b>Full-Stack Development</b>.</p>
          <p>I enjoy building real-world applications that combine <b>smart contract technology</b>, <b>cloud platforms</b>, and <b>secure authentication systems</b>.</p>
          <p>I focus on solving problems through <b>clean architecture</b>, <b>secure design</b>, and <b>user-friendly interfaces</b>.</p>
          <div className="pt-4">
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 font-bold rounded-full hover:bg-cyan-500/20 hover:scale-105 transition-all duration-300 group">Get in Touch <Mail size={18} className="group-hover:rotate-12 transition-transform" /></a>
          </div>
        </div>
        <div className="relative reveal delay-200 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
          <div className="relative bg-[#05050a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2"><div className="w-2 h-2 rounded-full bg-red-500/80"></div><div className="w-2 h-2 rounded-full bg-yellow-500/80"></div><div className="w-2 h-2 rounded-full bg-green-500/80"></div><div className="ml-auto text-[10px] font-mono text-gray-500 uppercase tracking-widest">user: admin // secure_shell</div></div>
            <div className="p-6 font-mono text-sm space-y-5 text-gray-300">
              {terminalData.map((item, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 500}ms` }}>
                  <div className="flex gap-2"><span className="text-cyan-500">➜</span><span className="text-purple-400">~</span><span className="text-yellow-300">{item.cmd}</span></div>
                  <div className="mt-1 pl-4 text-white/80 whitespace-pre-wrap border-l border-white/10">{item.res}</div>
                </div>
              ))}
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => (
  <section id="experience" className="py-32 px-6 max-w-7xl mx-auto">
    <SectionTitle title="EXPERIENCE" />
    <div className="relative border-l-2 border-white/5 pl-12 space-y-12 ml-4 md:ml-0">
      <div className="reveal relative">
        <div className="absolute -left-[55px] top-0 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] ring-4 ring-[#030014] animate-ping-slow"></div>
        <div className="absolute -left-[55px] top-0 w-4 h-4 rounded-full bg-cyan-500"></div>
        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-8 rounded-2xl hover:border-cyan-500/30 transition-all duration-500 group hover:-translate-y-2">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div><h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">Data Engineer Intern</h3><div className="text-gray-400 font-mono mt-1 flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>VDART INC. // TRICHY</div></div>
            <div className="px-4 py-1 rounded-full border border-white/10 bg-black/50 text-xs font-mono text-gray-400">JAN 2025 - APR 2025</div>
          </div>
          <p className="text-gray-300 mb-8 leading-relaxed">Spearheaded the migration of legacy on-premise operational data to Azure Cloud. Designed automated pipelines that reduced manual data handling by 40% while ensuring zero data loss.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-colors flex gap-4 items-start group/item"><div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover/item:scale-110 transition-transform"><Workflow size={20} /></div><div><div className="text-white font-bold text-sm mb-1">Orchestration</div><p className="text-xs text-gray-500">Built 10+ ADF pipelines with robust error handling & triggers.</p></div></div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-colors flex gap-4 items-start group/item"><div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover/item:scale-110 transition-transform"><ShieldCheck size={20} /></div><div><div className="text-white font-bold text-sm mb-1">Security</div><p className="text-xs text-gray-500">Implemented Azure Key Vault for zero-trust credential management.</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProjectCard = ({ p, i }) => {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };
  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => p.link && window.open(p.link, '_blank')} className={`relative bg-[#080810] border border-white/5 rounded-2xl overflow-hidden group transition-transform duration-200 ease-out reveal delay-${i * 100} ${p.link ? 'cursor-pointer' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
      <div className="h-24 bg-white/[0.02] border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={styles.techGrid}></div>
        <div className={`absolute bottom-4 left-4 p-2 rounded-lg border border-white/10 ${p.bg}`}><p.icon className={p.color} size={24} /></div>
      </div>
      <div className="p-6 pt-4">
        <div className="flex justify-between items-start mb-3"><h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{p.title}</h3><ExternalLink size={16} className="text-gray-600 group-hover:text-white transition-colors" /></div>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{p.desc}</p>
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
          {p.tags.map(tag => (<span key={tag} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-gray-400 hover:text-cyan-400 transition-colors">#{tag}</span>))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};

const ProjectsPreview = ({ onViewAll }) => {
  const projects = [
    { title: "Automated Ingestion Pipeline", desc: "End-to-end pipeline ingesting daily sales logs. Features metadata validation and Logic Apps integration.", icon: Settings2, tags: ["ADF", "Logic Apps", "JSON"], color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Schema Drift Handling", desc: "Advanced Mapping Data Flows to manage dynamic schema changes automatically. Auto-cleans NULLs.", icon: Database, tags: ["Data Flow", "Schema Drift", "ETL"], color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Blockchain Voting System", desc: "Decentralized voting application using Ethereum smart contracts to ensure tamper-proof election results.", icon: Blocks, tags: ["Solidity", "Web3", "React"], color: "text-purple-400", bg: "bg-purple-400/10" }
  ];
  return (
    <section id="work" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <SectionTitle title="PROJECTS" />
        <button onClick={onViewAll} className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-white transition-colors mb-16">View Archive <ArrowDownRight size={16} /></button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (<ProjectCard key={i} p={p} i={i} />))}
      </div>
      <div className="mt-8 text-center md:hidden"><button onClick={onViewAll} className="text-cyan-400 hover:text-white text-sm underline">View All Projects</button></div>
    </section>
  );
};

const Achievements = () => {
  const awards = [
    { title: "Certified Azure Data Engineer", sub: "DP-203 (Microsoft)", icon: Trophy, accent: "from-yellow-400 to-orange-500" },
    { title: "Idea Hackathon Winner", sub: "Blockchain Voting System", icon: Award, accent: "from-blue-400 to-cyan-500" },
    { title: "Diploma Gold Medalist", sub: "Mechanical Engineering", icon: Star, accent: "from-purple-400 to-pink-500" },
    { title: "Internship Completed", sub: "VDart Inc.", icon: Zap, accent: "from-green-400 to-emerald-500" },
    { title: "Workshop Resource Person", sub: "Cyber Security", icon: Lock, accent: "from-red-400 to-rose-500" },
    { title: "NPTEL Certification", sub: "Cybersecurity", icon: ShieldCheck, accent: "from-indigo-400 to-violet-500" },
  ];
  return (
    <section id="achievements" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionTitle title="ACHIVEMENTS" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {awards.map((a, i) => (
          <div key={i} className="group relative bg-[#0a0a12] border border-white/10 p-1 rounded-xl overflow-hidden reveal hover:scale-[1.02] transition-all duration-300 cursor-default">
            <div className={`absolute inset-0 bg-gradient-to-r ${a.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer`}></div>
            <div className="relative bg-[#05050a] p-4 rounded-lg flex items-center gap-4 h-full z-10">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${a.accent} bg-opacity-10 group-hover:rotate-12 transition-transform duration-300`}><a.icon className="text-white drop-shadow-lg" size={20} /></div>
              <div><h4 className="text-white font-bold text-sm group-hover:text-cyan-300 transition-colors">{a.title}</h4><p className="text-gray-500 text-xs font-mono mt-1">{a.sub}</p></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subject = `Inquiry from ${formData.get('name')}`;
    const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`;
    window.location.href = `mailto:janarthanan2626@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <section id="contact" className="py-32 px-6 max-w-3xl mx-auto text-center">
      <div className="inline-block p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 mb-8 backdrop-blur-md animate-bounce-slow"><Mail className="text-cyan-400" size={32} /></div>
      <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">Ready to Collaborate?</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm font-mono text-cyan-400/80 bg-[#0a0a12]/80 p-4 rounded-xl border border-white/10 inline-flex hover:border-cyan-500/50 transition-colors">
        <div className="flex items-center gap-2 group cursor-pointer hover:text-white"><MapPin size={16} /> <span>Chennai, India</span></div><div className="w-px h-4 bg-white/10 hidden md:block"></div>
        <div className="flex items-center gap-2 group cursor-pointer hover:text-white"><Phone size={16} /> <span>+91 96776 99402</span></div><div className="w-px h-4 bg-white/10 hidden md:block"></div>
        <div className="flex items-center gap-2 group cursor-pointer hover:text-white"><Mail size={16} /> <span>janarthanan2626@gmail.com</span></div>
      </div>
      <form onSubmit={handleSubmit} className="text-left space-y-4 bg-[#0a0a12]/50 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden reveal">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse-slow"></div>
        <div className="grid md:grid-cols-2 gap-4 relative z-10">
          <div className="space-y-2"><label className="text-xs font-mono text-gray-500 ml-1">IDENTITY</label><input name="name" type="text" required className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all focus:ring-1 focus:ring-cyan-500/50" /></div>
          <div className="space-y-2"><label className="text-xs font-mono text-gray-500 ml-1">SIGNAL_RETURN</label><input name="email" type="email" required className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all focus:ring-1 focus:ring-cyan-500/50" /></div>
        </div>
        <div className="space-y-2 relative z-10"><label className="text-xs font-mono text-gray-500 ml-1">DATA_PACKET</label><textarea name="message" rows="4" required className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all focus:ring-1 focus:ring-cyan-500/50"></textarea></div>
        <button type="submit" className="relative z-10 w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 overflow-hidden group"><span className="relative z-10 flex items-center gap-2">Initialise Uplink <Send size={18} className="group-hover:translate-x-1 transition-transform" /></span><div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div></button>
      </form>
    </section>
  )
}

const Footer = () => (
  <footer className="border-t border-white/5 py-12 bg-[#02000a] mb-24 md:mb-0">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
      <div className="flex gap-6">
        <a href="https://www.linkedin.com/in/janarthanan-s-769a96356/" className="text-gray-400 hover:text-white transition-colors hover:scale-110"><Linkedin size={20} /></a>
        <a href="https://github.com/jana-2110" className="text-gray-400 hover:text-white transition-colors hover:scale-110"><Github size={20} /></a>
        <a href="janarthanan2626@gmail.com" className="text-gray-400 hover:text-white transition-colors hover:scale-110"><Mail size={20} /></a>
        <a href="https://www.instagram.com/_.thereal_batman/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110"><Instagram size={20} /></a>
      </div>
      <div className="text-gray-500 text-sm font-mono">&copy; 2025 S. Janarthanan</div>
    </div>
  </footer>
);

// --- NEW: Full Projects Archive Page ---
const ProjectsPage = ({ onBack }) => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Cloud', 'Blockchain', 'Data'];

  const filteredProjects = ALL_PROJECTS.filter(p => filter === 'All' || p.category === filter);

  return (
    <div className="min-h-screen pt-24 px-6 pb-32">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-cyan-400 hover:text-white mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Archives</span></h1>
            <p className="text-gray-400 max-w-xl">A complete log of all deployed systems, prototypes, and hackathon submissions.</p>
          </div>
          <div className="flex gap-2 mt-6 md:mt-0 bg-white/5 p-1 rounded-lg">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${filter === f ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-gray-400 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {filteredProjects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Layout Management ---
const MainContent = ({ setView }) => (
  <>
    <Hero onViewWork={() => setView('projects')} />
    <TechTicker />
    <About />
    <Experience />
    <ProjectsPreview onViewAll={() => setView('projects')} />
    <Achievements />
    <Contact />
  </>
);

export default function Portfolio() {
  const [view, setView] = useState('home');
  const [isAiOpen, setIsAiOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [view]); // Re-run observer when view changes

  return (
    <div className={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .animate-scroll { animation: scroll 30s linear infinite; }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-drift { animation: drift linear infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
        .animate-shimmer { animation: shimmer 2s linear infinite; }
        
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes drift { from { transform: translate(0, 0); } to { transform: translate(100px, -100px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 50% { opacity: .5; } }
        .typing-effect { border-right: 2px solid #06b6d4; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { border-color: transparent; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
      `}</style>

      <CustomCursor />
      <FloatingOrbs />
      <ParticleField />
      <AiTerminal isOpen={isAiOpen} setIsOpen={setIsAiOpen} />

      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={styles.techGrid}></div>

      <Nav currentView={view} setView={setView} setIsAiOpen={setIsAiOpen} isAiOpen={isAiOpen} />

      {view === 'home' ? <MainContent setView={setView} /> : <ProjectsPage onBack={() => setView('home')} />}

      <Footer />
    </div>
  );
}