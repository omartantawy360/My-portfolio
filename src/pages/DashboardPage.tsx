import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import {
  profile,
  skills,
  projects,
  certificates,
  socialLinks,
  stats,
} from '../data/portfolioData';
import type { Skill } from '../data/portfolioData';

/* ═══════════════════════════════════════════════════════
   CYBERPUNK DASHBOARD — /dashboard
   High-fidelity developer command center with real data.
   ═══════════════════════════════════════════════════════ */

/* ─── Animated Skill Bar (SVG arc meter) ─── */
const SkillMeter: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated ? (skill.proficiency / 100) * circumference : circumference);

  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
          {/* Track */}
          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
          {/* Progress */}
          <circle
            cx="40" cy="40" r={radius}
            fill="none"
            stroke="url(#fuchsiaGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-[1500ms] ease-out"
          />
          <defs>
            <linearGradient id="fuchsiaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black text-white tabular-nums">
            {animated ? skill.proficiency : 0}
            <span className="text-xs text-fuchsia-400">%</span>
          </span>
        </div>
      </div>
      <span className="text-[11px] font-bold text-slate-400 text-center leading-tight group-hover:text-fuchsia-400 transition-colors max-w-[90px]">
        {skill.name}
      </span>
    </div>
  );
};

/* ─── Horizontal animated bar chart ─── */
const SkillBar: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-slate-300 group-hover:text-fuchsia-400 transition-colors">{skill.name}</span>
        <span className="text-[10px] font-mono font-bold text-fuchsia-400 tabular-nums">{skill.proficiency}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-600 to-fuchsia-400 transition-all duration-[1500ms] ease-out shadow-lg shadow-fuchsia-500/20"
          style={{ width: animated ? `${skill.proficiency}%` : '0%' }}
        />
      </div>
    </div>
  );
};

/* ─── Interactive Terminal ─── */
interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

const CyberTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', text: '╔══════════════════════════════════════════════╗' },
    { type: 'system', text: '║  OMAR_TANTAWY // CYBERPUNK TERMINAL v2.0    ║' },
    { type: 'system', text: '║  Type "help" to see available commands.      ║' },
    { type: 'system', text: '╚══════════════════════════════════════════════╝' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(scrollToBottom, [lines, scrollToBottom]);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', text: `$ ${cmd}` },
    ];

    switch (trimmed) {
      case 'help':
        newLines.push(
          { type: 'output', text: '' },
          { type: 'system', text: '┌─ AVAILABLE COMMANDS ─────────────────────────┐' },
          { type: 'output', text: '  about       → Display developer profile' },
          { type: 'output', text: '  skills      → List technical skills' },
          { type: 'output', text: '  projects    → Show project portfolio' },
          { type: 'output', text: '  certs       → Display certifications' },
          { type: 'output', text: '  contact     → Show contact info' },
          { type: 'output', text: '  stats       → Quick stats overview' },
          { type: 'output', text: '  socials     → Social media links' },
          { type: 'output', text: '  clear       → Clear terminal' },
          { type: 'output', text: '  help        → Show this help menu' },
          { type: 'system', text: '└──────────────────────────────────────────────┘' },
        );
        break;

      case 'about':
        newLines.push(
          { type: 'output', text: '' },
          { type: 'system', text: `┌─ ${profile.name.toUpperCase()} ─┐` },
          { type: 'output', text: `  Role:      ${profile.role}` },
          { type: 'output', text: `  Location:  ${profile.location} (${profile.timezone})` },
          { type: 'output', text: `  Status:    ${profile.status}` },
          { type: 'output', text: `  Approach:  ${profile.approach}` },
          { type: 'output', text: '' },
          { type: 'output', text: `  ${profile.bio}` },
          { type: 'system', text: '└──────────────────────────────────────────────┘' },
        );
        break;

      case 'skills':
        newLines.push(
          { type: 'output', text: '' },
          { type: 'system', text: '┌─ TECHNICAL SKILLS ───────────────────────────┐' },
        );
        const categories = ['Frontend', 'Languages', 'Tools'] as const;
        categories.forEach(cat => {
          newLines.push({ type: 'system', text: `  ── ${cat.toUpperCase()} ──` });
          skills.filter(s => s.category === cat).forEach(s => {
            const bar = '█'.repeat(Math.floor(s.proficiency / 10)) + '░'.repeat(10 - Math.floor(s.proficiency / 10));
            newLines.push({ type: 'output', text: `  ${s.name.padEnd(22)} ${bar} ${s.proficiency}%` });
          });
          newLines.push({ type: 'output', text: '' });
        });
        newLines.push({ type: 'system', text: '└──────────────────────────────────────────────┘' });
        break;

      case 'projects':
        newLines.push(
          { type: 'output', text: '' },
          { type: 'system', text: `┌─ PROJECTS (${projects.length}) ──────────────────────────┐` },
        );
        projects.forEach((p, i) => {
          newLines.push(
            { type: 'output', text: `  [${i + 1}] ${p.title}` },
            { type: 'output', text: `      ${p.tags.join(' · ')}` },
            { type: 'output', text: `      → ${p.link}` },
            { type: 'output', text: '' },
          );
        });
        newLines.push({ type: 'system', text: '└──────────────────────────────────────────────┘' });
        break;

      case 'certs':
        newLines.push(
          { type: 'output', text: '' },
          { type: 'system', text: `┌─ CERTIFICATIONS (${certificates.length}) ─────────────────────┐` },
        );
        certificates.forEach((c, i) => {
          newLines.push(
            { type: 'output', text: `  [${i + 1}] ${c.title}` },
            { type: 'output', text: `      Issuer: ${c.issuer}` },
            { type: 'output', text: '' },
          );
        });
        newLines.push({ type: 'system', text: '└──────────────────────────────────────────────┘' });
        break;

      case 'contact':
        newLines.push(
          { type: 'output', text: '' },
          { type: 'system', text: '┌─ CONTACT ────────────────────────────────────┐' },
          { type: 'output', text: `  Email:     ${profile.email}` },
          { type: 'output', text: `  Location:  ${profile.location}` },
          { type: 'output', text: `  Timezone:  ${profile.timezone}` },
          { type: 'system', text: '└──────────────────────────────────────────────┘' },
        );
        break;

      case 'stats':
        newLines.push(
          { type: 'output', text: '' },
          { type: 'system', text: '┌─ QUICK STATS ────────────────────────────────┐' },
          { type: 'output', text: `  Projects Completed:    ${stats.projectsCompleted}` },
          { type: 'output', text: `  Certifications:        ${stats.certificationsEarned}` },
          { type: 'output', text: `  Technical Skills:      ${stats.techSkills}` },
          { type: 'output', text: `  Frontend Frameworks:   ${stats.frontendSkills}` },
          { type: 'output', text: `  Languages Known:       ${stats.languages}` },
          { type: 'output', text: `  Dev Tools:             ${stats.tools}` },
          { type: 'system', text: '└──────────────────────────────────────────────┘' },
        );
        break;

      case 'socials':
        newLines.push(
          { type: 'output', text: '' },
          { type: 'system', text: '┌─ SOCIAL LINKS ───────────────────────────────┐' },
        );
        socialLinks.forEach(s => {
          newLines.push({ type: 'output', text: `  ${s.name.padEnd(12)} → ${s.href}` });
        });
        newLines.push({ type: 'system', text: '└──────────────────────────────────────────────┘' });
        break;

      case 'clear':
        setLines([
          { type: 'system', text: 'Terminal cleared.' },
          { type: 'output', text: '' },
        ]);
        setInput('');
        return;

      case '':
        break;

      default:
        newLines.push({
          type: 'error',
          text: `  Command not found: "${cmd}". Type "help" for available commands.`,
        });
        break;
    }

    setLines(newLines);
    setInput('');
  }, [lines]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="bg-slate-950/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl shadow-fuchsia-500/5 flex flex-col h-full">
      {/* Title bar */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-slate-950/80 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <span className="text-[10px] font-mono font-bold text-fuchsia-400/60 tracking-widest">
          CYBER_TERMINAL v2.0
        </span>
        <div className="w-16" />
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        onClick={focusInput}
        className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed cursor-text min-h-[300px] max-h-[500px] scrollbar-thin scrollbar-thumb-fuchsia-500/20 scrollbar-track-transparent"
      >
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${
            line.type === 'input' ? 'text-fuchsia-400'
            : line.type === 'error' ? 'text-rose-400'
            : line.type === 'system' ? 'text-fuchsia-500/70'
            : 'text-slate-400'
          }`}>
            {line.text}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-fuchsia-500 font-bold select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-fuchsia-300 caret-fuchsia-400 placeholder:text-slate-700"
            placeholder='type "help" to begin...'
            spellCheck={false}
            autoComplete="off"
          />
          <span className="w-2 h-4 bg-fuchsia-500 animate-pulse rounded-sm" />
        </div>
      </div>
    </div>
  );
};

/* ─── Stat Card ─── */
const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; delay: number }> = ({
  label, value, icon, delay,
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className={`bg-slate-950/50 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-fuchsia-500/30 hover:shadow-lg hover:shadow-fuchsia-500/10 transition-all duration-500 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 group-hover:bg-fuchsia-500 group-hover:text-white transition-all duration-300">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">METRIC</span>
      </div>
      <div className="text-3xl font-black text-white mb-1 tabular-nums">{value}</div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN DASHBOARD COMPONENT
   ═══════════════════════════════════════════════════════ */
const DashboardPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState<'Frontend' | 'Languages' | 'Tools'>('Frontend');
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Cursor trailer
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        window.requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
          }
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const filteredSkills = skills.filter(s => s.category === activeSkillTab);
  const skillTabs: Array<'Frontend' | 'Languages' | 'Tools'> = ['Frontend', 'Languages', 'Tools'];

  return (
    <div className={`min-h-screen bg-slate-950 text-white relative overflow-hidden selection:bg-fuchsia-500/30 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      {/* Cursor trailer */}
      {!isMobile && (
        <div ref={cursorRef} className="fixed top-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[1] mix-blend-screen transition-transform duration-150 ease-out hidden lg:block"
          style={{ background: 'radial-gradient(circle, rgba(217, 70, 239, 0.10) 0%, transparent 70%)' }} />
      )}

      {/* ─── Background ─── */}
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-fuchsia-600/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[130px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

      {/* ─── Top Navigation ─── */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 text-xs font-semibold hover:text-white transition-colors group">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Hub
            </Link>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
              <span className="text-xs font-bold text-fuchsia-400 tracking-widest uppercase">Cyberpunk Dashboard</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-slate-600">
            <span>SYS_STATUS: ONLINE</span>
            <span className="text-fuchsia-500">●</span>
            <span>{profile.timezone}</span>
          </div>
        </div>
      </nav>

      {/* ─── Dashboard Content ─── */}
      <main className="relative z-10 max-w-screen-2xl mx-auto px-4 md:px-8 py-8 pb-24 space-y-8">

        {/* ──── ROW 1: Profile Banner + Stats ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile panel */}
          <div className="lg:col-span-2 bg-slate-950/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-fuchsia-500/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-fuchsia-500/10 transition-colors" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-3xl font-black shadow-2xl shadow-fuchsia-500/20 shrink-0">
                OT
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight">{profile.name}</h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {profile.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-fuchsia-400 text-sm font-bold tracking-wide mb-2">{profile.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">{profile.bio}</p>
              </div>
            </div>

            {/* Social links row */}
            <div className="relative z-10 flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
              {socialLinks.map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-xs font-semibold hover:bg-fuchsia-500/10 hover:border-fuchsia-500/20 hover:text-fuchsia-400 transition-all">
                  {s.name}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Stats column */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Projects" value={stats.projectsCompleted} delay={200} icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
            } />
            <StatCard label="Certifications" value={stats.certificationsEarned} delay={350} icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
            } />
            <StatCard label="Tech Skills" value={stats.techSkills} delay={500} icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
            } />
            <StatCard label="Frontend" value={`${stats.frontendSkills} Libs`} delay={650} icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25L12 17.25 2.25 12l4.179-2.25" /></svg>
            } />
          </div>
        </div>

        {/* ──── ROW 2: Skills Charts + Terminal ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Skills Panel (3 cols) */}
          <div className="lg:col-span-3 bg-slate-950/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-fuchsia-500/20 transition-all duration-500">
            {/* Panel header */}
            <div className="p-6 pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-white mb-1">Technical Skills</h2>
                <p className="text-xs text-slate-600 font-semibold">Proficiency levels based on project experience</p>
              </div>
              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
                {skillTabs.map(tab => (
                  <button key={tab} onClick={() => setActiveSkillTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                      activeSkillTab === tab
                        ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20'
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Charts area */}
            <div className="p-6">
              {/* Circle meters row (desktop) / bar charts (mobile) */}
              {!isMobile ? (
                <div className="flex flex-wrap justify-center gap-6">
                  {filteredSkills.map((skill, i) => (
                    <SkillMeter key={skill.name} skill={skill} delay={i * 150} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSkills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} delay={i * 100} />
                  ))}
                </div>
              )}
            </div>

            {/* Mini bar chart below circles (desktop only) */}
            {!isMobile && (
              <div className="px-6 pb-6 space-y-3 border-t border-white/5 pt-6">
                {filteredSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} delay={i * 100 + 600} />
                ))}
              </div>
            )}
          </div>

          {/* Terminal (2 cols) */}
          <div className="lg:col-span-2">
            <CyberTerminal />
          </div>
        </div>

        {/* ──── ROW 3: Projects Grid ──── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-white mb-1">Project Portfolio</h2>
              <p className="text-xs text-slate-600 font-semibold">{projects.length} projects • Click to launch</p>
            </div>
            <Link to="/classic#projects" className="text-xs text-fuchsia-400 font-bold hover:text-fuchsia-300 transition-colors">
              View in Classic Mode →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer"
                className="group bg-slate-950/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-fuchsia-500/30 hover:shadow-2xl hover:shadow-fuchsia-500/10 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-900/50">
                  <img src={project.image} alt={project.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                  {/* Glow overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  {/* Fuchsia reflection bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Launch icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-950/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-fuchsia-400 group-hover:border-fuchsia-500/30 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-fuchsia-400 transition-colors">{project.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ──── ROW 4: Certifications ──── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-white mb-1">Certifications</h2>
              <p className="text-xs text-slate-600 font-semibold">{certificates.length} verified credentials</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {certificates.map((cert, index) => (
              <a key={cert.id} href={cert.link} target="_blank" rel="noopener noreferrer"
                className="group bg-slate-950/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 hover:border-fuchsia-500/30 hover:shadow-lg hover:shadow-fuchsia-500/10 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up text-center"
                style={{ animationDelay: `${index * 100}ms` }}>
                {/* Badge icon */}
                <div className="w-10 h-10 mx-auto rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center mb-3 group-hover:bg-fuchsia-500 group-hover:border-fuchsia-500 transition-all duration-300">
                  <svg className="w-5 h-5 text-fuchsia-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-white mb-1 group-hover:text-fuchsia-400 transition-colors leading-tight">{cert.title}</h3>
                <p className="text-[10px] text-slate-600 font-semibold">{cert.issuer}</p>
              </a>
            ))}
          </div>
        </div>

        {/* ──── Footer Quote ──── */}
        <div className="text-center py-8 border-t border-white/5">
          <p className="text-slate-600 text-xs italic max-w-xl mx-auto">
            {profile.quote} — Applied to every line of code.
          </p>
          <p className="text-fuchsia-500/40 text-[10px] font-mono mt-3 tracking-widest">
            DASHBOARD_v2.0 // {profile.name.toUpperCase()}
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
