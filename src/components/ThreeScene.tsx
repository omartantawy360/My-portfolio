import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, useGLTF, CameraControls, Html, Center } from '@react-three/drei';
import * as THREE from 'three';
import { profile, socialLinks, skills, projects, certificates, stats } from '../data/portfolioData';

// Dynamic Public URL for GitHub Pages support
const GLB_URL = process.env.PUBLIC_URL + '/assets/cyber_room.glb';

useGLTF.preload(GLB_URL);

/* ─── Stylized Canvas Loader ─── */
const CanvasLoader: React.FC = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center pointer-events-none">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-fuchsia-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-fuchsia-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
      </div>
      <div className="text-cyan-400 font-mono text-sm tracking-[0.2em] animate-pulse">BOOTING_ENVIRONMENT...</div>
    </div>
  </Html>
);

/* ─── Cyber Room Diorama & Interactive UI ─── */
const RoomModel: React.FC<{ onOpenPC: () => void }> = ({ onOpenPC }) => {
  const { scene } = useGLTF(GLB_URL);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Intercept all clicks on the 3D model
  const handleClick = (e: any) => {
    e.stopPropagation();
    const meshName = e.object.name;
    console.log("CLICKED MESH:", meshName);

    // Trigger UI if they click the floating menus, screens, or most interactive objects
    if (!meshName.toLowerCase().includes('plane') && !meshName.toLowerCase().includes('room')) {
      setActiveSection('PORTFOLIO');
      onOpenPC(); // Fly camera into seated position
    }
  };

  return (
    <group>
      <primitive 
        object={scene} 
        onClick={handleClick} 
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
        scale={1.5} 
      />

      {/* ── IN-ROOM MONITOR DISPLAY ── */}
      {/* Positioned exactly where the PC monitor is in the 3D diorama */}
      {activeSection === 'PORTFOLIO' && (
        <Html 
          transform 
          center 
          position={[0.73, 5.80, 3.53]} 
          rotation={[0, 3.14, 0]}       
          distanceFactor={2.84}        
          zIndexRange={[100, 0]}
        >
          <div className="w-[800px] h-[450px] bg-slate-950/95 border-2 border-cyan-500/50 rounded-lg shadow-[0_0_60px_rgba(6,182,212,0.4)] flex flex-col overflow-hidden pointer-events-auto">
            {/* Header / Topbar */}
            <div className="h-12 bg-black/80 border-b border-cyan-500/30 flex items-center justify-between px-6 shrink-0">
              <span className="font-mono text-cyan-400 tracking-widest text-sm animate-pulse">OS_ONLINE // OMAR_TANTAWY</span>
              <button 
                onClick={() => {
                  setActiveSection(null);
                  document.dispatchEvent(new CustomEvent('LEAVE_PC')); // Tell Camera to fly back
                }} 
                className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2 text-xs font-bold"
              >
                <span>LEAVE PC</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content Area - Full Portfolio Scrollable */}
            <div className="flex-1 p-6 flex flex-col gap-10 overflow-y-auto custom-scrollbar relative">
              
              {/* Header: Bio & Stats */}
              <div className="flex flex-col gap-6 shrink-0">
                <section>
                  <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">{profile.name}</h1>
                  <h2 className="text-sm font-mono text-slate-300 mb-4">{profile.role}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">{profile.bio}</p>
                </section>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Projects', value: stats.projectsCompleted },
                    { label: 'Certificates', value: stats.certificationsEarned },
                    { label: 'Frontend', value: stats.frontendSkills },
                    { label: 'Tools', value: stats.tools }
                  ].map(stat => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-black text-cyan-400 mb-1">{stat.value}</div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <section className="shrink-0">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Core Capabilities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                  {skills.map(skill => (
                    <div key={skill.name} className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="text-cyan-400">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full" style={{ width: `${skill.proficiency}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects Section */}
              <section className="shrink-0">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">All Works & Projects</h3>
                <div className="grid grid-cols-2 gap-4">
                  {projects.map(p => (
                    <a key={p.id} href={p.link} target="_blank" rel="noreferrer" className="flex flex-col gap-3 p-4 rounded-lg bg-slate-900/50 border border-cyan-500/20 hover:border-fuchsia-500/50 hover:bg-white/5 transition-all group">
                      <div className="w-full h-32 rounded overflow-hidden relative">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80"></div>
                        <h4 className="absolute bottom-2 left-2 font-black text-white text-sm">{p.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {p.tags.map(tag => (
                          <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{tag}</span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* Certificates Section */}
              <section className="shrink-0">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Certifications</h3>
                <div className="grid grid-cols-3 gap-4">
                  {certificates.map(c => (
                    <a key={c.id} href={c.link} target="_blank" rel="noreferrer" className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500 transition-all group">
                      <img src={c.image} alt={c.title} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform" />
                      <h4 className="text-xs font-bold text-slate-200 line-clamp-2">{c.title}</h4>
                      <span className="text-[9px] font-mono text-fuchsia-400">{c.issuer}</span>
                    </a>
                  ))}
                </div>
              </section>

              {/* Socials / Contact */}
              <section className="mt-8 shrink-0 pb-10">
                <div className="flex flex-wrap justify-center gap-4">
                  {socialLinks.map(s => (
                    <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] text-sm font-mono text-white transition-all">
                      {s.name}
                    </a>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

/* ─── Cinematic Fly-In & Controls ─── */
const CameraController: React.FC<{ mode: 'INTRO' | 'ORBIT' | 'SEATED', onIntroDone: () => void }> = ({ mode, onIntroDone }) => {
  const controlsRef = useRef<CameraControls>(null!);
  const angle = useRef(0);

  // Intro Orbit Animation
  useFrame((_, delta) => {
    if (mode === 'INTRO' && controlsRef.current) {
      angle.current += delta * 0.5; // Orbit speed
      const radius = 10;
      const height = 4;
      const x = Math.sin(angle.current) * radius;
      const z = Math.cos(angle.current) * radius;
      
      // Manually set camera position during intro
      controlsRef.current.setLookAt(x, height, z, 0, 0, 0, false);

      if (angle.current >= Math.PI) {
         onIntroDone();
      }
    }
  });

  // Handle Mode Transitions
  useEffect(() => {
    if (!controlsRef.current) return;

    if (mode === 'ORBIT') {
      // Fly back to room overview
      controlsRef.current.setLookAt(0, 4, 10, 0, 0, 0, true);
    } else if (mode === 'SEATED') {
      // Fly into the chair, using perfect coordinates from the user's manual calibration
      controlsRef.current.setLookAt(-2.88, -3.89, 0.86, -2.86, -3.89, 1.86, true);
    }
  }, [mode]);

  // Hidden Debug Tool: Press 'C' to log exact camera coordinates!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c' && controlsRef.current) {
        const pos = new THREE.Vector3();
        const target = new THREE.Vector3();
        controlsRef.current.getPosition(pos);
        controlsRef.current.getTarget(target);
        
        const msg = `EXACT CAMERA COORDS:\n\ncamX: ${pos.x.toFixed(2)}\ncamY: ${pos.y.toFixed(2)}\ncamZ: ${pos.z.toFixed(2)}\n\nlookX: ${target.x.toFixed(2)}\nlookY: ${target.y.toFixed(2)}\nlookZ: ${target.z.toFixed(2)}`;
        console.log(msg);
        alert(msg + "\n\n(Copied to console!)");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CameraControls 
      ref={controlsRef} 
      maxDistance={25} 
      minDistance={1} 
      maxPolarAngle={Math.PI / 2 + 0.1} // Prevent going under floor
    />
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT SCENE
═══════════════════════════════════════════════════════ */
const ThreeScene: React.FC = () => {
  const [mode, setMode] = useState<'INTRO' | 'ORBIT' | 'SEATED'>('INTRO');

  // Listen for custom event from the LEAVE PC button
  useEffect(() => {
    const handleLeave = () => setMode('ORBIT');
    document.addEventListener('LEAVE_PC', handleLeave);
    return () => document.removeEventListener('LEAVE_PC', handleLeave);
  }, []);

  return (
    <div className="w-full h-full cursor-crosshair">
      <Canvas
        camera={{ position: [0, 4, 10], fov: 50 }}
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <color attach="background" args={['#020617']} />
          
          {/* Base Room Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#06b6d4" />
          <directionalLight position={[-10, 10, -5]} intensity={1.0} color="#d946ef" />
          
          {/* Cyberpunk environment stars */}
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          <Center position={[0, -2, 0]}>
            <RoomModel onOpenPC={() => setMode('SEATED')} />
          </Center>

          <CameraController mode={mode} onIntroDone={() => setMode('ORBIT')} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
