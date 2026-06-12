'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';
import { heroWordVariant, staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

const WORDS_LINE1 = ['headline1'];
const WORDS_LINE2 = ['headline2'];
const WORDS_LINE3 = ['headline3'];

// Floating particles canvas
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

export default function Hero() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.65, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToPromo = () => {
    const el = document.querySelector('#promocion');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.querySelector('#contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative w-full h-screen min-h-[680px] overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: videoScale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          poster="https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          {/* Placeholder stock video — replace with client video */}
          <source
            src="https://videos.pexels.com/video-files/4168723/4168723-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Dynamic Overlay */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          opacity: overlayOpacity,
          background: 'linear-gradient(to bottom, rgba(8,15,35,0.8) 0%, rgba(11,46,99,0.5) 50%, rgba(8,15,35,0.9) 100%)',
        }}
      />

      {/* Particles */}
      <ParticleCanvas />

      {/* Content */}
      <motion.div
        className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: contentY }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            {t('badge')}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-6 overflow-hidden"
        >
          <div className="flex flex-col items-center gap-1 md:gap-2">
            {[t('headline1'), t('headline2'), t('headline3')].map((word, i) => (
              <motion.div
                key={i}
                variants={heroWordVariant}
                custom={i}
                className={`font-black leading-none text-balance text-center ${i === 0
                  ? 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white'
                  : i === 1
                    ? 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient'
                    : 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white'
                  }`}
                style={i === 1 ? {
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                } : undefined}
              >
                {word}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-1 mx-auto mb-6 rounded-full"
          style={{ background: 'linear-gradient(90deg, #D72638, #b01e2d)' }}
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(215,38,56,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-magnetic flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #D72638, #b01e2d)' }}
          >
            {t('cta_primary')}
            <ArrowRight size={18} />
          </motion.button>

          <motion.button
            onClick={scrollToPromo}
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-semibold text-white"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <Play size={16} fill="white" />
            {t('cta_secondary')}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase font-medium">{t('scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-white/60" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-15 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }} />
    </section>
  );
}
