'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Package, DollarSign, ArrowRight, Star, Truck } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

// Standard box sizes with their pricing data
const standardBoxes = [
  { size: 'Small',       price: '$60',  emoji: '📦', highlight: false, color: '#0B2E63', dims: '~12×12×12"' },
  { size: 'Medium',      price: '$120', emoji: '📦', highlight: true,  color: '#D72638', dims: '~16×16×16"' },
  { size: 'Large',       price: '$170', emoji: '📦', highlight: false, color: '#163F86', dims: '~20×20×20"' },
  { size: 'Extra Large', price: '$240', emoji: '📦', highlight: false, color: '#0B2E63', dims: '~24×24×24"' },
];

// Custom dimension boxes
const customBoxes = [
  { dims: '20×20×20"', price: '$150' },
  { dims: '22×22×22"', price: '$185' },
  { dims: '24×24×24"', price: '$215' },
  { dims: '30×30×30"', price: '$370' },
  { dims: '36×22×22"', price: '$265' },
  { dims: '36×36×36"', price: '$310' },
  { dims: '48×48×48"', price: '$450' },
];

export default function Pricing() {
  const t = useTranslations('pricing');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

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
      id="precios"
      ref={ref}
      className="section-padding relative bg-[#F5F7FA] overflow-hidden"
    >
      {/* Background */}
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
            <DollarSign size={14} />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] mb-4 text-balance">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── STANDARD BOXES ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-10"
        >
          <h3 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
            <Package size={20} className="text-[#0B2E63]" />
            {t('standard_title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {standardBoxes.map((box, i) => (
              <motion.div
                key={box.size}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(11,46,99,0.12)' }}
                className={`relative rounded-2xl p-6 text-center bg-white border transition-all duration-300 cursor-default ${
                  box.highlight
                    ? 'border-[#D72638]/30 shadow-lg'
                    : 'border-gray-100 shadow-sm'
                }`}
                style={box.highlight ? { boxShadow: '0 8px 32px rgba(215,38,56,0.12)' } : { boxShadow: '0 4px 16px rgba(11,46,99,0.06)' }}
              >
                {/* Popular badge */}
                {box.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #D72638, #b01e2d)' }}
                  >
                    <Star size={10} fill="white" />
                    {t('popular')}
                  </div>
                )}

                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${box.color}, ${box.color}60)` }}
                />

                {/* Emoji */}
                <div
                  className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${box.color}10`, border: `1px solid ${box.color}20` }}
                >
                  {box.emoji}
                </div>

                {/* Size name */}
                <div className="font-bold text-[#111827] text-base mb-1">{box.size}</div>

                {/* Dimensions hint */}
                <div className="text-gray-400 text-xs mb-3">{box.dims}</div>

                {/* Price */}
                <div
                  className="text-3xl font-black"
                  style={{ color: box.color }}
                >
                  {box.price}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── PROMO BANNER ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={scrollToPromo}
          className="mb-10 cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="relative rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0B2E63 0%, #163F86 100%)' }}
          >
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative flex items-center gap-3 sm:gap-4">
              <span className="text-3xl sm:text-4xl">🎁</span>
              <div>
                <div className="text-white font-black text-base sm:text-lg leading-snug">
                  {t('promo_note')}
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ x: 4 }}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#0B2E63] bg-white shadow-lg flex-shrink-0"
            >
              {t('promo_cta')}
              <ArrowRight size={14} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── CUSTOM BOXES + BARREL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Custom dimension boxes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100"
            style={{ boxShadow: '0 4px 24px rgba(11,46,99,0.06)' }}
          >
            <h3 className="text-lg font-bold text-[#111827] mb-5 flex items-center gap-2">
              <Package size={18} className="text-[#163F86]" />
              {t('custom_title')}
            </h3>

            {/* Table header */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg mb-2 text-xs font-bold uppercase tracking-wider text-gray-400"
              style={{ background: 'rgba(11,46,99,0.04)' }}>
              <span>{t('dimensions_label')}</span>
              <span>{t('price_label')}</span>
            </div>

            {/* Table rows */}
            <div className="space-y-1.5">
              {customBoxes.map((box, i) => (
                <motion.div
                  key={box.dims}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
                  className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-[#F5F7FA] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                      style={{ background: 'rgba(11,46,99,0.08)' }}
                    >
                      📦
                    </div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-[#0B2E63] transition-colors font-mono">
                      {box.dims}
                    </span>
                  </div>
                  <span className="text-base font-black text-[#0B2E63]">{box.price}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Barrel card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* 55/77 Gallon Barrel */}
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(11,46,99,0.12)' }}
              className="flex-1 bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 relative overflow-hidden"
              style={{ boxShadow: '0 4px 24px rgba(11,46,99,0.06)' }}
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: 'linear-gradient(90deg, #0B2E63, #D72638)' }}
              />

              <h3 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
                <Truck size={18} className="text-[#D72638]" />
                {t('barrel_title')}
              </h3>

              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                  style={{ background: 'rgba(11,46,99,0.06)', border: '1px solid rgba(11,46,99,0.1)' }}
                >
                  🛢️
                </div>
                <div>
                  <div className="text-sm font-bold text-[#111827] mb-1">55 GAL / 77 GAL</div>
                  <div className="text-4xl font-black text-[#D72638]">$380</div>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {t('barrel_desc')}
              </p>

              <div className="flex flex-wrap gap-2">
                {['🇳🇮 Nicaragua', '🇻🇪 Venezuela'].map(dest => (
                  <span
                    key={dest}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0B2E63]"
                    style={{ background: 'rgba(11,46,99,0.08)', border: '1px solid rgba(11,46,99,0.1)' }}
                  >
                    {dest}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA card */}
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(215,38,56,0.35)' }}
              whileTap={{ scale: 0.98 }}
              className="btn-magnetic w-full py-5 rounded-2xl text-base font-bold text-white flex items-center justify-center gap-2.5 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #D72638, #b01e2d)' }}
            >
              {t('contact_cta')}
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
