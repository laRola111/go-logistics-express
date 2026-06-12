'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Gift, Clock, Star } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

const boxes = [
  { key: 'box1', sizeKey: 'small', price: '$60', color: 'from-blue-400/20 to-blue-500/10', border: 'border-blue-400/30', delay: 0 },
  { key: 'box2', sizeKey: 'medium', price: '$120', color: 'from-blue-500/20 to-indigo-500/10', border: 'border-blue-500/30', delay: 0.1 },
  { key: 'box3', sizeKey: 'large', price: '$170', color: 'from-indigo-500/20 to-purple-500/10', border: 'border-indigo-400/30', delay: 0.2 },
  { key: 'box4', sizeKey: 'xlarge', price: '$240', color: 'from-purple-500/20 to-blue-500/10', border: 'border-purple-400/30', delay: 0.3 },
  { key: 'box5', sizeKey: 'small', price: null, isGolden: true, delay: 0.5 },
] as const;

function BoxCard({ box, t, index }: { box: typeof boxes[number]; t: ReturnType<typeof useTranslations>; index: number }) {
  const isGolden = 'isGolden' in box && box.isGolden;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: box.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={isGolden ? { scale: 1.05 } : { scale: 1.03, y: -4 }}
      className="relative flex flex-col items-center"
    >
      {isGolden && (
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2"
        >
          <Sparkles size={24} className="text-yellow-400" />
        </motion.div>
      )}

      <motion.div
        className={`relative w-full rounded-2xl p-5 text-center border ${isGolden
          ? 'border-yellow-400/50'
          : 'color' in box ? `bg-gradient-to-br ${box.color} ${box.border}` : ''
          }`}
        style={isGolden ? {
          background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.1))',
          boxShadow: '0 0 40px rgba(245,158,11,0.3), 0 0 80px rgba(245,158,11,0.1)',
          animation: 'golden-burst 2s ease-in-out infinite',
        } : {
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Box Number */}
        <div className={`text-xs font-bold tracking-widest uppercase mb-2 ${isGolden ? 'text-yellow-400' : 'text-white/50'}`}>
          {t(box.key + '_label' as never)}
        </div>

        {/* Box Icon */}
        <div className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl ${isGolden ? 'bg-yellow-400/20' : 'bg-white/5'
          }`}>
          {isGolden ? '🎁' : '📦'}
        </div>

        {/* Size */}
        <div className={`text-sm font-semibold mb-2 ${isGolden ? 'text-yellow-300' : 'text-white/80'}`}>
          {t(box.sizeKey as never)}
        </div>

        {/* Price */}
        {isGolden ? (
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-2xl font-black text-yellow-400"
            >
              {t('free')}
            </motion.div>
            <div className="text-yellow-400/60 text-xs mt-1 line-through">$60</div>
          </div>
        ) : (
          <div className="text-2xl font-black text-white">{box.price}</div>
        )}

        {isGolden && (
          <div className="absolute -top-2 -right-2">
            <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center">
              <Star size={12} fill="white" className="text-white" />
            </div>
          </div>
        )}
      </motion.div>

      {/* Connector Arrow */}
      {index < 4 && (
        <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
          <div className={`text-lg ${index === 3 ? 'text-yellow-400' : 'text-white/30'}`}>→</div>
        </div>
      )}
    </motion.div>
  );
}

// Countdown timer
function CountdownTimer() {
  const [time, setTime] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <Clock size={14} className="text-yellow-400" />
      <div className="flex items-center gap-1 font-mono text-sm font-bold text-yellow-400">
        <span className="bg-yellow-400/20 px-2 py-1 rounded">{pad(time.hours)}</span>
        <span className="text-yellow-400/60">:</span>
        <span className="bg-yellow-400/20 px-2 py-1 rounded">{pad(time.minutes)}</span>
        <span className="text-yellow-400/60">:</span>
        <span className="bg-yellow-400/20 px-2 py-1 rounded">{pad(time.seconds)}</span>
      </div>
    </div>
  );
}

export default function Promotion() {
  const t = useTranslations('promo');
  const sectionRef = useRef(null);
  const titleInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const scrollToContact = () => {
    const el = document.querySelector('#contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="promocion"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: 'linear-gradient(135deg, #050e22 0%, #0B2E63 35%, #163F86 65%, #0d3470 100%)' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(22,63,134,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(215,38,56,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* Promo Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-yellow-400"
              style={{
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.3)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Gift size={14} />
              {t('badge')}
              <div className="w-px h-3 bg-yellow-400/30 mx-1" />
              <CountdownTimer />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 text-balance">
            <span className="text-gradient-gold" style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              🎁 ENVÍA 4 CAJAS
            </span>
            <br />
            <span className="text-white">Y LA 5TA SMALL ES GRATIS</span>
          </h2>

          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={titleInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-5xl rounded-3xl p-8 md:p-12"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
          }}
        >
          {/* Box Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative">
            {boxes.map((box, i) => (
              <BoxCard key={box.key} box={box} t={t} index={i} />
            ))}
          </div>

          {/* Arrow separator for mobile */}
          <div className="flex sm:hidden justify-center items-center gap-3 my-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-sm">↓ más cajas más ahorro</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10"
          >
            <div className="text-center sm:text-left">
              <div className="text-white/50 text-sm mb-1">Total 4 cajas</div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-white">$590</span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold text-green-400" style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.3)' }}>
                  + 5ta Gratis
                  <span className="text-green-400">($60 ahorro)</span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(215,38,56,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-magnetic flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #D72638, #b01e2d)' }}
            >
              <Gift size={18} />
              {t('cta')}
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Note */}
          <p className="text-center text-white/30 text-xs mt-4">{t('note')}</p>
        </motion.div>
      </div>
    </section>
  );
}
