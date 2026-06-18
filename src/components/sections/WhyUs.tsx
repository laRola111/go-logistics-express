'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, Award } from 'lucide-react';
import { staggerContainer, cardVariant, fadeInUp, viewportConfig } from '@/lib/animations';

const reasons = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'] as const;

const reasonIcons = ['🤝', '🔒', '⚡', '📍', '💬', '🌎'];
const reasonColors = [
  { bg: 'rgba(11,46,99,0.06)', border: 'rgba(11,46,99,0.1)', icon: '#0B2E63' },
  { bg: 'rgba(22,163,74,0.06)', border: 'rgba(22,163,74,0.1)', icon: '#16A34A' },
  { bg: 'rgba(215,38,56,0.06)', border: 'rgba(215,38,56,0.1)', icon: '#D72638' },
  { bg: 'rgba(11,46,99,0.06)', border: 'rgba(11,46,99,0.1)', icon: '#163F86' },
  { bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.1)', icon: '#F59E0B' },
  { bg: 'rgba(11,46,99,0.06)', border: 'rgba(11,46,99,0.1)', icon: '#0B2E63' },
];

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="nosotros"
      ref={ref}
      className="section-padding relative bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(11,46,99,0.04) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(215,38,56,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
            style={{ background: 'rgba(11,46,99,0.08)', color: '#0B2E63', border: '1px solid rgba(11,46,99,0.1)' }}
          >
            <Award size={14} />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] mb-4 text-balance">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((key, i) => (
            <motion.div
              key={key}
              variants={cardVariant}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(11,46,99,0.10)' }}
              className="group relative rounded-2xl p-7 bg-white border border-gray-100 transition-all duration-300 cursor-default"
              style={{ boxShadow: '0 4px 16px rgba(11,46,99,0.05)' }}
            >
              {/* Top Accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${reasonColors[i].icon}, transparent)` }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                style={{ background: reasonColors[i].bg, border: `1px solid ${reasonColors[i].border}` }}
              >
                {reasonIcons[i]}
              </div>

              {/* Content */}
              <div className="flex items-start gap-3">
                <CheckCircle
                  size={20}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: reasonColors[i].icon }}
                />
                <div>
                  <h3 className="font-bold text-[#111827] text-lg group-hover:text-[#0B2E63] transition-colors">
                    {t(key)}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
