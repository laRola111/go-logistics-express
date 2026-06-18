'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';

export default function FinalCTA() {
  const t = useTranslations('finalCta');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scrollToContact = () => {
    const el = document.querySelector('#contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-40 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #081f45 0%, #0B2E63 40%, #163F86 70%, #0d3470 100%)' }}
      />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Glow orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(215,38,56,0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Stars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-1 mb-6"
        >
          {[1,2,3,4,5].map(i => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * i, type: 'spring' }}
              className="text-yellow-400 text-xl"
            >
              ★
            </motion.span>
          ))}
          <span className="text-white/50 text-sm ml-2">{t('customers')}</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight text-balance"
        >
          {t('title')}
        </motion.h2>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-24 h-1.5 rounded-full mx-auto mb-6"
          style={{ background: 'linear-gradient(90deg, #D72638, #F59E0B)' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.04, boxShadow: '0 20px 60px rgba(215,38,56,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-magnetic flex items-center gap-2.5 px-10 py-5 rounded-2xl text-lg font-bold text-white shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #D72638, #b01e2d)' }}
          >
            {t('cta_primary')}
            <ArrowRight size={20} />
          </motion.button>

          <motion.a
            href="https://wa.me/18138626936"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-10 py-5 rounded-2xl text-lg font-semibold text-white"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <Phone size={20} />
            {t('cta_whatsapp')}
          </motion.a>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          {[t('trust1'), t('trust2'), t('trust3'), t('trust4')].map(item => (
            <div key={item} className="text-white/40 text-sm font-medium">
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
