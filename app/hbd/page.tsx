"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Play, Pause } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  color: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const PETAL_COLORS = [
  '#FFB7C5', '#FF85A1', '#FFC8DD', '#FFAFCC',
  '#E8A0BF', '#FF6B9D', '#F4ACB7', '#FFCAD4',
];

const PARTICLE_COLORS = [
  '#FFD700', '#FF69B4', '#FF1493', '#FFA500',
  '#FF6347', '#ADFF2F', '#00CED1', '#9370DB',
];

// ─── Falling Petals ──────────────────────────────────────────────────────────
function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 18 + 10,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50 ">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: `${petal.x}%`, top: '-5%' }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(petal.id) * 80, -Math.sin(petal.id) * 40, 0],
            rotate: [petal.rotation, petal.rotation + 720],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Petal SVG */}
          <svg width={petal.size} height={petal.size * 1.4} viewBox="0 0 30 42">
            <ellipse cx="15" cy="21" rx="12" ry="20" fill={petal.color} opacity="0.85" />
            <ellipse cx="15" cy="21" rx="6" ry="18" fill={petal.color} opacity="0.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Confetti Burst ───────────────────────────────────────────────────────────
function ConfettiBurst({ trigger }: { trigger: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const generated: Particle[] = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 60,
        y: 50 + (Math.random() - 0.5) * 60,
        size: Math.random() * 12 + 5,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 0.5,
      }));
      setParticles(generated);
      const t = setTimeout(() => setParticles([]), 4000);
      return () => clearTimeout(t);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            y: [0, -(Math.random() * 300 + 100)],
            x: [(Math.random() - 0.5) * 400],
            rotate: [0, Math.random() * 720 - 360],
            opacity: [1, 0],
            scale: [1, 0.3],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// ─── Floating Hearts ─────────────────────────────────────────────────────────
function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((i) => (
        <motion.div
          key={i}
          className="absolute text-rose-400"
          style={{ left: `${Math.random() * 90 + 5}%`, bottom: '-5%' }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(i * 1.5) * 60],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            delay: i * 0.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <Heart
            size={Math.random() * 20 + 12}
            className="fill-current"
            style={{ color: i % 3 === 0 ? '#FF69B4' : i % 3 === 1 ? '#FF1493' : '#FFB7C5' }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Bloom Flower ─────────────────────────────────────────────────────────────
function BloomFlower({ delay = 0, size = 1 }: { delay?: number; size?: number }) {
  const petals = 8;
  const petalColors = ['#FF85A1', '#FFB7C5', '#FF6B9D', '#FFC8DD', '#E8A0BF', '#FF85A1', '#FFAFCC', '#F4ACB7'];
  return (
    <div className="relative flex items-center justify-center" style={{ width: 120 * size, height: 120 * size }}>
      {Array.from({ length: petals }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 28 * size,
            height: 52 * size,
            background: `radial-gradient(ellipse at top, ${petalColors[i]}, ${petalColors[(i + 1) % petalColors.length]}80)`,
            transformOrigin: `50% 100%`,
            rotate: (360 / petals) * i,
            bottom: '50%',
            left: `calc(50% - ${14 * size}px)`,
            boxShadow: `0 0 8px ${petalColors[i]}60`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: delay + i * 0.08, duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      {/* Center */}
      <motion.div
        className="relative rounded-full z-10"
        style={{
          width: 26 * size,
          height: 26 * size,
          background: 'radial-gradient(circle at 35% 35%, #FFE066, #FFB300)',
          boxShadow: '0 0 16px #FFD700AA',
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: delay + 0.7, type: 'spring', stiffness: 300 }}
      >
        {/* Pollen dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, j) => (
          <div
            key={j}
            className="absolute rounded-full bg-yellow-300"
            style={{
              width: 4,
              height: 4,
              top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 8}px - 2px)`,
              left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 8}px - 2px)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Rose Garden ──────────────────────────────────────────────────────────────
function RoseGarden() {
  return (
    <div className="flex flex-wrap justify-center gap-10 my-8">
      {[
        { delay: 0, size: 1.2 },
        { delay: 0.3, size: 0.9 },
        { delay: 0.6, size: 1.4 },
        { delay: 0.9, size: 0.8 },
        { delay: 1.2, size: 1.1 },
      ].map((f, i) => (
        <motion.div
          key={i}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: f.delay, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <BloomFlower delay={f.delay} size={f.size} />
          {/* Stem */}
          <motion.div
            className="rounded-full"
            style={{ width: 3, height: 48, background: 'linear-gradient(to bottom, #4ade80, #16a34a)', marginTop: -4 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ delay: f.delay + 0.8, duration: 0.4 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Glowing Text ────────────────────────────────────────────────────────────
function GlowText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        textShadow: '0 0 20px rgba(255,105,180,0.8), 0 0 40px rgba(255,105,180,0.4), 0 0 80px rgba(255,20,147,0.2)',
      }}
    >
      {children}
    </span>
  );
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
function TypewriterText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 60);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [started, text, delay]);

  return (
    <p ref={ref} className={className}>
      {displayed}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>
    </p>
  );
}

// ─── Sparkle Ring ─────────────────────────────────────────────────────────────
function SparkleRing() {
  return (
    <div className="relative w-24 h-24 mx-auto my-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-300"
          style={{
            width: 6,
            height: 6,
            top: `calc(50% + ${Math.sin((i * 30 * Math.PI) / 180) * 44}px - 3px)`,
            left: `calc(50% + ${Math.cos((i * 30 * Math.PI) / 180) * 44}px - 3px)`,
          }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, delay: i * 0.12, repeat: Infinity }}
        />
      ))}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <Heart size={32} className="text-rose-500 fill-rose-500" />
      </motion.div>
    </div>
  );
}

// ─── Video Player ─────────────────────────────────────────────────────────────
function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={togglePlay}
      className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-video bg-slate-900 cursor-pointer group"
      style={{ boxShadow: '0 0 40px rgba(255,105,180,0.3), 0 25px 50px rgba(0,0,0,0.3)' }}
    >
      <video ref={videoRef} playsInline className="w-full h-full object-cover">
        <source src={src} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
        style={{ background: 'radial-gradient(circle at center, rgba(255,105,180,0.15), rgba(0,0,0,0.4))' }}
      >
        <motion.div
          className="rounded-full p-6"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause size={40} className="text-white" /> : <Play size={40} className="text-white fill-white ml-1" />}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Star Field ───────────────────────────────────────────────────────────────
function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// ─── Cake with Candles ────────────────────────────────────────────────────────
function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blown, setBlown] = useState(false);

  const blowCandles = () => {
    setCandlesLit(false);
    setBlown(true);
  };

  return (
    <div className="flex flex-col items-center my-8">
      <svg viewBox="0 0 200 180" width="220" height="198">
        {/* Candles */}
        {[50, 80, 100, 120, 150].map((cx, i) => (
          <g key={i}>
            <rect x={cx - 4} y={20} width={8} height={30} rx={2} fill={['#FF85A1', '#FFD700', '#87CEEB', '#98FB98', '#DDA0DD'][i]} />
            {candlesLit && (
              <>
                <motion.ellipse
                  cx={cx}
                  cy={16}
                  rx={5}
                  ry={8}
                  fill="#FFD700"
                  animate={{ scaleY: [1, 1.3, 0.9, 1.2, 1], scaleX: [1, 0.8, 1.1, 0.9, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  style={{ filter: 'blur(1px)' }}
                />
                <motion.ellipse
                  cx={cx}
                  cy={16}
                  rx={2.5}
                  ry={4}
                  fill="#FFF"
                  animate={{ scaleY: [1, 1.4, 0.8, 1] }}
                  transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                />
              </>
            )}
          </g>
        ))}
        {/* Cake layers */}
        <rect x={15} y={50} width={170} height={40} rx={8} fill="#FF85A1" />
        <rect x={20} y={53} width={160} height={8} rx={4} fill="#FFB7C5" />
        {/* Frosting drips */}
        {[30, 55, 80, 110, 140, 165].map((x, i) => (
          <motion.path
            key={i}
            d={`M${x},50 Q${x + 6},62 ${x + 3},72`}
            stroke="white"
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
        <rect x={5} y={90} width={190} height={50} rx={10} fill="#FF6B9D" />
        <rect x={10} y={93} width={180} height={10} rx={5} fill="#FF85A1" />
        {/* Bottom base */}
        <rect x={0} y={138} width={200} height={35} rx={10} fill="#E8396A" />
        {/* Heart decoration */}
        <text x={85} y={162} fontSize={22} textAnchor="middle">💕</text>
        {/* Sprinkles */}
        {[[30,110],[60,100],[130,115],[160,105],[80,130],[110,120],[145,132]].map(([x,y],i)=>(
          <motion.rect key={i} x={x} y={y} width={6} height={3} rx={1}
            fill={['#FFD700','#FFF','#87CEEB','#98FB98'][i%4]}
            animate={{opacity:[0.5,1,0.5]}} transition={{duration:1.2,delay:i*0.2,repeat:Infinity}}
          />
        ))}
      </svg>
      {candlesLit && !blown && (
        <motion.button
          onClick={blowCandles}
          className="mt-4 px-6 py-3 rounded-full text-white font-bold tracking-wide cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #FF85A1, #FF1493)', boxShadow: '0 0 20px rgba(255,20,147,0.4)' }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,20,147,0.6)' }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎂 Blow the candles!
        </motion.button>
      )}
      {blown && (
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-2xl font-bold text-pink-500"
          style={{ textShadow: '0 0 20px rgba(255,105,180,0.6)' }}
        >
          🌟 Make a wish, Maria! 🌟
        </motion.p>
      )}
    </div>
  );
}

// ─── Letter Reveal ────────────────────────────────────────────────────────────
function LoveLetterReveal() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center my-12">
      <AnimatePresence>
        {!open ? (
          <motion.div
            key="envelope"
            className="cursor-pointer select-none"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative" style={{ width: 220, height: 150 }}>
              <svg viewBox="0 0 220 150" width="220" height="150">
                <rect x={0} y={20} width={220} height={130} rx={12} fill="#FFB7C5" />
                <path d={`M0,20 L110,90 L220,20`} fill="#FF85A1" />
                <path d={`M0,150 L85,85`} fill="none" stroke="#FF6B9D" strokeWidth={2} />
                <path d={`M220,150 L135,85`} fill="none" stroke="#FF6B9D" strokeWidth={2} />
                <motion.path d={`M0,20 L110,90 L220,20 Z`} fill="#FFC8DD"
                  animate={{ rotateX: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}
                />
                <text x="110" y="120" textAnchor="middle" fontSize="24">💌</text>
              </svg>
              <motion.p
                className="text-center text-pink-600 font-semibold mt-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Tap to open your letter 💕
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.7, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-[2rem] p-8 max-w-lg text-center relative"
            style={{
              background: 'linear-gradient(135deg, #fff5f7, #ffe4ec)',
              boxShadow: '0 20px 60px rgba(255,105,180,0.25)',
              border: '2px solid #FFB7C5',
            }}
          >
            <p className="text-3xl mb-4">💌</p>
            <p className="text-slate-500 italic text-sm mb-4 tracking-widest uppercase">My Dearest Maria,</p>
            <p className="text-slate-700 leading-relaxed text-lg font-light">
              On this special day, I want you to know that you are my <strong className="text-pink-500">favorite chapter</strong> in this story called life. Every morning feels like a gift because you exist in it. You don't just make my days brighter — you <em>are</em> the brightness.
            </p>
            <div className="my-6 flex justify-center gap-2 text-2xl">
              {'🌸🌷🌺🌹🌸'.split('').map((c, i) => (
                <motion.span key={i} animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}>{c}</motion.span>
              ))}
            </div>
            <p className="text-slate-700 leading-relaxed text-lg font-light">
              Happy Birthday, my love. May every single wish you make today come true — because you deserve nothing less than <strong className="text-pink-500">everything beautiful in this world</strong>.
            </p>
            <p className="mt-6 text-pink-500 font-bold text-xl">Forever yours, with all my heart 💕</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Parallax Section Wrapper ─────────────────────────────────────────────────
function ParallaxSection({ children, bg }: { children: React.ReactNode; bg: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${bg}`}>
      <motion.div className="absolute inset-0" style={{ y }} />
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}

// ─── Cursor Trail ─────────────────────────────────────────────────────────────
function CursorTrail() {
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const id = counter.current++;
      setTrails((prev) => [...prev.slice(-15), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setTrails((prev) => prev.filter((t) => t.id !== id)), 800);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trails.map((t, i) => (
        <motion.div
          key={t.id}
          className="absolute rounded-full"
          style={{
            left: t.x - 6,
            top: t.y - 6,
            width: 12,
            height: 12,
            background: `hsl(${330 + i * 5}, 100%, 70%)`,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// ─── Gift Bucket System ───────────────────────────────────────────────────────

interface GiftData {
  id: number;
  label: string;
  tagline: string;
  bucketColor: string;
  bucketDark: string;
  bucketStripe: string;
  lidColor: string;
  ribbonColor: string;
  bowColor: string;
  glowColor: string;
  popupBg: string;
  surpriseTitle: string;
  surpriseMsg: string;
  surpriseEmojis: string[];
  innerItem: string; // big emoji shown inside bucket
}

const GIFTS: GiftData[] = [
  {
    id: 1,
    label: 'My Heart',
    tagline: 'The most precious gift I can give',
    bucketColor: '#FF4D8D',
    bucketDark: '#C2185B',
    bucketStripe: '#FF85A1',
    lidColor: '#E91E63',
    ribbonColor: '#FFD700',
    bowColor: '#FFF9C4',
    glowColor: '#FF69B4',
    popupBg: 'linear-gradient(135deg, #ff0055 0%, #ff4d8d 50%, #ffb7c5 100%)',
    surpriseTitle: '💖 All My Love',
    surpriseMsg: 'Every heartbeat I have belongs to you, Maria. You are my home, my peace, my everything. Today and always — all of me is yours.',
    surpriseEmojis: ['❤️','💕','💗','💓','💞','💖'],
    innerItem: '❤️',
  },
  {
    id: 2,
    label: 'A Dream',
    tagline: 'Close your eyes and wish',
    bucketColor: '#7C3AED',
    bucketDark: '#4C1D95',
    bucketStripe: '#A78BFA',
    lidColor: '#6D28D9',
    ribbonColor: '#F472B6',
    bowColor: '#FCE7F3',
    glowColor: '#C084FC',
    popupBg: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #c084fc 100%)',
    surpriseTitle: '🌙 Our Future',
    surpriseMsg: 'I dream of a thousand tomorrows with you. Every dream I have, you are in it. A beautiful life, built together, filled with magic and laughter.',
    surpriseEmojis: ['🌙','⭐','🌟','✨','🌠','💫'],
    innerItem: '🌙',
  },
  {
    id: 3,
    label: 'Our Song',
    tagline: 'A melody only we know',
    bucketColor: '#0284C7',
    bucketDark: '#075985',
    bucketStripe: '#38BDF8',
    lidColor: '#0369A1',
    ribbonColor: '#FDE047',
    bowColor: '#FEFCE8',
    glowColor: '#7DD3FC',
    popupBg: 'linear-gradient(135deg, #075985 0%, #0284c7 50%, #7dd3fc 100%)',
    surpriseTitle: '🎵 Our Melody',
    surpriseMsg: 'Every love song ever written was waiting for us. When I hear music, I hear you. You are the most beautiful song my heart has ever known.',
    surpriseEmojis: ['🎵','🎶','🎼','🎹','🎸','🎺'],
    innerItem: '🎵',
  },
  {
    id: 4,
    label: 'A Promise',
    tagline: 'Forever starts today',
    bucketColor: '#059669',
    bucketDark: '#065F46',
    bucketStripe: '#34D399',
    lidColor: '#047857',
    ribbonColor: '#FB7185',
    bowColor: '#FFE4E6',
    glowColor: '#6EE7B7',
    popupBg: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #6ee7b7 100%)',
    surpriseTitle: '💍 My Promise',
    surpriseMsg: 'I promise to choose you every single day. To be your safe place, your greatest supporter, your partner in every adventure life brings us.',
    surpriseEmojis: ['💍','🌹','🤝','🫶','💐','🌺'],
    innerItem: '💍',
  },
  {
    id: 5,
    label: 'Birthday Wish',
    tagline: 'Make it come true ✨',
    bucketColor: '#EA580C',
    bucketDark: '#9A3412',
    bucketStripe: '#FB923C',
    lidColor: '#C2410C',
    ribbonColor: '#E879F9',
    bowColor: '#FAE8FF',
    glowColor: '#FCA5A1',
    popupBg: 'linear-gradient(135deg, #9a3412 0%, #ea580c 50%, #fca5a1 100%)',
    surpriseTitle: '🌠 Birthday Magic',
    surpriseMsg: 'Today is YOUR day, Maria Shahzadi! May every single wish you make today come true. You deserve the entire universe wrapped in a bow. Happy Birthday, my love! 🎂',
    surpriseEmojis: ['🎂','🎊','🎉','🌠','⭐','🎈'],
    innerItem: '🎂',
  },
];

// Cartoon bucket SVG
function GiftBucketSVG({ gift, phase }: { gift: GiftData; phase: string }) {
  const W = 160;
  const H = 180;
  const isShaking = phase === 'shaking';
  const lidGone = phase === 'opening' || phase === 'open';

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {/* Drop shadow */}
      <ellipse cx={W/2} cy={H - 6} rx={52} ry={10} fill="rgba(0,0,0,0.25)" />

      {/* === BUCKET BODY === */}
      {/* Main trapezoid bucket shape */}
      <path
        d={`M28,52 L18,${H-18} Q18,${H-6} 30,${H-6} L${W-30},${H-6} Q${W-18},${H-6} ${W-18},${H-18} L${W-28},52 Z`}
        fill={gift.bucketColor}
      />
      {/* Bucket dark side (right) */}
      <path
        d={`M${W-28},52 L${W-18},${H-18} Q${W-18},${H-6} ${W-30},${H-6} L${W-44},${H-6} L${W-40},52 Z`}
        fill={gift.bucketDark}
        opacity={0.7}
      />
      {/* Bucket shine stripe */}
      <path
        d={`M36,56 L30,${H-20} L44,${H-20} L50,56 Z`}
        fill="rgba(255,255,255,0.22)"
        rx={4}
      />
      {/* Polka dots on bucket */}
      {[[55,90],[90,110],[70,140],[110,80],[100,145]].map(([cx,cy],j) => (
        <circle key={j} cx={cx} cy={cy} r={7} fill="rgba(255,255,255,0.15)" />
      ))}
      {/* Ribbon stripe vertical */}
      <path
        d={`M${W/2-8},52 L${W/2-10},${H-8} L${W/2+10},${H-8} L${W/2+8},52 Z`}
        fill={gift.ribbonColor}
        opacity={0.8}
      />
      {/* Bucket rim */}
      <rect x={22} y={46} width={W-44} height={14} rx={7} fill={gift.bucketDark} />
      <rect x={26} y={48} width={W-52} height={10} rx={5} fill={gift.bucketStripe} opacity={0.6} />

      {/* Handle arc */}
      <path
        d={`M42,50 Q${W/2},10 ${W-42},50`}
        stroke={gift.bucketDark}
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M42,50 Q${W/2},12 ${W-42},50`}
        stroke={gift.bucketStripe}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* Inner item emoji (visible when open) */}
      {phase === 'open' && (
        <text x={W/2} y={90} textAnchor="middle" fontSize={38} style={{ userSelect: 'none' }}>
          {gift.innerItem}
        </text>
      )}

      {/* === LID === */}
      {!lidGone && (
        <g>
          {/* Lid base */}
          <ellipse cx={W/2} cy={44} rx={52} ry={14} fill={gift.lidColor} />
          <ellipse cx={W/2} cy={42} rx={50} ry={12} fill={gift.bucketStripe} opacity={0.4} />
          {/* Lid rim highlight */}
          <ellipse cx={W/2} cy={42} rx={44} ry={8} fill="rgba(255,255,255,0.15)" />
          {/* Ribbon on lid */}
          <rect x={W/2-7} y={30} width={14} height={16} fill={gift.ribbonColor} opacity={0.9} />
          {/* Bow loops */}
          <ellipse cx={W/2-20} cy={32} rx={17} ry={10} fill={gift.bowColor} opacity={0.95} />
          <ellipse cx={W/2+20} cy={32} rx={17} ry={10} fill={gift.bowColor} opacity={0.95} />
          {/* Bow center knot */}
          <ellipse cx={W/2} cy={32} rx={9} ry={7} fill={gift.ribbonColor} />
          <ellipse cx={W/2} cy={32} rx={5} ry={4} fill={gift.bowColor} opacity={0.9} />
          {/* Ribbon tails */}
          <path d={`M${W/2-4},38 L${W/2-12},54 L${W/2-6},54 L${W/2+2},38 Z`} fill={gift.ribbonColor} opacity={0.7} />
          <path d={`M${W/2+4},38 L${W/2+12},54 L${W/2+6},54 L${W/2-2},38 Z`} fill={gift.ribbonColor} opacity={0.7} />
        </g>
      )}

      {/* Stars sparkle around when open */}
      {phase === 'open' && [0,1,2,3,4,5].map(i => (
        <text
          key={i}
          x={W/2 + Math.cos(i * 60 * Math.PI/180) * 62}
          y={80 + Math.sin(i * 60 * Math.PI/180) * 40}
          textAnchor="middle"
          fontSize={16}
          style={{ userSelect: 'none' }}
        >
          ✨
        </text>
      ))}
    </svg>
  );
}

// Full screen popup modal
function GiftPopup({ gift, onClose }: { gift: GiftData; onClose: () => void }) {
  const [popConfetti, setPopConfetti] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setPopConfetti(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      />

      {/* Popup confetti */}
      {popConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-sm"
              style={{
                width: Math.random() * 12 + 5,
                height: Math.random() * 12 + 5,
                backgroundColor: gift.surpriseEmojis.length > 0
                  ? ['#FFD700','#FF69B4','#fff','#87CEEB','#FF1493','#98FB98'][i % 6]
                  : '#FFD700',
                left: `${Math.random() * 100}%`,
                top: '-5%',
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [(Math.random() - 0.5) * 200],
                rotate: [0, Math.random() * 720],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1.5,
                delay: Math.random() * 0.8,
                ease: 'easeIn',
              }}
            />
          ))}
        </div>
      )}

      {/* Modal card */}
      <motion.div
        className="relative rounded-[2rem] overflow-hidden max-w-md w-full z-10 shadow-2xl"
        initial={{ scale: 0.3, rotate: -10, y: 100 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        exit={{ scale: 0.2, rotate: 10, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 0 80px ${gift.glowColor}88, 0 30px 80px rgba(0,0,0,0.5)` }}
      >
        {/* Gradient header */}
        <div className="relative pt-10 pb-8 px-8 text-center" style={{ background: gift.popupBg }}>
          {/* Cartoon bucket in popup */}
          <motion.div
            className="mx-auto mb-4"
            style={{ width: 130, height: 150 }}
            animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width={130} height={150} viewBox="0 0 160 180" style={{ overflow: 'visible' }}>
              <ellipse cx={80} cy={170} rx={52} ry={10} fill="rgba(0,0,0,0.2)" />
              <path d={`M28,52 L18,162 Q18,174 30,174 L130,174 Q142,174 142,162 L132,52 Z`} fill={gift.bucketColor} />
              <path d={`M132,52 L142,162 Q142,174 130,174 L116,174 L120,52 Z`} fill={gift.bucketDark} opacity={0.7} />
              <rect x={22} y={46} width={116} height={14} rx={7} fill={gift.bucketDark} />
              <path d={`M42,50 Q80,8 118,50`} stroke={gift.bucketDark} strokeWidth={6} fill="none" strokeLinecap="round" />
              <path d={`M80/2-8,52 L70,170 L90,170 L88,52 Z`} fill={gift.ribbonColor} opacity={0.7} />
              <text x={80} y={130} textAnchor="middle" fontSize={44} style={{ userSelect: 'none' }}>{gift.innerItem}</text>
            </svg>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-3xl font-black text-white mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ textShadow: '0 0 20px rgba(0,0,0,0.3)' }}
          >
            {gift.surpriseTitle}
          </motion.h2>

          {/* Floating emojis */}
          <div className="flex justify-center gap-2 mt-2">
            {gift.surpriseEmojis.map((e, i) => (
              <motion.span
                key={i}
                className="text-xl"
                animate={{ y: [0, -8, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </div>

        {/* White card body */}
        <div className="bg-white px-8 py-7 text-center">
          <motion.p
            className="text-slate-600 text-lg leading-relaxed italic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            "{gift.surpriseMsg}"
          </motion.p>

          <motion.div
            className="mt-4 text-xs text-slate-400 uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            — With all my love 💕
          </motion.div>

          {/* Close button */}
          <motion.button
            className="mt-6 px-8 py-3 rounded-full font-bold text-white cursor-pointer tracking-wide text-sm"
            style={{ background: gift.popupBg, boxShadow: `0 0 20px ${gift.glowColor}66` }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Close 🎀
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GiftBucket({ gift, index, onOpen }: { gift: GiftData; index: number; onOpen: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'opening' | 'open'>('idle');

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('shaking');
    setTimeout(() => setPhase('opening'), 650);
    setTimeout(() => {
      setPhase('open');
      setTimeout(() => onOpen(), 200);
    }, 1100);
    setTimeout(() => setPhase('idle'), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.7, type: 'spring', stiffness: 180 }}
      className="flex flex-col items-center cursor-pointer select-none"
      onClick={handleClick}
    >
      {/* Glow ring under bucket */}
      <div className="relative">
        <motion.div
          className="absolute -inset-3 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${gift.glowColor}44, transparent 70%)` }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />

        {/* Bucket with lid animation */}
        <motion.div
          animate={
            phase === 'shaking'
              ? { rotate: [-6, 6, -6, 6, -3, 3, 0], x: [-4, 4, -4, 4, 0] }
              : phase === 'opening'
              ? { scale: [1, 1.05, 1] }
              : { rotate: 0 }
          }
          transition={{ duration: 0.6 }}
        >
          {/* Lid flying off */}
          <div className="relative" style={{ width: 160, height: 180 }}>
            <AnimatePresence>
              {(phase === 'opening') && (
                <motion.div
                  className="absolute"
                  style={{ top: 0, left: 0, zIndex: 20 }}
                  initial={{ y: 0, rotate: 0, opacity: 1 }}
                  animate={{ y: -130, rotate: -30, x: 40, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  {/* Lid only SVG */}
                  <svg width={160} height={60} viewBox="0 0 160 60">
                    <ellipse cx={80} cy={44} rx={52} ry={14} fill={gift.lidColor} />
                    <ellipse cx={80} cy={42} rx={44} ry={8} fill="rgba(255,255,255,0.15)" />
                    <rect x={73} y={28} width={14} height={18} fill={gift.ribbonColor} opacity={0.9} />
                    <ellipse cx={60} cy={30} rx={17} ry={10} fill={gift.bowColor} opacity={0.95} />
                    <ellipse cx={100} cy={30} rx={17} ry={10} fill={gift.bowColor} opacity={0.95} />
                    <ellipse cx={80} cy={30} rx={9} ry={7} fill={gift.ribbonColor} />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
            <GiftBucketSVG gift={gift} phase={phase} />
          </div>
        </motion.div>
      </div>

      {/* Label below */}
      <motion.div
        className="mt-3 text-center"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
      >
        <p className="font-bold text-base" style={{ color: gift.glowColor, textShadow: `0 0 10px ${gift.glowColor}88` }}>
          {gift.label}
        </p>
        <p className="text-xs text-pink-300/60 italic mt-0.5">{gift.tagline}</p>
      </motion.div>

      {/* Tap hint pulse */}
      <motion.p
        className="mt-2 text-[10px] tracking-[0.2em] uppercase"
        style={{ color: gift.glowColor + '99' }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        🎁 tap to unwrap
      </motion.p>
    </motion.div>
  );
}

function GiftUnboxingSection({ triggerCelebration }: { triggerCelebration: () => void }) {
  const [openGift, setOpenGift] = useState<GiftData | null>(null);

  return (
    <>
      {/* Full screen popup */}
      <AnimatePresence>
        {openGift && (
          <GiftPopup gift={openGift} onClose={() => setOpenGift(null)} />
        )}
      </AnimatePresence>

      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0d001a 0%, #1a0035 50%, #0d001a 100%)' }}
      >
        <StarField />

        {/* Ambient glows */}
        {GIFTS.map((g, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 350, height: 350,
              background: `radial-gradient(circle, ${g.glowColor}14, transparent 70%)`,
              left: `${i * 22}%`,
              top: `${(i % 2) * 30 + 10}%`,
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
          />
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-pink-300 uppercase tracking-[0.5em] text-sm mb-4"
            >
              ✨ Your Surprise Gifts ✨
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-black mb-3"
              style={{
                fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                background: 'linear-gradient(135deg, #FFD700, #FF69B4, #C084FC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))',
              }}
            >
              Open Your Gifts, Maria 🎁
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-pink-200/50 text-lg italic"
            >
              Each bucket holds a surprise made just for you 💕
            </motion.p>
          </div>

          {/* Gift buckets */}
          <div className="flex flex-wrap justify-center gap-10 md:gap-14">
            {GIFTS.map((gift, i) => (
              <GiftBucket
                key={gift.id}
                gift={gift}
                index={i}
                onOpen={() => setOpenGift(gift)}
              />
            ))}
          </div>

          {/* Celebrate button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={triggerCelebration}
              className="px-10 py-5 rounded-full font-bold text-white text-lg cursor-pointer tracking-wide"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FF69B4, #9C27B0)',
                boxShadow: '0 0 40px rgba(255,215,0,0.4)',
              }}
              whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(255,215,0,0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              🎊 Celebrate Maria! 🎊
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BirthdayExperience() {
  const [mounted, setMounted] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto confetti on load
    setTimeout(() => setConfetti(true), 1000);
    setTimeout(() => setConfetti(false), 5000);
  }, []);

  const triggerCelebration = useCallback(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
  }, []);

  if (!mounted) return null;

  return (
    <main
      className="relative text-slate-800 overflow-x-hidden py-4"
      style={{ fontFamily: "'Georgia', 'Palatino', serif" }}
    >
      <CursorTrail />
      <FallingPetals />
      <ConfettiBurst trigger={confetti} />

      {/* ── SECTION 1: GRAND OPENING ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a0010 0%, #3d0030 40%, #1a0820 100%)' }}
      >
        <StarField />
        <FloatingHearts />

        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,20,147,0.15) 0%, transparent 70%)',
          }} />
        </div>

        <div className="text-center z-10 px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 2 }}
            className="text-pink-300 uppercase text-sm tracking-[0.4em] mb-6"
          >
            ✨ Today is a magical day ✨
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-bold mb-4 leading-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              background: 'linear-gradient(135deg, #FFB7C5 0%, #FF69B4 30%, #FFD700 60%, #FF85A1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 30px rgba(255,105,180,0.5))',
            }}
          >
            Happy Birthday
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-bold italic mb-8"
            style={{
              fontSize: 'clamp(2rem, 7vw, 5rem)',
              color: '#FFB7C5',
              textShadow: '0 0 40px rgba(255,105,180,0.8), 0 0 80px rgba(255,20,147,0.4)',
            }}
          >
            Maria Shahzadi 💖
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-pink-200/60 tracking-[0.25em] uppercase text-sm mb-12"
          >
            A journey of love, crafted only for you
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            onClick={triggerCelebration}
            className="px-8 py-4 rounded-full font-semibold text-white cursor-pointer tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #FF1493, #FF69B4)',
              boxShadow: '0 0 30px rgba(255,20,147,0.5), 0 0 60px rgba(255,20,147,0.2)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255,20,147,0.7)' }}
            whileTap={{ scale: 0.95 }}
          >
            🎊 Celebrate with Me!
          </motion.button>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-pink-400/50 flex items-start justify-center pt-2">
              <motion.div
                className="w-1.5 h-3 bg-pink-400 rounded-full"
                animate={{ opacity: [1, 0], y: [0, 12] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: VIDEO 1 ── */}
      <section className="py-28 bg-white relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FF69B4, transparent)' }} />
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-6 order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-pink-400 uppercase tracking-[0.3em] text-sm">Chapter One</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
              Moments We <br/>
              <GlowText className="text-pink-500">Cherish Forever ✨</GlowText>
            </h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed">
              Every second spent with you is a memory I hold close to my heart.
              You've given me moments that feel like poetry.
            </p>
            <div className="flex gap-3">
              {['🌸', '💕', '🌷', '✨', '💖'].map((e, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VideoPlayer src="/videos/love1.mp4" />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: ROSE GARDEN ── */}
      <ParallaxSection bg="">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #fff0f5 0%, #fce4ec 50%, #fff0f5 100%)' }}
        />
        <div className="relative z-10 text-center px-6 py-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-pink-400 uppercase tracking-[0.4em] text-sm mb-4"
          >
            A Garden Bloomed For You
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #E8396A, #FF85A1, #FFB7C5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            You Are My Flower 🌸
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 text-xl italic max-w-2xl mx-auto mb-4"
          >
            "In a field of roses, you would still stand out."
          </motion.p>

          <RoseGarden />

          <TypewriterText
            text="Today is not just your birthday... it's the day the universe got luckier."
            className="text-2xl text-slate-600 italic mt-6 max-w-2xl mx-auto"
            delay={0.5}
          />
        </div>
      </ParallaxSection>

      {/* ── SECTION 4: BIRTHDAY CAKE ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a0010 0%, #2d0025 100%)' }}
      >
        <StarField />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-pink-300 uppercase tracking-[0.4em] text-sm mb-4"
          >
            Make a Wish ✨
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-2"
            style={{ textShadow: '0 0 40px rgba(255,105,180,0.5)' }}
          >
            This cake is for you,
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-8"
            style={{
              background: 'linear-gradient(135deg, #FFB7C5, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Maria Shahzadi 🎂
          </motion.h2>

          <BirthdayCake />
          <SparkleRing />
        </div>
      </section>

      {/* ── SECTION 5: VIDEO 2 ── */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FF69B4, transparent)' }} />
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <VideoPlayer src="/videos/love2.mp4" />
          </motion.div>
          <motion.div className="space-y-6" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-pink-400 uppercase tracking-[0.3em] text-sm">Chapter Two</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
              The Melody <br/>
              <GlowText className="text-pink-500">of Us 🎵</GlowText>
            </h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed">
              Our bond is like a perfect song — sometimes soft, sometimes powerful,
              but always in perfect harmony. You are the music in my silence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 6: LOVE LETTER ── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #fce4ec 100%)' }}
      >
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-pink-400 uppercase tracking-[0.4em] text-sm mb-4"
          >
            Words from the Heart
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-8"
            style={{
              background: 'linear-gradient(135deg, #E8396A, #FF69B4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            A Letter For You 💌
          </motion.h2>
          <LoveLetterReveal />
        </div>
      </section>

      {/* ── SECTION 7: GIFTS ── */}
      
      {/* ── SECTION 7.5: GIFT UNBOXING ── */}
      <GiftUnboxingSection triggerCelebration={triggerCelebration} />

      {/* ── SECTION 8: VIDEO 3 ── */}
      <section className="py-24"
        style={{ background: 'linear-gradient(160deg, #1a0010 0%, #2d0025 100%)' }}
      >
        <StarField />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              className="text-pink-300 uppercase tracking-[0.4em] text-sm mb-4">
              Final Chapter
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black italic"
              style={{ color: '#FFB7C5', textShadow: '0 0 40px rgba(255,105,180,0.5)' }}
            >
              Unconditional Love ❤️
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-pink-300/60 mt-4 tracking-widest uppercase text-sm">
              Tap to play our final memory
            </motion.p>
          </div>
          <VideoPlayer src="/videos/love3.mp4" />
        </div>
      </section>

      {/* ── SECTION 9: GRAND FINALE ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a0010 0%, #3d0030 40%, #1a0820 100%)' }}
      >
        <StarField />
        <FloatingHearts />

        {/* Pulsing rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-pink-500/20"
            style={{ width: i * 300, height: i * 300 }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mb-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={60} className="text-rose-500 fill-rose-500 mx-auto" style={{ filter: 'drop-shadow(0 0 20px rgba(255,20,147,0.8))' }} />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl text-pink-200/80 italic font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            "I promise to always stand by you, to make you smile, and to celebrate every beautiful moment with you — today, tomorrow, and always."
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-black leading-none mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              background: 'linear-gradient(135deg, #FFD700 0%, #FF69B4 50%, #FFB7C5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(255,105,180,0.5))',
            }}
          >
            Happy Birthday
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="font-black italic"
            style={{
              fontSize: 'clamp(2rem, 7vw, 5rem)',
              color: '#FFB7C5',
              textShadow: '0 0 40px rgba(255,105,180,0.9), 0 0 80px rgba(255,20,147,0.5), 0 0 120px rgba(255,20,147,0.2)',
            }}
          >
            Maria Shahzadi 🎂
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center gap-4 flex-wrap"
          >
            {['🌸', '💕', '🌹', '✨', '💖', '🌷', '🎊', '🌺', '💝', '🎉'].map((e, i) => (
              <motion.span
                key={i}
                className="text-3xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={triggerCelebration}
            className="mt-10 px-8 py-4 rounded-full font-semibold text-white cursor-pointer tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #FF1493, #FF69B4, #FFD700)',
              boxShadow: '0 0 40px rgba(255,20,147,0.5)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎊 One More Celebration! 🎊
          </motion.button>
        </div>
      </section>
    </main>
  );
}
