'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Truck, MapPin, Flag, Shield, Package } from 'lucide-react';
import { staggerContainer, cardVariant, fadeInUp, viewportConfig } from '@/lib/animations';

const services = [
  {
    key: 's1',
    icon: Globe,
    color: '#0B2E63',
    bg: 'linear-gradient(135deg, rgba(11,46,99,0.08), rgba(22,63,134,0.04))',
    border: 'rgba(11,46,99,0.12)',
    iconBg: 'rgba(11,46,99,0.1)',
    emoji: '📦',
  },
  {
    key: 's2',
    icon: Truck,
    color: '#D72638',
    bg: 'linear-gradient(135deg, rgba(215,38,56,0.06), rgba(176,30,45,0.03))',
    border: 'rgba(215,38,56,0.12)',
    iconBg: 'rgba(215,38,56,0.08)',
    emoji: '🚛',
  },
  {
    key: 's3',
    icon: MapPin,
    color: '#163F86',
    bg: 'linear-gradient(135deg, rgba(22,63,134,0.08), rgba(11,46,99,0.04))',
    border: 'rgba(22,63,134,0.12)',
    iconBg: 'rgba(22,63,134,0.1)',
    emoji: '📍',
  },
  {
    key: 's4',
    icon: Flag,
    color: '#16A34A',
    bg: 'linear-gradient(135deg, rgba(22,163,74,0.06), rgba(15,118,54,0.03))',
    border: 'rgba(22,163,74,0.12)',
    iconBg: 'rgba(22,163,74,0.08)',
    emoji: '🇳🇮',
  },
  {
    key: 's5',
    icon: Flag,
    color: '#F59E0B',
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(202,138,4,0.03))',
    border: 'rgba(245,158,11,0.12)',
    iconBg: 'rgba(245,158,11,0.08)',
    emoji: '🇻🇪',
  },
  {
    key: 's6',
    icon: Shield,
    color: '#0B2E63',
    bg: 'linear-gradient(135deg, rgba(11,46,99,0.08), rgba(22,63,134,0.04))',
    border: 'rgba(11,46,99,0.12)',
    iconBg: 'rgba(11,46,99,0.1)',
    emoji: '🔒',
  },
] as const;

export default function Services() {
  const t = useTranslations('services');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="servicios"
      ref={ref}
      className="section-padding relative bg-[#F5F7FA] overflow-hidden"
    >
      {/* Background dots */}
      <div className="absolute inset-0 dot-pattern" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(11,46,99,0.08)', color: '#0B2E63', border: '1px solid rgba(11,46,99,0.1)' }}
          >
            <Package size={14} />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] mb-4 text-balance">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                variants={cardVariant}
                whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(11,46,99,0.12)' }}
                className="group relative rounded-2xl p-7 bg-white cursor-default transition-all duration-300"
                style={{
                  boxShadow: '0 4px 24px rgba(11,46,99,0.06)',
                  border: '1px solid rgba(11,46,99,0.06)',
                }}
              >
                {/* Color accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: service.iconBg,
                    border: `1px solid ${service.border}`,
                  }}
                >
                  {service.emoji}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#0B2E63] transition-colors">
                  {t(`${service.key}_title` as never)}
                </h3>

                {/* Desc */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`${service.key}_desc` as never)}
                </p>

                {/* Hover arrow */}
                <div
                  className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                  style={{ background: service.color }}
                >
                  <span className="text-white text-xs">→</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
